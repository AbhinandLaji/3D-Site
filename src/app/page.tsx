import Scene from "@/components/Scene";
import UIOverlay from "@/components/UIOverlay";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <LoadingScreen />
      
      {/* 
        The Scene component is fixed to the background. 
        It stays in place while the user scrolls.
      */}
      <Scene />
      
      {/* 
        The UIOverlay contains the text sections that take up height 
        and provide the scroll length (e.g., 400vh total).
      */}
      <UIOverlay />
    </main>
  );
}
