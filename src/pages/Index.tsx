import { useQuery } from "@tanstack/react-query";
import { Sparkles, TrendingUp, Clock, Mic } from "lucide-react";
import { Header } from "@/components/Header";
import { DramaGrid } from "@/components/DramaGrid";
import { SectionHeader } from "@/components/SectionHeader";
import { LoadingGrid } from "@/components/LoadingGrid";
import { fetchForYou, fetchTrending, fetchLatest, fetchDubIndo } from "@/lib/api";

const Index = () => {
  const { data: forYouDramas, isLoading: forYouLoading } = useQuery({
    queryKey: ["forYou"],
    queryFn: fetchForYou,
  });

  const { data: trendingDramas, isLoading: trendingLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrending,
  });

  const { data: latestDramas, isLoading: latestLoading } = useQuery({
    queryKey: ["latest"],
    queryFn: fetchLatest,
  });

  const { data: dubIndoDramas, isLoading: dubIndoLoading } = useQuery({
    queryKey: ["dubIndo"],
    queryFn: fetchDubIndo,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-12">
        {/* Hero Background Glow */}
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-20"
              style={{
                background:
                  "radial-gradient(ellipse, hsl(336 91% 63% / 0.4) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* For You Section */}
          <section className="relative container py-8">
            <SectionHeader
              title="Untuk Kamu"
              subtitle="Drama pilihan yang dipersonalisasi khusus untukmu. Temukan cerita seru yang sesuai selera!"
              icon={Sparkles}
            />
            {forYouLoading ? (
              <LoadingGrid count={6} />
            ) : forYouDramas ? (
              <DramaGrid dramas={forYouDramas.slice(0, 12)} />
            ) : null}
          </section>
        </div>

        {/* Trending Section */}
        <section className="container py-8">
          <SectionHeader
            title="Trending"
            subtitle="Drama yang sedang viral dan banyak ditonton"
            icon={TrendingUp}
            href="/trending"
          />
          {trendingLoading ? (
            <LoadingGrid count={6} />
          ) : trendingDramas ? (
            <DramaGrid dramas={trendingDramas.slice(0, 12)} />
          ) : null}
        </section>

        {/* Dub Indo Section */}
        <section className="container py-8">
          <SectionHeader
            title="Sulih Suara Indonesia"
            subtitle="Drama dengan dubbing bahasa Indonesia"
            icon={Mic}
          />
          {dubIndoLoading ? (
            <LoadingGrid count={6} />
          ) : dubIndoDramas ? (
            <DramaGrid dramas={dubIndoDramas.slice(0, 12)} />
          ) : null}
        </section>

        {/* Latest Section */}
        <section className="container py-8">
          <SectionHeader
            title="Drama Terbaru"
            subtitle="Update drama terbaru setiap hari"
            icon={Clock}
          />
          {latestLoading ? (
            <LoadingGrid count={6} />
          ) : latestDramas ? (
            <DramaGrid dramas={latestDramas.slice(0, 12)} />
          ) : null}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container text-center text-muted-foreground text-sm">
          <p>© 2026 DramaID. Streaming drama pendek terbaik.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
