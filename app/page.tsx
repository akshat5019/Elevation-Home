"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const words = randomReport.split(" ");
    
    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + " ";
      setDesignResult(currentText);
      await new Promise(r => setTimeout(r, 70));
    }
    
    setIsAnalyzing(false);
  };

  return (
    <div className="relative min-h-screen bg-onyx text-alabaster overflow-hidden selection:bg-gold selection:text-onyx font-inter">
      {/* Background Ambience */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="fixed inset-0 pointer-events-none"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-[150px]"></div>
      </motion.div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 w-full z-50 glass border-b border-white/5 px-8 py-6 flex justify-between items-center"
      >
        <div className="flex items-center gap-3 group cursor-pointer">
          <motion.div 
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center shadow-lg shadow-gold/20"
          >
            <span className="text-onyx font-bold text-2xl">E</span>
          </motion.div>
          <span className="text-2xl font-bold tracking-tighter text-gradient-gold uppercase">Elevation</span>
        </div>

        <div className="hidden md:flex gap-1 gap-x-8 text-xs font-bold tracking-widest uppercase opacity-80">
          {['AI Design Lab', 'Portfolio', 'Philosophy', 'About'].map((item) => (
            <Link key={item} href={item === 'AI Design Lab' ? '#design-lab' : '#'} className="hover:text-gold transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-gradient-gold text-onyx font-bold rounded-full text-sm shadow-lg shadow-gold/10"
        >
          GET IN TOUCH
        </motion.button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 glass rounded-full border border-gold/20 mb-8 transform cursor-default"
        >
          <span className="text-xs font-bold tracking-[0.2em] text-gold uppercase">Industry Leading AI Interior Design</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-8"
        >
          Reimagine Your <br />
          <span className="text-gradient-gold italic font-display font-medium">Living Space</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="max-w-2xl text-lg text-alabaster/60 leading-relaxed mb-12"
        >
          We combine the precision of Artificial Intelligence with the soul of bespoke architecture to transform your envisions into luxurious reality.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 mb-20"
        >
          <Link href="#design-lab" className="px-10 py-5 bg-gradient-gold text-onyx font-black text-lg rounded-2xl shadow-2xl shadow-gold/30 hover:shadow-gold/50 hover:-translate-y-1 transition-all flex items-center gap-3 group">
            TRY AI DESIGNER
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <button className="px-10 py-5 glass rounded-2xl border border-white/10 font-bold text-lg hover:bg-white/10 hover:-translate-y-1 transition-all">
            VIEW WORKS
          </button>
        </motion.div>

        {/* Floating Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-auto py-12">
          {[
            { val: "15k+", label: "Gen Designs" },
            { val: "99%", label: "Accuracy" },
            { val: "24/7", label: "Consultation" },
            { val: "Instant", label: "Results" }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border border-white/5 group hover:border-gold/30 transition-all animate-float" 
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <h3 className="text-3xl font-black text-gradient-gold mb-1">{stat.val}</h3>
              <p className="text-xs uppercase tracking-widest text-alabaster/40 font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI DESIGN LAB SECTION */}
      <section id="design-lab" className="py-32 px-8 max-w-7xl mx-auto scroll-mt-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-1 md:p-12 rounded-[50px] border border-white/5 overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center p-8 md:p-0">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black mb-6 leading-tight"
              >
                Experience the <span className="text-gradient-gold font-display font-medium">AI Design Lab</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-alabaster/60 text-lg mb-8 leading-relaxed"
              >
                Upload a photo of your current space and let our proprietary AI engine redesign it with luxury aesthetics in seconds.
              </motion.p>

              <ul className="space-y-4 mb-10">
                {[
                  "Intelligent lighting optimization",
                  "Material & texture recommendation",
                  "Architectural layout analysis",
                  "Bespoke furniture selection"
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-center gap-3 text-alabaster/80 font-medium"
                  >
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40">
                      <Check size={14} className="text-gold" strokeWidth={3} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/*"
              />

              {!selectedImage ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full md:w-auto px-10 py-5 glass-gold border border-gold/30 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gold/10 transition-all group"
                >
                  <Upload size={24} className="text-gold animate-bounce" />
                  UPLOAD YOUR ROOM IMAGE
                </motion.button>
              ) : (
                <div className="flex flex-col gap-4">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startAnalysis}
                    disabled={isAnalyzing}
                    className="w-full md:w-auto px-10 py-5 bg-gradient-gold text-onyx font-bold rounded-2xl flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-gold/20 transition-all disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-5 h-5 border-3 border-onyx/30 border-t-onyx rounded-full"
                        />
                        AI ANALYZING SPACE...
                      </>
                    ) : (
                      <>
                        <Sparkles size={24} />
                        GENERATE LUXURY REDESIGN
                      </>
                    )}
                  </motion.button>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-sm font-bold text-alabaster/40 hover:text-red-500 transition-colors uppercase tracking-widest"
                  >
                    Remove and try another
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              {/* Image Preview Window */}
              <motion.div 
                layout
                className="relative aspect-[4/3] glass rounded-3xl overflow-hidden border border-white/10 group shadow-2xl"
              >
                {selectedImage ? (
                  <>
                    <motion.img
                      initial={{ scale: 1.1, filter: "blur(10px)" }}
                      animate={{ scale: 1, filter: "blur(0px)" }}
                      src={selectedImage}
                      alt="Preview"
                      className={`w-full h-full object-cover transition-all duration-1000 ${isAnalyzing ? 'blur-md scale-110 opacity-50' : 'blur-0 scale-100 opacity-100'}`}
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <motion.div 
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-0 w-full h-1 bg-gold shadow-[0_0_20px_#D4AF37]"
                          />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-alabaster/20 p-12 text-center">
                    <ImageIcon size={80} strokeWidth={0.5} className="mb-6" />
                    <p className="text-xl font-medium tracking-tight">Your AI preview will appear here</p>
                  </div>
                )}
              </motion.div>

              {/* Design Results Overlay */}
              <AnimatePresence>
                {designResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute -bottom-10 -right-4 md:-right-10 w-full max-w-sm glass-gold border border-gold/40 p-8 rounded-3xl shadow-2xl z-10"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <motion.span 
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                      />
                      <span className="text-xs font-bold text-gold uppercase tracking-[0.2em]">AI Design Report</span>
                    </div>
                    <h4 className="text-xl font-black mb-4">Recommended Aesthetic</h4>
                    <motion.div
                      className="text-alabaster/80 text-sm leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: designResult.replace(/\*\*(.*?)\*\*/g, '<b class="text-gold">$1</b>') }}
                    />
                    <div className="mt-6 flex gap-3">
                      <button className="flex-1 py-2 rounded-xl bg-gold/10 border border-gold/20 text-gold text-xs font-bold hover:bg-gold/20 transition-all uppercase tracking-wider flex items-center justify-center gap-2">
                        <Download size={14} /> Download PDF
                      </button>
                      <button className="px-4 py-2 rounded-xl glass border border-white/10 text-xs font-bold hover:bg-white/10 transition-all uppercase">
                        <Share2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-28 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-6"
          >
            <div className="w-2 h-2 bg-gold rounded-full"></div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-8 tracking-tighter"
          >
            Our Design Pillars
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-xl text-alabaster/50"
          >
            Blending traditional luxury with modern computation.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Computational Layouts",
              desc: "Optimal space utilization generated through thousands of algorithmic iterations.",
              icon: <Layers size={32} className="text-gold" />
            },
            {
              title: "Material Science",
              desc: "AI-curated textures and sustainable materials that resonate with your personal style.",
              icon: <Zap size={32} className="text-gold" />
            },
            {
              title: "Bespoke Finishing",
              desc: "The final human touch by master architects to ensure perfection in every corner.",
              icon: <ShieldCheck size={32} className="text-gold" />
            }
          ].map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="glass group p-12 rounded-[50px] border border-white/5 hover:bg-white/10 hover:border-gold/20 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-gold/5 rounded-2xl flex items-center justify-center mb-10 border border-white/5 group-hover:border-gold/40 transition-all group-hover:rotate-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black mb-5 group-hover:text-gold transition-colors">{feature.title}</h3>
              <p className="text-alabaster/50 leading-relaxed group-hover:text-alabaster transition-colors italic">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto glass p-20 rounded-[60px] border border-gold/10 text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px] group-hover:scale-110 transition-transform"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter">Ready to Elevate Your Home?</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-gradient-gold text-onyx font-black text-xl rounded-2xl shadow-2xl shadow-gold/20 hover:shadow-gold/40 transition-all"
          >
            BOOK A PRIVATE CONSULTATION
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-8 bg-onyx-light/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
                <span className="text-onyx font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-gradient-gold uppercase">Elevation</span>
            </div>
            <p className="text-alabaster/40 max-w-sm leading-relaxed mb-8">
              The future of luxury living, defined by artificial intelligence and crafted by world-class architects.
            </p>
            <div className="flex gap-6">
              {[
                { name: 'instagram', icon: <Instagram size={18} /> },
                { name: 'twitter', icon: <Twitter size={18} /> },
                { name: 'linkedin', icon: <Linkedin size={18} /> }
              ].map((social) => (
                <motion.div 
                  key={social.name} 
                  whileHover={{ y: -5, color: '#D4AF37' }}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center border border-white/10 cursor-pointer transition-all text-alabaster/40"
                >
                  {social.icon}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-gold">Explore</h4>
            <ul className="space-y-4 text-alabaster/40 font-medium">
              <li><Link href="#" className="hover:text-gold transition-colors">Portfolio</Link></li>
              <li><Link href="#design-lab" className="hover:text-gold transition-colors">AI Designer</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-gold">Legal</h4>
            <ul className="space-y-4 text-alabaster/40 font-medium">
              <li><Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 pt-12 border-t border-white/5">
          <p className="text-[10px] text-alabaster/30 uppercase tracking-[0.4em] font-black">
            © 2026 ELEVATION HOME DESIGN · ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-12 text-[10px] text-alabaster/40 font-black tracking-widest uppercase">
            <span className="flex items-center gap-2"><MapPin size={10} /> New York</span>
            <span>Dubai</span>
            <span>London</span>
            <span>Tokyo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
