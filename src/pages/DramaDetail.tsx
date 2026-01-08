import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Play, Calendar, Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDramaDetail, fetchAllEpisodes } from "@/lib/api";
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from "@/lib/watchlist";
import { toast } from "@/hooks/use-toast";

const DramaDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [inWatchlist, setInWatchlist] = useState(false);

  const { data: drama, isLoading } = useQuery({
    queryKey: ["drama", bookId],
    queryFn: () => fetchDramaDetail(bookId!),
    enabled: !!bookId,
  });

  const { data: episodes } = useQuery({
    queryKey: ["episodes", bookId],
    queryFn: () => fetchAllEpisodes(bookId!),
    enabled: !!bookId,
  });

  useEffect(() => {
    if (bookId) {
      setInWatchlist(isInWatchlist(bookId));
    }
  }, [bookId]);

  const handleWatchlistToggle = () => {
    if (!drama) return;

    if (inWatchlist) {
      removeFromWatchlist(drama.bookId);
      setInWatchlist(false);
      toast({ title: "Dihapus dari Watchlist" });
    } else {
      addToWatchlist(drama);
      setInWatchlist(true);
      toast({ title: "Ditambahkan ke Watchlist" });
    }
  };

  const handleWatch = () => {
    navigate(`/watch/${bookId}/1`);
  };

  const handleShare = async () => {
    if (navigator.share && drama) {
      await navigator.share({
        title: drama.bookName,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link disalin!" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-12 container">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="w-full md:w-80 aspect-[3/4] rounded-2xl" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!drama) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Drama tidak ditemukan</h1>
          <Button onClick={() => navigate("/")}>Kembali ke Beranda</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-12">
        <div className="container">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full lg:w-80 shrink-0"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-sm lg:max-w-none">
                <img
                  src={drama.coverWap}
                  alt={drama.bookName}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <Button
                  onClick={handleWatch}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 btn-primary-gradient px-8 py-6 text-base"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Tonton Sekarang
                </Button>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1"
            >
              <h1 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl gradient-text mb-4">
                {drama.bookName}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  <span>{drama.chapterCount} Episode</span>
                </div>
                {drama.shelfTime && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{drama.shelfTime.split(" ")[0]}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {drama.tags?.map((tag) => (
                  <Link
                    key={tag}
                    to={`/search?q=${encodeURIComponent(tag)}`}
                    className="tag-chip"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Button
                  variant="outline"
                  onClick={handleWatchlistToggle}
                  className={inWatchlist ? "border-primary text-primary" : ""}
                >
                  {inWatchlist ? (
                    <BookmarkCheck className="w-4 h-4 mr-2" />
                  ) : (
                    <Bookmark className="w-4 h-4 mr-2" />
                  )}
                  {inWatchlist ? "Tersimpan" : "Simpan"}
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Bagikan
                </Button>
              </div>

              {/* Synopsis */}
              <div className="bg-card rounded-2xl p-6">
                <h2 className="font-semibold text-lg mb-3">Sinopsis</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {drama.introduction}
                </p>
              </div>

              {/* Episode List Preview */}
              {episodes && episodes.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-semibold text-lg mb-4">Daftar Episode</h2>
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                    {episodes.slice(0, 20).map((ep, index) => (
                      <button
                        key={ep.chapterId || index}
                        onClick={() => navigate(`/watch/${bookId}/${index + 1}`)}
                        className="episode-grid-item py-3 text-sm font-medium"
                      >
                        {index + 1}
                      </button>
                    ))}
                    {episodes.length > 20 && (
                      <button
                        onClick={handleWatch}
                        className="episode-grid-item py-3 text-sm font-medium text-primary"
                      >
                        ...
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DramaDetail;
