
import pkg from '@notionhq/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const { Client } = pkg;

// Define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from workspace root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

console.log('Notion Client Keys:', Object.keys(notion));
if (notion.databases) {
  console.log('Notion Databases Keys:', Object.keys(notion.databases));
} else {
  console.log('notion.databases is UNDEFINED');
}

interface Post {
  id: string;
  title: string;
  content: string;
  status: string;
}

async function fetchApprovedPosts() {
  console.log('Fetching approved posts from Notion via Fetch API...');
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: 'Estado',
          select: {
            equals: 'Aprobado',
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Notion API Error: ${JSON.stringify(errorData)}`);
    }

    const data: any = await response.json();
    const posts: Post[] = data.results.map((page: any) => {
      // Mapping based on live schema: "Título / Hook", "Caption", "Estado"
      const title = page.properties['Título / Hook']?.title[0]?.plain_text || 'Untitled';
      const content = page.properties.Caption?.rich_text.map((t: any) => t.plain_text).join('') || '';
      const status = page.properties.Estado?.select?.name || 'Aprobado';

      return {
        id: page.id,
        title,
        content,
        status,
      };
    });

    console.log(`Found ${posts.length} approved posts.`);
    
    // Save to a planning artifact as requested
    const planningContent = `# Approved Posts Registry\n\n` + 
      posts.map(p => `- **Title**: ${p.title}\n  - **ID**: ${p.id}\n  - **Status**: ${p.status}`).join('\n\n');
    
    fs.writeFileSync(path.join(__dirname, '../../../approved-posts-planning.md'), planningContent);
    console.log('Saved registry to approved-posts-planning.md');

    return posts;
  } catch (error) {
    console.error('Error fetching from Notion:', error);
    return [];
  }
}

async function generateComponents(posts: Post[]) {
  const assetsDir = path.join(__dirname, '../components/generated-assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  posts.forEach((post, index) => {
    const componentName = `PostCard_${index + 1}`;
    const componentContent = `
import React from 'react';

const ${componentName}: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-cream min-h-screen">
      <div className="relative w-[1080px] h-[1350px] bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col p-16 border-[12px] border-sage/10">
        {/* Decorative Grid */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/5 rounded-bl-full -mr-20 -mt-20"></div>
        
        {/* Header */}
        <header className="mb-12 border-b-2 border-sand/30 pb-8 z-10">
          <h1 className="font-serif text-6xl text-earth-brown leading-tight mb-4">
            ${post.title}
          </h1>
          <div className="w-24 h-1 bg-terracotta"></div>
        </header>

        {/* Content */}
        <main className="flex-grow z-10">
          <p className="font-sans text-3xl text-earth-brown/80 leading-relaxed whitespace-pre-wrap">
            ${post.content.replace(/\n/g, '<br />')}
          </p>
        </main>

        {/* Footer / Branding */}
        <footer className="mt-auto pt-8 border-t border-sand/20 text-sage font-serif italic text-2xl z-10 flex justify-between items-center">
          <span>Notion Visualizer System</span>
          <span className="text-terracotta font-sans not-italic text-lg tracking-widest uppercase">Educational Resource</span>
        </footer>
      </div>
    </div>
  );
};

export default ${componentName};
`;
    fs.writeFileSync(path.join(assetsDir, `${componentName}.tsx`), componentContent);
    console.log(`Generated ${componentName}.tsx`);
  });

  // Generate an index for the assets
  const indexContent = posts.map((_, i) => `export { default as PostCard_${i + 1} } from './PostCard_${i + 1}';`).join('\n');
  fs.writeFileSync(path.join(assetsDir, 'index.ts'), indexContent);
}

async function main() {
  const posts = await fetchApprovedPosts();
  if (posts.length > 0) {
    await generateComponents(posts);
  }
}

main().catch(console.error);
