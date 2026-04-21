import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
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
  Quote
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
        TECH WEB
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
      title: "Manutenção de PCs",
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
      title: "Michele Braz",
      category: "Web Design",
      image: "/portfolio-michele.png",
      desc: "Landing page para psicologia focada em captação de pacientes e profissionalismo.",
      url: "https://psicomichelebraz.vercel.app/",
      features: "Suave, Responsivo, Agendamento"
    },
    {
      title: "Athom Academia",
      category: "Web Design",
      image: "/portfolio-athom.png",
      desc: "Plataforma focada em conversão e engajamento para uma academia moderna.",
      url: "https://athom-academia-838260676759.us-west1.run.app/",
      features: "Dinâmico, CTA Forte, Performance"
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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="text-[12px] uppercase tracking-[0.15em] font-bold text-stahl-cyan mb-6">Sobre Nós</div>
          <h2 className="text-6xl font-black uppercase tracking-tighter mb-10 leading-[0.9]">Excelência Técnica e Criatividade Digital</h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Na <strong>Stahl Tech Web</strong>, unimos o suporte técnico especializado à inovação do design digital. Somos especialistas em manter sua infraestrutura de hardware em perfeito estado enquanto construímos sua presença online com sites de alta performance e identidades visuais marcantes. Nossa missão é garantir que sua tecnologia nunca pare e que sua marca sempre se destaque.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            {[
              "Manutenção Especializada",
              "Design de Identidade",
              "Seg a Sáb até 22h",
              "Performance Web"
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                className="flex items-center gap-4 border-l-4 border-stahl-cyan pl-4 bg-white p-4 shadow-sm"
              >
                <span className="font-black uppercase tracking-tight text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                <a href="https://w.app/stahtechweb" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold hover:text-stahl-cyan transition-colors">(19) 98441-1208</a>
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
          © {new Date().getFullYear()} Stahl Tech Web. All rights reserved.
        </p>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans">
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
}
