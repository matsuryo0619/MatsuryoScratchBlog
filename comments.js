document.addEventListener('DOMContentLoaded', () => {
  const CMNT = document.body.querySelector('.comment');

  if (CMNT) {
    const uniq = {
      gglFormID: '1Y2EujtjEOiWzKzM1cucV7Bjk4RFZYuhMPFYVVAMFdUo',
      splSheetID: '1FAIpQLSdE3JNLAlS9Hlmz90XxjgI3EtgXN7jXlSQyN9jOvqqLag03Ow',
      urlKey: '1652999717',
      titleKey: '1978816429',
      nameKey: '1983997277',
      commentKey: '1396591484',
      idKey: '1712718090',
      replyIdKey: '1078288063'
    };

    const FORM = document.getElementById('form');

    // Add form elements
    FORM.innerHTML = `
      <input name="name" placeholder="名前" required>
      <textarea name="comment" placeholder="コメント" rows="10" maxlength="400" required></textarea>
      <div>
        <button type="button">送信</button>
        <span class="anchor"></span>
        <input type="email" name="email" style="display:none;" title="スパム用">
      </div>`;

    const escapeHTML = str => str.replace(/[&<>"]/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[char]));

    const createRandomID = () => {
      return Array.from({ length: 8 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 52)]).join('');
    };

    const splCsvToArr = csv => csv
      .slice(1, -1)
      .split('"\n"')
      .map(row => row.split('","').map(col => col.replace(/""/g, '"')));

    const LIST = CMNT.querySelector('.list');
    const INFO = CMNT.querySelector('.info');
    const ANCH = FORM.querySelector('.anchor');
    const url = location.pathname;
    const query = encodeURIComponent(`select A, D, E, F, G where B = '${url}' order by A`);

    const loadSplSheet = async () => {
      try {
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${uniq.splSheetID}/gviz/tq?tqx=out:csv&tq=${query}&headers=0`);
        if (!response.ok) throw new Error('Failed to fetch comments');

        const csv = await response.text();
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
      }
    };

    FORM.querySelector('button').onclick = async () => {
      const nVal = FORM.elements['name'].value.trim();
      const cVal = FORM.elements['comment'].value.trim();
      const reply = FORM.querySelector('span > a')?.dataset.rep || '';

      if (FORM.elements['email'].value) return console.log('スパムを検出しました');
      if (!nVal || !cVal) return alert('⚠ 必須項目が入力されていません');

      const blackWords = ['バカ', '馬鹿', '死ね', '","', '"\n"'];
      if (blackWords.some(word => nVal.includes(word) || cVal.includes(word))) return alert('⚠ 不適切なワードが含まれています');

      const thisID = createRandomID();
      const title = encodeURIComponent(document.querySelector('h1')?.textContent || '');

      FORM.querySelector('button').disabled = true;

      try {
        await fetch(`https://docs.google.com/forms/d/e/${uniq.gglFormID}/formResponse`, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `entry.${uniq.urlKey}=${url}&entry.${uniq.titleKey}=${title}&entry.${uniq.nameKey}=${encodeURIComponent(nVal)}&entry.${uniq.commentKey}=${encodeURIComponent(cVal)}&entry.${uniq.idKey}=${thisID}&entry.${uniq.replyIdKey}=${reply}`
        });

        INFO.textContent = 'ⓘ コメント投稿中...';
        setTimeout(async () => {
          await loadSplSheet();
          FORM.querySelector('button').disabled = false;
          if (LIST.querySelector(`#${thisID}`)) {
            INFO.textContent = 'ⓘ コメント成功！';
            FORM.reset();
            ANCH.innerHTML = '';
          } else {
            INFO.textContent = '⚠ リロードしてコメントが正常に投稿されているか確認してください。';
          }
        }, 2500);
      } catch {
        INFO.textContent = '⚠ コメントの送信に失敗しました';
        FORM.querySelector('button').disabled = false;
      }
    };

    loadSplSheet();
  }
});
