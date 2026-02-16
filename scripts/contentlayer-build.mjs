import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { syncBuiltinESMExports } from 'node:module';

const originalCpus = os.cpus.bind(os);
os.cpus = () => {
  const cpus = originalCpus();
  if (Array.isArray(cpus) && cpus.length > 0) {
    return cpus;
  }

  return [
    {
      model: 'contentlayer-fallback',
      speed: 1,
      times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 }
    }
  ];
};
syncBuiltinESMExports();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

const verbose = process.argv.includes('--verbose');
const clearCache = process.argv.includes('--clearCache');

if (clearCache) {
  await fs.rm(path.join(process.cwd(), '.contentlayer'), {
    recursive: true,
    force: true
  });
  console.log('Cache cleared successfully');
}

const core = await import('@contentlayer/core');
const { T } = await import('@contentlayer/utils/effect');

const run = core.runMain({
  tracingServiceName: 'contentlayer-script',
  verbose
});

const config = await run(core.getConfig({ configPath: undefined }));
if (!config.source.options.disableImportAliasWarning) {
  await run(core.validateTsconfig);
}

const info = await run(core.generateDotpkg({ config, verbose }));
await run(T.log(`Generated ${info.documentCount} documents in .contentlayer`));
