// Keep the local-file/offline fallback in sync with the editable JSON files.
import { readFile, writeFile } from 'node:fs/promises';

const data = {};
for (const key of ['publications', 'honors', 'news']) {
    const source = new URL(`../data/${key}.json`, import.meta.url);
    data[key] = JSON.parse(await readFile(source, 'utf8'));
}
const output = '// Generated from data/*.json by tools/sync-site-data.mjs.\n'
    + `window.homepageData = ${JSON.stringify(data, null, 2)};\n`;
await writeFile(new URL('../data/site-data.js', import.meta.url), output, 'utf8');
console.log('Synchronized homepage fallback data.');
