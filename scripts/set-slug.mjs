import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const envPath = resolve(__dirname, '../.env.local');
const env = readFileSync(envPath, 'utf-8');
const envVars = {};
for (const line of env.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
  envVars[key] = value;
}

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const serviceRoleKey = envVars['SUPABASE_SERVICE_ROLE_KEY'];

const POST_ID = 'd722249b-f9a0-436c-9467-bc3cd58a30ce';

// Add slug column and set value using Supabase /rest/v1/rpc or direct PATCH
// We'll use PATCH to set slug on the inserted row
const patchUrl = `${supabaseUrl}/rest/v1/blog_posts?id=eq.${POST_ID}`;

const response = await fetch(patchUrl, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'apikey': serviceRoleKey,
    'Authorization': `Bearer ${serviceRoleKey}`,
    'Prefer': 'return=representation',
  },
  body: JSON.stringify({ slug: 'best-dentist-al-safa-dubai' }),
});

const text = await response.text();

if (!response.ok) {
  if (text.includes('slug')) {
    console.log('❌ The slug column does not exist in Supabase yet.');
    console.log('   Please run this SQL in your Supabase SQL editor:');
    console.log('');
    console.log('   ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug TEXT;');
    console.log(`   UPDATE blog_posts SET slug = 'best-dentist-al-safa-dubai' WHERE id = '${POST_ID}';`);
    console.log('');
    console.log('   Then re-run: node scripts/set-slug.mjs');
  } else {
    console.error('❌ PATCH failed:', text);
  }
  process.exit(1);
}

console.log('✅ Slug set successfully!');
const data = JSON.parse(text);
if (data[0]) {
  console.log('   ID:', data[0].id);
  console.log('   Slug:', data[0].slug);
}
console.log('   Post URL: /blog/best-dentist-al-safa-dubai');
