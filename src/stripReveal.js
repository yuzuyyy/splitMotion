gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('[data-strip-reveal]').forEach((element) => {

    const color = element.dataset.color || '#ffffff';
    const delay = parseFloat(element.dataset.delay) || 0;
    const direction = element.dataset.direction || 'random';
    const stagger = parseFloat(element.dataset.stagger) || 0.1;
    const ease = element.dataset.ease || 'power2.out';
    const count = parseInt(element.dataset.count) || 5;
    const horizontal = element.hasAttribute('data-horizontal');
    const start = element.dataset.start || "top 80%";

    // ===== FIX: HANDLE IMG =====
    if (element.tagName === 'IMG') {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('data-strip-reveal', '');
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
        element = wrapper;
    }

    element.style.position = 'relative';
    element.style.overflow = 'hidden';

    // CREATE WRAPPER
    const wrapper = document.createElement('div');
    wrapper.classList.add('strip-wrapper');
    if (horizontal) wrapper.classList.add('strip-horizontal');

    element.appendChild(wrapper);

    const strips = [];

    for (let i = 0; i < count; i++) {
        const strip = document.createElement('div');
        strip.classList.add('strip');
        strip.style.background = color;

        wrapper.appendChild(strip);
        strips.push(strip);
    }

    const shuffled = gsap.utils.shuffle(strips);

    ScrollTrigger.create({
        trigger: element,
        start: start,
        toggleActions: 'play none none none',

        onEnter: () => {

            shuffled.forEach((strip, index) => {

                let axis;

                if (horizontal) {

                    axis = 'scaleX';

                    if (direction === 'left')
                        gsap.set(strip, { transformOrigin: 'left' });
                    else if (direction === 'right')
                        gsap.set(strip, { transformOrigin: 'right' });
                    else
                        gsap.set(strip, {
                            transformOrigin: Math.random() > 0.5 ? 'left' : 'right'
                        });

                } else {

                    axis = 'scaleY';

                    if (direction === 'up')
                        gsap.set(strip, { transformOrigin: 'top' });
                    else if (direction === 'down')
                        gsap.set(strip, { transformOrigin: 'bottom' });
                    else
                        gsap.set(strip, {
                            transformOrigin: Math.random() > 0.5 ? 'top' : 'bottom'
                        });

                }

                gsap.to(strip, {
                    [axis]: 0,
                    duration: 0.6,
                    ease: ease,
                    delay: delay + (index * stagger)
                });

            });

        }
    });
});