# Toprak Yavuz

Koyu, ağ düğümleriyle bağlantılı kişisel site. Next.js statik çıktısı GitHub Actions ile GitHub Pages'e yayımlanır.

- `/` — karşılama ve küçük XOR önizlemesi
- `/blog/` — TBlogs: teknik yazılar ve etiket filtresi
- `/blog/<slug>/` — yazılar; mevcut slug'lar korunur
- `/muhayyer-yazilar/` — serbest konulu yazılar ve etiket filtresi
- `/muhayyer-yazilar/<slug>/` — serbest yazının tamamı
- `/kitaplar/` — 1000Kitap profili ve kitap yazıları
- `/kitaplar/<slug>/` — kitap yazısının tamamı
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

## Kitap yazıları

1000Kitap profil bağlantısı `lib/reading.ts` içindedir. Kitap yazıları blogdan ayrı olarak
`content/books/*.md` altında tutulur. Her yazı `/kitaplar/<dosya-adı>/` adresinde açılır.
Yeni bir yazı için:

```md
---
title: 'Kitap üzerine yazının başlığı'
date: '2026-10-25'
description: 'Yazının kısa açıklaması'
tags: ['roman']
---

Kitap hakkındaki yazın burada.
```

Bu klasöre yalnızca yayıma hazır yazılar konur; Obsidian taslakları otomatik aktarılmaz.

## Yazı bölümleri

- **TBlogs:** Teknik yazılar `content/*.md` altında kalır. Mevcut `/blog/<slug>/`
  bağlantıları korunur; bölümün görünen adı TBlogs olur.
- **Muhayyer Yazılar:** Serbest konulu yazılar `content/muhayyer/*.md` altında tutulur,
  `/muhayyer-yazilar/<dosya-adı>/` adresinde açılır.
- **Kitaplar:** Kitap yazıları `content/books/*.md` altında tutulur.

Üç bölüm de aynı `title`, `date`, `description`, `tags` alanlarını kullanır.
Yalnızca yayıma hazır yazılar bu dizinlere eklenir.
