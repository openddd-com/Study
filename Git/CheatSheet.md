# configure tooling

set the name you want attached to your commit transactions

```bash
git config --global user.name "[name]"
```

```bash
git config --global user.email "[email address]"
```

```bash
git config --global color.ui auto
```

# create repositories
```bash
git init [project-name]
```
```bash
git clone [url]
```
 # make changes

 ```bash
 git status
//Lists all new or modified files to be committed
 git diff
//Show file diffrences not yet staged
 git add [file]
//Snapshots the file in preparation for versioning
 git diff --staged
//Shows file differences between staging and the last file version
 git reset [file]
//Unstages the file,but preserve its contents
 git commit -m "[discriptive message]"
 //Records files snapshots permanently in version history.
 ```

  # Group changes
  ```bash
  git branch
  >>Lists all local branches in the current reposity
  git branch [branch name]
  //Create a new branch
  git checkout [branch name]
  //Switches the specified branch`s history into the current branch
  git merge [branch]
  //Combines the specified branch`s history into the current branch
  git branch -d [branch-name]
  //Delete the specified branch
  ```

# Refactor filenames
```bash
git rm [file]
//Deletes the file from the working directory and stages the deletion
git rm --cached [file]
//Removes the file from version control but preserves the file locally
git mv [file-orignal] [file-renamed]
//changes the file name and prepares it for commit.
```
# Suppress tracking

a text file named .gitgnore suppresses like:
```bash
*.log
build/
temp-*
```
```bash
git ls-files --others --ignored --exclude-standard
//Lists all ignored files in this project.
```
# Save Fragments
```bash
git stash
//Temporarily stores all modified tracked files
git stash pop
// Restores the most recently stashed files
git stash list
//lists all stashed changesets
git stash drop
//Discards the most recently stashed changeset
```
# Review History
```bash
git log

git log --follow [file]
// a file,including renames
git diff [first-branch]...[second-branch]
git show [commit]
```
# Redo commit
```bash
git reset [commit]
//Undoes all commits after [commit],preserving changes locally
git reset --hard [commit]
//Discards all history and changes back to the specified commit
```
# Synchronize changes
```bash
git fetch [bookmark]
//Downloads all history from the repository bookmark
git merge [bookmark]/branch
//Combines bookmark`s branch into current local branch
git push [alias][branch]
//Uploads all local branch commits to GitHub
git pull
//Downloads bookmark history and incorporates changes
```