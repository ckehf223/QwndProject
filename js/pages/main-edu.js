// 메인 페이지: 교육 현황(숫자 카운트업) · 교육 후기 카드 렌더링 (데이터: js/data/edu.js)
(function () {
  var data = OWND.edu;
  if (!data) return;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  var STAR = '<svg viewBox="-12 -12 24 24" aria-hidden="true"><path d="M0-11Q1.6-1.6 11 0Q1.6 1.6 0 11Q-1.6 1.6-11 0Q-1.6-1.6 0-11Z" fill="currentColor"/></svg>';
  var fmt = function (n) { return Math.round(n).toLocaleString('ko-KR'); };

  // 샘플 데이터 표시
  if (data.sample) {
    document.querySelectorAll('[data-sample-note]').forEach(function (el) { el.hidden = false; });
  }

  // 교육 현황
  var statsEl = document.getElementById('edu-stats');
  if (statsEl) {
    statsEl.innerHTML = data.stats.map(function (s) {
      return (
        '<li class="stat-card">' +
          '<span class="stat-icon">' + STAR + '</span>' +
          '<span class="stat-label">' + esc(s.label) + '</span>' +
          '<strong class="stat-num"><span class="count" data-to="' + s.value + '">' + fmt(s.value) + '</span><small>' + esc(s.unit) + '</small></strong>' +
        '</li>'
      );
    }).join('');

    // 화면에 들어오면 0부터 카운트업 (움직임 줄이기 설정 시 최종값 그대로)
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && 'IntersectionObserver' in window) {
      var counts = statsEl.querySelectorAll('.count');
      counts.forEach(function (el) { el.textContent = '0'; });
      var io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        var start = null, DUR = 1400;
        function tick(t) {
          if (start === null) start = t;
          var p = Math.min(1, (t - start) / DUR);
          var e = 1 - Math.pow(1 - p, 3);
          counts.forEach(function (el) { el.textContent = fmt(Number(el.getAttribute('data-to')) * e); });
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }, { threshold: 0.4 });
      io.observe(statsEl);
    }
  }

  // 교육 후기
  var revEl = document.getElementById('edu-reviews');
  if (revEl) {
    revEl.innerHTML = data.reviews.map(function (r) {
      return (
        '<figure class="review">' +
          '<span class="review-tag">' + esc(r.program) + '</span>' +
          '<blockquote>' +
            '<p class="review-head">“' + esc(r.headline) + '”</p>' +
            '<p class="review-body">' + esc(r.body) + '</p>' +
          '</blockquote>' +
          '<figcaption><strong>' + esc(r.name) + '</strong><span>' + esc(r.meta) + '</span></figcaption>' +
        '</figure>'
      );
    }).join('');
  }
})();
