import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import { FirebaseProvider, useFirebase } from "./components/FirebaseProvider";
import { 
  Code2, 
  Cloud, 
  Cpu, 
  Globe, 
  ChevronRight, 
  Mail, 
  Instagram, 
  Linkedin, 
  Github,
  Server,
  Smartphone,
  Zap,
  Monitor,
  Palette,
  X,
  ExternalLink,
  Star,
  Quote,
  Users,
  UserPlus,
  Plus,
  Trash2,
  Edit,
  ChevronLeft,
  Briefcase,
  CheckSquare,
  Target,
  LayoutDashboard,
  UploadCloud,
  Loader2,
  XCircle,
  CheckCircle2,
  Clock,
  UserX,
  AlertCircle,
  Search,
  PhoneCall,
  DollarSign
} from "lucide-react";
import { AreaChart, Area, PieChart, Pie, Cell, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { googleSheetsSignIn, fetchSpreadsheetMetadata, fetchSheetData } from "./lib/sheets";

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <div className="relative w-16 h-16 flex items-center justify-center">
      <img 
        src="/logo.png" 
        alt="Stahl Tech Web Logo" 
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback caso a imagem ainda não tenha sido carregada
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = '<div class="text-stahl-cyan font-black">LOGO</div>';
        }}
      />
    </div>
    <div className="flex flex-col leading-tight">
      <span className="font-sans font-black text-3xl tracking-tighter text-white">
        STAHL
      </span>
      <span className="text-sm font-black uppercase tracking-widest text-stahl-cyan">
        TECH &  WEB
      </span>
      <span className="text-[9px] uppercase tracking-[0.1em] font-bold text-white/40 mt-1">
        SEUS PARCEIROS DIGITAIS
      </span>
    </div>
  </div>
);

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["servicos", "portfolio", "sobre", "depoimentos", "contato"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when section is in the middle of the screen
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { title: "Serviços", href: "#servicos", id: "servicos" },
    { title: "Portfólio", href: "#portfolio", id: "portfolio" },
    { title: "Sobre", href: "#sobre", id: "sobre" },
    { title: "Depoimentos", href: "#depoimentos", id: "depoimentos" },
    { title: "Contato", href: "#contato", id: "contato" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stahl-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <Logo />
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeSection === link.id ? "text-stahl-cyan" : "text-white/60 hover:text-white"
                }`}
              >
                {link.title}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-stahl-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onOpenForm }: { onOpenForm: () => void }) => (
  <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden tech-grid">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="micro-label mb-8">Seus Parceiros Digitais</div>
        <h1 className="massive-heading mb-10">
          O FUTURO<br />
          <span className="text-stahl-cyan">É DIGITAL</span>
        </h1>
        <p className="max-w-xl text-xl text-white/60 mb-12 leading-relaxed">
          Criamos experiências digitais impactantes que elevam sua marca ao próximo nível através de design estratégico e tecnologia de ponta.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
          <button onClick={onOpenForm} className="btn-bold">
            Solicitar orçamento
          </button>
          <a href="#servicos" className="link-bold text-white">
            Ver Serviços
          </a>
        </div>
      </motion.div>
    </div>
    
    {/* Decorative Elements */}
    <div className="absolute bottom-0 right-0 p-12 hidden lg:block">
      <div className="flex gap-20 border-t border-white/10 pt-10">
        <div className="flex flex-col">
          <span className="text-3xl font-black">10+</span>
          <span className="micro-label">Projetos</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-black">SEG-SÁB</span>
          <span className="micro-label">Até as 22h</span>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => {
  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Criação de Sites Web",
      desc: "Desenvolvimento de sites modernos, responsivos e otimizados para converter visitantes em clientes."
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Manutenção de Computadores",
      desc: "Serviços especializados de formatação, limpeza preventiva, upgrade de hardware e otimização de sistema."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Branding Completo",
      desc: "Criação de logos profissionais e identidade visual completa para destacar sua marca no mercado."
    }
  ];

  return (
    <section id="servicos" className="py-32 bg-stahl-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="micro-label mb-4">Especialidades</div>
          <h2 className="text-5xl font-black uppercase tracking-tighter">O Que Fazemos</h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10 border border-white/10"
        >
          {services.map((s, i) => (
            <div
              key={i}
              className="p-12 bg-stahl-dark hover:bg-white/5 transition-colors group"
            >
              <div className="text-stahl-cyan mb-8 group-hover:scale-110 transition-transform duration-500">
                {s.icon}
              </div>
              <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">{s.title}</h3>
              <p className="text-white/60 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SERVICE_DEFAULTS: Record<string, { price: number, prazo: number }> = {
  "Limpeza/Manutenção": { price: 130, prazo: 2 },
  "Formatação S/ BKP": { price: 140, prazo: 2 },
  "Formatação Completa": { price: 170, prazo: 2 },
  "Landing Pages": { price: 1300, prazo: 10 },
  "Loja E-Commerce": { price: 5500, prazo: 20 },
  "Identidade Visual": { price: 450, prazo: 8 },
  "Landing Pages + Identidade Visual": { price: 2400, prazo: 16 },
  "Manutenção Mensal": { price: 120, prazo: 0 },
  "Setup de Campanhas": { price: 450, prazo: 0 },
  "Gestão Mensal": { price: 600, prazo: 0 },
  "Gestão + Otimização": { price: 950, prazo: 0 },
  "Loja E-Commerce (inicio)": { price: 6000, prazo: 20 },
  "Landing Page (Inicio)": { price: 950, prazo: 10 },
  "Pacote Basico (10x Artes)": { price: 1150, prazo: 30 }
};

const DEFAULT_PROJECTS = [
  {
    title: "Psicóloga Michele Braz",
    category: "Web Design",
    image: "/portfolio-michele.png",
    desc: "Landing page para psicologia focada em captação de pacientes e profissionalismo.",
    url: "https://www.michelebraz.com.br",
    features: "Suave, Responsivo, Agendamento"
  },
  {
    title: "Psicólogo Ivan Vieira",
    category: "Web Design",
    image: "/portfolio-ivan.png",
    desc: "Portfólio online profissional, oferecendo agendamentos e uma apresentação clara dos serviços psicológicos.",
    url: "https://www.ivanvieira.com.br",
    features: "Elegante, Conversão, Agendamento"
  }
];

const Portfolio = () => {
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjectsList(items);
    }, (error) => {
      console.error("Error fetching projects:", error);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayProjects = projectsList.length > 0 ? projectsList : DEFAULT_PROJECTS;
  const N = displayProjects.length;
  const maxIndex = Math.max(0, N - visibleItems);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section id="portfolio" className="py-32 bg-stahl-deep border-y border-white/5 relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-stahl-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-10">
          <div>
            <div className="micro-label mb-4 text-stahl-cyan">Projetos Recentes</div>
            <h2 className="text-5xl font-black uppercase tracking-tighter">Serviços Realizados</h2>
            <p className="mt-6 text-white/40 max-w-xl">
              Criação de layout personalizado, integração com formulários de contato e otimização de performance para diversos setores.
            </p>
          </div>

          {N > visibleItems && (
            <div className="flex gap-4">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 flex items-center justify-center border border-white/10 bg-stahl-dark/40 hover:bg-stahl-cyan hover:text-stahl-dark hover:border-stahl-cyan transition-all text-white rounded-full group shadow-md shadow-black/10"
                aria-label="Projeto anterior"
              >
                <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 flex items-center justify-center border border-white/10 bg-stahl-dark/40 hover:bg-stahl-cyan hover:text-stahl-dark hover:border-stahl-cyan transition-all text-white rounded-full group shadow-md shadow-black/10"
                aria-label="Próximo projeto"
              >
                <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden -mx-4 px-4 py-4">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`
            }}
          >
            {displayProjects.map((p, i) => (
              <div 
                key={p.id || i} 
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
              >
                <motion.div
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 20px 40px -20px rgba(0, 243, 255, 0.3)"
                  }}
                  className="group bg-stahl-dark/40 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-stahl-cyan/30 transition-all duration-300 h-[500px] flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden bg-white/5 flex items-center justify-center flex-shrink-0">
                    <a 
                      href={p.url === '#' || !p.url ? undefined : p.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`block w-full h-full relative cursor-pointer ${p.url === '#' || !p.url ? 'pointer-events-none' : ''}`}
                    >
                      <img 
                        src={p.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `
                            <div class="flex flex-col items-center justify-center text-white/20 p-8 text-center h-full">
                              <svg class="w-12 h-12 mb-4 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                              </svg>
                              <span class="text-[10px] uppercase font-bold tracking-widest">Aguardando Imagem Portfólio</span>
                            </div>
                          `;
                        }}
                      />
                      {p.url && p.url !== '#' && (
                        <div className="absolute inset-0 bg-stahl-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <div className="p-4 bg-stahl-cyan text-white rounded-full hover:scale-110 transition-transform shadow-xl shadow-stahl-cyan/20 animate-none">
                            <ExternalLink className="w-6 h-6 text-stahl-dark" />
                          </div>
                        </div>
                      )}
                    </a>
                  </div>
                  <div className="p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-black tracking-widest text-stahl-cyan mb-2">{p.category}</div>
                      <h3 className="text-2xl font-black uppercase mb-4 tracking-tight line-clamp-1">{p.title}</h3>
                      <p className="text-white/50 text-sm mb-6 leading-relaxed line-clamp-3">
                        {p.desc}
                      </p>
                    </div>
                    <div>
                      {p.features && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {p.features.split(",").map((f: string, fi: number) => (
                            <span key={fi} className="text-[9px] uppercase font-bold tracking-widest border border-white/10 bg-white/5 px-2 py-1 text-white/40 group-hover:text-white/60 transition-colors">
                              {f.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      {p.url && p.url !== '#' && (
                        <a 
                          href={p.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-white/40 hover:text-stahl-cyan transition-colors group/link"
                        >
                          <span>Visitar Projeto</span>
                          <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {N > visibleItems && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${currentIndex === idx ? 'bg-stahl-cyan w-6' : 'bg-white/20 hover:bg-white/45'}`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Michele Braz",
      role: "Psicóloga",
      text: "O site superou minhas expectativas. Conseguiu transmitir exatamente a serenidade que eu precisava para o meu consultório digital.",
      rating: 5
    },
    {
      name: "Ricardo Silva",
      role: "Suporte TI",
      text: "A manutenção dos nossos equipamentos é rápida e precisa. Um parceiro indispensável para nossa infraestrutura.",
      rating: 5
    }
  ];

  return (
    <section id="depoimentos" className="py-32 bg-stahl-soft text-stahl-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <div className="text-[12px] uppercase tracking-[0.15em] font-bold text-stahl-cyan mb-6">Feedback</div>
          <h2 className="text-6xl font-black uppercase tracking-tighter mb-4 leading-none">O Que Dizem<br />Nossos Clientes</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {testimonials.map((t, i) => (
            <div key={i} className="p-10 border-l-4 border-stahl-cyan bg-white relative shadow-sm">
              <Quote className="absolute top-4 right-4 text-stahl-cyan/10 w-12 h-12" />
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-stahl-cyan text-stahl-cyan" />
                ))}
              </div>
              <p className="text-lg italic text-slate-600 mb-8 leading-relaxed">
                "{t.text}"
              </p>
              <div>
                <span className="block font-black uppercase text-stahl-dark tracking-tight">{t.name}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-stahl-cyan">{t.role}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <section id="sobre" ref={containerRef} className="relative py-48 bg-stahl-soft text-stahl-dark overflow-hidden border-t border-slate-200">
      {/* Parallax Decorative Elements */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-20 right-[-5%] w-64 h-64 border-8 border-stahl-cyan/10 rounded-full hidden lg:block"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-10 left-[-2%] w-48 h-48 bg-stahl-cyan/5 blur-3xl rounded-full hidden lg:block"
      />
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/2 right-[10%] opacity-[0.03] select-none pointer-events-none hidden xl:block"
      >
        <span className="text-[20rem] font-black leading-none">STAHL</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-32 text-center"
        >
          <div className="text-[12px] uppercase tracking-[0.15em] font-bold text-stahl-cyan mb-6">Equipe</div>
          <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">Quem Somos</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* COLUNA ESQUERDA - FOTO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
             <div className="aspect-[4/5] bg-gray-200 overflow-hidden shadow-2xl relative border-8 border-white">
                <img 
                  src="/bryan.jpg"
                  alt="Bryan Rodrigo Stahl"
                  className="w-full h-full object-cover filter contrast-125"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800&auto=format&fit=crop"; 
                  }}
                />
             </div>
             {/* Decorative box behind image */}
             <div className="absolute -z-10 bg-stahl-cyan/20 w-full h-full top-6 -left-6 border border-stahl-cyan/30"></div>
          </motion.div>

          {/* COLUNA DIREITA - TEXTO */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-[12px] uppercase tracking-[0.15em] font-bold text-stahl-cyan mb-6">Sobre Mim</div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Bryan Rodrigo<br/>Stahl
            </h2>
            
            <div className="text-lg text-slate-600 mb-10 leading-relaxed space-y-5">
              <p>
                Olá! Sou apaixonado por resolver problemas através da tecnologia. Aos 30 anos, resido em <strong>Limeira - SP</strong>, sou casado com a maravilhosa Nicolly e pai.
              </p>
              <p>
                Minha jornada na tecnologia começou cedo. Trabalho na área de T.I. <strong>desde os meus 16 anos</strong>, acumulando vasta experiência prática em manutenção de infraestruturas, resolução de demandas técnicas desafiadoras e na criação de soluções digitais.
              </p>
              <p>
                Atualmente, estou aprimorando minha base técnica cursando <strong>Análise e Desenvolvimento de Sistemas</strong>. Na Stahl Tech Web, uno minha dedicação e expertise acumulada para entregar desde suportes confiáveis em hardwares até sites desenvolvidos com altíssima precisão e performance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "13+ Anos de T.I.",
                "Graduando ADS",
                "Limeira - SP",
                "Foco em Resultado"
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-4 border-l-4 border-stahl-cyan pl-4 bg-white p-3 shadow-sm"
                >
                  <span className="font-black uppercase tracking-tight text-sm text-stahl-dark">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* NICOLLY PROFILE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mt-32">
          
          {/* COLUNA ESQUERDA - TEXTO */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="text-[12px] uppercase tracking-[0.15em] font-bold text-stahl-cyan mb-6">Nossa Equipe</div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Nicolly Regina<br/>Lopes da Silva
            </h2>
            
            <div className="text-lg text-slate-600 mb-10 leading-relaxed space-y-5">
              <p>
                Olá! Sou a Nicolly. Tenho 25 anos e uma paixão imensa por cuidar de pessoas e organizar processos. Sou formada em <strong>Administração</strong>, o que me deu uma visão muito ampla sobre gestão e organização.
              </p>
              <p>
                Atualmente, estou seguindo meu coração e cursando <strong>Fonoaudiologia</strong>, unindo minha habilidade administrativa com o cuidado e desenvolvimento humano.
              </p>
              <p>
                Trabalho ao lado do Bryan (que também é meu marido!), somando forças para garantir que o atendimento, o planejamento e os bastidores dos nossos projetos na Stahl Tech & Web sejam impecáveis e funcionem perfeitamente.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "25 Anos",
                "Formada em Adm",
                "Cursando Fonoaudiologia",
                "Gestão & Organização"
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-4 border-l-4 border-stahl-cyan pl-4 bg-white p-3 shadow-sm"
                >
                  <span className="font-black uppercase tracking-tight text-sm text-stahl-dark">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* COLUNA DIREITA - FOTO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2"
          >
             <div className="aspect-[4/5] bg-gray-200 overflow-hidden shadow-2xl relative border-8 border-white">
                <img 
                  src="/nicolly.jpg"
                  alt="Nicolly Regina Lopes da Silva"
                  className="w-full h-full object-cover filter contrast-125"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"; 
                  }}
                />
             </div>
             {/* Decorative box behind image */}
             <div className="absolute -z-10 bg-stahl-cyan/20 w-full h-full top-6 right-6 lg:-right-6 lg:left-auto border border-stahl-cyan/30"></div>
          </motion.div>
        </div>

           {/* MvvC Section */}
           <div className="mt-32">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7 }}
               className="mb-16 text-center"
             >
               <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-stahl-dark">Nossos Pilares</h2>
             </motion.div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Nosso Propósito */}
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7, delay: 0.1 }}
                 className="bg-white p-8 md:p-12 border-t-4 border-stahl-cyan shadow-sm hover:shadow-xl transition-all"
               >
                 <Target className="w-12 h-12 text-stahl-cyan mb-6" />
                 <h3 className="text-2xl font-black uppercase tracking-tight text-stahl-dark mb-6">Nosso Propósito</h3>
                 <p className="text-slate-600 text-lg leading-relaxed font-medium">
                   Ajudar profissionais e empresas a crescerem através da tecnologia, criando soluções digitais que geram conexão, credibilidade e oportunidades.
                 </p>
               </motion.div>

               {/* O Que Acreditamos */}
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7, delay: 0.2 }}
                 className="bg-white p-8 md:p-12 border-t-4 border-stahl-cyan shadow-sm hover:shadow-xl transition-all"
               >
                 <CheckCircle2 className="w-12 h-12 text-stahl-cyan mb-6" />
                 <h3 className="text-2xl font-black uppercase tracking-tight text-stahl-dark mb-6">O Que Acreditamos</h3>
                 <ul className="space-y-4">
                   {[
                     "Cada negócio tem uma história única.",
                     "A tecnologia deve simplificar, não complicar.",
                     "Relacionamentos são mais importantes que vendas.",
                     "Crescemos quando nossos clientes crescem.",
                     "Excelência está nos detalhes."
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-3">
                       <CheckCircle2 className="w-5 h-5 text-stahl-cyan shrink-0 mt-0.5" />
                       <span className="text-slate-600 font-medium">{item}</span>
                     </li>
                   ))}
                 </ul>
               </motion.div>
             </div>
           </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      // Optionally show a success state or just proceed with mailto
    } catch (error) {
      console.error("Error saving message:", error);
    }

    const subject = encodeURIComponent(`Contato Comercial - Stahl Tech (De: ${formData.nome})`);
    const body = encodeURIComponent(`Nome: ${formData.nome}\nEmail: ${formData.email}\n\nMensagem:\n${formData.mensagem}`);
    window.location.href = `mailto:stahltechweb@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contato" className="py-32 bg-stahl-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20"
        >
          <div>
            <div className="micro-label mb-6">Contato</div>
            <h2 className="text-6xl font-black uppercase tracking-tighter mb-10 leading-[0.9]">Vamos Criar Algo<br /><span className="text-stahl-cyan">Impactante</span></h2>
            
            <div className="space-y-10">
              <div className="flex flex-col">
                <span className="micro-label mb-2">E-mail</span>
                <a href="mailto:stahltechweb@gmail.com" className="text-2xl font-bold hover:text-stahl-cyan transition-colors">stahltechweb@gmail.com</a>
              </div>
              <div className="flex flex-col">
                <span className="micro-label mb-2">WhatsApp</span>
                <a href="https://wa.me/5519997744518" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold hover:text-stahl-cyan transition-colors">(19) 99774-4518</a>
              </div>
              <div className="flex flex-col">
                <span className="micro-label mb-2">Localização</span>
                <span className="text-2xl font-bold uppercase">Limeira - SP</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-12 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border-b border-white/20 pb-2">
                <label className="micro-label block mb-2">Nome</label>
                <input 
                  required
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-transparent text-xl font-bold outline-none placeholder:text-white/20 text-white" 
                  placeholder="Seu nome" 
                />
              </div>
              <div className="border-b border-white/20 pb-2">
                <label className="micro-label block mb-2">E-mail</label>
                <input 
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email" 
                  className="w-full bg-transparent text-xl font-bold outline-none placeholder:text-white/20 text-white" 
                  placeholder="seu@email.com" 
                />
              </div>
              <div className="border-b border-white/20 pb-2">
                <label className="micro-label block mb-2">Mensagem</label>
                <textarea 
                  required
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  className="w-full bg-transparent text-xl font-bold outline-none placeholder:text-white/20 h-32 resize-none text-white" 
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>
              <button type="submit" className="btn-bold w-full">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-stahl-dark text-white/40 py-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <Logo />
        
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold">
          © {new Date().getFullYear()} Stahl Tech & Web. All rights reserved.
        </p>

        <Link to="/admin" className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors">
          Admin
        </Link>
      </div>
    </div>
  </footer>
);

const BudgetModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    cidade: "",
    cep: "",
    servico: "Criação de Site",
    mensagem: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      cidade: "",
      cep: "",
      servico: "Criação de Site",
      mensagem: ""
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "budgets"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error saving budget request:", error);
    }

    const text = `*Solicitação de Orçamento - Stahl Tech*\n\n` +
      `*Nome:* ${formData.nome}\n` +
      `*Telefone:* ${formData.telefone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Cidade:* ${formData.cidade}\n` +
      `*CEP:* ${formData.cep}\n` +
      `*Serviço:* ${formData.servico}\n` +
      `*Mensagem:* ${formData.mensagem}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5519997744518?text=${encodedText}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stahl-dark/95 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-stahl-dark text-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-none p-8 md:p-12 relative border border-white/10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/5 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="micro-label text-stahl-cyan mb-4">Orçamento</div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 leading-none">Dados do Projeto</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="micro-label text-white/40 block mb-2">Nome Completo</label>
                  <input required name="nome" value={formData.nome} onChange={handleChange} type="text" className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none focus:border-stahl-cyan transition-colors text-white" placeholder="Seu nome" />
                </div>
                <div>
                  <label className="micro-label text-white/40 block mb-2">Telefone</label>
                  <input required name="telefone" value={formData.telefone} onChange={handleChange} type="tel" className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none focus:border-stahl-cyan transition-colors text-white" placeholder="(00) 00000-0000" />
                </div>
              </div>

              <div>
                <label className="micro-label text-white/40 block mb-2">E-mail</label>
                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none focus:border-stahl-cyan transition-colors text-white" placeholder="seu@email.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="micro-label text-white/40 block mb-2">Cidade</label>
                  <input required name="cidade" value={formData.cidade} onChange={handleChange} type="text" className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none focus:border-stahl-cyan transition-colors text-white" placeholder="Limeira" />
                </div>
                <div>
                  <label className="micro-label text-white/40 block mb-2">CEP</label>
                  <input required name="cep" value={formData.cep} onChange={handleChange} type="text" className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none focus:border-stahl-cyan transition-colors text-white" placeholder="00000-000" />
                </div>
              </div>

              <div>
                <label className="micro-label text-white/40 block mb-2">Serviço Solicitado</label>
                <select name="servico" value={formData.servico} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none focus:border-stahl-cyan transition-colors appearance-none text-white">
                  <option value="Identidade Visual" className="bg-stahl-dark">Identidade Visual</option>
                  <option value="Criação de Site" className="bg-stahl-dark">Criação de Site</option>
                  <option value="Combo (Identidade Visual + Site )" className="bg-stahl-dark">Combo (Identidade Visual + Site )</option>
                  <option value="Manutenção de PC" className="bg-stahl-dark">Manutenção de Computador</option>
                </select>
              </div>

              <div>
                <label className="micro-label text-white/40 block mb-2">Mensagem Desejada</label>
                <textarea required name="mensagem" value={formData.mensagem} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none focus:border-stahl-cyan transition-colors h-32 resize-none text-white" placeholder="Conte-nos mais sobre seu projeto..."></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button type="button" onClick={handleClear} className="flex-1 py-4 border-2 border-white font-black uppercase text-sm hover:bg-white/5 transition-colors text-white">
                  Limpar Campos
                </button>
                <button type="submit" className="flex-1 py-4 bg-stahl-cyan text-white font-black uppercase text-sm hover:bg-white transition-colors hover:text-stahl-dark shadow-lg shadow-stahl-cyan/20">
                  Enviar Orçamento
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-stahl-dark min-h-screen text-white selection:bg-stahl-cyan selection:text-stahl-dark scroll-smooth">
      <Navbar />
      <main>
        <Hero onOpenForm={() => setIsModalOpen(true)} />
        <Services />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <FirebaseProvider>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </FirebaseProvider>
    </BrowserRouter>
  );
}

const AdminPage = () => {
  const { user, loading, isAdmin } = useFirebase();
  const navigate = useNavigate();

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-stahl-dark text-white">Carregando...</div>;

  if (!user) {
    return <AdminLogin />;
  }

  if (!isAdmin) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-stahl-dark text-white p-6">
        <h1 className="text-4xl font-black mb-4">ACESSO NEGADO</h1>
        <p className="text-white/60 mb-8">Esta área é restrita para o administrador.</p>
        <button onClick={() => navigate("/")} className="btn-bold px-8">Voltar para Início</button>
      </div>
    );
  }

  return <AdminDashboard />;
};

import { GoogleAuthProvider, signInWithPopup, signOut, browserPopupRedirectResolver, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, handleFirestoreError, OperationType } from "./lib/firebase";
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc, updateDoc, getDocs, writeBatch } from "firebase/firestore";

const AdminLogin = () => {
  const { connectionError } = useFirebase();
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("jastahl56@gmail.com");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [useEmailAuth, setUseEmailAuth] = useState(false);

  const handleGoogleLogin = async () => {
    setErrorStatus(null);
    setErrorMessage(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider, browserPopupRedirectResolver);
    } catch (error: any) {
      console.error("Login failed", error);
      setErrorStatus(error.code || "unknown_error");
    }
  };

  const handleEmailAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorStatus(null);
    setErrorMessage(null);

    const checkEmail = email.trim().toLowerCase();
    if (checkEmail !== "stahltechweb@gmail.com" && checkEmail !== "jastahl56@gmail.com") {
      setErrorMessage("Somente os e-mails stahltechweb@gmail.com ou jastahl56@gmail.com possuem acesso à área administrativa.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("A senha precisa ter no mínimo 6 caracteres.");
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      console.error("Email auth failed", error);
      if (error.code === 'auth/operation-not-allowed') {
        setErrorMessage("O provedor de E-mail/Senha não está ativado no Console do Firebase. Ative-o em Authentication > Sign-in method.");
      } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setErrorMessage("E-mail ou senha incorretos. Se for o primeiro acesso, selecione 'Cadastrar Usuário Admin' abaixo.");
      } else if (error.code === 'auth/email-already-in-use') {
        setErrorMessage("Este e-mail administrativo já está cadastrado. Tente entrar com sua senha.");
      } else {
        setErrorMessage(error.message || "Ocorreu um erro ao autenticar.");
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-stahl-dark text-white p-6 overflow-y-auto">
      <div className="w-full max-w-md bg-white/5 p-8 border border-white/10 rounded-sm">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <h1 className="text-3xl font-black mb-6 uppercase tracking-tighter text-center">Área Administrativa</h1>
        
        {connectionError && (
          <div className="bg-amber-500/15 border border-amber-500/40 p-4 mb-6 rounded-sm text-center">
            <p className="text-amber-500 font-bold mb-1 uppercase text-xs tracking-wider">💡 Alerta de Conexão (Firestore)</p>
            <p className="text-[11px] text-white/90 leading-relaxed">
              {connectionError}
            </p>
          </div>
        )}

        {errorStatus && (
          <div className="bg-red-500/10 border border-red-500/50 p-4 mb-6 text-center rounded-sm">
            <p className="text-red-500 font-bold mb-2 uppercase text-xs tracking-widest">Erro de Conexão</p>
            <p className="text-xs text-white/70 leading-relaxed">
              {errorStatus === 'auth/network-request-failed' 
                ? "O navegador bloqueou popups/cookies de login no iframe. Use o formulário de E-mail/Senha abaixo ou abra o site em uma NOVA ABA." 
                : `O Google retornou o seguinte erro: ${errorStatus}. Recomendamos usar o Login com E-mail/Senha abaixo.`}
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/50 p-4 mb-6 text-center rounded-sm">
            <p className="text-red-500 font-bold mb-1 uppercase text-xs tracking-widest">Alerta</p>
            <p className="text-xs text-white/75 leading-relaxed">{errorMessage}</p>
          </div>
        )}

        {!useEmailAuth ? (
          <div className="space-y-4">
            <button onClick={handleGoogleLogin} className="btn-bold w-full flex items-center justify-center gap-4 py-4">
              Entrar com Google
            </button>
            <button 
              onClick={() => setUseEmailAuth(true)} 
              className="w-full py-4 text-xs font-bold uppercase tracking-widest text-stahl-cyan hover:text-white transition-colors border border-white/10 hover:border-stahl-cyan/50"
            >
              Entrar com E-mail e Senha (Alt)
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailAuthSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-2 block">E-mail de Admin</label>
              <input 
                required
                type="email"
                disabled
                className="w-full bg-white/5 border border-white/10 p-3 rounded-sm text-sm text-white/60 font-mono outline-none cursor-not-allowed"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-2 block">Senha de Acesso</label>
              <input 
                required
                type="password"
                placeholder="Insira a senha de 6+ caracteres"
                className="w-full bg-white/10 border border-white/25 p-3 rounded-sm text-sm text-white outline-none focus:border-stahl-cyan/50 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-bold w-full py-4 text-sm uppercase font-black tracking-widest">
              {isSignUp ? "Confirmar Cadastro Admin" : "Entrar como Admin"}
            </button>

            <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider pt-2">
              <button 
                type="button" 
                onClick={() => setIsSignUp(!isSignUp)} 
                className="text-stahl-cyan hover:text-white transition-colors"
              >
                {isSignUp ? "Ir para Tela de Entrada" : "Cadastrar Usuário Admin"}
              </button>
              <button 
                type="button" 
                onClick={() => setUseEmailAuth(false)} 
                className="text-white/40 hover:text-white transition-colors"
              >
                Usar Google
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest mb-4 leading-relaxed">
            Se for o primeiro acesso pelo e-mail e senha, selecione "Cadastrar Usuário Admin" sob o formulário para registrar.
          </p>
          <Link to="/" className="text-white/40 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold border-b border-white/10 pb-1">Voltar para o site</Link>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [serviceOrders, setServiceOrders] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [domains, setDomains] = useState<any[]>([]);
  const [servicesList, setServicesList] = useState<{ id: string, name: string, price?: number, deadlineDays?: number }[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages' | 'budgets' | 'clients' | 'projects' | 'serviceOrders' | 'proposals' | 'domains'>('dashboard');
  const [showClientForm, setShowClientForm] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [editingProposal, setEditingProposal] = useState<any>(null);
  const [showSheetsImport, setShowSheetsImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{isOpen: boolean, message: string, onConfirm: () => void} | null>(null);

  const [proposalFilterClient, setProposalFilterClient] = useState('');
  const [proposalFilterStatus, setProposalFilterStatus] = useState('');
  const [proposalFilterCompany, setProposalFilterCompany] = useState('');
  const [proposalFilterService, setProposalFilterService] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const qMessages = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribeMessages = onSnapshot(qMessages, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "messages");
    });

    const qBudgets = query(collection(db, "budgets"), orderBy("createdAt", "desc"));
    const unsubscribeBudgets = onSnapshot(qBudgets, (snapshot) => {
      const bgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBudgets(bgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "budgets");
    });

    const qClients = query(collection(db, "clients"), orderBy("createdAt", "desc"));
    const unsubscribeClients = onSnapshot(qClients, (snapshot) => {
      const cls = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClients(cls);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "clients");
    });

    const qProjects = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribeProjects = onSnapshot(qProjects, (snapshot) => {
      const projs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "projects");
    });

    const qOrders = query(collection(db, "service_orders"), orderBy("createdAt", "desc"));
    const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServiceOrders(orders);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "service_orders");
    });

    const qProposals = query(collection(db, "proposals"), orderBy("createdAt", "desc"));
    const unsubscribeProposals = onSnapshot(qProposals, (snapshot) => {
      const props = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProposals(props);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "proposals");
    });

    const qDomains = query(collection(db, "domains"), orderBy("createdAt", "desc"));
    const unsubscribeDomains = onSnapshot(qDomains, (snapshot) => {
      const dms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDomains(dms);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "domains");
    });

    const qServices = query(collection(db, "services"));
    const unsubscribeServices = onSnapshot(qServices, (snapshot) => {
      setServicesList(snapshot.docs.map(doc => ({ 
        id: doc.id, 
        name: doc.data().name,
        price: doc.data().price || 0,
        deadlineDays: doc.data().deadlineDays || 0
      })));
    }, (error) => {
      console.error(error);
    });

    return () => {
      unsubscribeMessages();
      unsubscribeBudgets();
      unsubscribeClients();
      unsubscribeProjects();
      unsubscribeOrders();
      unsubscribeProposals();
      unsubscribeDomains();
      unsubscribeServices();
    };
  }, []);

  const chartData = useMemo(() => {
    const grouped: Record<string, { total: number, recebido: number }> = {};
    const sorted = [...serviceOrders].filter(o => o.startDate).sort((a, b) => {
      const partsA = a.startDate.split('/');
      const partsB = b.startDate.split('/');
      const dateA = partsA.length === 3 ? new Date(parseInt(partsA[2]), parseInt(partsA[1]) - 1, parseInt(partsA[0])).getTime() : 0;
      const dateB = partsB.length === 3 ? new Date(parseInt(partsB[2]), parseInt(partsB[1]) - 1, parseInt(partsB[0])).getTime() : 0;
      return dateA - dateB;
    });

    sorted.forEach(order => {
      const parts = order.startDate.split('/');
      const monthYear = parts.length === 3 ? `${parts[1]}/${parts[2]}` : order.startDate;
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = { total: 0, recebido: 0 };
      }
      const val = Number(order.value) || 0;
      const sinal = Number(order.downPayment) || 0;
      grouped[monthYear].total += val;
      const balanceToReceive = val - sinal;
      grouped[monthYear].recebido += sinal + ((order.isPaid || order.isFinished) ? balanceToReceive : 0);
    });

    const result = Object.keys(grouped).map(key => ({
      name: key,
      'Total de Serviços': grouped[key].total,
      'Valor Recebido': grouped[key].recebido
    }));

    if (result.length === 1) {
      const parts = result[0].name.split('/');
      if (parts.length === 2) {
        let m = parseInt(parts[0], 10);
        let y = parseInt(parts[1], 10);
        
        let prevM = m - 1;
        let prevY = y;
        if (prevM === 0) { prevM = 12; prevY = y - 1; }
        const prevName = `${prevM.toString().padStart(2, '0')}/${prevY}`;
        
        let nextM = m + 1;
        let nextY = y;
        if (nextM === 13) { nextM = 1; nextY = y + 1; }
        const nextName = `${nextM.toString().padStart(2, '0')}/${nextY}`;

        return [
          { name: prevName, 'Total de Serviços': 0, 'Valor Recebido': 0 },
          result[0],
          { name: nextName, 'Total de Serviços': 0, 'Valor Recebido': 0 }
        ];
      }
    }

    return result;
  }, [serviceOrders]);

  const handleLogout = () => signOut(auth);

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setShowClientForm(true);
  };

  const handleDeleteClient = async (id: string) => {
    setConfirmDialog({
      isOpen: true,
      message: "Deseja realmente excluir este cliente?",
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, "clients", id));
        } catch (error) {
          console.error("Error deleting client:", error);
        }
        setConfirmDialog(null);
      }
    });
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleDeleteProject = async (id: string) => {
    setConfirmDialog({
      isOpen: true,
      message: "Deseja realmente excluir este projeto do portfólio?",
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, "projects", id));
        } catch (error) {
          console.error("Error deleting project:", error);
        }
        setConfirmDialog(null);
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10 hidden md:flex">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-black uppercase tracking-tighter text-stahl-dark">Painel Admin</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Stahl Tech & Web</p>
        </div>
        
        <nav className="flex-1 py-6 overflow-y-auto w-full">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'proposals', label: 'Prospecção', icon: Target },
            { id: 'serviceOrders', label: 'Controles', icon: CheckSquare },
            { id: 'clients', label: 'Clientes', icon: Users },
            { id: 'domains', label: 'Domínios', icon: Globe },
            { id: 'budgets', label: 'Orçamentos', icon: Zap },
            { id: 'messages', label: 'Mensagens', icon: Mail },
            { id: 'projects', label: 'Portfólio', icon: Briefcase },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-6 py-3 font-bold uppercase tracking-tight text-xs transition-colors ${
                activeTab === item.id 
                  ? 'bg-stahl-cyan text-white border-r-4 border-stahl-dark' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-stahl-dark'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-200 space-y-4">
          <button onClick={() => navigate("/")} className="w-full flex justify-center py-3 text-[10px] font-black uppercase border border-slate-300 hover:bg-slate-100 transition-colors text-slate-600">
            Ver Site
          </button>
          <button onClick={handleLogout} className="w-full flex justify-center py-3 text-[10px] font-black uppercase bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-8 gap-6 text-center md:text-left md:hidden">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter">Dashboard Admin</h1>
              <p className="text-slate-500">Stahl Tech & Web</p>
            </div>
            <div className="flex gap-4">
              <button onClick={handleLogout} className="px-4 py-2 text-xs font-bold uppercase bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Sair</button>
            </div>
        </div>

        {/* Mobile Nav Select */}
        <div className="md:hidden mb-8">
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="w-full border-2 border-slate-200 py-3 px-4 outline-none focus:border-stahl-cyan font-bold uppercase text-xs"
            >
              <option value="dashboard">Dashboard</option>
              <option value="proposals">Prospecção</option>
              <option value="serviceOrders">Projetos</option>
              <option value="clients">Clientes</option>
              <option value="domains">Domínios</option>
              <option value="budgets">Orçamentos</option>
              <option value="messages">Mensagens</option>
              <option value="projects">Portfólio</option>
            </select>
        </div>

        <div className="bg-white p-6 md:p-8 shadow-sm border border-slate-200 min-h-[500px]">
          <div className="flex justify-between items-center mb-6 text-center md:text-left flex-col md:flex-row gap-4">
            <h2 className="text-xl font-bold flex items-center gap-2 uppercase tracking-tight">
              {activeTab === 'dashboard' && <LayoutDashboard className="w-5 h-5 text-stahl-cyan" />}
              {activeTab === 'messages' && <Mail className="w-5 h-5 text-stahl-cyan" />}
              {activeTab === 'budgets' && <Zap className="w-5 h-5 text-stahl-cyan" />}
              {activeTab === 'projects' && <Briefcase className="w-5 h-5 text-stahl-cyan" />}
              {activeTab === 'clients' && <Users className="w-5 h-5 text-stahl-cyan" />}
              {activeTab === 'domains' && <Globe className="w-5 h-5 text-stahl-cyan" />}
              {activeTab === 'serviceOrders' && <CheckSquare className="w-5 h-5 text-stahl-cyan" />}
              {activeTab === 'proposals' && <Target className="w-5 h-5 text-stahl-cyan" />}
              
              {activeTab === 'dashboard' && 'Visão Global'}
              {activeTab === 'messages' && 'Mensagens do Site'}
              {activeTab === 'budgets' && 'Solicitações de Orçamentos'}
              {activeTab === 'projects' && 'Portfólio & Projetos'}
              {activeTab === 'clients' && 'Cadastro de Clientes'}
              {activeTab === 'domains' && 'Controle de Domínios'}
              {activeTab === 'serviceOrders' && 'Controle de Serviços'}
              {activeTab === 'proposals' && 'Prospecção (Propostas)'}
            </h2>
            
            {activeTab === 'clients' && (
              <button 
                onClick={() => setShowClientForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-stahl-dark text-white text-xs font-bold uppercase hover:bg-stahl-dark/90 transition-colors"
              >
                <Plus className="w-4 h-4" /> Novo Cliente
              </button>
            )}

            {activeTab === 'serviceOrders' && (
              <button 
                onClick={() => {
                  setEditingOrder(null);
                  setShowOrderForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-stahl-dark text-white text-xs font-bold uppercase hover:bg-stahl-dark/90 transition-colors"
              >
                <Plus className="w-4 h-4" /> Novo Serviço
              </button>
            )}

            {activeTab === 'proposals' && (
              <button 
                onClick={() => {
                  setEditingProposal(null);
                  setShowProposalForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-stahl-dark text-white text-xs font-bold uppercase hover:bg-stahl-dark/90 transition-colors"
              >
                <Plus className="w-4 h-4" /> Nova Prospecção
              </button>
            )}

            {activeTab === 'projects' && (
              <button 
                onClick={() => {
                  setEditingProject(null);
                  setShowProjectForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-stahl-dark text-white text-xs font-bold uppercase hover:bg-stahl-dark/90 transition-colors"
              >
                <Plus className="w-4 h-4" /> Novo Projeto
              </button>
            )}
          </div>
          
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-100 rounded-sm">
                  <div>
                    <h3 className="font-bold text-sm">Integração Google Sheets</h3>
                    <p className="text-xs text-slate-500">Sincronize dados da sua planilha para o aplicativo web</p>
                  </div>
                  <button 
                    onClick={() => setShowSheetsImport(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0F9D58] text-white text-xs font-bold uppercase hover:bg-green-700 transition-colors rounded-sm"
                  >
                    <UploadCloud className="w-4 h-4" /> Importar Dados
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 border border-slate-100 rounded-sm">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Proj. Andamento</p>
                    <p className="text-xl font-black text-stahl-cyan">
                      {serviceOrders.filter(o => !o.isFinished).length}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 border border-slate-100 rounded-sm">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Proj. Finalizados</p>
                    <p className="text-xl font-black text-[#0F9D58]">
                      {serviceOrders.filter(o => o.isFinished).length}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 border border-slate-100 rounded-sm">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Prox. ao Vencimento</p>
                    <p className="text-xl font-black text-amber-500">
                      {serviceOrders.filter(order => {
                        if (order.isFinished || !order.deadlineDate) return false;
                        const parts = order.deadlineDate.split('/');
                        if (parts.length === 3) {
                          const dt = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`);
                          const diffTime = dt.getTime() - new Date().getTime();
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                          return diffDays <= 7;
                        }
                        return false;
                      }).length}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 border border-slate-100 rounded-sm">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Clientes Ativos</p>
                    <p className="text-xl font-black text-slate-700">
                      {clients.length}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 border border-slate-100 rounded-sm">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Sem Respostas</p>
                    <p className="text-xl font-black text-red-500">
                      {proposals.filter(p => {
                        const st = (p.status || '').toLowerCase();
                        return st.includes('contato feito');
                      }).length}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 border border-slate-100 rounded-sm">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Entrar em Contato</p>
                    <p className="text-xl font-black text-amber-500">
                      {proposals.filter(p => {
                        const st = (p.status || '').toLowerCase();
                        return st === 'entrar em contato' || st === 'chamar outra hora';
                      }).length}
                    </p>
                  </div>
                </div>

                <div className="border border-slate-100 p-6 rounded-sm bg-white">
                  <h3 className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-6">Desempenho Financeiro dos Serviços</h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorRecebido" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(value) => `R$ ${value}`} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <Tooltip 
                          contentStyle={{ borderRadius: '2px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                          formatter={(value: number) => [`R$ ${value.toFixed(2)}`, undefined]}
                        />
                        <Area type="monotone" dataKey="Total de Serviços" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                        <Area type="monotone" dataKey="Valor Recebido" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorRecebido)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

          {activeTab === 'messages' && (
            messages.length === 0 ? (
              <p className="text-slate-400 italic">Nenhuma mensagem recebida ainda.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b text-xs uppercase tracking-wider text-slate-400 font-black">
                      <th className="pb-4">Data</th>
                      <th className="pb-4">Nome</th>
                      <th className="pb-4">E-mail</th>
                      <th className="pb-4">Mensagem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {messages.map((msg) => (
                      <tr key={msg.id} className="text-sm">
                        <td className="py-4 font-mono text-[10px] whitespace-nowrap pr-4">{msg.createdAt?.toDate?.()?.toLocaleString() || 'Processando...'}</td>
                        <td className="py-4 font-bold pr-4">{msg.name}</td>
                        <td className="py-4 text-slate-600 pr-4">{msg.email}</td>
                        <td className="py-4 text-slate-600">{msg.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {activeTab === 'budgets' && (
            budgets.length === 0 ? (
              <p className="text-slate-400 italic">Nenhum orçamento solicitado ainda.</p>
            ) : (
              <div className="space-y-8">
                <div>
                  <h3 className="uppercase text-sm font-bold text-slate-500 mb-4 tracking-wider">Orçamentos Pendentes</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b text-xs uppercase tracking-wider text-slate-400 font-black">
                          <th className="pb-4">Data</th>
                          <th className="pb-4">Nome</th>
                          <th className="pb-4">Serviço</th>
                          <th className="pb-4">Valor</th>
                          <th className="pb-4">Contato</th>
                          <th className="pb-4 text-center">Aceito</th>
                          <th className="pb-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {budgets.filter(b => !b.isAccepted).length === 0 ? (
                          <tr><td colSpan={7} className="py-4 text-center text-xs text-slate-400">Nenhum pendente</td></tr>
                        ) : (
                          budgets.filter(b => !b.isAccepted).map((b) => {
                            const selectedSrv = servicesList.find((s: any) => s.name === b.servico);
                            const orderValue = selectedSrv?.price || SERVICE_DEFAULTS[b.servico]?.price || 0;
                            return (
                              <tr key={b.id} className="text-sm">
                                <td className="py-4 font-mono text-[10px] whitespace-nowrap pr-4">{b.createdAt?.toDate?.()?.toLocaleString() || 'Processando...'}</td>
                                <td className="py-4 font-bold pr-4">{b.nome}</td>
                                <td className="py-4 text-stahl-cyan font-black uppercase text-[10px] pr-4">{b.servico}</td>
                                <td className="py-4 text-slate-600 font-bold pr-4">R$ {orderValue.toFixed(2)}</td>
                                <td className="py-4 text-slate-600 pr-4">
                                  {b.email && <>{b.email}<br/></>}
                                  <span className="font-bold">{b.telefone}</span>
                                </td>
                                <td className="py-4 text-center">
                                  <input 
                                    type="checkbox" 
                                    className="w-4 h-4 cursor-pointer accent-stahl-cyan"
                                    checked={b.isAccepted || false}
                                    onChange={async (e) => {
                                      const checked = e.target.checked;
                                      try {
                                        await updateDoc(doc(db, "budgets", b.id), { isAccepted: checked });
                                        if (checked) {
                                          let orderDeadline = selectedSrv?.deadlineDays || SERVICE_DEFAULTS[b.servico]?.prazo || 0;

                                          const deadlineDateObj = new Date();
                                          deadlineDateObj.setDate(deadlineDateObj.getDate() + orderDeadline);
                                          const deadlineDate = deadlineDateObj.toLocaleDateString('pt-BR');

                                          await addDoc(collection(db, "service_orders"), {
                                              clientName: b.nome,
                                              serviceName: b.servico,
                                              status: "Aguardando Sinal",
                                              startDate: new Date().toLocaleDateString('pt-BR'),
                                              isDownPaymentPaid: false,
                                              isFinished: false,
                                              isPaid: false,
                                              value: orderValue,
                                              downPayment: orderValue * 0.5,
                                              balance: orderValue - (orderValue * 0.5),
                                              deadlineDays: orderDeadline,
                                              deadlineDate: deadlineDate,
                                              budgetId: b.id,
                                              createdAt: serverTimestamp()
                                          });
                                          setActiveTab('serviceOrders');
                                        } else {
                                          const qSO = query(collection(db, "service_orders"), where("budgetId", "==", b.id));
                                          const snapSO = await getDocs(qSO);
                                          snapSO.forEach(async (d) => {
                                              await deleteDoc(doc(db, "service_orders", d.id));
                                          });
                                        }
                                      } catch (err) {
                                        console.error("Erro ao aceitar orçamento", err);
                                      }
                                    }}
                                  />
                                </td>
                                <td className="py-4 text-right">
                                  <button 
                                    onClick={async () => {
                                      setConfirmDialog({
                                        isOpen: true,
                                        message: "Deseja realmente excluir este orçamento?",
                                        onConfirm: async () => {
                                          await deleteDoc(doc(db, "budgets", b.id));
                                          setConfirmDialog(null);
                                        }
                                      });
                                    }}
                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                    title="Excluir"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="uppercase text-sm font-bold text-slate-500 mb-4 tracking-wider mt-8">Orçamentos Aceitos</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left opacity-60">
                      <thead>
                        <tr className="border-b text-xs uppercase tracking-wider text-slate-400 font-black">
                          <th className="pb-4">Data</th>
                          <th className="pb-4">Nome</th>
                          <th className="pb-4">Serviço</th>
                          <th className="pb-4">Valor</th>
                          <th className="pb-4">Contato</th>
                          <th className="pb-4 text-center">Reverter</th>
                          <th className="pb-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {budgets.filter(b => b.isAccepted).length === 0 ? (
                          <tr><td colSpan={7} className="py-4 text-center text-xs text-slate-400">Nenhum aceito</td></tr>
                        ) : (
                          budgets.filter(b => b.isAccepted).map((b) => {
                            const selectedSrv = servicesList.find((s: any) => s.name === b.servico);
                            const orderValue = selectedSrv?.price || SERVICE_DEFAULTS[b.servico]?.price || 0;
                            return (
                              <tr key={b.id} className="text-sm">
                                <td className="py-4 font-mono text-[10px] whitespace-nowrap pr-4">{b.createdAt?.toDate?.()?.toLocaleString() || 'Processando...'}</td>
                                <td className="py-4 font-bold pr-4">{b.nome}</td>
                                <td className="py-4 text-stahl-cyan font-black uppercase text-[10px] pr-4">{b.servico}</td>
                                <td className="py-4 text-slate-600 font-bold pr-4">R$ {orderValue.toFixed(2)}</td>
                                <td className="py-4 text-slate-600 pr-4">
                                  {b.email && <>{b.email}<br/></>}
                                  <span className="font-bold">{b.telefone}</span>
                                </td>
                                <td className="py-4 text-center">
                                  <input 
                                    type="checkbox" 
                                    className="w-4 h-4 cursor-pointer accent-stahl-cyan"
                                    checked={b.isAccepted || false}
                                    onChange={async (e) => {
                                      const checked = e.target.checked;
                                      try {
                                        await updateDoc(doc(db, "budgets", b.id), { isAccepted: checked });
                                        if (!checked) {
                                          const qSO = query(collection(db, "service_orders"), where("budgetId", "==", b.id));
                                          const snapSO = await getDocs(qSO);
                                          snapSO.forEach(async (d) => {
                                              await deleteDoc(doc(db, "service_orders", d.id));
                                          });
                                        }
                                      } catch (err) {
                                        console.error("Erro ao reverter orçamento", err);
                                      }
                                    }}
                                  />
                                </td>
                                <td className="py-4 text-right">
                                  <button 
                                    onClick={async () => {
                                      setConfirmDialog({
                                        isOpen: true,
                                        message: "Deseja realmente excluir este orçamento?",
                                        onConfirm: async () => {
                                          await deleteDoc(doc(db, "budgets", b.id));
                                          setConfirmDialog(null);
                                        }
                                      });
                                    }}
                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                    title="Excluir"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )
          )}

          {activeTab === 'projects' && (
            projects.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-slate-200">
                <Briefcase className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 italic">Nenhum projeto cadastrado no portfólio.</p>
                <button 
                  onClick={() => {
                    setEditingProject(null);
                    setShowProjectForm(true);
                  }}
                  className="mt-4 text-stahl-cyan font-bold uppercase text-xs"
                >
                  Cadastrar Primeiro Projeto
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b text-xs uppercase tracking-wider text-slate-400 font-black">
                      <th className="pb-4">Imagem</th>
                      <th className="pb-4">Título / Categoria</th>
                      <th className="pb-4">Descrição</th>
                      <th className="pb-4">Recursos</th>
                      <th className="pb-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="text-sm">
                        <td className="py-4 pr-4 w-20">
                          <img 
                            src={proj.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"} 
                            alt={proj.title} 
                            className="w-16 h-10 object-cover border border-slate-200 rounded"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";
                            }}
                          />
                        </td>
                        <td className="py-4 pr-4">
                          <div className="font-bold text-slate-900">{proj.title}</div>
                          <span className="text-[10px] uppercase font-bold text-stahl-cyan bg-stahl-cyan/10 px-2 py-0.5 rounded">
                            {proj.category}
                          </span>
                        </td>
                        <td className="py-4 text-slate-600 pr-4 max-w-xs truncate">{proj.desc}</td>
                        <td className="py-4 text-slate-600 pr-4 max-w-xs">
                          {proj.features?.split(",").map((f: string, fi: number) => (
                            <span key={fi} className="inline-block text-[9px] uppercase font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 mr-1 mb-1 rounded-sm">
                              {f.trim()}
                            </span>
                          ))}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleEditProject(proj)}
                              className="p-2 text-slate-400 hover:text-stahl-cyan transition-colors"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {activeTab === 'clients' && (
            clients.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-slate-200">
                <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 italic">Nenhum cliente cadastrado.</p>
                <button 
                  onClick={() => setShowClientForm(true)}
                  className="mt-4 text-stahl-cyan font-bold uppercase text-xs"
                >
                  Cadastrar Primeiro Cliente
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b text-xs uppercase tracking-wider text-slate-400 font-black">
                      <th className="pb-4">Nome / Empresa</th>
                      <th className="pb-4">E-mail</th>
                      <th className="pb-4">Telefone</th>
                      <th className="pb-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {clients.map((client) => (
                      <tr key={client.id} className="text-sm">
                        <td className="py-4 pr-4">
                          <div className="font-bold">{client.name}</div>
                          {client.company && <div className="text-[10px] uppercase text-slate-400 font-bold">{client.company}</div>}
                        </td>
                        <td className="py-4 text-slate-600 pr-4">{client.email || '-'}</td>
                        <td className="py-4 text-slate-600 pr-4">{client.phone || '-'}</td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleEditClient(client)}
                              className="p-2 text-slate-400 hover:text-stahl-cyan transition-colors"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteClient(client.id)}
                              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {activeTab === 'domains' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-sm uppercase tracking-widest text-[#000]">Domínios Registrados</h3>
                <button 
                  onClick={async () => {
                    setConfirmDialog({
                      isOpen: true,
                      message: "Deseja realmente excluir todos os domínios?",
                      onConfirm: async () => {
                        const promises = domains.map(dmn => deleteDoc(doc(db, "domains", dmn.id)));
                        await Promise.all(promises);
                        setConfirmDialog(null);
                      }
                    });
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase transition-colors"
                >
                  Limpar Base
                </button>
              </div>
              {domains.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-slate-200">
                  <Globe className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 italic">Nenhum domínio registrado.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b text-xs uppercase tracking-wider text-slate-400 font-black">
                        <th className="pb-4">Link / Domínio</th>
                        <th className="pb-4">Cliente</th>
                        <th className="pb-4">Provedor / Hospedagem</th>
                        <th className="pb-4">Data Início / Vencimento</th>
                        <th className="pb-4">Status / Obs</th>
                        <th className="pb-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {domains.map((dmn, idx) => (
                        <tr key={dmn.id} className="border-b border-slate-100/50 hover:bg-slate-50 transition-colors text-sm">
                          <td className="py-4 font-bold max-w-[200px] truncate" title={dmn.domain}>{dmn.domain}</td>
                          <td className="py-4">{dmn.clientName}</td>
                          <td className="py-4">{dmn.provider}</td>
                          <td className="py-4">
                            {dmn.startDate && <div className="text-[10px] uppercase text-slate-400 font-bold mb-0.5">Início: {dmn.startDate}</div>}
                            <div className={dmn.expirationDate ? "font-medium" : "text-slate-400"}>{dmn.expirationDate || '-'}</div>
                          </td>
                          <td className="py-4">{dmn.notes || dmn.status}</td>
                          <td className="py-4 text-right">
                            <button 
                              onClick={async () => {
                                setConfirmDialog({
                                  isOpen: true,
                                  message: "Deseja realmente excluir este domínio?",
                                  onConfirm: async () => {
                                    await deleteDoc(doc(db, "domains", dmn.id));
                                    setConfirmDialog(null);
                                  }
                                });
                              }}
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'serviceOrders' && (
            serviceOrders.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-slate-200">
                <CheckSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 italic">Nenhum serviço cadastrado.</p>
                <button 
                  onClick={() => setShowOrderForm(true)}
                  className="mt-4 text-stahl-cyan font-bold uppercase text-xs"
                >
                  Cadastrar Primeiro Serviço
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                    <tr className="border-b text-xs uppercase tracking-wider text-slate-400 font-black">
                      <th className="pb-4">Data Início</th>
                      <th className="pb-4">Prazo / Entrega</th>
                      <th className="pb-4">Cliente / Serviço</th>
                      <th className="pb-4">Valores</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {serviceOrders.map((order) => {
                       const valorStr = typeof order.value === 'number' ? `R$ ${order.value.toFixed(2)}` : (order.value || 'R$ 0,00');
                       const sinalStr = typeof order.downPayment === 'number' ? `R$ ${order.downPayment.toFixed(2)}` : (order.downPayment || 'R$ 0,00');
                       const balStr = typeof order.balance === 'number' ? `R$ ${order.balance.toFixed(2)}` : (order.balance || 'R$ 0,00');
                       return (
                      <tr key={order.id} className="text-sm">
                        <td className="py-4 pr-4">
                          <div className="font-bold">{order.startDate}</div>
                        </td>
                        <td className="py-4 pr-4">
                          <div className="font-bold">{order.deadlineDays} Dias</div>
                          <div className="text-[10px] uppercase text-slate-400 font-bold">{order.deadlineDate}</div>
                        </td>
                        <td className="py-4 pr-4">
                          <div className="font-bold">{order.clientName}</div>
                          <div className="text-[10px] uppercase text-slate-400 font-bold">{order.serviceName}</div>
                        </td>
                        <td className="py-4 pr-4">
                          <div className="text-slate-600 font-medium">Total: {valorStr}</div>
                          <div className="text-[10px] uppercase text-slate-400 font-bold">
                            Sinal: {sinalStr} | Falta: {(order.isPaid || order.status === 'Finalizado') ? 'R$ 0,00' : balStr}
                          </div>
                        </td>
                        <td className="py-4 pr-4">
                          <div className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 inline-block rounded-sm ${order.status === 'Encerrado' ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-700'}`}>
                            {order.status || 'Em Andamento'}
                          </div>
                          {order.isFinished && <div className="text-[10px] uppercase text-stahl-cyan font-bold mt-1">Finalizado</div>}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => {
                                setEditingOrder(order);
                                setShowOrderForm(true);
                              }}
                              className="p-2 text-slate-400 hover:text-stahl-cyan transition-colors"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={async () => {
                                setConfirmDialog({
                                  isOpen: true,
                                  message: "Deseja realmente excluir este serviço?",
                                  onConfirm: async () => {
                                    await deleteDoc(doc(db, "service_orders", order.id));
                                    setConfirmDialog(null);
                                  }
                                });
                              }}
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            )
          )}

          {activeTab === 'proposals' && (() => {
            const isAnalisando = (p: any) => {
              const st = (p.status || '').toLowerCase();
              return st.includes('analis') || st.includes('anális') || st.includes('aguardando') || st.includes('pendente');
            };
            const isRecusada = (p: any) => {
              const st = (p.status || '').toLowerCase();
              return st.includes('recus') || st.includes('reprovada') || st.includes('interesse') || st.includes('respondeu');
            };
            const isAceitou = (p: any) => {
              const st = (p.status || '').toLowerCase();
              return st.includes('aceito') || st === 'finalizado';
            };
            const isPendente = (p: any) => !isAceitou(p) && !isRecusada(p);

            const propRecusadas = proposals.filter(isRecusada).length;
            const propAceitas = proposals.filter(p => (p.status || '').toLowerCase().includes('aceito')).length;
            const propFinalizadas = proposals.filter(p => (p.status || '').toLowerCase() === 'finalizado').length;
            const propChamar = proposals.filter(p => (p.status || '').toLowerCase().includes('chamar')).length;
            const propSemResposta = proposals.filter(p => (p.status || '').toLowerCase() === 'contato feito').length;
            const propSemContato = proposals.filter(p => (p.status || '').toLowerCase() === 'sem contato' || (p.status || '').toLowerCase().includes('entrar em contato')).length;
            const propAnalisando = proposals.filter(isAnalisando).length;
            const propPendentes = proposals.length > 0 ? proposals.filter(isPendente).length : 0;
            const propRealizadas = proposals.length;
            const contatosRealizados = propRealizadas - propSemContato;

            const valRecusadas = proposals.filter(isRecusada).reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
            const valAceitas = proposals.filter(p => (p.status || '').toLowerCase().includes('aceito')).reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
            const valFinalizadas = proposals.filter(p => (p.status || '').toLowerCase() === 'finalizado').reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
            const valChamar = proposals.filter(p => (p.status || '').toLowerCase().includes('chamar')).reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
            const valSemResposta = proposals.filter(p => (p.status || '').toLowerCase() === 'contato feito').reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
            const valPendentes = proposals.length > 0 ? proposals.filter(isPendente).reduce((acc, curr) => acc + (Number(curr.value) || 0), 0) : 0;
            const valAnalisando = proposals.filter(isAnalisando).reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
            const valContatos = proposals.filter(p => !((p.status || '').toLowerCase() === 'sem contato' || (p.status || '').toLowerCase().includes('entrar em contato'))).reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);

            const taxConversao = propRealizadas ? (((propAceitas + propFinalizadas) / propRealizadas) * 100).toFixed(2) : '0.00';
            const taxEmAnalise = propRealizadas ? ((propAnalisando / propRealizadas) * 100).toFixed(2) : '0.00';
            const taxRejeicao = propRealizadas ? ((propRecusadas / propRealizadas) * 100).toFixed(2) : '0.00';

            const valorRecusadas = proposals.filter(isRecusada).reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
            const valorEmAnalise = proposals.filter(isAnalisando).reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);

            const pieAnalisandoData = Object.entries(
              proposals.filter(isAnalisando).reduce((acc, curr) => {
                const area = curr.companyName || 'Outros';
                acc[area] = (acc[area] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([name, value]) => ({ name, value }));

            const pieAceitasData = Object.entries(
              proposals.filter(isAceitou).reduce((acc, curr) => {
                const area = curr.companyName || 'Outros';
                acc[area] = (acc[area] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([name, value]) => ({ name, value }));

            const COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8E24AA', '#F4511E', '#3949AB', '#00ACC1'];

            return proposals.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-slate-200">
                <Target className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 italic">Nenhuma prospecção cadastrada.</p>
                <button 
                  onClick={() => setShowProposalForm(true)}
                  className="mt-4 text-stahl-cyan font-bold uppercase text-xs"
                >
                  Cadastrar Primeira Prospecção
                </button>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
                  {/* Recusadas */}
                  <div className="bg-white p-4 border border-slate-100 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] uppercase tracking-widest text-[#000] font-black">Recusadas</p>
                      <XCircle className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-xl font-bold text-slate-700">{propRecusadas}</p>
                  </div>

                  {/* Finalizadas */}
                  <div className="bg-white p-4 border border-slate-100 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] uppercase tracking-widest text-[#000] font-black">Finalizadas</p>
                      <CheckSquare className="w-4 h-4 text-stahl-cyan" />
                    </div>
                    <p className="text-xl font-bold text-slate-700">{propFinalizadas}</p>
                  </div>

                  {/* Em Análise */}
                  <div className="bg-white p-4 border border-slate-100 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] uppercase tracking-widest text-[#000] font-black">Analisando</p>
                      <Search className="w-4 h-4 text-amber-500" />
                    </div>
                    <p className="text-xl font-bold text-slate-700">{propAnalisando}</p>
                  </div>

                  {/* Chamar Futuramente */}
                  <div className="bg-white p-4 border border-slate-100 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] uppercase tracking-widest text-[#000] font-black">Chamar Depois</p>
                      <Clock className="w-4 h-4 text-purple-500" />
                    </div>
                    <p className="text-xl font-bold text-slate-700">{propChamar}</p>
                  </div>

                  {/* Sem Respostas */}
                  <div className="bg-white p-4 border border-slate-100 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] uppercase tracking-widest text-[#000] font-black">Sem Respostas</p>
                      <PhoneCall className="w-4 h-4 text-red-400" />
                    </div>
                    <p className="text-xl font-bold text-slate-700">{propSemResposta}</p>
                  </div>

                  {/* Entrar em Contato */}
                  <div className="bg-white p-4 border border-slate-100 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] uppercase tracking-widest text-[#000] font-black">Entrar em Contato</p>
                      <Target className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-xl font-bold text-slate-700">{propSemContato}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black text-sm uppercase tracking-widest text-[#000]">Lista de Possíveis Clientes</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={async () => {
                        setConfirmDialog({
                          isOpen: true,
                          message: "Deseja realmente limpar todos os dados de prospecção?",
                          onConfirm: async () => {
                            const promises = proposals.map(prop => deleteDoc(doc(db, "proposals", prop.id)));
                            await Promise.all(promises);
                            setConfirmDialog(null);
                          }
                        });
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase transition-colors"
                    >
                      Limpar Base
                    </button>
                    <button 
                      onClick={() => setShowProposalForm(true)}
                      className="bg-stahl-cyan text-white px-4 py-2 text-xs font-bold uppercase transition-colors"
                    >
                      Adicionar Cliente
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Filtrar por Cliente" 
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 text-sm focus:border-stahl-cyan outline-none"
                      value={proposalFilterClient}
                      onChange={e => setProposalFilterClient(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Filtrar por Status" 
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 text-sm focus:border-stahl-cyan outline-none"
                      value={proposalFilterStatus}
                      onChange={e => setProposalFilterStatus(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Filtrar por Área" 
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 text-sm focus:border-stahl-cyan outline-none"
                      value={proposalFilterCompany}
                      onChange={e => setProposalFilterCompany(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Filtrar por Serviço" 
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 text-sm focus:border-stahl-cyan outline-none"
                      value={proposalFilterService}
                      onChange={e => setProposalFilterService(e.target.value)}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead>
                      <tr className="bg-slate-100 text-xs uppercase tracking-wider text-slate-600 font-bold">
                        <th className="p-3 border border-slate-200">Nome/Consultório</th>
                        <th className="p-3 border border-slate-200">Área Atuação</th>
                        <th className="p-3 border border-slate-200">WhatsApp</th>
                        <th className="p-3 border border-slate-200">Serviço</th>
                        <th className="p-3 border border-slate-200">Observação</th>
                        <th className="p-3 border border-slate-200 text-center">Status</th>
                        <th className="p-3 border border-slate-200 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proposals.filter(p => {
                        const matchClient = !proposalFilterClient || (p.clientName || '').toLowerCase().includes(proposalFilterClient.toLowerCase());
                        const matchStatus = !proposalFilterStatus || (p.status || '').toLowerCase().includes(proposalFilterStatus.toLowerCase());
                        const matchCompany = !proposalFilterCompany || (p.companyName || '').toLowerCase().includes(proposalFilterCompany.toLowerCase());
                        const matchService = !proposalFilterService || (p.serviceName || '').toLowerCase().includes(proposalFilterService.toLowerCase());
                        return matchClient && matchStatus && matchCompany && matchService;
                      }).map((prop, idx) => {
                        let statusColor = "bg-white text-slate-600";
                        const st = (prop.status || '').toLowerCase();
                        if (st === 'finalizado') statusColor = "bg-[#00FF00] text-black font-black";
                        else if (st === 'aceitou a proposta') statusColor = "bg-[#0000FF] text-white font-black";
                        else if (st.includes('analisando') || st.includes('anális')) statusColor = "bg-[#FF9900] text-black font-black";
                        else if (st.includes('chamar')) statusColor = "bg-[#FF00FF] text-white font-black";
                        else if (st.includes('contato feito')) statusColor = "bg-[#FFFF00] text-black font-black";
                        else if (st.includes('entrar em contato')) statusColor = "bg-[#ADD8E6] text-black font-black";
                        else if (st.includes('interesse') || st.includes('recus') || st.includes('reprovada') || st.includes('respondeu')) statusColor = "bg-[#FF0000] text-white font-black";

                        return (
                          <tr key={prop.id} className={idx % 2 === 0 ? "bg-white text-sm" : "bg-slate-50 text-sm"}>
                            <td className="p-2 border border-slate-200 font-bold">{prop.clientName}</td>
                            <td className="p-2 border border-slate-200">{prop.companyName}</td>
                            <td className="p-2 border border-slate-200">{prop.contactMethod}</td>
                            <td className="p-2 border border-slate-200">
                              <select 
                                className="w-full bg-transparent outline-none focus:text-stahl-cyan min-w-[120px]"
                                value={prop.serviceName}
                                onChange={async (e) => {
                                  await updateDoc(doc(db, "proposals", prop.id), { serviceName: e.target.value });
                                }}
                              >
                                {(!servicesList.find(s => s.name === prop.serviceName)) && (
                                  <option value={prop.serviceName}>{prop.serviceName}</option>
                                )}
                                {servicesList.map(srv => <option key={srv.id} value={srv.name}>{srv.name}</option>)}
                              </select>
                            </td>
                            <td className="p-2 border border-slate-200 text-xs truncate max-w-[200px]" title={prop.notes}>{prop.notes}</td>
                            <td className={`p-0 border border-slate-200 text-center text-xs uppercase ${statusColor}`}>
                              <select 
                                className="w-full h-full p-2 bg-transparent outline-none font-bold text-center cursor-pointer min-w-[120px]"
                                value={prop.status}
                                onChange={async (e) => {
                                  const val = e.target.value;
                                  await updateDoc(doc(db, "proposals", prop.id), { status: val });
                                  if (val === 'Aceitou a Proposta' || val === 'Proposta Aceita') {
                                    await addDoc(collection(db, "budgets"), {
                                      nome: prop.clientName || "",
                                      telefone: prop.contactMethod || "",
                                      email: "",
                                      servico: prop.serviceName || "",
                                      cidade: prop.companyName || "",
                                      cep: "",
                                      observacao: prop.notes || "",
                                      isAccepted: false,
                                      createdAt: serverTimestamp()
                                    });
                                    setActiveTab('budgets');
                                  }
                                }}
                              >
                                <option value="Finalizado" className="text-black bg-white">Finalizado</option>
                                <option value="Aceitou a Proposta" className="text-black bg-white">Aceitou a Proposta</option>
                                <option value="Analisando" className="text-black bg-white">Analisando</option>
                                <option value="Chamar Outra Hora" className="text-black bg-white">Chamar Outra/Data</option>
                                <option value="Contato Feito" className="text-black bg-white">Contato Feito</option>
                                <option value="Entrar em Contato" className="text-black bg-white">Entrar em Contato</option>
                                <option value="Sem Interesse" className="text-black bg-white">Sem Interesse</option>
                                <option value="Não Respondeu" className="text-black bg-white">Não Respondeu</option>
                                <option value="Recusou a Proposta" className="text-black bg-white">Recusou a Proposta</option>
                                <option value={prop.status} className="text-black bg-white hidden">{prop.status}</option>
                              </select>
                            </td>
                            <td className="p-2 border border-slate-200 text-center">
                              <div className="flex justify-center gap-2">
                                <button 
                                  onClick={() => {
                                    setEditingProposal(prop);
                                    setShowProposalForm(true);
                                  }}
                                  className="text-slate-400 hover:text-stahl-cyan transition-colors"
                                  title="Editar"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={async () => {
                                    setConfirmDialog({
                                      isOpen: true,
                                      message: "Deseja realmente excluir esta proposta?",
                                      onConfirm: async () => {
                                        await deleteDoc(doc(db, "proposals", prop.id));
                                        setConfirmDialog(null);
                                      }
                                    });
                                  }}
                                  className="text-slate-400 hover:text-red-500 transition-colors"
                                  title="Excluir"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}
        </div>
      </main>

      {/* Client Form Modal */}
      {showClientForm && (
        <ClientModal 
          client={editingClient} 
          onClose={() => {
            setShowClientForm(false);
            setEditingClient(null);
          }} 
        />
      )}

      {/* Project Form Modal */}
      {showProjectForm && (
        <ProjectModal 
          project={editingProject} 
          onClose={() => {
            setShowProjectForm(false);
            setEditingProject(null);
          }} 
        />
      )}

      {/* Service Order Form Modal */}
      {showOrderForm && (
        <ServiceOrderModal 
          order={editingOrder} 
          onClose={() => {
            setShowOrderForm(false);
            setEditingOrder(null);
          }} 
        />
      )}

      {/* Proposal Form Modal */}
      {showProposalForm && (
        <ProposalModal 
          proposal={editingProposal} 
          servicesList={servicesList}
          onClose={() => {
            setShowProposalForm(false);
            setEditingProposal(null);
          }} 
        />
      )}

      {/* Sheets Import Modal */}
      {showSheetsImport && (
        <SheetsImportModal 
          clients={clients} 
          domains={domains} 
          proposals={proposals} 
          serviceOrders={serviceOrders} 
          onClose={() => setShowSheetsImport(false)} 
        />
      )}

      {/* Confirm Dialog */}
      {confirmDialog?.isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-stahl-dark/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 max-w-sm w-full text-center"
          >
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-slate-800">Confirmação</h3>
            <p className="text-slate-600 mb-8">{confirmDialog.message}</p>
            <div className="flex gap-4">
              <button 
                onClick={confirmDialog.onConfirm}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 font-black uppercase tracking-widest text-xs transition-colors"
              >
                Sim
              </button>
              <button 
                onClick={() => setConfirmDialog(null)}
                className="flex-1 border-2 border-slate-200 py-3 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors text-slate-600"
              >
                Não
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const ProposalModal = ({ proposal, servicesList, onClose }: { proposal?: any, servicesList: any[], onClose: () => void }) => {
  const [formData, setFormData] = useState({
    date: proposal?.date || new Date().toLocaleDateString('pt-BR'),
    clientName: proposal?.clientName || "",
    companyName: proposal?.companyName || "Psicologas",
    serviceName: proposal?.serviceName || (servicesList.length > 0 ? servicesList[0].name : ""),
    value: proposal?.value || 0,
    status: proposal?.status || "Contato Feito",
    contactMethod: proposal?.contactMethod || "WhatsApp",
    notes: proposal?.notes || ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSave = {
        ...formData,
        value: Number(formData.value)
      };

      if (proposal?.id) {
        await updateDoc(doc(db, "proposals", proposal.id), dataToSave);
      } else {
        await addDoc(collection(db, "proposals"), {
          ...dataToSave,
          createdAt: serverTimestamp()
        });
      }
      onClose();
    } catch (error) {
      console.error("Error saving proposal:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-stahl-dark/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black uppercase tracking-tighter">
            {proposal ? "Editar Prospecção" : "Nova Prospecção"}
          </h3>
          <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-stahl-dark transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Nome/Consultório *</label>
              <input 
                required type="text"
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Área de Atuação *</label>
              <input 
                required type="text"
                placeholder="Ex: Psicologas, Dentistas, Nutricionistas..."
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">WhatsApp *</label>
              <input 
                required type="text"
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm"
                value={formData.contactMethod}
                onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Serviço Ofertado *</label>
              <select 
                required
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm bg-transparent"
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
              >
                {(!servicesList.find(s => s.name === formData.serviceName)) && (
                  <option value={formData.serviceName}>{formData.serviceName || "Carregando..."}</option>
                )}
                {servicesList.map(srv => (
                  <option key={srv.id} value={srv.name}>{srv.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Status</label>
              <select 
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm bg-transparent"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Finalizado">Finalizado</option>
                <option value="Aceitou a Proposta">Aceitou a Proposta</option>
                <option value="Analisando">Analisando</option>
                <option value="Chamar Outra Hora">Chamar Outra/Data</option>
                <option value="Contato Feito">Contato Feito</option>
                <option value="Entrar em Contato">Entrar em Contato</option>
                <option value="Não Respondeu">Não Respondeu</option>
                <option value="Recusou a Proposta">Recusou a Proposta</option>
                <option value="Sem Interesse">Sem Interesse</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Data</label>
              <input 
                required type="text"
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Observações / Descrição</label>
            <textarea 
              rows={3}
              className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm resize-none"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="pt-6 flex gap-4">
            <button type="submit" className="flex-1 bg-stahl-cyan text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-stahl-dark transition-colors">
              Salvar Prospecção
            </button>
            <button type="button" onClick={onClose} className="px-6 py-4 border-2 border-slate-100 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const ClientModal = ({ client, onClose }: { client?: any, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: client?.name || "",
    email: client?.email || "",
    phone: client?.phone || "",
    company: client?.company || "",
    notes: client?.notes || ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (client?.id) {
        await updateDoc(doc(db, "clients", client.id), formData);
      } else {
        await addDoc(collection(db, "clients"), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      onClose();
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-stahl-dark/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-lg p-8 shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b pb-4">
          {client ? 'Editar Cliente' : 'Novo Cliente'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Nome Completo *</label>
            <input 
              required
              type="text"
              className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors font-bold text-slate-900"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">E-mail</label>
              <input 
                type="email"
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Telefone</label>
              <input 
                type="text"
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Empresa</label>
            <input 
              type="text"
              className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Observações</label>
            <textarea 
              className="w-full border-2 border-slate-100 p-3 outline-none focus:border-stahl-cyan transition-colors text-slate-900 h-24 resize-none text-sm"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            ></textarea>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="submit" className="flex-1 bg-stahl-dark text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-stahl-cyan transition-colors">
              Salvar Cadastro
            </button>
            <button type="button" onClick={onClose} className="px-6 py-4 border-2 border-slate-100 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: { project?: any, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    category: project?.category || "Web Design",
    image: project?.image || "",
    desc: project?.desc || "",
    url: project?.url || "",
    features: project?.features || ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (project?.id) {
        await updateDoc(doc(db, "projects", project.id), formData);
      } else {
        await addDoc(collection(db, "projects"), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      onClose();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-stahl-dark/80 backdrop-blur-sm shadow-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-lg p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b pb-4 text-slate-900">
          {project ? 'Editar Projeto' : 'Novo Projeto de Portfólio'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Título do Projeto *</label>
            <input 
              required
              type="text"
              className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors font-bold text-slate-900 text-sm"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Categoria *</label>
              <select 
                required
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm bg-white"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Web Design">Web Design</option>
                <option value="Identidade Visual">Identidade Visual</option>
                <option value="Criação de Site">Criação de Site</option>
                <option value="Combo">Combo</option>
                <option value="Design Gráfico">Design Gráfico</option>
                <option value="Infraestrutura TI">Infraestrutura TI</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">URL do Projeto</label>
              <input 
                type="text"
                placeholder="Ex: https://site.com ou #"
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">URL da Imagem do Projeto</label>
            <input 
              type="text"
              placeholder="Ex: /portfolio-michele.png ou link externo"
              className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Recursos / Tags * (separados por vírgula)</label>
            <input 
              required
              type="text"
              placeholder="Ex: Personalizado, Otimizado, Agendamento"
              className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Descrição do Projeto *</label>
            <textarea 
              required
              className="w-full border-2 border-slate-100 p-3 outline-none focus:border-stahl-cyan transition-colors text-slate-900 h-24 resize-none text-sm"
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            ></textarea>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="submit" className="flex-1 bg-stahl-dark text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-stahl-cyan transition-colors">
              Salvar Projeto
            </button>
            <button type="button" onClick={onClose} className="px-6 py-4 border-2 border-slate-100 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const ServiceOrderModal = ({ order, onClose }: { order?: any, onClose: () => void }) => {
  const [specialSinal, setSpecialSinal] = useState(false);
  const [formData, setFormData] = useState({
    startDate: order?.startDate || new Date().toLocaleDateString('pt-BR'),
    clientName: order?.clientName || "",
    serviceName: order?.serviceName || "",
    value: order?.value || 0,
    downPayment: order?.downPayment || (order?.value ? order.value * 0.5 : 0),
    deadlineDays: order?.deadlineDays || 0,
    status: order?.status || "Aguardando Sinal",
    isFinished: order?.isFinished || false,
    isDownPaymentPaid: order?.isDownPaymentPaid || false,
    isPaid: order?.isPaid || false
  });

  useEffect(() => {
    if (!specialSinal) {
      setFormData(prev => ({ ...prev, downPayment: Number(prev.value) * 0.5 }));
    }
  }, [formData.value, specialSinal]);

  useEffect(() => {
    let newStatus = formData.status;
    if (formData.isPaid) {
      newStatus = "Finalizado";
    } else if (formData.isFinished) {
      newStatus = "Aguardando Pagamento";
    } else if (formData.isDownPaymentPaid) {
      newStatus = "Em Andamento";
    } else {
      newStatus = "Aguardando Sinal";
    }
    setFormData(prev => ({ ...prev, status: newStatus }));
  }, [formData.isPaid, formData.isFinished, formData.isDownPaymentPaid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parts = formData.startDate.split('/');
      let dateObj = new Date();
      if(parts.length === 3) {
        dateObj = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
      }

      const rawBalance = Number(formData.value) - Number(formData.downPayment);
      const balance = (formData.isPaid || formData.status === 'Finalizado') ? 0 : rawBalance;
      
      const deadlineDateObj = new Date(dateObj);
      deadlineDateObj.setDate(deadlineDateObj.getDate() + Number(formData.deadlineDays));
      const deadlineDate = deadlineDateObj.toLocaleDateString('pt-BR');

      const dataToSave = {
        ...formData,
        value: Number(formData.value),
        downPayment: Number(formData.downPayment),
        balance: balance,
        deadlineDays: Number(formData.deadlineDays),
        deadlineDate: deadlineDate
      };

      if (order?.id) {
        await updateDoc(doc(db, "service_orders", order.id), dataToSave);
      } else {
        await addDoc(collection(db, "service_orders"), {
          ...dataToSave,
          createdAt: serverTimestamp()
        });
      }
      onClose();
    } catch (error) {
      console.error("Error saving service order:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-stahl-dark/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black uppercase tracking-tighter">
            {order ? "Editar Serviço" : "Novo Serviço"}
          </h3>
          <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-stahl-dark transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Data de Início * (DD/MM/AAAA)</label>
              <input 
                required type="text"
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Cliente *</label>
              <input 
                required type="text"
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Serviço *</label>
            <input 
              required type="text"
              className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm"
              value={formData.serviceName}
              onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Valor Total (R$) *</label>
              <input 
                required type="number" step="0.01" min="0"
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm"
                value={formData.value || ""}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
              />
            </div>
            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Sinal (R$)</label>
                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-500 cursor-pointer">
                  <input type="checkbox" checked={specialSinal} onChange={(e) => setSpecialSinal(e.target.checked)} className="accent-stahl-cyan" />
                  Sinal Especial
                </label>
              </div>
              <input 
                type="number" step="0.01" min="0" disabled={!specialSinal}
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm disabled:text-slate-400 disabled:bg-slate-50"
                value={formData.downPayment || ""}
                onChange={(e) => setFormData({ ...formData, downPayment: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Prazo (Dias) *</label>
              <input 
                required type="number" min="0"
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm"
                value={formData.deadlineDays || ""}
                onChange={(e) => setFormData({ ...formData, deadlineDays: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">Status *</label>
              <select 
                className="w-full border-b-2 border-slate-100 py-2 outline-none focus:border-stahl-cyan transition-colors text-slate-900 text-sm"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Em Andamento">Em Andamento</option>
                <option value="Aguardando Aprovação">Aguardando Aprovação</option>
                <option value="Atrasado">Atrasado</option>
                <option value="Encerrado">Encerrado</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <input 
                type="checkbox" id="isDownPaymentPaid"
                checked={formData.isDownPaymentPaid}
                onChange={(e) => setFormData({ ...formData, isDownPaymentPaid: e.target.checked })}
              />
              <label htmlFor="isDownPaymentPaid" className="text-xs font-bold text-slate-600">Sinal Pago?</label>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <input 
                type="checkbox" id="isFinished"
                checked={formData.isFinished}
                onChange={(e) => setFormData({ ...formData, isFinished: e.target.checked })}
              />
              <label htmlFor="isFinished" className="text-xs font-bold text-slate-600">Finalizado?</label>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <input 
                type="checkbox" id="isPaid"
                checked={formData.isPaid}
                onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
              />
              <label htmlFor="isPaid" className="text-xs font-bold text-slate-600">Pago?</label>
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <button type="submit" className="flex-1 bg-stahl-dark text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-stahl-cyan transition-colors">
              Salvar Serviço
            </button>
            <button type="button" onClick={onClose} className="px-6 py-4 border-2 border-slate-100 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const SheetsImportModal = ({ clients, domains, proposals, serviceOrders, onClose }: { clients?: any[], domains?: any[], proposals?: any[], serviceOrders?: any[], onClose: () => void }) => {
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [clearBeforeImport, setClearBeforeImport] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const extractId = (input: string) => {
    const match = input.match(/\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : input;
  };

  const handleImport = async () => {
    setError(null);
    setSuccessMsg(null);
    setIsImporting(true);

    try {
      const id = extractId(spreadsheetId);
      if (!id) throw new Error("ID inválido");

      await googleSheetsSignIn();
      const metadata = await fetchSpreadsheetMetadata(id);
      
      let totalImported = 0;
      let batch = writeBatch(db);
      let batchCount = 0;
      
      if (clearBeforeImport) {
        const servicesSnapshot = await getDocs(collection(db, "services"));
        const servicesRecords = servicesSnapshot.docs.map(doc => ({ id: doc.id, coll: "services" }));

        const allRecords = [
          ...(clients || []).map(c => ({ id: c.id, coll: "clients" })),
          ...(domains || []).map(d => ({ id: d.id, coll: "domains" })),
          ...(proposals || []).map(p => ({ id: p.id, coll: "proposals" })),
          ...(serviceOrders || []).map(s => ({ id: s.id, coll: "service_orders" })),
          ...servicesRecords
        ];

        for (const record of allRecords) {
          batch.delete(doc(db, record.coll, record.id));
          batchCount++;
          if (batchCount >= 400) {
            await batch.commit();
            batch = writeBatch(db);
            batchCount = 0;
          }
        }
      }

      const normalize = (str: string) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
      const clientNames = new Set(clearBeforeImport ? [] : (clients || []).map(c => normalize(c.name)));
      const domainUrls = new Set(clearBeforeImport ? [] : (domains || []).map(d => normalize(d.domain)));

      // Itera por todas as abas
      for (const sheet of metadata.sheets) {
        const title = sheet.properties.title;
        const data = await fetchSheetData(id, `${title}!A1:Z5000`);
        const rows = data.values;
        if (!rows || rows.length <= 1) continue;
        
        // Simples heuristica para a aba: verificar os cabeçalhos
        let headerRowIdx = 0;
        let maxMatches = 0;
        
        for (let r = 0; r < Math.min(rows.length, 5); r++) {
          const rHeaders = rows[r].map((h: string) => normalize(h));
          let matches = 0;
          if (rHeaders.some((h: string) => h.includes("nome") || h.includes("consultorio") || h.includes("cliente"))) matches++;
          if (rHeaders.some((h: string) => h.includes("status"))) matches++;
          if (rHeaders.some((h: string) => h.includes("servico"))) matches++;
          if (rHeaders.some((h: string) => h.includes("area") || h.includes("empresa"))) matches++;
          if (rHeaders.some((h: string) => h.includes("whatsapp") || h.includes("telefone"))) matches++;
          if (rHeaders.some((h: string) => h.includes("dominio") || h.includes("hospedagem") || h.includes("vencimento"))) matches++;
          if (rHeaders.some((h: string) => h.includes("prazo") || h.includes("preco") || h.includes("valor"))) matches++;
          
          if (matches > maxMatches) {
            maxMatches = matches;
            headerRowIdx = r;
          }
        }
        
        const headers = rows[headerRowIdx].map((h: string) => normalize(h));
        const lowerTitle = normalize(title);

        for (let i = headerRowIdx + 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row || (!row[0] && !row[1] && !row[2] && !row[3])) continue; // ignora linha vazia

          const isServicesTab = lowerTitle.includes("preço") || lowerTitle.includes("valor") || lowerTitle.includes("tabela") || lowerTitle.includes("serviço") || lowerTitle.includes("servico") || headers.includes("prazo") || headers.includes("preco") || headers.includes("preço");

          const findCol = (keywords: string[]) => {
            const idx = headers.findIndex((h: string) => h && keywords.some(kw => h.includes(normalize(kw))));
            return idx >= 0 ? row[idx] : "";
          };

          const possibleClient = findCol(["cliente", "nome", "consultório", "consultorio", "lead"]);
          if (!isServicesTab && possibleClient && possibleClient.length > 2) {
             const normClient = normalize(possibleClient);
             if (!clientNames.has(normClient)) {
                 const newRef = doc(collection(db, "clients"));
                 batch.set(newRef, {
                   name: possibleClient,
                   email: findCol(["email", "e-mail"]),
                   phone: findCol(["telefone", "whatsapp", "celular"]),
                   company: findCol(["empresa", "consultorio", "area", "atuação"]),
                   notes: "Importado via Sincronização",
                   createdAt: serverTimestamp()
                 });
                 clientNames.add(normClient);
                 batchCount++;
                 totalImported++;
             }
          }

          const possibleDomain = findCol(["domínio", "dominio", "link", "url", "site"]);
          if (possibleDomain && possibleDomain.includes(".")) {
             const normDom = normalize(possibleDomain);
             if (!domainUrls.has(normDom)) {
                 const newRef = doc(collection(db, "domains"));
                 batch.set(newRef, {
                   domain: possibleDomain,
                   clientName: possibleClient || "",
                   provider: findCol(["provedor", "hospedagem", "host", "onde"]) || "",
                   startDate: findCol(["data", "início", "inicio", "compra", "registro"]) || "",
                   expirationDate: findCol(["vencimento", "renovação", "expira"]) || "",
                   status: findCol(["status", "situação"]) || "",
                   notes: "",
                   createdAt: serverTimestamp()
                 });
                 domainUrls.add(normDom);
                 batchCount++;
                 totalImported++;
             }
          }

          if (lowerTitle.includes("proposta") || lowerTitle.includes("prospec")) {
            const newRef = doc(collection(db, "proposals"));
            batch.set(newRef, {
              date: findCol(["data", "date", "dia"]) || new Date().toLocaleDateString('pt-BR'),
              clientName: findCol(["cliente", "nome", "consultório", "consultorio", "lead"]) || row[0] || "Cliente",
              companyName: findCol(["empresa", "marca", "negócio", "area", "área", "atuação", "atuacao"]) || "",
              serviceName: findCol(["serviço", "servico", "objeto", "interesse"]) || "Serviço Não Informado",
              value: findCol(["valor", "preço", "preco", "R$"]) || "0.00",
              status: findCol(["status", "situação", "situacao", "etapa"]) || "Contato Feito",
              contactMethod: findCol(["whatsapp", "telefone", "celular", "contato", "origem", "canal"]) || "",
              notes: findCol(["observação", "observacao", "obs", "notas"]) || "",
              createdAt: serverTimestamp()
            });
            batchCount++;
            totalImported++;
          } else if (lowerTitle.includes("controle") || lowerTitle.includes("ordem") || lowerTitle.includes("pedido")) {
            const parseCurrency = (str: string) => {
              if (!str) return 0;
              const val = parseFloat(String(str).replace('R$','').replace(/\./g,'').replace(',','.').trim());
              return isNaN(val) ? 0 : val;
            };
            const val = parseCurrency(findCol(["valor", "preço", "R$"]));
            const sinal = parseCurrency(findCol(["sinal", "entrada", "adiantamento"]));
            const prazo = parseInt(String(findCol(["prazo", "dias"])).replace(/\D/g, ''), 10) || 0;
            const startDate = findCol(["data", "início", "inicio", "date"]) || new Date().toLocaleDateString('pt-BR');
            
            const parts = startDate.split('/');
            let dateObj = new Date();
            if(parts.length === 3) {
              dateObj = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
            }
            const deadlineDateObj = new Date(dateObj);
            deadlineDateObj.setDate(deadlineDateObj.getDate() + prazo);
            const deadlineDate = deadlineDateObj.toLocaleDateString('pt-BR');
            const statusStr = findCol(["status", "situação", "situacao"]) || "Em Andamento";

            const newRef = doc(collection(db, "service_orders"));
            batch.set(newRef, {
              startDate: startDate,
              clientName: findCol(["cliente", "nome", "consultório", "consultorio"]) || row[0] || "",
              serviceName: findCol(["serviço", "servico", "produto"]) || "",
              value: val,
              downPayment: sinal,
              balance: val - sinal,
              deadlineDays: prazo,
              deadlineDate: deadlineDate,
              status: statusStr,
              isFinished: statusStr.toLowerCase().includes("finalizado") || statusStr.toLowerCase().includes("pronto"),
              isDownPaymentPaid: sinal > 0 || statusStr.toLowerCase().includes("sinal"),
              isPaid: (val - sinal) <= 0 && val > 0,
              createdAt: serverTimestamp()
            });
            batchCount++;
            totalImported++;
          } else if (isServicesTab) {
             const nameRaw = row[0] || "";
             const prazoRaw = row[1] || "";
             const priceRaw = row[2] || "";

             if (!nameRaw || normalize(nameRaw) === 'servico' || normalize(nameRaw) === 'tabela de valores') continue;

             const pr = parseInt(String(prazoRaw).replace(/\D/g, ''), 10) || 0;
             let price = parseFloat(String(priceRaw).replace('R$','').replace(/\./g,'').replace(',','.').trim());
             if (isNaN(price)) price = 0;

             const newRef = doc(collection(db, "services"));
             batch.set(newRef, {
               name: nameRaw,
               price: price,
               deadlineDays: pr,
               createdAt: serverTimestamp()
             });
             batchCount++;
             totalImported++;
          }
          
          if (batchCount >= 400) {
            await batch.commit();
            batch = writeBatch(db);
            batchCount = 0;
          }
        }
      }
      
      if (batchCount > 0) {
        await batch.commit();
      }
      
      setSuccessMsg(`Sucesso! ${totalImported} registros foram importados das abas.`);
      setSpreadsheetId("");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Falha ao importar.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-stahl-dark/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black uppercase tracking-tighter text-[#0F9D58]">
            Sincronizar Google Sheets
          </h3>
          <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-stahl-dark transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <p className="text-sm text-slate-500 mb-6">
          Para importar dados da sua planilha no Google Sheets (buscará automaticamente em todas as abas), insira o ID da planilha abaixo ou a URL completa. 
          O sistema pedirá acesso à sua conta Google para leitura.
        </p>

        {error && <div className="mb-4 bg-red-50 text-red-600 border border-red-200 text-xs font-bold p-4">{error}</div>}
        {successMsg && <div className="mb-4 bg-green-50 text-green-600 border border-green-200 text-xs font-bold p-4">{successMsg}</div>}

        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1 block">ID da Planilha ou URL *</label>
            <input 
              placeholder="Ex: 1BxiMVs0XRY..."
              type="text"
              className="w-full border-2 border-slate-200 py-3 outline-none focus:border-[#0F9D58] transition-colors text-slate-900 text-sm px-4 mb-4"
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 mb-6 bg-amber-50 p-4 border border-amber-200 rounded-sm">
            <input 
              type="checkbox" 
              id="clearBeforeImport" 
              className="w-4 h-4 text-[#000]"
              checked={clearBeforeImport}
              onChange={(e) => setClearBeforeImport(e.target.checked)}
            />
            <label htmlFor="clearBeforeImport" className="text-xs font-bold text-amber-800">
              Limpar dados existentes antes de importar
            </label>
          </div>

          <div className="pt-2 flex gap-4">
            <button 
              onClick={handleImport}
              disabled={isImporting || !spreadsheetId}
              className="flex-1 bg-[#0F9D58] text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-green-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
              {isImporting ? 'Sincronizando...' : 'Iniciar Sincronização'}
            </button>
            <button type="button" onClick={onClose} className="px-6 py-4 border-2 border-slate-100 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors disabled:opacity-50" disabled={isImporting}>
              Fechar
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

