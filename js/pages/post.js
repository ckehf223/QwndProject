// 아카이브 게시글 상세: post.html?id=번호 (데이터: js/data/posts.js)
(function () {
  var A = OWND.archive;
  var root = document.getElementById('post');
  var id = Number(new URLSearchParams(location.search).get('id'));
  var posts = OWND.posts;
  var idx = -1;
  for (var i = 0; i < posts.length; i++) if (posts[i].id === id) { idx = i; break; }

  if (idx < 0) {
    root.innerHTML =
      '<div class="post-head"><h1>게시글을 찾을 수 없습니다</h1><p>삭제되었거나 주소가 잘못되었습니다.</p></div>' +
      '<div class="post-foot"><div class="back"><a class="btn ghost" href="archive.html">목록으로</a></div></div>';
    return;
  }

  var p = posts[idx];
  document.title = p.title + ' | OWND 아카이브';

  function block(b) {
    if (b.p) return '<p>' + A.esc(b.p) + '</p>';
    if (b.h) return '<h2>' + A.esc(b.h) + '</h2>';
    if (b.ul) return '<ul>' + b.ul.map(function (t) { return '<li>' + A.esc(t) + '</li>'; }).join('') + '</ul>';
    if (b.quote) return '<blockquote>' + A.esc(b.quote) + '</blockquote>';
    if (b.info) return '<table class="info-tbl"><tbody>' + b.info.map(function (r) {
      return '<tr><th scope="row">' + A.esc(r[0]) + '</th><td>' + A.esc(r[1]) + '</td></tr>';
    }).join('') + '</tbody></table>';
    return '';
  }

  // 목록이 최신순이므로 이전 글 = 더 오래된 글(idx+1), 다음 글 = 더 최근 글(idx-1)
  var prev = posts[idx + 1];
  var next = posts[idx - 1];
  function navRow(label, post) {
    return post
      ? '<a href="post.html?id=' + post.id + '"><span class="lbl">' + label + '</span><span class="ttl">' + A.esc(A.title(post)) + '</span></a>'
      : '';
  }

  var cta = p.status === '모집중'
    ? '<div class="post-cta"><p>이 프로그램에 참여하고 싶으신가요?</p><button class="btn" type="button" data-contact' + (p.category === '프로보노' ? '="probono"' : '') + '>신청 · 문의하기</button></div>'
    : '';

  root.innerHTML =
    '<nav class="crumb" aria-label="현재 위치"><a href="archive.html">아카이브</a><span>›</span><a href="archive.html?cat=' + encodeURIComponent(p.category) + '">' + A.esc(p.category) + '</a></nav>' +
    '<header class="post-head">' +
      A.badge(p.status) +
      '<h1>' + A.esc(A.title(p)) + '</h1>' +
      '<div class="meta"><span>' + A.esc(p.category) + '</span><span>' + p.date + '</span><span>OWND</span></div>' +
    '</header>' +
    A.thumb(p) +
    '<p class="summary">' + A.esc(p.summary) + '</p>' +
    '<div class="post-body">' + p.body.map(block).join('') + '</div>' +
    cta +
    '<div class="post-foot">' +
      '<nav class="post-nav" aria-label="이전·다음 글">' + navRow('이전 글', prev) + navRow('다음 글', next) + '</nav>' +
      '<div class="back"><a class="btn ghost" href="archive.html">목록으로</a></div>' +
    '</div>';
})();
