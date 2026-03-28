// wassp.dev — theme toggle
// Inline the FOUC-prevention snippet in <head>:
//   <script>
//     (function(){var s=localStorage.getItem('wassp-theme');
//     if(s)document.documentElement.setAttribute('data-theme',s);
//     else if(matchMedia('(prefers-color-scheme:light)').matches)
//     document.documentElement.setAttribute('data-theme','light')})();
//   </script>

(function () {
  var STORAGE_KEY = 'wassp-theme';
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
    localStorage.setItem(STORAGE_KEY, next);
    update();
  });

  // Follow OS preference when user hasn't made a manual choice
  window
    .matchMedia('(prefers-color-scheme: light)')
    .addEventListener('change', function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) {
        html.setAttribute('data-theme', e.matches ? 'light' : 'dark');
        update();
      }
    });

  update();
})();
