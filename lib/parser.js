const fs = require("fs-extra");
const glob = require("glob");
const { GherkinStreams } = require("@cucumber/gherkin");
const { Writable } = require("stream");
const { pipeline } = require("stream");

async function parseFeaturesFromDir(dir) {
  const files = glob.sync(`${dir}/**/*.feature`);
  const features = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const envelopes = [];

    await new Promise((resolve, reject) => {
      pipeline(
        GherkinStreams.fromSources([{ data: content, uri: file }]),
        new Writable({
          objectMode: true,
          write(envelope, _, callback) {
            envelopes.push(envelope);
            callback();
          }
        }),
        (err) => (err ? reject(err) : resolve())
      );
    });

    for (const envelope of envelopes) {
      if (envelope.gherkinDocument) {
        const { feature } = envelope.gherkinDocument;
        if (!feature) continue;

        features.push({
          file,
          name: feature.name,
          description: feature.description,
          tags: feature.tags.map((t) => t.name),
          scenarios: feature.children
            .filter((child) => child.scenario)
            .map((child) => ({
              name: child.scenario.name,
              tags: child.scenario.tags.map((t) => t.name),
              steps: child.scenario.steps.map(
                (st) => `${st.keyword}${st.text}`
              ),
            })),
        });
      }
    }
  }

  return features;
}

module.exports = { parseFeaturesFromDir };
