// 아카이브 목록: 카테고리 필터 + 페이지네이션 (데이터: js/data/posts.js)
(function () {
  var PAGE_SIZE = 6;
  var A = OWND.archive;
  var posts = OWND.posts.slice();

  var tabsEl = document.getElementById('archive-tabs');
  var listEl = document.getElementById('archive-list');
  var pagerEl = document.getElementById('archive-pager');

  var params = new URLSearchParams(location.search);
  var state = { cat: params.get('cat') || '전체', page: 1 };

  var cats = ['전체'];
  posts.forEach(function (p) { if (cats.indexOf(p.category) < 0) cats.push(p.category); });
  if (cats.indexOf(state.cat) < 0) state.cat = '전체';

  function renderTabs() {
    tabsEl.innerHTML = cats.map(function (c) {
      return '<button class="tab" type="button" data-cat="' + A.esc(c) + '" aria-pressed="' + (c === state.cat) + '">' + A.esc(c) + '</button>';
    }).join('');
  }

  function filtered() {
    return state.cat === '전체' ? posts : posts.filter(function (p) { return p.category === state.cat; });
  }

  function renderList() {
    var items = filtered();
    var pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    if (state.page > pages) state.page = pages;
    var slice = items.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);

    listEl.innerHTML = slice.length ? slice.map(function (p) {
      return (
        '<a class="post-card" href="post.html?id=' + p.id + '">' +
          A.thumb(p) +
          '<div class="meta"><span>' + A.esc(p.category) + '</span><span>' + p.date + '</span></div>' +
          '<h2>' + A.esc(A.title(p)) + '</h2>' +
          '<p>' + A.esc(p.summary) + '</p>' +
        '</a>'
      );
    }).join('') : '<p class="empty">등록된 게시글이 없습니다.</p>';

    if (pages <= 1) { pagerEl.innerHTML = ''; return; }
    var html = '<button type="button" data-page="' + (state.page - 1) + '"' + (state.page === 1 ? ' disabled' : '') + ' aria-label="이전 페이지">‹</button>';
    for (var i = 1; i <= pages; i++) {
      html += '<button type="button" data-page="' + i + '"' + (i === state.page ? ' aria-current="page"' : '') + '>' + i + '</button>';
    }
    html += '<button type="button" data-page="' + (state.page + 1) + '"' + (state.page === pages ? ' disabled' : '') + ' aria-label="다음 페이지">›</button>';
    pagerEl.innerHTML = html;
  }

  tabsEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]');
    if (!b) return;
    state.cat = b.getAttribute('data-cat');
    state.page = 1;
    var url = state.cat === '전체' ? location.pathname : '?cat=' + encodeURIComponent(state.cat);
    history.replaceState(null, '', url);
    renderTabs();
    renderList();
  });

  pagerEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-page]');
    if (!b || b.disabled) return;
    state.page = Number(b.getAttribute('data-page'));
    renderList();
    tabsEl.scrollIntoView({ block: 'start' });
  });

  renderTabs();
  renderList();
})();
