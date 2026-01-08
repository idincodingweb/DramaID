import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { DramaGrid } from "@/components/DramaGrid";
import { LoadingGrid } from "@/components/LoadingGrid";
import { searchDramas } from "@/lib/api";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: dramas, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchDramas(query),
    enabled: !!query,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-12">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <SearchIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl md:text-3xl gradient-text">
                Hasil Pencarian
              </h1>
              <p className="text-muted-foreground">
                {query ? `"${query}"` : "Masukkan kata kunci untuk mencari"}
              </p>
            </div>
          </div>

          {!query ? (
            <div className="text-center py-20">
              <SearchIcon className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Gunakan kolom pencarian di atas untuk mencari drama
              </p>
            </div>
          ) : isLoading ? (
            <LoadingGrid count={12} />
          ) : dramas && dramas.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                Ditemukan {dramas.length} drama
              </p>
              <DramaGrid dramas={dramas} />
            </>
          ) : (
            <div className="text-center py-20">
              <SearchIcon className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Tidak ada hasil</h2>
              <p className="text-muted-foreground">
                Coba kata kunci lain atau jelajahi drama populer
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
