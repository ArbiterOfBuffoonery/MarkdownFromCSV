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

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import {csvToMarkdown} from '../CsvToMarkdown';

suite('csvToMarkdown tests', function () {

	test('Should return an emtpy string.', function () {
		var result = csvToMarkdown("");
		assert.equal(result, "");
	});

	test('should return a table with blank headers, using default header setting and default tab delimeter', function () {
		var result = csvToMarkdown("a\tb\tc");
		assert.equal(result, "|   |   |   |\n| - | - | - |\n| a | b | c |");
	});

	test('should return a table with no headers', function () {
		var result = csvToMarkdown("a\tb\tc", "\t", "\n", false);
		assert.equal(result, "|   |   |   |\n| - | - | - |\n| a | b | c |");
	});

	test('should return a table with headers and no data', function () {
		var result = csvToMarkdown("a\tb\tc", "\t", "\n", true);
		assert.equal(result, "| a | b | c |\n| - | - | - |");
	});

	test('should return a table with blank headers with various separators', function () {
		var cases = [["a\tb\tc", "\t"], ["a,b,c", ","], ["a;b;c", ";"]];
		cases.forEach(function (entry) {
			var result = csvToMarkdown(entry[0], entry[1], "\n", false);
			assert.equal(result, "|   |   |   |\n| - | - | - |\n| a | b | c |");
		});
	});

	test('should contain the separtor when it is wrapped in quotes', function () {
		var cases = [["a\t\"b\tc\"\td", "\t"], ["a,\"b,c\",d", ","], ["a;\"b;c\";d", ";"]];
		cases.forEach(function (entry) {
			var result = csvToMarkdown(entry[0], entry[1], "\n", false);
			assert.equal(result, "|   |       |   |\n| - | ----- | - |\n| a | \"b"+entry[1]+"c\" | d |");
		});
	});

	test('should return a table with headers and no data', function () {
		var result = csvToMarkdown("a\tb\tc", "\t", "\n", true);
		assert.equal(result, "| a | b | c |\n| - | - | - |");
	});

	test('should convert tabs to 4 spaces to work on github', function () {
		var result = csvToMarkdown("a\tb\tc", ";", "\n", false);
		assert.equal(result, "|             |\n| ----------- |\n| a    b    c |");
	});

	test('should format correctly with semicolons and long values', function () {
		var result = csvToMarkdown("a;b;c;long value\nd;e;f", ";", "\n", false);
		assert.equal(result, "|   |   |   |            |\n| - | - | - | ---------- |\n| a | b | c | long value |\n| d | e | f |            |");
	});

	test('should skip delimiters wrapped by quotes', function () {
		var result = csvToMarkdown('"a, b, c, d",e', ",", "\n", false);
		assert.equal(result, '|              |   |\n| ------------ | - |\n| "a, b, c, d" | e |');
	});

	test('should escape pipes and back slashes', function(){
		var result = csvToMarkdown('"a|b|c|d",e\\f\\g', ",", "\n", false);
		assert.equal(result, '|              |         |\n| ------------ | ------- |\n| "a\\|b\\|c\\|d" | e\\\\f\\\\g |');
	});
});