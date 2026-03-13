#!/usr/bin/env python3
"""
Extract BDI CSV data into a JS seed file compatible with placeholder-bdi-data.js format.

Extracts: Events, BDs, Authors (from both Auteurs.rices and Dessinateurs.ices).
Ignores: Intervenants, place, description, cover URLs.
"""

import csv
import json
import re
import uuid
from collections import OrderedDict
from datetime import datetime

CSV_PATH = "Tableau suivi BDI  - Historique BDI (à modifier).csv"
OUTPUT_PATH = "app/lib/placeholder-bdi-data.js"

# Column offsets for the 4 BD slots
BD_OFFSETS = [18, 24, 30, 36]
# Within each BD slot: +0=title, +1=auteurs, +2=dessinateurs, +3=année, +4=édition


def parse_names(raw: str) -> list[str]:
    """Split a raw author/illustrator field into individual names."""
    if not raw or raw.strip() in ("", "/"):
        return []
    # Normalize separators: ", " and " et " and " & "
    s = raw.strip().rstrip(",")
    # Split on ", " or " et " or " & "
    parts = re.split(r"\s*,\s*|\s+et\s+|\s*&\s*", s)
    return [p.strip() for p in parts if p.strip()]


def parse_date(date_str: str) -> str | None:
    """Parse DD/MM/YYYY to ISO datetime string."""
    date_str = date_str.strip()
    if not date_str:
        return None
    try:
        dt = datetime.strptime(date_str, "%d/%m/%Y")
        return dt.strftime("%Y-%m-%dT19:30:00.000Z")
    except ValueError:
        return None


def make_uuid(seed_str: str) -> str:
    """Generate a deterministic UUID from a string seed."""
    return str(uuid.uuid5(uuid.NAMESPACE_URL, seed_str))


def main():
    # Accumulators
    authors_by_name: dict[str, str] = {}  # name -> uuid
    bds_by_title: dict[str, dict] = OrderedDict()  # title -> bd record
    events: list[dict] = []
    bd_author_links: list[tuple[str, str]] = []  # (author_id, bd_id)

    def get_or_create_author(name: str) -> str:
        """Return author UUID, creating if needed."""
        key = name.strip()
        if key not in authors_by_name:
            authors_by_name[key] = make_uuid(f"author:{key}")
        return authors_by_name[key]

    with open(CSV_PATH, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        next(reader)  # skip header row 1 (group headers)
        next(reader)  # skip header row 2 (column headers)

        for row in reader:
            if len(row) < 6:
                continue
            num = row[0].strip()
            if not num.isdigit():
                continue

            event_num = int(num)
            date_str = row[1].strip()
            fb_event = row[3].strip() if row[3].strip() not in ("", "/") else None

            event_id = make_uuid(f"event:{event_num}")
            date_iso = parse_date(date_str)
            if not date_iso:
                print(f"WARNING: Skipping event #{event_num}, bad date: {date_str!r}")
                continue

            event_bd_ids = []

            for bd_offset in BD_OFFSETS:
                if bd_offset >= len(row):
                    continue
                title = row[bd_offset].strip() if bd_offset < len(row) else ""
                if not title or title == "/":
                    continue

                auteurs_raw = row[bd_offset + 1].strip() if bd_offset + 1 < len(row) else ""
                dessins_raw = row[bd_offset + 2].strip() if bd_offset + 2 < len(row) else ""
                year_raw = row[bd_offset + 3].strip() if bd_offset + 3 < len(row) else ""
                publisher = row[bd_offset + 4].strip() if bd_offset + 4 < len(row) else ""

                # Parse year
                publishing_year = None
                if year_raw.isdigit():
                    publishing_year = int(year_raw)

                # Parse authors and illustrators
                author_names = parse_names(auteurs_raw)
                illustrator_names = parse_names(dessins_raw)
                all_creator_names = list(
                    OrderedDict.fromkeys(author_names + illustrator_names)
                )

                # Get or create author records
                creator_ids = [get_or_create_author(n) for n in all_creator_names]

                # BD dedup by title: if same title already exists, keep first occurrence
                if title not in bds_by_title:
                    bd_id = make_uuid(f"bd:{title}")
                    bds_by_title[title] = {
                        "id": bd_id,
                        "title": title,
                        "event_ids": event_id,
                        "author_ids": creator_ids,
                        "publisher": publisher if publisher and publisher != "/" else None,
                        "publishing_year": publishing_year,
                    }
                    # Create junction links
                    for cid in creator_ids:
                        bd_author_links.append((cid, bd_id))
                    event_bd_ids.append(bd_id)
                else:
                    event_bd_ids.append(bds_by_title[title]["id"])

            events.append(
                {
                    "id": event_id,
                    "name": f"La Bande des idées #{event_num}",
                    "date_time": date_iso,
                    "bd_ids": event_bd_ids,
                    "fb_event": fb_event,
                }
            )

    # Build authors list
    authors = [
        {"id": aid, "name": name, "bd_ids": []}
        for name, aid in authors_by_name.items()
    ]
    # Fill in author.bd_ids from junction links
    author_bd_map: dict[str, list[str]] = {}
    for author_id, bd_id in bd_author_links:
        author_bd_map.setdefault(author_id, []).append(bd_id)
    for author in authors:
        author["bd_ids"] = author_bd_map.get(author["id"], [])

    bds = list(bds_by_title.values())

    # Stats
    print(f"Extracted: {len(events)} events, {len(bds)} BDs, {len(authors)} authors")
    print(f"BD-Author links: {len(bd_author_links)}")

    # Generate JS output
    def to_js_array(name: str, data: list[dict]) -> str:
        return f"const {name} = {json.dumps(data, indent=4, ensure_ascii=False)};\n"

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n")
        f.write(to_js_array("events", events))
        f.write("\n")
        f.write(to_js_array("bds", bds))
        f.write("\n")
        f.write(to_js_array("authors", authors))
        f.write("\n")
        f.write("module.exports = {\n    events,\n    bds,\n    authors,\n};\n")

    print(f"Written to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
