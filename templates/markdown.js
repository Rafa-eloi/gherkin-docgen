function generateMarkdown(features) {
  let output = `# 📘 Documentação de Testes (Gherkin)\n\n`;

  for (const feature of features) {
    output += `## Funcionalidade: ${feature.name}\n`;
    if (feature.tags.length) {
      output += `**Tags**: ${feature.tags.join(', ')}\n\n`;
    }
    if (feature.description) {
      output += `> ${feature.description}\n\n`;
    }

    for (const scenario of feature.scenarios) {
      output += `### Cenário: ${scenario.name}\n`;
      if (scenario.tags.length) {
        output += `*Tags:* ${scenario.tags.join(', ')}\n`;
      }
      scenario.steps.forEach((step) => {
        output += `- ${step}\n`;
      });
      output += '\n';
    }

    output += '\n---\n';
  }

  return output;
}

module.exports = { generateMarkdown };
