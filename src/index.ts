import { Command } from 'commander';
import pkginfo from 'pkginfo';

pkginfo(module, 'name', 'version');

const program = new Command();

program.version(module.exports.version);

program.parse(process.argv);
