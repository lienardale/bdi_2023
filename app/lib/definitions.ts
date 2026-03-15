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

export type BdsTable = {
  id: string;
  eventId: string;
  event: { id: string; name: string };
  authors: { author: { id: string; name: string } }[];
  title: string;
  publisher: string | null;
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

export type EventsTable = {
  id: string;
  name: string;
  date: Date;
  hour: string | null;
  place: string | null;
  bds: {
    id: string;
    title: string;
    publisher?: string | null;
    publishing_year?: number | null;
    authors: { author: { id: string; name: string } }[];
  }[];
  fb_event: string | null;
  cover_url: string | null;
}
