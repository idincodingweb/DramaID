import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Trash2, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { getWatchlist, removeFromWatchlist, WatchlistItem } from "@/lib/watchlist";
import { useToast } from "@/hooks/use-toast";

const Watchlist = () => {
  const { toast } = useToast();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const handleRemove = (bookId: string) => {
    removeFromWatchlist(bookId);
    setWatchlist(getWatchlist());
    toast({ title: "Dihapus dari Watchlist" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl md:text-3xl gradient-text">
                Watchlist
              </h1>
              <p className="text-muted-foreground">
                {watchlist.length} drama tersimpan
              </p>
            </div>
          </div>

          {watchlist.length === 0 ? (
            <div className="text-center py-20">
              <Bookmark className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Watchlist kosong</h2>
              <p className="text-muted-foreground mb-6">
                Simpan drama favoritmu untuk ditonton nanti
              </p>
              <Button asChild>
                <Link to="/">Jelajahi Drama</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              <AnimatePresence>
                {watchlist.map((item, index) => (
                  <motion.div
                    key={item.bookId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative rounded-2xl overflow-hidden card-hover"
                  >
                    <Link to={`/detail/${item.bookId}`}>
                      <div className="aspect-[3/4] relative">
                        <img
                          src={item.coverWap}
                          alt={item.bookName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />

                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-primary-foreground">
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span className="text-xs font-medium">
                            {item.chapterCount} Episode
                          </span>
                        </div>

                        {/* Hover Play */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                            <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div className="p-3">
                      <h3 className="font-semibold text-sm line-clamp-2">
                        {item.bookName}
                      </h3>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.bookId)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Watchlist;
