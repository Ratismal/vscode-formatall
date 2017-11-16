# vscode-formatall

## Features

Provides a command that
1. Looks up files based on configuration options (`formatall.search.include` and `formatall.search.exclude`)
2. Opens the retrieved files, and performs the `editor.action.formatDocument` command on each of them.

The main purpose behind this extension is if you have a formatting standard change and need to easily update all of your files to reflect this change (ex. indentation).

## Requirements

File formatting must be set up for all file types that you include.

## Extension Settings

This extension contributes the following settings:

* `formatall.search.include`: A selector to choose the files to include in the formatting
* `formatall.search.exclude`: A selector to choose the files which should not be formatted
* `formatall.quantity`: How many files should be processed per batch