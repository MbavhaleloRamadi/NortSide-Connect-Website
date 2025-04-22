document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
  
    // Simulate loading delay
    setTimeout(() => {
      loader.style.display = "none";
    }, 2000);
  
    // Highlight active nav link on scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-menu a");
  
    window.addEventListener("scroll", () => {
      let current = "";
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
  
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("active");
        }
      });
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const topics = document.querySelectorAll(".research-topic");
    const contents = document.querySelectorAll(".research-content");
    const backButtons = document.querySelectorAll(".back-button");
  
    topics.forEach(topic => {
      topic.addEventListener("click", () => {
        const targetId = topic.dataset.target;
        contents.forEach(content => content.style.display = "none");
        document.getElementById(targetId).style.display = "block";
        topic.parentElement.style.display = "none";
      });
    });
  
    backButtons.forEach(button => {
      button.addEventListener("click", () => {
        contents.forEach(content => content.style.display = "none");
        document.querySelector(".research-list").style.display = "flex";
      });
    });
  });

  

  