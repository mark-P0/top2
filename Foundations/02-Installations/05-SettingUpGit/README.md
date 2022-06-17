# Setting Up Git

> Git has already been set up from the start of this journey.

## Step 1. Install Git

I was using Windows, so I install Git from https://git-scm.com/download/win

This came with Git Bash, which is the terminal I have been using for this journey.

## Step 2. Configure Git and GitHub

### Step 2.1. Setup Git

```bash
# Identity for commits
git config --global user.name "Your Name"
git config --global user.email "yourname@example.com"

# Default branch (formerly `master`)
git config --global init.defaultBranch main

# Colorful `git` output
git config --global color.ui auto

# Verify configurations
git config --get user.name
git config --get user.email
```

### Step 2.2: Create a GitHub Account or Sign In

I already have a GitHub account

https://github.com/mark-P0/

### Step 2.3: Create an SSH Key

The guide uses **Ed25519**. However, I seem to remember using **RSA** before.

```bash
Mark@Experiment MINGW64 top2 (main)
$ ls ~/.ssh
 id_rsa   id_rsa.pub   known_hosts  'known_hosts - Copy'
```

Nevertheless, I created one again.

### Step 2.4: Link Your SSH Key with GitHub

- Login to GitHub account
- Open top-right profile menu » **Settings**
- On the left panel, click **SSH and GPG keys**
- Click **New SSH key**
- On local machine, copy public SSH key generated previously at:
  ```bash
  cat ~/.ssh/id_ed25519.pub
  ```
- Paste to GitHub box form
- (_Optional_) Add an identifying title for the key
- Save key with **Add SSH key**

### Step 2.5 Testing your key

- Open terminal
- Enter the following:
  ```bash
  ssh -T git@github.com
  ```
- Might receive the following:
  > The authenticity of host 'github.com (IP ADDRESS)' can't be established.
  > RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
  > Are you sure you want to continue connecting (yes/no)?
- Verify that the fingerprint in the message you see matches GitHub's public key fingerprint.
  - From https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints
  ```
  SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8 (RSA)
  SHA256:p2QAMXNIC1TJYWeIOttrVc98/R1BUFWu3/LiyKgUfQM (ECDSA)
  SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU (Ed25519)
  ```
- If they are the same, type `yes`. Then see the following:
  > Hi `username`! You've successfully authenticated, but GitHub does not provide shell access.
- Success!
  - If "permission denied", try https://docs.github.com/en/authentication/troubleshooting-ssh/error-permission-denied-publickey
