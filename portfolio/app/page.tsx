'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Mail, CircleCheck } from 'lucide-react';

export default function Portfolio() {
  const [activePage, setActivePage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut"as const, staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.35, ease: "easeInOut" as const } }
  };

  const heroItemVariants = {
    initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: "easeOut" as const } }
  };

  const scrollContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.09 } }
  };

  const scrollItemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" as const } }
  };

  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.3 } }
  };

  const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const
    }
  }
};

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 h-[5.5rem] flex items-center bg-bg-main/85 backdrop-blur-md transition-all duration-500 ${scrolled ? 'border-b border-border-color shadow-sm' : 'border-b border-transparent'}`}>
        <div className="container mx-auto px-6 md:px-16 flex items-center justify-between w-full">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-text-main rounded-lg flex items-center justify-center font-serif italic font-semibold text-xl text-bg-main transition-all duration-500 group-hover:bg-accent group-hover:text-white group-hover:-rotate-6">
              S
            </div>
            <span className="font-sans text-lg font-semibold text-text-main">Shafira.</span>
          </div>
          <div className="hidden md:flex gap-10">
            <motion.div
              className="flex gap-10"
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
            >
            {['home', 'writing', 'projects', 'about', 'cv', 'contact'].map((page) => (
              <motion.span
                key={page}
                variants={navItemVariants}
                onClick={() => navigateTo(page)}
                className={`nav-link font-sans text-base relative cursor-pointer transition-colors duration-500 capitalize ${activePage === page ? 'text-accent font-semibold active' : 'text-text-muted hover:text-accent font-medium'}`}
              >
                {page}
              </motion.span>
            ))}
            </motion.div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow pt-[5.5rem]">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-content">
              {/* HERO */}
              <section className="min-h-[70vh] flex items-center py-16 md:py-24 relative">
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-border-color origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.5 }}
                />
                <div className="container mx-auto px-6 md:px-16">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
                    <motion.div
                      className="flex flex-col gap-6"
                      variants={{ animate: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
                    >
                      <motion.span variants={heroItemVariants} className="text-sm font-semibold tracking-wider uppercase text-accent">Researcher & Translator</motion.span>
                      <motion.h1 variants={heroItemVariants} className="text-5xl md:text-6xl leading-[1.1] text-text-main font-serif font-semibold">
                        Shafira <br/><em className="italic text-accent font-medium">Kemala Putri.</em>
                      </motion.h1>
                      <motion.p variants={heroItemVariants} className="font-serif italic text-2xl md:text-3xl text-text-main max-w-[40ch] leading-snug">
                        Bridging the gap between complex linguistic theory and practical, real-world translation.
                      </motion.p>
                      <motion.p variants={heroItemVariants} className="text-lg leading-[1.7] text-text-muted max-w-[65ch]">
                        Linguistic researcher and translation specialist focused on cross-cultural communication and French–Indonesian language mechanics. Based at Universitas Negeri Yogyakarta, engaging with a global francophone community.
                      </motion.p>
                      <motion.div variants={heroItemVariants} className="flex items-center gap-6 mt-4">
                        <button onClick={() => navigateTo('projects')} className="btn-premium inline-flex items-center gap-3 font-sans text-sm font-medium px-8 py-4 rounded-full bg-accent text-white hover:bg-accent-hover shadow-md">
                          View Portfolio
                        </button>
                        <span onClick={() => navigateTo('about')} className="link-arrow cursor-pointer font-semibold text-text-main hover:text-accent flex items-center gap-2">
                          Read Bio <ArrowRight className="w-4 h-4" />
                        </span>
                      </motion.div>
                    </motion.div>
                    <motion.div variants={heroItemVariants} className="hidden lg:block">
                      <div className="hero-card-glow bg-bg-card border border-border-color rounded-[24px] p-10 shadow-sm">
                        <p className="font-serif italic text-2xl leading-relaxed text-text-main mb-8 border-l-4 border-accent pl-6">
                          The architecture of digital interfaces as a medium for cultural preservation — and the language that makes it possible.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <span className="text-sm font-medium text-text-light block mb-1">Status</span>
                            <span className="font-sans text-base font-medium text-text-main flex items-center gap-2">
                              <span className="status-dot"></span>Open to projects
                            </span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-text-light block mb-1">Location</span>
                            <span className="font-sans text-base font-medium text-text-main">Yogyakarta, ID</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-text-light block mb-1">Focus</span>
                            <span className="font-sans text-base font-medium text-text-main">Digital humanities</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-text-light block mb-1">Languages</span>
                            <span className="font-sans text-base font-medium text-text-main">5 spoken</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* FEATURED WRITING */}
              <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 md:px-16">
                  <motion.div variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <motion.div variants={scrollItemVariants}>
                      <span className="text-sm font-semibold tracking-wider uppercase text-accent">Latest Work</span>
                      <h2 className="text-4xl md:text-5xl font-serif font-semibold mt-2 text-text-main">Writing & <em className="italic font-medium text-accent">Research.</em></h2>
                    </motion.div>
                    <motion.span variants={scrollItemVariants} onClick={() => navigateTo('writing')} className="link-arrow cursor-pointer font-semibold text-text-main hover:text-accent flex items-center gap-2">
                      View Full Archive <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </motion.div>
                  <motion.div variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={scrollItemVariants} className="editorial-card" onClick={() => window.open('https://medium.com/@faitsartre/the-living-danger-of-book-b511e4ab1bf5', '_blank')}>
                      <div className="flex justify-between items-start mb-6 pb-6 animated-divider">
                        <div className="flex gap-2 flex-wrap">
                          <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full bg-accent-light text-accent border border-transparent">Essay</span>
                          <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full bg-accent-light text-accent border border-transparent">Literature</span>
                        </div>
                        <span className="text-sm font-medium text-text-light">Medium</span>
                      </div>
                      <h3 className="card-title font-serif text-2xl font-semibold text-text-main mb-4">The Living Danger of Book</h3>
                      <p className="flex-grow text-text-muted leading-relaxed mb-8">A personal essay on the peculiar intimacy between reader and book — and what it means to find in a beat-up paperback the kind of companion that never bails on you.</p>
                      <span className="link-arrow font-semibold text-text-main flex items-center gap-2 mt-auto">Read Article <ArrowRight className="w-4 h-4" /></span>
                    </motion.div>
                    <motion.div variants={scrollItemVariants} className="editorial-card" onClick={() => window.open('https://www.researchgate.net/publication/397323540_A_Formal_Semiotic_Analysis_of_Floriography_as_a_Constrained_Cipher', '_blank')}>
                      <div className="flex justify-between items-start mb-6 pb-6 animated-divider">
                        <div className="flex gap-2 flex-wrap">
                          <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full bg-accent-light text-accent border border-transparent">Semiotics</span>
                          <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full bg-accent-light text-accent border border-transparent">Cipher Studies</span>
                        </div>
                        <span className="text-sm font-medium text-text-light">ResearchGate</span>
                      </div>
                      <h3 className="card-title font-serif text-2xl font-semibold text-text-main mb-4">A Formal Semiotic Analysis of Floriography as a Constrained Cipher</h3>
                      <p className="flex-grow text-text-muted leading-relaxed mb-8">Examining the Victorian language of flowers as a semiotic cipher — a sign-system in which rules of substitution are socially enforced rather than cryptographically imposed.</p>
                      <span className="link-arrow font-semibold text-text-main flex items-center gap-2 mt-auto">Read Paper <ArrowRight className="w-4 h-4" /></span>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              {/* FEATURED PROJECTS */}
              <section className="py-16 md:py-24 bg-bg-alt">
                <div className="container mx-auto px-6 md:px-16">
                  <motion.div variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <motion.div variants={scrollItemVariants}>
                      <span className="text-sm font-semibold tracking-wider uppercase text-accent">Technical Portfolio</span>
                      <h2 className="text-4xl md:text-5xl font-serif font-semibold mt-2 text-text-main">Selected <em className="italic font-medium text-accent">Projects.</em></h2>
                    </motion.div>
                    <motion.span variants={scrollItemVariants} onClick={() => navigateTo('projects')} className="link-arrow cursor-pointer font-semibold text-text-main hover:text-accent flex items-center gap-2">
                      Explore All Work <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </motion.div>
                  <motion.div variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div variants={scrollItemVariants} className="editorial-card">
                      <div className="mb-4">
                        <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-accent/30 bg-accent-light text-accent">Beta</span>
                      </div>
                      <h3 className="card-title font-serif text-2xl font-semibold text-text-main mb-4">Le Petit Musée FLE</h3>
                      <p className="flex-grow text-text-muted leading-relaxed mb-6">An interactive French-as-a-foreign-language learning environment — exploring vocabulary, grammar, and culture through themed &quot;museum rooms&quot;.</p>
                      <div className="flex gap-2 flex-wrap mb-6">
                        <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">React</span>
                        <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">Vite</span>
                      </div>
                      <span className="link-arrow font-semibold text-text-main flex items-center gap-2 mt-auto">View Project <ArrowRight className="w-4 h-4" /></span>
                    </motion.div>
                    <motion.div variants={scrollItemVariants} className="editorial-card">
                      <div className="mb-4">
                        <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-accent/30 bg-accent-light text-accent">Ongoing</span>
                      </div>
                      <h3 className="card-title font-serif text-2xl font-semibold text-text-main mb-4">The Polyglot Bookclub</h3>
                      <p className="flex-grow text-text-muted leading-relaxed mb-6">A platform for a multilingual book club centered on global literature — curated collections by cultural tradition and community events.</p>
                      <div className="flex gap-2 flex-wrap mb-6">
                        <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">HTML/CSS</span>
                        <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">JavaScript</span>
                      </div>
                      <span className="link-arrow font-semibold text-text-main flex items-center gap-2 mt-auto">View Project <ArrowRight className="w-4 h-4" /></span>
                    </motion.div>
                    <motion.div variants={scrollItemVariants} className="cta-card border-2 border-dashed border-border-color bg-bg-main rounded-[20px] p-10 flex flex-col items-center justify-center text-center gap-6 transition-all duration-500 hover:border-accent hover:bg-bg-card hover:-translate-y-1">
                      <h3 className="font-serif text-2xl font-semibold text-text-main">Interested in a collaboration?</h3>
                      <p className="text-text-muted">Currently open to new research and development projects.</p>
                      <button className="btn-premium inline-flex items-center gap-3 font-sans text-sm font-medium px-8 py-4 rounded-full border border-border-color bg-bg-card text-text-main hover:bg-bg-main hover:border-text-main transition-all" onClick={() => navigateTo('contact')}>Get in Touch</button>
                    </motion.div>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          )}

          {activePage === 'writing' && (
            <motion.div key="writing" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-content">
              <div className="container mx-auto px-6 md:px-16 py-16 md:py-24">
                <motion.header variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="pb-10 md:pb-16 mb-10 md:mb-16 relative">
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-border-color origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.2 }}
                  />
                  <motion.span variants={scrollItemVariants} className="text-sm font-semibold tracking-wider uppercase text-accent">Archive</motion.span>
                  <motion.h1 variants={scrollItemVariants} className="text-5xl md:text-6xl font-serif font-semibold mt-2 mb-6 text-text-main">Writing & Research.</motion.h1>
                  <motion.p variants={scrollItemVariants} className="font-serif italic text-2xl text-text-main/90 max-w-[50ch] leading-snug">Essays on food, place, and the life of books — alongside academic papers on semiotics, Creole linguistics, and the politics of literary aesthetics.</motion.p>
                </motion.header>
                
                <motion.div variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="mb-24">
                  <motion.div variants={scrollItemVariants} className="mb-12">
                    <h2 className="text-4xl font-serif font-semibold text-text-main">Personal Essays.</h2>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={scrollItemVariants} className="editorial-card" onClick={() => window.open('https://www.kompasiana.com/fira3834/692ad540c925c448b520cd43/paradoks-kelimpahan-singkong-dan-upaya-disrupsi-pangan-lokal-di-wonogiri', '_blank')}>
                      <div className="flex justify-between items-start mb-6 pb-6 animated-divider">
                        <div className="flex gap-2 flex-wrap"><span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full bg-accent-light text-accent border border-transparent">Pangan</span><span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full bg-accent-light text-accent border border-transparent">Politik Lokal</span></div>
                        <span className="text-sm font-medium text-text-light">Kompasiana</span>
                      </div>
                      <h3 className="card-title font-serif text-2xl font-semibold text-text-main mb-4">Paradoks Kelimpahan Singkong dan Upaya Disrupsi Pangan Lokal di Wonogiri</h3>
                      <p className="flex-grow text-text-muted leading-relaxed mb-8">Wonogiri menghasilkan singkong dalam jumlah besar, namun petani lokal justru tersisih oleh rantai distribusi yang tidak berpihak. Sebuah tinjauan tentang paradoks kelimpahan.</p>
                      <span className="link-arrow font-semibold text-text-main flex items-center gap-2 mt-auto">Baca di Kompasiana <ExternalLink className="w-4 h-4" /></span>
                    </motion.div>
                    <motion.div variants={scrollItemVariants} className="editorial-card" onClick={() => window.open('https://medium.com/@faitsartre/the-living-danger-of-book-b511e4ab1bf5', '_blank')}>
                      <div className="flex justify-between items-start mb-6 pb-6 animated-divider">
                        <div className="flex gap-2 flex-wrap"><span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full bg-accent-light text-accent border border-transparent">Essay</span><span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full bg-accent-light text-accent border border-transparent">Literature</span></div>
                        <span className="text-sm font-medium text-text-light">Medium</span>
                      </div>
                      <h3 className="card-title font-serif text-2xl font-semibold text-text-main mb-4">The Living Danger of Book</h3>
                      <p className="flex-grow text-text-muted leading-relaxed mb-8">A personal essay on the peculiar intimacy between reader and book — how a beat-up paperback from a dusty used bookstore becomes the kind of companion that doesn&apos;t bail on you.</p>
                      <span className="link-arrow font-semibold text-text-main flex items-center gap-2 mt-auto">Read on Medium <ExternalLink className="w-4 h-4" /></span>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
                  <motion.div variants={scrollItemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <h2 className="text-4xl font-serif font-semibold text-text-main">Academic Research.</h2>
                    <a href="https://www.researchgate.net/profile/Shafira-Putri" target="_blank" rel="noreferrer" className="link-arrow font-semibold text-text-main hover:text-accent flex items-center gap-2">
                      View on ResearchGate <ExternalLink className="w-4 h-4" />
                    </a>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={scrollItemVariants} className="editorial-card" onClick={() => window.open('https://www.researchgate.net/publication/397323540_A_Formal_Semiotic_Analysis_of_Floriography_as_a_Constrained_Cipher', '_blank')}>
                      <div className="flex justify-between items-start mb-6 pb-6 animated-divider">
                        <div className="flex gap-2 flex-wrap"><span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full bg-accent-light text-accent border border-transparent">Semiotics</span><span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full bg-accent-light text-accent border border-transparent">Cipher Studies</span></div>
                        <span className="text-sm font-medium text-text-light">ResearchGate</span>
                      </div>
                      <h3 className="card-title font-serif text-2xl font-semibold text-text-main mb-4">A Formal Semiotic Analysis of Floriography as a Constrained Cipher</h3>
                      <p className="flex-grow text-text-muted leading-relaxed mb-8">An examination of Victorian floriography — the language of flowers — through formal semiotics, arguing that its encoded meanings constitute a constrained cipher.</p>
                      <span className="link-arrow font-semibold text-text-main flex items-center gap-2 mt-auto">Read Paper <ExternalLink className="w-4 h-4" /></span>
                    </motion.div>
                    <motion.div variants={scrollItemVariants} className="editorial-card" onClick={() => window.open('https://www.researchgate.net/publication/393901731', '_blank')}>
                      <div className="flex justify-between items-start mb-6 pb-6 animated-divider">
                        <div className="flex gap-2 flex-wrap"><span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full bg-accent-light text-accent border border-transparent">Anthropolinguistics</span><span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full bg-accent-light text-accent border border-transparent">Creole</span></div>
                        <span className="text-sm font-medium text-text-light">ResearchGate</span>
                      </div>
                      <h3 className="card-title font-serif text-2xl font-semibold text-text-main mb-4">Anthropolinguistic Traces in Ti-Jean l&apos;Espiègle</h3>
                      <p className="flex-grow text-text-muted leading-relaxed mb-8">A close reading of the Martinican folk narrative through an anthropolinguistic frame — tracing how phonetic patterns encode cultural memory.</p>
                      <span className="link-arrow font-semibold text-text-main flex items-center gap-2 mt-auto">Read Paper <ExternalLink className="w-4 h-4" /></span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activePage === 'projects' && (
            <motion.div key="projects" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-content">
              <div className="container mx-auto px-6 md:px-16 py-16 md:py-24">
                <motion.header variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="pb-10 md:pb-16 mb-10 md:mb-16 relative">
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-border-color origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.2 }}
                  />
                  <motion.span variants={scrollItemVariants} className="text-sm font-semibold tracking-wider uppercase text-accent">Technical Work</motion.span>
                  <motion.h1 variants={scrollItemVariants} className="text-5xl md:text-6xl font-serif font-semibold mt-2 mb-6 text-text-main">Projects.</motion.h1>
                  <motion.p variants={scrollItemVariants} className="font-serif italic text-2xl text-text-main/90 max-w-[50ch] leading-snug">Digital tools for language learning, cultural preservation, and multilingual communities — built at the intersection of linguistics and code.</motion.p>
                </motion.header>
                <motion.div variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={scrollItemVariants} className="editorial-card">
                    <div className="mb-4">
                      <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-accent/30 bg-accent-light text-accent">Beta</span>
                    </div>
                    <h3 className="card-title font-serif text-2xl font-semibold text-text-main mb-4">Le Petit Musée FLE</h3>
                    <p className="flex-grow text-text-muted leading-relaxed mb-6">An interactive French-as-a-foreign-language learning environment — exploring vocabulary, grammar, and culture through themed &quot;museum rooms&quot; rather than conventional drills.</p>
                    <div className="flex gap-2 flex-wrap mb-6">
                      <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">React</span>
                      <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">Vite</span>
                      <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">Tailwind</span>
                    </div>
                    <span className="link-arrow font-semibold text-text-main flex items-center gap-2 mt-auto">View Project <ArrowRight className="w-4 h-4" /></span>
                  </motion.div>
                  <motion.div variants={scrollItemVariants} className="editorial-card">
                    <div className="mb-4">
                      <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-accent/30 bg-accent-light text-accent">Ongoing</span>
                    </div>
                    <h3 className="card-title font-serif text-2xl font-semibold text-text-main mb-4">The Polyglot Bookclub</h3>
                    <p className="flex-grow text-text-muted leading-relaxed mb-6">A platform for a multilingual book club centered on global literature — curated collections by cultural tradition, monthly featured titles, and community discussion spaces.</p>
                    <div className="flex gap-2 flex-wrap mb-6">
                      <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">HTML/CSS</span>
                      <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">JavaScript</span>
                      <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">Node.js</span>
                    </div>
                    <span className="link-arrow font-semibold text-text-main flex items-center gap-2 mt-auto">View Project <ArrowRight className="w-4 h-4" /></span>
                  </motion.div>
                  <motion.div variants={scrollItemVariants} className="editorial-card">
                    <div className="mb-4">
                      <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">Completed</span>
                    </div>
                    <h3 className="card-title font-serif text-2xl font-semibold text-text-main mb-4">Glossaire Créole</h3>
                    <p className="flex-grow text-text-muted leading-relaxed mb-6">A digital lexicon of Martinican Creole, built alongside academic research into anthropolinguistic patterns. Designed as a living reference.</p>
                    <div className="flex gap-2 flex-wrap mb-6">
                      <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">PostgreSQL</span>
                      <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">Python</span>
                      <span className="tag-premium font-sans text-xs font-medium px-3 py-1 rounded-full border border-border-color bg-bg-main text-text-muted">TypeScript</span>
                    </div>
                    <span className="link-arrow font-semibold text-text-main flex items-center gap-2 mt-auto">View Project <ArrowRight className="w-4 h-4" /></span>
                  </motion.div>
                  <motion.div variants={scrollItemVariants} className="cta-card border-2 border-dashed border-border-color bg-bg-main rounded-[20px] p-10 flex flex-col items-center justify-center text-center gap-6 transition-all duration-500 hover:border-accent hover:bg-bg-card hover:-translate-y-1">
                    <h3 className="font-serif text-2xl font-semibold text-text-main">Have a project in mind?</h3>
                    <p className="text-text-muted">I&apos;m open to research collaborations, translations, and web development work.</p>
                    <button className="btn-premium inline-flex items-center gap-3 font-sans text-sm font-medium px-8 py-4 rounded-full border border-border-color bg-bg-card text-text-main hover:bg-bg-main hover:border-text-main transition-all" onClick={() => navigateTo('contact')}>Start a Conversation</button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activePage === 'about' && (
            <motion.div key="about" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-content">
              <div className="container mx-auto px-6 md:px-16 py-16 md:py-24">
                <motion.header variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="pb-10 md:pb-16 mb-10 md:mb-16 relative">
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-border-color origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.2 }}
                  />
                  <motion.span variants={scrollItemVariants} className="text-sm font-semibold tracking-wider uppercase text-accent">Profile</motion.span>
                  <motion.h1 variants={scrollItemVariants} className="text-5xl md:text-6xl font-serif font-semibold mt-2 mb-6 text-text-main">About.</motion.h1>
                  <motion.p variants={scrollItemVariants} className="font-serif italic text-2xl text-text-main/90 max-w-[50ch] leading-snug">Researcher, translator, and builder working at the intersection of language, culture, and technology.</motion.p>
                </motion.header>
                <motion.div variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 items-start">
                  <div className="flex flex-col gap-6 text-lg leading-[1.7] text-text-muted max-w-[65ch]">
                    <motion.p variants={scrollItemVariants}>I am a student of French Language Education at Universitas Negeri Yogyakarta, where my research focuses on the intersections of semiotics, translation theory, and digital communication. My academic work explores how language systems encode — and sometimes conceal — cultural knowledge.</motion.p>
                    <motion.p variants={scrollItemVariants}>Alongside my linguistic research, I build digital tools for language learning and multilingual communities. I believe that the most interesting problems in web development aren&apos;t technical — they&apos;re about how to design interfaces that can hold cultural complexity without flattening it.</motion.p>
                    <motion.div variants={scrollItemVariants} className="accent-note p-8 bg-accent-light rounded-2xl border-l-4 border-accent my-8">
                      <span className="font-sans text-sm font-semibold uppercase tracking-wider text-accent block mb-3">On Practice</span>
                      <p className="font-serif italic text-2xl text-text-main m-0 leading-relaxed">&quot;I am drawn to languages precisely because they resist complete translation — the untranslatable residue is often where the most interesting thinking happens.&quot;</p>
                    </motion.div>
                    <motion.p variants={scrollItemVariants}>I write essays on food, place, and the life of books — published on Medium and Kompasiana. My research papers are available on ResearchGate. I speak Indonesian, French, English, Javanese, and Arabic.</motion.p>
                  </div>
                  <motion.div variants={scrollItemVariants} className="flex flex-col gap-6">
                    <div className="sidebar-card bg-bg-card border border-border-color rounded-2xl p-8 shadow-sm">
                      <h3 className="font-serif text-xl font-semibold mb-6 text-text-main">Quick Facts</h3>
                      <div className="flex flex-col gap-4">
                        <div>
                          <span className="text-sm font-medium text-text-light block mb-1">Based in</span>
                          <span className="font-sans text-base font-medium text-text-main">Yogyakarta, Indonesia</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-text-light block mb-1">Languages</span>
                          <span className="font-sans text-base font-medium text-text-main">Indonesian, French, English, Javanese, Arabic</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-text-light block mb-1">Focus</span>
                          <span className="font-sans text-base font-medium text-text-main">Semiotics, Creole linguistics</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activePage === 'cv' && (
            <motion.div key="cv" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-content">
              <div className="container mx-auto px-6 md:px-16 py-16 md:py-24">
                <motion.header variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="pb-10 md:pb-16 mb-10 md:mb-16 relative">
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-border-color origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.2 }}
                  />
                  <motion.span variants={scrollItemVariants} className="text-sm font-semibold tracking-wider uppercase text-accent">Curriculum Vitæ</motion.span>
                  <motion.h1 variants={scrollItemVariants} className="text-5xl md:text-6xl font-serif font-semibold mt-2 mb-6 text-text-main">Experience.</motion.h1>
                  <motion.p variants={scrollItemVariants} className="font-serif italic text-2xl text-text-main/90 max-w-[50ch] leading-snug">A record of research, teaching, and professional translation — across three languages and two disciplines.</motion.p>
                </motion.header>
                <motion.div variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
                  <div className="flex flex-col gap-16">
                    <motion.div variants={scrollItemVariants}>
                      <h2 className="text-3xl font-serif font-semibold mb-8 text-text-main">Professional Experience</h2>
                      <div>
                        <div className="tl-item">
                          <h3 className="text-xl font-serif font-semibold mb-1 text-text-main">Freelance Translator & Researcher</h3>
                          <span className="font-sans text-sm font-semibold text-accent block mb-1">Independent Practice</span>
                          <span className="font-serif italic text-text-light block mb-4">2020 — Present</span>
                          <p className="text-text-muted leading-relaxed">French–Indonesian and English–Indonesian translation for academic institutions, cultural organizations, and digital platforms. Specialist in literary and technical translation.</p>
                        </div>
                        <div className="tl-item">
                          <h3 className="text-xl font-serif font-semibold mb-1 text-text-main">Teaching Assistant — French Language</h3>
                          <span className="font-sans text-sm font-semibold text-accent block mb-1">Universitas Negeri Yogyakarta</span>
                          <span className="font-serif italic text-text-light block mb-4">2022 — Present</span>
                          <p className="text-text-muted leading-relaxed">Supporting undergraduate French language instruction, with a focus on phonetics, written expression, and cultural competency development.</p>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div variants={scrollItemVariants}>
                      <h2 className="text-3xl font-serif font-semibold mb-8 text-text-main">Education</h2>
                      <div>
                        <div className="tl-item">
                          <h3 className="text-xl font-serif font-semibold mb-1 text-text-main">S1 Pendidikan Bahasa Prancis</h3>
                          <span className="font-sans text-sm font-semibold text-accent block mb-1">Universitas Negeri Yogyakarta</span>
                          <span className="font-serif italic text-text-light block">2021 — Present</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <motion.div variants={scrollItemVariants}>
                    <div className="sidebar-card bg-bg-card border border-border-color rounded-2xl p-8 shadow-sm sticky top-32">
                      <h3 className="font-serif text-xl font-semibold mb-6 text-text-main">Expertise</h3>
                      <div className="mb-8">
                        <span className="text-sm font-medium text-text-light block mb-3">Languages</span>
                        <div className="flex gap-2 flex-wrap">
                          <span className="tag-premium">Indonesian</span>
                          <span className="tag-premium">French</span>
                          <span className="tag-premium">English</span>
                          <span className="tag-premium">Javanese</span>
                          <span className="tag-premium">Arabic</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-text-light block mb-3">Technical</span>
                        <div className="flex gap-2 flex-wrap">
                          <span className="tag-premium">React</span>
                          <span className="tag-premium">TypeScript</span>
                          <span className="tag-premium">Python</span>
                          <span className="tag-premium">Node.js</span>
                          <span className="tag-premium">PostgreSQL</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activePage === 'contact' && (
            <motion.div key="contact" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-content">
              <div className="container mx-auto px-6 md:px-16 py-16 md:py-24">
                <motion.header variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="pb-10 md:pb-16 mb-10 md:mb-16 relative">
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-border-color origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.2 }}
                  />
                  <motion.span variants={scrollItemVariants} className="text-sm font-semibold tracking-wider uppercase text-accent">Inquiry</motion.span>
                  <motion.h1 variants={scrollItemVariants} className="text-5xl md:text-6xl font-serif font-semibold mt-2 mb-6 text-text-main">Get in Touch.</motion.h1>
                  <motion.p variants={scrollItemVariants} className="font-serif italic text-2xl text-text-main/90 max-w-[50ch] leading-snug">Whether you have a project in mind, a research question, or just want to say hello — I&apos;d love to hear from you.</motion.p>
                </motion.header>
                <motion.div variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div className="flex flex-col gap-12">
                    <motion.a variants={scrollItemVariants} href="mailto:hello@example.com" className="flex items-center gap-6 group">
                      <div className="w-16 h-16 bg-bg-card border border-border-color rounded-2xl flex items-center justify-center text-text-main transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent group-hover:-translate-y-1 shadow-sm">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-text-light block mb-1">Direct Email</span>
                        <span className="font-serif italic text-2xl text-text-main email-address">hello@example.com</span>
                      </div>
                    </motion.a>
                    <motion.div variants={scrollItemVariants} className="accent-note p-8 bg-accent-light rounded-2xl border-l-4 border-accent">
                      <span className="font-sans text-sm font-semibold uppercase tracking-wider text-accent block mb-3">A Note</span>
                      <p className="font-serif italic text-lg text-text-main m-0 leading-relaxed">&quot;Currently based in Yogyakarta, but I work with researchers and collaborators globally. Typical response time: within 24–48 hours.&quot;</p>
                    </motion.div>
                  </div>
                  <motion.div variants={scrollItemVariants}>
                    {!messageSent ? (
                      <div className="bg-bg-card border border-border-color rounded-[20px] p-10 shadow-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="font-sans text-sm font-medium text-text-main block mb-2">Full Name</label>
                            <input className="w-full bg-bg-main border border-border-color rounded-xl px-5 py-4 font-sans text-base text-text-main outline-none transition-all focus:bg-bg-card focus:border-accent focus:ring-4 focus:ring-accent-light" type="text" placeholder="Your name" />
                          </div>
                          <div>
                            <label className="font-sans text-sm font-medium text-text-main block mb-2">Email Address</label>
                            <input className="w-full bg-bg-main border border-border-color rounded-xl px-5 py-4 font-sans text-base text-text-main outline-none transition-all focus:bg-bg-card focus:border-accent focus:ring-4 focus:ring-accent-light" type="email" placeholder="your@email.com" />
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="font-sans text-sm font-medium text-text-main block mb-2">Subject of Inquiry</label>
                          <select className="w-full bg-bg-main border border-border-color rounded-xl px-5 py-4 font-sans text-base text-text-main outline-none transition-all focus:bg-bg-card focus:border-accent focus:ring-4 focus:ring-accent-light">
                            <option>General Inquiry</option>
                            <option>Translation Project</option>
                            <option>Research Collaboration</option>
                            <option>Web Development</option>
                          </select>
                        </div>
                        <div className="mb-8">
                          <label className="font-sans text-sm font-medium text-text-main block mb-2">Your Message</label>
                          <textarea className="w-full bg-bg-main border border-border-color rounded-xl px-5 py-4 font-sans text-base text-text-main outline-none transition-all focus:bg-bg-card focus:border-accent focus:ring-4 focus:ring-accent-light" rows={5} placeholder="How can I help you?" style={{ resize: 'none' }}></textarea>
                        </div>
                        <button className="btn-premium inline-flex items-center justify-center w-full gap-3 font-sans text-sm font-medium px-8 py-4 rounded-full bg-accent text-white hover:bg-accent-hover hover:-translate-y-0.5 shadow-md transition-all" onClick={() => setMessageSent(true)}>
                          Send Message
                        </button>
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-bg-card border border-border-color rounded-[20px] p-10 shadow-sm flex flex-col items-center justify-center text-center min-h-[400px]">
                        <div className="w-16 h-16 bg-accent-light text-accent rounded-full flex items-center justify-center mb-6">
                          <CircleCheck className="w-8 h-8" />
                        </div>
                        <h3 className="font-serif text-3xl font-semibold mb-4 text-text-main">Message sent.</h3>
                        <p className="text-text-muted text-lg max-w-[30ch]">Thank you for reaching out. I&apos;ll respond within 48 hours.</p>
                        <button className="btn-premium inline-flex items-center gap-3 font-sans text-sm font-medium px-8 py-4 rounded-full border border-border-color bg-bg-card text-text-main hover:bg-bg-main hover:border-text-main transition-all mt-8" onClick={() => setMessageSent(false)}>Send another message</button>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border-color bg-bg-card py-12 md:py-16 mt-auto">
        <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="font-serif text-2xl font-semibold text-text-main">Shafira Kemala Putri.</div>
            <div className="text-sm font-medium text-text-light mt-2">© 2026 · All rights reserved</div>
          </div>
          <div className="flex gap-8">
            <a href="#" className="footer-link font-sans text-base font-medium text-text-muted hover:text-accent transition-colors">Twitter</a>
            <a href="#" className="footer-link font-sans text-base font-medium text-text-muted hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="footer-link font-sans text-base font-medium text-text-muted hover:text-accent transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
