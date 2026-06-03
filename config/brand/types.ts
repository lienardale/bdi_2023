export type BrandId = 'bdi' | 'cmbd';

export type Locale = 'fr' | 'en';

export type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  /** 4-color rotation used by `.card-cycle` rule blocks. */
  cardCycle: [string, string, string, string];
  /** Text color for the 4n+4 (gold) card in the rotation. */
  cardCycleGoldForeground: string;
};

export type CrowdfundingFeature = {
  url: string;
  /** Path under /public (e.g. "/brands/bdi/rdi-cover.jpg"). */
  coverImage: string;
  title: Record<Locale, string>;
  cta: Record<Locale, string>;
};

export type BrandAssets = {
  /** Path under /public (e.g. "/brands/bdi/logo.jpg"). */
  logo: string;
  hero: string;
  icon: string;
  appleIcon: string;
  favicon: string;
};

export type Brand = {
  id: BrandId;
  /** Long display form, e.g. "La Bande des Idées", "C'est Marseille BD". */
  longName: string;
  /** Short / abbreviated form used in title templates, e.g. "La BDI", "CMBD". */
  shortName: string;
  /** Metadata description. */
  description: string;
  /** Metadata title template, e.g. "%s | La BDI". */
  metadataTemplate: string;
  email: string;
  facebookUrl: string;
  instagramUrl: string;
  /** Handle including the "@", e.g. "@labandedesidees". */
  instagramHandle: string;
  /** Public domain, e.g. "cmarseillebd.fr". Not used for routing. */
  domain: string;
  /** iCalendar PRODID string. */
  icsPRODID: string;
  /** Suffix used to build iCalendar UIDs, e.g. "bdi" or "cmbd". */
  icsUidSuffix: string;
  assets: BrandAssets;
  /**
   * How the home hero banner renders:
   * - `'overlay'`: full-bleed hero image darkened by an overlay, brand name on top.
   * - `'logo'`: the logo shown (contained) on cream, no overlay or title — the logo
   *   already carries the name.
   */
  heroLayout: 'overlay' | 'logo';
  /**
   * Heading font (titles site-wide). Body text is always Inter for legibility.
   * - `'lusitana'`: the default serif.
   * - `'darumadrop'`: CMBD's rounded hand-drawn display face (bundled at app/fonts/).
   */
  headingFont: 'lusitana' | 'darumadrop';
  /**
   * Mobile navigation style:
   * - `true`: compact bar — the logo replaces the home icon and the separate
   *   logo header is hidden, keeping a thin top bar.
   * - `false`: classic — logo header on top plus a house icon for home.
   */
  compactMobileNav: boolean;
  theme: ThemeColors;
  features: {
    crowdfunding?: CrowdfundingFeature;
  };
};
