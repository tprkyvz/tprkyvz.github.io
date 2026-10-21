# Toprak Yavuz

Koyu, ağ düğümleriyle bağlantılı kişisel site. Next.js statik çıktısı GitHub Actions ile GitHub Pages'e yayımlanır.

- `/` — karşılama ve küçük XOR önizlemesi
- `/blog/` — mevcut Markdown yazıları ve etiket filtresi
- `/blog/<slug>/` — yazılar; mevcut slug'lar korunur
- `/deneyler/` — deney dizini
- `/deneyler/xor/` — ağırlık, bias, ara hesap ve doğruluk tablosuyla XOR ağı
- `/hakkimda/`, `/cv/`, `/contact/` — kişisel bilgiler ve iletişim

## Yerel çalışma

```sh
npm ci
npm run dev
```

`npm run build` statik siteyi `out/` dizinine üretir. `main` dalına push, `.github/workflows/deploy.yml` üzerinden yayını başlatır. `trailingSlash: true` ile her sayfa kendi `index.html` dosyasını alır ve doğrudan bağlantılar GitHub Pages'te çalışır.

Yazılar `content/*.md`, görseller `public/images/` altında kalır. Yeni yazı eklemek için aynı YAML alanlarını (`title`, `date`, `description`, `tags`) kullanın.

XOR hesabı `lib/xor.ts` içindedir; ana sayfadaki önizleme ile deney sayfası aynı hesabı kullanır. Ağırlıklar elle seçilmiştir; eğitim yapılmaz. Önceki Görsel Lab yayını ayrı reposunda korunur.
