import Link from 'next/link';
import type { Metadata } from 'next';
import ShellPrompt from '../components/ShellPrompt';
export const metadata: Metadata = { title: 'Deneyler', description: 'Kavramları etkileşimli şemalarla keşfet: XOR ve sinir ağları.' };
export default function Experiments() {
    return <section><ShellPrompt command="ls" args="~/deneyler/" /><h1>Deneyler</h1>
        <Link className="tn-experiment" href="/deneyler/xor"><div className="tn-xorcover" aria-hidden="true"><span>0</span><i>⊕</i><span>1</span><i>=</i><span>1</span></div>
            <div className="tn-experimenttext"><span className="tn-eyebrow">SİNİR AĞLARI</span><h2>XOR deneyi</h2><p>İki giriş. Bir ağ. Bütün hesaplar.</p><span className="tn-visit">İncele →</span></div>
        </Link>
    </section>;
}
