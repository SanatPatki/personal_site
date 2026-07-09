/* Liquid-glass cursor: an eased, velocity-stretched glass lens. */
(function () {
    // Skip on touch / coarse-pointer devices — a custom cursor there just hides the pointer.
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var ring = document.createElement('div');
    ring.className = 'glass-cursor';
    document.body.appendChild(ring);

    // Target (actual pointer) and ring (eased) positions.
    var mx = window.innerWidth / 2;
    var my = window.innerHeight / 2;
    var rx = mx, ry = my, prevX = rx, prevY = ry;
    var shown = false;

    var ease = reduceMotion ? 1 : 0.2;

    window.addEventListener('mousemove', function (e) {
        mx = e.clientX;
        my = e.clientY;
        if (!shown) {
            shown = true;
            ring.style.opacity = '1';
        }
    });

    // Hide when the pointer leaves the window.
    document.addEventListener('mouseout', function (e) {
        if (!e.relatedTarget) {
            ring.style.opacity = '0';
            shown = false;
        }
    });

    window.addEventListener('mousedown', function () { ring.classList.add('is-down'); });
    window.addEventListener('mouseup', function () { ring.classList.remove('is-down'); });

    // Grow over interactive elements.
    var INTERACTIVE = 'a, button, [role="button"], .grid-item, input, textarea, select, label';
    document.addEventListener('mouseover', function (e) {
        if (e.target.closest && e.target.closest(INTERACTIVE)) ring.classList.add('is-hovering');
    });
    document.addEventListener('mouseout', function (e) {
        if (e.target.closest && e.target.closest(INTERACTIVE)) ring.classList.remove('is-hovering');
    });

    function tick() {
        rx += (mx - rx) * ease;
        ry += (my - ry) * ease;

        var dx = rx - prevX;
        var dy = ry - prevY;
        prevX = rx;
        prevY = ry;

        var transform = 'translate(' + rx + 'px, ' + ry + 'px)';
        if (!reduceMotion) {
            var speed = Math.min(Math.sqrt(dx * dx + dy * dy), 45);
            var stretch = speed / 130; // ~0..0.35, the "liquid" squish
            var angle = Math.atan2(dy, dx) * 180 / Math.PI;
            transform += ' rotate(' + angle + 'deg) scale(' + (1 + stretch) + ', ' + (1 - stretch * 0.6) + ')';
        }
        ring.style.transform = transform;

        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
})();
