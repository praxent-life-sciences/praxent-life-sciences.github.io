(function(){
  const nav = document.getElementById('px-nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Year in footer
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

})();

const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

const popup = document.getElementById("popup-message");
const popupIcon = document.getElementById("popup-icon");
const popupTitle = document.getElementById("popup-title");
const popupText = document.getElementById("popup-text");
const popupClose = document.getElementById("popup-close");

function showPopup(success, title, message) {

    popup.classList.add("show");

    popupTitle.textContent = title;
    popupText.textContent = message;

    if(success){
        popupIcon.innerHTML = "✓";
        popupIcon.style.background = "#28a745";
    }else{
        popupIcon.innerHTML = "✕";
        popupIcon.style.background = "#dc3545";
    }
}

popupClose.onclick = () => {
    popup.classList.remove("show");
};

popup.onclick = (e)=>{
    if(e.target===popup){
        popup.classList.remove("show");
    }
};

form.addEventListener("submit", function(e){

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    emailjs.sendForm(
        "service_hxa2618",
        "template_x7w5fhj",
        this
    ).then(()=>{

        form.reset();

        showPopup(
            true,
            "Message Sent!",
            "Thank you! Your message has been sent successfully. Our team will get back to you as soon as possible."
        );

    }).catch((error)=>{

        console.error(error);

        showPopup(
            false,
            "Sending Failed",
            "Sorry! Something went wrong. Please try again."
        );

    }).finally(()=>{

        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-arrow-right"></i>';

    });

});










