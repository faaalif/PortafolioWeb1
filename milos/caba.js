document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".perfume-card");

  // Animación de entrada
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    setTimeout(() => {
      card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });

  // Hover efecto: resalta una tarjeta y difumina las demás
  cards.forEach((hoveredCard) => {
    hoveredCard.addEventListener("mouseenter", () => {
      cards.forEach((card) => {
        if (card !== hoveredCard) {
          card.style.filter = "blur(3px) brightness(0.8)";
          card.style.transform = "scale(0.95)";
          card.style.zIndex = "1";
        } else {
          card.style.transform = "scale(1.05)";
          card.style.filter = "none";
          card.style.zIndex = "10";
        }
      });
    });

    hoveredCard.addEventListener("mouseleave", () => {
      cards.forEach((card) => {
        card.style.filter = "none";
        card.style.transform = "scale(1)";
        card.style.zIndex = "auto";
      });
    });
  });

  const botones = document.querySelectorAll('.btn-comprar');
  botones.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.innerText = 'Agregado ✔️';
      btn.disabled = true;
      btn.classList.add('agregado');
      setTimeout(() => {
        btn.innerText = 'Comprar';
        btn.disabled = false;
        btn.classList.remove('agregado');
      }, 2500);
    });
  });
});
