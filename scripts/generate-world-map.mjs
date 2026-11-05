import { readFileSync, writeFileSync } from 'node:fs'
import { geoEquirectangular, geoGraticule10, geoPath } from 'd3-geo'
import { feature, mesh } from 'topojson-client'

const atlas = JSON.parse(readFileSync(new URL('../node_modules/world-atlas/countries-110m.json', import.meta.url)))
const countries = feature(atlas, atlas.objects.countries)
const borders = mesh(atlas, atlas.objects.countries, (a, b) => a !== b)
const projection = geoEquirectangular().fitExtent([[42, 28], [1158, 572]], { type: 'Sphere' })
const path = geoPath(projection)

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" role="presentation">
  <defs>
    <linearGradient id="ocean" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#071b20"/>
      <stop offset="1" stop-color="#0a262b"/>
    </linearGradient>
    <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1a4b50"/>
      <stop offset="1" stop-color="#12373c"/>
    </linearGradient>
  </defs>
  <path d="${path({ type: 'Sphere' })}" fill="url(#ocean)" stroke="#315157" stroke-width="1.5"/>
  <path d="${path(geoGraticule10())}" fill="none" stroke="#214047" stroke-width=".7" opacity=".8"/>
  <path d="${path(countries)}" fill="url(#land)" stroke="#52767a" stroke-width=".65" vector-effect="non-scaling-stroke"/>
  <path d="${path(borders)}" fill="none" stroke="#608085" stroke-width=".45" opacity=".85" vector-effect="non-scaling-stroke"/>
</svg>`

writeFileSync(new URL('../public/world-map.svg', import.meta.url), svg)
