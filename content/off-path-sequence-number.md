---
title: "Off-Path Saldırılarda Sequence Number'ın Önemi"
date: '2026-09-04'
description: "TCP sequence number mekanizmasının off-path saldırılara karşı neden kritik olduğunu Mitnick ve Kaminsky örnekleriyle anlatan giriş seviyesi inceleme."
tags: ['networking', 'tcp', 'network-security']
---

![TCP bağlantısı ve trafiği göremeyen off-path saldırgan diyagramı](/images/off-path/off-path-tcp-sequence-diagram.png)

Bir saldırganın senin trafiğini **hiç görmeden** o trafiğe müdahale edebildiğini söylesem, garip gelebilir. Klasik Man-in-the-Middle (MITM) saldırısında saldırgan trafiğin arasında oturur, her paketi okur, istediğini değiştirir — bu mantıklı, çünkü saldırgan zaten aradaki noktada. Ama **off-path** bir saldırganın bu lüksü yok: ne trafiği görebiliyor, ne de araya girebiliyor. Elinde sadece tahmin var.

Bu yazıda, TCP bağlantılarını ayakta tutan **sequence number (SEQ)** mekanizmasının ne işe yaradığını, bu mekanizma zayıf olduğunda off-path bir saldırganın neler yapabildiğini ve tarihten gerçek bir örnekle bu konunun neden hâlâ öğrenmeye değer olduğunu anlatacağım.

---

## Önce bir ayrım: on-path mı, off-path mı?

Saldırıları konumuna göre ikiye ayırabiliriz:

- **On-path (MITM):** Saldırgan fiziksel ya da mantıksal olarak trafiğin üzerinde. Aynı Wi-Fi ağında ARP spoofing yapan biri, ya da trafiği yönlendiren kötü niyetli bir router düşün. Her paketi görür, istediği gibi oynar.
- **Off-path:** Saldırgan trafiğin **hiçbir yerinde değil**. Sadece hedefin IP adresini biliyor ve ona paket gönderebiliyor (internet üzerinden herkes birbirine paket gönderebilir zaten). Ama gönderdiği paketlerin karşı tarafça "geçerli" sayılması için bazı değerleri **doğru tahmin etmesi** gerekiyor.

Off-path saldırılar on-path'e göre çok daha zor gibi görünür — ve genelde öyledir. Ama bir sistemin "tahmin edilemez" varsaydığı bir değer aslında tahmin edilebilirse, off-path saldırgan on-path bir saldırganın sahip olduğu güce neredeyse hiç trafik görmeden ulaşabilir. İşte tam bu noktada sequence number devreye giriyor.

## TCP neden sequence number kullanır?

IP katmanı, paketlerin sırasını ya da kaybolup kaybolmadığını garanti etmez. Bir paket kaybolabilir, tekrar gelebilir, sırası bozulabilir — IP bunların hiçbirini umursamaz. Bu güvenilirliği sağlamak üstteki TCP katmanının işi.

Bunu yapabilmek için TCP her segmente bir **Sequence Number** koyar: "gönderdiğim veri akışının şu anki baytı budur" der. Karşı taraf da hangi baytlara kadar aldığını bir **Acknowledgment Number (ACK)** ile bildirir: "şu ana kadar her şeyi aldım, sıradakini bekliyorum" der.

Bağlantı ilk kurulurken üç yollu el sıkışma (3-way handshake) olur:

```text
Client                         Server
  | ---- SYN, SEQ=x ------->     |
  | <--- SYN-ACK, SEQ=y, ACK=x+1 |
  | ---- ACK, SEQ=x+1, ACK=y+1-> |
```

Her iki taraf da kendi başlangıç sıra numarasını (**Initial Sequence Number - ISN**) seçer, sonrasında gönderdiği her bayta göre bu sayıyı artırır.

Peki karşı taraf, gelen bir paketin gerçekten bu bağlantıya ait olup olmadığını nasıl anlıyor? Üç şeye bakarak:

1. Kaynak/hedef IP adresi
2. Kaynak/hedef port
3. **SEQ ve ACK değerinin beklenen aralıkta olup olmadığı**

Sorun şurada: bu üç kontrolden ilk ikisi, saldırgan için aslında pek de güçlü bir engel değil.

## Neden IP ve port yetmiyor ama SEQ önemli?

**IP adresini sahtelemek (spoof etmek) teknik olarak kolaydır.** TCP/IP tasarlanırken kaynak IP alanının doğruluğunu kanıtlayan bir mekanizma yoktu — paketi gönderen, "ben buyum" der, alıcı da (varsayılan olarak) buna güvenir. Bugün ISP'ler ve ağ ekipmanları genelde giden trafikte kaynak IP'yi doğrulayan filtreler (BCP38 gibi) kullanır, ama bu evrensel değil.

**Port numarası da sınırlı bir aralıkta** (genelde 1024-65535 arası geçici/ephemeral portlar). Bu aralık, art arda birkaç bin paket göndererek taranabilecek kadar küçüktür.

Geriye kalan tek gerçek engel: **doğru SEQ ve ACK değerini bilmek.** SEQ alanı 32-bit, yani yaklaşık 4.3 milyar olası değer var. Kör bir kaba kuvvetle (brute force) bunu bulmak, tek bir bağlantı için pratikte imkansız gibi görünür. Ama tarih bize bunun hiç de imkansız olmadığını gösterdi — çünkü sorun rastgele bir sayıyı bulmak değil, **rastgele olmayan bir sayıyı tahmin etmekti.**

## Off-path saldırgan tam olarak ne yapmaya çalışıyor?

Bir senaryo düşünelim: Alice ile Bob arasında bir TCP bağlantısı var (bir SSH oturumu olsun). Mallory bu trafiği **göremiyor** — aynı ağda değil, aradaki hiçbir noktada trafiği dinleyemiyor. Ama Alice'in ve Bob'un IP adreslerini biliyor.

Mallory'nin amacı: Bob'un "bu paket gerçekten Alice'ten geldi" diye kabul edeceği bir paket üretmek. Bunun için üç şeyi doğru tahmin etmesi (ya da başka bir yolla öğrenmesi) gerekiyor:

- Kaynak port (Alice'in kullandığı geçici port)
- Doğru SEQ numarası (Bob'un o an beklediği aralıkta)
- Doğru ACK numarası

Bunları tutturursa Mallory, Bob'a Alice'ten geliyormuş gibi görünen ama içeriğini kendisinin belirlediği bir paket enjekte edebilir. Bunun sonucu, senaryoya göre değişir:

- **Bağlantıyı düşürmek** (RST paketi enjekte ederek) — basit ama etkili bir hizmet aksatma (DoS) şekli.
- **Bağlantıya veri enjekte etmek** — örneğin şifresiz bir HTTP oturumuna zararlı içerik sokmak, ya da güven ilişkisine dayanan eski protokollerde (rlogin gibi) komut çalıştırmak.

## Gerçek örnek: 1994 Mitnick saldırısı

Bu konunun ders kitabı örneği, 1994'te Tsutomu Shimomura'nın makinesine yapılan ve Kevin Mitnick'e atfedilen saldırıdır. O dönemde birçok işletim sisteminin ISN üretim algoritması **öngörülebilirdi** — genelde zamana bağlı, sabit adımlarla artan basit bir sayaçtı. Yani bir sunucudan art arda birkaç ISN gözlemlersen, bir sonrakini kabaca tahmin edebiliyordun.

Saldırı kabaca şöyle işledi:

1. Saldırgan, güvenilen bir makineye (X) art arda bağlantı denemeleri yaparak hedef sunucunun ISN'i nasıl artırdığını gözlemledi.
2. Bu örüntüden **bir sonraki ISN'yi tahmin etti**.
3. Hedef sunucuya, X'in IP'sini sahteleyerek bir SYN paketi gönderdi.
4. Sunucu SYN-ACK'i X'e gönderdi — saldırgan bunu göremedi, çünkü paket ona değil X'e gitti.
5. Ama saldırgan, tahmin ettiği ISN'ye göre hesapladığı doğru ACK değeriyle bağlantıyı **kör bir şekilde** tamamladı — SYN-ACK'i hiç görmeden.
6. X'in araya girip "ben böyle bir bağlantı istemedim" diyerek RST göndermesini engellemek için, saldırgan aynı anda X'i bir SYN flood ile meşgul etti; X gelen SYN-ACK'e cevap veremeyecek kadar meşguldü.

Sonuç: saldırgan, trafiği hiç görmeden, sadece **tahmin** ile güvenilir bir bağlantıya sızmayı başardı. Bu saldırı, sequence number tahmin edilebilir olduğunda IP spoofing'in tek başına yeterli hale geldiğini gösteren en ünlü örnektir — ve dönemin ağ güvenliği anlayışında büyük bir kırılma noktası oldu.

## Bugün durum ne?

Bu olaydan sonra RFC 1948 (ve sonrasında onun yerini alan RFC 6528), ISN üretimi için kriptografik olarak güvenli, tahmin edilemeyen bir yöntem önerdi. Modern işletim sistemleri artık ISN'yi host çiftine ve porta bağlı bir hash fonksiyonuyla üretiyor — yani art arda birkaç bağlantı gözlemlesen bile bir sonraki ISN'yi tahmin edemiyorsun. Kaynak port da genelde rastgele seçiliyor, bu da saldırganın işini bir kat daha zorlaştırıyor.

Ama aynı mantık, protokol dünyasının başka bir köşesinde hâlâ hayatta: **DNS.**

DNS sorgularında kullanılan **Transaction ID (TXID)**, kavramsal olarak SEQ ile birebir aynı işi görür: "bu cevap gerçekten benim sorduğum soruya mı ait?" 2008'de Dan Kaminsky, bazı DNS sunucu ve resolver'ların TXID'yi (sadece 16 bit, yani 65536 ihtimal) yeterince rastgele üretmediğini gösterdi. Off-path bir saldırgan, doğru TXID ve kaynak portu tutturarak, kurbanın DNS resolver'ının önbelleğine sahte bir kayıt enjekte edebiliyordu — örneğin `banka.com` sorgusuna saldırganın sunucusunun IP'sini döndürerek. Bu, SEQ tahmininin DNS dünyasındaki ikizidir; aynı zayıflık, farklı bir protokolde tekrar karşımıza çıkmıştır.

## Neden bu konuyu bilmek önemli?

Sequence number, TCP'nin sadece "veriyi sırayla teslim et" mekanizması değil, aynı zamanda örtük bir kimlik doğrulama katmanıdır: "bu paket gerçekten bu bağlantıya mı ait?" sorusunun cevabıdır. Off-path bir saldırgan trafiği göremediği için IP ve port sahteciliği tek başına yetmez — asıl mesele, karşı tarafın "rastgele ve tahmin edilemez" varsaydığı bu sayıyı bir şekilde bilmektir.

Bugün rastgele ISN üretimi sayesinde 1994 tarzı bir saldırı çok zorlaştı, ama genel ders hâlâ geçerli ve TCP'nin ötesine geçiyor: **bir protokolün güvenliği, "tahmin edilemez" olduğunu varsaydığı bir değerin gerçekten öyle olmasına dayanır.** O varsayım bir yerde çökerse (zayıf rastgelelik, öngörülebilir sayaç, kısıtlı değer aralığı gibi), aradaki tüm güvenlik de birlikte çöker. Bunu bir kez TCP'de görünce, aynı deseni DNS'te, oturum kimliklerinde (session ID), hatta CSRF token'larında tekrar tekrar fark etmeye başlarsın.

## Sonuç

Off-path saldırılar, ilk bakışta "trafiği görmeden nasıl saldırırsın ki" dedirten, ama incelendiğinde protokol tasarımının temel bir varsayımına dokunan saldırı türüdür. Sequence number'ın rastgeleliği, bugün bu saldırı ailesine karşı en temel savunmalardan biri. 1994'teki Mitnick saldırısı ve 2008'deki Kaminsky saldırısı, aynı zayıflığın iki farklı protokoldeki (TCP ve DNS) yansımasıdır — ve bu desen, muhtemelen başka yerlerde de tekrar karşımıza çıkacaktır.

---

**Kaynaklar / ileri okuma:**

- [RFC 793 — Transmission Control Protocol](https://www.rfc-editor.org/rfc/rfc793)
- [RFC 1948 — Defending Against Sequence Number Attacks](https://www.rfc-editor.org/rfc/rfc1948)
- [RFC 6528 — Defending against Sequence Number Attacks](https://www.rfc-editor.org/rfc/rfc6528)
- Dan Kaminsky, DNS Cache Poisoning saldırısı (2008, Black Hat sunumu)
