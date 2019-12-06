// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {csvToMarkdown} from './CsvToMarkdown';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "markdownfromcsv" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('jojoco.MarkdownFromCSV', () => {
		// The code you place here will be executed every time your command is executed

		convertToMarkdown(",");
	});
	context.subscriptions.push(disposable);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	disposable = vscode.commands.registerCommand('jojoco.MarkdownFromTSV', () => {
		// The code you place here will be executed every time your command is executed

		convertToMarkdown("\t");
	});
	context.subscriptions.push(disposable);
}

export function convertToMarkdown(delimiter: string) {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const document = editor.document;
		let selection = editor.selection;
		
		if(selection.isEmpty) {
			var firstLine = document.lineAt(0);
			var lastLine = document.lineAt(document.lineCount - 1);
			var textRange = new vscode.Range(0, firstLine.range.start.character, document.lineCount - 1, lastLine.range.end.character);

			selection = new vscode.Selection(textRange.start, textRange.end);
		}
	
	const textSelection = document.getText(selection);

	const markdownText = csvToMarkdown(textSelection, delimiter, getDocumentNewline(document.eol), true);
	
	editor.edit(e => {
		e.delete(selection);
		e.insert(selection.start, markdownText);
	});
	 
	  console.debug("Selected text is: " + textSelection);
	  console.debug("Markdown text is: " + markdownText);
	}
}

function getDocumentNewline(eol: vscode.EndOfLine) : string {
	switch(eol) {
		case vscode.EndOfLine.LF:
			return "\n";
		case vscode.EndOfLine.CRLF:
			return "\r\n"
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
