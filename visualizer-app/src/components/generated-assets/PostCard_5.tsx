
import React from 'react';

const PostCard_5: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-cream min-h-screen">
      <div className="relative w-[1080px] h-[1350px] bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col p-16 border-[12px] border-sage/10">
        {/* Decorative Grid */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/5 rounded-bl-full -mr-20 -mt-20"></div>
        
        {/* Header */}
        <header className="mb-12 border-b-2 border-sand/30 pb-8 z-10">
          <h1 className="font-serif text-6xl text-earth-brown leading-tight mb-4">
            Abril en CDMX: esto es lo que debes revisar en tu perro al llegar a casa
          </h1>
          <div className="w-24 h-1 bg-terracotta"></div>
        </header>

        {/* Content */}
        <main className="flex-grow z-10">
          <p className="font-sans text-3xl text-earth-brown/80 leading-relaxed whitespace-pre-wrap">
            Abril llegó y con él algo que muchos dueños no saben: el Gusano Barrenador está activo en México.<br /><br />No necesitas una herida grande. Con un rasguño pequeño es suficiente.<br /><br />Lo que debes revisar cada vez que tu perro llegue a casa:<br /><br />🔍 Slide 1 — Revisa entre los dedos y almohadillas<br />🔍 Slide 2 — Cuello y detrás de las orejas<br />🔍 Slide 3 — Base de la cola<br />🔍 Slide 4 — Cualquier cortada, aunque sea mínima<br /><br />Si ves algo raro: veterinario de inmediato. Sin esperar.<br /><br />En Paws Club hacemos revisión diaria de cada peludo. Porque el cuidado no termina cuando llegan.
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

export default PostCard_5;
