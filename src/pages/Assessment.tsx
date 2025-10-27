export default function Assessment() {
  return (
    <div style={{ maxWidth: 900, margin: "24px auto" }}>
      <h1>Security Readiness Assessment</h1>
      <div style={{ border: "2px dashed red", borderRadius: 12, padding: 8 }}>
        <iframe
          src="https://tally.so/embed/mDl82b?alignLeft=1&hideTitle=1&dynamicHeight=1"
          width="100%"
          height="900"
          style={{ display: "block", width: "100%", border: 0, borderRadius: 12, background: "transparent" }}
          title="Tally Test"
          allow="clipboard-write"
        />
      </div>
    </div>
  );
}
