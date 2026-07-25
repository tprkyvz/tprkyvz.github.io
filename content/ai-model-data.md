---
title: 'Bu Kadar Data Nereden Geliyor?'
date: '2026-07-25'
description: 'Yapay Zekalar eğitilmek için bu kadar veriyi nasıl buluyor???'
tags: ['AI']
---

GPT3 yaklaşık 570GB filtrelenmiş textten eğitildi. Bu rakamlara ulaşmak için geliştiriciler tek tek bu textleri aramadı tabiki. Pipeline genellikle bu dört kaynaktan beslenir.
1. Web Scraping(Veri kazıma) : İnternet içeriklerini otomatik olarak tarama.  
2. Lisanslı Datasetleri : Çeşitli platformlardan alınan datalar.                                        
3. Sentetik Data : Başka AI'ları eğitmek için üretilen AI generated içerikler                        
4. Internal Carpora(Şirketin dışa açmadığı veriler) : Şirket bilgisi temelli içerikler
***Güven profili aşağıya doğru artar.***
<h4>Data Provenance</h4>
==Veri biliminde *provenance*, verinin kaynağını geçirdiği tüm işlemlerin adımlarını ve geçmişini adım adım izlenebilmesini ifade eder.==

Data Provenance herhangi eğitim verisi hakkında 3 soruyu yanıtlayabilme yeteneğidir.
1. Nereden geldi?
2. Ne zaman toplandı?
3. O zamandan beri değiştirildi mi?

SolarWinds, içinde ne olduğunu bilmiyorsanız derlenmiş bir ikili dosyaya (binary) güvenemeyeceğinizi sektöre öğretti; yazılım malzeme listelerinin (SBOM) standart bir uygulama haline gelmesinin tam olarak sebebi de buydu. Bunun yapay zekadaki karşılığı ise ML-BOM'dur: veri kümesi kaynaklarının, lisansların, kişisel tanımlanabilir bilgi (PII) kategorilerinin ve filtreleme kararlarının belgelenmiş bir envanteri. Benimsenme süreci henüz erken aşamadadır ve bugün üçüncü taraf modelleri canlıya alan çoğu kuruluş bunun yakınından bile geçememektedir.

<h4>Pipeline'daki PII</h4>
Belgelenmemiş, büyük ölçekli web kazımanın en doğrudan sonuçlarından biri, kişisel olarak tanımlanabilir bilgilerin (PII) model ağırlıklarının içine sızarak sabitlenmesidir (_baked into_). Veri bir kez oraya girdiğinde, çıkarılması son derece zordur. Tıbbi kayıtlar, kişisel e-posta zincirleri, sağlık durumları veya siyasi görüşler hakkındaki forum gönderileri: Eğer tarama anında kamuya açıksa, tümü bu sürece dahil olur. AB'nin GDPR mevzuatı, açıkça verinin en aza indirgenmesini (yalnızca gerekli olanın toplanmasını) şart koşar. Bu durum, ön eğitim süreçlerini yönlendiren "ne kadar çok veri, o kadar iyi" mantığıyla doğrudan bir çelişki oluşturur. Yani internete yüklediğiniz şeyi aslında oraya kazımış oluyorsunuz, kesinlikle dikkat edilmesi gereken bir konu.

> **Not:** Yapay zekada _model weights_, modelin eğitim sürecinde öğrendiği parametre değerleridir; hassas verilerin bu katsayılara işlenmesi, verinin geri silinmesini (_machine unlearning_) teknik olarak son derece zorlaştırır.