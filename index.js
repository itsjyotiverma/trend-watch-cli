#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { loadTopics, saveTopics } = require('./lib/loader.js');

function ensureString(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    console.error(`Invalid ${label}. Provide a non-empty string.`);
    process.exitCode = 1;
    return null;
  }
  return value.trim();
}

async function handleList() {
  const topics = await loadTopics();
  const categories = Object.keys(topics);

  if (!categories.length) {
    console.log('No topics yet. Try adding one with the add command.');
    return;
  }

  console.log('\n🌐 Trend Watch Topics');
  console.log('---------------------');
  categories.forEach((category) => {
    console.log(`\n# ${category}`);
    const items = topics[category] ?? [];
    if (!items.length) {
      console.log('  (empty)');
    } else {
      items.forEach((title, index) => {
        console.log(`  ${index + 1}. ${title}`);
      });
    }
  });
}

function pickSuggestions(items) {
  if (items.length <= 5) {
    return items;
  }

  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

async function handleSuggest(argv) {
  const normalizedCategory = ensureString(argv.category, 'category');
  if (!normalizedCategory) {
    return;
  }
  const topics = await loadTopics();
  const entries = topics[normalizedCategory];

  if (!entries || entries.length === 0) {
    console.log(`No suggestions found for "${normalizedCategory}" yet. Use the add command to seed it.`);
    return;
  }

  const picks = pickSuggestions(entries);
  console.log(`\n✨ ${normalizedCategory} suggestions (${picks.length} ideas):`);
  picks.forEach((idea, idx) => {
    console.log(`  ${idx + 1}. ${idea}`);
  });
}

async function handleAdd(argv) {
  const normalizedCategory = ensureString(argv.category, 'category');
  const normalizedTitle = ensureString(argv.title, 'title');

  if (!normalizedCategory || !normalizedTitle) {
    return;
  }

  const topics = await loadTopics();
  const list = topics[normalizedCategory] ?? [];

  if (list.includes(normalizedTitle)) {
    console.log(`"${normalizedTitle}" already exists inside ${normalizedCategory}.`);
    return;
  }

  list.push(normalizedTitle);
  topics[normalizedCategory] = list;
  await saveTopics(topics);
  console.log(`Added "${normalizedTitle}" to ${normalizedCategory}. 🚀`);
}

const argsInput = hideBin(process.argv);
const cli = yargs(argsInput);

const wrapWidth = Math.min(100, typeof cli.terminalWidth === 'function' ? cli.terminalWidth() : 100);

cli
  .scriptName('trend-watch')
  .command('list', 'Show every category and its topics', {}, handleList)
  .command('suggest', 'Get a handful of fresh ideas', (yargs) => {
    return yargs.option('category', {
      alias: 'c',
      describe: 'The category to suggest ideas from',
      demandOption: true,
      type: 'string',
    });
  }, handleSuggest)
  .command('add', 'Append a topic to a category', (yargs) => {
    return yargs
      .option('title', {
        alias: 't',
        describe: 'The title of the topic',
        demandOption: true,
        type: 'string',
      })
      .option('category', {
        alias: 'c',
        describe: 'The category to add the topic to',
        demandOption: true,
        type: 'string',
      });
  }, handleAdd)
  .demandCommand(1, 'Provide at least one command. Run trend-watch --help for options.')
  .strict()
  .help()
  .wrap(wrapWidth);

if (argsInput.length === 0) {
  cli.showHelp();
  process.exit(0);
}

cli.parse();
