"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  Upload, 
  Sparkles, 
  Check, 
  Image as ImageIcon, 
  Download, 
  Share2, 
  Layers, 
  Zap, 
  ShieldCheck,
  Instagram,
  Twitter,
  Linkedin,
  MapPin
} from "lucide-react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [designResult, setDesignResult] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setDesignResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setDesignResult("");
    
    const mockReports = [
      "## Recommended Aesthetic: **Contemporary Gold & Marble**\n\nBased on your space's architectural geometry, we recommend a palette of **Brushed Gold** and **Calacatta Marble**. \n\n### Key Enhancements:\n1. **Lighting:** Install recessed cove lighting along the ceiling perimeter to create a 'floating' effect.\n2. **Materials:** Replace current flooring with large-format stone tiles to expand the visual volume.\n3. **Furniture:** Introduce low-profile velvet seating in charcoal to provide a sophisticated contrast.",
      "## Recommended Aesthetic: **Modern Zenith Minimalist**\n\nYour room's natural lighting profile suggests a **Zenith Minimalist** approach. Focus on 'quiet luxury' through high-end textures rather than ornamentation.\n\n### Key Enhancements:\n1. **Layout:** Pivot the seating arrangement 45 degrees toward the primary light source to enhance circadian flow.\n2. **Textures:** Layer raw silk curtains with wool-mohair rugs for a multi-sensory experience.\n3. **Art:** A single oversized monochromatic canvas will ground the room's energy.",
      "## Recommended Aesthetic: **The Sovereign Heights (Bespoke Luxury)**\n\nWe have identified a unique opportunity for a **Sovereign Heights** redesign, blending industrial elements with high-fashion interior accents.\n\n### Key Enhancements:\n1. **Ceiling:** Dark-tinted mirrored panels will double the perceived height and reflect ambient evening light.\n2. **Lighting:** A signature hand-blown glass chandelier should serve as the room's gravitational center.\n3. **Detailing:** Utilize black-steel framing for all transitions to provide a sharp, architectural edge."
    ];

    const randomReport = mockReports[Math.floor(Math.random() * mockReports.length)];
    let currentText = "";
    const wordsArr = randomReport.split(" ");
    for (let i = 0; i < wordsArr.length; i++) {
      currentText += wordsArr[i] + " ";
      setDesignResult(currentText);
      await new Promise(r => setTimeout(r, 50));
    }
    setIsAnalyzing(false);
  };

  const heroTitle = "Reimagine Your Living Space";
  const heroWords = heroTitle.split(" ");

  return (
    <div className="relative min-h-screen bg-onyx text-alabaster overflow-hidden selection:bg-gold selection:text-onyx font-inter">
      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold/50 pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: "spring", damping: 35, stiffness: 350, mass: 0.2 }}
      />

      {/* Background Ambience & Parallax Layer */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gold/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-gold/5 rounded-full blur-[180px]"></div>
        
        {/* Floating Architectural Nodes */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [0, -40, 0],
              x: [0, 20, 0]
            }}
            transition={{ 
              duration: 5 + i, 
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute bg-white/5 w-[1px] h-32"
            style={{ 
              top: `${i * 15}%`, 
              left: `${10 + (i * 17)}%`,
              transform: `rotate(${i * 45}deg)` 
            }}
          />
        ))}
      </motion.div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 w-full z-50 glass border-b border-white/5 px-12 py-8 flex justify-between items-center"
      >
        <div className="flex items-center gap-4 group cursor-pointer">
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.1, borderRadius: "50%" }}
            className="w-12 h-12 bg-gradient-gold rounded-2xl flex items-center justify-center shadow-2xl shadow-gold/20 transition-all duration-700"
          >
            <span className="text-onyx font-black text-2xl">E</span>
          </motion.div>
          <span className="text-2xl font-black tracking-tighter text-gradient-gold uppercase">Elevation</span>
        </div>

        <div className="hidden md:flex gap-x-12 text-[10px] font-black tracking-[0.3em] uppercase opacity-60">
          {['AI Design Lab', 'Portfolio', 'About'].map((item) => (
            <Link key={item} href={item === 'AI Design Lab' ? '#design-lab' : '#'} className="hover:text-gold transition-all relative group">
              {item}
              <motion.span 
                className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gold"
                whileHover={{ width: "100%" }}
              />
            </Link>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-gold text-onyx font-black rounded-full text-xs tracking-widest"
        >
          CONSULT NOW
        </motion.button>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-40 px-8 flex flex-col items-center justify-center text-center min-h-screen">
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="mb-12"
        >
          <div className="px-6 py-2 glass rounded-full border border-gold/20 mb-8">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-[10px] font-black tracking-[0.4em] text-gold uppercase"
            >
              The Pinnacle of AI Architecture
            </motion.span>
          </div>
        </motion.div>

        <motion.div style={{ y: textY }} className="mb-8">
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] flex flex-wrap justify-center gap-x-6">
            {heroWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0, rotateX: -45 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ 
                  delay: 0.5 + (i * 0.1), 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className={`inline-block ${i >= 2 ? 'text-gradient-gold italic font-display font-medium' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="max-w-3xl text-xl text-alabaster/40 leading-relaxed mb-16 font-light italic"
        >
          Where biological intuition meets computational perfection. We don't just design rooms; we engineer atmospheres.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-8 mb-32"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="#design-lab" className="px-12 py-6 bg-gradient-gold text-onyx font-black text-xl rounded-2cl shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:shadow-gold/50 transition-all flex items-center gap-4 group">
              INITIATE AI
              <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          <motion.button 
            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            className="px-12 py-6 glass rounded-2cl border border-white/10 font-bold text-xl transition-all"
          >
            THE GALLERY
          </motion.button>
        </motion.div>

        {/* Cinematic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-7xl pb-24">
          {[
            { val: "15k+", label: "Design Iterations" },
            { val: "0.4s", label: "Analysis Speed" },
            { val: "100%", label: "Uniqueness" },
            { val: "Global", label: "Presence" }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass p-10 rounded-[40px] border border-white/5 relative overflow-hidden group"
            >
              <motion.div 
                className="absolute inset-0 bg-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700"
              />
              <h3 className="text-4xl font-black text-gradient-gold mb-2 relative z-10">{stat.val}</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-alabaster/30 font-black relative z-10">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI DESIGN LAB SECTION */}
      <section id="design-lab" className="py-40 px-8 max-w-7xl mx-auto scroll-mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass p-1 md:p-20 rounded-[80px] border border-white/5 relative"
        >
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative z-10">
              <motion.h2 
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-5xl md:text-7xl font-black mb-10 leading-[0.9]"
              >
                The <span className="text-gradient-gold font-display font-medium">Neural</span> <br /> Architect
              </motion.h2>
              <p className="text-alabaster/40 text-xl mb-12 font-light leading-relaxed italic">
                Our vision algorithms analyze spatial volume, light dispersion, and materiality to reconstruct your environment with god-tier precision.
              </p>

              <div className="space-y-6 mb-16">
                {["Volumetric Scanning", "Material Synthesis", "Dynamic Lighting"].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    className="flex items-center gap-6"
                  >
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                      <Check size={16} className="text-gold" />
                    </div>
                    <span className="text-lg font-black tracking-widest text-alabaster/80 uppercase text-[12px]">{item}</span>
                  </motion.div>
                ))}
              </div>

              <input type="file" className="hidden" ref={fileInputRef} onChange={handleUpload} accept="image/*" />

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {!selectedImage ? (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-12 py-8 glass-gold border border-gold/30 rounded-3xl font-black text-xs tracking-[0.4em] hover:bg-gold/10 transition-all flex items-center justify-center gap-6"
                  >
                    <Upload size={24} className="text-gold" />
                    UPLOAD VISION
                  </button>
                ) : (
                  <div className="flex flex-col gap-6">
                    <button
                      onClick={startAnalysis}
                      disabled={isAnalyzing}
                      className="w-full px-12 py-8 bg-gradient-gold text-onyx font-black text-xs tracking-[0.4em] rounded-3xl flex items-center justify-center gap-6 shadow-2xl shadow-gold/20"
                    >
                      {isAnalyzing ? "NEURAL PROCESSING..." : "EXECUTE REDESIGN"}
                      {!isAnalyzing && <Sparkles size={24} />}
                    </button>
                    <button onClick={() => setSelectedImage(null)} className="text-[10px] font-black tracking-[0.5em] text-alabaster/20 hover:text-red-500 uppercase">Reset System</button>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="relative">
              <motion.div 
                layout
                className="relative aspect-[3/4] glass rounded-[60px] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
              >
                <AnimatePresence mode="wait">
                  {selectedImage ? (
                    <motion.div key="image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full relative">
                      <motion.img
                        src={selectedImage}
                        alt="Vision"
                        className={`w-full h-full object-cover transition-all duration-[2000ms] ${isAnalyzing ? 'blur-2xl scale-125 saturate-0' : 'blur-0 scale-100'}`}
                      />
                      {isAnalyzing && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-32 h-32 border-2 border-gold/20 border-t-gold rounded-full"
                          />
                          <motion.div 
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute bg-gold w-4 h-4 rounded-full blur-md"
                          />
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div key="empty" className="w-full h-full flex flex-col items-center justify-center text-alabaster/10 p-24 text-center">
                      <ImageIcon size={120} strokeWidth={0.2} className="mb-12" />
                      <p className="text-2xl font-black tracking-tighter uppercase">Awaiting Visual Input</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <AnimatePresence>
                {designResult && (
                  <motion.div 
                    initial={{ x: 100, opacity: 0, rotateY: 45 }}
                    animate={{ x: 0, opacity: 1, rotateY: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="absolute -bottom-20 -right-12 w-[110%] max-w-sm glass-gold border border-gold/50 p-10 rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] z-20"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
                      <span className="text-[10px] font-black text-gold uppercase tracking-[0.5em]">Neural Synthesis Complete</span>
                    </div>
                    <h4 className="text-2xl font-black mb-6 leading-none">Architectural Mutation</h4>
                    <motion.div
                      className="text-alabaster/70 text-sm leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{ __html: designResult.replace(/\*\*(.*?)\*\*/g, '<b class="text-white font-black">$1</b>').replace(/\n/g, '<br/>') }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-60 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-32 mb-40">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-7xl font-black tracking-tighter mb-12">The <br /> Philosophy <br /> of Flow</h2>
            <p className="text-alabaster/30 text-2xl font-light italic leading-relaxed">
              "Architecture is not about space, but about the time spent within it."
            </p>
          </motion.div>

          <div className="grid gap-12 pt-12">
            {[
              { title: "Volumetric Flow", desc: "Algorithmic pathfinding for human movement.", icon: <Layers size={40} /> },
              { title: "Material Soul", desc: "Synthesis of sustainable and luxury textures.", icon: <Zap size={40} /> },
              { title: "Shielded Security", desc: "Bespoke privacy through geometric occlusion.", icon: <ShieldCheck size={40} /> }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-12 group p-8 glass-transparent hover:bg-white/5 rounded-[40px] transition-all"
              >
                <div className="text-gold shrink-0 group-hover:scale-125 transition-transform duration-500">{feature.icon}</div>
                <div>
                  <h3 className="text-2xl font-black mb-2 uppercase tracking-widest">{feature.title}</h3>
                  <p className="text-alabaster/40">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-40 bg-black/40 border-t border-white/5 px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-32">
          <div className="col-span-1">
            <div className="flex items-center gap-4 mb-20">
              <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center">
                <span className="text-onyx font-black">E</span>
              </div>
              <span className="text-xl font-black tracking-[0.3em] text-gradient-gold uppercase">Elevation</span>
            </div>
            <div className="flex gap-12 mb-20">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <motion.div key={i} whileHover={{ y: -10, color: '#D4AF37' }} className="text-alabaster/20 cursor-pointer">
                  <Icon size={32} strokeWidth={1.5} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-20">
            {['Portfolio', 'Philosophy', 'AI Designer', 'Legal'].map((group) => (
              <div key={group}>
                <h4 className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase mb-12">{group}</h4>
                <div className="flex flex-col gap-6 text-[12px] font-black tracking-widest text-alabaster/40 uppercase">
                  <Link href="#" className="hover:text-gold transition-colors">Link One</Link>
                  <Link href="#" className="hover:text-gold transition-colors">Link Two</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-40 flex flex-col md:flex-row justify-between items-center gap-20 opacity-20">
          <p className="text-[8px] font-black tracking-[1em] uppercase">Built with Neural Networks & Gold Dust</p>
          <div className="flex gap-20 text-[8px] font-black tracking-[0.5em] uppercase">
            <span>Dubai</span>
            <span>New York</span>
            <span>Tokyo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
