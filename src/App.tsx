import React, { useState, useEffect } from 'react';

// ==========================================
// CONSTANTES DE CONFIGURAÇÃO E DADOS
// ==========================================

const NAME_TO_TYPE = "Felipe A. J.";
const TYPING_SPEED_MS = 150;

const PROJECTS = [
  {
    title: "Lorem Ipsum I",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum mi sed vulputate pulvinar. Proin accumsan, urna vel sodales aliquet, nisl lorem sodales.",
  },
  {
    title: "Lorem Ipsum II",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum mi sed vulputate pulvinar. Proin accumsan, urna vel sodales aliquet, nisl lorem sodales.",
  },
  {
    title: "Lorem Ipsum III",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum mi sed vulputate pulvinar. Proin accumsan, urna vel sodales aliquet, nisl lorem sodales.",
  },
];

// Ícones SVG limpos, sem propriedades redundantes e otimizados para renderização rápida
const SKILLS = [
  {
    name: "TypeScript",
    icon: (
      <svg className="w-12 h-12 text-[#3178c6]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm16.711 9.423c.968 0 1.76.242 2.376.726.616.484.924 1.199.924 2.145 0 .429-.077.83-.231 1.205a2.68 2.68 0 01-.643.946c-.275.253-.616.451-1.023.594-.407.143-.875.215-1.403.215-.363 0-.743-.044-1.139-.132a5.448 5.448 0 01-1.072-.374l.462-1.749c.308.143.627.264.957.363.33.099.649.149.957.149.528 0 .94-.116.446-1.089 0-.418-.138-.737-.413-.957-.275-.22-.72-.33-1.336-.33h-.638V9.423h2.516zm-7.733 0v1.738H8.041v7.623H5.973V11.161H3.905V9.423h6.198z" />
      </svg>
    )
  },
  {
    name: "React",
    icon: (
      <svg className="w-12 h-12 text-[#61dafb] animate-[spin_12s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    )
  },
  {
    name: "JavaScript",
    icon: (
      <svg className="w-12 h-12 text-[#f7df1e]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm21.3 17.5c-.3-.5-.8-.9-1.5-1.1-.7-.2-1-.3-1.6-.5-.6-.2-.8-.4-.8-.7 0-.3.2-.6.7-.6.5 0 .8.2 1.1.6l1.5-1c-.5-.8-1.2-1.3-2.3-1.4-.9-.1-1.8.2-2.3.9-.5.6-.7 1.4-.7 2.2 0 1 .3 1.8 1 2.3.7.5 1.5.7 2.4.9.9.2 1.2.4 1.2.8 0 .4-.4.7-.9.7-.7 0-1.1-.3-1.4-.9l-1.5 1c.5 1 1.4 1.5 2.7 1.5 1 0 1.9-.3 2.4-1 .6-.6.8-1.4.8-2.3.1-1.1-.2-1.7-.8-2.3zm-7.9-2.2H11.3v5.8c0 .8-.1 1.3-.4 1.6-.3.3-.8.4-1.5.4-.5 0-.9-.1-1.1-.3l-.3 1.6c.5.3 1.2.4 2 .4 1.4 0 2.3-.4 2.8-1.2.5-.7.6-1.8.6-3.2l.1-5.1z" />
      </svg>
    )
  },
  {
    name: "C++",
    icon: (
      <svg className="w-12 h-12 text-[#00599c]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.023 15.688L12 21.492l-10.023-5.804V4.09l10.023-5.803 10.023 5.803v11.598zm-11.135-7.48c-1.29 0-2.34 1.05-2.34 2.34v2.34c0 1.29 1.05 2.34 2.34 2.34h2.25v-1.8H11.1c-.3 0-.54-.24-.54-.54V12.9h2.25v-1.8h-2.25v-1.12c0-.3.24-.54.54-.54h2.25v-1.8H10.888zm8.512 2.724h-1.35V9.582h-.9v1.35h-1.35v.9h1.35v1.35h.9V11.83h1.35v-.9zm-3.15 3.6h-1.35v-1.35h-.9v1.35h-1.35v.9h1.35v1.35h.9V15.53h1.35v-.9z" />
      </svg>
    )
  },
  {
    name: "C#",
    icon: (
      <svg className="w-12 h-12 text-[#178600]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 17.5H8.75v-2.5H6.25v-1.75h2.5V11.5h-2.5V9.75h2.5V7h1.75v2.75h1.75V7H14v2.75h2.5v1.75H14v1.75h2.5v1.75H14v2.5h-1.75v-2.5h-1.75v-2.5zm1.75-6H10.5v1.75h1.75V11.5z" />
      </svg>
    )
  },
  {
    name: "Java",
    icon: (
      <svg className="w-12 h-12 text-[#ea2d2e]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 10.5c0 .28.02.55.06.82l.02.09c.31 1.22 1.15 2.19 2.25 2.7l.14.06c.33.13.68.23 1.05.29h.12a5.454 5.454 0 001.37.05h.1c1.25-.13 2.37-.69 3.2-1.54l.09-.1c.36-.39.64-.84.82-1.33l.03-.09c.14-.42.21-.86.21-1.31 0-1.42-.51-2.65-1.53-3.32-.47-.31-.99-.5-1.53-.56H8.25c-1.25.13-2.37.69-3.2 1.54L4.96 8c-.36.39-.64.84-.82 1.33l-.03.09c-.14.42-.21.86-.21 1.31l.1.1.2.2.1-.2zM15 16h-6a1 1 0 010-2h6a1 1 0 010 2zm2 4H5a1 1 0 010-2h12a1 1 0 010 2z" />
      </svg>
    )
  },
  {
    name: "Python",
    icon: (
      <svg className="w-12 h-12 text-[#3776ab]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9 0C5.3 0 5.6 2.9 5.6 2.9l.1 3h6.3v.9h-8.8s-3.2-.4-3.2 5.5c0 5.8 2.8 5.6 2.8 5.6h1.7v-2.4s-.1-2.9 2.8-2.9h5.6s2.9.1 2.9-2.8v-6s.3-3.8-5.8-3.8zm-3 1.9c.4 0 .8.3.8.8s-.4.8-.8.8-.8-.3-.8-.8.4-.8.8-.8zm3.1 12.2c0-5.8-2.8-5.6-2.8-5.6H7.5V11s.1 2.9-2.8 2.9H1.1v3.8c0 6.6 6.3 6.3 6.3 6.3l3.1-.1v-3h-6.3v-.9h8.8s3.2.4 3.2-5.5zm-3.1 8c-.4 0-.8-.3-.8-.8s.4-.8.8-.8.8.3.8.8-.4.8-.8.8z" />
      </svg>
    )
  },
  {
    name: "Laravel",
    icon: (
      <svg className="w-12 h-12 text-[#ff2d20]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.8 4.3l-9.1-5.2c-.4-.2-.9-.2-1.3 0L2.3 4.3c-.4.2-.7.7-.7 1.2v10.4c0 .5.3.9.7 1.2l9.1 5.2c.2.1.4.2.6.2.2 0 .4-.1.6-.2l9.1-5.2c.4-.2.7-.7.7-1.2V5.5c.1-.5-.2-1-.6-1.2zm-9.8 15.6l-7.3-4.2V7.4l7.3 4.2v8.3zm1.2-9.7l-7.3-4.2 7.3-4.2 7.3 4.2-7.3 4.2z" />
      </svg>
    )
  },
  {
    name: "Bootstrap",
    icon: (
      <svg className="w-12 h-12 text-[#7952b3]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.894 12.215c0 1.536-1.128 2.376-2.616 2.376H9.75v-4.752h3.288c1.392 0 2.256.768 2.256 1.944v.432zm-1.152-4.128c0 1.152-.96 1.776-2.208 1.776H9.75V6.311h2.952c1.224 0 2.04.576 2.04 1.536V8.087z" />
      </svg>
    )
  },
  {
    name: "HTML",
    icon: (
      <svg className="w-12 h-12 text-[#e34f26]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.613h10.512l.232-2.624H5.852l.693 7.825h8.49l-.33 3.738-2.72.776-2.72-.776-.174-1.962H6.467l.341 3.847 5.174 1.474 5.174-1.474.686-7.752H8.531z" />
      </svg>
    )
  },
  {
    name: "CSS",
    icon: (
      <svg className="w-12 h-12 text-[#1572b6]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm5.288 5.012l.693 7.825h8.49l-.33 3.738-2.72.776-2.72-.776-.174-1.962H6.467l.341 3.847 5.174 1.474 5.174-1.474.686-7.752H6.788z" />
      </svg>
    )
  }
];

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function App() {
  const [typedName, setTypedName] = useState("");

  // Efeito para simular a digitação do terminal
  useEffect(() => {
    let currentText = "";
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < NAME_TO_TYPE.length) {
        currentText += NAME_TO_TYPE.charAt(index);
        setTypedName(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, TYPING_SPEED_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans">
      
     
     

      {/* Fundo dinâmico mais leve e suave (Sem múltiplos gradientes pesados sobrepostos) */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_15%,_rgba(139,92,246,0.12),_transparent_50%)]" />

      {/* ==========================================
          APRESENTAÇÃO PRINCIPAL
          ========================================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10">
        <p className="text-cyan-400 tracking-[0.35em] text-sm mb-4 font-semibold neon-text-pulse">
          PORTFÓLIO
        </p>

        {/* Nome do topo com efeito de digitação */}
        <div className="flex items-center justify-center min-h-[96px] md:min-h-[144px]">
          <h1 className="animated-gradient relative text-5xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-default selection:bg-cyan-500/30 font-sans">
            {typedName}
          </h1>
          <span className="text-5xl md:text-8xl font-extralight text-fuchsia-500 ml-1 terminal-cursor select-none">|</span>
        </div>
        {/*=============================================
            SOBRE
          ============================================== */}
          
        <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
          Desenvolvedor focado em criar experiências web modernas, interativas e com visual futurista.
        </p>

        <div className="mt-10 flex gap-4 flex-wrap justify-center">
          <a
            href="#projetos"
            className="neon-btn-purple px-8 py-3 rounded-2xl bg-slate-900 border border-purple-500/30 hover:bg-purple-500/10 hover:scale-105 transition-all duration-300 text-purple-200 font-medium"
          >
            Ver Projetos
          </a>

          <a
            href="#contato"
            className="neon-btn-cyan px-8 py-3 rounded-2xl border border-cyan-400/30 bg-slate-950/20 text-cyan-300 hover:bg-cyan-400/10 hover:scale-105 transition-all duration-300 font-medium"
          >
            Contato
          </a>
        </div>
      </section>

      {/* ==========================================
          COMPETÊNCIAS / SKILLS (Otimizado para Layouts Fluidos)
          ========================================== */}
      <section className="relative px-6 py-20 max-w-6xl mx-auto z-10">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Skills
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500 animated-gradient mt-4 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="group rounded-2xl border border-white/10 bg-slate-900/90 px-8 py-5 text-center shadow-lg hover:-translate-y-1.5 hover:bg-slate-900 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 cursor-default flex flex-col items-center gap-3 min-w-[130px] sm:min-w-[140px]"
            >
              {/* Ícone SVG representativo da linguagem/tecnologia */}
              <div className="transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.05)]">
                {skill.icon}
              </div>
              <span className="font-medium text-slate-300 group-hover:text-white text-sm sm:text-base transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          PROJETOS (Glitch interativo ultraleve e de alta fidelidade)
          ========================================== */}
      <section id="projetos" className="relative px-6 py-20 max-w-6xl mx-auto z-10">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Projetos
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400 animated-gradient mt-4 rounded-full shadow-[0_0_8px_rgba(217,70,239,0.6)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="group rounded-3xl border border-white/10 bg-slate-900/90 p-6 lg:p-8 shadow-xl glitch-card cursor-pointer relative overflow-hidden"
            >
              {/* Contorno brilhante do topo do card */}
              <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500 animated-gradient opacity-30 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
              
              {/* Indicador Hacker decorativo */}
              <div className="absolute top-3 right-4 text-[9px] font-mono text-cyan-400/30 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 tracking-wider">
                DECRYPT_SYS // ACTIVE
              </div>

              {/* Título: roda o glitch temporizado e altera para ciano no hover */}
              <h3 
                data-text={project.title} 
                className="glitch-text glitch-title relative text-xl lg:text-2xl font-semibold mb-3 text-white transition-colors duration-300 font-mono"
              >
                {project.title}
              </h3>

              {/* Descrição: roda o glitch de forma síncrona com o título */}
              <p 
                data-text={project.desc} 
                className="glitch-text relative text-slate-400 leading-relaxed text-sm sm:text-base transition-colors duration-300"
              >
                {project.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          RODAPÉ / CONTATO
          ========================================== */}
      <footer
        id="contato"
        className="relative px-6 py-12 text-center border-t border-white/10 bg-slate-950/80 z-10"
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 font-medium">© 2026 Felipe A. J.</p>
          <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm sm:text-base">
            <a href="https://github.com/felipecti2012-sudo" className="hover:text-cyan-400 transition-colors hover:drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]">GitHub</a>
            <a href="https://www.linkedin.com/in/felipe-assun%C3%A7%C3%A3o-89a817395/" className="hover:text-cyan-400 transition-colors hover:drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]">LinkedIn</a>
            <a href="mailto:felipecti2012@gmail.com" className="hover:text-cyan-400 transition-colors hover:drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]">Gmail</a>
          </div>
        </div>
      </footer>
    </main>
  );
}