/*
 * The below is a modification of the code provided in the [CsvToMarkdownTable project](https://github.com/donatj/CsvToMarkdownTable).
 *
 * The MIT License
 * 
 * Copyright (c) 2014 Jesse G. Donat
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


/**
 * Converts CSV to Markdown Table
 *
 * @param {string} csvContent - The string content of the CSV
 * @param {string} newline - The character(s) to use as a newline.
 * @returns {string}
 */
export function markdownToCSV(csvContent: string, newline: string = "\n"): string {
	if (csvContent.length === 0) {
		return "";
	}

	// Split the text block into lines.
	const lines = csvContent.split(newline);

	const tabularData: string[][] = [];

	lines.forEach((line, i) => {
		if (typeof tabularData[i] === "undefined") {
			tabularData[i] = [];
		}
		
		// Exclude the header separation line.
		if (line.match(/(\| ?-+ ?)+\|/) === null) {
			// Take out the leading and trailing pipes.
			line = line.trim();

			if (line.startsWith("|")) {
				line = line.substring(1);
			}

			if (line.endsWith("|")) {
				line = line.substring(0, line.length - 1);
			}

			const regex = /(?<!\\\B)\|/;
			const columns = line.split(regex);
			columns.forEach((column, ii) => {
				column = column.trim();

				// Add quotes to pre-existing commas.
				if (contains(column,",")){
					column = '"' + column + '"';
				}

				// Un-escape pipes in the markdown table so they are regular pipes in the CSV.
				column = column.replace(/\\\|/,"|");

				tabularData[i][ii] = column;
			});
		}
	});

	let rowOutput = "";
	tabularData.forEach((row, i) => {
		if (row.length > 0) {
			rowOutput += row.join(",") + newline;
		}
	});

	return `${rowOutput}`.trim();
}

function contains(value: string, searchFor: string)
{
	return (value || '').indexOf(searchFor) > -1;
}