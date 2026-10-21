'use client';
import { useState } from 'react';
import { Bit, evaluateXor, inputPairs } from '@/lib/xor';

const number = (value: number) => String(value).replace('-', '−').replace('.', ',');

export default function XorExperiment() {
    const [a, setA] = useState<Bit>(0);
    const [b, setB] = useState<Bit>(1);
    const { zOr, zAnd, hOr, hAnd, zOut, output } = evaluateXor(a, b);
    return <div className="xor-experiment">
        <fieldset className="xor-pairs"><legend>Giriş çifti</legend>{inputPairs.map(([x, y]) => <button type="button" key={`${x}${y}`} aria-pressed={a === x && b === y} onClick={() => { setA(x); setB(y); }}>{x}, {y}</button>)}</fieldset>
        <div className="xor-diagram-scroll" role="region" aria-label="Sinir ağı şeması, küçük ekranlarda yatay kaydırılabilir" tabIndex={0}>
            <svg className="xor-diagram" viewBox="0 0 620 310" role="img" aria-labelledby="xor-title xor-description">
                <title id="xor-title">XOR ağı: {a}, {b} → {output}</title>
                <desc id="xor-description">İki giriş OR ve AND gizli nöronlarına bağlanır. Giriş ağırlıkları 1; bias değerleri −0,5 ve −1,5. Çıkış ağırlıkları 1 ve −2, çıkış biası −0,5.</desc>
                <g className="xor-connections"><path d="M85 85L280 85M85 85L280 225M85 225L280 85M85 225L280 225M310 85L520 155M310 225L520 155" /></g>
                <g className="xor-weights"><text x="155" y="73">w₁₁ = 1</text><text x="155" y="249">w₂₂ = 1</text><text x="120" y="130">w₂₁ = 1</text><text x="120" y="191">w₁₂ = 1</text><text x="411" y="103">v₁ = 1</text><text x="411" y="218">v₂ = −2</text></g>
                <g className="xor-labels"><text x="65" y="36">x₁</text><text x="65" y="280">x₂</text><text x="295" y="24">OR · b₁ = −0,5</text><text x="295" y="292">AND · b₂ = −1,5</text><text x="545" y="95">b₃ = −0,5</text></g>
                <g className="xor-neuron" data-on={Boolean(a)}><circle cx="65" cy="85" r="25" /><text x="65" y="92">{a}</text></g>
                <g className="xor-neuron" data-on={Boolean(b)}><circle cx="65" cy="225" r="25" /><text x="65" y="232">{b}</text></g>
                <g className="xor-neuron" data-on={Boolean(hOr)}><circle cx="295" cy="85" r="31" /><text x="295" y="92">{hOr}</text></g>
                <g className="xor-neuron" data-on={Boolean(hAnd)}><circle cx="295" cy="225" r="31" /><text x="295" y="232">{hAnd}</text></g>
                <g className="xor-output"><rect x="518" y="128" width="54" height="54" rx="5" /><text x="545" y="163">{output}</text></g>
                <g className="xor-sums"><text x="295" y="139">z₁ = {number(zOr)}</text><text x="295" y="180">z₂ = {number(zAnd)}</text><text x="545" y="215">z₃ = {number(zOut)}</text></g>
            </svg>
        </div>
        <div className="xor-result" aria-live="polite"><span>{a} ⊕ {b}</span><strong>= {output}</strong></div>
        <details className="xor-details" open><summary>Seçili girişin hesapları</summary>
            <dl className="xor-calculations">
                <div><dt>OR</dt><dd>z₁ = 1×{a} + 1×{b} − 0,5 = {number(zOr)} → h₁ = {hOr}</dd></div>
                <div><dt>AND</dt><dd>z₂ = 1×{a} + 1×{b} − 1,5 = {number(zAnd)} → h₂ = {hAnd}</dd></div>
                <div><dt>XOR</dt><dd>z₃ = 1×{hOr} − 2×{hAnd} − 0,5 = {number(zOut)} → ŷ = {output}</dd></div>
            </dl>
        </details>
        <div className="truth-table-scroll"><table className="truth-table"><caption>Dört girişin bütün ara değerleri</caption><thead><tr>{['x₁', 'x₂', 'z₁', 'h₁', 'z₂', 'h₂', 'z₃', 'ŷ', 'Hedef'].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead><tbody>{inputPairs.map(([x, y]) => {
            const r = evaluateXor(x, y);
            return <tr key={`${x}${y}`} data-selected={a === x && b === y}>{[x, y, r.zOr, r.hOr, r.zAnd, r.hAnd, r.zOut, r.output, x ^ y].map((value, index) => <td key={index}>{number(value)}</td>)}</tr>;
        })}</tbody></table></div>
    </div>;
}
