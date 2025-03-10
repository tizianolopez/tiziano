document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.member, .about-us');
    
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const image = section.querySelector('.sticky-image');
            const content = section.querySelector('.section-content');
            if (!image || !content) return;

            const rect = section.getBoundingClientRect();
            const { scaleProgress, effectProgress } = calculateScrollProgress(rect);
            
            if (scaleProgress >= 0 && scaleProgress <= 1) {
                // Image scaling (using scaleProgress 0-1)
                const initialScale = 0.3;
                const finalScale = 1;
                const scaleRange = finalScale - initialScale;
                
                const currentScale = initialScale + (scaleRange * scaleProgress);
                
                // Content fade in and scroll lock only when image is full size
                if (currentScale >= 0.98) {
                    content.style.opacity = '1';
                    image.style.position = 'fixed';
                    image.style.top = '0';
                    
                    // Calculate effects using effectProgress (0-1 after scale complete)
                    const pixelAmount = Math.min(8, effectProgress * 8);
                    const darkenAmount = effectProgress * 0.5; // 50% max darkness
                    
                    image.style.filter = `blur(${pixelAmount}px) brightness(${1 - darkenAmount})`;
                    
                    section.style.pointerEvents = 'auto';
                } else {
                    content.style.opacity = '0';
                    image.style.position = 'sticky';
                    image.style.filter = 'none';
                    section.style.pointerEvents = 'none';
                }
                
                image.style.transform = `scale(${currentScale})`;
            }
        });
    });
});

function calculateScrollProgress(rect) {
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;
    
    // Calculate two different progress values
    const baseScrolled = windowHeight - elementTop;
    
    // Progress for scaling (0-1)
    const scaleProgress = Math.min(Math.max(baseScrolled / (elementHeight * 0.5), 0), 1);
    
    // Progress for effects (0-1, starts after scaling complete)
    const effectProgress = scaleProgress >= 1 
        ? Math.min(Math.max((baseScrolled - elementHeight * 0.5) / (elementHeight * 0.3), 0), 1)
        : 0;
    
    return { scaleProgress, effectProgress };
}