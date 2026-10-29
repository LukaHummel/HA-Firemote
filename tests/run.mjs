// No npm dependencies: exercise the bundled Lit components in headless Chromium.
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const profile = mkdtempSync(join(tmpdir(), 'firemote-test-'));
try {
  const result = spawnSync(process.env.CHROMIUM_BIN || 'chromium', [
    '--headless', '--no-sandbox', '--disable-gpu', '--allow-file-access-from-files',
    `--user-data-dir=${profile}`, '--virtual-time-budget=10000', '--dump-dom',
    new URL(process.argv[2] || './performance.html', import.meta.url).href,
  ], { encoding: 'utf8', timeout: 30000, maxBuffer: 10 * 1024 * 1024 });
  if (result.error) throw result.error;
  const match = result.stdout.match(/<pre id="results">([\s\S]*?)<\/pre>/);
  if (!match) throw new Error(result.stderr || 'Chromium returned no test results');
  const report = JSON.parse(match[1].replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&amp;', '&'));
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.status === 'passed' ? 0 : 1;
} finally {
  rmSync(profile, { recursive: true, force: true });
}
