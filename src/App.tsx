import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
  Edit
} from "lucide-react";

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

const Portfolio = () => {
  const projects = [
    {
      title: "Stahl Tech Web",
      category: "Web Design",
      image: "/portfolio-stahl.png",
      desc: "Site institucional focado em serviços de TI e Web Design com identidate visual de alto impacto.",
      url: "#",
      features: "Personalizado, Otimizado, Formulários"
    },
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

  return (
    <section id="portfolio" className="py-32 bg-stahl-deep border-y border-white/5 relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-stahl-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10"
        >
          <div>
            <div className="micro-label mb-4 text-stahl-cyan">Projetos Recentes</div>
            <h2 className="text-5xl font-black uppercase tracking-tighter">Serviços Realizados</h2>
            <p className="mt-6 text-white/40 max-w-xl">
              Criação de layout personalizado, integração com formulários de contato e otimização de performance para diversos setores.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {projects.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 40px -20px rgba(0, 243, 255, 0.3)"
              }}
              className="group bg-stahl-dark/40 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-stahl-cyan/30 transition-all duration-300 h-full flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden bg-white/5 flex items-center justify-center">
                <a 
                  href={p.url === '#' ? undefined : p.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`block w-full h-full relative cursor-pointer ${p.url === '#' ? 'pointer-events-none' : ''}`}
                >
                  <img 
                    src={p.image} 
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
                  <div className="absolute inset-0 bg-stahl-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="p-4 bg-stahl-cyan text-white rounded-full hover:scale-110 transition-transform shadow-xl shadow-stahl-cyan/20">
                      <ExternalLink className="w-6 h-6" />
                    </div>
                  </div>
                </a>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-[10px] uppercase font-black tracking-widest text-stahl-cyan mb-2">{p.category}</div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">{p.title}</h3>
                <p className="text-white/50 text-sm mb-6 leading-relaxed flex-grow">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.features.split(", ").map((f, fi) => (
                    <span key={fi} className="text-[9px] uppercase font-bold tracking-widest border border-white/10 bg-white/5 px-2 py-1 text-white/40 group-hover:text-white/60 transition-colors">
                      {f}
                    </span>
                  ))}
                </div>
                {p.url !== '#' && (
                  <a 
                    href={p.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-white/40 hover:text-stahl-cyan transition-colors group/link"
                  >
                    <span>Visitar Projeto</span>
                    <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
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
      name: "Daniel Lopes",
      role: "CEO Athom",
      text: "Performance impecável. Percebemos o aumento nas conversões logo na primeira semana de lançamento da página.",
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
                Olá! Sou apaixonado por resolver problemas através da tecnologia. Aos 29 anos, resido em <strong>Limeira - SP</strong>, sou casado com a maravilhosa Nicolly e pai.
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
                <a href="https://wa.link/0cy014" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold hover:text-stahl-cyan transition-colors">(19) 98441-1208</a>
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

        <a href="/admin" className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors">
          Admin
        </a>
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
    window.open(`https://wa.me/5519984411208?text=${encodedText}`, "_blank");
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
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";

const AdminLogin = () => {
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("stahltechweb@gmail.com");
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

    if (email.trim().toLowerCase() !== "stahltechweb@gmail.com") {
      setErrorMessage("Somente o e-mail stahltechweb@gmail.com possui acesso à área administrativa.");
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
          <a href="/" className="text-white/40 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold border-b border-white/10 pb-1">Voltar para o site</a>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'messages' | 'budgets' | 'clients'>('messages');
  const [showClientForm, setShowClientForm] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
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

    return () => {
      unsubscribeMessages();
      unsubscribeBudgets();
      unsubscribeClients();
    };
  }, []);

  const handleLogout = () => signOut(auth);

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setShowClientForm(true);
  };

  const handleDeleteClient = async (id: string) => {
    if (window.confirm("Deseja realmente excluir este cliente?")) {
      try {
        await deleteDoc(doc(db, "clients", id));
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b pb-8 gap-6 text-center md:text-left">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Dashboard Admin</h1>
            <p className="text-slate-500">Stahl Tech & Web - Gestão de Contatos</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigate("/")} className="px-4 py-2 text-xs font-bold uppercase border border-slate-300 hover:bg-slate-100 transition-colors">Ver Site</button>
            <button onClick={handleLogout} className="px-4 py-2 text-xs font-bold uppercase bg-red-600 text-white hover:bg-red-700 transition-colors">Sair</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 font-black uppercase tracking-tight transition-colors ${activeTab === 'messages' ? 'bg-stahl-cyan text-white' : 'bg-white text-slate-400 hover:bg-slate-100'}`}
          >
            Mensagens ({messages.length})
          </button>
          <button 
            onClick={() => setActiveTab('budgets')}
            className={`px-6 py-3 font-black uppercase tracking-tight transition-colors ${activeTab === 'budgets' ? 'bg-stahl-cyan text-white' : 'bg-white text-slate-400 hover:bg-slate-100'}`}
          >
            Orçamentos ({budgets.length})
          </button>
          <button 
            onClick={() => setActiveTab('clients')}
            className={`px-6 py-3 font-black uppercase tracking-tight transition-colors ${activeTab === 'clients' ? 'bg-stahl-cyan text-white' : 'bg-white text-slate-400 hover:bg-slate-100'}`}
          >
            Clientes ({clients.length})
          </button>
        </div>

        <div className="bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 uppercase tracking-tight">
              {activeTab === 'messages' && <Mail className="w-5 h-5 text-stahl-cyan" />}
              {activeTab === 'budgets' && <Zap className="w-5 h-5 text-stahl-cyan" />}
              {activeTab === 'clients' && <Users className="w-5 h-5 text-stahl-cyan" />}
              
              {activeTab === 'messages' && 'Mensagens do Site'}
              {activeTab === 'budgets' && 'Solicitações de Orçamentos'}
              {activeTab === 'clients' && 'Cadastro de Clientes'}
            </h2>
            
            {activeTab === 'clients' && (
              <button 
                onClick={() => setShowClientForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-stahl-dark text-white text-xs font-bold uppercase hover:bg-stahl-dark/90 transition-colors"
              >
                <Plus className="w-4 h-4" /> Novo Cliente
              </button>
            )}
          </div>
          
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
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b text-xs uppercase tracking-wider text-slate-400 font-black">
                      <th className="pb-4">Data</th>
                      <th className="pb-4">Nome</th>
                      <th className="pb-4">Serviço</th>
                      <th className="pb-4">Local</th>
                      <th className="pb-4">Contato</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {budgets.map((b) => (
                      <tr key={b.id} className="text-sm">
                        <td className="py-4 font-mono text-[10px] whitespace-nowrap pr-4">{b.createdAt?.toDate?.()?.toLocaleString() || 'Processando...'}</td>
                        <td className="py-4 font-bold pr-4">{b.nome}</td>
                        <td className="py-4 text-stahl-cyan font-black uppercase text-[10px] pr-4">{b.servico}</td>
                        <td className="py-4 text-slate-600 pr-4">{b.cidade} / {b.cep}</td>
                        <td className="py-4 text-slate-600">
                          {b.email}<br/>
                          <span className="font-bold">{b.telefone}</span>
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
        </div>
      </div>

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
