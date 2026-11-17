// products.json を読んで、プロダクトの一覧を描く
(function () {
  var list = document.getElementById("products");

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // 新しいタブで開くリンク。↗ は見た目だけ、読み上げには文言で伝える
  function extLink(cls, label, url) {
    var a = el("a", cls);
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.appendChild(el("span", "label", label));
    var mark = el("span", "ext", "↗");
    mark.setAttribute("aria-hidden", "true");
    a.appendChild(mark);
    a.appendChild(el("span", "sr-only", "（新しいタブで開く）"));
    return a;
  }

  // 「（…）」の途中で改行しないように包む
  function text(cls, s) {
    var p = el("p", cls);
    s.split(/(（[^）]*）)/).forEach(function (part) {
      if (!part) return;
      if (part.charAt(0) === "（") p.appendChild(el("span", "nowrap", part));
      else p.appendChild(document.createTextNode(part));
    });
    return p;
  }

  function row(p, showStatus) {
    var li = el("li", "row");
    var meta = el("div", "meta");
    var rt = el("div", "rt");
    var h = el("h3", "name-h");
    h.appendChild(extLink("name", p.name, p.url));
    rt.appendChild(h);
    if (showStatus && p.status) rt.appendChild(el("span", "st", p.status));
    meta.appendChild(rt);
    if (p.tags && p.tags.length) {
      var ul = el("ul", "chips");
      ul.setAttribute("aria-label", "タグ");
      p.tags.forEach(function (t) { ul.appendChild(el("li", "chip", t)); });
      meta.appendChild(ul);
    }
    li.appendChild(meta);
    li.appendChild(text("desc", p.description));
    if (p.detail) li.appendChild(text("detail", p.detail));
    return li;
  }

  fetch("products.json")
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(function (items) {
      // 状態が全部同じあいだは、状態を出さない
      var showStatus = items.some(function (p) { return p.status !== items[0].status; });
      list.replaceChildren.apply(list, items.map(function (p) { return row(p, showStatus); }));
    })
    .catch(function () {
      list.replaceChildren(el("li", "row", "一覧を読み込めませんでした。ページを再読み込みしてください。"));
    });
})();
