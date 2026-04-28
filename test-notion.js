
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function testNotion() {
  try {
    const response = await notion.databases.retrieve({ database_id: databaseId });
    console.log('Database Access: OK');
    console.log('Fields found:', Object.keys(response.properties));
    
    // Test query for "Aprobado"
    const query = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Estado",
        select: {
          equals: "Aprobado"
        }
      }
    });
    console.log('Approved posts count:', query.results.length);
  } catch (error) {
    console.error('Error connecting to Notion:', error.message);
  }
}

testNotion();
