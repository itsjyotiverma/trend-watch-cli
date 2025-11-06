const { readFile, writeFile, access, mkdir } = require('fs/promises');
const path = require('path');

const dataDir = path.resolve(__dirname, '..', 'data');
const dataPath = path.join(dataDir, 'topics.json');
const defaultTopics = {
  'ai-agents': [
    'Autonomous agent swarms',
    'Human-in-the-loop agent oversight',
    'Long-running agent memory',
    'Agent marketplaces for micro-tasks',
    'Workflow copilots for SMBs'
  ],
  'privacy-first-apps': [
    'Zero-knowledge identity systems',
    'Federated learning for mobile apps',
    'End-to-end encrypted databases',
    'On-device analytics bundles',
    'Contextual consent management tooling'
  ],
  'healthcare-automation': [
    'Robotic process automation for billing',
    'AI-powered diagnostic imaging',
    'Automated patient scheduling',
    'Ambient clinical documentation',
    'Virtual care coordination hubs'
  ],
  'creator-tools': [
    'AI-assisted video editing',
    'NFT-based content monetization',
    'Decentralized social media platforms',
    'Interactive storytelling engines',
    'Realtime audience co-creation dashboards'
  ],
  'edtech-2026': [
    'Personalized learning paths with AI',
    'Immersive VR/AR classroom experiences',
    'Gamified skill development platforms',
    'Global credential wallets',
    'Asynchronous mentorship networks'
  ]
};

async function ensureDataFile() {
  try {
    await access(dataPath);
  } catch (error) {
    await mkdir(dataDir, { recursive: true });
    await saveTopics(defaultTopics);
  }
}

async function loadTopics() {
  await ensureDataFile();
  try {
    const raw = await readFile(dataPath, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('topics.json must contain an object of arrays');
    }
    return parsed;
  } catch (error) {
    await saveTopics(defaultTopics);
    return defaultTopics;
  }
}

async function saveTopics(topics) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataPath, `${JSON.stringify(topics, null, 2)}\n`, 'utf8');
}

module.exports = { loadTopics, saveTopics, dataPath, defaultTopics };
