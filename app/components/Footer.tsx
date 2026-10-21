'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Footer() {
    const pathname = usePathname().replace(/\/$/, '') || '/';
    const location = pathname.startsWith('/blog/') ? 'Yazılar / Makale' : pathname.startsWith('/blog') ? 'Yazılar'
        : pathname.startsWith('/deneyler/xor') ? 'Deneyler / XOR' : pathname.startsWith('/deneyler') ? 'Deneyler'
        : pathname.startsWith('/hakkimda') ? 'Hakkımda' : pathname.startsWith('/cv') ? 'Özgeçmiş'
        : pathname.startsWith('/contact') ? 'İletişim' : pathname === '/' ? 'Ana sayfa' : '';
    return <footer className="tn-footer"><span>Toprak Yavuz</span><div className="footer-links"><Link href="/contact">İletişim</Link><span>{location}</span></div></footer>;
}
