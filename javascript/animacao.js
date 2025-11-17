/* animação conforme rolagem */

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || "0s";
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // anima só uma vez
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
});

/* carrossel */

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const dotsContainer = document.querySelector(".dots");

  // Limpa qualquer dot duplicado antes de criar
  dotsContainer.innerHTML = "";

  // Cria os dots dinamicamente de acordo com os slides
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);
  let current = 0;

  function showSlide(index) {
    current = index;
    track.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.index));
    });
  });

  // autoplay
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 4000);
});