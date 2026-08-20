(function () {
  const banner = document.getElementById('cookieBanner');
  const modal = document.getElementById('cookieModal');
  const accept = document.getElementById('cookieAccept');
  const settings = document.getElementById('cookieSettings');
  const save = document.getElementById('cookieSave');
  const analytics = document.getElementById('analyticsToggle');
  const form = document.getElementById('registrationForm');
  const success = document.getElementById('formSuccess');

  const getPrefs = () => {
    try { return JSON.parse(localStorage.getItem('siteCookiePrefs') || 'null'); } catch (_) { return null; }
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

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    success.hidden = false;
    form.reset();
  });
})();


// Countdown timer: set the real event/registration deadline here before publishing.
// The template starts with a 12-hour example deadline for demonstration.
(function initCountdown(){
  const timer = document.getElementById('countdownTimer');
  if (!timer) return;
  const hoursEl = document.getElementById('countHours');
  const minutesEl = document.getElementById('countMinutes');
  const secondsEl = document.getElementById('countSeconds');
  const durationHours = Number(timer.dataset.durationHours || 12);
  const storageKey = 'northstar_event_deadline_v1';
  let deadline = Number(localStorage.getItem(storageKey));
  if (!Number.isFinite(deadline) || deadline <= Date.now()) {
    deadline = Date.now() + durationHours * 60 * 60 * 1000;
    localStorage.setItem(storageKey, String(deadline));
  }
  function update(){
    let remaining = Math.max(0, deadline - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    if (remaining <= 0) {
      timer.closest('.countdown').classList.add('is-expired');
      clearInterval(interval);
    }
  }
  update();
  const interval = setInterval(update, 1000);
})();
