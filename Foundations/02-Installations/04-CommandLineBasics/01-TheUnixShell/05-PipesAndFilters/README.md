# _The Unix Shell: Pipes and Filters_ progress

[ **`wc`** ]

- Word Count

```bash
Mark@Experiment MINGW64 proteins (main)
$ ls
cubane.pdb  methane.pdb  pentane.pdb
ethane.pdb  octane.pdb   propane.pdb

Mark@Experiment MINGW64 proteins (main)
$ wc cubane.pdb  # No. of lines, words, & charaters in file
  20  156 1158 cubane.pdb

Mark@Experiment MINGW64 proteins (main)
$ wc *.pdb
  20  156 1158 cubane.pdb
  12   84  622 ethane.pdb
   9   57  422 methane.pdb
  30  246 1828 octane.pdb
  21  165 1226 pentane.pdb
  15  111  825 propane.pdb
 107  819 6081 total

Mark@Experiment MINGW64 proteins (main)
$ wc -l *.pdb  # Only no. of lines
  20 cubane.pdb
  12 ethane.pdb
   9 methane.pdb
  30 octane.pdb
  21 pentane.pdb
  15 propane.pdb
 107 total
```

## Capturing output from commands

[ **`>`** ]

- **Redirect** operator
- Often used to redirect output into a file

```bash
Mark@Experiment MINGW64 proteins (main)
$ wc -l *.pdb > lengths.txt
```

- The command above redirects the output into a file named `lengths.txt`
- If it does not exist, it gets created

## Showing file contents on terminal

- [ **`cat`** ]

  - Con**cat**enates file contents to standard output, i.e. terminal

  ```bash
  Mark@Experiment MINGW64 proteins (main)
  $ cat lengths.txt
    20 cubane.pdb
    12 ethane.pdb
     9 methane.pdb
    30 octane.pdb
    21 pentane.pdb
    15 propane.pdb
   107 total
  ```

- [ **`less`** ]

  - Similar functionality with `cat`, but only display a part of the content at once
  - Allows for scrolling up and down of file contents
  - The program `more` came first, but only allowed for scrolling down
  - `less` was developed as "`more` _but with backwards function_"
  - A pun with the saying "_Less is more_", which also says that `less` has more functionalities than `more`
  - Controls
    - `↓` to scroll down
    - `↑` to scroll up
    - `q` to quit

  ```bash
  Mark@Experiment MINGW64 proteins (main)
  $ less
    20 cubane.pdb
    12 ethane.pdb
     9 methane.pdb
    30 octane.pdb
    21 pentane.pdb
    15 propane.pdb
   107 total
  lengths.txt (END)
  ```
