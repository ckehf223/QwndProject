// 메인 페이지: "이런 질문, 한 번쯤 해보셨나요?"
// 1) 질문 카드 (텍스트만)  2) 전체 수치를 모은 막대 도표 하나
(function () {
  var QUESTIONS = [
    { emoji: "💼", title: "취업·진로", q: "내가 원하는 일을 할 수 있을까?" },
    { emoji: "💰", title: "돈·경제적 안정", q: "돈을 충분히 벌 수 있을까?" },
    {
      emoji: "🧑‍🤝‍🧑",
      title: "인간관계",
      q: "좋은 사람들과 관계를 맺을 수 있을까?",
    },
    {
      emoji: "❤️",
      title: "연애·결혼",
      q: "누구를 만나고 어떻게 관계를 만들어갈까?",
    },
    { emoji: "🏠", title: "주거·독립", q: "언제 독립하고 어디서 살아야 하지?" },
    {
      emoji: "🧠",
      title: "정신적 소진",
      q: "왜 이렇게 지치지? 계속 이렇게 살아도 되나?",
    },
    {
      emoji: "🪞",
      title: "자기이해·정체성",
      q: "나는 뭘 좋아하고 어떤 사람이지?",
    },
    {
      emoji: "🔮",
      title: "삶의 방향성 불안",
      q: "앞으로 내 삶이 어떻게 될까?",
    },
  ];

  // 도표 데이터 (자기이해·정체성은 단일 비율이 없어 제외)
  var STATS = [
    { label: "취업·진로", value: 95.9 },
    { label: "돈·경제적 안정", value: 93.0 },
    { label: "인간관계", value: 94.7 },
    { label: "연애", value: 78.3 },
    { label: "결혼", value: 74.4 },
    { label: "독립생활", value: 45.6 },
    { label: "번아웃", value: 32.2 },
    { label: "삶의 방향성", value: 39.1 },
  ];

  var cards = document.getElementById("qcards");
  if (cards) {
    cards.innerHTML = QUESTIONS.map(function (s) {
      return (
        '<article class="qcard">' +
        '<span class="emoji" aria-hidden="true">' +
        s.emoji +
        "</span>" +
        "<div><h3>" +
        s.title +
        "</h3><p>“" +
        s.q +
        "”</p></div>" +
        "</article>"
      );
    }).join("");
  }

  var bars = document.getElementById("chart-bars");
  if (!bars) return;

  bars.innerHTML = STATS.slice()
    .sort(function (a, b) {
      return b.value - a.value;
    })
    .map(function (s) {
      var v = s.value.toFixed(1);
      return (
        '<li class="cbar" title="' +
        s.label +
        " " +
        v +
        '%">' +
        '<span class="cbar-label">' +
        s.label +
        "</span>" +
        '<span class="cbar-track"><span class="cbar-fill" style="--v:' +
        s.value +
        '"></span></span>' +
        '<span class="cbar-val">' +
        v +
        "%</span>" +
        "</li>"
      );
    })
    .join("");

  // 화면에 들어오면 막대가 차오르도록
  var chart = document.getElementById("concern-chart");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          chart.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(chart);
  } else {
    chart.classList.add("in");
  }
})();
