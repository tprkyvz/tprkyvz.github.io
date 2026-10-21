import './globals.css';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

export const metadata: Metadata = {
    metadataBase: new URL('https://tprkyvz.github.io'),
    title: { default: 'Toprak Yavuz', template: '%s · Toprak Yavuz' },
    description: 'Toprak Yavuz — siber güvenlik, ağlar ve Linux üzerine notlar ve etkileşimli deneyler.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <html lang="tr"><body>
        <a className="skip-link" href="#icerik">İçeriğe geç</a>
        <div id="toprak-network"><div className="tn-site">
            <Header /><div className="tn-layout"><Sidebar /><main id="icerik">{children}</main></div><Footer />
        </div></div>
    </body></html>;
}
