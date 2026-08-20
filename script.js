(function () {
  const hoursEl = document.getElementById('countHours');
  const minutesEl = document.getElementById('countMinutes');
  const secondsEl = document.getElementById('countSeconds');
  const timer = document.getElementById('countdownTimer');

  // Demo timer: 12 hours from first visit. Replace with the real event end timestamp before launch.
  const key = 'northstarEventEnd';
  let end = Number(localStorage.getItem(key));
  const now = Date.now();
  if (!Number.isFinite(end) || end <= now) {
    end = now + 12 * 60 * 60 * 1000;
    localStorage.setItem(key, String(end));
  }

  function tick() {
    const remaining = Math.max(0, end - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');

    if (remaining <= 0) {
      clearInterval(interval);
      timer.setAttribute('aria-label', 'Event has ended');
    }
  }

  tick();
  const interval = setInterval(tick, 1000);

  // Minimal cookie preferences.
  const banner = document.getElementById('cookieBanner');
  const modal = document.getElementById('cookieModal');
  const accept = document.getElementById('cookieAccept');
  const settings = document.getElementById('cookieSettings');
  const save = document.getElementById('cookieSave');
  const analytics = document.getElementById('analyticsToggle');

  const getPrefs = () => {
    try { return JSON.parse(localStorage.getItem('siteCookiePrefs') || 'null'); }
    catch (_) { return null; }
  };
  const setPrefs = (prefs) => {
    localStorage.setItem('siteCookiePrefs', JSON.stringify(prefs));
    banner.hidden = true;
    modal.hidden = true;
  };

  if (!getPrefs()) banner.hidden = false;

  accept?.addEventListener('click', () => setPrefs({ necessary: true, analytics: true, at: new Date().toISOString() }));
  settings?.addEventListener('click', () => {
    const prefs = getPrefs();
    analytics.checked = !!prefs?.analytics;
    modal.hidden = false;
  });
  save?.addEventListener('click', () => setPrefs({ necessary: true, analytics: !!analytics.checked, at: new Date().toISOString() }));
  document.querySelectorAll('[data-close-cookie]').forEach(el => el.addEventListener('click', () => modal.hidden = true));
})();
