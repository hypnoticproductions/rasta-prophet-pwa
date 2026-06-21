'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = {
  gold: "#D4AF37",
  black: "#050505"
};

interface WikimediaCredit {
  file: string;
  subject: string;
  author: string;
  license: string;
  licenseUrl: string;
}

interface InstagramCredit {
  file: string;
  subject: string;
  source: string;
  url: string;
}

interface EditorialCredit {
  file: string;
  subject: string;
  type: string;
  source: string;
}

const wikimediaCredits: WikimediaCredit[] = [
  {
    file: 'pitons-st-lucia.jpg',
    subject: 'Gros Piton & Petit Piton, Saint Lucia',
    author: 'Aneil Lutchman',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/'
  },
  {
    file: 'petit-piton.jpg',
    subject: 'Petit Piton, Saint Lucia',
    author: 'Konstantin Krismer',
    license: 'Public Domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/'
  },
  {
    file: 'victoria-falls.jpg',
    subject: 'Victoria Falls, Zambia/Zimbabwe',
    author: 'Diego Delso',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/'
  },
  {
    file: 'table-mountain.jpg',
    subject: 'Table Mountain, Cape Town',
    author: 'South African Tourism',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  },
  {
    file: 'great-mosque-djenne.jpg',
    subject: 'Great Mosque of Djenné, Mali',
    author: 'Ferdinand Reus',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/'
  },
  {
    file: 'kaieteur-falls.jpg',
    subject: 'Kaieteur Falls, Guyana',
    author: 'Bill Cameron',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/'
  },
  {
    file: 'lekki-ikoyi-bridge.jpg',
    subject: 'Lekki-Ikoyi Link Bridge, Lagos, Nigeria',
    author: 'Chippla',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/'
  },
  {
    file: 'half-way-tree-clock.jpg',
    subject: 'Half Way Tree clock tower, Kingston, Jamaica',
    author: 'Raw9345',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/'
  },
  {
    file: 'bwindi-silverback-gorilla.jpg',
    subject: 'Silverback mountain gorilla, Bwindi Impenetrable Forest, Uganda',
    author: 'RomanoPhileas',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/'
  },
  {
    file: 'bwindi-mountain-gorilla.jpg',
    subject: 'Mountain gorilla, Bwindi Impenetrable Forest, Uganda',
    author: 'Diego Delso',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/'
  },
  {
    file: 'lalibela-st-george-cross.jpg',
    subject: 'Church of Saint George (Bete Giyorgis), Lalibela, Ethiopia',
    author: 'Jialiang Gao',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/'
  },
  {
    file: 'lalibela-bete-giyorgis.jpg',
    subject: 'Bete Giyorgis rock-hewn church, Lalibela, Ethiopia',
    author: 'Bernard Gagnon',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/'
  },
  {
    file: 'lalibela-church-green.jpg',
    subject: 'Bete Giyorgis in the green season, Lalibela, Ethiopia',
    author: 'Tmanahan344',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/'
  }
];

const instagramCredits: InstagramCredit[] = [
  {
    file: 'pitons-soufriere-town.jpg',
    subject: 'Both Pitons over Soufrière town, Saint Lucia',
    source: '@froggy_frog80',
    url: 'https://instagram.com/froggy_frog80'
  },
  {
    file: 'piton-peak.jpg',
    subject: 'Piton peak rising from the sea, Saint Lucia',
    source: '@euwy.muji.rousseau',
    url: 'https://instagram.com/euwy.muji.rousseau'
  },
  {
    file: 'makola-market.jpg',
    subject: 'Makola Market, Accra, Ghana',
    source: '@omri.eliyahu',
    url: 'https://instagram.com/omri.eliyahu'
  },
  {
    file: 'renaissance-monument-dakar.jpg',
    subject: 'African Renaissance Monument, Dakar, Senegal',
    source: '@badro_off',
    url: 'https://instagram.com/badro_off'
  }
];

const editorialCredits: EditorialCredit[] = [
  {
    file: 'maduro-venezuela.jpg',
    subject: 'Venezuelan President Nicolás Maduro in dark sunglasses (iconic defiant look)',
    type: 'Editorial / news photo (AP, fair-use editorial)',
    source: 'www.wsls.com (Graham Media Group / cloudinary CDN)'
  }
];

export function ImageCredits() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-t border-white/5 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-5 flex items-center justify-between group hover:bg-white/5 transition-colors"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center space-x-3">
            <div className="h-6 w-[2px] bg-gold" />
            <h3 className="text-gold text-sm md:text-base font-bold uppercase tracking-[0.2em]">
              Image Credits & Attribution
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-gold text-xl"
          >
            ▼
          </motion.div>
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="pb-10 space-y-8">
                {/* Wikimedia Commons Section */}
                <div>
                  <h4 className="text-gold/80 text-xs uppercase tracking-[0.25em] font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-gold/40" />
                    Wikimedia Commons
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {wikimediaCredits.map((credit, idx) => (
                      <div
                        key={idx}
                        className="border border-white/5 bg-black/20 p-4 hover:border-gold/20 transition-colors"
                      >
                        <p className="text-stone-300 text-sm font-medium mb-2">
                          {credit.subject}
                        </p>
                        <div className="text-[11px] text-stone-500 space-y-1">
                          <p>
                            <span className="text-stone-400">Photographer:</span> {credit.author}
                          </p>
                          <p>
                            <span className="text-stone-400">License:</span>{' '}
                            <a
                              href={credit.licenseUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gold/70 hover:text-gold underline"
                            >
                              {credit.license}
                            </a>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instagram Section */}
                <div>
                  <h4 className="text-gold/80 text-xs uppercase tracking-[0.25em] font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-gold/40" />
                    Instagram Sources
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {instagramCredits.map((credit, idx) => (
                      <div
                        key={idx}
                        className="border border-white/5 bg-black/20 p-4 hover:border-gold/20 transition-colors"
                      >
                        <p className="text-stone-300 text-sm font-medium mb-2">
                          {credit.subject}
                        </p>
                        <div className="text-[11px] text-stone-500">
                          <p>
                            <span className="text-stone-400">Source:</span>{' '}
                            <a
                              href={credit.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gold/70 hover:text-gold"
                            >
                              {credit.source}
                            </a>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[10px] text-stone-600 italic">
                    Instagram images are the property of their original posters and are used as
                    current location imagery. If any poster requests removal, images will be
                    replaced with corresponding Wikimedia CC alternatives.
                  </p>
                </div>

                {/* Editorial Section */}
                <div>
                  <h4 className="text-gold/80 text-xs uppercase tracking-[0.25em] font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-gold/40" />
                    Editorial & News Imagery
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {editorialCredits.map((credit, idx) => (
                      <div
                        key={idx}
                        className="border border-white/5 bg-black/20 p-4 hover:border-gold/20 transition-colors"
                      >
                        <p className="text-stone-300 text-sm font-medium mb-2">
                          {credit.subject}
                        </p>
                        <div className="text-[11px] text-stone-500 space-y-1">
                          <p>
                            <span className="text-stone-400">Type:</span> {credit.type}
                          </p>
                          <p>
                            <span className="text-stone-400">Source:</span> {credit.source}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[10px] text-stone-600 italic">
                    Used as background imagery for Venezuela-themed episodes in a fair-use
                    editorial context for political commentary.
                  </p>
                </div>

                {/* Footer note */}
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] text-stone-600 leading-relaxed">
                    All Wikimedia Commons images are downloaded at 1280px via the thumbnail
                    service for web performance. CC BY / CC BY-SA licenses require visible author
                    and license credit as displayed above. Public Domain images need no
                    attribution but are credited as courtesy.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
