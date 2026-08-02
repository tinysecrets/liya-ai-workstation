# 🌌 LIYA: Neural OS v2.7.0 (Agentic Desktop Workstation)

**LIYA (Neural Intelligent Yield Assistant)** is a premium, autonomous, local-first AI workstation and digital companion. Tailored with a futuristic dark-mode sci-fi HUD aesthetic, LIYA functions as an agentic command center capable of web browsing, local system automation, high-speed face-swapping, Mem0 long-term memory, multi-agent coordination, and interactive canvas application rendering.

---

## ⚙️ How It Works (System Architecture & Working Model)

LIYA functions as a distributed agentic desktop system divided into three main layers:

```
+-------------------------------------------------------------+
|                     REACT 19 FRONTEND                       |
|   [JarvisHUD]   [Interactive Canvas]  [Mini Apps Suite]     |
|   [Mem0 Engine] [Voice Engine]        [Camera Vision]       |
+------------------------------+------------------------------+
                               | WebSockets / REST API
+------------------------------v------------------------------+
|                     EXPRESS BACKEND SERVER                  |
|  - server.js (Main Controller & REST Endpoints)             |
|  - orchestrator.js (Routing & JSON Repair)                  |
|  - scheduler.js (node-cron Automations)                     |
|  - voiceEngine.js (Ultra-Fast Indian TTS Engine)            |
|  - mcpManager.js (Universal Tools Engine)                   |
+-----+-------------------+-------------------+---------------+
      |                   |                   |
      | OS Commands       | Media Processing  | API Calls / Cloud
+-----v---------+   +-----v-----------+   +---v---------------+
| LOCAL SYSTEM  |   | ONNX PIPELINE   |   | OLLAMA CLOUD /    |
| Filesystem    |   | FaceSwap/Video  |   | MEM0 CLOUD MEMORY |
| CMD / Terminal|   | facedetect.py   |   | https://mem0.ai   |
+---------------+   +-----------------+   +-------------------+
```

---

## 🧠 1. Mem0 Long-Term Memory Integration

LIYA features a state-of-the-art **Mem0 Vector Memory Architecture** designed to remember facts, user preferences, past interactions, and context across sessions:

- **Mem0 Cloud + Local Storage Fallback**: When `VITE_MEM0_API_KEY` is configured in Settings, LIYA syncs memories directly with **Mem0 Cloud API (`https://api.mem0.ai/v1`)**. If offline or unconfigured, it seamlessly falls back to local memory storage (`localStorage`).
- **Automatic Conversation Ingestion**: Every user query and AI response is automatically ingested into Mem0 memory after execution without blocking the UI thread.
- **Intelligent Contextual Search**: Before responding to complex queries, LIYA searches Mem0 memory and injects relevant past facts directly into the LLM system prompt context.
- **Memory Management in Settings**: Easily input and update your `VITE_MEM0_API_KEY` right inside LIYA Console Settings (`SettingsControl.jsx`).

---

## 🎨 2. Interactive Canvas (Visual Workstation Canvas)

LIYA includes a dedicated **Interactive Canvas** (`Canvas.jsx`) for live visual application execution, media rendering, and data visualization:

- **Live Code Execution**: When LIYA generates HTML/CSS/JS code, web pages, particle animations, or interactive tools, they render live inside the Canvas preview frame.
- **Interactive Widgets**:
  - **ChartRenderer**: Dynamic interactive charts powered by Recharts (line charts, bar graphs, pie charts).
  - **MapRenderer**: Interactive geographical maps and location markers powered by Leaflet.
  - **DiffViewer**: Code diff comparison tool for reviewing code changes.
  - **YouTube Music Buddy**: Search, stream, and play YouTube audio/video directly on the Canvas.
  - **News & Search Cards**: Displays rich news feeds and image search results.
- **Blackboard Synchronization**: Multi-agent state and subagent outputs sync directly to the shared Blackboard and render onto the Canvas.

---

## 🧩 3. Built-in Mini Apps Suite

LIYA comes with a built-in suite of specialized **Mini Apps** accessible directly from the App Launcher modal (`AppLauncherModal.jsx`):

1. **🎭 Face Swap & Video Swap**:
   - **High-Speed Image Swap**: Swaps faces on target photos in milliseconds using optimized ONNX `buffalo_l` models.
   - **Multi-Threaded Video Swap**: High-speed parallel video frame processing with `ThreadPoolExecutor` and FFmpeg ultrafast encoding.
   - **Crop & History Manager**: Manage reference face crops and clean swap history with one click.
2. **⛅ Weather Workstation** (`WeatherControl.jsx`): Live weather telemetry, temperature forecasts, humidity, and atmospheric data for global cities.
3. **📰 News Intelligence Center** (`NewsControl.jsx`): Real-time global headlines, Google News RSS, Indian news feeds, and community reactions summarized in Hinglish.
4. **💱 Currency Converter** (`CurrencyControl.jsx`): Real-time exchange rate engine supporting global currencies (USD, INR, EUR, GBP, JPY, CAD, etc.).
5. **📊 System Metrics Monitor** (`SystemControl.jsx`): Real-time dashboard monitoring CPU usage, memory consumption, disk space, and active node server health.
6. **⏰ Task & Automation Scheduler** (`TaskControl.jsx`): User-friendly cron job scheduler and reminder manager for background tasks.
7. **📷 Camera Vision Scanner** (`CameraCapture.jsx`): Live webcam snapshot capture for multimodal visual analysis.
8. **⚙️ Console Settings** (`SettingsControl.jsx`): Manage Master Identity, API tokens (Mem0, Ollama Cloud, Weather, News, Pexels, Currency), and LLM model routing.

---

## 🗣️ 4. Ultra-Fast Indian Accent TTS Engine

- **Native Voice Engine** (`voiceEngine.js`): Uses Microsoft Edge Neural TTS (`hi-IN-SwaraNeural`) to synthesize hyper-realistic Hindi and Indian-English speech in real-time.
- **Fallback Protection**: Automatically falls back to Web Speech API (`speakBrowser`) if offline.

---

## 🚀 5. Advanced Web Scraper & Multimodal Search

- **Playwright Stealth Scraper**: Crawls JS-heavy websites bypassing bot detectors and Cloudflare.
- **Single Link Ingestion**: Give LIYA a single URL and it extracts, cleans, and analyzes full detailed page content.
- **Google Images & Pexels Scraper**: Fetches high-resolution images directly for chat and canvas display.
- **CORS Image Proxy**: `/api/proxy/image` endpoint proxies external image CDN URLs safely.

---

## 💎 6. Ultra-Premium Classic Logo & Branding

- **Custom Luxury Emblem**: Includes LIYA's signature silver-platinum & rose-gold monogram logo emblem (`public/liya_logo.png`).
- **Custom Favicon & Page Title**: Customized branding across header, sidebar, and browser tab.

---

## 🤖 AI Agents & Personas

LIYA has a built-in agent ecosystem designed to coordinate, write code, run research, and secure system actions:

1. **🧠 Multi-Agent Orchestrator**: Breaks complex prompts into subtasks, spawns background subagents (`spawn`), and consolidates outputs onto the Blackboard.
2. **🛡️ Agent Security Guard**: Sanitizes inputs and guards against prompt injections and malicious payloads.
3. **📝 Academic Researcher Subagent**: Conducts deep multi-source research with automatic source citation.
4. **💻 Fast Coder Subagent**: Generates complete web applications, interactive scripts, and components.
5. **⚡ Terminal Executor Subagent**: Executes sandboxed shell commands, installs packages, and inspects build logs.
6. **📰 News Intelligence Agent**: Pulls live trending topics, RSS feeds, and Hinglish summaries.

---

## 📂 Installation & Setup (Hinglish Guide)

### Step 1: Clone & Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your configuration in `.env` (or configure directly via **LIYA Console Settings** in the UI):
- `VITE_OLLAMA_CLOUD_API_KEY`: Ollama Cloud API Key
- `VITE_MEM0_API_KEY`: Mem0 Cloud API Key
- `VITE_USER_NAME`: Master user name (default: Navraj)

### Step 2: Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm install --prefix backend
```

### Step 3: Install Playwright Browsers
```bash
npx playwright install chromium --with-deps
```

### ⚡ Quick Start: Smart 1-Click Automated Launcher (`Start_LIYA_AI.bat`)
Windows users can launch the complete LIYA AI Workstation in a single click:
- Simply double-click **`Start_LIYA_AI.bat`** in the project root folder.
- **Smart Auto-Setup**: It automatically checks for missing `.env` files and creates them from `.env.example`.
- **Auto-Dependency Installation**: If `node_modules` are missing on a fresh system, it automatically runs `npm install` for both Frontend and Backend workspaces before starting!
- **Zero Configuration Required**: Launches both servers and opens `http://localhost:5173` directly in your default web browser!

### Step 4: Manual Command-Line Startup
If starting manually via terminal:
```bash
npm start
```
- **Frontend App**: `http://localhost:5173`
- **Backend Server**: `http://localhost:3000`

---

*Developed with ❤️ for Navraj Singh | LIYA Neural OS v2.7.0*
