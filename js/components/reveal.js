// 스크롤 등장 효과: data-reveal 속성이 있는 요소가 화면에 들어오면 부드럽게 나타난다
// 지연: data-reveal="2" → 0.08s × 2 (같은 줄 카드들을 순서대로 띄울 때)
// 페이지 스크립트가 목록을 그린 뒤 실행되도록 각 페이지에서 가장 마지막에 불러온다
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  document.documentElement.classList.add('reveal-on');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  Array.prototype.forEach.call(items, function (el) {
    var step = Number(el.getAttribute('data-reveal')) || 0;
    if (step) el.style.setProperty('--d', (step * 0.08) + 's');
    io.observe(el);
  });
})();
