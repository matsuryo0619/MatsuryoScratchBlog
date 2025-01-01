const loadSplSheet = async () => {
  try {
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${uniq.splSheetID}/gviz/tq?tqx=out:csv&tq=${query}&headers=0`);
    if (!response.ok) throw new Error('Failed to fetch comments');

    const csv = await response.text();

    // alertで表示
    alert(`取得したデータ:\n${csv}`);

    const data = splCsvToArr(csv);

    LIST.innerHTML = data.length ? data.map((row, i) => {
      const reply = row[4] ?
        (document.getElementById(row[4]) ? `<a class="reply" href="#${row[4]}">>>${document.getElementById(row[4]).dataset.num}</a>` : '<small class="reply">>>返信元のコメントは削除されたようです...</small>')
        : '';

      return `<li id="${row[3]}" data-num="${i + 1}">
        <div>${i + 1}.<b>${escapeHTML(row[1])}</b><small>${row[0]}</small><a href="#form">返信</a></div>
        ${reply}
        <pre>${escapeHTML(row[2])}</pre>
      </li>`;
    }).join('') : '<div style="text-align:center;">コメントはまだありません</div>';

    LIST.querySelectorAll('li > div > a').forEach(a => {
      a.onclick = e => {
        const li = e.target.closest('li');
        ANCH.innerHTML = `<i title="アンカーリンクを削除">Ⓧ</i><a href="#${li.id}" data-rep="${li.id}">>>${li.dataset.num}</a>`;
        ANCH.querySelector('i').onclick = () => ANCH.innerHTML = '';
      };
    });
  } catch (error) {
    INFO.textContent = '⚠ コメントの取得に失敗しました...時間をおいてリロードしてください。';
    console.error(error);
  }
};
