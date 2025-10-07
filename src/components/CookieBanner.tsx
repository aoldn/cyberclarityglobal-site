import React, { useEffect, useMemo, useState } from "react";

type ConsentCategories = {
  necessary: true;        // always true (cannot be disabled)
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = {
  version: string;        // bump when you change categories/text
  date: string;           // ISO timestamp
  choices: ConsentCategories;
};

const CONSENT_KEY = "ccg_cookie_consent";
const CONSENT_VERSION = "1.0";

const defaultChoices: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function getStoredConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null; // force re-consent on version bump
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(choices: ConsentCategories) {
  const payload: StoredConsent = {
    version: CONSENT_VERSION,
    date: new Date().toISOString(),
    choices,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
}

export function getConsentChoices(): ConsentCategories {
  const stored = getStoredConsent();
  return stored?.choices ?? defaultChoices;
}

/**
 * Optional helper — respect browser "Do Not Track"
 * If DNT is enabled, default to rejecting non-essential cookies.
 */
function dntEnabled() {
  // Some browsers expose as '1' or 'yes'
  // @ts-ignore
  const dnt = navigator?.doNotTrack || window?.doNotTrack || (navigator as any)?.msDoNotTrack;
  return dnt === "1" || dnt === "yes";
}

const panelBase =
  "fixed inset-x-0 bottom-0 z-50 mx-auto w-full md:max-w-3xl md:bottom-6 md:rounded-2xl " +
  "bg-slate-900/95 border border-cyan-900/40 shadow-xl backdrop-blur px-5 py-4";

export const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [choices, setChoices] = useState<ConsentCategories>(defaultChoices);

  // On mount: check stored consent, DNT, and decide whether to show
  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setShow(false);
      setChoices(stored.choices);
      return;
    }
    // Respect Do Not Track by pre-setting opt-out for non-necessary
    const initial = { ...defaultChoices };
    if (dntEnabled()) {
      initial.analytics = false;
      initial.marketing = false;
    }
    setChoices(initial);
    setShow(true);
  }, []);

  // Provide a global hook if you want to lazy-load analytics later
  useEffect(() => {
    (window as any).__ccgConsent = choices;
  }, [choices]);

  const acceptAll = () => {
    const updated: ConsentCategories = { necessary: true, analytics: true, marketing: true };
    saveConsent(updated);
    setChoices(updated);
    setShow(false);
  };

  const rejectNonEssential = () => {
    const updated: ConsentCategories = { necessary: true, analytics: false, marketing: false };
    saveConsent(updated);
    setChoices(updated);
    setShow(false);
  };

  const saveSettings = () => {
    const updated = { ...choices, necessary: true };
    saveConsent(updated);
    setShow(false);
  };

  // Avoid rendering on SSR or before mount
  const ready = useMemo(() => typeof window !== "undefined", []);
  if (!ready || !show) return null;

  return (
    <div className={panelBase}>
      {!settingsOpen ? (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
          <div className="flex-1 text-sm leading-6 text-cyan-200/90">
            <strong className="text-cyan-300">CyberClarityGlobal uses cookies</strong> to
            enhance your browsing experience, analyse site traffic, and improve our services.
            See our <a href="/cookies" className="text-cyan-400 underline">Cookie Policy</a> and{" "}
            <a href="/privacy" className="text-cyan-400 underline">Privacy Policy</a>.
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setSettingsOpen(true)}
              className="rounded-xl px-3 py-2 text-sm border border-cyan-800/60 text-cyan-200/90 hover:bg-cyan-900/30"
            >
              Cookie Settings
            </button>
            <button
              onClick={rejectNonEssential}
              className="rounded-xl px-3 py-2 text-sm bg-slate-800 text-cyan-100 hover:bg-slate-700"
            >
              Reject Non-Essential
            </button>
            <button
              onClick={acceptAll}
              className="rounded-xl px-3 py-2 text-sm bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400"
            >
              Accept All
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-cyan-200/90 text-sm">
            Choose which cookies to allow. You can change this any time from “Cookie Settings”.
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3">
              <input type="checkbox" checked disabled className="mt-1" />
              <span>
                <span className="font-semibold text-cyan-300">Strictly Necessary</span>{" "}
                <span className="text-cyan-200/80">(always on)</span>
                <div className="text-cyan-200/70 text-sm">
                  Required for core site functionality, security, and load balancing.
                </div>
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={choices.analytics}
                onChange={(e) => setChoices((c) => ({ ...c, analytics: e.target.checked }))}
                className="mt-1"
              />
              <span>
                <span className="font-semibold text-cyan-300">Performance & Analytics</span>
                <div className="text-cyan-200/70 text-sm">
                  Helps us understand usage and improve content (e.g., Google Analytics, Vercel Insights).
                </div>
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={choices.marketing}
                onChange={(e) => setChoices((c) => ({ ...c, marketing: e.target.checked }))}
                className="mt-1"
              />
              <span>
                <span className="font-semibold text-cyan-300">Marketing</span>
                <div className="text-cyan-200/70 text-sm">
                  Used for remarketing/ads if implemented (e.g., Google Ads, Meta Pixel).
                </div>
              </span>
            </label>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setSettingsOpen(false)}
              className="rounded-xl px-3 py-2 text-sm border border-cyan-800/60 text-cyan-200/90 hover:bg-cyan-900/30"
            >
              Back
            </button>
            <div className="flex gap-2">
              <button
                onClick={rejectNonEssential}
                className="rounded-xl px-3 py-2 text-sm bg-slate-800 text-cyan-100 hover:bg-slate-700"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={saveSettings}
                className="rounded-xl px-3 py-2 text-sm bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
