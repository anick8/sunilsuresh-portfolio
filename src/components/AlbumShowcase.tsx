import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, X, Music, Mic, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";

const AlbumShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    {
      src: "/YoutubeVideos/beatboxing.mp4",
      title: "Beatboxing Mastery",
      description: "Raw vocal percussion that pushes boundaries",
      icon: <Mic className="w-6 h-6" />,
      color: "from-primary to-accent",
      category: "VOCAL PERCUSSION"
    },
    {
      src: "/YoutubeVideos/agni.mp4", 
      title: "Agni - Fire Within",
      description: "An explosive fusion of rhythm and melody",
      icon: <Music className="w-6 h-6" />,
      color: "from-accent to-primary",
      category: "FUSION"
    },
    {
      src: "/YoutubeVideos/flute.mp4",
      title: "Ethereal Flute",
      description: "Breathtaking melodies that touch the soul",
      icon: <Wind className="w-6 h-6" />,
      color: "from-primary via-accent to-primary",
      category: "MELODIC"
    }
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  const selectVideo = (index: number) => {
    setCurrentVideoIndex(index);
    setIsPlaying(false);
  };

  const currentVideo = videos[currentVideoIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration with orange theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(211,84,0,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(230,126,34,0.15),transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Performance Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Immerse yourself in Sunil's musical journey across different art forms
          </p>
        </motion.div>

        {/* Video Selection Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {videos.map((video, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectVideo(index)}
              className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                index === currentVideoIndex
                  ? 'bg-gradient-to-br ' + video.color + ' text-white shadow-2xl shadow-primary/30'
                  : 'bg-card hover:bg-muted/50 border border-border/50 hover:shadow-lg hover:shadow-primary/10'
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`p-3 rounded-full ${
                  index === currentVideoIndex ? 'bg-white/20' : 'bg-primary/10'
                }`}>
                  {video.icon}
                </div>
                <div>
                  <p className={`text-xs font-semibold tracking-wide ${
                    index === currentVideoIndex ? 'text-white/80' : 'text-primary'
                  }`}>
                    {video.category}
                  </p>
                  <h3 className={`font-display font-bold ${
                    index === currentVideoIndex ? 'text-white' : 'text-foreground'
                  }`}>
                    {video.title}
                  </h3>
                </div>
              </div>
              <p className={`text-sm ${
                index === currentVideoIndex ? 'text-white/90' : 'text-muted-foreground'
              }`}>
                {video.description}
              </p>
              
              {index === currentVideoIndex && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full shadow-lg"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Main Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className={`relative group overflow-hidden rounded-3xl shadow-2xl shadow-primary/20 ${
            isFullscreen ? 'fixed inset-0 z-50 bg-black flex items-center justify-center' : 'aspect-video'
          }`}>
            {isFullscreen && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 z-50 text-white bg-black/60 hover:bg-black/80 backdrop-blur-sm"
                onClick={toggleFullscreen}
              >
                <X size={24} />
              </Button>
            )}
            
            <AnimatePresence mode="wait">
              <motion.video
                key={currentVideoIndex}
                ref={videoRef}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`w-full h-full object-cover cursor-pointer ${isFullscreen ? 'max-w-full max-h-full' : ''}`}
                onClick={handleVideoClick}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={currentVideo.src} type="video/mp4" />
                Your browser does not support the video tag.
              </motion.video>
            </AnimatePresence>
            
            {/* Enhanced Controls Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 transition-opacity duration-300"
            >
              {/* Top Info Bar */}
              <div className="absolute top-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${currentVideo.color} backdrop-blur-sm shadow-lg`}>
                    <span className="text-white text-sm font-semibold">{currentVideo.category}</span>
                  </div>
                  <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    {currentVideoIndex + 1} of {videos.length}
                  </div>
                </div>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 shadow-lg"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 shadow-lg"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </Button>
                    
                    <div className="text-white">
                      <h4 className="font-semibold">{currentVideo.title}</h4>
                      <p className="text-sm text-white/80">{currentVideo.description}</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 shadow-lg"
                    onClick={toggleFullscreen}
                  >
                    <Maximize size={20} />
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Enhanced Play Button Overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className={`relative bg-gradient-to-r ${currentVideo.color} backdrop-blur-sm text-white rounded-full p-8 shadow-2xl hover:shadow-primary/50 transition-all duration-300 border border-white/20`}
                  >
                    <Play size={40} className="ml-2" />
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AlbumShowcase;