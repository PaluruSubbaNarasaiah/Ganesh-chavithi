import React, { useState } from 'react';
import { SectionTitle, Card } from '../components/ui';
import { useAppContext } from '../context/AppContext';
import { Download, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function Gallery() {
  const { gallery, t } = useAppContext();
  
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setGenerating(true);
    setError('');
    
    try {
      const res = await fetch('/api/generate-darshan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      
      setGeneratedImage(data.image);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="py-4">
      <SectionTitle title={t('digitalDarshan')} subtitle={t('digitalDarshanSub')} />

      {/* AI Generator Highlight Section */}
      <Card className="glass !p-1 mb-8 relative overflow-hidden group border-[#F27D26]/40">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F27D26]/10 to-[#D4AF37]/10 blur-xl"></div>
        <div className="relative bg-black/60 backdrop-blur-md p-6 rounded-[20px] border border-[#F27D26]/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F27D26] to-[#D4AF37] flex items-center justify-center shadow-[0_0_15px_rgba(242,125,38,0.5)]">
              <Sparkles className="text-black" size={20} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl gold-text glow-text">{t('aiDarshan')}</h3>
              <p className="text-[10px] uppercase tracking-widest text-white/60">{t('generateWallpaper')}</p>
            </div>
          </div>
          
          <form onSubmit={handleGenerate} className="space-y-4">
            <textarea 
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="E.g., Golden Lord Ganesha seated on a lotus in a mystical blue forest, cinematic lighting..."
              className="w-full bg-black/40 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F27D26] focus:ring-1 focus:ring-[#F27D26]/50 placeholder:text-white/30 h-24 resize-none transition-all"
              required
            />
            
            <button 
              type="submit" 
              disabled={generating || !prompt}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F27D26] to-[#D4AF37] text-black font-bold uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(242,125,38,0.5)] hover:shadow-[0_0_30px_rgba(212,175,55,0.8)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generating ? (
                <><Loader2 className="animate-spin" size={18} /> {t('manifesting')}</>
              ) : (
                <><Sparkles size={18} /> {t('generateBtn')}</>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-900/30 border border-red-500/30 text-red-400 text-xs text-center">
              {error}
            </div>
          )}

          {generatedImage && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-col items-center"
            >
              <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <img src={generatedImage} alt="Generated Ganesh Darshan" className="w-full h-full object-cover" />
              </div>
              <a 
                href={generatedImage}
                download="Ganesh_Darshan.jpg"
                className="mt-4 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
              >
                <Download size={16} /> {t('saveToDevice')}
              </a>
            </motion.div>
          )}
        </div>
      </Card>

      <div className="flex items-center gap-2 mb-4 mt-6">
        <ImageIcon size={18} className="text-emerald-400" />
        <h3 className="font-bold text-sm uppercase tracking-widest text-white/80">{t('festivalMemories')}</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {gallery.map((img: any) => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square border border-white/10 shadow-lg">
            <img 
              src={img.url} 
              alt={img.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502]/90 via-[#0a0502]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <p className="text-white text-[10px] font-bold uppercase tracking-wider mb-2">{img.title}</p>
              <button className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full self-start transition-colors border border-white/20">
                <Download size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
