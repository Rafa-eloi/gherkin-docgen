#!/usr/bin/env node

const { Command } = require('commander');
const path = require('path');
const { parseFeaturesFromDir } = require('../lib/parser');
const { generateMarkdown } = require('../templates/markdown');

const program = new Command();

program
  .name('gherkin-docgen')
  .description('Gera documentação a partir de arquivos .feature')
  .option('-d, --dir <path>', 'Diretório dos arquivos .feature', 'cypress/e2e')
  .option('-o, --output <path>', 'Arquivo de saída markdown', 'gherkin-docs.md')
  .action(async (options) => {
    const features = await parseFeaturesFromDir(options.dir);
    const markdown = generateMarkdown(features);
    require('fs').writeFileSync(options.output, markdown, 'utf-8');
    console.log(`📘 Documentação gerada em: ${options.output}`);
  });

program.parse(process.argv);
