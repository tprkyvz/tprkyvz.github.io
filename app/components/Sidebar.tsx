'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const navigation = [
    { href: '/', label: 'Ana sayfa' }, { href: '/blog', label: 'Yazılar' },
    { href: '/deneyler', label: 'Deneyler' }, { href: '/hakkimda', label: 'Hakkımda' },
];
export default function Sidebar() {
    const pathname = usePathname();
    return <aside className="site-sidebar">
        <nav aria-label="Ana gezinme">{navigation.map(({ href, label }) => {
            const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
            return <Link href={href} key={href} aria-current={active ? 'page' : undefined}>
                <span className="nav-node" aria-hidden="true" />{label}
            </Link>;
        })}</nav>
        <div className="tn-sidebarfoot">ağlar<br />linux<br />güvenlik</div>
    </aside>;
}
