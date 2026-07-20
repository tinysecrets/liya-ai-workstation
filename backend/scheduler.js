/**
 * Liya Backend Scheduler
 * Handles reminders and automated tasks using node-cron
 */

const cron = require('node-cron');
const fs = require('fs-extra');
const path = require('path');

const JOBS_FILE = path.join(__dirname, '..', 'brain', 'automated_jobs.json');
let activeJobs = [];
let orchestratorRef = null;

/**
 * Clean up old screenshots older than 24 hours
 */
async function cleanOldScreenshots() {
    try {
        const imagesDir = path.join(__dirname, '..', 'public', 'images');
        if (!(await fs.pathExists(imagesDir))) return;

        const files = await fs.readdir(imagesDir);
        const now = Date.now();
        const expirationTime = 24 * 60 * 60 * 1000; // 24 hours
        let deletedCount = 0;

        for (const file of files) {
            if (file.startsWith('screenshot_') && file.endsWith('.jpg')) {
                const filePath = path.join(imagesDir, file);
                const stat = await fs.stat(filePath);
                if (now - stat.mtimeMs > expirationTime) {
                    await fs.remove(filePath);
                    deletedCount++;
                }
            }
        }

        if (deletedCount > 0) {
            console.log(`[Scheduler] Cleaned up ${deletedCount} expired screenshots.`);
        }
    } catch (e) {
        console.error('[Scheduler] Screenshot cleanup failed:', e);
    }
}

/**
 * Initialize the scheduler with orchestrator reference
 */
function initScheduler(bot, orchestrator) {
    orchestratorRef = orchestrator;
    loadJobs();

    // Setup visual screenshot auto-cleanup (Runs every 4 hours)
    cron.schedule('0 */4 * * *', () => {
        cleanOldScreenshots();
    });
    // One-off cleanup 5 seconds after boot
    setTimeout(() => cleanOldScreenshots(), 5000);
}

/**
 * Load and restart saved jobs from disk
 */
async function loadJobs() {
    try {
        if (await fs.pathExists(JOBS_FILE)) {
            const data = await fs.readJson(JOBS_FILE);
            data.forEach(job => {
                scheduleJob(job.chatId, job.time, job.frequency, job.prompt, job.title, false, job.id);
            });
            console.log(`[Scheduler] Restarted ${data.length} saved jobs.`);
            // Defer broadcast to allow server to fully initialize
            setTimeout(() => broadcastUpdate(), 2000);
        }
    } catch (e) {
        console.error("[Scheduler] Load Error:", e);
    }
}

/**
 * Save current jobs to disk
 */
async function saveJobs() {
    try {
        const data = activeJobs.map(j => ({
            chatId: j.chatId,
            time: j.time,
            frequency: j.frequency,
            prompt: j.prompt,
            title: j.title,
            id: j.id
        }));
        await fs.ensureDir(path.dirname(JOBS_FILE));
        await fs.writeJson(JOBS_FILE, data, { spaces: 2 });
    } catch (e) {
        console.error("[Scheduler] Save Error:", e);
    }
}

/**
 * Schedule a new automation
 */
function scheduleJob(chatId, time, frequency, prompt, title, persist = true, idArg = null) {
    const id = idArg || (Date.now().toString(36) + Math.random().toString(36).slice(2));
    let cronExpr = "";

    // 1. Convert time to cron
    if (time.includes(':')) {
        const parts = time.split(':');
        if (parts.length === 3) {
            // HH:mm:ss
            const [hour, min, sec] = parts;
            cronExpr = `${sec} ${min} ${hour} * * *`;
        } else {
            // HH:mm
            const [hour, min] = parts;
            cronExpr = `0 ${min} ${hour} * * *`;
        }
    } else if (time.match(/^\d+[mhs]$/i)) {
        const amount = parseInt(time.slice(0, -1));
        const unit = time.slice(-1).toLowerCase();
        const target = new Date();
        if (unit === 'm') target.setMinutes(target.getMinutes() + amount);
        if (unit === 'h') target.setHours(target.getHours() + amount);
        if (unit === 's') target.setSeconds(target.getSeconds() + amount);

        cronExpr = `${target.getSeconds()} ${target.getMinutes()} ${target.getHours()} ${target.getDate()} ${target.getMonth() + 1} *`;
        frequency = 'once';
    } else {
        cronExpr = time;
    }

    if (!cron.validate(cronExpr)) {
        console.error(`[Scheduler] Invalid cron expression: ${cronExpr}`);
        return false;
    }

    console.log(`[Scheduler] Scheduling job "${title}" with cron: ${cronExpr}`);

    const task = cron.schedule(cronExpr, async () => {
        console.log(`[Scheduler] 🚀 Triggering: ${title}`);

        try {
            const { notifyDesktop, pushToChat } = require('./canvasBridge');
            notifyDesktop("Scheduled Task Triggered", title, 'success');
            pushToChat(`🔔 *Reminder:* ${title}`, 'system');

            if (prompt && orchestratorRef) {
                orchestratorRef(`[AUTOMATED ACTION: ${prompt}]`, () => {}, { 
                    chatId, 
                    isAutomated: true 
                }).catch(e => console.error("[Scheduler] Orchestrator Error:", e));
            }
        } catch (e) {
            console.error("[Scheduler] Execution Error:", e);
        }

        if (frequency === 'once') {
            stopJobById(id);
        }
    });

    activeJobs.push({ id, chatId, time, frequency, prompt, title, task });
    if (persist) {
        saveJobs();
        broadcastUpdate();
    }
    return true;
}

function broadcastUpdate() {
    try {
        const { io } = require('./server');
        if (io) {
            console.log(`[Scheduler] Broadcasting update for ${activeJobs.length} jobs.`);
            io.emit('jobs-updated', activeJobs.map(j => ({
                id: j.id, chatId: j.chatId, time: j.time, frequency: j.frequency, title: j.title, prompt: j.prompt
            })));
        } else {
            console.warn('[Scheduler] Cannot broadcast: Socket.IO (io) not found.');
        }
    } catch (e) {
        console.error('[Scheduler] Broadcast Error:', e.message);
    }
}

function stopJobById(id) {
    const index = activeJobs.findIndex(j => j.id === id);
    if (index !== -1) {
        activeJobs[index].task.stop();
        activeJobs.splice(index, 1);
        saveJobs();
        broadcastUpdate();
        return true;
    }
    return false;
}

function stopJob(chatId, title) {
    const index = activeJobs.findIndex(j => j.chatId === chatId && j.title === title);
    if (index !== -1) {
        activeJobs[index].task.stop();
        activeJobs.splice(index, 1);
        saveJobs();
        broadcastUpdate();
        return true;
    }
    return false;
}

function getAllJobs(chatId = null) {
    let jobs = activeJobs;
    if (chatId) jobs = jobs.filter(j => j.chatId === chatId);
    return jobs.map(j => ({
        id: j.id, chatId: j.chatId, time: j.time, frequency: j.frequency, title: j.title, prompt: j.prompt
    }));
}

const getJobs = getAllJobs;

module.exports = { initScheduler, scheduleJob, stopJob, stopJobById, getAllJobs, getJobs };
