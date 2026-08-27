# Workflow & Operational Guidelines

## Git Workflow
- **No Automatic Git Actions**: The agent must NEVER automatically commit or push changes without explicit command.
- **Strict Separation of Commit and Push**:
  - If the user says **`commit`**: ONLY stage and commit locally (`git add` and `git commit`). DO NOT run `git push`.
  - If the user says **`push`**: ONLY push the local commits to remote (`git push`).
  - If the user explicitly asks to **`commit and push`**: Perform both sequentially.
