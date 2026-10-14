// Smooth scroll (Lenis), the section index and the reveals.
(function () {
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var lenis = null;
  if (!reduce && window.Lenis) lenis = new Lenis({ autoRaf: true, anchors: { offset: -52 } });
  function onScroll(fn) {
    if (lenis) lenis.on('scroll', fn);
    else window.addEventListener('scroll', fn, { passive: true });
    window.addEventListener('resize', fn);
  }

  // The index in the bar follows the reader.
  var links = Array.prototype.slice.call(document.querySelectorAll('.index a'));
  var parts = Array.prototype.slice.call(document.querySelectorAll('[data-section]:not(a)'));
  function current() {
    var line = window.innerHeight * 0.4, id = null;
    parts.forEach(function (p) { if (p.getBoundingClientRect().top < line) id = p.getAttribute('data-section'); });
    links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-section') === id); });
  }
  onScroll(current);
  current();

  // Proof cards come in as they reach the screen.
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(reveals, function (r) { r.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  Array.prototype.forEach.call(reveals, function (r) { io.observe(r); });
})();
