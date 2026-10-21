import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return <header className="tn-header">
        <Link className="tn-brand" href="/" aria-label="Toprak Yavuz, ana sayfa">
            <Image className="tn-falcon" src="/brand/falcon.png" alt="" width={42} height={42} />
            toprak yavuz<span className="tn-branddot">.</span>
        </Link>
        <a href="https://github.com/tprkyvz" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
    </header>;
}
