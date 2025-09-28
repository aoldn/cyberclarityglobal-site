import React from 'react';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState<string>('default');

  React.useEffect(() => {
    // Apply theme on mount and when theme changes
    const root = document.documentElement;
    root.classList.remove('theme-apple', 'theme-microsoft');
    
    if (theme === 'apple') {
      root.classList.add('theme-apple');
    } else if (theme === 'microsoft') {
      root.classList.add('theme-microsoft');
    }
  }, [theme]);

  return (
    <div className="hidden md:flex items-center gap-2">
      <span className="text-sm text-[color:var(--muted)]">Theme:</span>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="text-sm rounded-lg px-2 py-1 bg-[color:var(--card)] border border-[color:var(--border)] text-[color:var(--text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--cta)]"
      >
        <option value="default">Default</option>
        <option value="apple">Apple</option>
        <option value="microsoft">Microsoft</option>
      </select>
    </div>
  );
};

export default ThemeToggle;