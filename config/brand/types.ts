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
  theme: ThemeColors;
  features: {
    crowdfunding?: CrowdfundingFeature;
  };
};
