// src/components/TallyInline.tsx
import React from "react";

export default function TallyInline() {
  return (
    <iframe
      src="https://tally.so/r/mDl82b?hideTitle=1&transparentBackground=1&alignLeft=1"
      width="100%"
      height="1200"
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title="CyberClarity Assessment"
      style={{ borderRadius: 16, background: "transparent" }}
      allow="clipboard-write"
    />
  );
}
