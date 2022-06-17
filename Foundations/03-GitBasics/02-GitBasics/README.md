# Git Basics

## Assignment

Detailed a process of creating a repository by initializing it at GitHub first, then cloning it on the local machine.

I had a local repo already for this project, and I simply pushed it to the new remote GitHub repo using the provided instructions:

```bash
## ...or push an existing repository from the command line
git remote add github https://github.com/mark-P0/top2.git
git branch -M main
git push -u github main
```

- Renamed typical remote name `origin` as `github` for better clarity; it is uploaded into GitHub after all
- The `-u` flag on `git push` sets the default upstream of the `main` branch as the remote `github`
  - This is so that `git pull` will automatically pull updates for the `main` branch from `github`, without needing to specify everytime. As evidenced by the last line in the command execution output:
    > Branch 'main' set up to track remote branch 'main' from 'github'.
  - **Upstream**: Remote repositories, i.e. the central source of truth
  - **Downstream**: Local repositories, i.e. local machines, developers, etc.
