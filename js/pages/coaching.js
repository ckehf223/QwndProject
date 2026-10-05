// 개인코칭 페이지: 프로그램 목록 렌더링 (데이터: js/data/programs.js)
(function () {
  var root = document.getElementById('program-list');
  if (!root) return;

  root.innerHTML = OWND.programs.map(function (p, i) {
    return (
      '<article class="prog card hover" data-reveal="' + (i + 1) + '">' +
        '<span class="num">' + p.num + '</span>' +
        '<div class="pname"><span class="pre">OWND</span><h2>' + p.name + '</h2><small>' + p.category + '</small></div>' +
        '<p class="pq">' + p.question + '<small>' + p.tagline + '</small></p>' +
        '<button class="btn ghost sm arrow more" type="button" data-program="' + p.id + '" aria-label="OWND ' + p.name + ' 자세히 보기">자세히 보기</button>' +
      '</article>'
    );
  }).join('');
})();
