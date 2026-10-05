// 개인코칭 프로그램 상세 모달 컴포넌트
// 트리거: <button data-program="insight">자세히 보기</button>
// 의존: js/components/modal.js, js/data/programs.js
(function () {
  var modal = null;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function list(items) {
    return '<ul>' + items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
  }

  function render(p) {
    var html = '<p class="pm-q">' + esc(p.question) + '</p>';
    if (p.sessions.length) {
      html += '<div class="pm-sessions">' + p.sessions.map(function (items, i) {
        return '<div class="pm-sess"><h3>' + (i + 1) + '회차</h3>' + list(items) + '</div>';
      }).join('') + '</div>';
    }
    if (p.notice) {
      html += '<div class="pm-sess pm-notice"><h3>프로그램 안내 사항</h3>' + list(p.notice) + '</div>';
    }
    html += '<div class="pm-foot"><button class="btn" type="button" data-contact>이 프로그램 상담 신청</button></div>';
    return html;
  }

  function open(id) {
    var p = (OWND.programs || []).filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    if (!modal) modal = OWND.Modal.create({ wide: true });
    modal.setHead(p.num + ' OWND ' + p.name + (p.id === 'wisdom' ? ' (' + p.category + ')' : ''), p.tagline);
    modal.body.innerHTML = render(p);
    // 상담 신청 버튼: 상세 모달을 닫고 신청 폼을 연다 (코칭 주제 미리 선택)
    modal.body.querySelector('[data-contact]').addEventListener('click', function (e) {
      e.stopPropagation();
      modal.close();
      OWND.openContact('coaching');
      var sel = document.getElementById('cf-topic');
      if (sel) sel.value = p.name;
    });
    modal.open();
  }

  OWND.openProgram = open;

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-program]');
    if (trigger) open(trigger.getAttribute('data-program'));
  });
})();
