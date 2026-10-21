'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Bit, evaluateXor } from '@/lib/xor';
export default function XorPreview() {
    const [a, setA] = useState<Bit>(0);
    const [b, setB] = useState<Bit>(1);
    const { hOr, hAnd, output } = evaluateXor(a, b);
    return <section className="tn-spotlight" aria-label="XOR deneyinden küçük bir önizleme">
        <div className="tn-spotcopy"><span className="tn-eyebrow">DENEY / 001</span><h2>XOR&apos;u kurcala.</h2><Link className="tn-open" href="/deneyler/xor">Deneye git ↗</Link></div>
        <div className="tn-mini"><div className="tn-minigraph">
            <svg viewBox="0 0 190 100" aria-hidden="true"><g><path d="M24 23L92 27M24 23L92 73M24 77L92 27M24 77L92 73M92 27L167 50M92 73L167 50" /></g><circle cx="92" cy="27" r="5" data-active={Boolean(hOr)} /><circle cx="92" cy="73" r="5" data-active={Boolean(hAnd)} /></svg>
            <button type="button" className="tn-mini-a" aria-label="Birinci giriş" aria-pressed={Boolean(a)} onClick={() => setA(a === 0 ? 1 : 0)}><b>{a}</b></button>
            <button type="button" className="tn-mini-b" aria-label="İkinci giriş" aria-pressed={Boolean(b)} onClick={() => setB(b === 0 ? 1 : 0)}><b>{b}</b></button>
            <output aria-live="polite" aria-label="XOR sonucu">{output}</output>
        </div><span className="tn-minihint">Girişlere dokun</span></div>
    </section>;
}
