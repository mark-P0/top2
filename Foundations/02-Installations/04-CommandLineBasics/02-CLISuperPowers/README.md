# CLI Super Powers

With your newly discovered CLI super powers, practice creating a folder and a few files using the `mkdir`, `touch`, and `cd` commands introduced in the previous step. As an example, a basic website might have a main `index.html` file, a CSS stylesheet file called `style.css`, and a folder for `images`. Think about how you could create these files with the commands and put it into practice!

**Needed:**

- `./index.html`
- `./style.css`
- `./images/`

```bash
## Creating the files
touch index.html style.css

## Creating the directory
mkdir images

## EXTRA: Adding a placeholder file
## `git` won't track `./images` if it is empty
echo "This should be an empty folder; the file is here as placeholder" > images/README.md  # Descriptive
touch images/.placeholer # Minimal
```
