
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Music2, 
  Music, 
  ArrowRight,
  Mail,
  Play,
  Disc,
  Calendar,
  Image,
  MessageSquare,
  Briefcase,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Instagram size={20} />, url: "https://www.instagram.com/sunilsureshofficial/?hl=en", label: "Instagram" },
    // { icon: <Twitter size={20} />, url: "#", label: "Twitter" },
    { icon: <Youtube size={20} />, url: "https://www.youtube.com/@sunilsuresh3583", label: "YouTube" },
    // { icon: <Music2 size={20} />, url: "#", label: "Spotify" },
    // { icon: <Music size={20} />, url: "#", label: "Apple Music" },
  ];

  const quickLinks = [
    { name: "Music", path: "/music", icon: <Play size={16} /> },
    { name: "Albums", path: "/albums", icon: <Disc size={16} /> },
    { name: "Tour", path: "/tour", icon: <Calendar size={16} /> },
    { name: "Gallery", path: "/gallery", icon: <Image size={16} /> },
    { name: "Contact", path: "/contact", icon: <MessageSquare size={16} /> },
  ];

  const corporateServices = [
    "Conferences and Seminars",
    "Product Launches",
    "Award Ceremonies",
    "Networking Events",
    "Corporate Galas and Dinners",
    "Team Building Activities",
    "Panel Discussions",
    "Trade Shows and Expos",
    "Workshops and Training Sessions"
  ];

  const socialEvents = [
    "Weddings",
    "Birthdays and Anniversaries",
    "Cultural Festivals",
    "Charity Events and Fundraisers",
    "Community Gatherings",
    "School or College Events (Graduations, Farewells)",
    "Religious Ceremonies and Gatherings"
  ];

  return (
    <footer className="bg-card pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Branding */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link to="/" className="inline-block">
                <h2 className="text-2xl font-display font-bold text-gradient">Sunil Suresh</h2>
              </Link>
            </div>
            <p className="text-foreground/70 mb-6">
              Professional host and beatboxer bringing energy and excitement to events across India with over 8 years of experience.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="bg-muted h-10 w-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Corporate Events */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Briefcase size={18} />
              Corporate Events
            </h3>
            <nav>
              <ul className="space-y-2">
                {corporateServices.map((service, index) => (
                  <li key={index}>
                    <span className="text-sm text-foreground/70 hover:text-primary transition-colors cursor-default">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social and Community Events */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Users size={18} />
              Social & Community Events
            </h3>
            <nav>
              <ul className="space-y-2">
                {socialEvents.map((event, index) => (
                  <li key={index}>
                    <span className="text-sm text-foreground/70 hover:text-primary transition-colors cursor-default">
                      {event}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Get In Touch</h3>
            <p className="text-foreground/70 mb-4">
              Ready to make your event unforgettable? Let's discuss how I can bring energy and entertainment to your next occasion.
            </p>
            <div className="space-y-4 mb-6">
              <div className="group">
                <span className="text-xs text-primary mb-1 block">RECENT WORK</span>
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  TEDx Hyderabad & ICICI I Shine 2023
                </span>
              </div>
              <div className="group">
                <span className="text-xs text-primary mb-1 block">ACHIEVEMENT</span>
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  India's Got Talent Season 5 Semi-Finalist
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-muted border-muted"
              />
              <Button size="icon">
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-foreground/60">
            © {currentYear} Sunil Suresh. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-foreground/60">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
