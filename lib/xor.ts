export type Bit = 0 | 1;
// Original Görsel Lab network: step activation and manually chosen weights.
export function evaluateXor(a: Bit, b: Bit) {
    const zOr = a + b - 0.5;
    const zAnd = a + b - 1.5;
    const hOr: Bit = zOr >= 0 ? 1 : 0;
    const hAnd: Bit = zAnd >= 0 ? 1 : 0;
    const zOut = hOr - 2 * hAnd - 0.5;
    const output: Bit = zOut >= 0 ? 1 : 0;
    return { zOr, zAnd, hOr, hAnd, zOut, output };
}
export const inputPairs: readonly (readonly [Bit, Bit])[] = [[0, 0], [0, 1], [1, 0], [1, 1]];
