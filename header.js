  // メニュー項目のクリックイベントを追加
  document.querySelectorAll(".header_list").forEach(item => {
    item.addEventListener("click", function () {
      const url = this.getAttribute("data-url");
      if (url) {
        window.location.href ="https://matsuryo0619.github.io/MatsuryoScratchBlog/" + url; // 現在のタブでURLを開く
      }
    });
  });

  // アイコンのクリックイベント
  document.getElementById("icon_img").addEventListener("click", function () {
    window.open("https://scratch.mit.edu");
  });
});
