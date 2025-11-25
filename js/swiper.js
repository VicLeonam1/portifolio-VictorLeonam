/* O SCRIPT.JS PERMANECE EXATAMENTE IGUAL AO ANTERIOR, POIS A LÓGICA DE TRANSIÇÃO (OPACITY/Z-INDEX) NÃO MUDA */
if (typeof gsap === 'undefined') {
    console.error("GSAP não está carregado. Verifique o link no HTML.");
}

document.addEventListener('DOMContentLoaded', () => {
    const slides = gsap.utils.toArray('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    // ... (restante do código JS permanece igual) ...

    slides.forEach((slide, index) => {
        gsap.set(slide, {
            opacity: index === 0 ? 1 : 0,
            zIndex: index === 0 ? 10 : 1,
        });
    });

    function goToSlide(newIndex) {
        if (newIndex < 0 || newIndex >= totalSlides || newIndex === currentIndex) {
            return;
        }

        const currentSlide = slides[currentIndex];
        const nextSlide = slides[newIndex];
        const direction = newIndex > currentIndex ? 1 : -1;
        const duration = 1.0; 

        const tl = gsap.timeline({
            defaults: { ease: "power2.inOut", duration: duration },
            onStart: () => {
                prevBtn.disabled = true;
                nextBtn.disabled = true;
            },
            onComplete: () => {
                prevBtn.disabled = false;
                nextBtn.disabled = false;
                currentIndex = newIndex; 
            }
        });

        // 1. Anima o slide ATUAL para fora
        tl.to(currentSlide, {
            opacity: 0,
            y: -20 * direction, 
            duration: duration * 0.5, 
            zIndex: 1
        }, 0); 

        // 2. Garante que o slide ATUAL volte à posição original 
        tl.set(currentSlide, { y: 0 });

        // 3. Define o slide SEGUINTE com alta opacidade e z-index
        tl.set(nextSlide, {
            zIndex: 10,
            y: 20 * direction * -1, 
            opacity: 0 
        }, 0);

        // 4. Anima o slide SEGUINTE para a posição de visibilidade
        tl.to(nextSlide, {
            opacity: 1,
            y: 0, 
            duration: duration
        }, 0);
    }

    prevBtn.addEventListener('click', () => {
        let newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        let newIndex = (currentIndex + 1) % totalSlides;
        goToSlide(newIndex);
    });
});