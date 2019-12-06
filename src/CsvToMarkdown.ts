/**
 * Converts CSV to Markdown Table
 *
 * @param {string} csvContent - The string content of the CSV
 * @param {string} delimiter - The character(s) to use as the CSV column delimiter
 * @param {boolean} hasHeader - Whether to use the first row of Data as headers
 * @returns {string}
 */
export function csvToMarkdown(csvContent: string, delimiter: string = "\t", newline: string = "\n", hasHeader: boolean = false): string {
	if (delimiter != "\t") {
		csvContent = csvContent.replace(/\t/g, "    ");
	}

	const columns = csvContent.split(newline);

	const tabularData: string[][] = [];
	const maxRowLen: number[] = [];

	columns.forEach((e, i) => {
		if (typeof tabularData[i] === "undefined") {
			tabularData[i] = [];
		}
		const regex = new RegExp(delimiter + '(?![^"]*"\\B)');
		const row = e.split(regex);
		row.forEach((ee, ii) => {
			if (typeof maxRowLen[ii] === "undefined") {
				maxRowLen[ii] = 0;
			}

			// escape pipes and backslashes
			ee = ee.replace(/(\||\\)/g, "\\$1");

			maxRowLen[ii] = Math.max(maxRowLen[ii], ee.length);
			tabularData[i][ii] = ee;
		});
	});

	let headerOutput = "";
	let seperatorOutput = "";

	maxRowLen.forEach((len, k) => {
		const headerSizer = Array(len + 1 + 2);
		const seperatorSizer = Array(len + 1 );

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
		maxRowLen.forEach((len, y) => {
			const row = typeof col[y] === "undefined" ? "" : col[y];
			const spacing = Array((len - row.length) + 1).join(" ");
			const out = `| ${row}${spacing} `;
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