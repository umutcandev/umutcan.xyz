// This script runs before page load to prevent flash of unstyled content
(function() {
  try {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    // Apply the right theme early to prevent flash
    if (storedTheme === 'dark' || (storedTheme === 'system' && prefersDark) || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  } catch (e) {
    // Fallback if something goes wrong
    console.error('Theme setup error:', e);
  }
})(); 