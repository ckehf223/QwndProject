// 공통 헤더 컴포넌트
// 사용: <site-header active="main|coaching|archive|partner"></site-header>
(function () {
  var MENU = [
    { key: 'main', label: '메인', href: 'index.html' },
    { key: 'coaching', label: '개인코칭', href: 'coaching.html' },
    { key: 'archive', label: '아카이브', href: 'archive.html' },
    { key: 'partner', label: '파트너', href: 'partner.html' }
  ];

  function render(active) {
    var links = MENU.map(function (m) {
      return '<a href="' + m.href + '"' + (m.key === active ? ' aria-current="page"' : '') + '>' + m.label + '</a>';
    }).join('');

    return (
      '<header class="site-header">' +
        '<div class="wrap bar">' +
          '<a href="index.html" class="logo" aria-label="OWND 메인으로">ownd</a>' +
          '<nav class="site-nav" id="site-nav" aria-label="주 메뉴">' + links + '</nav>' +
          '<div class="bar-actions">' +
            '<button class="btn" type="button" data-contact>상담 문의</button>' +
            '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="메뉴 열기">' +
              '<svg class="open" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
              '<svg class="close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>'
    );
  }

  function bindMenu(header) {
    var toggle = header.querySelector('.menu-toggle');
    var nav = header.querySelector('.site-nav');

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
  }

  customElements.define('site-header', class extends HTMLElement {
    connectedCallback() {
      // 자기 자신을 <header>로 교체해야 sticky가 body 기준으로 동작한다
      var tpl = document.createElement('template');
      tpl.innerHTML = render(this.getAttribute('active'));
      var header = tpl.content.firstElementChild;
      this.replaceWith(header);
      bindMenu(header);
    }
  });
})();
