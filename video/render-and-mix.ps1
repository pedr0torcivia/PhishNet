$ErrorActionPreference = 'Stop'
$repo = Split-Path $PSScriptRoot -Parent
$intermediate = Join-Path $PSScriptRoot 'renders\phishnet-silent-intermediate.mp4'

Push-Location $repo
try {
  & npx --yes hyperframes@0.9.15 render video -o $intermediate -q delivery --workers 2
  if ($LASTEXITCODE -ne 0) { throw "Hyperframes terminó con código $LASTEXITCODE" }

  & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'mix-audio.ps1') -Video $intermediate
  if ($LASTEXITCODE -ne 0) { throw "La mezcla de audio terminó con código $LASTEXITCODE" }
}
finally {
  Pop-Location
  if (Test-Path -LiteralPath $intermediate) {
    Remove-Item -LiteralPath $intermediate -Force
  }
}
