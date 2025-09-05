
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg mx-auto text-center"
          >
            {/* 404 Image */}
            <div className="mb-8">
              <img
                src="/sunilImages/sunil/transparentBcg404.png"
                alt="404 Not Found"
                className="w-full max-w-sm mx-auto h-auto object-contain"
              />
            </div>
            
            {/* Error Message */}
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Sorry, this page does not exist
            </h1>
            
            {/* Homepage Button */}
            <Link to="/">
              <Button className="flex items-center gap-2 mx-auto">
                <Home size={16} /> Go to Homepage
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
