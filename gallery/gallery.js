document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded");

  const galleryImages = document.querySelectorAll(".gallery-grid img");
  console.log("✅ Found gallery images:", galleryImages.length);

  const swiperModal = document.getElementById("swiperModal");
  const swiperWrapper = document.getElementById("swiperWrapper");
  const swiperContainer = document.querySelector(".swiper");
  const prevButton = document.querySelector(".swiper-button-prev");
  const nextButton = document.querySelector(".swiper-button-next");

  let swiperInstance = null;

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      console.log("🖼️ Clicked image:", index);
      openModal(index);
    });
  });

  function openModal(startIndex) {
    console.log("📦 openModal triggered with index:", startIndex);
    swiperWrapper.innerHTML = "";

    galleryImages.forEach((img, idx) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      const image = document.createElement("img");
      image.src = img.src;
      image.alt = img.alt || `Slide ${idx + 1}`;

      slide.appendChild(image);
      swiperWrapper.appendChild(slide);
    });

    swiperModal.style.display = "flex";
    console.log("✅ swiperWrapper now has", swiperWrapper.children.length, "slides");

    if (swiperInstance) {
      swiperInstance.destroy(true, true);
    }

    swiperInstance = new Swiper(".swiper", {
      initialSlide: startIndex,
      loop: true,
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      keyboard: {
        enabled: true,
      },
    });

    swiperInstance.slideToLoop(startIndex, 0);
  }

  function closeModal() {
    swiperModal.style.display = "none";
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
  }

  swiperModal.addEventListener("click", (e) => {
    if (e.target === swiperModal) {
      closeModal();
    }
  });

  swiperContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  window.closeModal = closeModal;
});
