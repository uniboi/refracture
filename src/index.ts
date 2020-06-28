import pkginfo from 'pkginfo';
import { Command } from 'commander';

pkginfo(module, 'name', 'version');

const program = new Command();

program.version(module.exports.version);

program.parse(process.argv);
