# _The Unix Shell: Working With Files and Directories_ progress

## Create a directory

```bash
## Create directory(ies)
mkdir <DIRECTORY_NAME> <DIRECTORY_NAME> <DIRECTORY_NAME>

## Create directory(ies)
## AND, create its parent directories if non-existent
## (will normally raise an error)
mkdir -p <PARENT_DIR>/<CHILD_DIR> <PARENT_DIR>/<CHILD_DIR>

## List all directories and their subdirectories recursively
ls -R <DIRECTORY>
```

### Two ways of doing the same thing

- `mkdir`
- "Create New Folder" via GUI explorer

### Good names for files and directories

- Don’t use spaces
  - Used to separate arguments in commands
- Don’t begin the name with `-` (dash).
  - Used to prepend command flags
- Stick with...
  - letters
  - numbers
  - [ `.` ] period or _full stop_
  - [ `-` ] dash
  - [ `_` ] underscore

When other characters are used, enclose the path with quotation marks (`" "`)

## Create a text file

```bash
nano <TEXT_FILE_NAME>  # Will create file if does not exist
```

### Text editors

|                              OS |         CLI          |   GUI   |
| ------------------------------: | :------------------: | :-----: |
| **Unix <br> e.g. Linux, macOS** | Emacs<br>Vim<br>Nano |  Gedit  |
|                     **Windows** |                      | Notepad |

### _Exercise_: Creating Files a Different Way

We have seen how to create text files using the `nano` editor. Now, try the following command:

```bash
touch my_file.txt
```

1. What did the `touch` command do? When you look at your current directory using the GUI file explorer, does the file show up?
   - Created a new file named `my_file.txt`
   - Yes
2. Use `ls -l` to inspect the files. How large is `my_file.txt`?
   - 0 bytes
3. When might you want to create a file this way?
   - If I don't necessarily want to add anything to the file yet
   - _Some program requires empty files to run properly_

## Moving files and directories

```bash
mv <SOURCE> <DESTINATION>  # i.e. cut and paste

## Can also be used for renaming files
mv <OLD_FILENAME> <NEW_FILENAME>

## NOTE: Will overwrite destination path if existing!!!
```

### _Exercise_: Moving Files to a new folder

After running the following commands, Jamie realizes that she put the files `sucrose.dat` and `maltose.dat` into the wrong folder. The files should have been placed in the `raw` folder.

```bash
$ ls -F
 analyzed/ raw/
$ ls -F analyzed
fructose.dat glucose.dat maltose.dat sucrose.dat
$ cd analyzed
```

Fill in the blanks to move these files to the `raw/` folder (i.e. the one she forgot to put them in)

```bash
$ mv sucrose.dat maltose.dat ____/____
```

Answer:

```bash
mv sucrose.dat maltose.dat ../raw
```

- Apparently, `mv` can move multiple files!

  ```bash
  mv <F1> <F2> <F3> <DEST>
  ```

  - In case of multiple arguments, the last argument will always be treated as the Destination

## Copying files and directories

```bash
cp <SRC> <DEST>
cp -r <SRC_DIR> <DEST_DIR>  # Recursive; copies all content

## `ls` can be given multiple paths to list
ls <PATH1> <PATH2> <PATH3>
```

### _Exercise_: Renaming Files

Suppose that you created a plain-text file in your current directory to contain a list of the statistical tests you will need to do to analyze your data, and named it: `statstics.txt`

After creating and saving this file you realize you misspelled the filename! You want to correct the mistake, which of the following commands could you use to do so?

1. ❌ | `cp statstics.txt statistics.txt`
2. ✅ | `mv statstics.txt statistics.txt`
3. ❌ | `mv statstics.txt .`
4. ❌ | `cp statstics.txt .`

### _Exercise_: Moving and Copying

What is the output of the closing `ls` command in the sequence shown below?

```bash
$ mkdir recombined
$ mv proteins.dat recombined/
$ cp recombined/proteins.dat ../proteins-saved.dat
$ ls
```

Given

```bash
$ pwd
/Users/jamie/data
$ ls
proteins.dat
```

1. `proteins-saved.dat recombined`
2. `recombined`
3. `proteins.dat recombined`
4. `proteins-saved.dat`

- I answered 4; incorrect
- Correct answer is 2
  - `proteins.dat` was moved to `recombined/`
  - It was copied to a directory above the current directory

## Removing files and directories

```bash
rm <FILE_TO_DELETE>     # Only on files
rm -r <PATH_TO_DELETE>  # For folders (recursive)
rm -i ...               # Interactive; SHOULD BE USED WITH ABOVE COMMANDS

rm -i <FILE_TO_DELETE>z
rm -i -r <PATH_TO_DELETE>z
```

### _Exercise_: Using `rm` Safely

What happens when we execute `rm -i thesis_backup/quotations.txt`? Why would we want this protection when using `rm`?

- A prompt appears for confirming the delete
- Because `rm` is irreversible and permanent

## Operations with multiple files and directories

### _Exercise_: Copy with Multiple Filenames

For this exercise, you can test the commands in the `shell-lesson-data/exercise-data` directory.

In the example below, what does `cp` do when given several filenames and a directory name?

```bash
$ mkdir backup
$ cp creatures/minotaur.dat creatures/unicorn.dat backup/
```

- Copies files `minotaur.dat` and `unicorn.dat` to directory `backup`?

In the example below, what does `cp` do when given three or more file names?

```bash
$ cd creatures
$ ls -F
basilisk.dat  minotaur.dat  unicorn.dat
$ cp minotaur.dat unicorn.dat basilisk.dat
```

- I had no answer
- Upon trying, command complains that `basilisk.dat` is not a directory
- Makes sense since the last argument should have been treated as the copy destination

### Using wildcards for accessing multiple files at once

```bash
$ ls proteins
cubane.pdb  ethane.pdb  methane.pdb  octane.pdb  pentane.pdb  propane.pdb
```

- [ `*` ] is ~~the~~ _wildcard_ character
  - Matches 0 or more characters
  - Examples:
    - `*.pdb`
      ```
      cubane.pdb  ethane.pdb  methane.pdb  octane.pdb  pentane.pdb  propane.pdb
      ```
    - `p*.pdb`
      ```
      pentane.pdb  propane.pdb
      ```
- [ `?` ] also a wildcard character
  - Matches **exactly one** character
  - Examples:
    - `?ethane.pdb`
      ```bash
      methane.pdb
      ```
    - `*ethane.pdb`
      ```bash
      ethane.pdb methane.pdb
      ```

#### _Exercise_: List filenames matching a pattern

When run in the `proteins` directory, which `ls` command(s) will produce this output?

`ethane.pdb methane.pdb`

1. `ls *t*ane.pdb`
2. `ls *t?ne.*`
3. `ls *t??ne.pdb`
4. `ls ethane.*`

- I answered 1, 2
- Correct answer 3

#### _Exercise_: More on Wildcards

Sam has a directory containing calibration data, datasets, and descriptions of the datasets:

```bash
.
├── 2015-10-23-calibration.txt
├── 2015-10-23-dataset1.txt
├── 2015-10-23-dataset2.txt
├── 2015-10-23-dataset_overview.txt
├── 2015-10-26-calibration.txt
├── 2015-10-26-dataset1.txt
├── 2015-10-26-dataset2.txt
├── 2015-10-26-dataset_overview.txt
├── 2015-11-23-calibration.txt
├── 2015-11-23-dataset1.txt
├── 2015-11-23-dataset2.txt
├── 2015-11-23-dataset_overview.txt
├── backup
│   ├── calibration
│   └── datasets
└── send_to_bob
    ├── all_datasets_created_on_a_23rd
    └── all_november_files
```

Before heading off to another field trip, she wants to back up her data and send some datasets to her colleague Bob. Sam uses the following commands to get the job done:

```bash
$ cp *dataset* backup/datasets
$ cp ____calibration____ backup/calibration
$ cp 2015-____-____ send_to_bob/all_november_files/
$ cp ____ send_to_bob/all_datasets_created_on_a_23rd/
```

Help Sam by filling in the blanks.

The resulting directory structure should look like this

```bash
.
├── 2015-10-23-calibration.txt
├── 2015-10-23-dataset1.txt
├── 2015-10-23-dataset2.txt
├── 2015-10-23-dataset_overview.txt
├── 2015-10-26-calibration.txt
├── 2015-10-26-dataset1.txt
├── 2015-10-26-dataset2.txt
├── 2015-10-26-dataset_overview.txt
├── 2015-11-23-calibration.txt
├── 2015-11-23-dataset1.txt
├── 2015-11-23-dataset2.txt
├── 2015-11-23-dataset_overview.txt
├── backup
│   ├── calibration
│   │   ├── 2015-10-23-calibration.txt
│   │   ├── 2015-10-26-calibration.txt
│   │   └── 2015-11-23-calibration.txt
│   └── datasets
│       ├── 2015-10-23-dataset1.txt
│       ├── 2015-10-23-dataset2.txt
│       ├── 2015-10-23-dataset_overview.txt
│       ├── 2015-10-26-dataset1.txt
│       ├── 2015-10-26-dataset2.txt
│       ├── 2015-10-26-dataset_overview.txt
│       ├── 2015-11-23-dataset1.txt
│       ├── 2015-11-23-dataset2.txt
│       └── 2015-11-23-dataset_overview.txt
└── send_to_bob
    ├── all_datasets_created_on_a_23rd
    │   ├── 2015-10-23-dataset1.txt
    │   ├── 2015-10-23-dataset2.txt
    │   ├── 2015-10-23-dataset_overview.txt
    │   ├── 2015-11-23-dataset1.txt
    │   ├── 2015-11-23-dataset2.txt
    │   └── 2015-11-23-dataset_overview.txt
    └── all_november_files
        ├── 2015-11-23-calibration.txt
        ├── 2015-11-23-dataset1.txt
        ├── 2015-11-23-dataset2.txt
        └── 2015-11-23-dataset_overview.txt
```

My answer:

```bash
$ cp *dataset* backup/datasets
$ cp *calibration* backup/calibration
$ cp 2015-11-* send_to_bob/all_november_files/
$ cp *23* send_to_bob/all_datasets_created_on_a_23rd/
```

- Last answer should be `*-23-dataset*` because only datasets were needed

#### _Exercise_: Organizing Directories and Files

#### _Exercise_: :

Jamie is working on a project and she sees that her files aren’t very well organized

```bash
$ ls -F
analyzed/  fructose.dat    raw/   sucrose.dat
```

The `fructose.dat` and `sucrose.dat` files contain output from her data analysis. What command(s) covered in this lesson does she need to run so that the commands below will produce the output shown?

```bash
$ ls -F
analyzed/   raw/

$ ls analyzed
fructose.dat    sucrose.dat
```

My answer

```bash
mv fructose.dat sucrose.dat analyzed/
```

- Could've just been `mv *.dat analyzed` because we're talking about wildcards here 😂🤦🏼‍♂️

#### _Exercise_: Reproduce a folder structure

You’re starting a new experiment and would like to duplicate the directory structure from your previous experiment so you can add new data.

Assume that the previous experiment is in a folder called `2016-05-18`, which contains a `data` folder that in turn contains folders named `raw` and `processed` that contain data files.

```bash
2016-05-18
  - data
    - raw
    - processed
      - *data files*
```

The goal is to copy the folder structure of the `2016-05-18` folder into a folder called `2016-05-20` so that your final directory structure looks like this:

```
2016-05-20/
└── data
   ├── processed
   └── raw
```

Which of the following set of commands would achieve this objective? What would the other commands do?

- ✅ Option 1
  ```bash
  $ mkdir 2016-05-20
  $ mkdir 2016-05-20/data
  $ mkdir 2016-05-20/data/processed
  $ mkdir 2016-05-20/data/raw
  ```
  - Good but could be better
- ✅ Option 2
  ```bash
  $ mkdir 2016-05-20
  $ cd 2016-05-20
  $ mkdir data
  $ cd data
  $ mkdir raw processed
  ```
  - Good but could be better
- ❌ Option 3
  ```bash
  $ mkdir 2016-05-20/data/raw
  $ mkdir 2016-05-20/data/processed
  ```
  - Will complain of non-existent directories
- ✅ Option 4
  ```bash
  $ mkdir -p 2016-05-20/data/raw
  $ mkdir -p 2016-05-20/data/processed
  ```
  - Best option maybe?
- ❌ Option 5
  ```bash
  $ mkdir 2016-05-20
  $ cd 2016-05-20
  $ mkdir data
  $ mkdir raw processed
  ```
  - Will make a flat subdirectory
