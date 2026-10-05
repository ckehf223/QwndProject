// 공통 모달 컴포넌트
// 사용: var m = OWND.Modal.create({ wide: false });
//       m.setHead('제목', '설명'); m.body.innerHTML = '...'; m.open();
window.OWND = window.OWND || {};

OWND.Modal = (function () {
  var seq = 0;

  function create(opts) {
    opts = opts || {};
    var id = 'owndModal' + (++seq);

    var dialog = document.createElement('dialog');
    dialog.className = 'modal' + (opts.wide ? ' wide' : '');
    dialog.setAttribute('aria-labelledby', id + 'Title');
    dialog.innerHTML =
      '<div class="modal-head">' +
        '<h2 id="' + id + 'Title"></h2>' +
        '<p hidden></p>' +
        '<button class="modal-close" type="button" aria-label="닫기">&times;</button>' +
      '</div>' +
      '<div class="modal-body"></div>';
    document.body.appendChild(dialog);

    var titleEl = dialog.querySelector('.modal-head h2');
    var descEl = dialog.querySelector('.modal-head p');
    var body = dialog.querySelector('.modal-body');
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      body.scrollTop = 0;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      document.body.classList.add('modal-open');
      if (opts.onOpen) opts.onOpen();
    }

    function close() {
      if (typeof dialog.close === 'function') dialog.close();
      else { dialog.removeAttribute('open'); onClosed(); }
    }

    function onClosed() {
      document.body.classList.remove('modal-open');
      if (opts.onClose) opts.onClose();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function setHead(title, desc) {
      titleEl.textContent = title || '';
      descEl.textContent = desc || '';
      descEl.hidden = !desc;
    }

    dialog.querySelector('.modal-close').addEventListener('click', close);
    // 배경(backdrop) 클릭 시 닫기 — dialog 자체에 padding이 없으므로 target이 dialog면 바깥 클릭
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) close();
    });
    dialog.addEventListener('close', onClosed);

    return { el: dialog, body: body, open: open, close: close, setHead: setHead };
  }

  return { create: create };
})();
