#!/usr/bin/env node

const args = process.argv.slice(2);
console.log(JSON.stringify({ ok: true, args }, null, 2));
