# nakaokat.github.io

nakaokat が作っているプロダクトの一覧ページです。https://nakaokat.github.io で公開しています。

## プロダクトの足し方

`products.json` に 1 件足します。

```json
{
  "name": "名前",
  "description": "1 行の説明",
  "detail": "技術的な特徴など（なくてもよい）",
  "url": "https://example.com",
  "tags": ["タグ"],
  "status": "公開中"
}
```

## ローカルで見る

`products.json` を `fetch` で読むので、ファイルを直接開かず、HTTP で配信して見ます。

```sh
python3 -m http.server 8000
```

ビルドの手順はありません。`main` に push すると GitHub Pages に反映されます。
