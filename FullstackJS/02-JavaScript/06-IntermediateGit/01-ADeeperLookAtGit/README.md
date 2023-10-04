# A Deeper Look at Git

> I use VSCode's `Source Control` sidebar...

> **DO NOT tamper with the history of remote repositories!**

## Changing History

### `commit --amend`

- Changing the last (single) commit

```sh
git add <FILES_TO_ADD>
git commit --amend
```

#### Keeping original commit message

> https://stackoverflow.com/questions/10237071/how-to-amend-a-commit-without-changing-commit-message-reusing-the-previous-one

```sh
git add <FILES_TO_ADD>
git commit --amend --no-edit
```

### `rebase`

- Changing multiple commits

```sh
# Interactive rebasing
git rebase -i <COMMIT_CODES>
```

- `pick` essentially keeps the commit as-is

#### Rebase from very first commit

```sh
git rebase -i --root
```

#### Squashing commits

- Combine commits into a single one
- Will combine into the earliest preceding commit that is `pick`-ed

```sh
git rebase [-i]

# Then designate commit(s) to be squashed by
# prepending `squash` to it in the editor

# `squash` commits will be combined into the earliest
# `pick` commit before it
```

## Working With Remotes

### ~~`push --force`~~

> **DO NOT USE THIS**, unless absolutely necessary / with a _very good_ reason!

#### `push --force-with-lease`

- More forgiving version
- Kinda misleading name, because it has "force" in it...

## [Think Like (a) Git](https://think-like-a-git.net/)

- A Git repository is one giant graph
- Git commits are nodes in the graph (repository)
- Git commit nodes point to the ones before them
  - This allows history to be built
- **References make commits reachable**
- Branches are pointers to a commit
  - It's a label, variable, a reference to a commit
  - Branches can be used as a "save point"

## Knowledge Check

- How can you amend your last commit?

  - Stage desired changes
  - Run `git commit --amend`
  - Edit commit message accordingly
    - Alternatively, use `git commit --amend --no-edit` to skip changing the commit message

- What are some different ways to rewrite history?

  - Amending
  - Rebasing
  - Squashing

- What is a safe way to push history changes to a remote repository?

  - Just... `git push`?
  - `git push --force-with-lease` is fail-safe, checks if history is up-to-date with remote, and is default in some companies

- What are the dangers of history-changing operations?

  - Can lose work on files, by yourself and others
  - Local repository will not be in sync anymore with remote

- What are best practices of history-changing operations?

  - Check with teammates / coworkers / seniors when rewriting history!
    - Especially if the history is already in the remote!
  - Do not "force" anything, unless absolutely necessary!
  - As much as possible, only rewrite history that in local repositories / not-yet-pushed commits!

- Explain what it means for branches to be pointers.

  - Everyhing is a commit (node in a linked list)
  - A branch is just a "special name" (pointer) for a particular commit
  - Commits themselves point to previous ones
    - This is how they keep history
  - The branch head eventually traces back to a commit in the main branch
  - This common commit can be pointed to by several commits (which means there are several branches)

  > `git` commands are [just] strangely named graph manipulation commands―creating/deleting nodes, moving pointers around
  >
  > ― [Kent Beck](https://twitter.com/KentBeck/status/42657237986054144)
