(function () {
  var html = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  var icon = btn.querySelector('.icon');
  var label = btn.querySelector('.label');

  function update() {
    var dark = html.getAttribute('data-theme') === 'dark';
    if (icon) icon.textContent = dark ? '☽' : '☀';
    if (label) label.textContent = dark ? 'light' : 'dark';
  }

  btn.addEventListener('click', function () {
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('wassp-theme', next);
    update();
  });

  window
    .matchMedia('(prefers-color-scheme: light)')
    .addEventListener('change', function (e) {
      if (!localStorage.getItem('wassp-theme')) {
        html.setAttribute('data-theme', e.matches ? 'light' : 'dark');
        update();
      }
    });

  update();
})();
