
import React from 'react';
import * as Cards from './components/generated-assets';

function App() {
  const cardEntries = Object.entries(Cards);

  return (
    <div className="min-h-screen bg-sand/10 py-12 px-4 flex flex-col items-center">
      <header className="mb-12 text-center">
        <h1 className="font-serif text-5xl text-earth-brown mb-2 tracking-tight">
          Notion Visualizer Gallery
        </h1>
        <p className="font-sans text-xl text-sage uppercase tracking-widest font-medium">
          Educational Assets Preview
        </p>
      </header>

      <div className="flex flex-col gap-16 w-full max-w-[1200px] items-center">
        {cardEntries.length > 0 ? (
          cardEntries.map(([name, Component]: [string, any]) => (
            <div key={name} className="flex flex-col items-center gap-4">
              <span className="bg-terracotta text-cream px-4 py-1 rounded-full text-sm font-sans uppercase tracking-tighter">
                {name}
              </span >
              <div className="shadow-2xl hover:scale-[1.01] transition-transform duration-500">
                <Component />
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 bg-white rounded-lg shadow font-serif text-2xl text-earth-brown/50">
            No approved posts found yet. Check Notion permissions.
          </div>
        )}
      </div>

      <footer className="mt-24 pb-12 text-earth-brown/40 font-sans text-sm">
        &copy; 2026 Notion to Visual Artifacts System
      </footer>
    </div>
  );
}

export default App;
