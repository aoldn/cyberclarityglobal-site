// src/components/TallyPopupButton.tsx
import { useEffect, useState } from "react";

export default function TallyPopupButton() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const src = "https://tally.so/widgets/embed.js";
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if ((window as any).Tally) setReady(true);
      else existing.addEventListener("load", () => setReady(true));
      return;
    }
    const s = document.createElement("script");
    s.src = src; s.async = true; s.onload = () => setReady(true);
    document.body.appendChild(s);
  }, []);

  const open = () =>
    (window as any).Tally?.openPopup("mDl82b", {
      layout: "modal",
      width: 700,
      hideTitle: true,
      transparentBackground: true,
    });

  return (
    <button
      onClick={open}
      disabled={!ready}
      className="px-5 py-2 rounded-2xl shadow font-medium bg-white/10 hover:bg-white/20"
    >
      Start Free Assessment
    </button>
  );
}

// src/components/Navbar.tsx
import TallyPopupButton from "./TallyPopupButton";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <span className="text-xs opacity-60">DEBUG: Navbar mounted</span>
      <TallyPopupButton />
    </header>
  );
}

