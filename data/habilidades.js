/**
 * Archivo de Datos: Habilidades Técnicas y Competencias Personales
 * Portafolio - Pedro Pablo Huacanjulca Rodríguez
 * 
 * Reglas de datos:
 * - Redactado en primera persona, con frases cortas y claras
 * - Sin frameworks ni dependencias externas
 * - Totalmente compatible con ejecución local (file:///) y GitHub Pages
 * - Sin puntos finales en las oraciones para dinamismo visual
 */

// 1. Constante HABILIDADES: Array plano de objetos
const HABILIDADES = [
    // --- Lenguajes ---
    {
        id: "python",
        nombre: "Python",
        categoria: "lenguajes",
        nivel: 2,
        nivelTexto: "Intermedio",
        aclaracion: "",
        dondeLaUse: "Kardex del albergue infantil (Tkinter, SQLite, lógica de inventario, PEPS/FEFO) y backend del Kardex Web (FastAPI)",
        quePuedoHacer: [
            "Crear aplicaciones de escritorio con interfaz gráfica en Tkinter",
            "Construir APIs REST para persistencia y consulta de datos con FastAPI",
            "Implementar lógica de negocio, reglas de inventario por lotes y validaciones robustas"
        ]
    },
    {
        id: "java",
        nombre: "Java",
        categoria: "lenguajes",
        nivel: 2,
        nivelTexto: "Intermedio",
        aclaracion: "",
        dondeLaUse: "Curso de Programación Orientada a Objetos en la universidad (Apache NetBeans)",
        quePuedoHacer: [
            "Programas de escritorio con programación orientada a objetos usando Apache NetBeans, como calculadoras; hice una versión sencilla que guardaba en una base de datos el registro de sus operaciones"
        ]
    },
    {
        id: "javascript",
        nombre: "JavaScript",
        categoria: "lenguajes",
        nivel: 2,
        nivelTexto: "Intermedio",
        aclaracion: "",
        dondeLaUse: "Este portafolio personal (DOM nativo, interactividad sin dependencias) y frontend del Kardex Web con React",
        quePuedoHacer: [
            "Dar interactividad a páginas web, como este portafolio, y construir el frontend del Kardex Web con React"
        ]
    },
    {
        id: "c-cpp",
        nombre: "C / C++",
        categoria: "lenguajes",
        nivel: 2,
        nivelTexto: "Intermedio",
        aclaracion: "",
        dondeLaUse: "Cursos de programación de la universidad; ejemplo: una calculadora hecha solo con el lenguaje, sin bibliotecas externas, en el IDE Dev-C++ de Embarcadero",
        quePuedoHacer: [
            "Estructurar datos con punteros y matrices, hacer búsquedas secuenciales y binarias, y aplicar funciones hash para transformar mensajes"
        ]
    },
    {
        id: "csharp",
        nombre: "C#",
        categoria: "lenguajes",
        nivel: 1,
        nivelTexto: "Básico",
        aclaracion: "",
        dondeLaUse: "Aprendido en plataformas externas; me adapté rápido por su parecido con C++; lo usé en Unity para juegos 2D, 2.5D y 3D (proyectos personales) y recientemente en mis primeros pasos con apps móviles",
        quePuedoHacer: [
            "Programar lógica básica de juegos en Unity y dar los primeros pasos en apps móviles; mi nivel es básico"
        ]
    },
    {
        id: "html",
        nombre: "HTML",
        categoria: "lenguajes",
        nivel: 2,
        nivelTexto: "Intermedio",
        aclaracion: "",
        dondeLaUse: "Este portafolio personal y proyectos web",
        quePuedoHacer: [
            "Estructurar páginas con marcado semántico y accesible (WCAG 2.1 AA)",
            "Crear formularios validados y arquitecturas de información legibles para lectores de pantalla"
        ]
    },
    {
        id: "css",
        nombre: "CSS",
        categoria: "lenguajes",
        nivel: 2,
        nivelTexto: "Intermedio",
        aclaracion: "",
        dondeLaUse: "Este portafolio personal y diseño de interfaces web responsivas",
        quePuedoHacer: [
            "Maquetar interfaces responsivas con CSS Grid y Flexbox sin frameworks",
            "Diseñar temas claro/oscuro con variables CSS y animaciones fluidas aceleradas por hardware"
        ]
    },
    {
        id: "r",
        nombre: "R",
        categoria: "lenguajes",
        nivel: 1,
        nivelTexto: "Básico",
        aclaracion: "(en aprendizaje)",
        enAprendizaje: true,
        dondeLaUse: "Caso práctico de análisis de inventario: limpieza de datos, cálculo de saldos (kardex) y gráficos",
        quePuedoHacer: [
            "Importar y estructurar datos, limpiarlos, calcular métricas y crear visualizaciones exploratorias; sigo profundizando en análisis estadístico"
        ],
        nota: "Enlace al caso en GitHub: [CONFIRMAR cuando esté publicado]"
    },

    // --- Web y bases de datos ---
    {
        id: "sql-server",
        nombre: "SQL (SQL Server)",
        categoria: "web_bd",
        nivel: 2,
        nivelTexto: "Intermedio",
        aclaracion: "",
        dondeLaUse: "Cursos SQL – Base de Datos 1 y 2 en el CTIC-UNI (certificados básico e intermedio, 36 horas lectivas en total)",
        quePuedoHacer: [
            "Consultas avanzadas con JOINs, agrupaciones, subconsultas y CTEs",
            "Diseño de esquemas relacionales, normalización, índices y restricciones de integridad",
            "Creación de vistas, procedimientos almacenados, transacciones y triggers"
        ]
    },
    {
        id: "sqlite",
        nombre: "SQLite",
        categoria: "web_bd",
        nivel: 2,
        nivelTexto: "Intermedio",
        aclaracion: "",
        dondeLaUse: "Kardex del albergue infantil (almacenamiento local de inventario, movimientos y auditoría)",
        quePuedoHacer: [
            "Crear bases de datos locales simples y hacer consultas; la uso en el Kardex de escritorio"
        ]
    },
    {
        id: "postgresql",
        nombre: "PostgreSQL",
        categoria: "web_bd",
        nivel: 1,
        nivelTexto: "Básico",
        aclaracion: "",
        dondeLaUse: "Base de datos del Kardex Web, alojada en Neon",
        quePuedoHacer: [
            "Conectar una API a una base de datos relacional con tablas de productos, movimientos y usuarios"
        ],
        nota: "Aprendí que PostgreSQL es más pesado que SQLite: sirve cuando hay varios usuarios y más datos, pero para un proyecto pequeño local conviene una base ligera"
    },
    {
        id: "mysql",
        nombre: "MySQL",
        categoria: "web_bd",
        nivel: 1,
        nivelTexto: "Básico",
        aclaracion: "",
        dondeLaUse: "Cursos de la universidad, incluido uno donde trabajamos con operaciones CRUD (crear, leer, actualizar y borrar datos), y en desarrollo web",
        quePuedoHacer: [
            "Crear y consultar bases de datos relacionales de tamaño medio y hacer operaciones CRUD"
        ]
    },
    {
        id: "fastapi",
        nombre: "FastAPI",
        categoria: "web_bd",
        nivel: 1,
        nivelTexto: "Básico",
        aclaracion: "",
        dondeLaUse: "Backend del Kardex Web (endpoints REST, schemas Pydantic, autenticación JWT)",
        quePuedoHacer: [
            "Crear APIs REST en Python: rutas, validación de datos con Pydantic y autenticación con JWT; es la capa que conecta el frontend (React) con la base de datos en el Kardex Web"
        ]
    },
    {
        id: "react",
        nombre: "React",
        categoria: "web_bd",
        nivel: 1,
        nivelTexto: "Básico",
        aclaracion: "",
        dondeLaUse: "Frontend del Kardex Web (componentes funcionales, React Router)",
        quePuedoHacer: [
            "Construir interfaces con componentes, manejar estado y rutas, y actualizar solo las partes de la pantalla que cambian, sin recargar la página; en el Kardex Web: inicio de sesión, panel de administración y dashboard con gráficos"
        ]
    },

    // --- Datos ---
    {
        id: "pandas-numpy",
        nombre: "Pandas y NumPy",
        categoria: "datos",
        nivel: 1,
        nivelTexto: "Básico",
        aclaracion: "",
        dondeLaUse: "Trabajos de análisis de datos en cursos de la universidad",
        quePuedoHacer: [
            "Cargar, limpiar y resumir datos en tablas con Pandas, hacer cálculos con NumPy y explicar los resultados con gráficos (Matplotlib)"
        ]
    },
    {
        id: "excel",
        nombre: "Microsoft Excel",
        categoria: "datos",
        nivel: 2,
        nivelTexto: "Intermedio",
        aclaracion: "",
        dondeLaUse: "Funciones básicas (promedios, sumas y similares), gráficos de líneas y diagramas de Pareto; estoy aprendiendo macros",
        quePuedoHacer: [
            "Hacer gráficos, usar las funciones más comunes y aplicar el método Simplex en una hoja de cálculo"
        ]
    },

    // --- Herramientas ---
    {
        id: "git-github",
        nombre: "Git y GitHub",
        categoria: "herramientas",
        nivel: 2,
        nivelTexto: "Intermedio",
        aclaracion: "",
        dondeLaUse: "Control de versiones de mis proyectos individuales y en equipo",
        quePuedoHacer: [
            "Flujo de trabajo con ramas, commits estructurados, fusiones y resolución de conflictos",
            "Publicación de repositorios, documentación README detallada y despliegue en GitHub Pages"
        ]
    },
    {
        id: "linux",
        nombre: "Linux",
        categoria: "herramientas",
        nivel: 1,
        nivelTexto: "Básico",
        aclaracion: "",
        dondeLaUse: "Entorno de desarrollo básico (aprendido de forma autónoma con libros y videos)",
        quePuedoHacer: [
            "Instalar un sistema operativo sencillo, usar comandos básicos (crear y ver archivos, actualizar el sistema, revisar el uso de la memoria RAM) y escribir scripts simples para tareas"
        ]
    }
];

// 2. Constante COMPETENCIAS: Array de 5 objetos con evidencia, icono SVG y detalle en puntos
const COMPETENCIAS = [
    {
        id: "trabajo-en-equipo",
        nombre: "Trabajo en equipo",
        evidencia: "Desarrollé la parte de software de un sistema en un equipo de 6 personas",
        icono: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        detalle: [
            "Coordinación activa con 5 compañeros para el relevamiento de procesos y diseño funcional en la Casa Hogar Ciudad de los Niños de la Inmaculada",
            "Responsable exclusivo del desarrollo completo de la lógica de software, persistencia y control de accesos",
            "Integración de requerimientos acordados por el equipo multidisciplinario con validaciones técnicas"
        ]
    },
    {
        id: "resolucion-problemas",
        nombre: "Resolución de problemas",
        evidencia: "Adapté una base de software que no servía para el caso real",
        icono: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
        detalle: [
            "Diagnóstico de una base de código preexistente con limitaciones severas para las operaciones reales de la institución",
            "Rediseño integral de la estructura hacia SQLite e implementación de lógica de lotes con método PEPS/FEFO",
            "Incorporación de alertas preventivas de vencimiento y panel de auditoría para asegurar la fiabilidad de los saldos"
        ]
    },
    {
        id: "autoaprendizaje",
        nombre: "Autoaprendizaje",
        evidencia: "Certificados de SQL (CTIC-UNI) y estudio de R por cuenta propia",
        icono: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
        detalle: [
            "Aprobación de dos certificaciones extracurriculares en SQL Server (CTIC-UNI: Base de Datos 1 y 2, 36 horas acumuladas)",
            "Estudio independiente y autónomo del lenguaje R orientado a análisis y manipulación de datos",
            "Investigación autodidacta de estándares web, buenas prácticas de desarrollo y entornos Linux"
        ]
    },
    {
        id: "orden-documentacion",
        nombre: "Orden y documentación",
        evidencia: "Diagramas BPMN, análisis 5S y README de mis repositorios",
        icono: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
        detalle: [
            "Modelado formal de procesos operativos mediante diagramas BPMN (flujos actuales AS-IS y optimizados TO-BE)",
            "Aplicación de metodología 5S para diagnóstico situacional del almacén físico",
            "Documentación detallada en repositorios de GitHub con arquitectura, instrucciones de instalación y diagramas"
        ]
    },
    {
        id: "comunicacion-usuarios",
        nombre: "Comunicación con usuarios no técnicos",
        evidencia: "Entrevistas y presentación del proyecto a los directivos de un albergue",
        icono: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
        detalle: [
            "Entrevistas presenciales con las encargadas del albergue para transformar necesidades del día a día en requisitos de software",
            "Presentación formal y demostración en vivo del sistema ante la directiva de la Casa Hogar en términos claros y de valor operativo",
            "Diseño de interfaz orientado a usuarios sin formación técnica previa para garantizar una adopción fluida"
        ]
    }
];

// Metadatos de categorías para estructurar las secciones
const CATEGORIAS_HABILIDADES = [
    { id: "lenguajes", titulo: "Lenguajes" },
    { id: "web_bd", titulo: "Web y bases de datos" },
    { id: "datos", titulo: "Datos" },
    { id: "herramientas", titulo: "Herramientas" }
];

// Exposición en el objeto global window para ejecución local sin servidor (file:///)
window.HABILIDADES = HABILIDADES;
window.COMPETENCIAS = COMPETENCIAS;
window.CATEGORIAS_HABILIDADES = CATEGORIAS_HABILIDADES;
