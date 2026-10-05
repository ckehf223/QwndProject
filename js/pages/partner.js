// 파트너 페이지: 파트너 카드 렌더링 (데이터: js/data/partners.js)
(function () {
  var root = document.getElementById('partner-grid');
  if (!root) return;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  var STAR = '<svg viewBox="-12 -12 24 24" aria-hidden="true"><path d="M0-11Q1.6-1.6 11 0Q1.6 1.6 0 11Q-1.6 1.6-11 0Q-1.6-1.6 0-11Z" fill="currentColor"/></svg>';

  root.innerHTML = OWND.partners.map(function (p) {
    return (
      '<article class="partner">' +
        STAR +
        '<span class="role">' + esc(p.role) + '</span>' +
        '<h2>' + esc(p.name) + '</h2>' +
        '<ul>' + p.items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      '</article>'
    );
  }).join('');
})();
