// e.g., src/pages/Assessment.tsx
import TallyInline from "../components/TallyInline";

export default function Assessment() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Security Readiness Assessment</h1>
      <TallyInline />
    </main>
  );
}
