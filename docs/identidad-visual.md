# Identidad visual

## Idea rectora: “señales entre el ruido”

PhishNet no usa el escudo como cliché aislado: el isotipo combina un perímetro abierto, una trayectoria de anzuelo interceptada y un nodo de alerta. La interfaz toma códigos de instrumental técnico —retículas, monoespaciada, líneas y puntajes— y los equilibra con lenguaje claro y superficies cálidas.

## Logotipo e isotipo

La marca tipográfica usa **PHISH** en tinta y **NET** en verde. El SVG está en `design/logo/phishnet-mark.svg`. Área de protección: al menos la mitad del ancho del isotipo. Tamaño mínimo digital: 24 px. No rotar, sombrear ni encerrar en formas decorativas.

## Paleta

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#071A1F` | texto, fondos de alta confianza |
| `--paper` | `#F4F1E9` | fondo humano, evita estética clínica genérica |
| `--white` | `#FFFDF7` | superficies |
| `--teal` | `#0D806F` | acción, marca y riesgo bajo |
| `--mint` | `#87F3C5` | señal activa sobre fondo oscuro |
| `--orange` | `#FF6B3D` | alerta/riesgo alto, nunca único portador de significado |
| `--yellow` | `#EFC84A` | advertencia media |

## Tipografía

Manrope 400–800 para interfaz y titulares; DM Mono 400–500 para señales, etiquetas, estados y datos. Escala aproximada: 12, 14, 16, 19, 25, 38, 48, 66 y 78 px. Titulares con tracking negativo y cuerpo con altura de línea 1.55–1.7.

## Composición y componentes

Base de 4 px; espaciado 8/12/16/20/28/40/56/80. Radios de 4 px: precisión, no blandura genérica. Sombras solo como desplazamiento sólido de marca. Componentes: encabezado, botones primario/textual, panel de entrada, señal explicada, score, badge, planes, historial, estado vacío/error/carga.

## Estados

Hover mediante borde o subrayado; foco visible del navegador reforzado por borde teal en campos; disabled con opacidad y cursor; carga con animación anulable; error con texto y no solo color; vacío con siguiente acción. Riesgo siempre combina palabra, puntaje y explicación.

## Iconografía y accesibilidad

Trazos de 1,8 px, terminales redondeados, viewBox 24. Los íconos decorativos llevan `aria-hidden`. Contraste principal supera 4.5:1; texto pequeño evita mint sobre claro. Objetivos interactivos tienen aproximadamente 40–44 px cuando son acciones principales.
