/* ============================================================
   ANIMATIONS (framework-independent)
   - Particle/grid hero canvas that reacts to the mouse
   - Typewriter effect for the hero tagline
   - Scroll reveal for sections
   - Scroll progress bar + header state
   All respect prefers-reduced-motion.
   ============================================================ */

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Particle field on a canvas ---------- */
export function initParticles(canvas) {
  if (!canvas || reducedMotion) return;
  const ctx = canvas.getContext("2d");
  let width, height, particles, mouse = { x: -999, y: -999 };
  const COUNT = 70;
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#00e5ff";

  function resize() {
    width = canvas.width = canvas.offsetWidth * devicePixelRatio;
    height = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }

  function makeParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
      r: (Math.random() * 1.6 + 0.6) * devicePixelRatio,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // mouse attraction
      const dx = mouse.x - p.x, dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 140 * devicePixelRatio) {
        p.x += dx * 0.008;
        p.y += dy * 0.008;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.6;
      ctx.fill();
    }
    // connective lines
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = accent;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120 * devicePixelRatio) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }

  resize();
  makeParticles();
  step();
  window.addEventListener("resize", () => { resize(); makeParticles(); });
  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * devicePixelRatio;
    mouse.y = (e.clientY - rect.top) * devicePixelRatio;
  });
  window.addEventListener("mouseleave", () => { mouse.x = -999; mouse.y = -999; });
}

/* ---------- Typewriter cycling through phrases ---------- */
export function initTypewriter(target, phrases) {
  if (!target || !phrases?.length) return;
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "▌";

  if (reducedMotion) {
    target.textContent = phrases[0] + " ";
    target.append(cursor);
    return;
  }

  const textNode = document.createTextNode("");
  target.replaceChildren(textNode, cursor);

  let pi = 0, ci = 0, deleting = false;
  function tick() {
    const phrase = phrases[pi];
    ci += deleting ? -1 : 1;
    textNode.textContent = phrase.slice(0, ci);
    let delay = deleting ? 35 : 55;
    if (!deleting && ci === phrase.length) { delay = 1800; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
    setTimeout(tick, delay);
  }
  tick();
}

/* ---------- Scroll reveal ---------- */
export function initScrollReveal(selector = ".reveal") {
  const items = document.querySelectorAll(selector);
  if (reducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((i) => io.observe(i));
}

/* ---------- Scroll progress + header state + active nav ---------- */
export function initScrollUI() {
  const bar = document.getElementById("scroll-progress");
  const header = document.getElementById("site-header");
  const navLinks = [...document.querySelectorAll(".nav a")];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = `${(scrollTop / (docHeight || 1)) * 100}%`;
    if (header) header.classList.toggle("scrolled", scrollTop > 20);

    // active nav highlight
    let activeId = "";
    for (const sec of sections) {
      if (sec.getBoundingClientRect().top <= 120) activeId = sec.id;
    }
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${activeId}`));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
