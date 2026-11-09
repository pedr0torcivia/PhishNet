# Renderiza el video final (video + mezcla de audio) solo con Hyperframes.
# Uso, desde la raíz del repo:  powershell -NoProfile -ExecutionPolicy Bypass -File video/render.ps1
# Requisitos: Node.js, Google Chrome y FFmpeg en el PATH (Hyperframes lo usa para codificar el MP4).
$ErrorActionPreference = 'Stop'
$repo = Split-Path $PSScriptRoot -Parent
$out = Join-Path $PSScriptRoot 'renders\phishnet-final-120s.mp4'
Push-Location $repo
try {
  & npx --yes hyperframes@0.9.26 check video
  if ($LASTEXITCODE -ne 0) { throw "hyperframes check terminó con código $LASTEXITCODE" }
  & npx --yes hyperframes@0.9.26 render video -o $out -q delivery
  if ($LASTEXITCODE -ne 0) { throw "hyperframes render terminó con código $LASTEXITCODE" }
}
finally { Pop-Location }
