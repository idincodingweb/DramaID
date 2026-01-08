import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoQualitySelector } from "@/components/VideoQualitySelector";
import { fetchDramaDetail, fetchAllEpisodes, getVideoUrl, Episode } from "@/lib/api";

// Get available qualities from episode
function getAvailableQualities(episode: Episode | undefined): number[] {
  if (!episode?.cdnList?.length) return [360, 540, 720, 1080];
  
  const cdn = episode.cdnList.find((c) => c.isDefault === 1) || episode.cdnList[0];
  if (!cdn?.videoPathList?.length) return [360, 540, 720, 1080];
  
  return cdn.videoPathList.map((v) => v.quality).sort((a, b) => a - b);
}

const Watch = () => {
  const { bookId, episodeNum } = useParams<{ bookId: string; episodeNum: string }>();
  const navigate = useNavigate();
  const currentEpisode = parseInt(episodeNum || "1", 10);
  const [episodePage, setEpisodePage] = useState(1);
  const [videoError, setVideoError] = useState(false);
  const [videoQuality, setVideoQuality] = useState(() => {
    // Load saved quality preference
    const saved = localStorage.getItem("dramaid_video_quality");
    return saved ? parseInt(saved, 10) : 720;
  });
  const episodesPerPage = 30;

  const { data: drama } = useQuery({
    queryKey: ["drama", bookId],
    queryFn: () => fetchDramaDetail(bookId!),
    enabled: !!bookId,
  });

  const { data: episodes, isLoading: episodesLoading } = useQuery({
    queryKey: ["episodes", bookId],
    queryFn: () => fetchAllEpisodes(bookId!),
    enabled: !!bookId,
  });

  const totalEpisodes = drama?.chapterCount || episodes?.length || 0;
  const totalPages = Math.ceil(totalEpisodes / episodesPerPage);

  // Get current episode data and extract video URL
  const currentEpisodeData = episodes?.[currentEpisode - 1];
  const videoUrl = getVideoUrl(currentEpisodeData, videoQuality);
  const availableQualities = getAvailableQualities(currentEpisodeData);

  // Handle quality change
  const handleQualityChange = (quality: number) => {
    setVideoQuality(quality);
    localStorage.setItem("dramaid_video_quality", quality.toString());
    setVideoError(false);
  };

  // Reset video error when episode changes
  useEffect(() => {
    setVideoError(false);
  }, [currentEpisode, videoUrl]);

  // Update episode page when episode changes
  useEffect(() => {
    const pageForEpisode = Math.ceil(currentEpisode / episodesPerPage);
    setEpisodePage(pageForEpisode);
  }, [currentEpisode]);

  const goToEpisode = (ep: number) => {
    if (ep >= 1 && ep <= totalEpisodes) {
      navigate(`/watch/${bookId}/${ep}`);
    }
  };

  const getEpisodesForCurrentPage = () => {
    const start = (episodePage - 1) * episodesPerPage;
    return Array.from({ length: Math.min(episodesPerPage, totalEpisodes - start) }, (_, i) => start + i + 1);
  };

  if (!bookId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Drama tidak valid</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-12">
        <div className="container max-w-5xl">
          {/* Back Button */}
          <Link
            to={`/detail/${bookId}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Detail
          </Link>

          {/* Video Player */}
          <div className="video-container aspect-video mb-4 rounded-2xl overflow-hidden bg-card">
            {episodesLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Skeleton className="w-full h-full" />
              </div>
            ) : videoUrl && !videoError ? (
              <video
                key={`${videoUrl}-${videoQuality}`}
                src={videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full"
                controlsList="nodownload"
                onError={() => setVideoError(true)}
              >
                Browser tidak mendukung video player.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-card">
                <div className="text-center text-muted-foreground p-6">
                  {videoError ? (
                    <>
                      <AlertCircle className="w-12 h-12 mx-auto mb-3 text-destructive" />
                      <p className="font-medium mb-2">Video tidak dapat diputar</p>
                      <p className="text-sm">Coba kualitas lain atau episode lain</p>
                    </>
                  ) : !episodes?.length ? (
                    <>
                      <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin" />
                      <p>Memuat episode...</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-12 h-12 mx-auto mb-3" />
                      <p>Episode tidak tersedia</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Video Quality Selector */}
          <div className="flex justify-end mb-4">
            <VideoQualitySelector
              currentQuality={videoQuality}
              availableQualities={availableQualities}
              onQualityChange={handleQualityChange}
            />
          </div>

          {/* Episode Info & Navigation */}
          <div className="bg-card rounded-2xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display font-bold text-xl md:text-2xl gradient-text">
                  {drama?.bookName || "Memuat..."}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {currentEpisodeData?.chapterName || `EP ${currentEpisode}`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToEpisode(currentEpisode - 1)}
                  disabled={currentEpisode <= 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <span className="px-4 text-sm font-medium">
                  {currentEpisode} / {totalEpisodes}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToEpisode(currentEpisode + 1)}
                  disabled={currentEpisode >= totalEpisodes}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Episode List */}
          <div className="bg-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Daftar Episode</h2>
              <span className="text-muted-foreground text-sm">{totalEpisodes} Episode</span>
            </div>

            {/* Page Navigation */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEpisodePage((p) => Math.max(1, p - 1))}
                  disabled={episodePage <= 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  // Show pages around current page
                  let pageNum = i + 1;
                  if (totalPages > 5) {
                    if (episodePage <= 3) {
                      pageNum = i + 1;
                    } else if (episodePage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = episodePage - 2 + i;
                    }
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === episodePage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setEpisodePage(pageNum)}
                      className={pageNum === episodePage ? "bg-primary" : ""}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEpisodePage((p) => Math.min(totalPages, p + 1))}
                  disabled={episodePage >= totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Episode Range Info */}
            <p className="text-center text-sm text-muted-foreground mb-4">
              Episode {(episodePage - 1) * episodesPerPage + 1} -{" "}
              {Math.min(episodePage * episodesPerPage, totalEpisodes)}
            </p>

            {/* Episode Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
              {getEpisodesForCurrentPage().map((ep) => (
                <button
                  key={ep}
                  onClick={() => goToEpisode(ep)}
                  className={`episode-grid-item py-3 text-sm font-medium ${
                    ep === currentEpisode ? "active" : ""
                  }`}
                >
                  {ep}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Watch;
