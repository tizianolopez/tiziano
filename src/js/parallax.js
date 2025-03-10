document.addEventListener('DOMContentLoaded', () => {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const title = document.querySelector('.title');
    const content = document.querySelector('.content');
    let isTransitionComplete = false;

    // Hide content initially
    content.style.visibility = 'hidden';
    document.body.style.height = '500vh'; // Force scrollable area to be 5x viewport

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const scrollProgress = scrollPosition / (windowHeight * 4); // Progress from 0 to 1

        // Title fade out in first 20% of scroll
        const titleOpacity = Math.max(0, 1 - (scrollProgress));
        title.style.opacity = titleOpacity;

        // First image (0% - 33%)
        if (scrollProgress <= 0.33) {
            const progress = scrollProgress / 0.33;
            img1.style.transform = `translateX(${-progress * windowHeight}px)  scale(${1 + progress*2 })`;
            img1.style.opacity = 1 - progress*1.5;
        } else {
            img1.style.opacity = 0;
        }

        // Second image (33% - 66%)
        if (scrollProgress > 0.2 && scrollProgress <= 0.66) {
            const progress = (scrollProgress - 0.2) / 0.33;
            img2.style.transform = `translateX(${progress * windowHeight}px) translateY(${-1*progress * windowHeight}px) scale(${1 + progress * 2})`;
            img2.style.opacity = 1 - progress*2;
        } else if (scrollProgress <= 0.33) {
            img2.style.opacity = 1;
            img2.style.transform = 'translateX(0) rotate(0) scale(1)';
        } else {
            img2.style.opacity = 0;
        }

        // Third image (66% - 100%)
        if (scrollProgress > 0.5) {
            const progress = (scrollProgress - 0.5) / 0.5;
            img3.style.transform = `translateX(${progress * windowHeight *0.25}px) translateY(${progress * windowHeight}px) scale(${1 + progress * 2.5})`;
            img3.style.opacity = 1 - progress*2;
        } else {
            img3.style.opacity = 1;
            img3.style.transform = 'translateX(0) rotate(0) scale(1)';
        }

        // Show content only after complete scroll
        if (scrollProgress >= 1) {
            content.style.visibility = 'visible';
            if (!isTransitionComplete) {
                isTransitionComplete = true;
                
            }
        } else {
            content.style.visibility = 'hidden';
        }
    });
});