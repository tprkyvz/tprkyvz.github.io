import Link from 'next/link';
import type { Metadata } from 'next';
import XorExperiment from '@/app/components/XorExperiment';
export const metadata: Metadata = { title: 'XOR ve sinir ağları', description: 'XOR ağının girişlerini değiştir; bütün ağırlık, bias ve ara hesapları gör.' };
export default function XorPage() {
    return <section className="xor-page"><Link className="tn-back" href="/deneyler">← Deneyler</Link><span className="tn-eyebrow">SİNİR AĞLARI / 001</span><h1>XOR ve sinir ağları</h1>
        <p>İki giriş → iki gizli nöron → bir çıkış.</p>
        <p className="tn-note">Aktivasyon: z ≥ 0 ise 1, değilse 0. Ağırlıklar elle seçilmiştir; bu deney eğitim yapmaz.</p>
        <XorExperiment />
        <details className="xor-details"><summary>Semboller</summary><p>x: giriş · w, v: ağırlık · b: bias · z: ağırlıklı toplam + bias · h: gizli çıktı · ŷ: tahmin.</p></details>
        <a className="tn-visit" href="https://tprkyvz.github.io/gorsel-lab/xor.html">Önceki Görsel Lab sürümü ↗</a>
    </section>;
}
