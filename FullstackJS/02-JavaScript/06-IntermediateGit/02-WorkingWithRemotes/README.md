# Working with Remotes

## ~~`git push --force`~~

> **DO NOT USE!!!**

- Force-pushing overwrites the remote repo with your own copy
- If your own copy is not in sync with others who are also working with the same repository (which it most likely is), the collaboration will fall apart

### `git revert`

- Best choice for "undoing" a previous commit
- Basically another commit that just "reverts" back the changes made of a specific commit
- After reverting, just push as normal

> A more proper workflow would be to
>
> - Create a separate branch for the things you want to change in the repo
> - Push the branch to the repo
> - Ask for the branch changes to be merged to the main branch
>   - This is often done with a review

### `git push --force-with-lease`

- "Better" version of force-pushing
- _"If no remote changes, force-push; else, fail"_
