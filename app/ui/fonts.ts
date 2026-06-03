import {Inter, Lusitana, Bangers} from 'next/font/google'
import localFont from 'next/font/local'
import { brand } from '@/config/brand'

export const inter = Inter({subsets: ['latin']});
export const bangers = Bangers({weight: '400', subsets: ['latin']});

// Heading font — one per brand ("instance personalization"). Both are declared
// statically (next/font requires that) but only the active brand's font is applied.
// Exported as `lusitana` because every heading in the app already imports that
// symbol; swapping what it points to re-skins all headings with zero edits.
const lusitanaFont = Lusitana({weight:['400', '700'],subsets: ['latin']});
const darumadrop = localFont({
  src: '../fonts/DarumadropOne-Regular.ttf',
  weight: '400',
  display: 'swap',
  fallback: ['Lusitana', 'Georgia', 'serif'],
});

export const lusitana = brand.headingFont === 'darumadrop' ? darumadrop : lusitanaFont;

// Body font (everything that isn't a heading). For brands with a display heading
// face we run that face site-wide; otherwise body stays Inter for legibility.
export const bodyFont = brand.headingFont === 'darumadrop' ? darumadrop : inter;
