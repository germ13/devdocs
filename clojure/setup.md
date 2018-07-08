# Setting up Clojure environment on Emacs

## Prerequisistes

Clojure 1.5+
Emacs 24.x+

## %HOME%

Add environment variable: c:\Users\germ13

 
## Packages

In `~/.emacs.d/init.el` file add the following:

``` Lisp
(require 'package)
(add-to-list 'package-archives
             '("melpa-stable" . "http://stable.melpa.org/packages/") t)
(package-initialize)
```

Execute a `M-x package-refresh-contents` command to update package listing.

Add this to `init.el` to load packages necessary for Clojure environment:

```lisp
(defvar my-packages '(better-defaults
                      projectile
                      clojure-mode
                      cider))

(dolist (p my-packages)
  (unless (package-installed-p p)
    (package-install p)))
```

## Using Lien


```bash
lein new command-line-args
cd command-line-args
```

## Setting up project to work with Cider

```lisp
(defproject command-line-args "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.6.0"]]
  :profiles {:dev {:plugins [[cider/cider-nrepl "0.7.0"]]}})
 ```

## Using Cider

### Starting

`M-x cider-jack-in` open `*cider-repl*` buffer.

### Compiling

`C-c C-k` (`M-x cider-load-buffer`)

### Changing namespace of REPL

`C-c M-n` Change namespace of REPL


### Executing s-exp
`C-x C-e` `cider-eval-last-sexp`



### Show documention at mark

`C-c C-d d` shows documention of keyword under cursor.


### Exiting

`M-x cider-quit`
