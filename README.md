# trend-watch-cli

Trend Watch CLI is a Node.js command-line companion for keeping tabs on fast-moving technology themes. It ships with 2026-ready categories (AI agents, privacy-first apps, healthcare automation, creator tools, and edtech) and lets you list, suggest, and add ideas without leaving the terminal.

## Installation

Install the dependencies and link the CLI globally so the `trend-watch` command is available anywhere:

```bash
npm install
npm install -g .
```

> Tip: run `trend-watch --help` (or just `trend-watch`) to see the available commands at any time.

## Usage

- List every tracked category and topic:

  ```bash
  trend-watch list
  ```

- Get a handful of fresh ideas from a category (randomized up to five items):

  ```bash
  trend-watch suggest --category ai-agents
  ```

- Add a new idea to an existing (or brand-new) category:

  ```bash
  trend-watch add --title "AI-native onboarding concierge" --category creator-tools
  ```

The CLI validates that required arguments are present and shows the help screen automatically if you run it without any commands.

## Adding New Categories

Categories spring into existence the first time you call `trend-watch add --category <name>`. The data store lives at `data/topics.json`, and the CLI will create and seed it (with the 2026 sample topics) if it ever goes missing. You can also edit that JSON directly to bulk-import topics—just keep the structure `{ "category": ["topic", ...] }`.

## Why this tool in 2026?

2026 is the year of durable AI agents, strict data-sovereignty requirements, healthcare automation mandates, and creator economies that expect rapid experimentation. Trend Watch CLI offers a lightweight, local-first way to keep your product backlog aligned with those macro shifts. No dashboards, logins, or subscriptions—just a trusted shortlist of trend signals you curate yourself. Because the data file lives on your machine, it also satisfies privacy-first procurement checklists common in 2026.

## Contributing

Contributions keep the trend list relevant. If you have new categories, better defaults, or UX improvements:

1. Fork the repo and create a branch.
2. Run `npm test` or any relevant checks for your changes.
3. Submit a pull request describing the update and how it maps to emerging 2026 trends.

Bug reports and feature ideas are also welcome via issues.

## License

MIT © 2025 trend-watch-cli contributors
