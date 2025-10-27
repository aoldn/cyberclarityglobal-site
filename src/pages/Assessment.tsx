// src/components/TallyEmbed.tsx
import { useEffect } from "react";

export default function TallyEmbed() {
  useEffect(() => {
    const src = "https://tally.so/widgets/embed.js";
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement("script");
      s.src = src; s.async = true;
      document.body.appendChild(s);
    } else {
      (window as any).Tally?.loadEmbeds?.();
    }
  }, []);

  return (
    <iframe
      data-tally-src="https://tally.so/embed/mDl82b?alignLeft=1&hideTitle=1&dynamicHeight=1"
      width="100%"
      height="600"
      style={{ border: 0, borderRadius: 16, background: "transparent" }}
      title="CyberClarity Assessment"
    />
  );
}
