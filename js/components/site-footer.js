// 공통 푸터 컴포넌트
// 사용: <site-footer></site-footer>
(function () {
  // TODO: 실제 사업자 정보·SNS 링크로 교체
  var html =
    '<footer class="site-footer">' +
      '<div class="wrap">' +
        '<div class="top">' +
          '<div class="brand"><a class="logo" href="index.html" aria-label="OWND 메인으로">ownd</a><span class="slg">나다움을 소유하다.</span></div>' +
          '<div class="sns"><a href="#">인스타그램</a><a href="#">블로그</a><a href="#">카카오 채널</a></div>' +
        '</div>' +
        '<div class="bottom">' +
          '<p class="info">' +
            '<span>OWND 상담코칭센터</span><span>대표 [입력]</span><span>사업자등록번호 [입력]</span><br>' +
            '<span>주소 [입력]</span><span>연락처 [입력]</span><span>이메일 [입력]</span>' +
          '</p>' +
          '<p class="copy">&copy; 2026 OWND. All rights reserved.</p>' +
        '</div>' +
      '</div>' +
    '</footer>';

  customElements.define('site-footer', class extends HTMLElement {
    connectedCallback() {
      var tpl = document.createElement('template');
      tpl.innerHTML = html;
      this.replaceWith(tpl.content.firstElementChild);
    }
  });
})();
