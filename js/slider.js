// Function to handle carousel behavior
function handleCarousel(selector) {
  const multipleCardCarousel = document.querySelector(selector);
  const btnNext = $(selector + " .carousel-control-next");
  const btnPrev = $(selector + " .carousel-control-prev");
  const carouselInner = $(selector + " .carousel-inner");

  if (window.matchMedia("(min-width: 1000px)").matches) {
    carouselInner.css("overflow", "hidden");

    // Hide buttons
    btnNext.add(btnPrev).css("display", "block");

    // Check if carousel is already initialized
    const carouselInstance = bootstrap.Carousel.getInstance(multipleCardCarousel);
    if (!carouselInstance) {
      // Initialize carousel
      const carousel = new bootstrap.Carousel(multipleCardCarousel, { interval: false });

      const carouselWidth = carouselInner[0].scrollWidth;
      const cardWidth = $(selector + " .carousel-item").width();
      let scrollPosition = 0;

      // Next button click event
      btnNext.on("click", function () {
        if (scrollPosition < carouselWidth) {
          scrollPosition += cardWidth;
          carouselInner.animate({ scrollLeft: scrollPosition }, 600);
        }
      });

      // Previous button click event
      btnPrev.on("click", function () {
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth;
          carouselInner.animate({ scrollLeft: scrollPosition }, 600);
        }
      });
    }
  } else {
    // Remove carousel functionality if it exists
    const carouselInstance = bootstrap.Carousel.getInstance(multipleCardCarousel);
    if (carouselInstance) {
      carouselInstance.dispose();
    }

    // Add slide class and set overflow to auto for mobile view
    $(multipleCardCarousel).addClass("slide");
    carouselInner.css("overflow", "auto");

    // Hide buttons
    btnNext.add(btnPrev).css("display", "none");
  }
}

// Function to handle window resize event with debouncing
const handleWindowResize = debounce(() => {
  handleCarousel(".product:not(.innerNational)");
  handleCarousel(".product.innerNational");
}, 200);

// Initial call to handle carousel based on screen width
handleCarousel(".product:not(.innerNational)");
handleCarousel(".product.innerNational");

// Event listener for window resize with debounced function
$(window).resize(handleWindowResize);

// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
