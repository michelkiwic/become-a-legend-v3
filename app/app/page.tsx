"use client";

import { useRef, useState } from "react";

type Category = {
  id: string;
  name: string;
  point: { x: number; y: number };
  outline: string;
  hitOutline?: string;
  frameOutline?: string;
  detailSrc: string;
  closeup?: {
    src: string;
    alt: string;
  };
};

const categories: Category[] = [
  {
    id: "01",
    name: "Bla-Bla-Bla",
    point: { x: 18.7, y: 56 },
    detailSrc: "closeup-u1-cutout.png",
    closeup: {
      src: "closeup-u1-white.webp",
      alt: "Close-up of a pale Bla-Bla-Bla figure with paper ribbons",
    },
    outline:
      "M3 39 C9 34 17 32 23 37 C28 43 31 58 30 66 C28 73 18 75 8 73 C3 70 1 61 3 39 Z",
  },
  {
    id: "02",
    name: "Movement-Dancers",
    point: { x: 33.1, y: 57.4 },
    detailSrc: "closeup-u2-white.webp",
    closeup: {
      src: "closeup-u2-white.webp",
      alt: "Close-up of a suspended Movement-Dancer with a black head and knitted costume",
    },
    outline:
      "M25 36 C30 34 38 34 40 39 C42 48 43 63 41 68 C37 73 29 72 26 68 C24 60 22 46 25 36 Z",
  },
  {
    id: "03",
    name: "Big Heads",
    point: { x: 47.2, y: 71.9 },
    detailSrc: "closeup-u3-white.webp",
    closeup: {
      src: "closeup-u3-white.webp",
      alt: "Close-up of a Big Heads sculpture with black vessels and a pale spherical face",
    },
    outline:
      "M37 59 C42 55 52 55 55 59 C58 65 58 77 54 81 C49 84 40 82 37 79 C34 73 34 64 37 59 Z",
  },
  {
    id: "04",
    name: "Performers",
    point: { x: 74, y: 66.6 },
    detailSrc: "closeup-u4-white.webp",
    closeup: {
      src: "closeup-u4-white.webp",
      alt: "Close-up of a seated black Performer holding a pale wooden figure",
    },
    outline:
      "M67 56 C73 52 83 52 87 57 C89 64 90 75 86 79 C80 83 70 81 67 77 C64 71 63 62 67 56 Z",
    hitOutline:
      "M66 41 C71 36 80 36 85 40 C89 47 90 58 89 68 C90 76 88 82 84 85 C78 88 69 85 65 81 C62 73 62 61 64 52 C63 47 63 44 66 41 Z",
    frameOutline:
      "M66 41 C71 36 80 36 85 40 C89 47 90 58 89 68 C90 76 88 82 84 85 C78 88 69 85 65 81 C62 73 62 61 64 52 C63 47 63 44 66 41 Z",
  },
  {
    id: "05",
    name: "Wooden Rebels",
    point: { x: 61.2, y: 69.4 },
    detailSrc: "closeup-u5-white.webp",
    closeup: {
      src: "closeup-u5-white.webp",
      alt: "Close-up of a suspended pale wooden rebel with black and silver costume",
    },
    outline:
      "M54 59 C58 56 67 55 70 59 C72 65 72 76 69 80 C64 83 56 82 53 78 C51 72 50 64 54 59 Z",
  },
  {
    id: "06",
    name: "4th Wall",
    point: { x: 61.8, y: 51.5 },
    detailSrc: "yoshi-moshi-model.jpg",
    outline:
      "M56.2 46.7 C58.1 45.5 60.7 46.2 62.7 45.7 C65.1 46.3 67.1 45.9 67.6 48.2 C67.1 50.5 67.9 52.8 67.1 55.5 C65.3 57.2 62.9 56.5 60.7 57.1 C58.4 56.4 56.1 57.2 55.8 54.6 C56.4 52.3 55.6 49.3 56.2 46.7 Z",
    frameOutline:
      "M51 42 C55 39.8 60 40.3 63.5 40 C68 40.1 71.3 41.5 72 45 C72.4 49 72.2 54.8 70.7 58.1 C67.6 60.8 63 60.6 59.4 61 C55.4 60.8 52.3 59.7 51 56.4 C50.1 52.2 50.2 46.2 51 42 Z",
  },
  {
    id: "07",
    name: "Videos",
    point: { x: 49.2, y: 53.2 },
    detailSrc: "yoshi-moshi-model.jpg",
    outline:
      "M43.2 48.6 C45 47.5 47.2 48.2 49 47.7 C51.2 48.4 53.5 47.5 54.8 48.7 C55.5 51.1 54.7 53.4 55.2 55.5 C54.4 57.7 51.8 58.4 49.6 58.1 C47.3 58.8 44.4 58.2 43.1 56.8 C42.5 54.4 43.4 51.4 43.2 48.6 Z",
    frameOutline:
      "M38 44 C41.5 41.7 46 42 49.5 42 C54 41.8 58.3 42.7 60.2 45.5 C61.2 49.5 61.1 55.3 60 58.6 C57.4 62 52.9 62.4 49 62.2 C44.6 62.6 40.3 61.3 38.4 58.2 C37.1 53.9 37.1 47.8 38 44 Z",
  },
  {
    id: "08",
    name: "Texts",
    point: { x: 86.6, y: 64.2 },
    detailSrc: "yoshi-moshi-model.jpg",
    outline:
      "M83.7 57.5 C85 56.8 87.3 57.2 88.7 58.2 C89.3 61.6 89.2 67.2 88.3 70 C86.8 70.9 84.6 70.6 83.6 69.3 C83 66.1 83.1 60.3 83.7 57.5 Z",
    hitOutline:
      "M80.5 54.2 C83.3 52.4 88.1 52.9 90.8 55 C92.3 59.4 92 68.2 90.2 73 C87.2 74.9 82.5 74.2 80.7 71.5 C79.2 66.6 79.2 58.5 80.5 54.2 Z",
    frameOutline:
      "M80.5 54.2 C83.3 52.4 88.1 52.9 90.8 55 C92.3 59.4 92 68.2 90.2 73 C87.2 74.9 82.5 74.2 80.7 71.5 C79.2 66.6 79.2 58.5 80.5 54.2 Z",
  },
];

const utilityCategories = [
  { id: "09", name: "Legal" },
  { id: "10", name: "Contact" },
];

export default function Home() {
  const [entryStage, setEntryStage] = useState<0 | 1 | 2>(0);
  const hasEntered = entryStage === 2;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const detailExitTimer = useRef<number | null>(null);
  const activeCategory = categories.find((category) => category.id === activeId);
  const detailCategory = categories.find((category) => category.id === detailId);

  const showDetail = (id: string) => {
    if (detailExitTimer.current !== null) {
      window.clearTimeout(detailExitTimer.current);
      detailExitTimer.current = null;
    }

    setActiveId(id);
    setDetailId(id);
    window.requestAnimationFrame(() => setIsDetailOpen(true));
  };

  const returnToModel = () => {
    setMenuOpen(false);
    setActiveId(null);

    if (!detailId) {
      setIsDetailOpen(false);
      return;
    }

    setIsDetailOpen(false);
    if (detailExitTimer.current !== null) {
      window.clearTimeout(detailExitTimer.current);
    }
    detailExitTimer.current = window.setTimeout(() => {
      setDetailId(null);
      detailExitTimer.current = null;
    }, 720);
  };

  const toggleCategory = (id: string) => {
    if (detailId === id) {
      returnToModel();
      return;
    }

    showDetail(id);
  };

  return (
    <>
      <div
        className={`entry-sequence${entryStage >= 1 ? " has-announcement" : ""}${hasEntered ? " is-entered" : ""}`}
        aria-hidden={hasEntered}
      >
      <button
        className="entry-screen"
        type="button"
        aria-label="Show the Yoshi and Moshi tour announcement"
        aria-hidden={entryStage !== 0}
        tabIndex={entryStage === 0 ? 0 : -1}
        onClick={() => setEntryStage(1)}
      >
        <img
          className="entry-background"
          src="entry-no-humor.png"
          alt="Yoshi and Moshi lying on a bed in a red room"
          draggable={false}
        />
        <span className="entry-shade" aria-hidden="true" />
        <span className="entry-message">
          <strong>No humor<br />= no entry</strong>
          <img src="entry-red-cross.png" alt="" draggable={false} />
        </span>
        <span className="entry-action">Click or tap for breaking news</span>
      </button>

      <button
        className="tour-announcement"
        type="button"
        aria-label="Enter the Become a Legend exhibition"
        aria-hidden={entryStage !== 1}
        tabIndex={entryStage === 1 ? 0 : -1}
        onClick={() => setEntryStage(2)}
      >
        <span className="tour-dimmer" aria-hidden="true" />
        <span className="tour-poster">
          <video
            className="tour-background"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="yoshi-moshi-red-boat.png"
            aria-label="Yoshi and Moshi with a red boat in the jungle"
          >
            <source src="yoshi-moshi-jungle-loop.mp4" type="video/mp4" />
          </video>
          <span className="tour-shade" aria-hidden="true" />
          <span className="tour-headline">
            <strong>Yoshi + Moshi</strong>
            <strong>are coming to</strong>
            <strong>your town!</strong>
          </span>
          <span className="tour-enter">CLICK AGAIN</span>
        </span>
      </button>
      </div>

    <main
      className={`site-shell${hasEntered ? " is-revealed" : ""}`}
      aria-hidden={!hasEntered}
      inert={!hasEntered}
    >
      <header className="masthead">
        <a
          className="wordmark"
          href="/"
          aria-label="Yoshi und Moshi – zum Ausstellungsmodell"
          onClick={(event) => {
            event.preventDefault();
            window.location.assign(window.location.pathname);
          }}
        >
          <span className="wordmark-main">YOSHI<span>+</span>MOSHI</span>
          <span className="wordmark-subtitle">Become a Legend</span>
        </a>
      </header>

      <section className="model-section" id="model" aria-label="Interactive exhibition model">
        <div className="exhibition-layout">
          <div className="model-column">
            <button
              className={`menu-toggle model-menu-toggle${menuOpen ? " is-open" : ""}`}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>

            <nav className={`site-menu${menuOpen ? " is-open" : ""}`} id="site-menu" aria-label="Exhibition menu">
              <div className="site-menu-heading">
                <span>Become a Legend</span>
                <button
                  className="site-menu-home"
                  type="button"
                  onClick={() => {
                    returnToModel();
                  }}
                >
                  Yoshi + Moshi
                </button>
              </div>
              {categories.map((category) => (
                <a
                  href="#model"
                  key={category.id}
                  onClick={() => {
                    toggleCategory(category.id);
                    setMenuOpen(false);
                  }}
                >
                  <span>{category.id}</span>
                  <strong>{category.name}</strong>
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setActiveId(null);
                  setDetailId(null);
                  setEntryStage(0);
                }}
              >
                Replay intro
              </button>
              {utilityCategories.map((category) => (
                <a
                  href={`#${category.name.toLowerCase()}`}
                  key={category.id}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{category.id}</span>
                  <strong>{category.name}</strong>
                </a>
              ))}
            </nav>

        {detailCategory ? (
          <div className={`category-transition${isDetailOpen ? " is-detail-open" : ""}`}>
            <div className="model-transition-panel" aria-hidden="true">
              <img src="yoshi-moshi-model.jpg" alt="" draggable={false} />
            </div>
          <article
            className={`category-detail category-detail-${detailCategory.id}`}
            aria-labelledby="category-detail-title"
            key={detailCategory.id}
            onClick={returnToModel}
          >
            <div className="detail-copy">
              <span className="detail-number">{detailCategory.id}</span>
              <p className="detail-kicker">Become a Legend / Category</p>
              <h1 id="category-detail-title">{detailCategory.name}</h1>
              <p className="detail-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <img
              className={`detail-cutout${detailCategory.id === "01" ? "" : " detail-cutout-white"}`}
              src={detailCategory.detailSrc}
              alt={`Figur der Kategorie ${detailCategory.name}`}
              draggable={false}
            />

            <button
              className="detail-back"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                returnToModel();
              }}
            >
              <span aria-hidden="true">←</span> Back to model
            </button>
          </article>
          </div>
        ) : (
        <div
          className={`model-frame${activeCategory ? " has-active" : ""}`}
          onMouseLeave={() => setActiveId(null)}
        >
          <img
            className="model-image model-image-base"
            src="yoshi-moshi-model.jpg"
            alt="Yoshi and Moshi presenting a miniature exhibition model with eight exhibition categories"
            draggable={false}
          />

          <span className="funded-button" aria-label="Fully funded">
            <span className="funded-button-face">Fully funded!</span>
          </span>

          <button className="model-footer-action model-footer-finances" type="button">
            Finances
          </button>
          <button className="model-footer-action model-footer-inventory" type="button">
            Inventar
          </button>
          <button className="model-footer-action model-footer-contacts" type="button">
            Contacts
          </button>

          <svg
            className="hotspot-map"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {[
              ...categories.filter((category) => category.id !== "04" && category.id !== "08"),
              ...categories.filter((category) => category.id === "04"),
              ...categories.filter((category) => category.id === "08"),
            ].map((category) => (
              <path
                key={category.id}
                className="hotspot-hit-area"
                d={category.hitOutline ?? category.outline}
                onMouseEnter={() => setActiveId(category.id)}
                onClick={() => toggleCategory(category.id)}
              />
            ))}
            {activeCategory ? (
              <g className="ink-frame">
                <path className="ink-frame-stroke" d={activeCategory.frameOutline ?? activeCategory.outline} />
                <path className="ink-frame-flecks" d={activeCategory.frameOutline ?? activeCategory.outline} />
                <g className="ink-splatter">
                  <circle cx={activeCategory.point.x - 7.4} cy={activeCategory.point.y - 10.2} r="0.58" />
                  <circle cx={activeCategory.point.x - 5.7} cy={activeCategory.point.y - 11.5} r="0.26" />
                  <circle cx={activeCategory.point.x - 4.3} cy={activeCategory.point.y - 10.7} r="0.17" />
                  <circle cx={activeCategory.point.x + 8.1} cy={activeCategory.point.y + 7.6} r="0.48" />
                  <circle cx={activeCategory.point.x + 9.5} cy={activeCategory.point.y + 6.4} r="0.2" />
                  <path
                    className="ink-drip"
                    d={`M ${activeCategory.point.x - 7.5} ${activeCategory.point.y - 9.8} v 4.2 M ${activeCategory.point.x - 5.8} ${activeCategory.point.y - 10.5} v 2.4 M ${activeCategory.point.x + 8.2} ${activeCategory.point.y + 7.3} v 3.1`}
                  />
                </g>
              </g>
            ) : null}
          </svg>

          {categories.map((category) => {
            const isActive = category.id === activeId;
            return (
              <button
                key={category.id}
                className={`image-marker${isActive ? " is-active" : ""}`}
                style={{ left: `${category.point.x}%`, top: `${category.point.y}%` }}
                type="button"
                aria-label={`${category.id}: ${category.name}`}
                aria-pressed={isActive}
                onMouseEnter={() => setActiveId(category.id)}
                onFocus={() => setActiveId(category.id)}
                onClick={() => toggleCategory(category.id)}
              >
                <span className="marker-name">{category.name}</span>
              </button>
            );
          })}

          <img
            className="idle-logo"
            src="yoshi-moshi-logo.webp"
            alt="Yoshi + Moshi"
            draggable={false}
          />

        </div>
        )}

          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>Yoshi + Moshi</span>
        <span>Nina Staehli</span>
      </footer>
    </main>
    </>
  );
}
