document.addEventListener('DOMContentLoaded', () => {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const title = document.querySelector('.title');
    const content = document.querySelector('.content');

    // safe initial state for img2/img3
    [img2, img3].forEach(i => {
        if (i) {
            i.style.opacity = '0';
            i.style.transform = 'scale(0.03) translateY(20px)';
            i.style.filter = 'blur(12px) brightness(0.8)';
            i.style.willChange = 'transform, opacity, filter';
        }
    });
    if (content) content.style.visibility = 'hidden';

    const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
    const easeInCubic = t => t * t * t;

    // Tunables
    const TOTAL_VIEWPORTS = 6;   // longer = slower overall animation
    const START2 = 0.12;        // when img2 starts (scale/appearance)
    const START3 = 0.72;        // when img3 starts (scale/appearance)
    const APPEAR_WINDOW = 0.18; // window used for opacity/entry easing
    const SCALE_BASE = 0.03;
    const SCALE_FACTOR = 2.0;   // growth per unit rawProgress after start
    const BLUR_MAX = 1;        // max blur after BLUR_START
    const BLUR_START = 0.65;    // when blur begins to grow
    const FADE_START = 0.6;     // when global fade-to-zero begins

    // helper: ease-based appear 0..1 over APPEAR_WINDOW starting at `start`
    const appearEase = (rawProgress, start) => {
        const local = clamp((rawProgress - start) / APPEAR_WINDOW, 0, 1);
        return easeOutCubic(local);
    };

    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset;
        const vh = window.innerHeight;
        const rawProgress = scrollPos / (vh * TOTAL_VIEWPORTS); // can exceed 1
        const progress = Math.max(rawProgress, 0);

        // title fade early
        if (title) title.style.opacity = String(clamp(1 - progress * 0.6, 0, 1));

        // img1: dissipate early (unchanged behaviour)
        const p1 = clamp(progress / 0.33);
        const p1e = easeInCubic(p1);
        if (img1) {
            const tx1 = -p1e * vh * 0.6;
            const s1 = 1 + p1e * 1.0;
            img1.style.transform = `translateX(${tx1}px) scale(${s1})`;
            img1.style.opacity = String(clamp(1 - p1 * 1.3, 0, 1));
            img1.style.filter = `blur(${p1e * 4}px)`;
        }

        // global blur progression
        let globalBlur = 0;
        if (progress > BLUR_START) {
            const t = clamp((progress - BLUR_START) / (1 - BLUR_START), 0, 1);
            globalBlur = t * BLUR_MAX;
        }

        // global fade-to-zero progression (starts at FADE_START)
        const fadeFactor = progress > FADE_START ? clamp((progress - FADE_START) / (1 - FADE_START), 0, 1) : 0;

        // --- img2: starts at START2 from small scale, then grows with rawProgress ---
        if (img2) {
            const a2 = appearEase(rawProgress, START2); // controls opacity/entry easing
            // scale starts at SCALE_BASE until rawProgress >= START2, then increases with (rawProgress - START2)
            const scale2 = SCALE_BASE + Math.max(0, rawProgress - START2) * SCALE_FACTOR;
            const tx2 = rawProgress * vh * 0.28 + (1 - a2) * -vh * 0.12;
            const ty2 = (1 - a2) * 60;
            const opacity2 = clamp(a2 * (1 - fadeFactor), 0, 1);
            img2.style.transform = `translateX(${tx2}px) translateY(${ty2}px) scale(${scale2})`;
            img2.style.opacity = String(opacity2);
            img2.style.filter = `blur(${globalBlur}px) saturate(${0.75 + a2 * 0.5}) brightness(${0.85 + a2 * 0.2})`;
        }

        // --- img3: starts LATER at START3 from small scale, then grows with rawProgress ---
        if (img3) {
            const a3 = appearEase(rawProgress, START3);
            const scale3 = SCALE_BASE + Math.max(0, rawProgress - START3) * SCALE_FACTOR;
            const tx3 = rawProgress * vh * 0.28 + (1 - a3) * -vh * 0.12;
            const ty3 = (1 - a3) * 60;
            const opacity3 = clamp(a3 * (1 - fadeFactor), 0, 1);
            img3.style.transform = `translateX(${tx3}px) translateY(${ty3}px) scale(${scale3})`;
            img3.style.opacity = String(opacity3);
            img3.style.filter = `blur(${globalBlur}px) brightness(${0.75 + a3 * 0.45})`;
        }

        // reveal content only once img3 has practically finished appearing
        if (content) {
            const a3local = clamp((rawProgress - START3) / APPEAR_WINDOW, 0, 1);
            content.style.visibility = (a3local >= 0.98 || rawProgress >= 1) ? 'visible' : 'hidden';
        }
    }, { passive: true });
});