import Link from 'next/link';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Hakkımda' };
export default function About() {
    return <section><span className="tn-eyebrow">TANIŞALIM</span><h1>Toprak Yavuz</h1>
        <p className="tn-about">Siber güvenlik, ağlar ve Linux ile ilgilenen bir öğrenciyim. Burada çalışma notlarımı ve deneylerimi paylaşıyorum.</p>
        <div className="tn-contact"><a href="https://github.com/tprkyvz" target="_blank" rel="noopener noreferrer">GitHub ↗</a><Link href="/cv">Özgeçmiş ↗</Link><Link href="/contact">İletişim ↗</Link></div>
    </section>;
}
