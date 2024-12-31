document.addEventListener("DOMContentLoaded", function () {
  // `<body>`内の一番上に新しい内容を追加
  document.body.insertAdjacentHTML('afterbegin', `
    <header>
      <img src="Logo.png" id="icon_img">
      <ul id="header_menu">
        <li class="header_list" data-url="Home.html">ホーム</li>
        <li class="header_list" data-url="about.html">このサイトについて</li>
      </ul>
    </header>
  `);

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
