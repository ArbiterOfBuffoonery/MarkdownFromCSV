# Markdown from CSV/TSV README

This extension creates a Markdown table from a sequence of lines in the comma delimited value (CSV) or tab delimited value (TSV) format.

It can also convert a Markdown table to CSV format.

The core functionality of this extension utilizes the [CsvToMarkdownTable project](https://github.com/donatj/CsvToMarkdownTable). The source code therein was modified to work cleanly with VS Code.

## How to use

Currently the conversion can be made using either CSV or TSV.

- To convert from CSV to a Markdown table type `CSV to Markdown table` in the command pallet.
- To convert from TSV to a Markdown table type `TSV to Markdown table` in the command pallet.

![Simple conversion example](images/markdown-table_base-case.gif)

> Tip: If the desired data to convert is part of a document, select the text to be converted then execute the conversion command.

![Selection conversion example](images/markdown-table_selection-case.gif)

## Convert to CSV from Markdown

To convert Markdown to CSV, type `Markdown table to CSV` in the command pallet.

## Extension Settings

Currently there are no configurable settings.

## Adding to vs-code

In the Extensions pane (`ctrl` + `shift` + `X`) search for `markdownfromcsv`

## If you like this extension, please consider a donation

[![Donate with PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/ArbiterOfBuffoonery)
