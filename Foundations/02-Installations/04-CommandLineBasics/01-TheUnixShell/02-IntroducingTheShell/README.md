# _The Unix Shell: Introducing the Shell_ progress

## Commands

`ls`

- `$ ls` | List current directory (no arguments passed)

  ```bash
  Mark@Experiment MINGW64 02-IntroducingTheShell (main)
  $ ls
  README.md
  ```

- `$ ls ~` | List home (`~`) directory

  ```bash
  Mark@Experiment MINGW64 02-IntroducingTheShell (main)
  $ ls ~
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
  ```

- `$ cd` | Change to directory specified; home (`~`) if not specified

  ```bash
  Mark@Experiment MINGW64 02-IntroducingTheShell (main)
  $ cd

  Mark@Experiment MINGW64 ~
  $
  ```

- `$ cd -` | Move back to "previous" directory, e.g. before the previous `cd` was executed

  - https://askubuntu.com/questions/409121/what-does-cd-cd-hyphen-do

  ```bash
  Mark@Experiment MINGW64 ~
  $ cd -
  /d/__files/GitHub/top2/Foundations/02-Installations/04-CommandLineBasics/01-TheUnixShell/02-IntroducingTheShell

  Mark@Experiment MINGW64 02-IntroducingTheShell (main)
  $
  ```
