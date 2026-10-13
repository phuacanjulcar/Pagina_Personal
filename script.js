/**
 * Portafolio Personal - Pedro Pablo Huacanjulca Rodríguez
 * JavaScript puro (Vanilla JS), sin dependencias ni librerías externas.
 *
 * Módulos:
 * 1. Detección y gestión de accesibilidad (prefers-reduced-motion).
 * 2. Barra de progreso de lectura superior.
 * 3. Efecto de escritura (Typewriter) con fallback accesible.
 * 4. Habilidades técnicas: animación, aviso flotante sin layout shift y soporte táctil/teclado.
 * 5. Selector de tema claro/oscuro persistente.
 * 6. Revelado de secciones y ScrollSpy accesible (IntersectionObserver).
 */

document.addEventListener("DOMContentLoaded", () => {
    // =============================================================
    // 1. Accesibilidad: Detección de preferencia de movimiento
    // =============================================================
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = motionQuery.matches;

    motionQuery.addEventListener("change", (e) => {
        prefersReducedMotion = e.matches;
        if (prefersReducedMotion) {
            activarModoSinAnimaciones();
        }
    });

    function activarModoSinAnimaciones() {
        document.querySelectorAll(".seccion-revelar").forEach((seccion) => {
            seccion.classList.add("visible");
        });
        document.querySelectorAll(".tarjeta, .tarjeta-proyecto, .tarjeta-competencia, .tarjeta-certificacion, .grupo-tarjeta, .boton-competencia").forEach((c) => {
            c.classList.add("aparecido");
        });
        const seccionHabilidades = document.getElementById("habilidades");
        if (seccionHabilidades) {
            seccionHabilidades.classList.add("animado");
        }
        const elementoTexto = document.getElementById("typewriter-texto");
        if (elementoTexto) {
            elementoTexto.textContent = "Estudiante de Ingeniería de Sistemas";
        }
    }

    // =============================================================
    // 2. Barra de Progreso de Lectura
    // =============================================================
    const barraProgreso = document.getElementById("barra-progreso");
    let ticking = false;

    function actualizarProgresoLectura() {
        if (!barraProgreso) return;
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollActual = window.scrollY || document.documentElement.scrollTop;
        const porcentaje = totalScroll > 0 ? Math.min(100, Math.max(0, (scrollActual / totalScroll) * 100)) : 0;
        
        barraProgreso.style.width = `${porcentaje}%`;
        barraProgreso.setAttribute("aria-valuenow", Math.round(porcentaje).toString());
        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(actualizarProgresoLectura);
            ticking = true;
        }
    }, { passive: true });

    actualizarProgresoLectura();

    // =============================================================
    // 3. Efecto de Escritura (Typewriter)
    // =============================================================
    const elementoTypewriter = document.getElementById("typewriter-texto");
    const frases = [
        "Estudiante de Ingeniería de Sistemas",
        "Desarrollo de software",
        "Análisis de datos"
    ];
    let indiceFrase = 0;
    let indiceLetra = 0;
    let borrando = false;
    let temporizadorTypewriter = null;

    function animarEscritura() {
        if (prefersReducedMotion || !elementoTypewriter) {
            if (elementoTypewriter) {
                elementoTypewriter.textContent = "Estudiante de Ingeniería de Sistemas";
            }
            return;
        }

        const fraseActual = frases[indiceFrase];

        if (borrando) {
            indiceLetra--;
            elementoTypewriter.textContent = fraseActual.substring(0, indiceLetra);
        } else {
            indiceLetra++;
            elementoTypewriter.textContent = fraseActual.substring(0, indiceLetra);
        }

        let velocidad = borrando ? 35 : 75;

        if (!borrando && indiceLetra === fraseActual.length) {
            // Pausa al terminar de escribir la frase
            velocidad = 2200;
            borrando = true;
        } else if (borrando && indiceLetra === 0) {
            // Pausa antes de comenzar la siguiente frase
            borrando = false;
            indiceFrase = (indiceFrase + 1) % frases.length;
            velocidad = 450;
        }

        temporizadorTypewriter = setTimeout(animarEscritura, velocidad);
    }

    if (!prefersReducedMotion && elementoTypewriter) {
        // Pequeño retardo inicial para carga limpia
        setTimeout(animarEscritura, 600);
    }

    // =============================================================
    // 4. Renderizado Dinámico e Interacción: Habilidades y Competencias
    // =============================================================

    // --- A. Renderizado Dinámico de Habilidades Técnicas ---
    const contenedorHabilidades = document.getElementById("contenedor-habilidades-grupos");
    const habilidadesData = window.HABILIDADES || [];
    const categoriasData = window.CATEGORIAS_HABILIDADES || [
        { id: "lenguajes", titulo: "Lenguajes" },
        { id: "web_bd", titulo: "Web y bases de datos" },
        { id: "datos", titulo: "Datos" },
        { id: "herramientas", titulo: "Herramientas" }
    ];

    if (contenedorHabilidades && habilidadesData.length > 0) {
        contenedorHabilidades.innerHTML = ""; // Preparar para inyección dinámica

        categoriasData.forEach((categoria) => {
            const habilidadesGrupo = habilidadesData.filter((h) => h.categoria === categoria.id);
            if (habilidadesGrupo.length === 0) return;

            const grupoCard = document.createElement("div");
            grupoCard.className = "grupo-tarjeta";
            grupoCard.setAttribute("data-categoria-id", categoria.id);

            const tituloGrupo = document.createElement("h3");
            tituloGrupo.textContent = categoria.titulo;
            grupoCard.appendChild(tituloGrupo);

            const listaGrupo = document.createElement("div");
            listaGrupo.className = "lista-habilidades";
            listaGrupo.setAttribute("role", "group");
            listaGrupo.setAttribute("aria-label", `Habilidades en ${categoria.titulo}`);

            habilidadesGrupo.forEach((habilidad) => {
                const itemContenedor = document.createElement("div");
                itemContenedor.className = "habilidad-acordeon-item";
                itemContenedor.setAttribute("data-habilidad-id", habilidad.id);

                const panelId = `panel-hab-${habilidad.id}`;

                const boton = document.createElement("button");
                boton.type = "button";
                boton.className = "boton-habilidad";
                boton.id = `btn-hab-${habilidad.id}`;
                boton.setAttribute("aria-expanded", "false");
                boton.setAttribute("aria-controls", panelId);

                // Cabecera: Nombre y texto de nivel visible
                const cabecera = document.createElement("span");
                cabecera.className = "habilidad-cabecera";

                const nombre = document.createElement("span");
                nombre.className = "habilidad-nombre";
                nombre.textContent = habilidad.nombre;

                // Distintivo especial y dinámico para R en aprendizaje
                if (habilidad.id === "r" || habilidad.enAprendizaje) {
                    const badgeR = document.createElement("span");
                    badgeR.className = "badge-aprendizaje";
                    badgeR.innerHTML = `<span class="punto-pulso" aria-hidden="true"></span><span>En aprendizaje</span>`;
                    nombre.appendChild(badgeR);
                } else if (habilidad.aclaracion) {
                    const aclaracion = document.createElement("small");
                    aclaracion.className = "aclaracion";
                    aclaracion.textContent = ` ${habilidad.aclaracion}`;
                    nombre.appendChild(aclaracion);
                }

                const textoNivel = document.createElement("span");
                textoNivel.className = "habilidad-texto";
                textoNivel.setAttribute("aria-hidden", "true");
                textoNivel.textContent = habilidad.nivelTexto;

                cabecera.appendChild(nombre);
                cabecera.appendChild(textoNivel);

                // Indicador de 3 segmentos con aria-label descriptivo para lectores de pantalla
                const indicador = document.createElement("span");
                indicador.className = "habilidad-indicador";
                indicador.setAttribute(
                    "aria-label",
                    `${habilidad.nombre}: nivel ${habilidad.nivelTexto.toLowerCase()}, ${habilidad.nivel} de 3`
                );

                const segmentos = document.createElement("span");
                segmentos.className = "segmentos";
                segmentos.setAttribute("aria-hidden", "true");

                for (let i = 1; i <= 3; i++) {
                    const seg = document.createElement("span");
                    seg.className = `segmento${i <= habilidad.nivel ? " activo" : ""}`;
                    segmentos.appendChild(seg);
                }
                indicador.appendChild(segmentos);

                // Aviso flotante contextual (tooltip)
                const aviso = document.createElement("span");
                aviso.className = "aviso-nivel";
                aviso.setAttribute("aria-hidden", "true");
                const avisoSpan = document.createElement("span");
                avisoSpan.textContent = `${habilidad.nombre}: ${habilidad.nivelTexto} (${habilidad.nivel} de 3)${habilidad.aclaracion && habilidad.id !== "r" ? ` - ${habilidad.aclaracion}` : ""}`;
                aviso.appendChild(avisoSpan);

                boton.appendChild(cabecera);
                boton.appendChild(indicador);
                boton.appendChild(aviso);

                // Panel de detalle en línea directamente debajo de esta habilidad
                const panelDetalle = document.createElement("div");
                panelDetalle.id = panelId;
                panelDetalle.className = "panel-detalle panel-detalle-habilidad-enlinea";
                panelDetalle.setAttribute("role", "region");
                panelDetalle.setAttribute("aria-label", `Detalle de ${habilidad.nombre}`);
                panelDetalle.setAttribute("aria-live", "polite");
                panelDetalle.hidden = true;

                // Alternancia de acordeón al hacer clic o tocar
                boton.addEventListener("click", () => {
                    alternarHabilidad(habilidad, boton, panelDetalle);
                });

                itemContenedor.appendChild(boton);
                itemContenedor.appendChild(panelDetalle);
                listaGrupo.appendChild(itemContenedor);
            });

            grupoCard.appendChild(listaGrupo);
            contenedorHabilidades.appendChild(grupoCard);
        });
    }

    function alternarHabilidad(habilidad, botonActivo, panelActivo) {
        const estaAbierto = botonActivo.getAttribute("aria-expanded") === "true";

        // Cerrar paneles abiertos previamente para mantener orden visual
        document.querySelectorAll(".panel-detalle-habilidad-enlinea").forEach((p) => {
            p.hidden = true;
            p.innerHTML = "";
        });
        document.querySelectorAll(".boton-habilidad").forEach((btn) => {
            btn.classList.remove("activo");
            btn.setAttribute("aria-expanded", "false");
        });

        if (!estaAbierto) {
            // Abrir y poblar el panel desplegado debajo de la habilidad seleccionada
            botonActivo.classList.add("activo");
            botonActivo.setAttribute("aria-expanded", "true");

            const itemsQuePuedoHacer = Array.isArray(habilidad.quePuedoHacer)
                ? habilidad.quePuedoHacer.map((item) => `<li>${item}</li>`).join("")
                : `<li>${habilidad.quePuedoHacer}</li>`;

            const seccionNota = habilidad.nota
                ? `
                <div class="panel-seccion panel-nota">
                    <span class="panel-etiqueta">Nota:</span>
                    <p class="panel-texto">${habilidad.nota}</p>
                </div>`
                : "";

            panelActivo.innerHTML = `
                <div class="panel-cabecera">
                    <div class="panel-titulo-grupo">
                        <h4 class="panel-nombre">${habilidad.nombre}${habilidad.aclaracion && habilidad.id !== "r" ? ` <small class="aclaracion">${habilidad.aclaracion}</small>` : ""}</h4>
                        <div class="panel-nivel-pill">
                            <span class="habilidad-texto">${habilidad.nivelTexto} (${habilidad.nivel}/3)</span>
                            <div class="segmentos" aria-hidden="true">
                                <span class="segmento ${habilidad.nivel >= 1 ? "activo" : ""}"></span>
                                <span class="segmento ${habilidad.nivel >= 2 ? "activo" : ""}"></span>
                                <span class="segmento ${habilidad.nivel >= 3 ? "activo" : ""}"></span>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="panel-cerrar" aria-label="Cerrar detalle de ${habilidad.nombre}">&times;</button>
                </div>
                <div class="panel-seccion">
                    <span class="panel-etiqueta">Dónde la usé:</span>
                    <p class="panel-texto">${habilidad.dondeLaUse}</p>
                </div>
                <div class="panel-seccion">
                    <span class="panel-etiqueta">Qué puedo hacer:</span>
                    <ul class="panel-lista">
                        ${itemsQuePuedoHacer}
                    </ul>
                </div>
                ${seccionNota}
            `;

            panelActivo.hidden = false;

            const btnCerrar = panelActivo.querySelector(".panel-cerrar");
            if (btnCerrar) {
                btnCerrar.addEventListener("click", () => {
                    panelActivo.hidden = true;
                    panelActivo.innerHTML = "";
                    botonActivo.classList.remove("activo");
                    botonActivo.setAttribute("aria-expanded", "false");
                    botonActivo.focus();
                });
            }
        }
    }

    // --- B. Renderizado Dinámico de Competencias Personales ---
    const contenedorCompetencias = document.getElementById("contenedor-competencias");
    const competenciasData = window.COMPETENCIAS || [];

    if (contenedorCompetencias && competenciasData.length > 0) {
        contenedorCompetencias.innerHTML = "";

        const grillaBotones = document.createElement("div");
        grillaBotones.className = "botones-competencias-grilla";
        grillaBotones.setAttribute("role", "group");
        grillaBotones.setAttribute("aria-label", "Selección de competencias personales");

        const panelCompId = "panel-competencia-detalle";

        competenciasData.forEach((comp) => {
            const btnComp = document.createElement("button");
            btnComp.type = "button";
            btnComp.className = "boton-competencia";
            btnComp.id = `btn-comp-${comp.id}`;
            btnComp.setAttribute("aria-expanded", "false");
            btnComp.setAttribute("aria-controls", panelCompId);

            btnComp.innerHTML = `
                <span class="icono-competencia" aria-hidden="true">${comp.icono}</span>
                <span class="nombre-competencia">${comp.nombre}</span>
            `;

            btnComp.addEventListener("click", () => {
                alternarCompetencia(comp, btnComp);
            });

            grillaBotones.appendChild(btnComp);
        });

        contenedorCompetencias.appendChild(grillaBotones);

        // UN panel de detalle compartido para todas las competencias
        const panelCompDetalle = document.createElement("div");
        panelCompDetalle.id = panelCompId;
        panelCompDetalle.className = "panel-detalle panel-detalle-competencia";
        panelCompDetalle.setAttribute("role", "region");
        panelCompDetalle.setAttribute("aria-label", "Detalle de competencia personal");
        panelCompDetalle.setAttribute("aria-live", "polite");
        panelCompDetalle.hidden = true;

        contenedorCompetencias.appendChild(panelCompDetalle);
    }

    function alternarCompetencia(comp, btnActivo) {
        const panel = document.getElementById("panel-competencia-detalle");
        const contenedor = document.getElementById("contenedor-competencias");
        if (!panel || !contenedor) return;

        const estaAbierto = btnActivo.getAttribute("aria-expanded") === "true";

        // Desactivar todos los botones de competencias
        contenedor.querySelectorAll(".boton-competencia").forEach((btn) => {
            btn.classList.remove("activo");
            btn.setAttribute("aria-expanded", "false");
        });

        if (estaAbierto) {
            panel.hidden = true;
            panel.innerHTML = "";
        } else {
            btnActivo.classList.add("activo");
            btnActivo.setAttribute("aria-expanded", "true");

            const itemsDetalle = comp.detalle && comp.detalle.length > 0
                ? comp.detalle.map((d) => `<li>${d}</li>`).join("")
                : `<li>${comp.evidencia}</li>`;

            panel.innerHTML = `
                <div class="panel-cabecera">
                    <div class="panel-titulo-grupo">
                        <div class="panel-icono-competencia" aria-hidden="true">${comp.icono}</div>
                        <h3 class="panel-nombre">${comp.nombre}</h3>
                    </div>
                    <button type="button" class="panel-cerrar" aria-label="Cerrar detalle de ${comp.nombre}">&times;</button>
                </div>
                <div class="panel-seccion panel-evidencia-bloque">
                    <span class="panel-etiqueta">Evidencia principal:</span>
                    <p class="panel-texto panel-texto-destacado">${comp.evidencia}</p>
                </div>
                <div class="panel-seccion">
                    <span class="panel-etiqueta">Profundización y aplicación real:</span>
                    <ul class="panel-lista">
                        ${itemsDetalle}
                    </ul>
                </div>
            `;

            panel.hidden = false;

            const btnCerrar = panel.querySelector(".panel-cerrar");
            if (btnCerrar) {
                btnCerrar.addEventListener("click", () => {
                    panel.hidden = true;
                    panel.innerHTML = "";
                    btnActivo.classList.remove("activo");
                    btnActivo.setAttribute("aria-expanded", "false");
                    btnActivo.focus();
                });
            }
        }
    }

    // --- C. Soporte de Teclado Global (Escape para cerrar cualquier panel) ---
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            // Cerrar cualquier panel de habilidad abierto
            document.querySelectorAll(".grupo-tarjeta").forEach((grupo) => {
                const btnActivo = grupo.querySelector(".boton-habilidad.activo");
                const panel = grupo.querySelector(".panel-detalle");
                if (btnActivo && panel && !panel.hidden) {
                    btnActivo.classList.remove("activo");
                    btnActivo.setAttribute("aria-expanded", "false");
                    panel.hidden = true;
                    panel.innerHTML = "";
                    btnActivo.focus();
                }
            });

            // Cerrar panel de competencia abierto
            const btnCompActivo = document.querySelector(".boton-competencia.activo");
            const panelComp = document.getElementById("panel-competencia-detalle");
            if (btnCompActivo && panelComp && !panelComp.hidden) {
                btnCompActivo.classList.remove("activo");
                btnCompActivo.setAttribute("aria-expanded", "false");
                panelComp.hidden = true;
                panelComp.innerHTML = "";
                btnCompActivo.focus();
            }
        }
    });

    // Fallback: Soporte para elementos estáticos si existieran (ej. renderizado server-side)
    const itemsEstaticos = document.querySelectorAll(".habilidad-item");
    itemsEstaticos.forEach((item) => {
        item.addEventListener("click", () => {
            const estaActivo = item.classList.contains("activo");
            itemsEstaticos.forEach((i) => {
                i.classList.remove("activo");
                i.setAttribute("aria-expanded", "false");
            });
            if (!estaActivo) {
                item.classList.add("activo");
                item.setAttribute("aria-expanded", "true");
            }
        });
    });

    // =============================================================
    // 5. Selector de Tema Claro / Oscuro / Neón Arcoíris
    // =============================================================
    const botonTema = document.getElementById("boton-tema");
    const claveAlmacenamiento = "ph_tema_preferido";

    function obtenerTemaInicial() {
        const temaGuardado = localStorage.getItem(claveAlmacenamiento);
        if (temaGuardado === "dark" || temaGuardado === "light" || temaGuardado === "neon") {
            return temaGuardado;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function aplicarTema(tema) {
        if (tema === "neon") {
            document.documentElement.setAttribute("data-theme", "neon");
            if (botonTema) {
                botonTema.setAttribute("aria-label", "Cambiar a tema claro");
                botonTema.setAttribute("aria-pressed", "true");
            }
        } else if (tema === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            if (botonTema) {
                botonTema.setAttribute("aria-label", "Cambiar a modo neón arcoíris");
                botonTema.setAttribute("aria-pressed", "true");
            }
        } else {
            document.documentElement.removeAttribute("data-theme");
            if (botonTema) {
                botonTema.setAttribute("aria-label", "Cambiar a tema oscuro");
                botonTema.setAttribute("aria-pressed", "false");
            }
        }
    }

    let temaActual = obtenerTemaInicial();
    aplicarTema(temaActual);

    if (botonTema) {
        botonTema.addEventListener("click", () => {
            if (temaActual === "light") {
                temaActual = "dark";
            } else if (temaActual === "dark") {
                temaActual = "neon";
            } else {
                temaActual = "light";
            }
            aplicarTema(temaActual);
            try {
                localStorage.setItem(claveAlmacenamiento, temaActual);
            } catch (e) {
                // Almacenamiento restringido o modo incógnito
            }
        });
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem(claveAlmacenamiento)) {
            temaActual = e.matches ? "dark" : "light";
            aplicarTema(temaActual);
        }
    });

    // =============================================================
    // 6. Revelado con IntersectionObserver, Spotlight y ScrollSpy
    // =============================================================
    const navSubrayado = document.querySelector(".nav-subrayado");
    const navLinks = document.querySelectorAll(".nav-enlace");
    const secciones = document.querySelectorAll("main > section");

    function actualizarSubrayadoMenu(enlaceActivo) {
        if (!navSubrayado || !enlaceActivo) return;
        const navLista = enlaceActivo.closest(".nav-lista");
        if (!navLista) return;

        const rect = enlaceActivo.getBoundingClientRect();
        const parentRect = navLista.getBoundingClientRect();

        navSubrayado.style.transform = `translateX(${rect.left - parentRect.left}px)`;
        navSubrayado.style.width = `${rect.width}px`;
        navSubrayado.style.opacity = "1";
    }

    window.addEventListener("resize", () => {
        const enlaceActivo = document.querySelector(".nav-enlace.activo");
        if (enlaceActivo) actualizarSubrayadoMenu(enlaceActivo);
    }, { passive: true });

    // Efecto de brillo (Spotlight) suave que sigue al cursor en tarjetas SOLO en dispositivos con ratón
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        document.querySelectorAll(".tarjeta, .tarjeta-proyecto, .tarjeta-competencia, .tarjeta-certificacion, .grupo-tarjeta, .boton-competencia, .panel-detalle").forEach((tarjeta) => {
            tarjeta.addEventListener("mousemove", (e) => {
                const rect = tarjeta.getBoundingClientRect();
                tarjeta.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                tarjeta.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
            }, { passive: true });
        });
    }

    if (prefersReducedMotion) {
        activarModoSinAnimaciones();
    } else if ("IntersectionObserver" in window) {
        // Revelado suave de cada sección
        const observadorSecciones = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        document.querySelectorAll(".seccion-revelar").forEach((seccion) => {
            observadorSecciones.observe(seccion);
        });

        // Revelado escalonado de tarjetas
        const observadorTarjetas = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("aparecido");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -20px 0px",
            }
        );

        document.querySelectorAll(".tarjeta, .tarjeta-proyecto, .tarjeta-competencia, .tarjeta-certificacion, .grupo-tarjeta, .boton-competencia").forEach((tarjeta, index) => {
            tarjeta.style.transitionDelay = `${(index % 4) * 60}ms`;
            observadorTarjetas.observe(tarjeta);
        });

        // Llenado de segmentos de habilidades al entrar en pantalla por primera vez
        const seccionHabilidades = document.getElementById("habilidades");
        if (seccionHabilidades) {
            const observadorHabilidades = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            seccionHabilidades.classList.add("animado");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.15,
                }
            );
            observadorHabilidades.observe(seccionHabilidades);
        }
    } else {
        // Fallback para navegadores antiguos
        activarModoSinAnimaciones();
    }

    // ScrollSpy accesible para el menú de navegación con actualización de subrayado
    if ("IntersectionObserver" in window && navLinks.length > 0) {
        const observadorSpy = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("id");
                        navLinks.forEach((link) => {
                            const coincide = link.getAttribute("href") === `#${id}`;
                            if (coincide) {
                                link.classList.add("activo");
                                link.setAttribute("aria-current", "page");
                                actualizarSubrayadoMenu(link);
                            } else {
                                link.classList.remove("activo");
                                link.removeAttribute("aria-current");
                            }
                        });
                    }
                });
            },
            {
                rootMargin: "-20% 0px -65% 0px",
            }
        );

        secciones.forEach((seccion) => observadorSpy.observe(seccion));

        // Inicializar posición de subrayado para el enlace activo inicial
        const enlaceInicial = document.querySelector(".nav-enlace.activo") || navLinks[0];
        if (enlaceInicial) {
            setTimeout(() => actualizarSubrayadoMenu(enlaceInicial), 100);
        }
    }

    // =============================================================
    // 7. Puntero del Ratón Interactivo y Dinámico (Custom Cursor)
    // =============================================================
    const cursorPunto = document.getElementById("cursor-punto");
    const cursorAnillo = document.getElementById("cursor-anillo");
    if (cursorPunto && cursorAnillo && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;
        let visible = false;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!visible) {
                visible = true;
                cursorPunto.style.opacity = "1";
                cursorAnillo.style.opacity = "1";
            }
            cursorPunto.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        }, { passive: true });

        // Animación suave del anillo con interpolación fluida
        function animarCursor() {
            if (visible) {
                ringX += (mouseX - ringX) * 0.22;
                ringY += (mouseY - ringY) * 0.22;
                cursorAnillo.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            }
            requestAnimationFrame(animarCursor);
        }
        requestAnimationFrame(animarCursor);

        // Expansión interactiva en elementos cliqueables
        const selectoresInteractivos = "a, button, [role='button'], input, textarea, .tarjeta-proyecto, .boton-habilidad, .boton-competencia, .logo, .avatar-envoltorio, .habilidad-item, .tarjeta-didactica";
        document.addEventListener("mouseover", (e) => {
            if (e.target.closest(selectoresInteractivos)) {
                cursorAnillo.classList.add("cursor-hover");
            }
        }, { passive: true });

        document.addEventListener("mouseout", (e) => {
            if (e.target.closest(selectoresInteractivos)) {
                cursorAnillo.classList.remove("cursor-hover");
            }
        }, { passive: true });

        window.addEventListener("mousedown", () => {
            cursorAnillo.classList.add("cursor-click");
        }, { passive: true });

        window.addEventListener("mouseup", () => {
            cursorAnillo.classList.remove("cursor-click");
        }, { passive: true });

        document.addEventListener("mouseleave", () => {
            cursorPunto.style.opacity = "0";
            cursorAnillo.style.opacity = "0";
            visible = false;
        });
    }

    // =============================================================
    // 8. Logo Dinámico y Easter Egg: Modo Neón Arcoíris
    // =============================================================
    const elementosLogo = document.querySelectorAll(".logo, .avatar-envoltorio");
    let clicksLogo = 0;
    let timerLogo = null;

    elementosLogo.forEach((el) => {
        el.addEventListener("click", () => {
            clicksLogo++;
            clearTimeout(timerLogo);

            // Retroalimentación de pulso animado
            el.classList.add("logo-pulsando");
            setTimeout(() => el.classList.remove("logo-pulsando"), 400);

            if (clicksLogo >= 3) {
                activarEasterEggLogo();
                clicksLogo = 0;
            } else {
                timerLogo = setTimeout(() => {
                    clicksLogo = 0;
                }, 1200);
            }
        });
    });

    function activarEasterEggLogo() {
        const avatar = document.querySelector(".avatar-envoltorio");
        if (avatar) {
            avatar.classList.add("avatar-giro-especial");
            setTimeout(() => avatar.classList.remove("avatar-giro-especial"), 1000);
        }

        // Alternar a modo neón arcoíris
        if (temaActual !== "neon") {
            temaActual = "neon";
        } else {
            temaActual = "dark";
        }
        aplicarTema(temaActual);
        try {
            localStorage.setItem(claveAlmacenamiento, temaActual);
        } catch (e) {
            // Almacenamiento restringido o modo incógnito
        }

        let toast = document.getElementById("toast-easter-egg");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast-easter-egg";
            toast.className = "toast-easter-egg";
            toast.setAttribute("role", "status");
            toast.setAttribute("aria-live", "polite");
            document.body.appendChild(toast);
        }

        const esNeon = temaActual === "neon";
        toast.innerHTML = `
            <div class="toast-contenido">
                <span class="toast-insignia">${esNeon ? "Modo Neón" : "Tema Estándar"}</span>
                <strong>Pedro Pablo Huacanjulca</strong>
                <span>${esNeon ? "Estilo neón arcoíris activado · Haz 3 clics en el logo para alternar" : "Modo estándar restaurado · Haz 3 clics en el logo para alternar"}</span>
            </div>
        `;
        toast.classList.add("visible");

        setTimeout(() => {
            toast.classList.remove("visible");
        }, 3600);
    }
});
