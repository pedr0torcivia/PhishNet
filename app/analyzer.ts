export type Risk = 'Bajo' | 'Medio' | 'Alto'
export type Signal = { id: string; label: string; detail: string; weight: number }
export type Analysis = { risk: Risk; score: number; signals: Signal[]; recommendations: string[]; kind: 'URL' | 'Mensaje'; analyzedAt: string }

const urgency = /urgente|inmediatamente|ahora|últim[oa] aviso|24 horas|suspendid[oa]|bloquead[oa]|venc(e|ido)/i
const credentials = /contraseña|password|clave|pin|código de verificación|credencial|inici[áa] sesi[oó]n|verific[aá].*cuenta/i
const money = /transferencia|premio|ganaste|reembolso|pago|factura|deuda|mercado\s*pago|banco/i
const suspiciousTld = /\.(zip|top|click|xyz|work|gq|tk|cam)(?:\/|$)/i
const shortener = /\b(bit\.ly|tinyurl\.com|t\.co|cutt\.ly|is\.gd)\b/i
const homoglyph = /(?:paypa[l1]|micr[o0]soft|g[o0]{2}gle|mercad[o0]pago|banc[o0])/i

export function looksLikeUrl(value: string) {
  return /^(https?:\/\/|www\.)/i.test(value.trim())
}

export function analyze(value: string): Analysis {
  const input = value.trim()
  const signals: Signal[] = []
  const add = (id: string, label: string, detail: string, weight: number) => signals.push({ id, label, detail, weight })
  const isUrl = looksLikeUrl(input)

  if (urgency.test(input)) add('urgency', 'Presión o urgencia', 'El contenido intenta acelerar una decisión y reducir el tiempo para verificar.', 22)
  if (credentials.test(input)) add('credentials', 'Solicitud de credenciales', 'Pide claves, códigos o acceso a una cuenta. Una organización legítima rara vez los solicita por mensaje.', 30)
  if (money.test(input)) add('money', 'Incentivo o amenaza económica', 'Menciona pagos, premios o deudas: señuelos frecuentes en fraudes.', 16)
  if (shortener.test(input)) add('shortener', 'Enlace acortado', 'Oculta el dominio de destino y dificulta verificarlo antes de abrir.', 18)
  if (suspiciousTld.test(input)) add('tld', 'Dominio inusual', 'La extensión del dominio aparece con frecuencia en campañas de corta duración.', 20)
  if (homoglyph.test(input) && isUrl) add('brand', 'Posible imitación de marca', 'El dominio usa caracteres o variantes que podrían confundirse con una marca conocida.', 28)
  if (isUrl) {
    try {
      const normalized = /^www\./i.test(input) ? `https://${input}` : input
      const url = new URL(normalized)
      if (url.protocol !== 'https:') add('http', 'Conexión sin HTTPS', 'El enlace no cifra la conexión. Esto no prueba fraude, pero eleva el riesgo.', 15)
      if (url.username || url.password) add('userinfo', 'URL con identidad embebida', 'La URL contiene datos antes del dominio y puede ocultar el destino real.', 35)
      if (/\d{1,3}(?:\.\d{1,3}){3}/.test(url.hostname)) add('ip', 'Dirección IP como destino', 'Usa una IP en lugar de un dominio reconocible.', 25)
      if (url.hostname.split('.').length > 4) add('subdomains', 'Cadena extensa de subdominios', 'Puede intentar desplazar o disimular el dominio efectivo.', 12)
    } catch { add('invalid', 'URL mal formada', 'La dirección no cumple el formato esperado de una URL.', 35) }
  }

  const score = Math.min(100, signals.reduce((sum, s) => sum + s.weight, 0))
  const risk: Risk = score >= 50 ? 'Alto' : score >= 25 ? 'Medio' : 'Bajo'
  const recommendations = risk === 'Alto'
    ? ['No abras enlaces ni descargues archivos.', 'Contactá a la organización desde su sitio o teléfono oficial.', 'Si compartiste datos, cambiá tus claves y avisá a la entidad afectada.']
    : risk === 'Medio'
      ? ['Verificá el remitente por un canal independiente.', 'Escribí la dirección oficial manualmente; no uses el enlace recibido.', 'No compartas claves ni códigos de verificación.']
      : ['Mantené la cautela: un resultado bajo no garantiza seguridad.', 'Confirmá el contexto y el remitente antes de actuar.', 'No ingreses información sensible si algo no coincide.']
  return { risk, score, signals, recommendations, kind: isUrl ? 'URL' : 'Mensaje', analyzedAt: new Date().toISOString() }
}
