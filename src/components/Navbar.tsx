// src/components/Navbar.tsx
import TallyPopupButton from "./TallyPopupButton";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      {/* ...logo + links... */}
      <TallyPopupButton /> {/* ← opens your Tally form */}
    </header>
  );
}
