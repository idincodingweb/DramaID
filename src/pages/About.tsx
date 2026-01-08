import { Header } from "@/components/Header";
import { User, MapPin, Code, Heart, Film, Sparkles } from "lucide-react";
import developerPhoto from "@/assets/developer-profile.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-12">
        <div className="container max-w-4xl">
          {/* Hero Section */}
          <div className="text-center py-12">
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl gradient-text mb-4">
              Tentang DramaID
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Platform streaming drama pendek terbaik untuk pecinta drama Asia
            </p>
          </div>

          {/* Developer Section */}
          <section className="bg-card rounded-3xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Photo */}
              <div className="relative shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden ring-4 ring-primary/20">
                  <img
                    src={developerPhoto}
                    alt="Idin Iskandar, S.Kom"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>

              {/* Developer Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-display font-bold text-2xl md:text-3xl gradient-text mb-2">
                  Idin Iskandar, S.Kom
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Karawang, Jawa Barat, Indonesia</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Seorang web developer yang passionate dalam menciptakan pengalaman digital 
                  yang menarik dan user-friendly. Dengan latar belakang pendidikan di bidang 
                  Teknik Informatika, saya berkomitmen untuk menghadirkan platform hiburan 
                  terbaik bagi masyarakat Indonesia.
                </p>
              </div>
            </div>
          </section>

          {/* About Website Section */}
          <section className="bg-card rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Film className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display font-bold text-xl md:text-2xl gradient-text">
                Tentang Website Ini
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">DramaID</strong> adalah platform streaming drama pendek 
                yang dirancang khusus untuk pecinta drama Asia di Indonesia. Website ini menyediakan 
                akses ke ribuan drama pendek dari berbagai negara seperti Korea, China, dan Thailand 
                dengan kualitas terbaik.
              </p>
              <p>
                Website ini dibangun menggunakan teknologi modern dan terkini untuk memberikan 
                pengalaman streaming yang smooth dan responsif:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="bg-secondary/30 rounded-xl p-4">
                  <h4 className="font-semibold text-foreground mb-2">Frontend</h4>
                  <ul className="text-sm space-y-1">
                    <li>• React 18 + TypeScript</li>
                    <li>• Vite (Build Tool)</li>
                    <li>• Tailwind CSS</li>
                    <li>• Framer Motion (Animasi)</li>
                    <li>• Shadcn/UI Components</li>
                  </ul>
                </div>
                <div className="bg-secondary/30 rounded-xl p-4">
                  <h4 className="font-semibold text-foreground mb-2">Fitur Utama</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Streaming video berkualitas</li>
                    <li>• Pilihan kualitas video (360p-1080p)</li>
                    <li>• Watchlist pribadi</li>
                    <li>• Pencarian drama</li>
                    <li>• Desain responsif</li>
                  </ul>
                </div>
              </div>

              <p>
                Website ini dibuat dengan penuh dedikasi menggunakan <strong className="text-foreground">Lovable.dev</strong>, 
                sebuah platform AI-powered development yang memungkinkan pembuatan aplikasi web 
                modern dengan cepat dan efisien. Proyek ini memanfaatkan API publik untuk 
                menyediakan konten drama yang lengkap dan up-to-date.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="bg-card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display font-bold text-xl md:text-2xl gradient-text">
                Misi Kami
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Film className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Konten Berkualitas</h3>
                <p className="text-sm text-muted-foreground">
                  Menyediakan drama pendek terbaik dengan kualitas video yang optimal
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">User-Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Antarmuka yang mudah digunakan untuk semua kalangan
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Inovasi</h3>
                <p className="text-sm text-muted-foreground">
                  Terus berinovasi untuk pengalaman streaming terbaik
                </p>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="text-center mt-12 text-muted-foreground">
            <p>Dibuat dengan ❤️ di Karawang, Indonesia</p>
            <p className="text-sm mt-2">© 2026 DramaID. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
