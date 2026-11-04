export default function Logo({ compact = false }: { compact?: boolean }) {
  return <a className="brand" href="#inicio" aria-label="PhishNet, ir al inicio">
    <svg className="mark" viewBox="0 0 40 40" aria-hidden="true"><path d="M7 9.5 20 4l13 5.5v9.8c0 8.2-5.2 13.8-13 16.7C12.2 33.1 7 27.5 7 19.3Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 21c4-5 7-7 12-7 2.8 0 4.5 1.2 4.5 3.4 0 3-3.8 3.1-6.7 3.1-3.8 0-5.5 1.3-5.5 4.2 0 2.4 1.7 4.2 4.7 4.8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="29" cy="11" r="2.2" fill="currentColor"/></svg>
    {!compact && <span>PHISH<span>NET</span></span>}
  </a>
}
