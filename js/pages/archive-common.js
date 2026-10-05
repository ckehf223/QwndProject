// 아카이브 목록 · 상세에서 함께 쓰는 헬퍼
window.OWND = window.OWND || {};

OWND.archive = (function () {
  var EN = {
    '세미나': 'Seminar',
    '워크숍': 'Workshop',
    '프로보노': 'Pro Bono',
    '코치 양성': 'Coach Academy',
    '원데이클래스': 'One-day Class',
    '기관 연계': 'Partnership',
    '소식': 'News'
  };

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // post.image가 있으면 이미지, 없으면 브랜드 톤 썸네일
  function thumb(post) {
    return (
      '<div class="thumb t-' + (post.theme || 'navy') + '" aria-hidden="true">' +
        (post.image ? '<img src="' + esc(post.image) + '" alt="">' : '') +
        '<svg viewBox="-12 -12 24 24"><path d="M0-11Q1.6-1.6 11 0Q1.6 1.6 0 11Q-1.6 1.6-11 0Q-1.6-1.6 0-11Z" fill="currentColor"/></svg>' +
        '<span class="en">' + esc(EN[post.category] || post.category) + '</span>' +
      '</div>'
    );
  }

  function title(post) {
    return '[' + post.category + '] ' + post.title;
  }

  return { esc: esc, thumb: thumb, title: title };
})();
