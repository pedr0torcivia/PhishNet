param(
  [string]$Video = (Join-Path $PSScriptRoot 'renders\phishnet-silent-intermediate.mp4'),
  [string]$Voice = (Join-Path $PSScriptRoot 'assets\voice-original.mp3'),
  [string]$Music = (Join-Path $PSScriptRoot 'assets\music-original.mp3'),
  [string]$Output = (Join-Path $PSScriptRoot 'renders\phishnet-con-audio.mp4')
)

$ErrorActionPreference = 'Stop'

# Four speakers in the supplied recording start at 0, 23.7, 47.0 and 72.35 s.
# Each segment is placed in its matching 26-second video block. The final
# segment is sped up by about 3% so its last word fits before 1:44.
# Measured integrated levels were -26.96, -16.95, -27.56 and -16.91 LUFS.
# The gains below bring each voice close to -21 LUFS; the music sits near -34 LUFS.
$filter = @'
[1:a]asplit=4[a1][a2][a3][a4];
[a1]atrim=start=0:end=23.7,asetpts=PTS-STARTPTS,volume=5.96dB,apad,atrim=duration=26,aresample=48000[p1];
[a2]atrim=start=23.7:end=47,asetpts=PTS-STARTPTS,volume=-4.05dB,apad,atrim=duration=26,aresample=48000[p2];
[a3]atrim=start=47:end=72.35,asetpts=PTS-STARTPTS,volume=6.56dB,apad,atrim=duration=26,aresample=48000[p3];
[a4]atrim=start=72.35:end=99.160813,asetpts=PTS-STARTPTS,volume=-4.09dB,atempo=1.03118,apad,atrim=duration=26,aresample=48000[p4];
[p1][p2][p3][p4]concat=n=4:v=0:a=1[voice];
[2:a]atrim=duration=104,asetpts=PTS-STARTPTS,volume=-24dB,afade=t=in:st=0:d=1,afade=t=out:st=102:d=2,aresample=48000[music];
[voice][music]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.891:level=0[aout]
'@

& ffmpeg -hide_banner -y -i $Video -i $Voice -i $Music -filter_complex $filter -map '0:v:0' -map '[aout]' -c:v copy -c:a aac -b:a 192k -ac 2 -ar 48000 -movflags +faststart -t 104 $Output
if ($LASTEXITCODE -ne 0) { throw "FFmpeg terminó con código $LASTEXITCODE" }
