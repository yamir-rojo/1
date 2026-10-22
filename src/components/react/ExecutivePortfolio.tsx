import { useEffect, useRef, useState, type ReactNode } from 'react';
import { es } from '../../content/es';
import { en } from '../../content/en';
import { site } from '../../config/site';
import type { GalleryCategory } from '../../content/types';
import ExecutiveLogoCarousel from './ExecutiveLogoCarousel';
import { assetPath } from '../../lib/assetPath';

function Arrow({ diagonal = false, down = false }: { diagonal?: boolean; down?: boolean }) {
  return <svg className={`arrow-icon${down ? ' arrow-down' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}</svg>;
}
function Symbol({ name }: { name: string }) {
  const shapes: Record<string, ReactNode> = {
    operations: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 17h7m-3.5-3.5v7"/></>,
    logistics: <><path d="M3 7h11v10H3zM14 10h4l3 4v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
    strategy: <><path d="M4 20V4M4 20h17M8 15l4-5 4 2 5-8M16 4h5v5"/></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></>,
  };
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name] ?? shapes.operations}</svg>;
}
const caseData = [
  { company: 'ENEX / RCL', period: '2022 — 2025', title: ['Continuidad para una operación que nunca se detiene.', 'Continuity for an operation that never stops.'], body: ['Administración de contratos de abastecimiento de combustible para BHP Spence y AMSA Centinela. Planificación de flotas, control de riesgos y cumplimiento contractual en una operación de 6 millones de kilómetros anuales.', 'Fuel supply contract management for BHP Spence and AMSA Centinela. Fleet planning, risk control and contractual compliance across an operation covering 6 million kilometers annually.'], metrics: [['0', 'accidentes STP / CTP', 'lost-time accidents'], ['100%', 'cumplimiento RECSS · 4 años', 'RECSS compliance · 4 years']], photo: 'lider-de-nueva-alianza-enex-y-bhp-nueva-flota-mercedes-benz-new-actros-2025-ultima-generacion-para-el-abastecimiento-ind' },
  { company: 'VIGGO / TUR BUS', period: '2021 — 2022', title: ['Más capacidad. Mejor servicio. Equipos alineados.', 'More capacity. Better service. Aligned teams.'], body: ['Dirección de la operación zonal norte con más de 300 colaboradores y una sucursal de 30.000 m². Optimización de rutas, expansión de cobertura y despliegue de soluciones de electromovilidad para la minería.', 'Northern regional operations leadership with more than 300 team members and a 30,000 m² branch. Route optimization, service expansion and electric mobility implementation for mining.'], metrics: [['+60%', 'volumen operado', 'operating volume'], ['+90%', 'mejora en tiempos de llegada', 'improvement in arrival times']], photo: 'lider-de-operaciones-y-sucursal-segunda-region-mejoramiento-clima-laboral-inclusion-seguridad-y-medio-ambiente-viggo-chi' },
  { company: 'KOMATSU CUMMINS', period: '2008 — 2011', title: ['Una cadena de suministro más precisa y eficiente.', 'A more accurate and efficient supply chain.'], body: ['Gestión del centro de distribución de zona norte, con más de 70.000 números de parte. Implementación de SAP, WMS y radiofrecuencia para mejorar trazabilidad, inventarios y costos logísticos en CD La Negra.', 'Northern distribution center management with more than 70,000 part numbers. SAP, WMS and radio-frequency implementation to improve traceability, inventory and logistics costs at La Negra distribution center.'], metrics: [['80%', 'reducción de costos logísticos', 'reduction in logistics costs'], ['70K+', 'SKU bajo gestión', 'SKUs under management']], photo: 'lider-centro-de-distribucion-komatsu-cummins-chile-procesos-almacenamiento-distribucion-flotas-maquinaria-crossdoking-pi' },
];
const categoryLabels: Record<string, [string, string]> = { all: ['Todas', 'All'], operaciones: ['Operaciones', 'Operations'], liderazgo: ['Liderazgo', 'Leadership'], seguridad: ['Seguridad', 'Safety'], proyectos: ['Proyectos', 'Projects'] };

export default function ExecutivePortfolio() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('inicio');
  const [caseIndex, setCaseIndex] = useState(0);
  const [category, setCategory] = useState('all');
  const [expandedGallery, setExpandedGallery] = useState(false);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const photoTrigger = useRef<HTMLButtonElement | null>(null);
  const t = (spanish: string, english: string) => lang === 'es' ? spanish : english;
  const data = lang === 'es' ? es : en;
  const selectedCase = caseData[caseIndex];
  const featuredPhotos = [caseData[0].photo, 'gerente-de-operaciones-cadematori-y-creador-del-centro-de-distribucion-michelin-proyecto-internacional-hellmann-mejillon', 'ingeniero-lider-de-procesos-logisticos-de-los-principales-contratos-del-norte-charlas-masivas-para-todo-el-personal-de-o', 'lider-de-suministro-logistico-masivo-24-7-para-la-gran-mineria-desierto-de-atacama-enex-s', 'bhp-inspeccion-de-equipos-alto-tonelaje-sistema-cas', 'reunion-cuatrimestral-administracion-y-especialistas-del-norte-ssma-proyectos-de-abastecimiento-zona-norte-para-la-gran-'];
  const gallery = [...data.gallery].sort((a,b) => {
    const rank = (id: string) => { const index = featuredPhotos.indexOf(id); return index === -1 ? 100 : index; };
    return rank(a.id) - rank(b.id);
  }).filter(item => category === 'all' || item.categories.includes(category as GalleryCategory));
  const visibleGallery = expandedGallery ? gallery : gallery.slice(0, 6);
  const currentPhoto = photoIndex === null ? null : gallery[photoIndex];
  const nav = [ ['perfil', t('Perfil', 'Profile')], ['impacto', t('Impacto', 'Impact')], ['trayectoria', t('Trayectoria', 'Experience')], ['terreno', t('En terreno', 'In the field')], ['formacion', t('Formación', 'Education')] ];
  useEffect(() => {
    try { if (localStorage.getItem('portfolio-language') === 'en') setLang('en'); } catch {}
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id); }, { rootMargin: '-20% 0px -60% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => { document.documentElement.lang = lang; try { localStorage.setItem('portfolio-language', lang); } catch {} }, [lang]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (photoIndex !== null && dialog && !dialog.open) dialog.showModal();
    if (photoIndex === null && dialog?.open) dialog.close();
    if (photoIndex !== null) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [photoIndex]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (photoIndex === null) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); setPhotoIndex((photoIndex + 1) % gallery.length); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setPhotoIndex((photoIndex - 1 + gallery.length) % gallery.length); }
    };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, [photoIndex, gallery.length]);
  const closePhoto = () => { setPhotoIndex(null); photoTrigger.current?.focus(); };
  const copyEmail = async () => { try { await navigator.clipboard.writeText(site.email); setCopied(true); window.setTimeout(() => setCopied(false), 2500); } catch { window.location.href = `mailto:${site.email}`; } };

  return <>
    <header className="site-header"><div className="shell header-inner">
      <a href="#inicio" className="brand" aria-label="Yamir Rojo — Inicio"><span className="monogram">YR<span/></span><span className="brand-name">Yamir Rojo<span>{t('DIRECCIÓN & OPERACIONES', 'LEADERSHIP & OPERATIONS')}</span></span></a>
      <nav className="desktop-nav" aria-label={t('Navegación principal', 'Main navigation')}>{nav.map(([id, label]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav>
      <div className="header-actions"><button className="language-button" onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label={t('Switch to English', 'Cambiar a español')}><span className={lang === 'es' ? 'selected' : ''}>ES</span><span className="language-divider">/</span><span className={lang === 'en' ? 'selected' : ''}>EN</span></button><a href="#contacto" className="button button-small header-cta">{t('Conversemos', 'Let’s talk')}<Arrow diagonal/></a><button className={`menu-toggle ${menu ? 'is-open' : ''}`} aria-label={t(menu ? 'Cerrar menú' : 'Abrir menú', menu ? 'Close menu' : 'Open menu')} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}><span/><span/></button></div>
    </div>{menu && <nav id="mobile-menu" className="mobile-nav" aria-label={t('Navegación móvil', 'Mobile navigation')}>{[...nav, ['contacto', t('Contacto', 'Contact')]].map(([id,label]) => <a href={`#${id}`} key={id} onClick={() => setMenu(false)}>{label}<Arrow diagonal/></a>)}</nav>}</header>

    <main id="main">
      <section className="hero shell" id="inicio" aria-labelledby="hero-heading">
        <div className="hero-copy"><div className="eyebrow"><span className="status-dot"/>{t('LIDERAZGO EJECUTIVO · VISIÓN OPERACIONAL', 'EXECUTIVE LEADERSHIP · OPERATIONAL VISION')}</div>
          <h1 id="hero-heading">{t('Visión estratégica.', 'Strategic vision.')}<br/>{t('Resultados', 'Results')}<br/><span className="accent-text">{t('en terreno.', 'in the field.')}</span></h1>
          <p className="hero-role">Yamir Moisés Rojo Andrade<span>{t('Gerente de Operaciones, Logística & Supply Chain', 'Operations, Logistics & Supply Chain Manager')}</span></p>
          <p className="hero-description">{t('Conecto la estrategia con la ejecución para liderar operaciones seguras, equipos sólidos y cadenas de suministro que responden.', 'I connect strategy with execution to lead safe operations, strong teams and supply chains that deliver.')}</p>
          <div className="hero-buttons"><a href="#contacto" className="button">{t('Hablemos de su próximo desafío', 'Let’s discuss your next challenge')}<Arrow diagonal/></a><a href={site.cvPdf} className="text-link" download={site.cvPdfDownloadName}>{t('Descargar perfil', 'Download profile (ES)')}<Symbol name="download"/></a></div>
          <div className="hero-location"><Symbol name="pin"/><span>Antofagasta · Santiago, Chile</span><span className="location-divider"/><span>{t('Proyección nacional', 'National scope')}</span></div>
        </div>
        <div className="hero-visual"><div className="photo-corner"/><img src={assetPath('/images/profile.webp')} alt={t('Yamir Rojo en una operación industrial minera', 'Yamir Rojo at an industrial mining operation')} width="1254" height="1254" loading="eager" decoding="async"/><div className="hero-photo-overlay"/>
          <div className="photo-topline"><span className="photo-label">{t('ESTRATEGIA QUE SE EJECUTA.', 'STRATEGY INTO ACTION.')}</span><span className="photo-plus">+</span></div>
          <div className="portrait-caption"><span className="portrait-index">01 / {t('PERFIL EJECUTIVO', 'EXECUTIVE PROFILE')}</span><p>{t('Experiencia real.', 'Real experience.')}<br/>{t('Compromiso en cada operación.', 'Committed to every operation.')}</p><div><span className="status-dot"/>{t('Disponible para nuevos desafíos', 'Open to new opportunities')}</div></div>
          <div className="experience-stamp"><strong>25<span>+</span></strong><span>{t('AÑOS DE', 'YEARS OF')}<br/>{t('TRAYECTORIA', 'EXPERIENCE')}</span><Arrow diagonal/></div>
        </div>
        <div className="hero-bottom"><span>{t('MINERÍA', 'MINING')}<i/>{t('LOGÍSTICA', 'LOGISTICS')}<i/>{t('TRANSPORTE', 'TRANSPORT')}<i/>SUPPLY CHAIN</span><a href="#perfil">{t('Conozca mi enfoque', 'Discover my approach')}<Arrow down/></a></div>
      </section>

      <ExecutiveLogoCarousel companies={data.companies} lang={lang} />

      <section id="perfil" className="section shell" aria-labelledby="profile-heading">
        <div className="section-heading"><span className="section-number">01 / {t('ENFOQUE', 'APPROACH')}</span><div><h2 id="profile-heading">{t('La operación es compleja.', 'Operations are complex.')}<br/><span className="muted-text">{t('El objetivo es claro.', 'The objective is clear.')}</span></h2><p>{t('Transformar desafíos operacionales en continuidad, eficiencia y valor para el negocio.', 'Turn operational challenges into continuity, efficiency and business value.')}</p></div></div>
        <div className="profile-grid"><div className="profile-intro"><p>{t('Soy Yamir Rojo. Ingeniero en Administración Logística, con más de 25 años de trayectoria en la gran minería y la industria del norte de Chile.', 'I’m Yamir Rojo, a Logistics Management Engineer with more than 25 years of experience in large-scale mining and industry in northern Chile.')}</p><p>{t('He dirigido contratos, centros de distribución y equipos de más de 300 personas. Mi forma de trabajar combina control de gestión, presencia en terreno y una relación cercana con las personas que hacen posible cada resultado.', 'I have led contracts, distribution centers and teams of more than 300 people. My approach combines management control, field presence and close collaboration with the people behind every result.')}</p><a href="#trayectoria" className="text-link">{t('Explore mi trayectoria', 'Explore my experience')}<Arrow/></a><div className="profile-note"><span className="note-line"/><span>{t('Una mirada integral: del directorio a la operación.', 'An integrated perspective: from the boardroom to the operation.')}</span></div></div>
          <div className="expertise-list">{[
            ['operations',t('Dirección de operaciones', 'Operations leadership'),t('Continuidad 24/7, gestión de flotas, equipos multidisciplinarios y administración de contratos mineros.', '24/7 continuity, fleet management, multidisciplinary teams and mining contract administration.'),'01'],
            ['logistics',t('Logística & cadena de suministro', 'Logistics & supply chain'),t('Abastecimiento, distribución, inventarios y transporte crítico con trazabilidad de principio a fin.', 'Supply, distribution, inventory and critical transport with end-to-end traceability.'),'02'],
            ['strategy',t('Eficiencia & transformación', 'Efficiency & transformation'),t('Control de KPI, optimización de costos, seguridad operacional y tecnología aplicada al negocio.', 'KPI management, cost optimization, operational safety and technology applied to business.'),'03'],
          ].map(([icon,title,body,n]) => <article className="expertise-item" key={n}><div className="expertise-icon"><Symbol name={icon}/></div><div><h3>{title}</h3><p>{body}</p></div><span className="item-number">{n}</span></article>)}</div></div>
        <div className="engagement-line"><span className="status-dot"/><p>{t('Dirección ejecutiva', 'Executive leadership')}<span> / </span>{t('Administración de contratos', 'Contract administration')}<span> / </span>{t('Asesoría especializada', 'Specialist consulting')}</p><a href="#contacto">{t('Conectemos', 'Let’s connect')}<Arrow diagonal/></a></div>
      </section>

      <section id="impacto" className="impact-section section" aria-labelledby="impact-heading"><div className="shell"><div className="section-heading"><span className="section-number">02 / {t('IMPACTO', 'IMPACT')}</span><div><h2 id="impact-heading">{t('La experiencia se demuestra.', 'Experience is demonstrated.')}<br/><span className="muted-text">{t('Los resultados también.', 'So are the results.')}</span></h2><p>{t('Indicadores de operaciones y contratos bajo mi gestión.', 'Indicators from operations and contracts under my management.')}</p></div></div>
        <div className="metrics-grid">{[['6M','km',t('Recorridos anuales', 'Kilometers per year'),'ENEX / RCL · 2022–2025'],['300','+',t('Colaboradores liderados', 'Team members led'),'VIGGO · 2021–2022'],['100','%',t('Cumplimiento RECSS', 'RECSS compliance'),t('ENEX / RCL · 4 años consecutivos', 'ENEX / RCL · 4 consecutive years')],['70','',t('Contratos en zona norte', 'Northern region contracts'),'HUALPÉN · 2019–2021']].map(([value,unit,label,context]) => <div className="metric" key={label}><strong>{value}<span>{unit}</span></strong><h3>{label}</h3><p>{context}</p></div>)}</div>
        <div className="case-topline"><span className="eyebrow">{t('EXPERIENCIAS DESTACADAS', 'SELECTED EXPERIENCE')}</span><span>0{caseIndex + 1} / 03</span></div>
        <div className="case-tabs" role="tablist" aria-label={t('Experiencias destacadas', 'Selected experience')}>{caseData.map((item,index) => <button key={item.company} id={`case-tab-${index}`} role="tab" aria-selected={index === caseIndex} aria-controls={`case-panel-${index}`} tabIndex={index === caseIndex ? 0 : -1} className={index === caseIndex ? 'selected' : ''} onClick={() => setCaseIndex(index)} onKeyDown={event => { if (['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowRight' ? 1 : 2)) % 3; setCaseIndex(next); document.getElementById(`case-tab-${next}`)?.focus(); } }}><span>0{index+1}</span>{item.company}<Arrow diagonal/></button>)}</div>
        <article className="case-study" role="tabpanel" id={`case-panel-${caseIndex}`} aria-labelledby={`case-tab-${caseIndex}`} key={caseIndex}><div className="case-image"><img src={assetPath(`/images/gallery/${selectedCase.photo}.jpg`)} alt={selectedCase.company + t(' · registro de operaciones', ' · operations record')} loading="lazy" width="720" height="500"/><span>{selectedCase.company} <span>{selectedCase.period}</span></span></div><div className="case-copy"><span className="eyebrow">{t('DEL DESAFÍO AL RESULTADO', 'FROM CHALLENGE TO RESULT')}</span><h3>{selectedCase.title[lang === 'es' ? 0 : 1]}</h3><p>{selectedCase.body[lang === 'es' ? 0 : 1]}</p><div className="case-metrics">{selectedCase.metrics.map(metric => <div key={metric[0]}><strong>{metric[0]}</strong><span>{metric[lang === 'es' ? 1 : 2]}</span></div>)}</div></div></article>
      </div></section>

      <section id="trayectoria" className="section shell" aria-labelledby="experience-heading"><div className="section-heading"><span className="section-number">03 / {t('TRAYECTORIA', 'EXPERIENCE')}</span><div><h2 id="experience-heading">{t('Decisiones con perspectiva.', 'Decisions with perspective.')}<br/><span className="muted-text">{t('Liderazgo con recorrido.', 'Leadership built on experience.')}</span></h2><p>{t('Una carrera construida en el corazón de la industria.', 'A career built at the heart of industry.')}</p></div></div>
        <div className="experience-list">{data.experience.map((item,index) => <details key={`${lang}-${index}`} className="experience-row" open={index === 0}><summary><span className="experience-period"><i className={index === 0 ? 'current' : ''}/>{item.period}</span><span className="experience-name"><strong>{item.company}</strong><span>{item.role}</span></span><span className="expand-symbol" aria-hidden="true"/></summary><div className="experience-detail"><div className="experience-context"><span className="eyebrow">{t('ALCANCE', 'SCOPE')}</span><p>{item.location}</p>{item.logos && <div className="experience-logos">{item.logos.filter(logo => logo !== 'enex').slice(0,3).map(logo => <img key={logo} src={assetPath(`/logos/${logo}.png`)} alt={logo} loading="lazy" width="90" height="35"/>)}</div>}</div><div><p>{item.scope}</p><ul>{item.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>{item.extended && <details className="extended-details"><summary>{t('Ver responsabilidades y resultados adicionales', 'See additional responsibilities and results')}<Arrow down/></summary><ul>{item.extended.map(line => <li key={line}>{line}</li>)}</ul></details>}</div></div></details>)}</div><div className="experience-footnote"><span>{t('Referencias profesionales disponibles a solicitud.', 'Professional references available on request.')}</span><a href={site.cvPdf} download={site.cvPdfDownloadName} className="text-link">{t('Descargar perfil ejecutivo', 'Download executive profile (ES)')}<Symbol name="download"/></a></div>
      </section>

      <section id="terreno" className="field-section section" aria-labelledby="field-heading"><div className="shell"><div className="section-heading"><span className="section-number">04 / {t('EN TERRENO', 'IN THE FIELD')}</span><div><h2 id="field-heading">{t('Donde la estrategia', 'Where strategy')}<br/><span className="muted-text">{t('se convierte en acción.', 'becomes action.')}</span></h2><p>{t('Personas, proyectos y operaciones. Una mirada al trabajo real.', 'People, projects and operations. A look at the real work.')}</p></div></div><div className="gallery-toolbar"><div className="gallery-filters" aria-label={t('Filtrar fotografías', 'Filter photographs')}>{Object.entries(categoryLabels).map(([key,labels]) => <button key={key} aria-pressed={key === category} className={key === category ? 'selected' : ''} onClick={() => { setCategory(key); setExpandedGallery(false); }}>{labels[lang === 'es' ? 0 : 1]}</button>)}</div><span className="photo-count" aria-live="polite">{gallery.length} {t('fotografías', 'photographs')}</span></div><div className="gallery-grid">{visibleGallery.map((item,index) => <button className="gallery-item" key={item.id} onClick={event => { photoTrigger.current = event.currentTarget; setPhotoIndex(index); }} aria-label={t('Ampliar: ', 'Enlarge: ') + item.caption}><img src={assetPath(item.thumbSrc ?? item.src)} alt={item.alt} loading="lazy" width="640" height="480"/><span className="gallery-image-overlay"/><span className="gallery-enlarge"><Arrow diagonal/></span><span className="gallery-caption"><small>{t('REGISTRO PROFESIONAL', 'PROFESSIONAL RECORD')} / {String(index + 1).padStart(2,'0')}</small><span>{item.caption}</span></span></button>)}</div>{gallery.length > 6 && <div className="gallery-more"><button className="button button-outline" onClick={() => { setExpandedGallery(!expandedGallery); if (expandedGallery) document.getElementById('terreno')?.scrollIntoView({block:'start'}); }}>{expandedGallery ? t('Ver selección', 'Show selection') : t(`Explorar las ${gallery.length} fotografías`, `Explore all ${gallery.length} photographs`)}<Arrow down/></button></div>}</div></section>

      <section id="formacion" className="section shell" aria-labelledby="education-heading">
        <div className="section-heading"><span className="section-number">05 / {t('FORMACIÓN', 'EDUCATION')}</span><div><h2 id="education-heading">{t('Experiencia que evoluciona.', 'Experience that evolves.')}<br/><span className="muted-text">{t('Conocimiento que se aplica.', 'Knowledge put to work.')}</span></h2></div></div>
        <div className="education-grid">
          <div className="education-list">
            {data.education.map((item,index) => <article className="education-item" key={item.title}>
              <span className="education-index">{String(index + 1).padStart(2,'0')}</span>
              <div>
                <span className="education-school">{item.institution}</span>
                <h3>{item.title}</h3>
                <div className="education-meta">
                  {item.period && <span>{item.period}</span>}
                  <span className={item.status === 'in_progress' ? 'study-status' : ''}>{item.status === 'in_progress' ? t('En curso', 'In progress') : item.status === 'completed' ? t('Completado', 'Completed') : t('Titulado', 'Graduated')}</span>
                </div>
                {item.detail && <p className="education-detail">{item.detail}</p>}
                {item.recognition && <p className="education-recognition"><span aria-hidden="true">✳</span>{item.recognition}</p>}
                {item.recognitionDetail && <p className="education-recognition-detail">{item.recognitionDetail}</p>}
              </div>
            </article>)}
          </div>
          <aside className="recognition"><span className="recognition-symbol" aria-hidden="true">✳</span><span className="eyebrow">{t('EXCELENCIA ACADÉMICA', 'ACADEMIC EXCELLENCE')}</span><h3>Magna<br/>Cum Laude.</h3><p>{t('Distinción en el Diplomado en Dirección de Operaciones de la Universidad Andrés Bello.', 'Distinction in the Operations Management postgraduate diploma at Universidad Andrés Bello.')}</p><span className="recognition-year">{t('TITULADO · MARZO 2026', 'GRADUATED · MARCH 2026')}</span><img src={assetPath('/images/portfolio/diploma-distincion-2026.jpg')} alt={t('Registro de titulación y reconocimiento académico, 2026', 'Graduation and academic recognition, 2026')} loading="lazy" width="600" height="400"/></aside>
        </div>
        <div className="capabilities-grid"><div><h3>{t('Herramientas para ejecutar.', 'Tools to deliver.')}</h3><div className="tool-tags">{['SAP MM / PM / WMS', t('Excel avanzado','Advanced Excel'), 'Guardian', 'MyPass', 'SIGA / SERCOL'].map(tool => <span key={tool}>{tool}</span>)}</div><p>{t('ERP, control de flotas, gestión de inventarios y plataformas de acreditación minera.', 'ERP, fleet control, inventory management and mining accreditation platforms.')}</p></div><div className="capability-accordions">{[{title:t('Certificaciones & acreditaciones', 'Certifications & accreditations'),groups:data.certifications},{title:t('Sistemas & especialidades técnicas', 'Systems & technical specialties'),groups:data.tools}].map(group => <details key={group.title}><summary>{group.title}<span className="expand-symbol"/></summary><div>{group.groups.map(section => <div className="capability-group" key={section.category}><h4>{section.category}</h4><ul>{section.items.map(line => <li key={line}>{line}</li>)}</ul></div>)}</div></details>)}<details><summary>{t('Idiomas & habilitaciones', 'Languages & qualifications')}<span className="expand-symbol"/></summary><div><ul>{data.languages.map(line => <li key={line}>{line}</li>)}</ul><p>{t('Licencias de conducción profesional: clase A-2 y clase D.', 'Professional driving licenses: A-2 and D classes.')}</p></div></details></div></div>
      </section>

      <section id="contacto" className="contact-section" aria-labelledby="contact-heading"><div className="shell"><div className="contact-top"><span className="eyebrow"><span className="status-dot"/>{t('EL SIGUIENTE DESAFÍO', 'THE NEXT CHALLENGE')}</span><span>ANTOFAGASTA · CHILE</span></div><div className="contact-main"><div><h2 id="contact-heading">{t('Su próximo desafío.', 'Your next challenge.')}<br/><span>{t('Mi próximo compromiso.', 'My next commitment.')}</span></h2><p>{t('Si su empresa busca liderazgo para dar el siguiente paso, conversemos sobre cómo puedo aportar.', 'If your company needs leadership for its next step, let’s discuss how I can contribute.')}</p><a className="contact-email" href={`mailto:${site.email}`}>{site.email}<Arrow diagonal/></a><button className="copy-email" onClick={copyEmail} aria-live="polite">{copied ? t('Correo copiado ✓', 'Email copied ✓') : t('Copiar correo', 'Copy email')}</button></div><div className="contact-links"><a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer"><span><small>{t('CONTACTO DIRECTO', 'DIRECT CONTACT')}</small>WhatsApp<span className="contact-detail">{site.phone}</span></span><Arrow diagonal/></a><a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer"><span><small>{t('CONECTEMOS', 'LET’S CONNECT')}</small>LinkedIn</span><Arrow diagonal/></a><a href={site.cvPdf} download={site.cvPdfDownloadName}><span><small>{t('TRAYECTORIA EN PDF', 'EXPERIENCE IN PDF · ES')}</small>{t('Perfil ejecutivo', 'Executive profile')}</span><Symbol name="download"/></a></div></div></div></section>
    </main>
    <footer className="site-footer"><div className="shell footer-inner"><a href="#inicio" className="brand"><span className="monogram">YR<span/></span><span className="brand-name">Yamir Rojo</span></a><span>© {new Date().getFullYear()} Yamir Moisés Rojo Andrade.</span><a href="#inicio" className="back-top">{t('Volver al inicio', 'Back to top')}<Arrow diagonal/></a></div></footer>
    <dialog ref={dialogRef} className="lightbox" aria-label={t('Visor de fotografías', 'Photo viewer')} onCancel={event => {event.preventDefault();closePhoto();}} onClick={event => {if (event.target === event.currentTarget) closePhoto();}} onClose={closePhoto}>{currentPhoto && <div className="lightbox-content"><div className="lightbox-toolbar"><span>{String((photoIndex ?? 0)+1).padStart(2,'0')} / {gallery.length}</span><button autoFocus className="lightbox-close" onClick={closePhoto}>{t('Cerrar', 'Close')} <span aria-hidden="true">×</span></button></div><img src={assetPath(currentPhoto.src)} alt={currentPhoto.alt}/><div className="lightbox-bottom"><p>{currentPhoto.caption}</p><div><button onClick={() => setPhotoIndex(((photoIndex ?? 0)-1+gallery.length)%gallery.length)} aria-label={t('Foto anterior', 'Previous photo')}><span className="reverse-arrow"><Arrow/></span></button><button onClick={() => setPhotoIndex(((photoIndex ?? 0)+1)%gallery.length)} aria-label={t('Foto siguiente', 'Next photo')}><Arrow/></button></div></div></div>}</dialog>
  </>;
}



