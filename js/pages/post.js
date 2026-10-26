// 아카이브 게시글 상세: post.html?id=번호 (데이터: js/data/posts.js)
(function () {
  var A = OWND.archive;
  var root = document.getElementById('post');
  var id = Number(new URLSearchParams(location.search).get('id'));
  var posts = OWND.posts;
  var idx = -1;
  for (var i = 0; i < posts.length; i++) if (posts[i].id === id) { idx = i; break; }

  // SEO: head의 meta/link 값을 게시글 기준으로 갱신 (없으면 생성)
  function setHead(tag, key, val, attr, content) {
    var el = document.head.querySelector(tag + '[' + key + '="' + val + '"]');
    if (!el) { el = document.createElement(tag); el.setAttribute(key, val); document.head.appendChild(el); }
    el.setAttribute(attr, content);
  }

  if (idx < 0) {
    setHead('meta', 'name', 'robots', 'content', 'noindex, follow');
    root.innerHTML =
      '<div class="post-head"><h1>게시글을 찾을 수 없습니다</h1><p>삭제되었거나 주소가 잘못되었습니다.</p></div>' +
      '<div class="post-foot"><div class="back"><a class="btn ghost" href="archive.html">목록으로</a></div></div>';
    return;
  }

  var p = posts[idx];
  document.title = p.title + ' | OWND 아카이브';

  var url = 'https://owndit.netlify.app/post.html?id=' + p.id;
  setHead('link', 'rel', 'canonical', 'href', url);
  setHead('meta', 'name', 'description', 'content', p.summary);
  setHead('meta', 'property', 'og:type', 'content', 'article');
  setHead('meta', 'property', 'og:url', 'content', url);
  setHead('meta', 'property', 'og:title', 'content', document.title);
  setHead('meta', 'property', 'og:description', 'content', p.summary);
  var ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.summary,
    datePublished: p.date.replace(/\./g, '-'),
    url: url,
    image: 'https://owndit.netlify.app/images/og-image.png',
    author: { '@type': 'Organization', name: 'OWND 상담코칭센터' },
    publisher: { '@type': 'Organization', name: 'OWND 상담코칭센터' }
  });
  document.head.appendChild(ld);

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

  var cta =
    '<div class="post-cta"><p>OWND의 프로그램이 궁금하신가요?</p><button class="btn" type="button" data-contact' +
    (p.category === '프로보노' ? '="probono"' : '') + '>' + (p.category === '프로보노' ? '프로보노 코칭 신청' : '상담 문의하기') + '</button></div>';

  root.innerHTML =
    '<nav class="crumb" aria-label="현재 위치"><a href="archive.html">아카이브</a><span>›</span><a href="archive.html?cat=' + encodeURIComponent(p.category) + '">' + A.esc(p.category) + '</a></nav>' +
    '<header class="post-head">' +
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
