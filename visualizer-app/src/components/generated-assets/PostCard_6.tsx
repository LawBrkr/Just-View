
import React from 'react';

const PostCard_6: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-cream min-h-screen">
      <div className="relative w-[1080px] h-[1350px] bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col p-16 border-[12px] border-sage/10">
        {/* Decorative Grid */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/5 rounded-bl-full -mr-20 -mt-20"></div>
        
        {/* Header */}
        <header className="mb-12 border-b-2 border-sand/30 pb-8 z-10">
          <h1 className="font-serif text-6xl text-earth-brown leading-tight mb-4">
            10 minutos. El primer paso de la automatización.
          </h1>
          <div className="w-24 h-1 bg-terracotta"></div>
        </header>

        {/* Content */}
        <main className="flex-grow z-10">
          <p className="font-sans text-3xl text-earth-brown/80 leading-relaxed whitespace-pre-wrap">
            El primer paso de la automatización no cuesta nada.<br /><br />Activa respuestas automáticas en tu Google Business Profile para las preguntas más frecuentes:<br /><br />→ ¿Cuál es su horario?<br />→ ¿Aceptan tarjeta?<br />→ ¿Tienen estacionamiento?<br />→ ¿Hacen citas?<br /><br />10 minutos de setup. Respuestas instantáneas 24/7. Sin contratar a nadie.<br /><br />Eso es automatización real: empezar por donde hay menos fricción y mayor impacto.
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

export default PostCard_6;
