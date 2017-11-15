const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('formatall.doFormat', async function () {
        let configuration = vscode.workspace.getConfiguration('formatall');
        console.log(configuration, Object.keys(configuration));
        try {
            let folders = await vscode.workspace.findFiles(configuration.search.include, configuration.search.exclude);
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

function deactivate() {
}
exports.deactivate = deactivate;