import ImageSequenceHero from "@/components/ImageSequenceHero";
import ContentSections from "@/components/ContentSections";

// We keep the old 3D components in the project folder but don't render them here for now
// import Scene from "@/components/Scene";
// import UIOverlay from "@/components/UIOverlay";
// import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* 
        Image Sequence Hero handles its own preloader and full-screen 
        canvas tied to scroll progress via GSAP.
      */}
      <ImageSequenceHero />
      
      {/* 
        Content Sections below the hero: 
        Story and Car Inventory Placeholder
      */}
      <ContentSections />
    </main>
  );
}
