#!/usr/bin/env node
const { execSync } = require('child_process');

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

try {
  const databaseUrl = process.env.DATABASE_URL;
  const isLocalhost = databaseUrl && /(?:^|:\/\/)(localhost|127\.0\.0\.1)(?::|$)/i.test(databaseUrl);

  if (databaseUrl && !isLocalhost) {
    console.log('DATABASE_URL found and not localhost — running prisma migrations');
    run('npm run db:migrate:deploy');
  } else {
    console.log('Skipping prisma migrations because DATABASE_URL is absent or points to localhost');
  }

  console.log('Running Next.js build');
  run('npm run build');
} catch (err) {
  console.error(err);
  process.exit(1);
}
