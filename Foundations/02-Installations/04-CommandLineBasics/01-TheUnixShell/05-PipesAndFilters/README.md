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
- _Overwrites_ file content if exists
  - **DO NOT** redirect to the same file!
  ```bash
  # Don't do this!
  COMMAND FILENAME > FILENAME
  ```

[ **`>>`** ]

- Also a **redirect** operator
- However, instead of _overwriting_ existing files, it **_appends_** to it instead

```bash
Mark@Experiment MINGW64 proteins (main)
$ ls
cubane.pdb  lengths.txt  octane.pdb   propane.pdb
ethane.pdb  methane.pdb  pentane.pdb  sorted-lengths.txt

Mark@Experiment MINGW64 proteins (main)
$ echo hello >> test.txt

Mark@Experiment MINGW64 proteins (main)
$ cat test.txt
hello

Mark@Experiment MINGW64 proteins (main)
$ echo hi >> test.txt

Mark@Experiment MINGW64 proteins (main)
$ cat test.txt
hello
hi
```

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

## Filtering output

[ **`sort`** ]

```bash
Mark@Experiment MINGW64 exercise-data (main)
$ ls
animal-counts/  backup/  creatures/  numbers.txt  project/  proteins/  writing/

Mark@Experiment MINGW64 exercise-data (main)
$ cat numbers.txt  # File to be `sort`ed
10
2
19
22
6

Mark@Experiment MINGW64 exercise-data (main)
$ sort numbers.txt  # Sorts by alphabenumerical order
10
19
2
22
6

Mark@Experiment MINGW64 exercise-data (main)
$ sort -n numbers.txt  # Sorts by numerical order
2
6
10
19
22
```

### File preview

[ **`head`** ] and [ **`tail`** ]

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

Mark@Experiment MINGW64 proteins (main)
$ head -n 1 lengths.txt  # First few lines
  20 cubane.pdb

Mark@Experiment MINGW64 proteins (main)
$ head -n 3 lengths.txt
  20 cubane.pdb
  12 ethane.pdb
   9 methane.pdb

Mark@Experiment MINGW64 proteins (main)
$ tail -n 1 lengths.txt  # Last few lines
 107 total

Mark@Experiment MINGW64 proteins (main)
$ tail -n 3 lengths.txt
  21 pentane.pdb
  15 propane.pdb
 107 total
```

- `tail -f «FILENAME»` follows the file as it grows. Useful for logs

## Passing output to another command

[ **`|`** ]

- **Pipe** operator
- Feeds the output of the first command (_left_) onto the second command (_right_)

  ```bash
  Mark@Experiment MINGW64 proteins (main)
  $ ls
  cubane.pdb   methane.pdb  propane.pdb
  ethane.pdb   octane.pdb   sorted-lengths.txt
  lengths.txt  pentane.pdb  test.txt

  Mark@Experiment MINGW64 proteins (main)
  $ sort -n lengths.txt
     9 methane.pdb
    12 ethane.pdb
    15 propane.pdb
    20 cubane.pdb
    21 pentane.pdb
    30 octane.pdb
   107 total

  Mark@Experiment MINGW64 proteins (main)
  $ sort -n lengths.txt | head -n 1
     9 methane.pdb

  Mark@Experiment MINGW64 proteins (main)
  $ sort -n lengths.txt | head -n 3
     9 methane.pdb
    12 ethane.pdb
    15 propane.pdb
  ```

- Can be chained multiple times

  ```bash
  Mark@Experiment MINGW64 proteins (main)
  $ ls
  cubane.pdb   methane.pdb  propane.pdb
  ethane.pdb   octane.pdb   sorted-lengths.txt
  lengths.txt  pentane.pdb  test.txt

  Mark@Experiment MINGW64 proteins (main)
  $ wc -l *.pdb
    20 cubane.pdb
    12 ethane.pdb
     9 methane.pdb
    30 octane.pdb
    21 pentane.pdb
    15 propane.pdb
   107 total

  Mark@Experiment MINGW64 proteins (main)
  $ wc -l *.pdb | sort -n
     9 methane.pdb
    12 ethane.pdb
    15 propane.pdb
    20 cubane.pdb
    21 pentane.pdb
    30 octane.pdb
   107 total

  Mark@Experiment MINGW64 proteins (main)
  $ wc -l *.pdb | sort -n | head -n 3
     9 methane.pdb
    12 ethane.pdb
    15 propane.pdb
  ```

## Tools designed to work together

### Pipe Reading Comprehension

A file called `animals.csv` (in the `shell-lesson-data/exercise-data/animal-counts` folder) contains the following data:

```
2012-11-05,deer,5
2012-11-05,rabbit,22
2012-11-05,raccoon,7
2012-11-06,rabbit,19
2012-11-06,deer,2
2012-11-06,fox,4
2012-11-07,rabbit,16
2012-11-07,bear,1
```

What text passes through each of the pipes and the final redirect in the pipeline below? Note, the `sort -r` command sorts in reverse order.

```bash
$ cat animals.csv | head -n 5 | tail -n 3 | sort -r > final.txt
```

- `cat animals.csv`
  ```bash
  # Full text file
  2012-11-05,deer,5
  2012-11-05,rabbit,22
  2012-11-05,raccoon,7
  2012-11-06,rabbit,19
  2012-11-06,deer,2
  2012-11-06,fox,4
  2012-11-07,rabbit,16
  2012-11-07,bear,1
  ```
- `| head -n 5`

  ```bash
  ## First five (5) lines of previous output

  2012-11-05,deer,5
  2012-11-05,rabbit,22
  2012-11-05,raccoon,7
  2012-11-06,rabbit,19
  2012-11-06,deer,2
  # 2012-11-06,fox,4
  # 2012-11-07,rabbit,16
  # 2012-11-07,bear,1
  ```

- `| tail -n 3`

  ```bash
  ## Last three (3) lines of previous output

  # 2012-11-05,deer,5
  # 2012-11-05,rabbit,22
  2012-11-05,raccoon,7
  2012-11-06,rabbit,19
  2012-11-06,deer,2
  # 2012-11-06,fox,4
  # 2012-11-07,rabbit,16
  # 2012-11-07,bear,1

  ```

- `| sort -r`

  ```bash
  ## Sort by reversed (alphanumerical) order, i.e. greatest to least
  ## Nov 6th dates would come first than 5th
  ## Character `r` would come first before `d`
  2012-11-06,rabbit,19
  2012-11-06,deer,2
  2012-11-05,raccoon,7
  ```

- `> final.txt`

  ```bash
  ## The previous output would be written to `final.txt`
  Mark@Experiment MINGW64 animal-counts (main)
  $ cat final.txt
  2012-11-06,rabbit,19
  2012-11-06,deer,2
  2012-11-05,raccoon,7
  ```

### Pipe Construction

For the file `animals.csv` from the previous exercise, consider the following command:

```bash
$ cut -d , -f 2 animals.csv
```

The `cut` command is used to remove or ‘cut out’ certain sections of each line in the file, and `cut` expects the lines to be separated into columns by a `Tab` character. A character used in this way is a called a **delimiter**. In the example above we use the `-d` option to specify the comma as our delimiter character. We have also used the `-f` option to specify that we want to extract the second field (column). This gives the following output:

```
deer
rabbit
raccoon
rabbit
deer
fox
rabbit
bear
```

The `uniq` command filters out adjacent matching lines in a file. How could you extend this pipeline (using `uniq` and another command) to find out what animals the file contains (without any duplicates in their names)?

I got the following answer from `uniq`'s help page (`uniq --help`), which states:

> Note: 'uniq' does not detect repeated lines unless they are adjacent. You may want to sort the input first, or use 'sort -u' without 'uniq'.

- Get the animal names in the file, `sort` it first, then use `uniq`

  ```bash
  Mark@Experiment MINGW64 animal-counts (main)
  $ cut -d , -f 2 animals.csv | sort | uniq
  bear
  deer
  fox
  rabbit
  raccoon
  ```

  - Sorting is necessary because `uniq` truncates "repeated adjacent lines", i.e. the repeat lines must be consecutive for it to work properly

- `sort` can also do it on its own
  ```bash
  Mark@Experiment MINGW64 animal-counts (main)
  $ cut -d , -f 2 animals.csv | sort -u
  bear
  deer
  fox
  rabbit
  raccoon
  ```
