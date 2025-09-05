import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import AlbumShowcase from "@/components/AlbumShowcase";
import TourDates from "@/components/TourDates";
import PhotoGallery from "@/components/PhotoGallery";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import BlogSection from "@/components/BlogSection";
import { useEvents } from "@/hooks/useEvents";

// Map of brand names (as in ALL_BRAND_PARTNERS) to their logo image filenames
const BRAND_LOGO_MAP: Record<string, string> = {
  "EY": "eylogo.png",
  "Vijay TV": "vijay.png",
  "Tinder": "tinder.png",
  "Apple": "apple.png",
  "LinkedIn": "linkedin.png",
  "Google": "google.jpg", // prefer jpg, fallback to webp if needed
  "IBM": "ibm.png",
  "Mercedes": "mercedes.jpg",
  "JSW": "jsw.png",
  "Budweiser": "bud.png",
  "ACCENTURE": "accenture.png",
  "HP": "hp.webp",
  "Dell": "dell.png",
  "Clours": "colors.png", // Added mapping for Colors/Clours
  "Colors": "colors.png",  // In case "Colors" is used elsewhere
};

const ALL_BRAND_PARTNERS = [
  "EY",
  "Clours",
  "Vijay TV",
  "Tinder",
  "Apple",
  "LinkedIn",
  "Google",
  "IBM",
  "Mercedes",
  "JSW",
  "Kickstarter",
  "Under 25",
  "Harman",
  "Zoho",
  "Blend Bazar",
  "Mercse",
  "H&M",
  "Seimens",
  "Axis",
  "ICICI",
  "Kingfisher",
  "Budweiser",
  "Budweiser Beats",
  "Indian Premier League - IPL",
  "IBM",
  "ACCENTURE",
  "HP",
  "Bosh",
  "Dell",
  "DNA",
  "Redbull",
  "IIT Kanpur, Delhi, Madras , Roorkee, Patna , Kohizkode",
  "Verzeo",
  "Havenspire",
  "Bangalore Literate festival",
  "Bangalore Creative Circus",
  "IKEA",
  "Diageo",
  "Decathlon",
  "Brigade group",
  "Century",
  "Mana",
  "Socials",
  "One plus",
  "Micromax",
  "Hyatt Kerala",
  "World art Dubai",
  "AGS Central Government",
  "AO Smith",
  "Puravankara",
  "Shell",
  "Lulu mall",
  "Lenovo",
  "Anko",
  "Nasdaq",
  "Subex",
  "TV 9",
  "Suvarna TV",
  "Sony Live",
  "MTV",
  "Under25",
  "Christ University",
  "Logitech",
  "Sony",
  "Kickstarter",
  "S8UL",
  "Blend Bazaar",
  "Delloite",
  "SJU",
  "Infosys",
  "3M",
  "Careernet",
  "Urban vault",
  "Tesserakt",
  "Air India SATS",
  "Cult fit",
  "GE",
  "JK Tech",
  "Fortis",
  "Mercedes",
  "Novo Nordisk",
  "Google",
  "Fidelity",
  "Informatica",
  "Swiggy",
  "Zomato",
  "Dalmier",
  "Finstar",
  "Tinder",
  "We Work",
  "Brigade",
  "Zerodha",
  "Shell",
  "Fidelity",
];

const FIRST_BRANDS_COUNT = 10;

// Updated glow color pairs for orange theme
const glowColors = [
  ["#D35400", "#E67E22"], // Base orange to lighter orange
  ["#E67E22", "#F39C12"], // Lighter orange to yellow-orange
  ["#D35400", "#F39C12"], // Base orange to yellow-orange
  ["#E67E22", "#D35400"], // Lighter orange to base orange
  ["#F39C12", "#E67E22"], // Yellow-orange to lighter orange
  ["#D35400", "#E67E22"], // Base orange to lighter orange
  ["#E67E22", "#F39C12"], // Lighter orange to yellow-orange
  ["#D35400", "#F39C12"], // Base orange to yellow-orange
  ["#E67E22", "#D35400"], // Lighter orange to base orange
  ["#F39C12", "#E67E22"], // Yellow-orange to lighter orange
];

const BRAND_TRANSITION_DURATION = 0.18; // seconds, much faster than before
const BRAND_TRANSITION_DELAY = 0.02; // seconds, for stagger

const Index = () => {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [pendingShowAll, setPendingShowAll] = useState<boolean | null>(null);
  const [brandGridKey, setBrandGridKey] = useState(0);
  const [displayedBrands, setDisplayedBrands] = useState(
    ALL_BRAND_PARTNERS.slice(0, FIRST_BRANDS_COUNT)
  );
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null);

  // CMS: Events
  const { data: events = [] } = useEvents();
  const prestigious = (events as any[])
    .filter((e) => e.isPrestigious && (e.showOnHomepage ?? true))
    .sort((a, b) => {
      const order = (a.sectionOrder ?? 0) - (b.sectionOrder ?? 0);
      if (order !== 0) return order;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  const featuredPrestige = prestigious.length > 0 ? (prestigious.find((e) => e.featured) || prestigious[0]) : null;
  const otherPrestige = prestigious.filter((e) => e !== featuredPrestige).slice(0, 6);

  // Scroll to top on initial load
  useEffect(() => {
    // Always scroll to top when this page is loaded
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // Smooth transition for brand grid: wait for exit animation before changing displayedBrands
  const handleToggleBrands = (show: boolean) => {
    setPendingShowAll(show);
    // Wait for exit animation (match AnimatePresence exit transition duration)
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      setShowAllBrands(show);
      setDisplayedBrands(
        show
          ? ALL_BRAND_PARTNERS
          : ALL_BRAND_PARTNERS.slice(0, FIRST_BRANDS_COUNT)
      );
      setBrandGridKey((k) => k + 1);
      setPendingShowAll(null);
    }, Math.round((BRAND_TRANSITION_DURATION + BRAND_TRANSITION_DELAY * 5) * 1000)); // ~200ms
  };

  // Keep displayedBrands in sync with showAllBrands on first mount
  useEffect(() => {
    setDisplayedBrands(
      showAllBrands
        ? ALL_BRAND_PARTNERS
        : ALL_BRAND_PARTNERS.slice(0, FIRST_BRANDS_COUNT)
    );
  }, []); // eslint-disable-line

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, []);

  // Helper to get logo src for a brand, or undefined if not available
  const getBrandLogoSrc = (brand: string): string | undefined => {
    const filename = BRAND_LOGO_MAP[brand];
    if (!filename) return undefined;
    return `/sunilImages/brandImages/${filename}`;
  };

  // Helper to get alt text for logo
  const getBrandLogoAlt = (brand: string) => `${brand} logo`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        {/* <PhotoGallery />
        <Services />
        <BlogSection /> */}

        <motion.section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-10 z-0" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">About Sunil</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Dynamic Indian emcee, beatboxer, and entertainer , IGT Season 5 semi-finalist, RCB cheer squad (2023), TEDx performer; proprietor of Colossal Beatbox Festival and co-founder of BEATSCLUB.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative w-[50%] mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 blur-3xl opacity-60 rounded-2xl" />
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto rounded-2xl relative z-10 aspect-[9/16] object-cover"
                  >
                    <source src="/videos/abc.mp4" type="video/mp4" />
                  </video>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6 font-display">Crafting Sonic Experiences</h3>
                <p className="text-foreground/80 mb-6">
                {/* My journey began at 15, fueled by a love for Hip-Hop and the art of
                  beatboxing my passion quickly evolved into a career that now spans over
                  8 years. I've had the privilege of hosting everything from concerts to
                  weddings, marathons to sports commentary. */}
                  I’m a dynamic Indian emcee, beatboxer, and entertainer who first rose to national fame on India’s Got Talent Season 5. In 2023, I brought my energy to the Royal Challengers Bangalore cheer squad and have also inspired audiences at TEDx.
                </p>
                <p className="text-foreground/80 mb-6">
                {/* As a beatboxer, I've achieved milestones; a Wildcard winner and semi-
                  finalist on India's Got Talent Season 5.
                  My dedication to the craft led me to co-found "Beatsclub" and launch
                  Colossal, India's largest beatboxing festival. */}
                  As the proprietor of Colossal Beatbox Festival and co-founder of BEATSCLUB, I have played a key role in shaping India’s beatbox culture. Known for electrifying performances and impactful hosting, I continue to lead major youth, lifestyle, and corporate events across the country.
                </p>
                <p className="text-foreground/80 mb-6">
                  Passionate, innovative, and driven by excellence, I thrive on creating experiences that connect and leave lasting impressions.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Mobile-only Performance Video Section */}
        <section id="performance" className="relative z-50 md:hidden py-12">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold mb-4 font-display text-foreground">Watch Performance</h3>
            <div className="relative z-50 overflow-hidden rounded-2xl border border-border/50 bg-black aspect-[9/16] isolate mix-blend-normal filter-none backdrop-blur-none shadow-none">
              <video
                controls
                playsInline
                className="absolute inset-0 z-50 w-full h-full object-contain bg-black mix-blend-normal filter-none"
              >
                <source src="/videos/abcd.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
        <PhotoGallery />
        <Services />
        <BlogSection />

        {/* Client Success Stories Section */}
        <motion.section className="relative py-16 md:py-24 overflow-hidden">
          {/* Animated background elements with orange theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Hero section for this segment */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16 md:mb-20"
            >
              <div className="inline-flex items-center gap-2 bg-primary/15 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border border-primary/30 mb-4 md:mb-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs md:text-sm font-medium text-primary">Client Success Stories</span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-6xl font-display font-bold mb-4 md:mb-6">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Trusted by Industry Leaders
                </span>
              </h2>
              <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                From global corporations to prestigious events, discover how we've created
                <span className="text-primary font-medium"> unforgettable experiences</span> that resonate with audiences worldwide
              </p>
            </motion.div>

            {/* Brand Partners - User Centric Grid with View All */}
            <div className="mb-16 md:mb-20">
              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 text-foreground">Global Brand Partners</h3>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
                  Collaborating with world-class brands to deliver exceptional performances and experiences
                </p>
              </div>
              <div className="w-full flex justify-center">
                <div className="relative w-full max-w-5xl">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={brandGridKey}
                      initial={{ opacity: 0, y: 60, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -60, scale: 0.98 }}
                      transition={{
                        opacity: { duration: BRAND_TRANSITION_DURATION, ease: [0.4, 0, 0.2, 1] },
                        y: { duration: BRAND_TRANSITION_DURATION, ease: [0.4, 0, 0.2, 1] },
                        scale: { duration: BRAND_TRANSITION_DURATION, ease: [0.4, 0, 0.2, 1] }
                      }}
                      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full`}
                      aria-label="Brand Partners"
                    >
                      {displayedBrands.map((brand, index) => {
                        // For the first 10, apply animated glow
                        const isGlowing = index < FIRST_BRANDS_COUNT;
                        const [glowFrom, glowTo] = glowColors[index % glowColors.length] || ["#D35400", "#E67E22"];
                        const logoSrc = isGlowing ? getBrandLogoSrc(brand) : undefined;
                        return (
                          <motion.div
                            key={brand + index}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{
                              duration: BRAND_TRANSITION_DURATION,
                              delay: index * BRAND_TRANSITION_DELAY,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                            className="relative flex flex-col items-center justify-center group cursor-pointer"
                            tabIndex={0}
                            aria-label={brand}
                          >
                            {isGlowing && (
                              <span
                                className="absolute inset-0 z-0 pointer-events-none"
                                aria-hidden="true"
                                style={{
                                  borderRadius: "0.75rem",
                                  background: `linear-gradient(120deg, ${glowFrom}, ${glowTo})`,
                                  filter: "blur(18px) brightness(1.5)",
                                  opacity: 0.85,
                                  animation: `brand-glow 2.2s ease-in-out infinite alternate`,
                                }}
                              />
                            )}
                            <div
                              className={`relative z-10 flex flex-col items-center justify-center bg-card/90 backdrop-blur-md rounded-xl border border-border/50 shadow-md hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 p-4 w-full`}
                              style={{
                                boxShadow: isGlowing
                                  ? `0 0 0 2px ${glowFrom}44, 0 0 16px 2px ${glowTo}33`
                                  : undefined,
                                border: isGlowing
                                  ? `1.5px solid ${glowFrom}88`
                                  : undefined,
                              }}
                            >
                              {isGlowing && logoSrc ? (
                                <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/80 mb-2 border border-border/30 shadow-sm overflow-hidden">
                                  <img
                                    src={logoSrc}
                                    alt={getBrandLogoAlt(brand)}
                                    className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-full"
                                    style={{
                                      display: "block",
                                      margin: "0 auto",
                                      background: "#fff",
                                    }}
                                    loading="lazy"
                                  />
                                </div>
                              ) : null}
                              <span className={`text-base md:text-lg font-semibold text-foreground/80 group-hover:text-primary transition-colors duration-200 text-center px-2 ${isGlowing && logoSrc ? "mt-1" : ""}`}>
                                {brand}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                  {/* Glow overlay for smooth transition */}
                  <div className="pointer-events-none absolute inset-0" />
                </div>
              </div>
              <div className="flex justify-center mt-6">
                {!showAllBrands && ALL_BRAND_PARTNERS.length > FIRST_BRANDS_COUNT && (
                  <motion.button
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg hover:shadow-primary/40 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 hover:scale-105"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      if (pendingShowAll === null) handleToggleBrands(true);
                    }}
                    initial={false}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    disabled={pendingShowAll !== null}
                    style={pendingShowAll !== null ? { opacity: 0.7, pointerEvents: "none" } : undefined}
                  >
                    View All
                  </motion.button>
                )}
                {showAllBrands && (
                  <motion.button
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-accent to-primary text-white font-semibold shadow-lg hover:shadow-accent/40 transition-all focus:outline-none focus:ring-2 focus:ring-accent/50 hover:scale-105"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      if (pendingShowAll === null) handleToggleBrands(false);
                    }}
                    initial={false}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    disabled={pendingShowAll !== null}
                    style={pendingShowAll !== null ? { opacity: 0.7, pointerEvents: "none" } : undefined}
                  >
                    Show Less
                  </motion.button>
                )}
              </div>
            </div>

            {/* Prestigious Events with enhanced layout (TODO: wire to CMS fields category/isPrestigious/sectionOrder) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 text-foreground">Prestigious Events</h3>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
                  Featured performer at marquee events, creating memorable moments for diverse audiences
                </p>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:block">
                <div className="relative max-w-7xl mx-auto">
                  {/* Main featured event (from CMS if available) */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    {featuredPrestige ? (
                      <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-primary/30 backdrop-blur-sm rounded-3xl border border-primary/30 p-8 md:p-12 shadow-2xl max-w-2xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                        <div className="relative z-10">
                          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30 mb-4">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-primary">Featured Event</span>
                          </div>
                          <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                            {featuredPrestige.title}
                          </h4>
                          {featuredPrestige.description && (
                            <p className="text-primary/80 font-medium mb-2">{featuredPrestige.description}</p>
                          )}
                          <p className="text-foreground/70 text-sm">
                            {featuredPrestige.description || ""}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-primary/30 backdrop-blur-sm rounded-3xl border border-primary/30 p-8 md:p-12 shadow-2xl max-w-2xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                        <div className="relative z-10">
                          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30 mb-4">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-primary">Featured Event</span>
                          </div>
                          <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                            TEDx Hyderabad
                          </h4>
                          <p className="text-primary/80 font-medium mb-2">Tech Conference</p>
                          <p className="text-foreground/70 text-sm">
                            Delivered an inspiring performance that captivated the audience of innovators and thought leaders
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Surrounding events from CMS (fallback to static list if none) */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {(otherPrestige.length > 0 ? otherPrestige.map((e:any) => ({
                      name: e.title,
                      category: e.category || "Prestigious",
                      description: e.description || "",
                    })) : [
                      { name: "ICICI I Shine 2023", category: "Corporate Event", description: "Energized thousands of employees" },
                      { name: "RCB (IPL) Cheer Squad", category: "Sports Entertainment", description: "Pumped up cricket fans nationwide" },
                      { name: "Dubai World Art Festival", category: "Brand Activation", description: "Brought energy to fitness enthusiasts" },
                      { name: "Rotary Club", category: "Community Event", description: "Connected with community leaders" },
                      { name: "Cosmopolitan", category: "Lifestyle Event", description: "Entertained style-conscious audience" },
                      { name: "Namma Habba", category: "Cultural Festival", description: "Celebrated local culture and traditions" }
                    ]).map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 150
                        }}
                        whileHover={{
                          scale: 1.03,
                          y: -5
                        }}
                        className="group cursor-pointer"
                      >
                        <div className="relative overflow-hidden bg-card/60 backdrop-blur-sm rounded-2xl border border-border/30 p-4 md:p-6 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 h-full">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative z-10">
                            <div className="mb-3">
                              <span className="text-xs font-medium text-primary/80 bg-primary/10 px-2 py-1 rounded-full">
                                {event.category}
                              </span>
                            </div>
                            <h4 className="text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                              {event.name}
                            </h4>
                            <p className="text-xs md:text-sm text-muted-foreground mb-3">
                              {event.description}
                            </p>
                            <div className="w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden">
                <div className="space-y-4">
                  {[
                    { name: "TEDx Hyderabad", category: "Tech Conference", featured: true },
                    { name: "ICICI I Shine 2023", category: "Corporate Event" },
                    { name: "RCB (IPL) Cheer Squad", category: "Sports Entertainment" },
                    { name: "Dubai World Art Festival", category: "Brand Activation" },
                    { name: "Rotary Club", category: "Community Event" },
                    { name: "Cosmopolitan", category: "Lifestyle Event" },
                    { name: "Namma Habba", category: "Cultural Festival" }
                  ].map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative overflow-hidden backdrop-blur-sm rounded-xl border p-4 shadow-lg ${
                        event.featured
                          ? 'bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30'
                          : 'bg-card/60 border-border/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          {event.featured && (
                            <div className="inline-flex items-center gap-1 bg-primary/20 px-2 py-1 rounded-full mb-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                              <span className="text-xs font-medium text-primary">Featured</span>
                            </div>
                          )}
                          <h4 className="text-sm font-bold text-foreground mb-1">
                            {event.name}
                          </h4>
                          <span className="text-xs text-primary/80 bg-primary/10 px-2 py-1 rounded-full">
                            {event.category}
                          </span>
                        </div>
                        <div className="w-6 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* <MusicPlayer /> */}
        <AlbumShowcase />
        {/* <PhotoGallery /> */}
        <TourDates />
      </main>
      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          @keyframes brand-glow {
            0% {
              filter: blur(18px) brightness(1.2);
              opacity: 0.7;
            }
            50% {
              filter: blur(28px) brightness(1.6);
              opacity: 1;
            }
            100% {
              filter: blur(18px) brightness(1.2);
              opacity: 0.7;
            }
          }
        `,
        }}
      />
    </div>
  );
};

export default Index;