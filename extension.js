const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('formatall.doFormat', async function () {
        let configuration = vscode.workspace.getConfiguration('formatall');

        try {
            let folders = await vscode.workspace.findFiles(configuration.search.include, configuration.search.exclude);
            let cont = await vscode.window.showInformationMessage(`This process will iterate all of the files in the current workspace. Files will be opened and formatted in batches of ${configuration.quantity}. After a batch is completed, all files in the batch will be saved. All open files will then be closed before the next batch starts.

Files matching these criteria will be formatted:
Include: ${configuration.search.include}
Exclude: ${configuration.search.exclude}

There are ${folders.length} files that match this criteria.`, { modal: true }, 'Continue');
            if (cont !== 'Continue')
                return vscode.window.showInformationMessage('The formatting has been cancelled.');
            let i = 0;
            for (const uri of folders) {
                let td = await vscode.workspace.openTextDocument(uri);
                await vscode.window.showTextDocument(td);
                await vscode.commands.executeCommand('editor.action.formatDocument');
                if (td.isDirty) {
                    if (++i % configuration.quantity === 0) {
                        vscode.window.showInformationMessage('Finished a batch. Saving and closing...');
                        await vscode.workspace.saveAll();
                        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
                    }
                }
            }
            vscode.window.showInformationMessage('Formatting has been complete. Files will be saved and closed...');
            await vscode.workspace.saveAll();
            await vscode.commands.executeCommand('workbench.action.closeAllEditors');
            vscode.window.showInformationMessage('Done. ' + i + ' records have been formatted.');
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