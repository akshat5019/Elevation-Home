"use client";

import { useState, useRef } from "react";
import Link from "next/link";

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
    
    try {
      const response = await fetch("/api/design", {
        method: "POST",
        body: JSON.stringify({ image: selectedImage }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to analyze image");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          // Vercel AI SDK data stream prefix check (usually '0:"text"')
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith('0:')) {
              const content = line.substring(3).replace(/^"|"$/g, '').replace(/\\n/g, '\n');
              fullText += content;
              setDesignResult(fullText);
            }
          }
        }
      }
    } catch (error) {
      console.error("AI Analysis Error:", error);
      setDesignResult("Error: Could not analyze image. Please ensure your API key is set.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-onyx text-alabaster overflow-hidden selection:bg-gold selection:text-onyx">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-[150px]"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-8 py-6 flex justify-between items-center transition-all duration-500">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center shadow-lg shadow-gold/20 group-hover:rotate-12 transition-transform">
            <span className="text-onyx font-bold text-2xl">E</span>
          </div>
          <span className="text-2xl font-bold tracking-tighter text-gradient-gold">ELEVATION</span>
        </div>

        <div className="hidden md:flex gap-1 gap-x-8 text-xs font-bold tracking-widest uppercase opacity-80">
          <Link href="#design-lab" className="hover:text-gold transition-colors relative group">
            AI Design Lab
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
          </Link>
          <Link href="#" className="hover:text-gold transition-colors">Portfolio</Link>
          <Link href="#" className="hover:text-gold transition-colors">Philosophy</Link>
          <Link href="#" className="hover:text-gold transition-colors">About</Link>
        </div>

        <button className="px-6 py-2.5 bg-gradient-gold text-onyx font-bold rounded-full text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gold/10">
          GET IN TOUCH
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-h-screen">
        <div className="inline-block px-4 py-1.5 glass rounded-full border border-gold/20 mb-8 transform hover:scale-105 transition-transform cursor-default">
          <span className="text-xs font-bold tracking-[0.2em] text-gold uppercase">Industry Leading AI Interior Design</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
          Reimagine Your <br />
          <span className="text-gradient-gold italic font-display">Living Space</span>
        </h1>

        <p className="max-w-2xl text-lg text-alabaster/60 leading-relaxed mb-12 animate-in fade-in duration-1000 delay-200">
          We combine the precision of Artificial Intelligence with the soul of bespoke architecture to transform your envisions into luxurious reality.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mb-20">
          <Link href="#design-lab" className="px-10 py-5 bg-gradient-gold text-onyx font-black text-lg rounded-2xl shadow-2xl shadow-gold/30 hover:shadow-gold/50 hover:-translate-y-1 transition-all flex items-center gap-3 group">
            TRY AI DESIGNER
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>

          <button className="px-10 py-5 glass rounded-2xl border border-white/10 font-bold text-lg hover:bg-white/10 hover:-translate-y-1 transition-all">
            VIEW WORKS
          </button>
        </div>

        {/* Floating Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-auto py-12">
          {[
            { val: "15k+", label: "Gen Designs" },
            { val: "99%", label: "Accuracy" },
            { val: "24/7", label: "Consultation" },
            { val: "Instant", label: "Results" }
          ].map((stat, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-white/5 group hover:border-gold/30 transition-all animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
              <h3 className="text-3xl font-bold text-gradient-gold mb-1">{stat.val}</h3>
              <p className="text-xs uppercase tracking-widest text-alabaster/40 font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI DESIGN LAB SECTION */}
      <section id="design-lab" className="py-32 px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="glass p-1 md:p-12 rounded-[50px] border border-white/5 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 items-center p-8 md:p-0">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Experience the <span className="text-gradient-gold font-display">AI Design Lab</span>
              </h2>
              <p className="text-alabaster/60 text-lg mb-8 leading-relaxed">
                Upload a photo of your current space and let our proprietary AI engine redesign it with luxury aesthetics in seconds.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Intelligent lighting optimization",
                  "Material & texture recommendation",
                  "Architectural layout analysis",
                  "Bespoke furniture selection"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-alabaster/80 font-medium">
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    {item}
                  </li>
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
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full md:w-auto px-10 py-5 glass-gold border border-gold/30 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gold/10 transition-all group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  UPLOAD YOUR ROOM IMAGE
                </button>
              ) : (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={startAnalysis}
                    disabled={isAnalyzing}
                    className="w-full md:w-auto px-10 py-5 bg-gradient-gold text-onyx font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-3 border-onyx/30 border-t-onyx rounded-full animate-spin"></div>
                        AI ANALYZING SPACE...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        GENERATE LUXURY REDESIGN
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-sm font-bold text-alabaster/40 hover:text-sosRed transition-colors uppercase tracking-widest"
                  >
                    Remove and try another
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              {/* Image Preview Window */}
              <div className="relative aspect-[4/3] glass rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                {selectedImage ? (
                  <>
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className={`w-full h-full object-cover transition-all duration-1000 ${isAnalyzing ? 'blur-md scale-110 opacity-50' : 'blur-0 scale-100 opacity-100'}`}
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gold shadow-[0_0_20px_#D4AF37] animate-[scan_2s_ease-in-out_infinite]"></div>
                          <style jsx>{`
                            @keyframes scan {
                              0% { top: 0%; }
                              50% { top: 100%; }
                              100% { top: 0%; }
                            }
                          `}</style>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-alabaster/20 p-12 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="mb-6"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    <p className="text-xl font-medium tracking-tight">Your AI preview will appear here</p>
                  </div>
                )}
              </div>

              {/* Design Results Overlay */}
              {designResult && (
                <div className="absolute -bottom-10 -right-4 md:-right-10 w-full max-w-sm glass-gold border border-gold/40 p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-healthGood rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-gold uppercase tracking-[0.2em]">AI Design Report</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4">Recommended Aesthetic</h4>
                  <div
                    className="text-alabaster/80 text-sm leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: designResult.replace(/\*\*(.*?)\*\*/g, '<b class="text-gold">$1</b>') }}
                  />
                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 py-2 rounded-xl bg-gold/10 border border-gold/20 text-gold text-xs font-bold hover:bg-gold/20 transition-all uppercase tracking-wider">Download PDF</button>
                    <button className="px-4 py-2 rounded-xl glass border border-white/10 text-xs font-bold hover:bg-white/10 transition-all uppercase">Share</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-28 text-center">
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-6">
            <div className="w-2 h-2 bg-gold rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Our Design Pillars</h2>
          <p className="max-w-xl text-alabaster/50">Blending traditional luxury with modern computation.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Computational Layouts",
              desc: "Optimal space utilization generated through thousands of algorithmic iterations.",
              icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            },
            {
              title: "Material Science",
              desc: "AI-curated textures and sustainable materials that resonate with your personal style.",
              icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            },
            {
              title: "Bespoke Finishing",
              desc: "The final human touch by master architects to ensure perfection in every corner.",
              icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            }
          ].map((feature, i) => (
            <div key={i} className="glass group p-12 rounded-[50px] border border-white/5 hover:bg-white/10 hover:border-gold/20 transition-all duration-500">
              <div className="w-16 h-16 bg-gold/5 rounded-2xl flex items-center justify-center mb-10 border border-white/5 group-hover:border-gold/40 transition-all group-hover:rotate-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={feature.icon}></path></svg>
              </div>
              <h3 className="text-2xl font-bold mb-5 group-hover:text-gold transition-colors">{feature.title}</h3>
              <p className="text-alabaster/50 leading-relaxed group-hover:text-alabaster transition-colors italic">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto glass p-20 rounded-[60px] border border-gold/10 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px] group-hover:scale-110 transition-transform"></div>
          <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tighter">Ready to Elevate Your Home?</h2>
          <button className="px-12 py-6 bg-gradient-gold text-onyx font-black text-xl rounded-2xl shadow-2xl shadow-gold/20 hover:shadow-gold/40 hover:scale-105 active:scale-95 transition-all">
            BOOK A PRIVATE CONSULTATION
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-8 bg-onyx-light/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
                <span className="text-onyx font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold tracking-tighter text-gradient-gold">ELEVATION</span>
            </div>
            <p className="text-alabaster/40 max-w-sm leading-relaxed mb-8">
              The future of luxury living, defined by artificial intelligence and crafted by world-class architects.
            </p>
            <div className="flex gap-6">
              {['instagram', 'twitter', 'linkedin'].map((social) => (
                <div key={social} className="w-10 h-10 glass rounded-xl flex items-center justify-center border border-white/10 hover:border-gold/30 cursor-pointer transition-all">
                  <div className="w-2 h-2 bg-alabaster/40 rounded-full group-hover:bg-gold"></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-gold">Explore</h4>
            <ul className="space-y-4 text-alabaster/40 font-medium">
              <li><Link href="#" className="hover:text-alabaster transition-colors">Portfolio</Link></li>
              <li><Link href="#" className="hover:text-alabaster transition-colors">AI Designer</Link></li>
              <li><Link href="#" className="hover:text-alabaster transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-gold">Legal</h4>
            <ul className="space-y-4 text-alabaster/40 font-medium">
              <li><Link href="#" className="hover:text-alabaster transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-alabaster transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 pt-12 border-t border-white/5">
          <p className="text-[10px] text-alabaster/30 uppercase tracking-[0.4em] font-black">
            © 2026 ELEVATION HOME DESIGN · ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-12 text-[10px] text-alabaster/40 font-black tracking-widest uppercase">
            <span>New York</span>
            <span>Dubai</span>
            <span>London</span>
            <span>Tokyo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
