
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Maximize,
  Minimize
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

const tracks: Track[] = [
  { id: 1, title: "Cosmic Horizon", artist: "NOVA", duration: "3:45" },
  { id: 2, title: "Electric Dreams", artist: "NOVA ft. Stella", duration: "4:12" },
  { id: 3, title: "Nebula Drift", artist: "NOVA", duration: "3:28" },
  { id: 4, title: "Stardust Memory", artist: "NOVA ft. Rhythm", duration: "5:01" },
];

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Create fake progress update when "playing"
  useEffect(() => {
    let interval: number | null = null;
    
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextTrack();
            return 0;
          }
          return prev + 0.5;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Set up audio visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }
    
    const drawVisualizer = () => {
      if (!ctx || !analyserRef.current) return;
      
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      
      if (isPlaying) {
        analyserRef.current.getByteFrequencyData(dataArray);
        
        const barWidth = (WIDTH / bufferLength) * 2.5;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
          // Generate dynamic height even without real audio data
          const barHeight = isPlaying ? 
            ((dataArray[i] || (Math.sin(i / bufferLength * Math.PI * 2 + Date.now() * 0.005) + 1) * 50) * HEIGHT / 512) :
            0;
          
          const r = 160 + Math.sin(i / bufferLength) * 50;
          const g = 100 + Math.sin(i / bufferLength * 2) * 50;
          const b = 240;
          
          // Add glow effect
          ctx.shadowBlur = 15;
          ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
          
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
          
          x += barWidth + 1;
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(drawVisualizer);
    };
    
    drawVisualizer();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setProgress(0);
  };

  const prevTrack = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    setCurrentTrack(tracks[prevIndex]);
    setProgress(0);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor((seconds / 100) * parseInt(currentTrack.duration.split(":")[0]));
    const secs = Math.floor(((seconds / 100) * parseInt(currentTrack.duration.split(":")[1])) % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-pulse text-gradient-primary">Latest Tracks</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Dive into the cosmic soundscape and explore the latest musical journeys crafted by NOVA
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`relative bg-card rounded-xl shadow-lg overflow-hidden transition-all duration-300 mx-auto ${
            expanded ? "max-w-4xl" : "max-w-2xl"
          } hover:shadow-2xl hover:shadow-primary/20`}
          whileHover={{ scale: 1.02 }}
        >
          {/* Visualization */}
          <div 
            className={`w-full transition-all duration-300 overflow-hidden ${
              expanded ? "h-64" : "h-24"
            }`}
          >
            <canvas 
              ref={canvasRef} 
              className="w-full h-full"
            />
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <motion.div
                animate={{ 
                  scale: isPlaying ? [1, 1.02, 1] : 1,
                  transition: { 
                    repeat: Infinity,
                    duration: 2
                  }
                }}
              >
                <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">{currentTrack.title}</h3>
                <p className="text-sm text-foreground/60">{currentTrack.artist}</p>
              </motion.div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setExpanded(!expanded)}
                className="text-foreground/60 hover:text-foreground hover:scale-110 transition-transform"
              >
                {expanded ? <Minimize size={18} /> : <Maximize size={18} />}
              </Button>
            </div>
            
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span>{formatTime(progress)}</span>
                <span>{currentTrack.duration}</span>
              </div>
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                className="music-progress"
              />
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={prevTrack}
                  className="hover:scale-110 transition-transform"
                >
                  <SkipBack size={20} />
                </Button>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                >
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-12 w-12 rounded-full border-primary text-primary hover:text-primary hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/30 transition-all"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
                  </Button>
                </motion.div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={nextTrack}
                  className="hover:scale-110 transition-transform"
                >
                  <SkipForward size={20} />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMute}
                  className="hover:scale-110 transition-transform"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </Button>
                <div className="w-24">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Track List - Only visible in expanded mode */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-border px-6 py-4"
              >
                <h4 className="font-medium mb-3">Tracks</h4>
                <div className="space-y-2">
                  {tracks.map((track) => (
                    <motion.div 
                      key={track.id}
                      whileHover={{ scale: 1.02, x: 10 }}
                      onClick={() => {
                        setCurrentTrack(track);
                        setProgress(0);
                        setIsPlaying(true);
                      }}
                      className={`p-2 rounded flex justify-between items-center cursor-pointer transition-all ${
                        currentTrack.id === track.id
                          ? "bg-primary/20 text-primary shadow-lg shadow-primary/20"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {currentTrack.id === track.id && isPlaying ? (
                          <div className="w-4 h-4 flex items-center justify-center">
                            <div className="flex gap-0.5">
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  animate={{
                                    height: ["8px", "16px", "8px"],
                                  }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                  }}
                                  className="w-1 bg-primary"
                                ></motion.div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="w-4 h-4 flex items-center justify-center">
                            <Play size={12} className={currentTrack.id === track.id ? "text-primary" : ""} />
                          </div>
                        )}
                        <span>{track.title}</span>
                      </div>
                      <span className="text-sm text-foreground/60">{track.duration}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default MusicPlayer;
