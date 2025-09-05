
import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GalleryHorizontal } from "lucide-react";
import { useGalleryImages } from "@/hooks/useGallery";

const PhotoGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const staticGalleryImages = [
    {
      id: 1,
      url: "/sunilImages/sunil/5.jpeg",
      title: "Live Performance",
    },
    {
      id: 2,
      url: "/sunilImages/sunil/2.jpg",
      title: "Studio Session",
    },
    {
      id: 3,
      url: "/sunilImages/sunil/3.jpeg",
      title: "Recording Equipment",
    },
    {
      id: 4,
      url: "/sunilImages/sunil/4.jpeg",
      title: "Concert Crowd",
    },
    {
      id: 5,
      url: "/sunilImages/sunil/1.jpg",
      title: "Backstage Moments",
    },
    {
      id: 6,
      url: "/sunilImages/sunil/6.jpeg",
      title: "Festival Performance",
    },
    {
      id: 7,
      url: "/sunilImages/sunil/7.JPG",
      title: "Performance Energy",
    },
    {
      id: 8,
      url: "/sunilImages/sunil/8.JPG",
      title: "On Stage",
    },
    {
      id: 9,
      url: "/sunilImages/sunil/9.JPG",
      title: "Creative Session",
    },
    {
      id: 10,
      url: "/sunilImages/sunil/11.JPG",
      title: "Live Show",
    },
    {
      id: 11,
      url: "/sunilImages/sunil/12.JPG",
      title: "Performance Moments",
    },
  ];

  const galleryFeaturedImages = [
    {
      id: 1,
      url: "/sunilImages/sunil/1.jpg",
      title: "World Tour",
    },
    {
      id: 2,
      url: "/sunilImages/sunil/2.jpg",
      title: "Concert Lights",
    },
    {
      id: 3,
      url: "/sunilImages/sunil/3.jpeg",
      title: "Music Production",
    },
  ];

  const { data: cmsImages = [], isLoading } = useGalleryImages();

  const galleryImages = useMemo(() => {
    const fromCms = (cmsImages || [])
      .filter((img: any) => img?.showOnHomepage !== false && Boolean(img?.url))
      .map((img: any, index: number) => ({
        id: img.id ?? `cms-${index}`,
        url: img.url,
        title: img.title,
        sortOrder: typeof img.sortOrder === "number" ? img.sortOrder : Number.MAX_SAFE_INTEGER,
        source: "cms" as const,
      }));

    const staticWithOrder = staticGalleryImages.map((img, index) => ({
      ...img,
      sortOrder: index,
      source: "static" as const,
    }));

    const merged = [...staticWithOrder, ...fromCms]
      .sort((a, b) => {
        const diff = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
        if (diff !== 0) return diff;
        // Tie-breaker: prefer CMS over static when sortOrder is equal
        if ((a as any).source === "cms" && (b as any).source === "static") return -1;
        if ((a as any).source === "static" && (b as any).source === "cms") return 1;
        return 0;
      })
      .map((img, index) => ({ id: (img as any).id ?? index, url: (img as any).url, title: (img as any).title }));

    return merged;
  }, [cmsImages]);

  return (
    <motion.section 
      className="py-20 bg-card relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-noise opacity-10 z-0" />
      
      {/* Section Header */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <GalleryHorizontal className="text-primary" size={24} />
            <h2 className="text-3xl md:text-4xl font-display font-bold">The Wall</h2>
          </div>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Visual moments from performances, studio sessions, and behind the scenes
          </p>
        </motion.div>

        {/* Featured Images - 3D Perspective Gallery */}
        {/* <div className="mb-16 perspective-container" ref={containerRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {galleryFeaturedImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="relative overflow-hidden rounded-2xl shadow-xl"
                initial={{ 
                  opacity: 0,
                  rotateY: 25,
                  rotateX: 15,
                  scale: 0.9
                }}
                whileInView={{ 
                  opacity: 1,
                  rotateY: 0,
                  rotateX: 0,
                  scale: 1
                }}
                transition={{ 
                  duration: 0.7,
                  delay: index * 0.2,
                  type: "spring", 
                  stiffness: 70
                }}
                whileHover={{ 
                  z: 20,
                  scale: 1.05,
                  rotateY: index % 2 === 0 ? -5 : 5,
                  rotateX: -5,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
              >
                <AspectRatio ratio={16/9}>
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-display text-xl">{image.title}</h3>
                  </div>
                </AspectRatio>
              </motion.div>
            ))}
          </div>
        </div> */}

        {/* Carousel Gallery */}
        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {galleryImages.map((image, index) => (
                <CarouselItem key={image.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.03,
                      rotateY: index % 2 === 0 ? 2 : -2,
                      transition: { duration: 0.2 }
                    }}
                    className="overflow-hidden rounded-xl relative group"
                  >
                    <AspectRatio ratio={1/1}>
                      <img 
                        src={image.url} 
                        alt={image.title} 
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white font-medium">{image.title}</p>
                      </div>
                    </AspectRatio>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-end gap-2 mt-4">
              <CarouselPrevious className="relative static left-0 right-auto translate-y-0" />
              <CarouselNext className="relative static right-0 left-auto translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </motion.section>
  );
};

export default PhotoGallery;
