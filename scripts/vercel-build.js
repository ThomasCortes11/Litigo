#!/usr/bin/env node
const { execSync } = require('child_process');

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

try {
  if (process.env.DATABASE_URL) {
    console.log('DATABASE_URL found — running prisma migrations');
    run('npm run db:migrate:deploy');
  } else {
    console.log('DATABASE_URL not set — skipping prisma migrations');
  }

  console.log('Running Next.js build');
  run('npm run build');
} catch (err) {
  console.error(err);
  process.exit(1);
}
