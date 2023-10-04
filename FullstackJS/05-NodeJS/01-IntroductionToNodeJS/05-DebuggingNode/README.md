# Debugging Node

## Knowledge Check

What are two ways to debug Node in VS Code?

- Using VSCode's debugger

  - Can auto-attach to any NodeJS processes launched
    - May include installed `node_modules`
    - May attach only to those outside `node_modules`
  - Can manually attach to currently running Node processes
  - Can launch Node processes directly with debugger attached
    - Kinda similar to the auto-attach feature
  - Customized using the file `./.vscode/launch.json`
  - Interacted with via the `Run and Debug` tab and the `Debug Console`

- Using Chrome devtools
  - `F12` → `Open dedicated DevTools for Node.js` (top-left, together with "element selector/inspector" and "responsive device" menu)
    - Add more connections if need be
  - Open `chrome://inspect` in new tab → `Open dedicated DevTools for Node`
    - Configure network targets if need be
