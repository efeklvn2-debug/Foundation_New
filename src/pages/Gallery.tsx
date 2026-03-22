import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Original images
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";
import event5 from "@/assets/event-5.jpg";
import founderImg from "@/assets/emerhana.jpg";

// New gallery photos
import photo1 from "@/assets/gallery/photo-1.jpg";
import photo2 from "@/assets/gallery/photo-2.jpg";
import photo3 from "@/assets/gallery/photo-3.jpg";
import photo4 from "@/assets/gallery/photo-4.jpg";
import photo5 from "@/assets/gallery/photo-5.jpg";
import photo6 from "@/assets/gallery/photo-6.jpg";
import photo7 from "@/assets/gallery/photo-7.jpg";
import photo8 from "@/assets/gallery/photo-8.jpg";
import photo9 from "@/assets/gallery/photo-9.jpg";
import photo10 from "@/assets/gallery/photo-10.jpg";
import photo11 from "@/assets/gallery/photo-11.jpg";
import photo12 from "@/assets/gallery/photo-12.jpg";
import photo13 from "@/assets/gallery/photo-13.jpg";
import photo14 from "@/assets/gallery/photo-14.jpg";
import photo15 from "@/assets/gallery/photo-15.jpg";
import photo16 from "@/assets/gallery/photo-16.jpg";
import photo17 from "@/assets/gallery/photo-17.jpg";
import photo18 from "@/assets/gallery/photo-18.jpg";
import photo19 from "@/assets/gallery/photo-19.jpg";
import photo20 from "@/assets/gallery/photo-20.jpg";
import photo21 from "@/assets/gallery/photo-21.jpg";
import photo22 from "@/assets/gallery/photo-22.jpg";
import photo23 from "@/assets/gallery/photo-23.jpg";
import photo24 from "@/assets/gallery/photo-24.jpg";
import photo25 from "@/assets/gallery/photo-25.jpg";
import photo26 from "@/assets/gallery/photo-26.jpg";
import photo27 from "@/assets/gallery/photo-27.jpg";
import photo28 from "@/assets/gallery/photo-28.jpg";
import photo29 from "@/assets/gallery/photo-29.jpg";
import photo30 from "@/assets/gallery/photo-30.jpg";
import photo31 from "@/assets/gallery/photo-31.jpg";
import photo32 from "@/assets/gallery/photo-32.jpg";
import photo33 from "@/assets/gallery/photo-33.jpg";
import photo34 from "@/assets/gallery/photo-34.jpg";
import photo35 from "@/assets/gallery/photo-35.jpg";
import photo36 from "@/assets/gallery/photo-36.jpg";
import photo37 from "@/assets/gallery/photo-37.jpg";

const categories = ["All", "Launch Event", "Leadership", "Community"];

const images = [
  { src: founderImg, cat: "Leadership", alt: "Pa J.I. Emerhana — Founder" },
  { src: event1, cat: "Launch Event", alt: "Foundation launch ceremony" },
  { src: event2, cat: "Launch Event", alt: "Community leaders greeting" },
  { src: event3, cat: "Launch Event", alt: "Dignitaries at the event" },
  { src: event4, cat: "Community", alt: "Community engagement" },
  { src: event5, cat: "Leadership", alt: "Leadership interaction" },
  { src: photo1, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo2, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo3, cat: "Community", alt: "Community gathering" },
  { src: photo4, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo5, cat: "Community", alt: "Community gathering" },
  { src: photo6, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo7, cat: "Leadership", alt: "Leadership engagement" },
  { src: photo8, cat: "Community", alt: "Community gathering" },
  { src: photo9, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo10, cat: "Leadership", alt: "Leadership engagement" },
  { src: photo11, cat: "Community", alt: "Community gathering" },
  { src: photo12, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo13, cat: "Leadership", alt: "Leadership engagement" },
  { src: photo14, cat: "Community", alt: "Community gathering" },
  { src: photo15, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo16, cat: "Leadership", alt: "Leadership engagement" },
  { src: photo17, cat: "Community", alt: "Community gathering" },
  { src: photo18, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo19, cat: "Leadership", alt: "Leadership engagement" },
  { src: photo20, cat: "Community", alt: "Community gathering" },
  { src: photo21, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo22, cat: "Community", alt: "Community gathering" },
  { src: photo23, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo24, cat: "Leadership", alt: "Leadership engagement" },
  { src: photo25, cat: "Community", alt: "Community gathering" },
  { src: photo26, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo27, cat: "Leadership", alt: "Leadership engagement" },
  { src: photo28, cat: "Community", alt: "Community gathering" },
  { src: photo29, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo30, cat: "Leadership", alt: "Leadership engagement" },
  { src: photo31, cat: "Community", alt: "Community gathering" },
  { src: photo32, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo33, cat: "Leadership", alt: "Leadership engagement" },
  { src: photo34, cat: "Community", alt: "Community gathering" },
  { src: photo35, cat: "Launch Event", alt: "Foundation event moment" },
  { src: photo36, cat: "Leadership", alt: "Leadership engagement" },
  { src: photo37, cat: "Community", alt: "Community gathering" },
];

const GalleryPage = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = filter === "All" ? images : images.filter((i) => i.cat === filter);

  return (
    <>
      <Helmet>
        <title>Gallery — Pa J.I. Emerhana Foundation</title>
        <meta name="description" content="Photos documenting the impact and activities of the Pa J.I. Emerhana Foundation." />
      </Helmet>

      <section className="pt-32 pb-16 bg-primary">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            Gallery
          </motion.h1>
          <p className="text-primary-foreground/70 text-lg">Documenting impact across the Niger Delta.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filter === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src + i}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="group aspect-[4/3] overflow-hidden rounded-xl cursor-pointer outline outline-1 outline-border -outline-offset-1"
                onClick={() => setLightbox(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              alt="Full view"
              className="max-w-full max-h-[85vh] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;