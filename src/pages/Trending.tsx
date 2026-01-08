import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { Header } from "@/components/Header";
import { DramaGrid } from "@/components/DramaGrid";
import { SectionHeader } from "@/components/SectionHeader";
import { LoadingGrid } from "@/components/LoadingGrid";
import { fetchTrending } from "@/lib/api";

const Trending = () => {
  const { data: dramas, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrending,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-12">
        <section className="container py-8">
          <SectionHeader
            title="Trending"
            subtitle="Drama yang sedang viral dan banyak ditonton"
            icon={TrendingUp}
          />
          {isLoading ? (
            <LoadingGrid count={12} />
          ) : dramas ? (
            <DramaGrid dramas={dramas} />
          ) : (
            <p className="text-muted-foreground text-center py-12">
              Tidak ada drama trending
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Trending;
