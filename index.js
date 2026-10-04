(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    nav.classList.toggle('open', open);
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  window.matchMedia('(min-width: 861px)').addEventListener('change', function (e) {
    if (e.matches) setOpen(false);
  });
})();
