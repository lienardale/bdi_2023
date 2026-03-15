// One-time script: normalize publisher strings in seed data,
// create Publisher entries with UUIDs, update BDs with publisherId.
// Usage: node scripts/normalize-publishers.js

const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');
const data = require('../app/lib/placeholder-bdi-data.js');

// ── Normalization map: variant → canonical name ──────────────────────
const NORMALIZE = {
  '2024': 'Éditions 2024',
  'Editions 2024': 'Éditions 2024',
  '404': 'Éditions 404',
  '404 graphics': 'Éditions 404',
  '6 pieds sous terre': '6 Pieds Sous Terre',
  'Actes Sud': 'Actes Sud BD',
  'Actes Sud Bd': 'Actes Sud BD',
  "Actes Sud/ L'An 2": 'Actes Sud BD',
  'bandes détournées': 'Bandes Détournées',
  'Ca et la': 'Ça et Là',
  'ça et là': 'Ça et Là',
  'Ça et là': 'Ça et Là',
  'çà et là': 'Ça et Là',
  'Çà et là': 'Ça et Là',
  'Casterman BD': 'Casterman',
  'Cornelius': 'Cornélius',
  'Crunchyroll/Kazé': 'Crunchyroll',
  'DARGAUD': 'Dargaud',
  'Delcourt Comics': 'Delcourt',
  'dupuis': 'Dupuis',
  'éditions de la Cerise': 'Éditions de la Cerise',
  'éditions IMHO': 'IMHO',
  'Editions Inculte': 'Éditions Inculte',
  'éditions Monsieur Toussaint Louverture': 'Monsieur Toussaint Louverture',
  'es Impressions Nouvelles': 'Les Impressions Nouvelles',
  'Flblb': 'FLBLB',
  'Glenat': 'Glénat',
  'Glénat BD': 'Glénat',
  'Glénat Comics': 'Glénat',
  'Hi Comics': 'HiComics',
  'Hicomics': 'HiComics',
  'Hoochie Coochie': 'The Hoochie Coochie',
  'Huber éditions': 'Huber Éditions',
  'Ki-Oon': 'Ki-oon',
  'Kioon': 'Ki-oon',
  "L' association": "L'Association",
  "l'Association": "L'Association",
  "L'agrume": "L'Agrume",
  "l'Agrume": "L'Agrume",
  "l'Employé du moi": "L'Employé du Moi",
  "L'Employé du moi": "L'Employé du Moi",
  'le Lombard': 'Le Lombard',
  'Lombard': 'Le Lombard',
  'lézard Noir': 'Le Lézard Noir',
  'Lézard Noir': 'Le Lézard Noir',
  'Les humanoides associes': 'Les Humanoïdes Associés',
  'les Humanoïdes Associés': 'Les Humanoïdes Associés',
  'Les Humanoïdes associés': 'Les Humanoïdes Associés',
  'Les requins Marteaux': 'Les Requins Marteaux',
  'Requins Marteaux': 'Les Requins Marteaux',
  'Les enfants rouges': 'Les Enfants Rouges',
  'Panini Collections': 'Panini Comics',
  'Panini Comics France': 'Panini Comics',
  'Pika': 'Pika Édition',
  'Rue de Sèvre': 'Rue de Sèvres',
  'Rue de Sèvres (Label 619)': 'Rue de Sèvres',
  "Rue de l'échiquier": "Rue de l'Échiquier",
  'sarbacane': 'Sarbacane',
  'Urban': 'Urban Comics',
};

// ── Imprint relationships (after normalization) ──────────────────────
const IMPRINT_OF = {
  'Delcourt/Tonkam': 'Delcourt',
  'Glénat Manga': 'Glénat',
  'Sakka': 'Casterman',
  'Kana': 'Dargaud',
};

// ── Helpers ──────────────────────────────────────────────────────────

function cleanString(s) {
  if (!s) return s;
  // Remove zero-width characters, normalize smart quotes to ASCII, and trim
  return s
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .trim();
}

function normalize(publisher) {
  if (!publisher) return null;
  const cleaned = cleanString(publisher);
  return NORMALIZE[cleaned] || cleaned;
}

function q(s) {
  if (s == null) return 'null';
  return JSON.stringify(s);
}

// ── Main ─────────────────────────────────────────────────────────────

// 1. Collect all normalized publisher names
const publisherNames = new Set();
for (const bd of data.bds) {
  const name = normalize(bd.publisher);
  if (name) publisherNames.add(name);
}

// 2. Ensure parent publishers exist (from IMPRINT_OF)
for (const [imprint, parent] of Object.entries(IMPRINT_OF)) {
  if (publisherNames.has(imprint)) {
    publisherNames.add(parent);
  }
}

// 3. Generate publisher entries with stable UUIDs
const sortedNames = Array.from(publisherNames).sort();
const publisherByName = new Map();

// First pass: create all entries without parentId
for (const name of sortedNames) {
  publisherByName.set(name, { id: randomUUID(), name, parentId: null });
}

// Second pass: set parentId for imprints
for (const [imprint, parentName] of Object.entries(IMPRINT_OF)) {
  const imprintEntry = publisherByName.get(imprint);
  const parentEntry = publisherByName.get(parentName);
  if (imprintEntry && parentEntry) {
    imprintEntry.parentId = parentEntry.id;
  }
}

const publishers = Array.from(publisherByName.values());
console.log(`Created ${publishers.length} publishers (${Object.keys(IMPRINT_OF).filter(k => publisherByName.has(k)).length} imprints)`);

// 4. Build publisher ID lookup
const publisherIdByName = new Map();
for (const p of publishers) {
  publisherIdByName.set(p.name, p.id);
}

// 5. Generate output file
let out = `// Auto-generated from database — normalized publishers\n`;
out += '// Do not edit manually — regenerate via: npx tsx scripts/dump-seed-data.ts\n\n';

// Events
out += 'const events = [\n';
for (const e of data.events) {
  out += `  { id: ${q(e.id)}, name: ${q(e.name)}, date: ${q(e.date)}, hour: ${q(e.hour)}, place: ${q(e.place)}, fb_event: ${q(e.fb_event)}, cover_url: ${q(e.cover_url)} },\n`;
}
out += '];\n\n';

// Authors
out += 'const authors = [\n';
for (const a of data.authors) {
  const bdIds = (a.bd_ids || []).map((id) => q(id)).join(', ');
  out += `  { id: ${q(a.id)}, name: ${q(a.name)}, bio: ${q(a.bio)}, bio_source: ${q(a.bio_source)}, photo_url: ${q(a.photo_url)}, wikipedia_url: ${q(a.wikipedia_url)}, bd_ids: [${bdIds}] },\n`;
}
out += '];\n\n';

// Publishers
out += 'const publishers = [\n';
for (const p of publishers) {
  out += `  { id: ${q(p.id)}, name: ${q(p.name)}, parentId: ${q(p.parentId)} },\n`;
}
out += '];\n\n';

// BDs
out += 'const bds = [\n';
let updatedCount = 0;
for (const b of data.bds) {
  const normalizedPublisher = normalize(b.publisher);
  const publisherId = normalizedPublisher ? publisherIdByName.get(normalizedPublisher) || null : null;
  if (publisherId) updatedCount++;
  const authorIds = (b.author_ids || []).map((id) => q(id)).join(', ');
  const price = b.price != null ? String(b.price) : 'null';
  const pubDate = b.publication_date ? q(b.publication_date instanceof Date ? b.publication_date.toISOString() : b.publication_date) : 'null';
  out += `  { id: ${q(b.id)}, title: ${q(b.title)}, event_ids: ${q(b.event_ids)}, author_ids: [${authorIds}], publisher: ${q(normalizedPublisher)}, publisherId: ${q(publisherId)}, publishing_year: ${b.publishing_year ?? 'null'}, ean: ${q(b.ean)}, summary: ${q(b.summary)}, publication_date: ${pubDate}, page_count: ${b.page_count ?? 'null'}, price: ${price}, cover_url: ${q(b.cover_url)}, publisher_url: ${q(b.publisher_url)}, leslibraires_url: ${q(b.leslibraires_url)}, enrichment_source: ${q(b.enrichment_source)} },\n`;
}
out += '];\n\n';

// AuthorEvents
out += 'const authorEvents = [\n';
for (const ae of data.authorEvents) {
  out += `  { authorId: ${q(ae.authorId)}, eventId: ${q(ae.eventId)} },\n`;
}
out += '];\n\n';

out += 'module.exports = { events, bds, authors, authorEvents, publishers };\n';

const outPath = path.join(__dirname, '..', 'app', 'lib', 'placeholder-bdi-data.js');
fs.writeFileSync(outPath, out);
console.log(`Updated ${updatedCount}/${data.bds.length} BDs with publisherId`);
console.log(`Written to ${outPath}`);
