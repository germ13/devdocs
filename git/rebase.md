
# Rebase


## on master
`git pull` # synch up with others

## create feature and commit

```bash
git checkout -b my-feature
git add .
git commit -m "add first feature commit"
git add .
git commit -m "add second feature commit"
git add .
```

## rebase
```
git checkout master  # assure one is synched up
git pull

git checkout my-feature # anchors feature branch against local master
git rebase master # any conflicts, git will point them out here and one can fix

git checkout master 
git rebase my-feature # replay feature commits on master

## push
git push
