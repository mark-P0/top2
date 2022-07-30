# Revisiting Rock Paper Scissors

> Managing branches and merging are significantly easier in an IDE or sufficiently configured text editor, e.g. VS Code

## Branching

- Easy way of developing new features without necessarily affecting the working program or application in the main branch
- Also a possible way of sharing code between contributors to a repository

### Creation

#### Manual create and switch

```sh
git branch <BRANCH_NAME>
git checkout <BRANCH_NAME>
```

#### One-liner

```sh
git checkout -b <BRANCH_NAME>
```

- The `-b` flag creates `BRANCH_NAME` if it does not exist yet

### Listing

```sh
git branch
```

- Lists all branches

## Merging

Merge branches together to form a single timeline

### Steps

1. Activate the branch to which another branch will be merged.

   <!-- prettier-ignore -->
   ```sh
   git branch main    # New default main branch
   git branch master  # Old default
   ```

   - Usually the main branch of the repository
   - Or the production branch

2. Pull updates to this branch

   - Work may have been performed in this branch during the time that the branch to be merged was developed
   - This will ensure that all possible conflicts will be accounted for

3. Initiate the merge

   ```sh
   git merge <BRANCH_NAME>
   ```

4. Resolve conflicts as necessary

   - e.g. conflicting file names, contents, new additions

5. [ _Optional_ ] Delete the merged branch

   ```sh
   git branch -D <BRANCH_NAME>
   ```

   - Cleans up branches list
   - May not be desirable in some cases, as branches also tell a complete history of the repository

### Options

#### Local

_Using the steps above_

#### Remote

- Merge branches on remote provider, e.g. GitHub
- Pull changes locally

## Assignment

https://mark-p0.github.io/rock-paper-scissors/

Encountered an issue about modal dialogs (e.g. `alert()`, `confirm()`) and DOM changes

- In Chrome, dialogs are shown before DOM changes
- This can be undesirable
