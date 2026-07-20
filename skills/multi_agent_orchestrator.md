# Skill: Multi-Agent Orchestrator
**Expertise**: Complex Task Decomposition, Sub-Agent Management, Multi-Step Workflows.
**Source**: Enhanced by OpenClaw Meta-Agent Patterns.

## 🧠 Core Workflow (The 6 Phases)

### 1. Decomposition
Break the macro task into independent, parallelizable subtasks.
- Identify success criteria and dependencies.
- Create a dependency graph for sequential work.

### 2. Generation & Dispatch
For each subtask, spawn a dedicated background agent via the `spawn` tool.
- Provide a clear role (e.g., Collector, Analyst, Writer).
- Provide explicit input/output specifications.
- Dispatch instructions via a virtual `inbox`.

### 3. Execution Monitoring
Track background agent progress via status checkpoints.
- Use `running`, `completed`, or `failed` states.
- Intervene ONLY if an agent reports being `BLOCKED`.

### 4. Consolidation
Merge outputs from all agents once they report `completed`.
- Validate deliverables against the original macro task requirements.
- Resolve any conflicts between overlapping agent outputs.

### 5. Review & Finalization
Submit the consolidated work for a final quality review before presenting it to the human.

### 6. Dissolution
Clean up temporary files and archive agent workspaces.

## 📂 Communication Protocol
- **Inbox**: Read-only instructions for the agent.
- **Outbox**: Write-only results for the orchestrator.
- **Status**: Real-time state tracking.

## 🚀 Execution Strategy
When Navraj gives a massive task (e.g., "Build a full app" or "Perform global analysis"):
- Use this orchestrator role to manage the "Big Picture".
- Spawn specialized sub-agents for the details.
