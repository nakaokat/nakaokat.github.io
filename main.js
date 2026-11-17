// products.json を読んで、プロダクトの一覧を描く
(function () {
  var list = document.getElementById("products");

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function ext() {
    var s = el("span", "ext", "↗");
    s.setAttribute("aria-hidden", "true");
    return s;
  }

  function row(p) {
    var li = el("li", "row");
    var rt = el("div", "rt");
    var a = el("a", "name", p.name);
    a.href = p.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.appendChild(ext());
    rt.appendChild(a);
    if (p.status) rt.appendChild(el("span", "st", p.status));
    li.appendChild(rt);
    li.appendChild(el("p", "desc", p.description));
    if (p.detail) li.appendChild(el("p", "detail", p.detail));
    if (p.tags && p.tags.length) {
      var ul = el("ul", "chips");
      ul.setAttribute("aria-label", "タグ");
      p.tags.forEach(function (t) { ul.appendChild(el("li", "chip", t)); });
      li.appendChild(ul);
    }
    return li;
  }

  fetch("products.json")
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(function (items) {
      list.replaceChildren.apply(list, items.map(row));
    })
    .catch(function () {
      list.replaceChildren(el("li", "row", "一覧を読み込めませんでした。ページを再読み込みしてください。"));
    });
})();
