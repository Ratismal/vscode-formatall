// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('formatall.doFormat', async function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        try {
            let folders = await vscode.workspace.findFiles('**/*.{js,css,vue,html}', '**/{node_modules,public}/**');
            for (const uri of folders) {
                let td = await vscode.workspace.openTextDocument(uri);
                await vscode.window.showTextDocument(td);
                await vscode.commands.executeCommand('editor.action.formatDocument');
            }
            vscode.window.showInformationMessage('Formatting has been complete. You may now review and save the formatted files.');
        } catch (err) {
            vscode.window.showErrorMessage('An error occurred.', err.message);
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;