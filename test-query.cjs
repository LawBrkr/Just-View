const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

console.log('Testing Notion Database Query...');
console.log('Client Databases:', Object.keys(notion.databases));

async function run() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    console.log('SUCCESS! Found', response.results.length, 'results');
  } catch (error) {
    console.error('FAILED!', error.message);
  }
}

run();
