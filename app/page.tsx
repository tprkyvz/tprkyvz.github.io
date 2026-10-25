import Link from 'next/link';
import XorPreview from './components/XorPreview';
import ShellPrompt from './components/ShellPrompt';
const sections = [
    { href: '/blog', title: 'TBlogs', subtitle: 'Teknik blog yazıları' },
    { href: '/muhayyer-yazilar', title: 'Muhayyer Yazılar', subtitle: 'Aklıma gelenler' },
    { href: '/kitaplar', title: 'Kitaplar', subtitle: 'Okuduklarım üzerine' },
    { href: '/deneyler', title: 'Deneyler', subtitle: 'Etkileşimli çalışmalar' },
    { href: '/hakkimda', title: 'Hakkımda', subtitle: 'Kısaca ben' },
];
export default function Home() {
    return <>
        <section aria-label="Karşılama">
            <div className="tn-welcome"><ShellPrompt command="whoami" session /><h1>Selam, ben Toprak.</h1><p>Siber güvenlik, ağlar ve Linux.<br />Notlarım ve deneylerim burada.</p></div>
            <div className="tn-directory-command"><ShellPrompt command="tree" args="-L 1 ~/" /><span className="tn-directory-note">gezinti</span></div>
            <div className="tn-map" aria-label="Site bölümleri"><div className="tn-origin" aria-hidden="true"><i /></div>
                <div className="tn-branches">{sections.map(({ href, title, subtitle }) => <Link className="tn-maplink" href={href} key={href}><span className="tn-node" aria-hidden="true" /><span><strong>{title}</strong><small>{subtitle}</small></span><b aria-hidden="true">↗</b></Link>)}</div>
            </div>
            <div className="tn-tree-summary" aria-hidden="true">{sections.length} directories</div>
        </section>
        <XorPreview />
    </>;
}
