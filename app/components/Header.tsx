import Link from 'next/link';

export default function Header() {
    return <header className="tn-header">
        <Link className="tn-brand" href="/" aria-label="Toprak Yavuz, ana sayfa">
            <span className="tn-monogram" aria-hidden="true"><i /><i /><i /></span>
            toprak yavuz<span className="tn-branddot">.</span>
        </Link>
        <a href="https://github.com/tprkyvz" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
    </header>;
}
