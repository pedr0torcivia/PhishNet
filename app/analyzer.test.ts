import { describe, expect, it } from 'vitest'
import { analyze, looksLikeUrl } from './analyzer'

describe('analizador heurístico', () => {
  it('detecta presión y credenciales', () => {
    const result = analyze('URGENTE: tu cuenta será bloqueada. Iniciá sesión y confirmá tu contraseña ahora')
    expect(result.risk).toBe('Alto')
    expect(result.signals.map(s => s.id)).toContain('credentials')
  })
  it('marca una URL insegura e inusual', () => {
    const result = analyze('http://seguridad-banco.top/verifica')
    expect(result.signals.map(s => s.id)).toEqual(expect.arrayContaining(['http', 'tld']))
  })
  it('reconoce URLs', () => expect(looksLikeUrl('https://example.com')).toBe(true))
})
