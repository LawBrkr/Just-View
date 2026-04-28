
import React from 'react';

const PostCard_4: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-cream min-h-screen">
      <div className="relative w-[1080px] h-[1350px] bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col p-16 border-[12px] border-sage/10">
        {/* Decorative Grid */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/5 rounded-bl-full -mr-20 -mt-20"></div>
        
        {/* Header */}
        <header className="mb-12 border-b-2 border-sand/30 pb-8 z-10">
          <h1 className="font-serif text-6xl text-earth-brown leading-tight mb-4">
            11 de abril. Cada adoptado tiene una historia. ¿Cuál es la de tu perro?
          </h1>
          <div className="w-24 h-1 bg-terracotta"></div>
        </header>

        {/* Content */}
        <main className="flex-grow z-10">
          <p className="font-sans text-3xl text-earth-brown/80 leading-relaxed whitespace-pre-wrap">
            Hoy es el Día Mundial del Perro Callejero.<br /><br />Cada perro que llega a Paws tiene una historia. Algunos llegaron de la calle. Otros de un refugio. Todos llegaron para quedarse.<br /><br />Hoy los celebramos a todos — los que encontraron un hogar y los que aún lo esperan.<br /><br />¿Tu perro fue adoptado? Cuéntanos en los comentarios. Queremos conocer su historia. 🐾
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

export default PostCard_4;
