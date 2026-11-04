import { FormEvent, useEffect, useMemo, useState } from 'react'
import { analyze, Analysis } from './analyzer'
import Logo from './Logo'

type Saved = Analysis & { id: string; inputPreview: string }
const examples = [
  'URGENTE: detectamos actividad inusual. Verificá tu cuenta y contraseña en http://banco-seguro.top/login',
  'https://bit.ly/premio-mercadopago',
  'Hola, ¿podés enviarme la factura de octubre por el canal habitual?'
]

function Icon({ name }: { name: 'scan'|'learn'|'history'|'arrow'|'check'|'warn' }) {
  const paths = { scan:'M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M8 12h8', learn:'M4 5h12a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3V5Zm3 0v11a3 3 0 0 0 3 3', history:'M4 12a8 8 0 1 0 2-5.3L4 9m0-5v5h5m3-2v5l3 2', arrow:'m9 18 6-6-6-6', check:'m5 12 4 4L19 6', warn:'M12 4 3 20h18L12 4Zm0 6v4m0 3h.01' } as const
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

export default function App() {
  const [route, setRoute] = useState(location.hash.slice(1) || 'inicio')
  const [mobile, setMobile] = useState(false)
  const [history, setHistory] = useState<Saved[]>(() => JSON.parse(localStorage.getItem('phishnet-history') || '[]'))
  useEffect(() => { const fn=()=>setRoute(location.hash.slice(1)||'inicio'); addEventListener('hashchange',fn); return()=>removeEventListener('hashchange',fn) }, [])
  useEffect(() => {
    document.documentElement.classList.add('motion-ready')
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(element => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible'))
    }, { threshold: .12 })
    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [route])
  const save = (result: Analysis, input: string) => {
    const next=[{...result,id:crypto.randomUUID(),inputPreview:input.slice(0,72)},...history].slice(0,12)
    setHistory(next); localStorage.setItem('phishnet-history',JSON.stringify(next))
  }
  return <div className="app-shell">
    <header><Logo/><button className="menu" onClick={()=>setMobile(!mobile)} aria-label="Abrir menú" aria-expanded={mobile}><span/><span/></button>
      <nav className={mobile?'open':''}>{[['inicio','Inicio'],['analizar','Analizador'],['aprender','Aprender'],['historial','Historial'],['planes','Planes']].map(([id,label])=><a key={id} className={route===id?'active':''} href={`#${id}`} onClick={()=>setMobile(false)}>{label}</a>)}</nav>
      <a className="header-cta" href="#analizar">Analizar ahora <Icon name="arrow"/></a>
    </header>
    <main>{route==='inicio'?<Landing/>:route==='analizar'?<Analyzer onSave={save}/>:route==='aprender'?<Education/>:route==='historial'?<History items={history}/>:<Plans/>}</main>
    <footer><Logo/><p>Análisis orientativo. PhishNet nunca garantiza que un contenido sea seguro.</p><span>Proyecto académico · UTN FRC</span></footer>
  </div>
}

function Landing(){return <>
  <section className="hero" data-reveal><div className="hero-watermark" aria-hidden="true">PHISH<span>NET</span></div><div className="hero-copy"><p className="eyebrow"><span/> INTELIGENCIA PARA DECIDIR</p><h1>Frená. Analizá.<br/><em>Recién después, actuá.</em></h1><p>Detectá señales de phishing en mensajes, correos y enlaces. PhishNet traduce patrones técnicos en explicaciones que cualquiera puede entender.</p><div className="hero-actions"><a className="primary magnetic" href="#analizar">Analizar contenido <Icon name="arrow"/></a><a className="text-link" href="#aprender">Cómo funciona</a></div><small>Sin registros · Sin abrir enlaces · Análisis local</small></div>
  <div className="signal-panel" aria-label="Vista previa de análisis"><div className="panel-top"><span><i className="status-led"/> SEÑALES DETECTADAS</span><span className="live">ANÁLISIS LOCAL</span></div><div className="radar"><div className="scan-beam"/><div className="ring r1"/><div className="ring r2"/><div className="ring r3"/><div className="cross x"/><div className="cross y"/><span className="radar-axis north">N</span><span className="radar-axis east">E</span><span className="dot d1"/><span className="dot d2"/><span className="dot d3"/><strong>72<small>/100</small></strong><p>RIESGO ALTO</p></div><div className="signal-list"><span><i/> Urgencia artificial <b>+22</b></span><span><i/> Solicitud de credenciales <b>+30</b></span><span><i/> Dominio inusual <b>+20</b></span></div></div></section>
  <section className="trust-strip"><span>No reemplaza un antivirus</span><span>No visita el enlace</span><span>No almacena el texto en servidores</span></section>
  <div className="threat-marquee" aria-label="Patrones que analiza PhishNet"><div>URGENCIA <i/> CREDENCIALES <i/> DOMINIOS IMITADOS <i/> ENLACES ACORTADOS <i/> SUPLANTACIÓN <i/> URGENCIA <i/> CREDENCIALES <i/> DOMINIOS IMITADOS <i/> ENLACES ACORTADOS <i/> SUPLANTACIÓN</div></div>
  <section className="three" data-reveal><div><p className="eyebrow">CLARIDAD ANTES QUE ALARMA</p><h2>Una segunda mirada,<br/>en lenguaje humano.</h2></div>{[['01','Pegá el contenido','Un mensaje, correo o URL. El análisis se realiza sin navegar al destino.'],['02','Leé las señales','Cada indicador explica qué detectamos y por qué merece atención.'],['03','Elegí con contexto','Recibí acciones concretas para verificar antes de compartir datos o dinero.']].map(x=><article key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</section>
  <section className="scenario" data-reveal><div><p className="eyebrow">DISEÑADO PARA LO COTIDIANO</p><h2>Ese mensaje que<br/>“parece del banco”.</h2><p>PhishNet reconoce urgencia, pedidos de claves, enlaces ocultos y dominios extraños. No decide por vos: te da mejores preguntas.</p><a href="#analizar" className="text-link">Probar un caso de ejemplo →</a></div><div className="message"><div className="sender"><span>MP</span><p><b>Soporte Cuenta</b><small>hace 2 min</small></p></div><p>⚠ Detectamos un acceso inusual. Tu cuenta será suspendida hoy. Verificá tus datos inmediatamente.</p><div className="fake-link">mercad0pago-seguridad.top</div><div className="annotation">3 señales de riesgo</div></div></section>
  <section className="manifesto" data-reveal><div><p className="eyebrow">SEGURIDAD SIN CAJA NEGRA</p><h2>No te pedimos que confíes.<br/><em>Te mostramos qué mirar.</em></h2><a className="primary" href="#analizar">Escanear un contenido <Icon name="arrow"/></a></div><div className="manifesto-metrics"><article><strong>00</strong><span>URLs abiertas por PhishNet</span></article><article><strong>08</strong><span>familias de señales explicables</span></article><article><strong>100%</strong><span>del análisis actual ocurre localmente</span></article></div></section>
  </>}

function Analyzer({onSave}:{onSave:(r:Analysis,i:string)=>void}){
  const [input,setInput]=useState(''),[result,setResult]=useState<Analysis|null>(null),[loading,setLoading]=useState(false),[error,setError]=useState('')
  const submit=(e:FormEvent)=>{e.preventDefault(); const clean=input.trim(); if(clean.length<8){setError('Ingresá al menos 8 caracteres para analizar.');return} if(clean.length>5000){setError('El contenido supera el límite de 5.000 caracteres.');return} setError('');setLoading(true);setResult(null);setTimeout(()=>{const r=analyze(clean);setResult(r);onSave(r,clean);setLoading(false)},450)}
  return <section className="page analyzer-page"><div className="page-head"><p className="eyebrow">ANALIZADOR HEURÍSTICO</p><h1>¿Qué te genera duda?</h1><p>Pegá el contenido sin abrir enlaces. El prototipo aplica reglas locales; no consulta reputación externa ni usa IA generativa.</p></div><div className="analyzer-grid"><form className="input-panel" onSubmit={submit}><label htmlFor="content">Mensaje, correo o URL</label><textarea id="content" value={input} onChange={e=>setInput(e.target.value)} placeholder="Ej.: Tu cuenta será suspendida. Verificá tu contraseña en..." aria-describedby="privacy error"/><div className="form-meta"><span id="privacy">No pegues contraseñas ni datos personales.</span><span>{input.length}/5000</span></div>{error&&<p id="error" className="error" role="alert">{error}</p>}<div className="examples"><span>PROBAR EJEMPLO</span>{examples.map((x,i)=><button type="button" onClick={()=>setInput(x)} key={i}>Caso {i+1}</button>)}</div><button className="primary submit" disabled={loading}>{loading?'Analizando señales…':'Analizar contenido'} {!loading&&<Icon name="scan"/>}</button></form><Result result={result} loading={loading}/></div></section>
}

function Result({result,loading}:{result:Analysis|null,loading:boolean}){
  if(loading)return <div className="result-panel empty"><div className="loader"/><h3>Separando señales del ruido</h3><p>Evaluamos patrones de urgencia, credenciales y estructura del enlace.</p></div>
  if(!result)return <div className="result-panel empty"><Icon name="scan"/><h3>El resultado aparece acá</h3><p>Vas a ver nivel orientativo, indicadores y próximos pasos. Nunca declaramos un enlace “seguro”.</p></div>
  return <div className={`result-panel risk-${result.risk.toLowerCase()}`}><div className="score"><div><p>RIESGO ORIENTATIVO</p><h2>{result.risk}</h2></div><strong>{result.score}<small>/100</small></strong></div><p className="disclaimer">Resultado heurístico, no veredicto. Confirmá siempre por un canal oficial.</p><h3>Señales encontradas</h3>{result.signals.length?<div className="found">{result.signals.map(s=><div key={s.id}><Icon name="warn"/><p><b>{s.label}</b><span>{s.detail}</span></p><em>+{s.weight}</em></div>)}</div>:<div className="no-signals"><Icon name="check"/><p><b>No detectamos señales evidentes</b><span>Eso no garantiza que el contenido sea legítimo.</span></p></div>}<h3>Qué hacer ahora</h3><ol className="recommendations">{result.recommendations.map(x=><li key={x}>{x}</li>)}</ol></div>
}

function Education(){return <section className="page"><div className="page-head"><p className="eyebrow">APRENDER SIN MIEDO</p><h1>Reconocé el patrón,<br/>no memorices la estafa.</h1><p>Las campañas cambian. Las tácticas de presión, suplantación y captura de datos se repiten.</p></div><div className="lesson-grid">{[['Urgencia','“Actuá ahora” busca que respondas antes de verificar. Hacé una pausa deliberada.'],['Identidad','El nombre visible se puede falsificar. Revisá el dominio real y confirmá por otro canal.'],['Credenciales','Nadie debería pedirte contraseñas o códigos de verificación por mensaje.'],['Enlaces','Leé el dominio de derecha a izquierda y desconfiá de acortadores o letras sustituidas.'],['Dinero','Premios, reintegros y deudas inesperadas son disparadores emocionales frecuentes.'],['Archivos','No ejecutes adjuntos inesperados. Consultá al remitente desde un contacto conocido.']].map((x,i)=><article key={x[0]}><span>0{i+1}</span><h2>{x[0]}</h2><p>{x[1]}</p></article>)}</div><div className="checklist"><h2>Protocolo de 30 segundos</h2><div><p><b>1.</b> ¿Esperabas este contacto?</p><p><b>2.</b> ¿Te apura o amenaza?</p><p><b>3.</b> ¿Pide claves, dinero o datos?</p><p><b>4.</b> ¿Podés confirmar por un canal oficial?</p></div></div></section>}

function History({items}:{items:Saved[]}){return <section className="page"><div className="page-head"><p className="eyebrow">HISTORIAL LOCAL</p><h1>Tus análisis recientes</h1><p>Se guardan solo en este navegador. No se sincronizan ni se envían a un servidor.</p></div>{items.length?<div className="history-list">{items.map(x=><article key={x.id}><span className={`badge ${x.risk.toLowerCase()}`}>{x.risk}</span><div><b>{x.kind}</b><p>{x.inputPreview}</p></div><strong>{x.score}<small>/100</small></strong></article>)}</div>:<div className="blank"><Icon name="history"/><h2>Todavía no hay análisis</h2><p>Probá el analizador y tus resultados aparecerán acá.</p><a className="primary" href="#analizar">Empezar análisis</a></div>}</section>}

function Plans(){const plans=useMemo(()=>[['Personal','Gratis','3 análisis por día','Análisis heurístico','Guías educativas'],['Plus','Próximamente','Análisis ilimitados','Historial ampliado','Fuentes de reputación'],['Equipos','Prototipo B2B','Panel de tendencias','Políticas y capacitación','Integraciones empresariales']],[]);return <section className="page"><div className="page-head"><p className="eyebrow">MODELO FREEMIUM — HIPÓTESIS</p><h1>Seguridad que se entiende.</h1><p>Los planes pagos son una propuesta comercial a validar; no están disponibles para contratar.</p></div><div className="plans">{plans.map((p,i)=><article className={i===1?'featured':''} key={p[0]}>{i===1&&<span className="plan-label">HIPÓTESIS PRINCIPAL</span>}<h2>{p[0]}</h2><strong>{p[1]}</strong><ul>{p.slice(2).map(x=><li key={x}><Icon name="check"/>{x}</li>)}</ul><button disabled>{i===0?'Plan actual':'Aún no disponible'}</button></article>)}</div><div className="enterprise"><p className="eyebrow">DASHBOARD EMPRESARIAL · PROTOTIPO CONCEPTUAL</p><h2>Visibilidad para educar, no para vigilar.</h2><div className="metric-row"><span><b>27</b> análisis del equipo</span><span><b>41%</b> con riesgo alto</span><span><b>3</b> patrones recurrentes</span></div><p>Estas cifras son ilustrativas y no provienen de usuarios reales.</p></div></section>}
