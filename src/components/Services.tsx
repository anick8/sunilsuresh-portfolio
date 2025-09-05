import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Users,
  Calendar,
  Award,
  Network,
  Glasses,
  Group,
  Mic,
  Star,
  Heart,
  Gift,
  Landmark,
  Handshake,
  GraduationCap,
  Church,
} from "lucide-react";

// Professional Glow Pulse Background (updated to orange theme)
const GlowPulse = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 z-0"
    style={{}}
  >
    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-20 blur-3xl animate-glow-pulse" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent via-primary to-accent opacity-15 blur-2xl animate-glow-pulse2" />
    <style>
      {`
        @keyframes glowPulse {
          0%, 100% { filter: blur(60px) brightness(1); opacity: 0.20; }
          50% { filter: blur(90px) brightness(1.15); opacity: 0.35; }
        }
        @keyframes glowPulse2 {
          0%, 100% { filter: blur(40px) brightness(1); opacity: 0.13; }
          50% { filter: blur(70px) brightness(1.10); opacity: 0.25; }
        }
        .animate-glow-pulse {
          animation: glowPulse 5s ease-in-out infinite;
        }
        .animate-glow-pulse2 {
          animation: glowPulse2 7s ease-in-out infinite;
        }
      `}
    </style>
  </div>
);

const corporateServices = [
  {
    name: "Conferences & Seminars",
    icon: <Mic className="w-6 h-6 text-primary" />,
    description: "Professional hosting for impactful knowledge-sharing events.",
  },
  {
    name: "Product Launches",
    icon: <Star className="w-6 h-6 text-primary" />,
    description: "Creating buzz and excitement for your new products.",
  },
  {
    name: "Award Ceremonies",
    icon: <Award className="w-6 h-6 text-primary" />,
    description: "Celebrating achievements with style and energy.",
  },
  {
    name: "Networking Events",
    icon: <Network className="w-6 h-6 text-primary" />,
    description: "Facilitating meaningful connections and collaborations.",
  },
  {
    name: "Corporate Galas & Dinners",
    icon: <Glasses className="w-6 h-6 text-primary" />,
    description: "Elegant hosting for memorable evenings.",
  },
  {
    name: "Team Building Activities",
    icon: <Group className="w-6 h-6 text-primary" />,
    description: "Engaging activities to strengthen your team spirit.",
  },
  {
    name: "Panel Discussions",
    icon: <Users className="w-6 h-6 text-primary" />,
    description: "Moderating insightful and dynamic conversations.",
  },
  {
    name: "Trade Shows & Expos",
    icon: <Briefcase className="w-6 h-6 text-primary" />,
    description: "Showcasing brands and innovations with flair.",
  },
  {
    name: "Workshops & Training Sessions",
    icon: <Calendar className="w-6 h-6 text-primary" />,
    description: "Interactive learning experiences for your audience.",
  },
];

const socialServices = [
  {
    name: "Weddings",
    icon: <Heart className="w-6 h-6 text-accent" />,
    description: "Making your special day unforgettable.",
  },
  {
    name: "Birthdays & Anniversaries",
    icon: <Gift className="w-6 h-6 text-accent" />,
    description: "Bringing joy and energy to your celebrations.",
  },
  {
    name: "Cultural Festivals",
    icon: <Landmark className="w-6 h-6 text-accent" />,
    description: "Infusing tradition with vibrant entertainment.",
  },
  {
    name: "Charity Events & Fundraisers",
    icon: <Handshake className="w-6 h-6 text-accent" />,
    description: "Hosting with heart for a greater cause.",
  },
  {
    name: "Community Gatherings",
    icon: <Users className="w-6 h-6 text-accent" />,
    description: "Bringing people together for shared experiences.",
  },
  {
    name: "School/College Events",
    icon: <GraduationCap className="w-6 h-6 text-accent" />,
    description: "Graduations, farewells, and youth-centric events.",
  },
  {
    name: "Religious Ceremonies & Gatherings",
    icon: <Church className="w-6 h-6 text-accent" />,
    description: "Respectful and uplifting hosting for sacred occasions.",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const tabContentVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
};

const Services = () => {
  const [activeTab, setActiveTab] = useState<"corporate" | "social">("corporate");

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Professional Glow Pulse Background */}
      <GlowPulse />

      <div className="relative w-full py-16 bg-gradient-to-br from-primary/10 to-accent/10 z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground"
          >
            Services Tailored For You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            Blending energy, professionalism, and heart turning every event into a lasting memory.
          </motion.p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-12 z-10">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          {/* Mobile: vertical pill toggle, Desktop: original pill toggle */}
          <div className="w-full flex flex-col items-center md:hidden">
            <div className="flex w-full max-w-xs mx-auto bg-card rounded-xl shadow-md overflow-hidden border border-border">
              <button
                className={`flex-1 px-4 py-3 font-semibold font-display text-base transition-colors duration-200 focus:outline-none flex items-center justify-center gap-2
                  ${activeTab === "corporate"
                    ? "bg-primary/15 text-primary"
                    : "bg-transparent text-muted-foreground hover:text-primary"
                  }
                  rounded-l-xl
                `}
                onClick={() => setActiveTab("corporate")}
                aria-selected={activeTab === "corporate"}
              >
                <Briefcase className="w-5 h-5" />
                <span className="whitespace-nowrap">Corporate</span>
              </button>
              <button
                className={`flex-1 px-4 py-3 font-semibold font-display text-base transition-colors duration-200 focus:outline-none flex items-center justify-center gap-2
                  ${activeTab === "social"
                    ? "bg-accent/15 text-accent"
                    : "bg-transparent text-muted-foreground hover:text-accent"
                  }
                  rounded-r-xl
                `}
                onClick={() => setActiveTab("social")}
                aria-selected={activeTab === "social"}
              >
                <Heart className="w-5 h-5" />
                <span className="whitespace-nowrap">Social</span>
              </button>
            </div>
          </div>
          {/* Desktop: original pill toggle */}
          <div className="relative hidden md:flex bg-card rounded-full shadow-md overflow-hidden w-fit">
            {/* Animated background for active tab */}
            <motion.div
              className="absolute top-0 left-0 h-full w-1/2 z-0 rounded-full"
              initial={false}
              animate={{
                x: activeTab === "corporate" ? 0 : "100%",
                background:
                  activeTab === "corporate"
                    ? "linear-gradient(90deg,rgba(211,84,0,0.15),rgba(211,84,0,0.20))"
                    : "linear-gradient(90deg,rgba(230,126,34,0.15),rgba(230,126,34,0.20))",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                width: "50%",
                pointerEvents: "none",
              }}
            />
            <button
              className={`relative z-10 px-6 py-2 font-semibold font-display text-lg transition-colors duration-200 rounded-full focus:outline-none ${
                activeTab === "corporate"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => setActiveTab("corporate")}
              aria-selected={activeTab === "corporate"}
            >
              <span className="inline-flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Corporate Events
              </span>
            </button>
            <button
              className={`relative z-10 px-6 py-2 font-semibold font-display text-lg transition-colors duration-200 rounded-full focus:outline-none ${
                activeTab === "social"
                  ? "text-accent"
                  : "text-muted-foreground hover:text-accent"
              }`}
              onClick={() => setActiveTab("social")}
              aria-selected={activeTab === "social"}
            >
              <span className="inline-flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Social & Community
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content with Animation */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait" initial={false}>
            {activeTab === "corporate" && (
              <motion.section
                key="corporate"
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mb-8"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl md:text-3xl font-bold font-display mb-8 text-primary"
                >
                  Corporate Events
                </motion.h2>
                {/* Desktop Grid - unchanged */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {corporateServices.map((service, i) => (
                    <motion.div
                      key={service.name}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={sectionVariants}
                      className="bg-card rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:shadow-primary/20 transition-shadow group border border-primary/10"
                    >
                      <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary/20 transition">
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">{service.name}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </motion.div>
                  ))}
                </div>
                {/* Mobile Grid - compact layout */}
                <div className="grid md:hidden grid-cols-2 gap-3">
                  {corporateServices.map((service, i) => (
                    <motion.div
                      key={service.name}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={sectionVariants}
                      className="bg-card rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:shadow-lg hover:shadow-primary/20 transition-shadow group border border-primary/10"
                    >
                      <div className="mb-2 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition">
                        <div className="w-4 h-4 text-primary">
                          {service.icon}
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold mb-1 text-foreground text-center leading-tight">{service.name}</h3>
                      <p className="text-xs text-muted-foreground text-center leading-relaxed">{service.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
            {activeTab === "social" && (
              <motion.section
                key="social"
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mb-8"
              >
                <motion.h2
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl md:text-3xl font-bold font-display mb-8 text-accent"
                >
                  Social & Community Events
                </motion.h2>
                {/* Desktop Grid - unchanged */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {socialServices.map((service, i) => (
                    <motion.div
                      key={service.name}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={sectionVariants}
                      className="bg-card rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:shadow-accent/20 transition-shadow group border border-accent/10"
                    >
                      <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 group-hover:bg-accent/20 transition">
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">{service.name}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </motion.div>
                  ))}
                </div>
                {/* Mobile Grid - compact layout */}
                <div className="grid md:hidden grid-cols-2 gap-3">
                  {socialServices.map((service, i) => (
                    <motion.div
                      key={service.name}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={sectionVariants}
                      className="bg-card rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:shadow-lg hover:shadow-accent/20 transition-shadow group border border-accent/10"
                    >
                      <div className="mb-2 flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 group-hover:bg-accent/20 transition">
                        <div className="w-4 h-4 text-accent">
                          {service.icon}
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold mb-1 text-foreground text-center leading-tight">{service.name}</h3>
                      <p className="text-xs text-muted-foreground text-center leading-relaxed">{service.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Services;