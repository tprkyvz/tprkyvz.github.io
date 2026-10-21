import Link from 'next/link';
import XorPreview from './components/XorPreview';
const sections = [
    { href: '/blog', title: 'Yazılar', subtitle: 'Çalışma notları' },
    { href: '/deneyler', title: 'Deneyler', subtitle: 'Etkileşimli çalışmalar' },
    { href: '/hakkimda', title: 'Hakkımda', subtitle: 'Kısaca ben' },
];
export default function Home() {
    return <>
        <section aria-label="Karşılama">
            <div className="tn-welcome"><span className="tn-eyebrow">TOPRAK&apos;IN WEB ALANI</span><h1>Selam, ben Toprak.</h1><p>Siber güvenlik, ağlar ve Linux.<br />Notlarım ve deneylerim burada.</p></div>
            <div className="tn-map" aria-label="Site bölümleri"><div className="tn-origin" aria-hidden="true"><i /></div>
                <div className="tn-branches">{sections.map(({ href, title, subtitle }) => <Link className="tn-maplink" href={href} key={href}><span className="tn-node" aria-hidden="true" /><span><strong>{title}</strong><small>{subtitle}</small></span><b aria-hidden="true">↗</b></Link>)}</div>
            </div>
        </section>
        <XorPreview />
    </>;
}
