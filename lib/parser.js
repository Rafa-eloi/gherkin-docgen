const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const { IdGenerator } = require('@cucumber/messages');
const { parse } = require('@cucumber/gherkin');

async function parseFeaturesFromDir(dir) {
  const files = glob.sync(`${dir}/**/*.feature`);
  const features = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');

    const gherkinDocument = parse(content, {
      uri: file,
      includeSource: false,
      includeGherkinDocument: true,
      includePickles: false,
      newId: IdGenerator.uuid(),
    }).gherkinDocument;

    const feature = gherkinDocument.feature;
    if (!feature) continue;

    features.push({
      file,
      name: feature.name,
      description: feature.description,
      tags: feature.tags.map((t) => t.name),
      scenarios: feature.children
        .filter((child) => child.scenario)
        .map((s) => ({
          name: s.scenario.name,
          tags: s.scenario.tags.map((t) => t.name),
          steps: s.scenario.steps.map((st) => `${st.keyword}${st.text}`),
        })),
    });
  }

  return features;
}

module.exports = { parseFeaturesFromDir };
