#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const { parseFeaturesFromDir } = require("../lib/parser");

const program = new Command();

program
  .version("1.0.0")
  .option("-d, --dir <path>", "Diretório com arquivos .feature", "cypress/e2e")
  .option("-o, --output <file>", "Arquivo Markdown de saída", "gherkin-docs.md")
  .description("Gera documentação automática a partir de arquivos .feature (Gherkin)")
  .action(async (options) => {
    try {
      const features = await parseFeaturesFromDir(options.dir);

      const markdown = features
        .map((f) => {
          const tags = f.tags.length > 0 ? `**Tags**: ${f.tags.join(", ")}` : "";
          const scenarios = f.scenarios
            .map((s) => {
              const steps = s.steps.map((st) => `- ${st}`).join("\n");
              return `### Cenário: ${s.name}\n${steps}`;
            })
            .join("\n\n");

          return `## Funcionalidade: ${f.name}\n\n${tags}\n\n${scenarios}`;
        })
        .join("\n\n---\n\n");

      const outputDir = path.dirname(options.output);
      fs.ensureDirSync(outputDir); // garante que o diretório exista

      fs.writeFileSync(options.output, markdown, "utf-8");

      console.log(`✅ Documentação gerada com sucesso em: ${options.output}`);
    } catch (err) {
      console.error("❌ Erro ao gerar documentação:");
      console.error(err.message || err);
    }
  });

program.parse(process.argv);
