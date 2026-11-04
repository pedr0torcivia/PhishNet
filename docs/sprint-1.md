# Sprint 1 — contenido completo

## 1. Propósito Transformador Masivo

**¿Qué nos importa?** Que una persona pueda participar de la vida digital sin que la falta de conocimientos técnicos la vuelva un blanco fácil.

**¿Por qué?** El fraude explota emociones y asimetrías de información. Una explicación oportuna puede evitar pérdida de dinero, acceso a cuentas y exposición de datos.

**¿Cuál es el propósito?** Transformar señales técnicas de fraude en decisiones cotidianas más informadas.

**Si nunca pudiéramos fallar:** crearíamos una capa de prevención accesible en cada canal digital, capaz de enseñar mientras protege.

**Con USD 10 millones:** validaríamos el problema en distintas poblaciones, formaríamos un equipo interdisciplinario, desarrollaríamos detección explicable y privacidad por diseño, financiaríamos acceso gratuito para grupos vulnerables y crearíamos alianzas —sin asumir que ya existen— con organizaciones educativas y de respuesta a incidentes.

**Candidatos:** “Entender antes de confiar”; “Que nadie quede afuera de la seguridad digital”; “Hacer que la seguridad digital sea accesible para todos”.

**PTM ganador:** **Hacer que la seguridad digital sea accesible para todos.** Es amplio pero accionable, pone a las personas antes que la tecnología y permite evaluar cada decisión: si reduce barreras, aumenta comprensión y no exige conocimientos avanzados, acerca al propósito.

### Síntesis para post-it

- Nos importa: autonomía y confianza digital.
- Por qué: el fraude aprovecha urgencia y falta de contexto.
- Propósito: traducir señales técnicas en decisiones claras.
- Sin fracaso: prevención accesible en cada canal.
- Con USD 10 M: validar, investigar, educar y escalar con privacidad.
- PTM: **Hacer que la seguridad digital sea accesible para todos.**

## 2. Team Canvas

**Propósito:** diseñar y validar una solución clara para prevenir fraudes digitales, aprendiendo con evidencia y cuidando los datos.

**Objetivo de Sprint 1:** demostrar problema-solución mediante investigación secundaria, hipótesis medibles, canvas coherentes y una demo navegable.

**Objetivos del equipo:** entregar a tiempo; convertir supuestos en experimentos; mantener trazabilidad entre problema, producto y negocio; producir trabajo que cualquier integrante pueda explicar.

**Personas y roles:** completar con los nombres reales. Para hasta seis integrantes: coordinación de producto; investigación/validación; UX/UI y accesibilidad; frontend; motor de análisis/seguridad; calidad/documentación. Los roles pueden rotar y no implican habilidades personales ya comprobadas.

**Valores:** honestidad sobre la evidencia; claridad; responsabilidad compartida; privacidad; aprendizaje; respeto por el tiempo.

**Fortalezas a construir:** formación en sistemas, capacidad de prototipar, pensamiento lógico, acceso a herramientas abiertas.

**Riesgos/debilidades a validar:** experiencia limitada en investigación de usuarios, seguridad aplicada y comercialización; disponibilidad académica; sesgo hacia construir antes de validar.

**Reglas:** decisiones reversibles por autonomía; decisiones irreversibles por acuerdo; PR o revisión cruzada; bloqueos informados en 24 h; sin datos sensibles en repositorio; evidencia antes de afirmar; reunión con agenda y cierre con responsables.

**Actividades:** planificación semanal, daily asincrónica, revisión técnica, pruebas con guion, revisión de métricas y retrospectiva.

## 3. Tipo de mercado

| Tipo | Evaluación |
|---|---|
| Existente | Hay soluciones maduras de reputación, navegación segura y antivirus. Competir de forma frontal exigiría escala, datos e infraestructura superiores. |
| Resegmentado | PhishNet se enfoca en personas no expertas y PyMEs, integra mensajes y URLs, explica señales en lenguaje claro y contextualiza fraudes argentinos. |
| Nuevo | No crea una categoría sin alternativas: los usuarios ya resuelven parcialmente con buscadores, antivirus, bancos y herramientas como VirusTotal. |
| Clonado | No traslada sin cambios un modelo extranjero; necesita adaptación local y propuesta educativa propia. |

**Decisión:** mercado existente resegmentado, inicialmente por nicho. La hipótesis es que explicación, integración de contenido y contexto local producen valor no cubierto por herramientas técnicas.

## 4. Abundancias

| Abundancia | Oportunidad para PhishNet |
|---|---|
| Modelos de lenguaje | Explicar indicadores con vocabulario simple; solo después de evaluar privacidad, alucinaciones y costo. |
| Reglas y NLP open source | Construir una línea base auditable sin depender de un proveedor. |
| APIs de reputación | Enriquecer URLs con historial; usar proxy, caché y minimización para no filtrar contenido sensible. |
| Datasets públicos | Entrenar y evaluar patrones con datos anonimizados y licencias verificadas. |
| Cloud bajo demanda | Escalar experimentos sin inversión inicial; fijar presupuestos y límites. |
| Comunidades CERT/CSIRT y OSINT | Mantener taxonomías y ejemplos actuales; no se asumen alianzas. |
| Navegadores y estándares web | Distribuir una demo accesible sin instalación. |
| Automatización y CI | Probar reglas, accesibilidad y compilación en cada cambio. |
| Educación digital abierta | Reutilizar buenas prácticas con atribución y producir contenido localizado. |

## 5. ExO Canvas

**PTM:** Hacer que la seguridad digital sea accesible para todos.

**SCALE:** Staff on Demand: especialistas puntuales en seguridad, legal y UX research (hipótesis). Community & Crowd: comunidad educativa para reportar patrones, con moderación. Algorithms: reglas explicables y futuros modelos evaluados. Leveraged Assets: cloud, APIs y datasets sin comprar infraestructura. Engagement: aprendizaje progresivo y retroalimentación, evitando mecánicas de miedo.

**IDEAS:** Interfaces: analizador web, explicación y recomendaciones. Dashboards: métricas agregadas para PyMEs, sin vigilancia individual. Experimentation: entrevistas, pruebas de usabilidad y comparación de mensajes. Autonomy: células por producto, investigación y calidad con revisión cruzada. Social Technologies: repositorio, tablero de trabajo y decisiones documentadas.

## 6. Cronograma ágil propuesto

Las fechas oficiales no estaban publicadas en las fuentes accesibles; se propone alinear **S0** con la fecha de inicio indicada en el aula.

| Ceremonia | Frecuencia | Horario propuesto | Duración | Responsable | Objetivo |
|---|---|---|---|---|---|
| Planning | Inicio de sprint semanal | Lunes 19:00 | 45 min | Facilitador rotativo + PO | Meta, alcance, responsables y riesgos |
| Daily | Lunes a viernes asincrónica; llamada si hay bloqueo | Antes de 18:00 | 5 min/persona | Cada integrante | Ayer, hoy, bloqueo, evidencia |
| Review | Fin de sprint | Viernes 19:00 | 30 min | Dueño de cada ítem | Demostrar incremento verificable |
| Retrospective | Después de review | Viernes 19:30 | 30 min | Facilitador rotativo | Mantener, cambiar y probar una mejora |

**Backlog priorizado:** P0 auditoría; P0 canvas académicos; P0 demo analizador; P0 pruebas/build; P1 investigación con 15 entrevistas; P1 pruebas de usabilidad; P1 reputación externa; P2 dashboard B2B; P2 monetización.

**Secuencia:** Sprint 1: problema, canvas y demo; Sprint 2: entrevistas y usabilidad; Sprint 3: iteración y reputación; Sprint 4: experimento PyME y pitch. Cada sprint dura una semana como hipótesis operativa.

## 7. Demo

La demo implementa landing, analizador, resultados, educación, historial, planes y concepto B2B. El motor local detecta urgencia, credenciales, dinero, acortadores, TLD inusuales, HTTP, IP, identidad embebida y exceso de subdominios. No abre la URL ni promete seguridad.

## 8. Métricas del problema

Ver [validacion-problema.md](validacion-problema.md). Todas las metas son umbrales de decisión, no resultados.
