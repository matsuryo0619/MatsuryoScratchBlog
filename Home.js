document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("icon_img").addEventListener("click", function () {
    window.open("https://scratch.mit.edu", "_blank");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const buttonHome = document.getElementById("button_home");

  if (buttonHome) {
    buttonHome.addEventListener("click", function () {
      const url = "https://matsuryo0619.github.io/MatsuryoScratchBlog/%E3%81%93%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6.html";
      window.open(url, "_blank");
    });
  } else {
    console.error("Element with ID 'button_home' not found.");
  }
});
