import React from 'react';

export type Theme = 'apple' | 'microsoft' | 'default';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState<Theme>('apple');

  React.useEffect(() => {
    // Apply theme to document body
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Hide in production
  if (import.meta.env.MODE === 'production') {
    return null;
  }

  const themes: { value: Theme; label: string }[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'microsoft', label: 'Microsoft' },
    { value: 'default', label: 'Default (Dark)' },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-current opacity-60">Theme:</span>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="text-xs bg-white/10 border border-white/20 rounded px-2 py-1 text-current"
      >
        {themes.map((t) => (
          <option key={t.value} value={t.value} className="bg-slate-800 text-white">
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeToggle;