# Plan de contenido — Concept "One-Man Agency" (4 secciones)

> Vive en la branch `concept/odej-4-section-structure`, sobre [concept.html](./concept.html).
> Este documento lista qué falta llenar en cada placeholder y en qué orden conviene producirlo.

---

## Estado general

| Sección | Placeholders | Listos | Pendientes |
|---|---|---|---|
| 01 — Product & Behavioral UX | 4 | 3 | 1 |
| 02 — Hardware & Spatial 3D | 2 | 0 | 2 |
| 03 — Micro-Motion & UI (grid 3x3) | 9 | 0 | 9 |
| 04 — Game UI & Diegetic Lab | 1 | 0 | 1 (bloqueada por 02 y 03) |

---

## 01 / Product & Behavioral UX — "El Cerebro"

Proyectos estrella: DuoGit y Cuak.

**The Framework** — *ESA Framework Overview* · Reference (existente) · ✅ Listo
> Mapa de los 4 estados emocionales (Waiting, Happy, Worried, Broken) y qué dispara cada uno — la lógica psicológica detrás de las mascotas.
> Qué falta: nada, ya existe como sección ESA en el home real — reusar/linkear.

**The System** — *DuoGit / Cuak Design System* · Reference (existente) · ✅ Listo
> Librería completa de componentes, tokens y variantes en Figma que sostiene ambos productos.
> Qué falta: nada, ya está linkeado desde cada case study.

**Behavioral KPIs** — *Behavioral KPI Sheet* · Reference (existente) · ✅ Listo
> Métricas de negocio reales que prueban que el diseño funciona, no solo que se ve bien — streak recovery rate, Day 7 retention, time-to-first-commit.
> Qué falta: nada, ya está en el copy de DuoGit/Cuak.

**The Logic — DuoGit** — *DuoGit — Emotional Logic Flow* · Diagram · ❌ Falta
> Diagrama de flujo mostrando cómo un dato frío (ej. días sin commit) se traduce paso a paso en el estado emocional del gato de DuoGit.
> Qué falta: dibujarlo en Figma/Excalidraw, sin animación.

**The Logic — Cuak** — *Cuak — Emotional Logic Flow* · Diagram · ❌ Falta
> Mismo diagrama aplicado a Cuak: cómo el balance/gasto se traduce en el estado emocional del pato.
> Qué falta: dibujarlo en Figma/Excalidraw, sin animación.

**Prioridad:** alta, es lo único que falta y el dato ya existe — solo falta visualizarlo.

---

## 02 / Hardware & Spatial 3D — "La Forma"

Estilo Peter Tarka: minimalismo, texturas táctiles, geometría en Blender.

**Pipeline real (AI-assisted, no artesanal):** concepto plano en Figma → iteración con Gemini image-gen hasta conseguir un turnaround consistente del modelo → blocking rápido en Blender → **materiales de librería** (sin shading custom) → animación básica. Esto saca de la mesa la parte que más tiempo consume normalmente (autoría de materiales PBR desde cero), pero mete un riesgo nuevo: los generadores de imagen no siempre mantienen el mismo objeto entre ángulos — el turnaround puede necesitar varias corridas de prompt hasta ser usable en Blender.

**Tactile PBR** — *Material Study — PBR Macro Set* · 3D Render (Material Study) · ❌ Falta
> Serie de renders macro que muestran dominio de materiales — plástico mate, metal cepillado, vidrio esmerilado — sin depender de un objeto completo.
> Qué falta: con materiales de librería esto es más lighting/composición que shading — 3–4 renders macro.

**Concept Hardware** — *Concept Hardware — Hero Object* · 3D Render (Hero Asset) + Basic Animation · ❌ Falta
> 1–2 gadgets retro-futuristas inventados (perilla, dispositivo) que no existen físicamente — muestran composición geométrica y sensibilidad de producto físico.
> Qué falta: blocking rápido + librería + animación básica. El cuello de botella real es lograr un turnaround usable con Gemini, no el modelado.

**Spatial Setup** — *Spatial Setup — UI on Hardware* · 3D Render (Composite) · ⏸ Futuro
> Escena donde una UI digital (de 01 o 03) flota o se proyecta sobre el hardware físico de esta sección — conecta lo físico con lo digital.
> Qué falta: depende de tener el hardware primero.

**Orden sugerido:** material studies primero (rápido, prueba técnica) → concepto + turnaround del hardware con Gemini → blocking/materiales de librería/animación en Blender.

**Riesgo real de esta sección:** no es el modelado — es la consistencia del turnaround generado por IA. Si Gemini no da un ángulo utilizable en 1-2 corridas, absorbé el atraso con el colchón de domingos antes de tocar el checkpoint de 03/04.

---

## 03 / Micro-Motion & UI Presentations — "La Energía" (grid 3x3)

Clips de 3–5s en loop, mismo duration y paleta entre todos.

**Pipeline real (AI-assisted):** generado en canvas de Gemini → traído a Figma vía html-to-design → ajustes manuales → exportado por AEUX → terminado en After Effects. Cadena de 4 herramientas por tile — el riesgo no es animar desde cero (Gemini da el punto de partida), es la fricción de handoff entre pasos (html-to-design puede traer estructura sucia, AEUX puede requerir reordenar capas antes de animar en AE).

**1 · The Morph** — *The Morph — Button → Card* · Motion Loop (UI genérica) · ❌ Falta
> Un botón se expande fluidamente hasta convertirse en una tarjeta completa — demuestra continuidad de forma en la transición.
> Depende de: nada, UI ya existe en Figma.

**2 · The Birth** — *The Birth — UI Sequencing In* · Motion Loop (UI genérica) · ❌ Falta
> Una interfaz aparece en secuencia (botón → imagen → texto) en vez de aparecer toda junta — ritmo de entrada.
> Depende de: nada, UI ya existe en Figma.

**3 · Mascot Reaction** — *DuoGit — Neutral → Happy (Overshoot)* · Motion Loop (DuoGit) · ❌ Falta
> El gato de DuoGit pasa de neutral a feliz con un rebote (overshoot) — la mascota reaccionando como personaje, no como ícono estático.
> Depende de: nada, sprites de DuoGit ya existen.

**4 · The Fly-Through** — *Fly-Through — Camera Into Detail* · Motion Loop (3D — hardware de 02) · ❌ Falta
> La cámara 3D atraviesa una tarjeta de UI para entrar al detalle técnico del hardware — conecta 02 con la interfaz.
> Depende de: Sección 02 (necesita el objeto 3D).

**5 · Tactile Input** — *Tactile Input — Knob Press + Glow* · Motion Loop (3D — hardware de 02) · ❌ Falta
> Un dedo/cursor presiona una perilla física en 3D que activa un resplandor neón — interacción física con feedback digital.
> Depende de: Sección 02 (necesita el hardware).

**6 · Staggered Entry** — *Cuak — Staggered Card Entry* · Motion Loop (Cuak) · ❌ Falta
> Tarjetas de Cuak entrando a pantalla con desfase de tiempo y profundidad — sensación de peso y jerarquía.
> Depende de: nada, UI de Cuak ya existe.

**7 · Depth Parallax** — *Depth Parallax — Lateral Camera* · Motion Loop (UI genérica) · ❌ Falta
> Movimiento de cámara lateral donde fondo y UI se mueven a distinta velocidad — profundidad sin 3D real.
> Depende de: nada, UI existente + post.

**8 · The Glow** — *Cuak — Dark Mode Neon Pulse* · Motion Loop (Cuak, Dark Mode) · ❌ Falta
> Loop de una interfaz en Dark Mode con luz neón pulsante — atmósfera, no solo función.
> Depende de: nada, UI existente + efectos.

**9 · Pipeline Showcase** — *Figma → AEUX — Process Split-Screen* · Screen Recording · ❌ Falta
> Split-screen mostrando el paso real de tu propio proceso: Figma a After Effects vía AEUX, y el resultado final lado a lado.
> Depende de: nada, es screen recording de tu propio proceso.

**Orden sugerido:**
1. Mascot Reaction (3) — assets ya listos, menor esfuerzo.
2. The Morph (1), The Birth (2), Staggered Entry (6) — pure motion sobre UI existente.
3. Depth Parallax (7), The Glow (8) — UI existente + post-efectos.
4. Pipeline Showcase (9) — el más fácil de producir (screen recording propio).
5. Tactile Input (5), The Fly-Through (4) — al final, dependen de que 02 exista.

**Pass final:** unificar duration y paleta entre los 9 tiles recién al cerrar la sección, no tile por tile.

---

## 04 / Game UI & Diegetic Lab — "El Puente al Dinero"

**Diegetic HUDs** — *Diegetic HUD — Hardware Terminal* · Video / Motion (composite 3D) · ❌ Falta
> Interfaces que viven dentro de los objetos 3D de 02 — por ejemplo la pantalla de un brazalete o terminal — la UI como parte del objeto, no superpuesta.
> Depende de: hardware renderizado de 02.

**Holographic UI** — *Holographic UI — Inventory / Map Concept* · Motion Loop (Sci-Fi UI) · ❌ Falta
> Animación de un menú de inventario o mapa con estética sci-fi/holográfica — el lenguaje visual de juegos, no de apps.
> Depende de: motion de 03.

**The Breakdown** — *The Breakdown — Pipeline Explainer* · Video (grabación + edición) · ❌ Falta
> Video corto explicando el pipeline técnico real: cómo el modelado 3D, la lógica UX y el motion se integran en un prototipo o motor de juego.
> Depende de: ambos — guión 3D → lógica UX → Motion → engine.

**Bloqueada** hasta tener al menos 1 hardware de 02 y algún motion de 03 — es la unión de ambas secciones.

---

## Orden global de producción

1. **01** — cerrar rápido (ya 75% hecho, solo falta el diagrama de lógica).
2. **03** — tiles que no dependen de 3D (1, 2, 3, 6, 7, 8, 9).
3. **02** — material studies + hardware concept.
4. **03** — tiles restantes que dependían de 02 (4, 5) + pass de consistencia final.
5. **04** — una vez 02 y 03 tienen material real.

---

## Cronograma — deadline 2026-08-28

Base: hoy es **2026-07-31**. Disponibilidad: días completos, sesiones de 5h. Descanso los domingos (2026-08-02, 09, 16, 23) — no cuentan como día de trabajo, sirven de colchón si algo se atrasa.

Recalculado tras confirmar el pipeline real: **02 pasa de 7 días a 4** (sin autoría de materiales, blocking rápido con librería) — eso libera 3 días que se reasignan como buffer explícito antes del deadline, en vez de comprimir el resto.

| Fecha | Día | Tarea | Hito |
|---|---|---|---|
| 2026-07-31 | Vie | 01 — The Logic (DuoGit + Cuak), los 2 diagramas | **01 completa** ✅ fin del día |
| 2026-08-01 | Sáb | 03 — Tile 3 Mascot Reaction | |
| 2026-08-02 | Dom | Descanso / colchón | |
| 2026-08-03 | Lun | 03 — Tile 1 The Morph | |
| 2026-08-04 | Mar | 03 — Tile 2 The Birth | |
| 2026-08-05 | Mié | 03 — Tile 6 Staggered Entry | |
| 2026-08-06 | Jue | 03 — Tile 7 Depth Parallax | |
| 2026-08-07 | Vie | 03 — Tile 8 The Glow | |
| 2026-08-08 | Sáb | 03 — Tile 9 Pipeline Showcase | **7/9 tiles de 03 listos** (todo lo no-3D) |
| 2026-08-09 | Dom | Descanso / colchón | |
| 2026-08-10 | Lun | 02 — Tactile PBR (lighting + comp, librería de materiales) | **Tactile PBR listo** |
| 2026-08-11 | Mar | 02 — Concept Hardware: concepto en Figma + iteración de turnaround en Gemini | |
| 2026-08-12 | Mié | 02 — Concept Hardware: blocking en Blender + materiales de librería | |
| 2026-08-13 | Jue | 02 — Concept Hardware: animación básica + render | **02 completa** ✅ |
| 2026-08-14 | Vie | 03 — Tile 4 The Fly-Through | |
| 2026-08-15 | Sáb | 03 — Tile 5 Tactile Input | 9/9 tiles con contenido |
| 2026-08-16 | Dom | Descanso / colchón | |
| 2026-08-17 | Lun | 03 — pass de consistencia (duration + paleta parejos en los 9) | **03 completa** ✅ |
| 2026-08-18 | Mar | 04 — Diegetic HUDs (pipeline ya rodado desde 03: Gemini → Figma → AEUX → AE) | Diegetic HUDs listo |
| 2026-08-19 | Mié | 04 — Holographic UI (mismo pipeline) | Holographic UI listo |
| 2026-08-20 | Jue | 04 — The Breakdown (guión + grabación) | |
| 2026-08-21 | Vie | 04 — The Breakdown (edición) | **04 completa ✅ — las 4 secciones llenas** |
| 2026-08-22 | Sáb | **Buffer libre #1** | |
| 2026-08-23 | Dom | Descanso / colchón | |
| 2026-08-24 | Lun | **Buffer libre #2** | |
| 2026-08-25 | Mar | **Buffer libre #3** | |
| 2026-08-26 | Mié | **Buffer libre #4** | |
| 2026-08-27 | Jue | QA: reemplazar placeholders en `concept.html`, revisar cross-browser | |
| 2026-08-28 | Vie | Publicación | **DEADLINE — listo para publicar** |

**Checkpoints intermedios** (si alguno se pasa de fecha, ahí sabés que estás atrasado):
- **2026-08-01** → 01 debe estar 100% cerrada.
- **2026-08-08** → 03 debe tener 7 de 9 tiles (todo lo que no depende de 3D).
- **2026-08-13** → 02 debe estar 100% cerrada.
- **2026-08-17** → 03 debe estar 100% cerrada (9/9 + pass de consistencia).
- **2026-08-21** → 04 debe estar 100% cerrada — las 4 secciones completas.
- **2026-08-22 a 26** → 4 días de buffer real, sin asignar. Cero producción nueva salvo que se esté usando el buffer para absorber un atraso.

**4 días de buffer libre + 4 domingos** es bastante colchón para un plan de 4 semanas — señal de que el pipeline con IA lo corrió bien hacia adelante. Con esto tenés margen para: absorber atrasos (turnaround de Gemini, handoff html-to-design/AEUX), sumar pulido extra a los tiles ya "listos", o adelantar la fecha de publicación si querés — decisión tuya, no lo muevo sin que lo confirmes.

---

## Tracking

Marcar acá cada item cuando el asset real reemplace el placeholder en `concept.html`. Fecha = deadline de esa tarea según el cronograma de arriba.

- [ ] 01 — The Logic (DuoGit) — due 2026-07-31
- [ ] 01 — The Logic (Cuak) — due 2026-07-31
- [ ] 03 — Tile 3 Mascot Reaction — due 2026-08-01
- [ ] 03 — Tile 1 The Morph — due 2026-08-03
- [ ] 03 — Tile 2 The Birth — due 2026-08-04
- [ ] 03 — Tile 6 Staggered Entry — due 2026-08-05
- [ ] 03 — Tile 7 Depth Parallax — due 2026-08-06
- [ ] 03 — Tile 8 The Glow — due 2026-08-07
- [ ] 03 — Tile 9 Pipeline Showcase — due 2026-08-08
- [ ] 02 — Tactile PBR — due 2026-08-10
- [ ] 02 — Concept Hardware — due 2026-08-13
- [ ] 03 — Tile 4 The Fly-Through — due 2026-08-14
- [ ] 03 — Tile 5 Tactile Input — due 2026-08-15
- [ ] 03 — Pass de consistencia (duration + paleta) — due 2026-08-17
- [ ] 04 — Diegetic HUDs — due 2026-08-18
- [ ] 04 — Holographic UI — due 2026-08-19
- [ ] 04 — The Breakdown — due 2026-08-21
- [ ] Buffer libre (4 días sin asignar) — 2026-08-22 a 26
- [ ] QA final + publicación — due 2026-08-28
