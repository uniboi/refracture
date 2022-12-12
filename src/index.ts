#!/usr/bin/env node
import Parser from 'tree-sitter';
import fs from 'fs';
const RSQUIRREL = require('tree-sitter-rsquirrel') // node fuckery

import { Command } from 'commander'
import ora from 'ora'
import pkginfo from 'pkginfo'

pkginfo(module, 'name', 'version')

const program = new Command()

program.version(module.exports.version)

program.option("-f", "--file <file>", "filepath to parse")
program.option("-d", "--dir <directory>", "directory to parse all contents of")

program.command('run').action(async () => {
	const options = program.opts();

	// parser setup
	const parser = new Parser()
	parser.setLanguage(RSQUIRREL)

	const spinner = ora()

	// TODO: load given file
	spinner.start(`reading file ${"FILE"}`)
	const source = fs.readFileSync("./nuts/test.nut", "utf8");
	spinner.succeed(`read file ${"FILE"}`)

	const tree = parser.parse(source)

	const treeString = tree.rootNode.toString()

	if (tree.rootNode.hasError()) {
		spinner.fail(treeString)
	} else {
		spinner.succeed(treeString)
	}
})

program.parse(process.argv)
