# _The Unix Shell: Navigating Files and Directories_ progress

- **`pwd`**
- **`cd`**
- **`ls`**
- **`ls -F`**
  - "_classi**F**y_" or "_**F**ull_" flag
  - Git Bash on Windows seems to use this by default...
  - Trailing character meanings:
    - [ **`/`** ] **Directory**. Folder
    - [ **`@`** ] **Link**. Shortcut? Hard / Soft link?
    - [ **`*`** ] **Executable**. No executables on output below
- **`cd -`**

```bash
Mark@Experiment MINGW64 03-NavigatingFilesAndDirectories (main)
$ pwd
/d/__files/GitHub/top2/Foundations/02-Installations/04-CommandLineBasics/01-TheUnixShell/03-NavigatingFilesAndDirectories

Mark@Experiment MINGW64 03-NavigatingFilesAndDirectories (main)
$ cd

Mark@Experiment MINGW64 ~
$ ls
'3D Objects'/                ntuser.dat.log2
 AppData/                    NTUSER.DAT{1c3790b4-b8ad-11e8-aa21-e41d2d101530}.TM.blf
'Application Data'@          NTUSER.DAT{1c3790b4-b8ad-11e8-aa21-e41d2d101530}.TMContainer00000000000000000001.regtrans-ms
'Cisco Packet Tracer 8.0'/   NTUSER.DAT{1c3790b4-b8ad-11e8-aa21-e41d2d101530}.TMContainer00000000000000000002.regtrans-ms
 Contacts/                   ntuser.dat{67b89ef1-691c-11eb-8ec0-54ab3ae59e0b}.TM.blf
 Cookies@                    ntuser.dat{67b89ef1-691c-11eb-8ec0-54ab3ae59e0b}.TMContainer00000000000000000001.regtrans-ms
 Desktop/                    ntuser.dat{67b89ef1-691c-11eb-8ec0-54ab3ae59e0b}.TMContainer00000000000000000002.regtrans-ms
 Documents/                  ntuser.dat{d5fe8ec3-691e-11eb-8ec1-54ab3ae59e0b}.TM.blf
 Favorites/                  ntuser.dat{d5fe8ec3-691e-11eb-8ec1-54ab3ae59e0b}.TMContainer00000000000000000001.regtrans-ms
 Heaven/                     ntuser.dat{d5fe8ec3-691e-11eb-8ec1-54ab3ae59e0b}.TMContainer00000000000000000002.regtrans-ms
 inittk.ini                  ntuser.ini
 inst.ini                    nuuid.ini
 Intel/                      OneDrive/
 IntelGraphicsProfiles/      PrintHood@
 keylogger.log               Recent@
 keyloggerCopy.log          'Saved Games'/
 Links/                      Searches/
'Local Settings'@            SendTo@
'My Documents'@              source/
'NCH Software Suite'/       'Start Menu'@
 NetHood@                    Templates@
 Nox_share/                  useruid.ini
 ntuser.dat                 'VirtualBox VMs'/
 ntuser.dat.log1             vmlogs/

Mark@Experiment MINGW64 ~
$ ls -F
'3D Objects'/                ntuser.dat.log2
 AppData/                    NTUSER.DAT{1c3790b4-b8ad-11e8-aa21-e41d2d101530}.TM.blf
'Application Data'@          NTUSER.DAT{1c3790b4-b8ad-11e8-aa21-e41d2d101530}.TMContainer00000000000000000001.regtrans-ms
'Cisco Packet Tracer 8.0'/   NTUSER.DAT{1c3790b4-b8ad-11e8-aa21-e41d2d101530}.TMContainer00000000000000000002.regtrans-ms
 Contacts/                   ntuser.dat{67b89ef1-691c-11eb-8ec0-54ab3ae59e0b}.TM.blf
 Cookies@                    ntuser.dat{67b89ef1-691c-11eb-8ec0-54ab3ae59e0b}.TMContainer00000000000000000001.regtrans-ms
 Desktop/                    ntuser.dat{67b89ef1-691c-11eb-8ec0-54ab3ae59e0b}.TMContainer00000000000000000002.regtrans-ms
 Documents/                  ntuser.dat{d5fe8ec3-691e-11eb-8ec1-54ab3ae59e0b}.TM.blf
 Favorites/                  ntuser.dat{d5fe8ec3-691e-11eb-8ec1-54ab3ae59e0b}.TMContainer00000000000000000001.regtrans-ms
 Heaven/                     ntuser.dat{d5fe8ec3-691e-11eb-8ec1-54ab3ae59e0b}.TMContainer00000000000000000002.regtrans-ms
 inittk.ini                  ntuser.ini
 inst.ini                    nuuid.ini
 Intel/                      OneDrive/
 IntelGraphicsProfiles/      PrintHood@
 keylogger.log               Recent@
 keyloggerCopy.log          'Saved Games'/
 Links/                      Searches/
'Local Settings'@            SendTo@
'My Documents'@              source/
'NCH Software Suite'/       'Start Menu'@
 NetHood@                    Templates@
 Nox_share/                  useruid.ini
 ntuser.dat                 'VirtualBox VMs'/
 ntuser.dat.log1             vmlogs/

Mark@Experiment MINGW64 ~
$ cd -
/d/__files/GitHub/top2/Foundations/02-Installations/04-CommandLineBasics/01-TheUnixShell/03-NavigatingFilesAndDirectories

Mark@Experiment MINGW64 03-NavigatingFilesAndDirectories (main)
$
```

## Clearing your terminal

- **`clear`**
  - Actual clearing
- **`<Ctrl + L>`**
  - Move prompt to top
  - Declutters terminal window
  - Does not actually clear; can still scroll up for previous output

## Getting help

Generally, the following syntax works:

```bash
<COMMAND> --help

# Or...

man <COMMAND>  # Not available in Git Bash (Windows)
```

e.g.

```bash
Mark@Experiment MINGW64 03-NavigatingFilesAndDirectories (main)
$ ls --help
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).
Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.

Mandatory arguments to long options are mandatory for short options too.
  -a, --all                  do not ignore entries starting with .
  -A, --almost-all           do not list implied . and ..
      --author               with -l, print the author of each file
  -b, --escape               print C-style escapes for nongraphic characters
      --block-size=SIZE      with -l, scale sizes by SIZE when printing them;
                               e.g., '--block-size=M'; see SIZE format below
  -B, --ignore-backups       do not list implied entries ending with ~
  -c                         with -lt: sort by, and show, ctime (time of last
                               modification of file status information);
                               with -l: show ctime and sort by name;
                               otherwise: sort by ctime, newest first
  -C                         list entries by columns
      --color[=WHEN]         colorize the output; WHEN can be 'always' (default
                               if omitted), 'auto', or 'never'; more info below
  -d, --directory            list directories themselves, not their contents
  -D, --dired                generate output designed for Emacs\' dired mode
  -f                         do not sort, enable -aU, disable -ls --color
  -F, --classify             append indicator (one of */=>@|) to entries
      --file-type            likewise, except do not append '*'
      --format=WORD          across -x, commas -m, horizontal -x, long -l,
                               single-column -1, verbose -l, vertical -C
      --full-time            like -l --time-style=full-iso

  ... (truncated)

Mark@Experiment MINGW64 03-NavigatingFilesAndDirectories (main)
$
```

### Exercises

- You can also use two options at the same time. What does the command `ls` do when used with the `-l` option? What about if you use both the `-l` and the `-h` option?

  Some of its output is about properties that we do not cover in this lesson (such as file permissions and ownership), but the rest should be useful nevertheless.

  - [ **` -l`** ] Long listing format.
  - [ **` -h`** ] Human-readable sizes; powers of 1024 (something something binary)
    - Needs(?) to be used together with either `-l` or `-s` (allocated file sizes, in blocks)
    - [ `--human-readable` ] Full flag name
    - [ `--si` ] Use 1000 instead of 1024 (metric something)
  - [ **`-lh`** ] Long-list files, and use human-readable sizes

  ```bash
  Mark@Experiment MINGW64 03-NavigatingFilesAndDirectories (main)
  $ ls ~ -l
  total 35957
  drwxr-xr-x 1 Mark 197121        0 Mar 14 16:41 '3D Objects'/
  drwxr-xr-x 1 Mark 197121        0 Dec  6  2020  AppData/
  lrwxrwxrwx 1 Mark 197121       29 Dec  6  2020 'Application Data' -> /c/Users/Mark/AppData/Roaming/
  drwxr-xr-x 1 Mark 197121        0 Dec 20 04:57 'Cisco Packet Tracer 8.0'/
  drwxr-xr-x 1 Mark 197121        0 Mar 14 16:41  Contacts/
  lrwxrwxrwx 1 Mark 197121       57 Dec  6  2020  Cookies -> /c/Users/Mark/AppData/Local/Microsoft/Windows/INetCookies/
  drwxr-xr-x 1 Mark 197121        0 Apr  5 23:27  Desktop/
  drwxr-xr-x 1 Mark 197121        0 Mar 25 13:11  Documents/
  drwxr-xr-x 1 Mark 197121        0 Mar 14 16:41  Favorites/
  drwxr-xr-x 1 Mark 197121        0 Feb  6  2021  Heaven/
  -rw-r--r-- 1 Mark 197121       66 Apr 26 18:20  inittk.ini
  -rw-r--r-- 1 Mark 197121       41 Apr 26 18:20  inst.ini
  drwxr-xr-x 1 Mark 197121        0 Feb  7  2021  Intel/
  drwxr-xr-x 1 Mark 197121        0 Jun  2 12:27  IntelGraphicsProfiles/
  -rw-r--r-- 1 Mark 197121  6895408 Mar 28 01:23  keylogger.log
  -rw-r--r-- 1 Mark 197121  6902521 Apr  5 22:28  keyloggerCopy.log
  drwxr-xr-x 1 Mark 197121        0 Mar 14 16:41  Links/
  lrwxrwxrwx 1 Mark 197121       27 Dec  6  2020 'Local Settings' -> /c/Users/Mark/AppData/Local/
  lrwxrwxrwx 1 Mark 197121       23 Dec  6  2020 'My Documents' -> /c/Users/Mark/Documents/
  drwxr-xr-x 1 Mark 197121        0 Jan 11  2021 'NCH Software Suite'/
  lrwxrwxrwx 1 Mark 197121       65 Dec  6  2020  NetHood -> '/c/Users/Mark/AppData/Roaming/Microsoft/Windows/Network Shortcuts'/
  drwxr-xr-x 1 Mark 197121        0 Apr 26 18:20  Nox_share/
  -rw-r--r-- 1 Mark 197121 13369344 Jun  2 04:42  ntuser.dat
  -rw-r--r-- 1 Mark 197121  3380224 Dec  6  2020  ntuser.dat.log1
  -rw-r--r-- 1 Mark 197121  2883584 Dec  6  2020  ntuser.dat.log2
  ... (truncated)

  Mark@Experiment MINGW64 03-NavigatingFilesAndDirectories (main)
  $ ls ~ -lh
  total 36M
  drwxr-xr-x 1 Mark 197121    0 Mar 14 16:41 '3D Objects'/
  drwxr-xr-x 1 Mark 197121    0 Dec  6  2020  AppData/
  lrwxrwxrwx 1 Mark 197121   29 Dec  6  2020 'Application Data' -> /c/Users/Mark/AppData/Roaming/
  drwxr-xr-x 1 Mark 197121    0 Dec 20 04:57 'Cisco Packet Tracer 8.0'/
  drwxr-xr-x 1 Mark 197121    0 Mar 14 16:41  Contacts/
  lrwxrwxrwx 1 Mark 197121   57 Dec  6  2020  Cookies -> /c/Users/Mark/AppData/Local/Microsoft/Windows/INetCookies/
  drwxr-xr-x 1 Mark 197121    0 Apr  5 23:27  Desktop/
  drwxr-xr-x 1 Mark 197121    0 Mar 25 13:11  Documents/
  drwxr-xr-x 1 Mark 197121    0 Mar 14 16:41  Favorites/
  drwxr-xr-x 1 Mark 197121    0 Feb  6  2021  Heaven/
  -rw-r--r-- 1 Mark 197121   66 Apr 26 18:20  inittk.ini
  -rw-r--r-- 1 Mark 197121   41 Apr 26 18:20  inst.ini
  drwxr-xr-x 1 Mark 197121    0 Feb  7  2021  Intel/
  drwxr-xr-x 1 Mark 197121    0 Jun  2 12:27  IntelGraphicsProfiles/
  -rw-r--r-- 1 Mark 197121 6.6M Mar 28 01:23  keylogger.log
  -rw-r--r-- 1 Mark 197121 6.6M Apr  5 22:28  keyloggerCopy.log
  drwxr-xr-x 1 Mark 197121    0 Mar 14 16:41  Links/
  lrwxrwxrwx 1 Mark 197121   27 Dec  6  2020 'Local Settings' -> /c/Users/Mark/AppData/Local/
  lrwxrwxrwx 1 Mark 197121   23 Dec  6  2020 'My Documents' -> /c/Users/Mark/Documents/
  drwxr-xr-x 1 Mark 197121    0 Jan 11  2021 'NCH Software Suite'/
  lrwxrwxrwx 1 Mark 197121   65 Dec  6  2020  NetHood -> '/c/Users/Mark/AppData/Roaming/Microsoft/Windows/Network Shortcuts'/
  drwxr-xr-x 1 Mark 197121    0 Apr 26 18:20  Nox_share/
  -rw-r--r-- 1 Mark 197121  13M Jun  2 04:42  ntuser.dat
  -rw-r--r-- 1 Mark 197121 3.3M Dec  6  2020  ntuser.dat.log1
  -rw-r--r-- 1 Mark 197121 2.8M Dec  6  2020  ntuser.dat.log2
  ... (truncated)

  ```

- By default, `ls` lists the contents of a directory in alphabetical order by name. The command `ls -t` lists items by time of last change instead of alphabetically. The command `ls -r` lists the contents of a directory in reverse order. Which file is displayed last when you combine the `-t` and `-r` options? Hint: You may need to use the `-l` option to see the last changed dates.

  - Displayed last is the most recent file.
  - [ **`ls ~ -ltr`** ] Show detailed list, sort by time, reverse the order

  ```bash
  Mark@Experiment MINGW64 03-NavigatingFilesAndDirectories (main)
  $ ls ~ -ltr
  total 35957
  -rw-r--r-- 1 Mark 197121  3380224 Dec  6  2020  ntuser.dat.log1
  -rw-r--r-- 1 Mark 197121  2883584 Dec  6  2020  ntuser.dat.log2
  -rw-r--r-- 1 Mark 197121   524288 Dec  6  2020  NTUSER.DAT{1c3790b4-b8ad-11e8-aa21-e41d2d101530}.TMContainer00000000000000000002.regtrans-ms
  -rw-r--r-- 1 Mark 197121   524288 Dec  6  2020  NTUSER.DAT{1c3790b4-b8ad-11e8-aa21-e41d2d101530}.TMContainer00000000000000000001.regtrans-ms
  lrwxrwxrwx 1 Mark 197121       23 Dec  6  2020 'My Documents' -> /c/Users/Mark/Documents/
  lrwxrwxrwx 1 Mark 197121       29 Dec  6  2020 'Application Data' -> /c/Users/Mark/AppData/Roaming/
  lrwxrwxrwx 1 Mark 197121       65 Dec  6  2020  NetHood -> '/c/Users/Mark/AppData/Roaming/Microsoft/Windows/Network Shortcuts'/
  lrwxrwxrwx 1 Mark 197121       65 Dec  6  2020  PrintHood -> '/c/Users/Mark/AppData/Roaming/Microsoft/Windows/Printer Shortcuts'/
  lrwxrwxrwx 1 Mark 197121       54 Dec  6  2020  SendTo -> /c/Users/Mark/AppData/Roaming/Microsoft/Windows/SendTo/
  lrwxrwxrwx 1 Mark 197121       54 Dec  6  2020  Recent -> /c/Users/Mark/AppData/Roaming/Microsoft/Windows/Recent/
  lrwxrwxrwx 1 Mark 197121       57 Dec  6  2020  Templates -> /c/Users/Mark/AppData/Roaming/Microsoft/Windows/Templates/
  lrwxrwxrwx 1 Mark 197121       58 Dec  6  2020 'Start Menu' -> '/c/Users/Mark/AppData/Roaming/Microsoft/Windows/Start Menu'/
  lrwxrwxrwx 1 Mark 197121       27 Dec  6  2020 'Local Settings' -> /c/Users/Mark/AppData/Local/
  lrwxrwxrwx 1 Mark 197121       57 Dec  6  2020  Cookies -> /c/Users/Mark/AppData/Local/Microsoft/Windows/INetCookies/
  drwxr-xr-x 1 Mark 197121        0 Dec  6  2020  AppData/
  -rw-r--r-- 1 Mark 197121       20 Dec  6  2020  ntuser.ini
  -rw-r--r-- 1 Mark 197121    65536 Dec  6  2020  NTUSER.DAT{1c3790b4-b8ad-11e8-aa21-e41d2d101530}.TM.blf
  drwxr-xr-x 1 Mark 197121        0 Dec 16  2020  OneDrive/
  drwxr-xr-x 1 Mark 197121        0 Jan 11  2021 'NCH Software Suite'/
  drwxr-xr-x 1 Mark 197121        0 Feb  6  2021  Heaven/
  drwxr-xr-x 1 Mark 197121        0 Feb  7  2021  Intel/
  -rw-r--r-- 1 Mark 197121   524288 Feb  7  2021  ntuser.dat{67b89ef1-691c-11eb-8ec0-54ab3ae59e0b}.TMContainer00000000000000000002.regtrans-ms
  -rw-r--r-- 1 Mark 197121   524288 Feb  7  2021  ntuser.dat{67b89ef1-691c-11eb-8ec0-54ab3ae59e0b}.TMContainer00000000000000000001.regtrans-ms
  -rw-r--r-- 1 Mark 197121    65536 Feb  7  2021  ntuser.dat{67b89ef1-691c-11eb-8ec0-54ab3ae59e0b}.TM.blf
  -rw-r--r-- 1 Mark 197121   524288 Feb  7  2021  ntuser.dat{d5fe8ec3-691e-11eb-8ec1-54ab3ae59e0b}.TMContainer00000000000000000002.regtrans-ms
  -rw-r--r-- 1 Mark 197121   524288 Feb  7  2021  ntuser.dat{d5fe8ec3-691e-11eb-8ec1-54ab3ae59e0b}.TMContainer00000000000000000001.regtrans-ms
  -rw-r--r-- 1 Mark 197121    65536 Feb  7  2021  ntuser.dat{d5fe8ec3-691e-11eb-8ec1-54ab3ae59e0b}.TM.blf
  drwxr-xr-x 1 Mark 197121        0 Dec 20 04:57 'Cisco Packet Tracer 8.0'/
  drwxr-xr-x 1 Mark 197121        0 Mar 14 16:41 '3D Objects'/
  drwxr-xr-x 1 Mark 197121        0 Mar 14 16:41  Contacts/
  drwxr-xr-x 1 Mark 197121        0 Mar 14 16:41  Favorites/
  drwxr-xr-x 1 Mark 197121        0 Mar 14 16:41  Searches/
  drwxr-xr-x 1 Mark 197121        0 Mar 14 16:41 'Saved Games'/
  ```

## Exploring other directories

```bash
ls <DIRECTORY>     # List contents of given directory
ls -F <DIRECTORY>

cd <DIRECTORY>     # Move to given directory

cd ..              # Go to parent directory

ls -a              # Show "all" files, including hidden
                   # and special symbols, e.g. `..`
```

- Relative paths

  - Subdirectories
  - [ `..` ] Parent directory
  - [ ` .` ] Current directory

- Absolute paths

  - [ `/` ] Root directory (topmost level)
  - [ `~` ] Home directory (user folder)
  - [ `-` ] Previous directory (user folder)

  ```bash
  Mark@Experiment MINGW64 03-NavigatingFilesAndDirectories (main)
  $ cd /

  Mark@Experiment MINGW64 /  # Root
  $ cd ~

  Mark@Experiment MINGW64 ~  # User folder
  $ cd -
  /

  Mark@Experiment MINGW64 /  # Previous folder (Root)
  $
  ```

- Difference
  - [ `cd ..` ] Brings you _up_
  - [ `cd -` ] Brings you _back_

### Exercises

- Starting from `/Users/amanda/data`, which of the following commands could Amanda use to navigate to her home directory, which is `/Users/amanda`?

  1. ❌ | `cd .`
  2. ❌ | `cd /`
  3. ❌ | `cd /home/amanda`
  4. ❌ | `cd ../..`
  5. ✅ | `cd ~`
  6. ❌ | `cd home`
  7. ❌ | `cd ~/data/..` → Also correct; unnecessarily verbose
  8. ❌ | `cd` → Also correct; defaults to home directory
  9. ✅ | `cd ..`

  **Only got 2 out of 4 correct answers (5, 7, 8, 9)**

- Using the filesystem diagram below, if `pwd` displays `/Users/thing`, what will `ls -F ../backup` display?

  ![Relative Path Resolution: Diagram](https://swcarpentry.github.io/shell-novice/fig/filesystem-challenge.svg)

  1. ❌ | `../backup: No such file or directory`
  2. ❌ | `2012-12-01 2013-01-08 2013-01-27`
  3. ❌ | `2012-12-01/ 2013-01-08/ 2013-01-27/`
  4. ✅ | `original/ pnas_final/ pnas_sub/`

- Using the filesystem diagram below, if `pwd` displays `/Users/backup`, and `-r` tells `ls` to display things in reverse order, what command(s) will result in the following output:

  ```bash
  pnas_sub/ pnas_final/ original/
  ```

  ![`ls` Reading Comprehension: Diagram](https://swcarpentry.github.io/shell-novice/fig/filesystem-challenge.svg)

  1. ❌ | `ls pwd`
  2. ✅ | `ls -r -F`
  3. ✅ | `ls -r -F /Users/backup` → Unnecessary; already at `/Users/backup`

## General syntax of a command

```bash
$ ls -F /
```

- [ `$` ] **Prompt**.
- [ `ls` ] **Command**.
- [ `-F` ] **Option(s)**. aka _flags_, _switches_
  - Case-sensitive, i.e. capitalization is important, generally speaking
- [ `/` ] **Argument(s)**. aka _parameters_
