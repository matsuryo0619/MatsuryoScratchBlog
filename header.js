document.addEventListener("DOMContentLoaded", function () {
  // 既存の要素を保持しながらHTMLを追加
  document.body.insertAdjacentHTML('beforeend', `
    <header　id="header">
      <img src="Logo.png" id="icon_img">
      <ul id="header_menu">
        <li class="header_list" data-url="https://example.com/home">ホーム</li>
        <li class="header_list" data-url="https://example.com/about">このサイトについて</li>
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
