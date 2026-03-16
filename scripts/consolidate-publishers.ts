import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Static mapping: publisher name → homepage URL.
 * null = defunct, unknown, or no website found.
 */
const PUBLISHER_URLS: Record<string, string | null> = {
  // Major publishers (10+ BDs)
  'Casterman': 'https://www.casterman.com/',
  'Urban Comics': 'https://www.urban-comics.com/',
  'Delcourt': 'https://www.editions-delcourt.fr/',
  'Glénat': 'https://www.glenat.com/',
  'Dargaud': 'https://www.dargaud.com/',
  'Dupuis': 'https://www.dupuis.com/',
  'Éditions 2024': 'https://www.editions2024.com/',
  'Futuropolis': 'https://www.futuropolis.fr/',
  'Atrabile': 'https://atrabile.org/',
  'IMHO': 'https://www.imho.fr/',
  'Ça et Là': 'https://www.caetla.fr/',
  'L\'Association': 'https://www.lassociation.fr/',

  // Medium publishers (5-9 BDs)
  'Kana': 'https://www.kana.fr/',
  'Misma': 'https://www.misma.fr/',
  'Actes Sud BD': 'https://www.actes-sud.fr/',
  'Akata': 'https://www.akata.fr/',
  'Les Requins Marteaux': 'https://www.lesrequinsmarteaux.com/',
  'Sarbacane': 'https://www.editions-sarbacane.com/',
  'Ankama': 'https://www.ankama.com/',
  'L\'Agrume': 'https://www.lagrume.org/',
  'Ki-oon': 'https://www.ki-oon.com/',
  'Rackham': 'https://editions-rackham.com/',
  'Cornélius': 'https://www.cornelius.fr/',
  'L\'Employé du Moi': 'https://www.employedumoi.be/',
  'Les Humanoïdes Associés': 'https://www.humano.com/',
  'Panini Comics': 'https://www.panini.fr/',
  'The Hoochie Coochie': 'https://thehoochiecoochie.com/',

  // Smaller publishers (2-4 BDs)
  '6 Pieds Sous Terre': 'https://www.6pieds-sous-terre.com/',
  'Akileos': 'https://www.akileos.fr/',
  'Cambourakis': 'https://www.cambourakis.com/',
  'FLBLB': 'https://www.flblb.com/',
  'Fluide Glacial': 'https://www.fluideglacial.com/',
  'Gallimard BD': 'https://www.gallimard-bd.fr/',
  'HiComics': 'https://www.hicomics.com/',
  'Ici Même': 'https://www.ici-meme.com/',
  'Pika Édition': 'https://www.pika.fr/',
  'Le Lombard': 'https://www.lelombard.com/',
  'Le Lézard Noir': 'https://www.lezardnoir.com/',
  'Denoël Graphic': 'https://www.denoel.fr/',
  'Delcourt/Tonkam': 'https://www.editions-delcourt.fr/',
  'Crunchyroll': 'https://www.crunchyroll.com/',
  'Soleil': 'https://www.soleilprod.com/',
  'Tanibis': 'https://www.tanibis.net/',
  'Rue de Sèvres': 'https://www.editions-ruedesevres.fr/',
  'Monsieur Toussaint Louverture': 'https://www.monsieurtoussaintlouverture.com/',
  'Même Pas Mal': 'https://www.mpmcomics.com/',
  'Presque Lune': 'https://www.presquelune.com/',
  'Arbitraire': 'https://arbitraire-editions.com/',
  'Anne Carrière': 'https://www.anne-carriere.fr/',
  'Naban': null,
  'Kurokawa': 'https://www.kurokawa.fr/',
  'Mosquito': 'https://www.mosquito-editions.fr/',
  'Éditions 404': 'https://www.404-editions.fr/',
  'Bliss': 'https://www.bliss-editions.com/',
  'Grand Angle': 'https://www.grandangle.fr/',
  'Huginn & Muninn': 'https://www.huginn-muninn.fr/',
  'Kinaye': 'https://www.kinaye.fr/',
  'Le Tripode': 'https://le-tripode.net/',
  'Les Arènes': 'https://www.lesarenes.fr/',
  'Les Enfants Rouges': null,
  'Marabulles': 'https://www.marabulles.com/',
  'Pow Pow': 'https://www.editionspowpow.com/',
  'Vents d\'Ouest': 'https://www.ventsdouest.com/',

  // Single BD publishers
  'Bandes Détournées': null,
  'Deman': null,
  'Delirium': 'https://www.delirium-editions.com/',
  'Frémok': 'https://www.fremok.org/',
  'Glénat Manga': 'https://www.glenat.com/',
  'Huber Éditions': null,
  'Jungle': 'https://www.jungle.fr/',
  'Kazé': 'https://www.crunchyroll.com/', // absorbed by Crunchyroll
  'Keribus': null,
  'Kymera Comics': null,
  'LINK DIGITAL': null,
  'La Découverte': 'https://www.editionsladecouverte.fr/',
  'La Pastèque': 'https://www.lapasteque.com/',
  'La Ville Brûle': 'https://www.lavillebrule.com/',
  'Les Impressions Nouvelles': 'https://www.lesimpressionsnouvelles.com/',
  'Les Rêveurs': null,
  'Magnani': 'https://www.magnani-editions.com/',
  'Manga Taifu': null,
  'Mangetsu': 'https://www.mangetsu.fr/',
  'Michel Lafon': 'https://www.michel-lafon.fr/',
  'Noeve Grafx': 'https://www.noeve.com/',
  'Realistes': null,
  'Renard Doré': null,
  'Revival': null,
  'Rue de l\'Échiquier': 'https://www.ruedelechiquier.net/',
  'Sakka': 'https://www.casterman.com/', // Casterman imprint
  'Seuil': 'https://www.seuil.com/',
  'Vega': null,
  'Vide Cocagne': 'https://www.videcocagne.fr/',
  'Virages Graphiques': null,
  'Warum / Vraoum': null,
  'Éditions Inculte': 'https://www.inculte.fr/',
  'Éditions de la Cerise': 'https://www.editionsdelacerise.com/',
};


async function main() {
  const dryRun = process.argv.includes('--dry-run');
  if (dryRun) console.log('=== DRY RUN MODE ===\n');

  console.log('=== Consolidating publisher URLs ===\n');

  const bds = await prisma.bd.findMany({
    select: {
      id: true,
      title: true,
      publisher_url: true,
      publisherRef: { select: { name: true } },
      publisher: true,
    },
    orderBy: { title: 'asc' },
  });

  let updatedHomepage = 0;
  let noPublisher = 0;
  let notMapped = 0;
  const unmappedPublishers = new Set<string>();

  for (const bd of bds) {
    const publisherName = bd.publisherRef?.name || bd.publisher;
    if (!publisherName) {
      noPublisher++;
      continue;
    }

    // Use homepage mapping
    const homepage = PUBLISHER_URLS[publisherName];
    if (homepage === undefined) {
      unmappedPublishers.add(publisherName);
      notMapped++;
      continue;
    }

    if (homepage === null) {
      // Defunct/unknown publisher — set null
      if (bd.publisher_url) {
        if (!dryRun) {
          await prisma.bd.update({
            where: { id: bd.id },
            data: { publisher_url: null },
          });
        }
        updatedHomepage++;
      }
      continue;
    }

    if (bd.publisher_url !== homepage) {
      console.log(`  [HOMEPAGE] "${bd.title}" → ${homepage}`);
      if (!dryRun) {
        await prisma.bd.update({
          where: { id: bd.id },
          data: { publisher_url: homepage },
        });
      }
      updatedHomepage++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Updated to homepage: ${updatedHomepage}`);
  console.log(`No publisher: ${noPublisher}`);
  console.log(`Not mapped: ${notMapped}`);
  if (unmappedPublishers.size > 0) {
    console.log(`\nUnmapped publishers: ${[...unmappedPublishers].join(', ')}`);
  }
  if (dryRun) console.log('\n(Dry run — no changes made)');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
