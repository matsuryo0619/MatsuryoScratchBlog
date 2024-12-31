document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("icon_img").addEventListener("click", function () {
    window.open("https://scratch.mit.edu", "_blank");
  });
});

function new(Page) {
  const Page_URL = "https://matsuryo0619.github.io/MatsuryoScratchBlog/" + Page;
  window.open(Page_URL);
}
