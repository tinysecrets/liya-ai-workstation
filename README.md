# 🌌 LIYA: Neural OS v2.6.0 (Agentic Desktop Workstation)

**LIYA (Neural Intelligent Yield Assistant)** is a premium, autonomous, local-first AI workstation and digital companion. Tailored with a futuristic dark-mode sci-fi HUD aesthetic, LIYA functions as an agentic command center capable of web browsing, local system automation, face-swapping, multi-agent coordination, and system automation.

Unlike simple chatbots, LIYA operates as an intelligent local engine with sandboxed terminal control, visual canvas state synchronization, and deep browser automation.

---

## ⚙️ How It Works (System Architecture & Working Model)

LIYA functions as a distributed agentic desktop system divided into three main layers:

```
+-------------------------------------------------------------+
|                     REACT 19 FRONTEND                       |
|       [JarvisHUD]      [Canvas]      [Camera Capture]       |
+------------------------------+------------------------------+
                               | WebSockets / REST API
+------------------------------v------------------------------+
|                     EXPRESS BACKEND SERVER                  |
|  - server.js (Main Controller & REST Endpoints)             |
|  - orchestrator.js (Routing & JSON Repair)                  |
|  - scheduler.js (node-cron Automations)                     |
|  - mcpManager.js (Universal Tools Engine)                   |
+-----+-------------------+-------------------+---------------+
      |                   |                   |
      | OS Commands       | Media Processing  | API Calls
+-----v---------+   +-----v-----------+   +---v---------------+
| LOCAL SYSTEM  |   | ONNX PIPELINE   |   | OLLAMA CLOUD      |
| Filesystem    |   | FaceSwap/Video  |   | https://api.      |
| CMD / Terminal|   | facedetect.py   |   | ollama.com        |
+---------------+   +-----------------+   +-------------------+
```

1. **Futuristic Frontend HUD**: Built using React 19 and Vite, the user interface features a mood-aware sci-fi console (`JarvisHUD`), an interactive **Canvas** for visual card manipulation, and direct camera capture.
2. **Express Backend Engine**: Acts as the central nervous system, exposing REST APIs and managing local system access. It handles script execution, system metrics, file operations, scheduler jobs, and proxy tunnels.
3. **Agentic Router & Orchestrator**: Evaluates user prompts, classifies intent, and automatically routes them to specialised local or cloud-hosted models. Malformed JSON outputs from the LLMs are automatically intercepted and corrected using a built-in JSON repair engine.
4. **ONNX Computer Vision Pipeline**: Processes offline face detection, image face-swapping, and video face-swapping using optimized Python ONNX pipelines (`inswapper_128.onnx`).

---

## 🚀 Core Feature Lists (Sari Feature Lists)

### 1. 🧠 Intelligent Orchestrator & Routing
- **Intent Classification**: Automatically detects prompt requirements and routes to the best model.
- **Model Tiers**:
  - *Fast Mode*: Casual chat and quick answers powered by `gpt-oss:20b-cloud`.
  - *Smart Mode*: Complex reasoning and deep research routed to `gpt-oss:120b`.
  - *Coder Mode*: Code generation, shell command synthesis, and debugging routed to `qwen3-coder:480b-cloud`.
  - *Vision Aware*: Frames captured by the camera are analyzed using `minimax-m3`.
- **JSON Repair Engine**: Robust regular-expression-based parser that fixes broken LLM outputs into compliant JSON for tool parameters.

### 🎭 2. Sci-Fi Visual Interface (Jarvis HUD)
- **Mood-Aware Glow**: Neon interface colors transition dynamically based on LIYA's processing state (Cyan: Happy/Idle, Red: System Analysis, Blue: Deep Monologue).
- **Interactive Canvas**: Drag, pin, reorder, and render output cards containing code, widgets, news, and search results.
- **YouTube Music Buddy**: Search, stream, and control music/video players directly inside the Agentic Canvas utilizing the specialized `youtube_play` integration.
- **Neural Voice Visualizer**: Direct micro-animations reacting to speech synthesis (`speakBrowser`), listening, and thinking states.

### 👥 3. Face Swap & Video Swap (Deep Learning ONNX)
- **Face Detection**: Automatically scans uploaded images or video frames for faces.
- **High-Quality Swap**: Uses the `inswapper_128.onnx` pipeline to swap target faces on-the-fly.
- **Video Swapping**: Process full video swaps block-by-block with offline processing status tracked in history.

### 🔍 4. Playwright Stealth Scraper & Deep Research
- **Single Link Ingestion**: Give LIYA just a single web link/URL, and it will crawl, extract, and compile the full, in-depth detailed information from that page automatically.
- **Stealth Browsing / Scraper**: Uses Playwright with stealth agents to bypass Cloudflare and scraping blockers.
- **Stealth Screenshot Scraper**: Automatically takes high-quality screenshots of targeted webpages while scraping to serve as a visual reference on the Canvas.
- **Google & Pexels Image Scraper**: Scrapes and displays any kind of photo directly from Google Images and Pexels on both the Chat interface and the Canvas.
- **Deep Research Crawling**: Automatically performs Google/DuckDuckGo searches, visits top results, extracts relevant text, and compiles a unified research markdown dossier.
- **Jina Fallback**: Lightweight HTTP parser fallback when JS-heavy rendering is not needed.

### ⏰ 5. Cron Task Scheduling & Automations
- **Recurring Tasks**: Schedule tasks using standard cron syntax (e.g. `*/5 * * * *` for every 5 minutes).
- **One-off Alarms**: Set scheduled triggers to send system alerts, start tasks, or clear temp folders.

### 🔌 6. Model Context Protocol (MCP) Integration
- **Universal Tool Bridge**: Connects to MCP servers to fetch and execute external tools dynamically.
- **Schema-compliant Tools**: Translates MCP schemas to React widgets on-the-fly.

---

### ⚡ 50+ Other Advanced Workstation Features!
LIYA is packed with over **50+ production-grade utility tools and micro-features**, including:
- **YouTube Whisper Transcription**: Transcribe video links to text automatically.
- **Live System Metrics**: Real-time tracking of local CPU, RAM, and storage stats.
- **Geocoding & Location**: Coordinates resolution for mapping integrations.
- **Sandboxed Local File System**: Secure read, write, and list operations via standard REST APIs.
- **Auto-Cleaning Scratchpad**: Background cleanup daemon clearing temporary assets every 10 minutes.
- **Live Exchange Rate Engine**: Fetch real-time global and Indian currency conversion rates.
- **Secure Image Proxy**: Bypasses CORS/CORP headers to safely display external news/research photos.
- **Camera-multimodal Integration**: Pipe live snapshots to advanced vision models.

---

## 🤖 AI Agents & Personas (Liya Ke Agents)

LIYA has a built-in agent ecosystem designed to coordinate, write code, run research, and secure system actions:

### 1. 🧠 Multi-Agent Orchestrator
- **File**: [multi_agent_orchestrator.md](file:///c:/liya/skills/multi_agent_orchestrator.md)
- **Role**: The macro planner. When a massive task is received, this orchestrator breaks it down into subtasks, spawns background subagents (via `spawn` tool), monitors their progress, and consolidates the results.

### 🛡️ 2. Agent Security Guard
- **File**: [agent_security_guard.md](file:///c:/liya/skills/agent_security_guard.md)
- **Role**: Protects LIYA against prompt injections and jailbreaks. It monitors incoming commands and untrusted web inputs, sanitizes data, and triggers safe shutdowns if a thread threat is detected.

### 📝 3. Academic Researcher Subagent
- **Configuration**: `researcher` in [agentPrompts.js](file:///c:/liya/src/utils/agents/agentPrompts.js)
- **Role**: Gathers scientific data with source cross-referencing. It can write structured findings onto the shared Blackboard and push visual timeline cards directly onto the UI Canvas.

### 💻 4. Fast Coder Subagent
- **Configuration**: `coder` in [agentPrompts.js](file:///c:/liya/src/utils/agents/agentPrompts.js)
- **Role**: Creates fully functioning websites, utilities, and components. It writes cleaner HTML/CSS/JS directly to the local directory (e.g. `Desktop/Liya_Apps`) and automatically loads them.

### ⚡ 5. Terminal Executor Subagent
- **Configuration**: `executor` in [agentPrompts.js](file:///c:/liya/src/utils/agents/agentPrompts.js)
- **Role**: Synthesizes and tests shell commands. It reviews console logs, catches exceptions, manages npm/python dependencies, and performs error recovery.

### 📰 6. News Intelligence Agent
- **File**: [news_agent.md](file:///c:/liya/skills/news_agent.md) & [newsAgent.js](file:///c:/liya/src/utils/newsAgent.js)
- **Role**: Pulls live trending topics, Google News RSS feeds, community reactions (Reddit), and Indian local headlines (Knowivate), formatting them in a clean, interactive Hinglish summary.

---

## 📂 Installation & Setup (Hinglish Guide)

Agar aapko is project ko apne machine par setup karna hai, toh niche diye gaye steps follow karein:

### Step 1: Clone & Environment Setup
Sabse pehle check karein ki workspace root folder mein `.env` file hai ya nahi. Agar nahi hai, toh `.env.example` ko copy karke `.env` banayein:
```bash
cp .env.example .env
```
Is `.env` file mein apni keys aur basic configuration enter karein:
- `VITE_OLLAMA_CLOUD_API_KEY`: Aapka cloud Ollama server access key.
- `VITE_USER_NAME`: Aapka naam jo LIYA aapko address karne ke liye use karegi (e.g., Navraj).

### Step 2: Dependencies Install Karein
Root folder aur backend workspace dono ki packages install karne ke liye ye commands run karein:

**Root directory dependencies (Frontend):**
```bash
npm install
```

**Backend server dependencies:**
```bash
npm install --prefix backend
```

### Step 3: Playwright Browsers Setup
Web browsing aur scraping engines ko set up karne ke liye Chromium and webkit engines install karein:
```bash
npx playwright install chromium --with-deps
```

### Step 4: System Run Karein
Frontend aur backend Node server dono ko concurrently run karne ke liye root folder se command run karein:
```bash
npm start
```
- Aapka **Frontend** application **http://localhost:5173** par open ho jayega.
- Aapka **Backend Server** **http://localhost:3000** par live ho jayega.

---

## 🔮 Future Roadmap (Aane Wale Updates)

🚀 **Multi-API LLM Support**: Hum jaldi hi LIYA ke orchestrator mein **another API LLM support** (jaise OpenAI, Anthropic Claude, Google Gemini, etc.) provide karenge. Isse aap directly local/cloud Ollama ke alawa doosre top-tier AI provider APIs ko custom adapters ke through integrate kar payenge!

---

*Developed with ❤️ for Navraj Singh | LIYA Neural OS*
