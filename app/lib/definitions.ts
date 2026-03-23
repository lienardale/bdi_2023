export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type AuthorsTable = {
  id: string;
  name: string;
  bio: string | null;
  photo_url: string | null;
  wikipedia_url: string | null;
  bds: { bd: { id: string; title: string } }[];
}

export type PublisherOption = {
  id: string;
  name: string;
};

export type GenresTable = {
  id: string;
  name: string;
  _count: { bds: number };
};

export type BdsTable = {
  id: string;
  events: { event: { id: string; name: string } }[];
  authors: { author: { id: string; name: string } }[];
  genres: { genre: { id: string; name: string } }[];
  title: string;
  publisher: string | null;
  publisherId: string | null;
  publisherRef: { id: string; name: string } | null;
  publishing_year: number | null;
  ean: string | null;
  summary: string | null;
  publication_date: Date | null;
  page_count: number | null;
  price: any;
  cover_url: string | null;
  publisher_url: string | null;
  leslibraires_url: string | null;
}

// Wizard types

export type WizardBdEntry = {
  tempId: string;
  mode: 'existing' | 'new';
  existingId?: string;
  title?: string;
  publisherId?: string;
  publisherMode?: 'existing' | 'new';
  newPublisherName?: string;
  publishing_year?: number;
  ean?: string;
  summary?: string;
  cover_url?: string;
  publisher_url?: string;
  leslibraires_url?: string;
  publication_date?: string;
  page_count?: number;
  price?: number;
  genreIds?: string[];
};

export type WizardAuthorEntry = {
  tempId: string;
  mode: 'existing' | 'new';
  existingId?: string;
  name?: string;
  bio?: string;
  photo_url?: string;
  wikipedia_url?: string;
  bdTempIds?: string[];
};

export type WizardEvent = {
  name: string;
  date: string;
  hour: string;
  place: string;
  fb_event: string;
};

export type WizardData = {
  event: WizardEvent;
  bds: WizardBdEntry[];
  authors: WizardAuthorEntry[];
};

export type EventsTable = {
  id: string;
  name: string;
  date: Date;
  hour: string | null;
  place: string | null;
  bds: {
    bd: {
      id: string;
      title: string;
      publisher?: string | null;
      publisherRef?: { id: string; name: string } | null;
      publishing_year?: number | null;
      authors: { author: { id: string; name: string } }[];
    };
  }[];
  fb_event: string | null;
  cover_url: string | null;
}
