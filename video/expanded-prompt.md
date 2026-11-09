# PhishNet — video de problemática y demo

## Título y dirección visual

**Título:** Un segundo antes del clic  
**Duración:** 104 segundos, 16:9, 1920×1080, con cuatro bloques de voz de 26 segundos y música de fondo tenue.
**Dirección:** breve relato documental editorial, cálido y preciso. Abre con una interrupción urgente, deja espacio para comprender la problemática, y presenta el producto como una ayuda educativa limitada y transparente. No usar tono de miedo, números estadísticos sin fuente ni promesas de detección infalible.

**Valores de identidad extraídos de `docs/identidad-visual.md`:** tinta `#071A1F`, papel `#F4F1E9`, blanco cálido `#FFFDF7`, teal `#0D806F`, menta `#87F3C5`, naranja `#FF6B3D`, amarillo `#EFC84A`; Manrope 400–800 para voz de interfaz/títulos y DM Mono 400–500 para metadatos/tags.

**Motivo:** pausa visual marcada por una retícula fina y un punto de señal naranja que luego se convierte en el nodo del isotipo. La interfaz real aparece en capturas verificadas del navegador local, nunca dentro de un iframe.

## Ritmo

`hook-urgencia-breathe-PTM-reveal-demo-build-proof-breathe-resolve`: 0–26 s urgencia y problema; 26–52 s señales y propósito; 52–78 s producto y demostración; 78–104 s resultado y cierre. Cada bloque corresponde a una de las cuatro voces. Cada diapositiva dura 13 segundos. Los títulos y las capturas entran rápido y quedan nítidos; íconos SVG relacionados con cada tema aparecen entre los segundos 3 y 10. Las transiciones de blur/push mantienen su ritmo breve.

## Reglas globales

- Lienzo 1920×1080. Contenido dentro de margen seguro de 110 px.
- La composición visual se renderiza en Hyperframes y `render-and-mix.ps1` agrega las voces y la música suministradas. Las tarjetas de texto acompañan el guion de voz.
- Máximo dos frases cortas por aparición. Contraste mínimo AA.
- Fondo papel con grano, marcas de registro y líneas finas; acentos de marca sólidos, sin resplandor neón.
- 2–5 motivos ambientales por escena, con movimiento discreto sincronizado por la timeline y repeticiones finitas.
- Cada escena tiene al menos 8 componentes visuales entre texto, UI, etiquetas y motivos.
- No inventar evidencia, entrevistas, usuarios, incidentes reales, estadísticas ni socios.
- El mensaje de muestra es ficticio. No incluir teléfonos, nombres, claves ni URLs reales.
- Mostrar el resultado real del ejemplo de la aplicación: Alto, 88/100. Mantener siempre la aclaración de que es un resultado heurístico orientativo.

## Beats

### 1 — Notificación

**Concepto:** Una notificación invade una superficie cálida y detiene el ritmo. La cámara se acerca lo justo para leer una urgencia ficticia; el dedo no llega a tocar el enlace. El público siente duda, no pánico.

**Mood:** documental cotidiano, silencio antes de responder, objetos concretos.

**Capas:** BG papel con grano, retícula parcial y ghost type “PAUSA”; MG panel de teléfono, remitente genérico y mensaje urgente; FG etiqueta “MENSAJE FICTICIO”, tiempo y punto de alerta.

**Coreografía:** retícula flota; notificación entra como drop breve; mensaje se escribe por bloques; punto naranja pulsa una sola vez; “¿Entrarías?” aparece después del silencio.

**Transición:** blur-through de 0.45 s; el mensaje se desplaza y se convierte en pregunta.

### 2 — El clic bajo presión

**Concepto:** La decisión sucede antes de poder verificar. El espacio se divide entre el mensaje y el gesto suspendido; se destacan urgencia, cuenta y pedido de datos sin declarar que un mensaje real fue interceptado.

**Mood:** tensión contenida, ritmo más lento que el beat inicial.

**Capas:** BG círculo concéntrico tenue, retícula y marco de pantalla; MG mensaje a la izquierda, gesto detenido y tres etiquetas; FG sello editorial “FRENÁ”.

**Coreografía:** palabras clave caen en secuencia; línea de conexión dibuja el recorrido hacia el enlace y se detiene; el gesto se congela; etiquetas se deslizan en tres direcciones distintas.

**Transición:** push lateral de 0.45 s; la línea se transforma en regla editorial.

### 3 — Una dificultad cotidiana

**Concepto:** Mostrar por qué identificar fraude no siempre es sencillo: mensajes convincentes, prisa y señales técnicas difíciles de interpretar. Mantener el relato concreto y no afirmar una frecuencia estadística.

**Mood:** editorial humano, luz de papel y marcas de lectura.

**Capas:** BG ghost type “VERIFICAR”, textura, regla de lectura; MG tres fragmentos “parece oficial”, “te apura”, “no sabés qué mirar”; FG marcas de anotación y contador visual sin cifra factual.

**Coreografía:** fragmentos aparecen como anotaciones de cuaderno; las marcas subrayan cada frase; una franja naranja conecta las tres.

**Transición:** focus-pull de 0.45 s; anotaciones se reúnen hacia el centro y abren el PTM.

### 4 — PTM

**Concepto:** El propósito es el giro emocional: PhishNet existe para acercar herramientas comprensibles, no para sustituir el criterio de las personas. El texto del PTM se presenta completo y legible.

**Mood:** solemne, claro y accesible.

**Capas:** BG tinta `#071A1F`, halo teal, marca de agua PN; MG texto PTM en papel, subtítulo “Propósito Transformador Masivo”; FG regla mint, coordenadas mono y punto de señal.

**Coreografía:** palabra “accesible” se expande y se asienta; los demás términos aparecen escalonados; un trazo dibuja el perímetro abierto del logo.

**Transición:** cross-warp visual simulada con blur/push de 0.45 s; la forma abierta da paso a la ventana de la aplicación.

### 5 — PhishNet

**Concepto:** Presentar la plataforma con capturas reales: landing, navegación y analizador. Enfatizar que ayuda a revisar un mensaje sin visitar el destino.

**Mood:** demostración de producto honesta, superficie clara y herramienta palpable.

**Capas:** BG papel con grid y ghost type “ANÁLISIS LOCAL”; MG captura real de la landing en marco navegador; FG tags “React + TypeScript”, “local”, “sin abrir URLs”.

**Coreografía:** captura entra desde la derecha con perspectiva sutil y zoom lento; tags aparecen como rótulos técnicos; marca y regla se alinean.

**Transición:** push diagonal suave de 0.45 s hacia el formulario.

### 6 — Pegar y analizar

**Concepto:** Recorrido funcional real. Adjuntar una captura de un correo ficticio, mostrar la vista previa y el resultado que devuelve el OCR y el analizador.

**Mood:** preciso, ágil y explicativo.

**Capas:** BG papel y regla en movimiento; MG tres capturas reales del analizador: selección, archivo adjunto y resultado; FG pasos “Adjuntá”, “Analizá”, “Entendé”.

**Coreografía:** las tres pantallas del flujo se suceden con fundidos breves; el correo adjunto permanece visible antes de aparecer el resultado.

**Transición:** blur reveal de 0.45 s hacia el resultado.

### 7 — Señales y contexto

**Concepto:** Mostrar el resultado real 88/100 y las señales detectadas por el código actual: presión o urgencia, solicitud de credenciales, incentivo o amenaza económica y dominio inusual. El número es una salida heurística del ejemplo, no precisión validada.

**Mood:** claridad por encima de alarma.

**Capas:** BG tinta con ejes radar, ticks y ghost type “NO ES VEREDICTO”; MG captura real del resultado; FG score, señales destacadas y disclaimer legible.

**Coreografía:** score cuenta desde cero hasta 88; cuatro renglones entran en cascada; las líneas dibujan una guía al disclaimer; conservar alto contraste y tiempo de lectura.

**Transición:** push vertical suave de 0.45 s; la línea final se convierte en línea de recomendaciones.

### 8 — Próximo paso y cierre

**Concepto:** PhishNet ayuda a frenar y buscar un canal oficial. Cierra con su PTM y una instrucción memorable. Evitar llamar a registrarse o contratar, ya que la demo es académica.

**Mood:** resolución calmada y humana.

**Capas:** BG papel/mint, textura, gran marca de agua PN; MG las recomendaciones reales y logo; FG “Resultado orientativo”, “No abras”, “Confirmá por un canal oficial”.

**Coreografía:** recomendaciones entran una por vez, check simple aparece, logotipo se revela con el perímetro abierto, cierre mantiene 2 s para lectura.

**Transición final:** fade de color cálido a tinta, 0.7 s.

## Evitar

Escudos cliché, estética hacker, terminales verdes, sirenas, miedo, falsos porcentajes, testimonios inventados, promesas de seguridad, capturas vacías/anteriores, texto menor a 24 px, más de dos frases simultáneas y movimientos sin propósito.
