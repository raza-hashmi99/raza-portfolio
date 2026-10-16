"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

// Skills

const skills = [

  { name: "Node.js", type: "Backend Runtime", level: 92 },

  { name: "NestJS", type: "Backend Framework", level: 88 },

  { name: "REST APIs", type: "Backend", level: 94 },

  { name: "React", type: "Frontend Library", level: 84 },

  { name: "Next.js", type: "Frontend Framework", level: 84 },

  { name: "TypeScript", type: "Programming", level: 82 },

  { name: "Tailwind CSS", type: "Styling", level: 82 },

  { name: "PostgreSQL", type: "Database", level: 86 },

  { name: "Supabase", type: "Database", level: 84 },

  { name: "Prisma", type: "ORM", level: 82 },

  { name: "Git / GitHub", type: "Tools", level: 90 },

  { name: "Postman", type: "API Tool", level: 91 },

];

// Projects

const projects = [

  {

    id: "01",

    name: "PROJECT NBT",

    category: "FULL-STACK SOCIAL PLATFORM",

    description:

      "A social platform backend featuring authentication, OTP verification, profiles, events, clubs and membership management, with API services designed to support a full application.",

    stack: ["NestJS", "PostgreSQL", "Supabase", "Prisma"],

    status: "BUILDING",

    details: [

      "Authentication and OTP verification",

      "User profile management",

      "Event management",

      "Club and membership systems",

      "Supabase integration",

      "REST API development",

    ],

  },

  {

    id: "02",

    name: "MILO",

    category: "AI PERSONAL ASSISTANT",

    description:

      "An AI-powered desktop assistant focused on voice interaction, speech recognition, automation and computer control.",

    stack: ["Python", "AI", "Speech", "Automation"],

    status: "BUILDING",

    details: [

      "Voice interaction",

      "Speech recognition",

      "Text-to-speech",

      "Desktop automation",

      "Mouse and keyboard control",

      "AI command processing",

    ],

  },

  {

    id: "03",

    name: "AIMEX",

    category: "EDUCATION PLATFORM",

    description:

      "A modern education website for AimEx Science Academy featuring responsive pages, course information, results, faculty and interactive experiences.",

    stack: ["Next.js", "React", "Tailwind", "Three.js"],

    status: "COMPLETED",

    details: [

      "Responsive education interface",

      "Course information",

      "Faculty and results sections",

      "Interactive 3D experience",

      "Modern navigation",

      "Mobile responsive implementation",

    ],

  },

  {

    id: "04",

    name: "COPYKART",

    category: "POS & INVENTORY SYSTEM",

    description:

      "A stationery business system concept designed around billing, inventory management, barcode scanning, SKU tracking and reporting.",

    stack: ["Web", "POS", "Inventory", "Barcode"],

    status: "CONCEPT",

    details: [

      "POS workflow",

      "Inventory management",

      "Barcode scanning",

      "SKU tracking",

      "Billing workflow",

      "Reporting architecture",

    ],

  },

];

// Home

export default function Home() {

  const [loaded, setLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleOutsidePointer = (event: PointerEvent) => {
      if (
        navbarRef.current &&
        event.target instanceof Node &&
        !navbarRef.current.contains(event.target)
      ) {
        event.preventDefault();
        event.stopPropagation();
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointer, true);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer, true);
    };
  }, [isMobileMenuOpen]);

    const [selectedProject, setSelectedProject] =

    useState<(typeof projects)[number] | null>(null);

  const [activeShowcaseIndex, setActiveShowcaseIndex] = useState(0);
  const skillsTrackRef = useRef<HTMLDivElement | null>(null);
  const skillsDragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

  const scrollSkills = (direction: -1 | 1) => {
    const track = skillsTrackRef.current;
    if (!track) return;

    track.scrollBy({
      left: direction * Math.max(track.clientWidth * 0.72, 260),
      behavior: "smooth",
    });
  };

  const handleSkillsPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = skillsTrackRef.current;
    if (!track || event.pointerType === "touch") return;

    skillsDragRef.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };
    track.classList.add("is-dragging");
    track.setPointerCapture(event.pointerId);
  };

  const handleSkillsPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = skillsTrackRef.current;
    if (!track || !skillsDragRef.current.isDragging) return;

    event.preventDefault();
    track.scrollLeft =
      skillsDragRef.current.scrollLeft -
      (event.clientX - skillsDragRef.current.startX);
  };

  const handleSkillsPointerUp = () => {
    const track = skillsTrackRef.current;
    skillsDragRef.current.isDragging = false;
    track?.classList.remove("is-dragging");
  };

  const showcaseProjects = [

    { ...projects[2], showcaseNumber: "01", displayName: "AimEx Science Academy" },

    { ...projects[0], showcaseNumber: "02", displayName: "Project NBT" },

    { ...projects[1], showcaseNumber: "03", displayName: "Milo" },

    { ...projects[3], showcaseNumber: "04", displayName: "CopyKart" },

  ];

  const activeShowcaseProject = showcaseProjects[activeShowcaseIndex];

  useEffect(() => {

    document.documentElement.setAttribute("data-theme", "light");

    const timer = setTimeout(() => {

      setLoaded(true);

    }, 1800);

    return () => clearTimeout(timer);

  }, []);

  useEffect(() => {

    const handleEscape = (event: KeyboardEvent) => {

      if (event.key === "Escape") {

        setSelectedProject(null);

      }

    };

    window.addEventListener("keydown", handleEscape);

    return () => {

      window.removeEventListener("keydown", handleEscape);

    };

  }, []);

  useEffect(() => {
    const shouldLockScroll = isMobileMenuOpen || selectedProject !== null;
    document.body.style.overflow = shouldLockScroll ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, selectedProject]);

  useEffect(() => {

    let animationFrame = 0;

    const handleMouseMove = (event: MouseEvent) => {

      if (animationFrame) {

        return;

      }

      animationFrame = window.requestAnimationFrame(() => {

        document.documentElement.style.setProperty(

          "--mouse-x",

          `${event.clientX}px`

        );

        document.documentElement.style.setProperty(

          "--mouse-y",

          `${event.clientY}px`

        );

        animationFrame = 0;

      });

    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {

      window.removeEventListener("mousemove", handleMouseMove);

      if (animationFrame) {

        window.cancelAnimationFrame(animationFrame);

      }

    };

  }, []);

  if (!loaded) {

    return (

      <main className="boot-screen">

        <div className="boot-grid" />

        <div className="boot-content">

          <div className="boot-logo">

            <img src="/profile.jpg" alt="Raza Hashmi" />

          </div>

          <div className="boot-title">RAZA.EXE</div>

          <div className="boot-subtitle">

            FULL-STACK DEVELOPER // SYSTEM BOOT

          </div>

          <div className="boot-status">

            <span className="status-dot" />

            INITIALIZING DEVELOPER SYSTEM

          </div>

          <div className="boot-bar">

            <div className="boot-progress" />

          </div>

          <div className="boot-text">

            LOADING DEVELOPER MODULES...

          </div>

        </div>

        <div className="boot-corner boot-corner-one">

          RZ // 01

        </div>

        <div className="boot-corner boot-corner-two">

          SYSTEM ONLINE

        </div>

      </main>

    );

  }

  return (

    <main className="portfolio">

      <div className="ambient ambient-one" />

      <div className="ambient ambient-two" />

      <div className="grid-background" />

      <header
        ref={navbarRef}
        className={`navbar${isMobileMenuOpen ? " mobile-menu-open" : ""}`}
      >

        <a href="#" className="brand" onClick={() => setIsMobileMenuOpen(false)}>

          <span className="brand-mark">

            <img src="/favicon.ico" alt="Raza Hashmi logo" />

          </span>

          <span className="brand-name">

            RAZA<span>.DEV</span>

          </span>

        </a>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="portfolio-navigation"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="portfolio-navigation" className={`desktop-nav${isMobileMenuOpen ? " is-open" : ""}`}>

          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>

          <a href="#stack" onClick={() => setIsMobileMenuOpen(false)}>Stack</a>

          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Work</a>

          <a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>

          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>

        </nav>

        <div className="navbar-actions">

          <div className="availability">

            <span />

            Available for work

          </div>

        </div>

      </header>

      {/* Hero */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-eyebrow">

            <span className="eyebrow-line" />

            FULL-STACK DEVELOPER <span className="hero-focus">// BACKEND-FOCUSED</span>

          </div>

          <h1 className="hero-title">

            <span className="hero-name-solid">RAZA</span>

            <span className="hero-name-outline">HASHMI</span>

          </h1>

          <p className="hero-description">

            I build complete web applications — from responsive frontend experiences to reliable APIs and scalable backend systems.

          </p>

          <div className="hero-buttons">

            <a href="#projects" className="button-primary">

              Explore my work

              <span>↗</span>

            </a>

            <a href="#contact" className="button-secondary">

              Let&apos;s connect

            </a>

            <a

              href="/Raza-Hashmi-CV.pdf"

              download="Raza-Hashmi-CV.pdf"

              className="button-secondary"

            >

              Download CV

              <span>↓</span>

            </a>

          </div>

          <div className="hero-tech">

            <span>Currently working with</span>

            <div>

              <b>Next.js</b>

              <i />

              <b>React</b>

              <i />

              <b>NestJS</b>

              <i />

              <b>PostgreSQL</b>

            </div>

          </div>

        </div>

        {/* Futuristic Backend Core  */}

        <div className="hero-visual futuristic-core-visual">

          <div className="core-grid" />

          <div className="core-glow" />

          <div className="core-orbit core-orbit-one">

            <span className="core-orbit-dot dot-one" />

          </div>

          <div className="core-orbit core-orbit-two">

            <span className="core-orbit-dot dot-two" />

          </div>

          <div className="core-orbit core-orbit-three">

            <span className="core-orbit-dot dot-three" />

          </div>

          <div className="core-ring ring-outer" />

          <div className="core-ring ring-middle" />

          <div className="core-ring ring-inner" />

          <div className="core-system">

            <div className="core-system-lines" />

            <div className="core-center">

              <span className="core-center-label">RAZA.OS</span>

              <strong>ONLINE</strong>

              <i />

            </div>

            <span className="core-node node-api">

              API

            </span>

            <span className="core-node node-node">

              NODE.JS

            </span>

            <span className="core-node node-db">

              POSTGRESQL

            </span>

            <span className="core-node node-nest">

              NESTJS

            </span>

            <span className="core-packet packet-one" />

            <span className="core-packet packet-two" />

            <span className="core-packet packet-three" />

            <span className="core-packet packet-four" />

          </div>

          <div className="core-label core-label-top">

            <span>SYS / 001</span>

            <b>BACKEND CORE</b>

          </div>

          <div className="core-label core-label-bottom">

            <span className="core-live-dot" />

            SYSTEM OPERATIONAL

          </div>

          <div className="core-side-label side-left">

            <span>01</span>

            REQUEST

          </div>

          <div className="core-side-label side-right">

            RESPONSE

            <span>04</span>

          </div>

        </div>

      </section>

      {/* About */}

      <section id="about" className="section about-section">

        <div className="section-intro">

          <span className="section-label">01 / ABOUT</span>

          <h2>

            From interface

            <br />

            <em>to infrastructure.</em>

          </h2>

        </div>

        <div className="about-content">

          <div className="about-copy">

            <p className="about-lead">

              I&apos;m a full-stack developer who can build modern interfaces and the systems behind them, with a stronger focus on backend engineering.

            </p>

            <p>

              I work across responsive UI development, API integration, authentication, databases and server-side logic. I enjoy connecting the frontend and backend into one reliable product.

            </p>

            <p>

              My approach is simple: understand the problem, build a clear user experience, design reliable systems and keep improving the product.

            </p>

          </div>

          <div className="about-facts">

            <div className="fact">

              <span>ROLE</span>

              <strong>Full-Stack Developer</strong>

            </div>

            <div className="fact">

              <span>COMPANY</span>

              <strong>NerdTech Software</strong>

            </div>

            <div className="fact">

              <span>EDUCATION</span>

              <strong>B.Tech</strong>

            </div>

            <div className="fact">

              <span>PRIMARY FOCUS</span>

              <strong>API &amp; System Design</strong>

            </div>

            <div className="fact">

              <span>DATABASE</span>

              <strong>PostgreSQL</strong>

            </div>

          </div>

        </div>

      </section>

      {/* Stack */}

      <section id="stack" className="section stack-section">

        <div className="section-top">

          <div className="section-intro">

            <span className="section-label">02 / TECH STACK</span>

            <h2>

              Tools I use to

              <br />

              <em>build.</em>

            </h2>

          </div>

          <p>

            A balanced web stack for responsive interfaces, API development, data management and reliable application architecture.

          </p>

        </div>

        <div className="skills-carousel">
          <button
            type="button"
            className="skills-carousel-arrow skills-carousel-arrow-left"
            onClick={() => scrollSkills(-1)}
            aria-label="Scroll skills left"
          >
            ‹
          </button>

          <div
            className="skills-grid"
            ref={skillsTrackRef}
            onPointerDown={handleSkillsPointerDown}
            onPointerMove={handleSkillsPointerMove}
            onPointerUp={handleSkillsPointerUp}
            onPointerCancel={handleSkillsPointerUp}
            onLostPointerCapture={handleSkillsPointerUp}
            aria-label="Technology skills. Swipe or drag to see more."
          >
            {skills.map((skill, index) => (
              <article className="skill-card" key={skill.name}>
                <div className="skill-card-top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{skill.type}</span>
                </div>
                <h3>{skill.name}</h3>
                <div className="skill-progress">
                  <span style={{ width: `${skill.level}%` }} />
                </div>
                <div className="skill-card-bottom">
                  <span>Proficiency</span>
                  <strong>{skill.level}%</strong>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="skills-carousel-arrow skills-carousel-arrow-right"
            onClick={() => scrollSkills(1)}
            aria-label="Scroll skills right"
          >
            ›
          </button>
        </div>

      </section>

      {/* Projects */}

      <section id="projects" className="section projects-section">

        <div className="section-top projects-showcase-heading">

          <div className="section-intro">

            <span className="section-label">03 / SELECTED WORK</span>

            <h2>

              Projects built

              <br />

              <em>with purpose.</em>

            </h2>

          </div>

          <p>

            Explore selected projects, the systems behind them, and the

            technologies used to bring each idea to life.

          </p>

        </div>

        <div className="project-showcase">

          <div className="project-showcase-list" role="tablist" aria-label="Select a project">

            {showcaseProjects.map((project, index) => (

              <button

                type="button"

                role="tab"

                aria-selected={activeShowcaseIndex === index}

                className={`project-showcase-tab ${activeShowcaseIndex === index ? "is-active" : ""}`}

                key={project.id}

                onClick={() => setActiveShowcaseIndex(index)}

              >

                <span className="showcase-tab-number">{project.showcaseNumber}</span>

                <span className="showcase-tab-name">{project.displayName}</span>

                <span className="showcase-tab-arrow">↗</span>

              </button>

            ))}

          </div>

          <article className="project-showcase-panel" role="tabpanel" key={activeShowcaseProject.id}>

            <div className={`showcase-panel-ambient showcase-ambient-${activeShowcaseProject.id}`} />

            <div className="showcase-panel-top">

              <span className="showcase-panel-index">{activeShowcaseProject.showcaseNumber} / PROJECT</span>

              <span className={`project-badge ${activeShowcaseProject.status === "BUILDING" ? "building" : ""}`}>

                <i />

                {activeShowcaseProject.status}

              </span>

            </div>

            <div className="showcase-panel-main">

              <span className="project-card-category">{activeShowcaseProject.category}</span>

              <h3>{activeShowcaseProject.displayName}</h3>

              <p>{activeShowcaseProject.description}</p>

              <div className="showcase-details">

                <span className="showcase-details-label">PROJECT HIGHLIGHTS</span>

                <div className="showcase-detail-list">

                  {activeShowcaseProject.details.map((detail) => (

                    <span key={detail}>

                      <i>↗</i>

                      {detail}

                    </span>

                  ))}

                </div>

              </div>

            </div>

            <div className="showcase-panel-footer">

              <div className="project-card-tags">

                {activeShowcaseProject.stack.map((tech) => (

                  <span key={tech}>{tech}</span>

                ))}

              </div>

              <button

                type="button"

                className="project-card-arrow"

                onClick={() => setSelectedProject(activeShowcaseProject)}

                aria-label={`View details for ${activeShowcaseProject.displayName}`}

              >

                ↗

              </button>

            </div>

          </article>

        </div>

      </section>

      {/* Architecture */}

      <section className="section architecture-section">

        <div className="section-top">

          <div className="section-intro">

            <span className="section-label">

              04 / ARCHITECTURE

            </span>

            <h2>

              From request

              <br />

              <em>to response.</em>

            </h2>

          </div>

          <p>

            I build applications as connected layers, from the user interface through APIs and business logic to the database, with each part having a clear responsibility.

          </p>

        </div>

        <div className="architecture-flow">

          <div className="architecture-step">

            <span>01</span>

            <strong>CLIENT</strong>

            <small>REACT / NEXT.JS</small>

          </div>

          <div className="flow-arrow">→</div>

          <div className="architecture-step">

            <span>02</span>

            <strong>API</strong>

            <small>REST / HTTP</small>

          </div>

          <div className="flow-arrow">→</div>

          <div className="architecture-step">

            <span>03</span>

            <strong>SERVICE</strong>

            <small>BUSINESS LOGIC</small>

          </div>

          <div className="flow-arrow">→</div>

          <div className="architecture-step">

            <span>04</span>

            <strong>DATABASE</strong>

            <small>POSTGRESQL</small>

          </div>

        </div>

      </section>

      {/* Experience */}

      <section

        id="experience"

        className="section experience-section"

      >

        <div className="section-intro">

          <span className="section-label">05 / EXPERIENCE</span>

          <h2>

            Learning,

            <br />

            <em>building, growing.</em>

          </h2>

        </div>

        <div className="timeline">

          <div className="timeline-item">

            <div className="timeline-marker">01</div>

            <div className="timeline-content">

              <span>FOUNDATION</span>

              <h3>Learning &amp; Building</h3>

              <p>

                Started building software projects and exploring

                programming fundamentals through hands-on work.

              </p>

            </div>

          </div>

          <div className="timeline-item">

            <div className="timeline-marker">02</div>

            <div className="timeline-content">

              <span>DEVELOPMENT</span>

              <h3>Full-Stack Development</h3>

              <p>

                Built skills across React, Next.js, API integration, Node.js, databases and server-side application development.

              </p>

            </div>

          </div>

          <div className="timeline-item">

            <div className="timeline-marker">03</div>

            <div className="timeline-content">

              <span>PROFESSIONAL</span>

              <h3>NerdTech Software Company</h3>

              <p>

                Working as a Backend Developer on real-world software systems, API development and backend workflows, while continuing to build frontend skills.

              </p>

            </div>

          </div>

          <div className="timeline-item">

            <div className="timeline-marker">04</div>

            <div className="timeline-content">

              <span>CURRENT</span>

              <h3>Leveling Up</h3>

              <p>

                Continuously improving full-stack application development, backend architecture, API design, databases and modern engineering practices.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Contact */}

      <section id="contact" className="contact-section">

        <div className="contact-shell">

          <div className="contact-kicker">06 / CONTACT</div>

          <div className="contact-layout">

            <div className="contact-intro">

              <h2 className="contact-title">

                Have something

                <span>worth building?</span>

              </h2>

              <p className="contact-description">

                Whether it&apos;s a project, opportunity or just an idea, I&apos;d be happy to connect.

              </p>

              <div className="contact-status">

                <span className="contact-status-dot" />

                <span>Available for new opportunities</span>

              </div>

            </div>

            <div className="contact-panel">

              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mdrazahashmi1583%40gmail.com" target="_blank" rel="noreferrer" className="contact-card">

                <div>

                  <span className="contact-card-label">

                    <span className="contact-brand-icon email-icon" aria-hidden="true">

                      <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>

                    </span>

                    EMAIL

                  </span>

                  <span className="contact-card-value">mdrazahashmi1583@gmail.com</span>

                </div>

                <span className="contact-arrow" aria-hidden="true">↗</span>

              </a>

              <div className="contact-links">

                <a href="https://github.com/raza-hashmi99" target="_blank" rel="noreferrer" className="contact-small-card">

                  <span className="contact-link-main">

                    <span className="contact-brand-icon" aria-hidden="true">

                      <svg viewBox="0 0 24 24"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.18 3.03 1.55.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.51.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z"/></svg>

                    </span>

                    <span>GitHub</span>

                  </span>

                  <span aria-hidden="true">↗</span>

                </a>

                <a href="https://www.linkedin.com/in/raza-hashmi-bb0233435" target="_blank" rel="noreferrer" className="contact-small-card">

                  <span className="contact-link-main">

                    <span className="contact-brand-icon" aria-hidden="true">

                      <svg viewBox="0 0 24 24"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM8 18H5V9h3v9ZM6.5 7.77a1.74 1.74 0 1 1 0-3.48 1.74 1.74 0 0 1 0 3.48ZM19 18h-3v-4.38c0-1.05-.02-2.4-1.46-2.4-1.46 0-1.69 1.14-1.69 2.32V18h-3V9h2.88v1.23h.04c.4-.71 1.38-1.46 2.84-1.46C18.65 8.77 19 10.7 19 13.2V18Z"/></svg>

                    </span>

                    <span>LinkedIn</span>

                  </span>

                  <span aria-hidden="true">↗</span>

                </a>

                <a href="/Raza-Hashmi-CV.pdf" download="Raza-Hashmi-CV.pdf" className="contact-small-card contact-cv-card">

                  <span className="contact-link-main">

                    <span className="contact-brand-icon pdf-icon" aria-hidden="true">

                      <svg viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M8 15h8M8 18h6"/></svg>

                    </span>

                    <span>Download CV</span>

                  </span>

                  <span aria-hidden="true">↓</span>

                </a>

              </div>

            </div>

          </div>

          <footer className="contact-bottom">

            <span>RAZA.DEV</span>

            <span>FULL-STACK DEVELOPER • BACKEND-FOCUSED</span>

            <span>© 2026</span>

          </footer>

        </div>

      </section>

      {/* Project Modal */}

      {selectedProject && (

        <div

          className="project-modal-overlay"

          onClick={(event) => {

            if (event.target === event.currentTarget) {

              setSelectedProject(null);

            }

          }}

        >

          <div

            className="project-modal"

            role="dialog"

            aria-modal="true"

            aria-labelledby="project-modal-title"

          >

            <button

              type="button"

              className="modal-close"

              onClick={() => setSelectedProject(null)}

              aria-label="Close project"

            >

              ×

            </button>

            <span className="section-label">

              PROJECT {selectedProject.id}

            </span>

            <span className="modal-category">

              {selectedProject.category}

            </span>

            <h2 id="project-modal-title">

              {selectedProject.name}

            </h2>

            <p className="modal-description">

              {selectedProject.description}

            </p>

            <div className="modal-details">

              <span>SYSTEM MODULES</span>

              {selectedProject.details.map((detail) => (

                <div key={detail}>

                  <b>✓</b>

                  <span>{detail}</span>

                </div>

              ))}

            </div>

            <div className="project-card-tags modal-tags">

              {selectedProject.stack.map((tech) => (

                <span key={tech}>{tech}</span>

              ))}

            </div>

            <div className="modal-status">

              <span>STATUS</span>

              <strong>{selectedProject.status}</strong>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}