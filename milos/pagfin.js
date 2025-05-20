// Carrusel de Perfumes - Datos
const perfumes = [
  {
    image: "https://sv.perfumeriamagie.com/documents/10279/11148/GARMLE313301_M.jpg",
    title: "Obsession Noir",
    price: "$1,299"
  },
  {
    image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1688379595-stronger-with-you-absolutely-de-emporio-armani-64a2a0baa9a3f.png?crop=1xw:1xh;center,top&resize=980:*",
    title: "Midnight Desire",
    price: "$1,499"
  },
  {
    image: "https://www.elpalaciodehierro.com/on/demandware.static/-/Sites-palacio-master-catalog/default/dw1f09c3c0/images/44538142/large/44538142_x1.jpg",
    title: "Golden Essence",
    price: "$1,599"
  },
  {
    image: "https://disfragancias.com/cdn/shop/files/Halloween-dm-2_559feb02-d8b9-4a7b-86e4-c3fa9e59a076.jpg?v=1704491158",
    title: "Velvet Rose",
    price: "$1,399"
  },
  {
    image: "https://img.ltwebstatic.com/images3_spmp/2024/07/06/48/1720249464abbd2f043fde898e271fde1c4445ac47_thumbnail_720x.jpg",
    title: "Ocean Breeze",
    price: "$1,199"
  }
];

// Generar items del carrusel
const perfumeCarousel = document.getElementById('perfumeCarousel');

function generateCarouselItems() {
  perfumes.forEach(perfume => {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.innerHTML = `
      <img src="${perfume.image}" alt="${perfume.title}" class="carousel-image">
      <div class="carousel-info">
        <h3 class="carousel-title">${perfume.title}</h3>
        <p class="carousel-price">${perfume.price}</p>
      </div>
    `;
    perfumeCarousel.appendChild(item);
  });
}

// Efecto de scroll automático para el carrusel
function setupAutoScroll() {
  let scrollAmount = 0;
  const scrollStep = 300;
  const carousel = document.querySelector('.carousel');
  
  function autoScroll() {
    scrollAmount += scrollStep;
    if (scrollAmount > carousel.scrollWidth - carousel.clientWidth) {
      scrollAmount = 0;
    }
    carousel.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  return setInterval(autoScroll, 3000);
}

// Animación de hover para las tarjetas de beneficios
function setupBenefitCards() {
  const benefitCards = document.querySelectorAll('.benefit-card');
  
  benefitCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('ion-icon');
      icon.style.transform = 'rotate(15deg) scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('ion-icon');
      icon.style.transform = 'rotate(0) scale(1)';
    });
  });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  generateCarouselItems();
  const scrollInterval = setupAutoScroll();
  setupBenefitCards();
  
  // Limpiar intervalo al salir de la página
  window.addEventListener('beforeunload', () => {
    clearInterval(scrollInterval);
  });
});