# Command Line Basics

## Use the Command Line Like a Pro

- Copying and pasting within the terminal

  - [ **`Ctrl+Shift+C`** ]
  - [ **`Ctrl+Shift+V`** ]
  - Regular `Ctrl+C` interrupts / stops ongoing programs

- Tab completion

  - In the terminal, or as part of a command
  - Type a part of the path and/or file desired
  - Press `Tab` once to add the remaining characters of the path/file
  - If it does not complete all the way, there may be similarly named paths/files
  - Press `Tab` twice to show all the possible paths/files to narrow the selection

- Shortcut for the current project directory, `.`

  ```bash
  code .  # Opens VSCode on the current directory of the terminal
  git init .
  ```

  - Alternatively, you can also just supply the full path of the desired directory wherever you may be

## Exercise

- Create a new directory in your home directory with the name `test`.

  - Will use the current project folder as "home"

  ```bash
  mkdir ./test
  ```

- Navigate to the `test` directory.

  ```bash
  cd test
  ```

- Create a new file called `test.txt`. _Hint: use the `touch` or `echo` command._

  ```bash
  touch test.txt
  ```

- Open your newly created file in VSCode and make some changes, save the file, and close it.

  ```bash
  code .
  # ...make changes in the editor then close..
  ```

- Navigate back out of the `test` directory.

  ```bash
  cd ..
  ```

- Delete the test directory.

  ```bash
  rm -rf ./test
  ```

<!--
## Additional Resources: _Notes_

### The Art of Command Line

**Meta**

- https://explainshell.com/

**Basics**

- [ **`man`** ]

  - Official documentation for commands, programs, etc.

  ```bash
  man «COMMAND»
  ```

- [ **`curl cheat.sh/«COMMAND»`** ]

  - Cheat sheet for a command or program
  - Alternative for `man «COMMAND»` or `«COMMAND» --help`
-->

## Knowledge Check

- What is the command line?

  - Window / Program for entering commands in

- How do you open the command line on your computer?

  - `Ctrl+T`
  - Search for **Command Prompt**
  - Open Git Bash
  - In VSCode: `Ctrl+``

- How can you navigate to a particular directory?

  ```bash
  cd <DIRECTORY_NAME>
  ```

- Where will `cd` on its own navigate you to?

  - The home directory

- Where will cd .. navigate you to?

  - Upwards on the directory hierarchy

- How do you display the name of the directory you are currently in?

  ```bash
  pwd
  ```

- How do you display the contents of the directory you are currently in?

  ```bash
  ls
  ```

- How do you create a new directory?

  ```bash
  mkdir <NEW_DIRECTORY_NAME>
  ```

- How do you create a new file?

  ```bash
  touch <NEW_FILE_NAME>
  # or
  echo <NEW_FILE_NAME>
  ```

- How do you destroy a directory or file?

  ```bash
  rm <FILENAME>
  rm -r <DIRECTORY_NAME>
  ```

- How do you rename a directory or file?

  ```bash
  mv <OLD_FILE_OR_DIRECTORY_NAME> <NEW_NAME>
  ```
