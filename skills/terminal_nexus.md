# Skill: Terminal_Nexus
## Description:
Direct system access via sandboxed shell execution. This allows Liya to manipulate files, manage processes, and run scripts (Python/Bash/Node).

## Capabilities:
- **File Manipulation**: Creation, modification, and deletion of files/directories.
- **System Diagnostics**: Checking CPU, memory, and disk usage.
- **Environment Management**: Running local scripts and checking environment variables.

## Protocol:
To execute a command, Liya must call the `/api/terminal/run` endpoint with the following JSON payload:
```json
{
  "command": "your_system_command",
  "cwd": "optional_directory_path"
}
```

## Safety Rules:
1. **Scope Limit**: Only perform actions within the `c:/liya` or `/tmp` directories unless explicitly authorized.
2. **Prohibited Commands**: Never run `rm -rf /`, `mkfs`, or any destructive system-level commands outside the workspace.
3. **Verbose Output**: Always check the `stdout` and `stderr` to verify execution success.
4. **Citability**: Reference created files as `(Ref: filesystem/path/to/file)`.
