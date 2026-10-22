import { useState } from 'react';
import { getCompanyLogo } from '../../config/companyLogos';
import type { CompanyRef, Lang } from '../../content/types';
import { assetPath } from '../../lib/assetPath';

export default function ExecutiveLogoCarousel({ companies, lang }: { companies: CompanyRef[]; lang: Lang }) {
  const [paused, setPaused] = useState(false);
  const spanish = lang === 'es';

  return (
    <section className="companies-band" aria-label={spanish ? 'Empresas y contratos de mi trayectoria' : 'Companies and contracts throughout my career'}>
      <div className="shell">
        <div className="companies-intro">
          <div>
            <span className="eyebrow">{spanish ? 'EXPERIENCIA QUE CONECTA INDUSTRIAS' : 'EXPERIENCE ACROSS INDUSTRIES'}</span>
            <p>{spanish ? 'Trayectoria en operaciones y contratos vinculados a' : 'Experience in operations and contracts involving'}</p>
          </div>
          <button
            className="logo-carousel-control"
            aria-label={spanish ? (paused ? 'Reanudar carrusel de logos' : 'Pausar carrusel de logos') : (paused ? 'Resume logo carousel' : 'Pause logo carousel')}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            <span>{spanish ? (paused ? 'Reanudar' : 'Pausar') : (paused ? 'Resume' : 'Pause')}</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              {paused ? <path d="m5 3 8 5-8 5V3Z"/> : <><rect x="4" y="3" width="2" height="10" rx=".5"/><rect x="10" y="3" width="2" height="10" rx=".5"/></>}
            </svg>
          </button>
        </div>
        <div className="logo-carousel-viewport">
          <div className={`logo-carousel-track${paused ? ' is-paused' : ''}`}>
            {[false, true].map(duplicate => (
              <div className="logo-carousel-group" key={String(duplicate)} role="list" aria-hidden={duplicate || undefined}>
                {companies.map(company => {
                  const logo = getCompanyLogo(company.slug);
                  return (
                    <div className={`logo-carousel-item${logo.wide ? ' logo-carousel-item-wide' : ''}`} role="listitem" key={company.slug} title={duplicate ? undefined : company.name}>
                      {company.textOnly || logo.textOnly || !logo.src ? (
                        <span className="logo-carousel-wordmark">{company.name}</span>
                      ) : (
                        <img src={assetPath(logo.src)} alt={duplicate ? '' : company.name} width="150" height="56" loading="eager" decoding="async" draggable={false}/>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
