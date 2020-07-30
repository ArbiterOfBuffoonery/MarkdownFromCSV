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
 * @param {string} delimiter - The character(s) to use as the CSV column delimiter
 * @param {string} newline - The character(s) to use as a newline.
 * @param {boolean} hasHeader - Whether to use the first row of Data as headers
 * @returns {string}
 */
export function csvToMarkdown(csvContent: string, delimiter: string = "\t", newline: string = "\n", hasHeader: boolean = false): string {
	if (csvContent.length === 0) {
		return "";
	}

	if (delimiter !== "\t") {
		csvContent = csvContent.replace(/\t/g, "    ");
	}

	// Split the text block into lines.
	const line = csvContent.split(newline);

	const tabularData: string[][] = [];
	const maxColumnLen: number[] = [];

	line.forEach((e, i) => {
		if (typeof tabularData[i] === "undefined") {
			tabularData[i] = [];
		}
		const regex = new RegExp(delimiter + '(?![^"]*"\\B)');
		const column = e.split(regex);
		column.forEach((ee, ii) => {
			if (typeof maxColumnLen[ii] === "undefined") {
				maxColumnLen[ii] = 0;
			}

			// escape pipes and backslashes
			ee = ee.replace(/(\||\\)/g, "\\$1");

			maxColumnLen[ii] = Math.max(maxColumnLen[ii], ee.length);
			tabularData[i][ii] = ee;
		});
	});

	let headerOutput = "";
	let seperatorOutput = "";

	maxColumnLen.forEach((len, k) => {
		const headerSizer = Array(len + 1 + 2);
		const seperatorSizer = Array(len + 1);

        if(k === 0) {
            seperatorOutput += "| " + seperatorSizer.join("-");
        }
        else {
            seperatorOutput += " | " + seperatorSizer.join("-");
        }

		headerOutput += "|" + headerSizer.join(" ");
	});

	headerOutput += "|" + newline;
	seperatorOutput += " |" + newline;

	if (hasHeader) {
		headerOutput = "";
	}

	let rowOutput = "";
	tabularData.forEach((col, i) => {
		maxColumnLen.forEach((len, y) => {
			const colVal = typeof col[y] === "undefined" ? "" : col[y];
			const spacing = Array((len - colVal.length) + 1).join(" ");
			const out = `| ${colVal}${spacing} `;
			if (hasHeader && i === 0) {
				headerOutput += out;
			} else {
				rowOutput += out;
			}
		});

		if (hasHeader && i === 0) {
			headerOutput += "|" + newline;
		} else {
			rowOutput += "|" + newline;
		}
	});

	return `${headerOutput}${seperatorOutput}${rowOutput}`.trim();
}