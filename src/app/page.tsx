import WatchSequenceHero from "@/components/WatchSequenceHero";
import WatchContentSections from "@/components/WatchContentSections";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* 
        Watch Sequence Hero handles its own preloader and full-screen 
        canvas tied to scroll progress via GSAP.
      */}
      <WatchSequenceHero />
      
      {/* 
        Content Sections below the hero: 
        The Case, The Movement, The Band, Timekeeping, Configure Yours
      */}
      <WatchContentSections />
    </main>
  );
}
