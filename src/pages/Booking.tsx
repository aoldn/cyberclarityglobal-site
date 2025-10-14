import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// --- HOW TO USE ---
// You already have a Calendly link: https://calendly.com/admin-cyberclarityglobal/30min
// You can use Formspree (free tier) or EmailJS for note delivery.

const CALENDLY_URL = "https://calendly.com/admin-cyberclarityglobal/30min"; // Linked to your account
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwprrokl"; // your Formspree form

export default function Booking() {
  const [scheduled, setScheduled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", notes: "" });

  const calendlyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scriptId = "calendly-script";
    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }

    // Calendly CSS
    const cssId = "calendly-css";
    if (!document.getElementById(cssId)) {
      const l = document.createElement("link");
      l.id = cssId;
      l.rel = "stylesheet";
      l.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(l);
    }

    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === "object" && (e as any).data?.event === "calendly.event_scheduled") {
        setScheduled(true);
        const invitee = (e as any).data?.payload?.invitee;
        if (invitee) {
          setForm((f) => ({
            ...f,
            name: invitee.name || f.name,
            email: invitee.email || f.email,
          }));
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const submitNotes = async () => {
    setSubmitting(true);

    // Validate email before sending
    if (!form.email || !/.+@.+\..+/.test(form.email)) {
      alert("Please enter a valid email so we can reply.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          _subject: "New booking notes from CyberClarityGlobal",
          _replyto: form.email,
          source: "booking-page",
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (err) {
      alert("Couldn't send your notes. Please try again or email hello@cyberclarityglobal.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] w-full bg-gradient-to-b from-slate-900 to-slate-950 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">Book a Call</h1>
        <p className="text-slate-300 mb-8">
          Pick a time that suits you. Once booked, you can share your project details here.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/60 border-slate-800 shadow-xl">
            <CardContent className="p-0">
              <div className="flex items-center gap-2 p-4 border-b border-slate-800">
                <Calendar className="h-5 w-5 text-sky-300" />
                <h2 className="text-white font-medium">Select a Time</h2>
              </div>
              <div ref={calendlyRef}>
                <div
                  className="calendly-inline-widget"
                  data-url={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1`}
                  style={{ minWidth: "320px", height: "780px" }}
                />
                <div className="p-4 text-slate-400 text-xs">
                  <p>
                    If the calendar doesn’t appear (due to network/CSP blockers),
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1 underline decoration-sky-400/60"
                    >
                      open Calendly in a new tab
                    </a>
                    .
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800 shadow-xl">
            <CardContent className="p-0">
              <div className="flex items-center gap-2 p-4 border-b border-slate-800">
                <NotebookPen className="h-5 w-5 text-sky-300" />
                <h2 className="text-white font-medium">Requirements & Notes</h2>
              </div>

              {!scheduled && !submitted && (
                <div className="p-4 text-slate-300">
                  <p>Book a slot on the left. Once confirmed, this form will unlock automatically.</p>
                </div>
              )}

              {scheduled && !submitted && (
                <div className="p-4 space-y-3">
                  <Input
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-slate-200"
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-slate-200"
                  />
                  <Input
                    placeholder="Company (optional)"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-slate-200"
                  />
                  <Input
                    placeholder="Budget (optional)"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-slate-200"
                  />
                  <Textarea
                    placeholder="Describe what outcome you're after, goals, timelines, or special requests."
                    rows={8}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-slate-200"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={submitNotes}
                      disabled={submitting || !form.email}
                      className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold"
                    >
                      {submitting ? "Sending…" : "Send Notes"}
                    </Button>
                  </div>
                </div>
              )}

              {submitted && (
                <div className="p-8 text-center space-y-3">
                  <CheckCircle className="h-10 w-10 mx-auto text-emerald-400" />
                  <h3 className="text-white text-lg font-medium">Thanks — your notes are in!</h3>
                  <p className="text-slate-300">
                    We'll prepare accordingly and confirm the agenda before your call.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <p className="mt-8 text-slate-400 text-sm">
          Prefer email? Contact{" "}
          <a href="mailto:hello@cyberclarityglobal.com" className="underline decoration-sky-400/60">
            hello@cyberclarityglobal.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
