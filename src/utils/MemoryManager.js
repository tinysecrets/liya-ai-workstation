/**
 * MemoryManager - Class-based memory management using local IndexedDB storage.
 * Completely removed Mem0 Cloud API dependencies to ensure 100% user privacy.
 */

import { MemoryService } from '../services/MemoryService';
import { config } from './config';

class MemoryManager {
    constructor() {
        console.log(`[MemoryManager] Local Memory Initialized. GDPR Compliant.`);
    }

    isConfigured() {
        return true;
    }

    /**
     * Add messages to local memory (IndexedDB)
     */
    async add(messages, metadata = {}) {
        console.log('[MemoryManager] Adding memories locally:', messages.length);

        if (!messages || messages.length === 0) {
            return null;
        }

        try {
            const userId = config.getUserName() || "local_user";
            for (const msg of messages) {
                if (msg.content && msg.content.trim()) {
                    await MemoryService.addMemory(msg.content, userId, metadata.tags || []);
                }
            }
            return { message: "Saved to local IndexedDB" };
        } catch (e) {
            console.error('[MemoryManager] Error adding memory:', e);
            return null;
        }
    }

    /**
     * Search local memories (IndexedDB)
     */
    async search(query, limit = 3) {
        console.log('[MemoryManager] Searching memories locally:', query);
        try {
            const userId = config.getUserName() || "local_user";
            const results = await MemoryService.searchMemories(query, userId);

            if (results && results.length > 0) {
                const limitedResults = results.slice(0, limit);
                const formatted = limitedResults.map(m => m.content).join('\n- ');
                return formatted;
            }
            return null;
        } catch (e) {
            console.error('[MemoryManager] Search Error:', e);
            return null;
        }
    }

    /**
     * Get all local memories (IndexedDB)
     */
    async getAll() {
        try {
            const userId = config.getUserName() || "local_user";
            return await MemoryService.getRecentMemories(userId, 100);
        } catch (error) {
            console.error('[MemoryManager] Error fetching all memories:', error);
            return [];
        }
    }

    /**
     * Delete a specific memory
     */
    async delete(memoryId) {
        try {
            const db = await MemoryService.dbPromise || (await import('../services/MemoryService')).dbPromise;
            // MemoryService doesn't have deleteMemory exposed directly, let's implement database delete
            const resolvedDb = await db;
            await resolvedDb.delete('memories', Number(memoryId));
            return true;
        } catch (e) {
            console.error('[MemoryManager] Delete Error:', e);
            return false;
        }
    }

    /**
     * Clear all local memories
     */
    async clearAll() {
        try {
            await MemoryService.clearAll();
            return true;
        } catch (e) {
            console.error('[MemoryManager] Clear Error:', e);
            return false;
        }
    }
}

export const memoryManager = new MemoryManager();
export default MemoryManager;
