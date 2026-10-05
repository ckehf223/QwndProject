// 메인 페이지: "이런 질문, 한 번쯤 해보셨나요?" 통계 카드 렌더링
(function () {
  // bars: [{ label, value }] — value가 없으면 note를 표시
  var STATS = [
    { emoji: '💼', title: '취업·진로', q: '내가 원하는 일을 할 수 있을까?', bars: [{ value: 95.9 }] },
    { emoji: '💰', title: '돈·경제적 안정', q: '돈을 충분히 벌 수 있을까?', bars: [{ value: 93.0 }] },
    { emoji: '🧑‍🤝‍🧑', title: '인간관계', q: '좋은 사람들과 관계를 맺을 수 있을까?', bars: [{ value: 94.7 }] },
    { emoji: '❤️', title: '연애·결혼', q: '누구를 만나고 어떻게 관계를 만들어갈까?', bars: [{ label: '연애', value: 78.3 }, { label: '결혼', value: 74.4 }] },
    { emoji: '🏠', title: '주거·독립', q: '언제 독립하고 어디서 살아야 하지?', bars: [{ label: '독립생활', value: 45.6 }] },
    { emoji: '🧠', title: '정신적 소진', q: '왜 이렇게 지치지? 계속 이렇게 살아도 되나?', bars: [{ label: '번아웃', value: 32.2 }] },
    { emoji: '🪞', title: '자기이해·정체성', q: '나는 뭘 좋아하고 어떤 사람이지?', note: '직접적인 단일 비율 산출은 어려움' },
    { emoji: '🔮', title: '미래에 대한 불안', q: '앞으로 내 삶이 어떻게 될까?', bars: [{ label: '번아웃 원인 중 진로불안', value: 39.1 }] }
  ];

  var root = document.getElementById('stats');
  if (!root) return;

  root.innerHTML = STATS.map(function (s) {
    var body = s.note
      ? '<p class="na">' + s.note + '</p>'
      : '<div class="bars">' + s.bars.map(function (b) {
          var v = b.value.toFixed(1);
          return (
            '<div class="stat-bar">' +
              '<div class="bar-top">' + (b.label ? '<span>' + b.label + '</span>' : '') + '<span class="val">' + v + '%</span></div>' +
              '<div class="track" role="img" aria-label="' + (b.label ? b.label + ' ' : '') + v + '%"><div class="fill" style="--v:' + b.value + '"></div></div>' +
            '</div>'
          );
        }).join('') + '</div>';

    return (
      '<article class="stat">' +
        '<div class="stat-head"><span class="emoji" aria-hidden="true">' + s.emoji + '</span><h3>' + s.title + '</h3></div>' +
        '<p class="stat-q">“' + s.q + '”</p>' +
        body +
      '</article>'
    );
  }).join('');

  // 화면에 들어오면 막대가 차오르도록
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        root.classList.add('in');
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(root);
  } else {
    root.classList.add('in');
  }
})();
