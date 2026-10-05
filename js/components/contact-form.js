// 상담 신청 폼 모달 컴포넌트
// 트리거: data-contact 속성이 있는 요소 클릭 시 열림
//   <button data-contact>상담 문의</button>               → 일반 상담 신청
//   <button data-contact="probono">프로보노 신청</button>  → 신청사유 입력칸 추가
// 의존: js/components/modal.js, js/data/programs.js
(function () {
  var modal = null;
  var mode = 'coaching';

  var SOURCES = ['SNS', '지인 소개', '검색'];

  function topicOptions() {
    var opts = (OWND.programs || []).map(function (p) {
      return '<option value="' + p.name + '">' + p.num + ' OWND ' + p.name + ' — ' + p.category + '</option>';
    }).join('');
    return '<option value="" disabled selected>코칭 주제를 선택해주세요</option>' + opts +
      '<option value="미정">아직 잘 모르겠어요 (상담 후 결정)</option>';
  }

  function field(id, label, opts) {
    opts = opts || {};
    return (
      '<div class="field' + (opts.full ? ' full' : '') + '">' +
        '<label for="cf-' + id + '">' + label + (opts.optional ? '<span class="opt">(선택)</span>' : '<span class="req" aria-hidden="true">*</span>') + '</label>' +
        (opts.control || '<input type="' + (opts.type || 'text') + '" id="cf-' + id + '" name="' + id + '"' +
          (opts.optional ? '' : ' required') +
          (opts.placeholder ? ' placeholder="' + opts.placeholder + '"' : '') +
          (opts.attrs || '') + '>') +
        '<span class="err" id="cf-' + id + '-err"></span>' +
      '</div>'
    );
  }

  function formHTML() {
    return (
      '<form class="contact-form" novalidate>' +
        '<div class="form-grid">' +
          field('name', '이름', { placeholder: '홍길동', attrs: ' autocomplete="name"' }) +
          field('age', '나이', { placeholder: '예) 27', attrs: ' inputmode="numeric"' }) +
          field('region', '사는 곳', { placeholder: '예) 서울 관악구' }) +
          field('phone', '전화번호', { type: 'tel', placeholder: '010-0000-0000', attrs: ' autocomplete="tel" inputmode="tel"' }) +
          field('topic', '코칭 주제', { full: true, control: '<select id="cf-topic" name="topic" required>' + topicOptions() + '</select>' }) +
          field('time', '가능 시간대', { full: true, placeholder: '예) 평일 저녁 7시 이후, 주말 오전' }) +
          '<div class="field full probono-only" hidden>' +
            '<label for="cf-reason">신청 사유<span class="req" aria-hidden="true">*</span></label>' +
            '<input type="text" id="cf-reason" name="reason" placeholder="프로보노 코칭을 신청하게 된 이유를 적어주세요">' +
            '<span class="err" id="cf-reason-err"></span>' +
          '</div>' +
          '<fieldset class="field full">' +
            '<legend>유입 경로<span class="opt">(선택 · 복수 선택 가능)</span></legend>' +
            '<div class="checks">' +
              SOURCES.map(function (s) {
                return '<label class="check"><input type="checkbox" name="source" value="' + s + '"><span>' + s + '</span></label>';
              }).join('') +
            '</div>' +
          '</fieldset>' +
        '</div>' +
        '<div class="form-foot">' +
          '<button class="btn" type="submit">신청하기</button>' +
          '<p class="form-note">입력하신 정보는 상담 안내 목적으로만 사용됩니다.</p>' +
        '</div>' +
      '</form>'
    );
  }

  function doneHTML() {
    return (
      '<div class="form-done" role="status">' +
        '<svg width="34" height="34" viewBox="-12 -12 24 24" aria-hidden="true"><path d="M0-11Q1.6-1.6 11 0Q1.6 1.6 0 11Q-1.6 1.6-11 0Q-1.6-1.6 0-11Z" fill="currentColor"/></svg>' +
        '<h3>신청이 접수되었습니다</h3>' +
        '<p>남겨주신 연락처로 빠르게 안내드리겠습니다.<br>나를 발견하는 첫 걸음을 응원합니다.</p>' +
        '<div class="form-foot"><button class="btn ghost" type="button" data-close>닫기</button></div>' +
      '</div>'
    );
  }

  // TODO: 실제 전송 처리 연결 (API, 구글폼, 이메일 서비스 등). 지금은 콘솔 출력만 한다.
  OWND.submitApplication = OWND.submitApplication || function (data) {
    console.log('[OWND] 상담 신청 데이터', data);
    return Promise.resolve();
  };

  function setError(form, name, msg) {
    var input = form.querySelector('[name="' + name + '"]');
    var err = form.querySelector('#cf-' + name + '-err');
    if (!input || !err) return;
    input.closest('.field').classList.toggle('invalid', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    input.setAttribute('aria-describedby', 'cf-' + name + '-err');
    err.textContent = msg || '';
  }

  function validate(form) {
    var v = function (n) { return (form.elements[n].value || '').trim(); };
    var errors = {
      name: v('name') ? '' : '이름을 입력해주세요.',
      age: !v('age') ? '나이를 입력해주세요.' : (/^\d{1,3}$/.test(v('age')) ? '' : '숫자로 입력해주세요.'),
      region: v('region') ? '' : '사는 곳을 입력해주세요.',
      phone: !v('phone') ? '전화번호를 입력해주세요.' : (/^[0-9\-\s]{9,14}$/.test(v('phone')) ? '' : '올바른 전화번호를 입력해주세요.'),
      topic: v('topic') ? '' : '코칭 주제를 선택해주세요.',
      time: v('time') ? '' : '가능 시간대를 입력해주세요.',
      reason: mode === 'probono' && !v('reason') ? '신청 사유를 입력해주세요.' : ''
    };
    var first = null;
    Object.keys(errors).forEach(function (k) {
      setError(form, k, errors[k]);
      if (errors[k] && !first) first = form.elements[k];
    });
    if (first) first.focus();
    return !first;
  }

  function collect(form) {
    var get = function (n) { return form.elements[n].value.trim(); };
    var data = {
      type: mode === 'probono' ? '프로보노 코칭 신청' : '상담 문의',
      name: get('name'),
      age: get('age'),
      region: get('region'),
      phone: get('phone'),
      topic: get('topic'),
      time: get('time'),
      source: Array.prototype.map.call(form.querySelectorAll('[name="source"]:checked'), function (c) { return c.value; })
    };
    if (mode === 'probono') data.reason = get('reason');
    return data;
  }

  function renderForm() {
    modal.body.innerHTML = formHTML();
    var form = modal.body.querySelector('form');
    var probono = form.querySelector('.probono-only');
    probono.hidden = mode !== 'probono';
    form.elements.reason.required = mode === 'probono';

    // 입력하면 해당 필드 오류 해제
    form.addEventListener('input', function (e) {
      if (e.target.name) setError(form, e.target.name, '');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      var btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.textContent = '전송 중...';
      OWND.submitApplication(collect(form)).then(function () {
        modal.body.innerHTML = doneHTML();
        modal.body.querySelector('[data-close]').addEventListener('click', modal.close);
      }).catch(function () {
        btn.disabled = false;
        btn.textContent = '신청하기';
        alert('전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      });
    });
  }

  function open(type) {
    if (!modal) modal = OWND.Modal.create();
    mode = type === 'probono' ? 'probono' : 'coaching';
    if (mode === 'probono') {
      modal.setHead('프로보노(Pro Bono) 코칭 신청', '신청서를 확인한 뒤 개별로 연락드립니다.');
    } else {
      modal.setHead('상담 신청', '아래 내용을 남겨주시면 맞는 프로그램과 일정을 안내해드립니다.');
    }
    renderForm();
    modal.open();
  }

  OWND.openContact = open;

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-contact]');
    if (!trigger) return;
    e.preventDefault();
    open(trigger.getAttribute('data-contact'));
  });
})();
