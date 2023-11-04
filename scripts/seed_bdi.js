const { sql } = require('@vercel/postgres');
const {
    events,
    bds,
    authors,
} = require('../app/lib/placeholder-bdi-data.js');
const bcrypt = require('bcrypt');

async function seedEvents(){
    try {
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        console.log('CREATING TABLE EVENTS')
        // Create the "invoices" table if it doesn't exist
        const createTable = await sql`
          CREATE TABLE IF NOT EXISTS events (
              id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
              name VARCHAR(255) NOT NULL UNIQUE,
              date DATE NOT NULL UNIQUE,
              bd_ids UUID[],
              fb_event TEXT
            );
          `;
    
        // console.log(`Created "events" table`);
    
        // Insert data into the "events" table
        const insertedEvents = await Promise.all(
            events.map(async (event) => {
            return sql`
            INSERT INTO events (id, name, date, bd_ids, fb_event)
            VALUES (${event.id}, ${event.name}, ${event.date_time}, ${event.bd_ids}, ${event.fb_event})
            ON CONFLICT (id) DO NOTHING;
          `;
          }),
        );
    
        console.log(`Seeded ${insertedEvents.length} events`);
    
        return {
          createTable,
          users: insertedEvents,
        };
      } catch (error) {
        console.error('Error seeding events:', error);
        throw error;
      }
}

async function seedBds(){
    try {
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "invoices" table if it doesn't exist
        const createTable = await sql`
          CREATE TABLE IF NOT EXISTS bds (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            event_ids UUID,
            author_ids UUID[],
            title VARCHAR(255) NOT NULL UNIQUE,
            publicher TEXT,
            publishing_year INT
          );
        `;
    
        console.log(`Created "bds" table`);
    
        // Insert data into the "bds" table
        const insertedBds = await Promise.all(
            bds.map(async (bd) => {
            return sql`
            INSERT INTO bds (id, event_ids, author_ids, title, publicher, publishing_year)
            VALUES (${bd.id}, ${bd.event_ids}, ${bd.author_ids}, ${bd.title}, ${bd.publicher}, ${bd.publishing_year})
            ON CONFLICT (id) DO NOTHING;
          `;
          }),
        );
    
        console.log(`Seeded ${insertedBds.length} bds`);
    
        return {
          createTable,
          users: insertedBds,
        };
      } catch (error) {
        console.error('Error seeding bds:', error);
        throw error;
      }
}

async function seedAuthors(){
    try {
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "invoices" table if it doesn't exist
        const createTable = await sql`
          CREATE TABLE IF NOT EXISTS authors (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            bd_ids UUID[],
            name VARCHAR(255) NOT NULL UNIQUE
          );
        `;
    
        console.log(`Created "authors" table`);
    
        // Insert data into the "authors" table
        const insertedAuthors = await Promise.all(
            authors.map(async (author) => {
            return sql`
            INSERT INTO authors (id, bd_ids, name)
            VALUES (${author.id}, ${author.bd_ids}, ${author.name})
            ON CONFLICT (id) DO NOTHING;
          `;
          }),
        );
    
        console.log(`Seeded ${insertedAuthors.length} authors`);
    
        return {
          createTable,
          users: insertedAuthors,
        };
      } catch (error) {
        console.error('Error seeding authors:', error);
        throw error;
      }
}

(async () => {
    await seedEvents();
    await seedBds();
    await seedAuthors();
  })();
