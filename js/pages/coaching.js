// 개인코칭 페이지: 프로그램 목록 렌더링 (데이터: js/data/programs.js)
(function () {
  var root = document.getElementById('program-list');
  if (!root) return;

  root.innerHTML = OWND.programs.map(function (p) {
    return (
      '<div class="row">' +
        '<span class="num">' + p.num + '</span>' +
        '<span class="pname"><span class="pre">OWND</span>' + p.name + '<small>' + p.category + '</small></span>' +
        '<span class="pq">' + p.question + '<small>' + p.tagline + '</small></span>' +
        '<button class="more" type="button" data-program="' + p.id + '" aria-label="OWND ' + p.name + ' 자세히 보기">자세히 보기</button>' +
      '</div>'
    );
  }).join('');
})();
