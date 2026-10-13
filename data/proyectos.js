/**
 * Archivo de Datos: Proyectos
 * Portafolio - Pedro Pablo Huacanjulca Rodríguez
 * 
 * Reglas de datos:
 * - Sin frameworks ni dependencias externas
 * - Totalmente compatible con ejecución local (file:///) y GitHub Pages
 * - Proyectos clasificados en: ejecutados y personales
 * - Proyectos en fase de prueba / fase demo en construcción
 * - Sin puntos finales en las oraciones para dinamismo visual
 */

const PROYECTOS = [
    {
        id: "kardex-albergue",
        titulo: "Kardex para el almacén de un albergue infantil",
        categoria: "ejecutados",
        categoriaTexto: "Proyecto ejecutado",
        tipo: "Proyecto ejecutado · Equipo de 6",
        insignia: "Proyecto institucional",
        resumen: "Sistema de escritorio para el almacén de alimentos de la Casa Hogar \"Ciudad de los Niños de la Inmaculada\"",
        problema: "El registro del almacén era manual y empírico, el conocimiento estaba concentrado en el almacenero, los despachos a cocina se pedían de forma verbal y no había control de entradas, salidas, saldos ni fechas de vencimiento",
        solucion: "Un sistema Kardex que registra entradas, salidas, saldos y despachos internos, con lotes y método PEPS/FEFO, alertas de vencimiento y de stock mínimo y máximo, control de accesos, panel de administración y auditoría de movimientos",
        miRol: "Desarrollé la parte de software dentro de un equipo de 6 personas; además participé en el diagnóstico del proceso con observación, entrevistas, 5S y BPMN; partí de una base de software que no era funcional para el caso real y la adapté",
        tecnologias: ["Python", "Tkinter", "SQLite"],
        funcionalidades: [
            "Registro de entradas, salidas y saldos en tiempo real",
            "Despachos internos a cocina mediante notas de salida formales",
            "Gestión de lotes con métodos PEPS (FIFO) y FEFO",
            "Alertas automáticas de vencimiento y de stock mínimo y máximo",
            "Control de accesos por roles y panel de administración",
            "Auditoría completa de movimientos de inventario"
        ],
        arquitectura: "Aplicación por capas (interfaz en ui/, lógica y servicios en core/), con un enrutador de pantallas, un servicio que revisa vencimientos en segundo plano y una base de datos local; se eligió el enfoque sin conexión (offline-first) porque el almacén tiene poca o ninguna señal de internet",
        interfaz: [
            {
                titulo: "Vista principal del Kardex y saldos",
                descripcion: "Listado de productos con saldos actualizados y búsqueda rápida",
                archivo: "assets/img/kardex-albergue-principal.png"
            },
            {
                titulo: "Registro de movimientos y lotes (PEPS/FEFO)",
                descripcion: "Formulario de ingreso y salida con asignación de lote y fecha de caducidad",
                archivo: "assets/img/kardex-albergue-movimientos.png"
            },
            {
                titulo: "Alertas preventivas de vencimiento",
                descripcion: "Panel de control con advertencias de caducidad próxima e historial de auditoría",
                archivo: "assets/img/kardex-albergue-alertas.png"
            }
        ],
        estado: "En fase de prueba (fase demo) en la institución · En desarrollo",
        aprendizajes: "En construcción · Documentando aprendizajes durante la fase demo",
        enlaces: {
            repo: "https://github.com/phuacanjulcar/Kardex-Almacen-V3",
            demo: null
        }
    },
    {
        id: "kardex-web",
        titulo: "Kardex Web",
        categoria: "personales",
        categoriaTexto: "Proyecto personal",
        tipo: "Proyecto personal · Aplicación web full-stack",
        insignia: "Proyecto personal",
        resumen: "Versión web del Kardex, con inicio de sesión y gestión de inventario en línea",
        problema: "El sistema de escritorio funciona en un solo equipo y no se puede usar desde otros dispositivos",
        solucion: "Una aplicación web con API en Python y frontend separado",
        miRol: "Desarrollo del backend con FastAPI, modelo relacional en PostgreSQL y frontend interactivo con componentes en React",
        tecnologias: [
            "FastAPI",
            "Pydantic",
            "PostgreSQL (Neon)",
            "Autenticación JWT",
            "Slowapi",
            "ReportLab",
            "React 18",
            "Vite",
            "React Router",
            "Recharts",
            "Vercel"
        ],
        funcionalidades: [
            "Inicio de sesión seguro con JWT y limitación de intentos con Slowapi",
            "Panel de administración para gestión de usuarios, productos y auditoría",
            "Dashboard interactivo con métricas y gráficos de consumo con Recharts",
            "Generación y descarga de comprobantes y guías de remisión en PDF con ReportLab"
        ],
        arquitectura: "Backend modular (rutas, esquemas, lógica central) y frontend en componentes con una capa de servicios para las llamadas a la API",
        interfaz: [
            {
                titulo: "Dashboard y métricas de inventario",
                descripcion: "Vista principal con gráficos de stock, productos críticos y movimientos recientes",
                archivo: "assets/img/kardex-web-dashboard.png"
            },
            {
                titulo: "Panel de administración y control de accesos",
                descripcion: "Gestión de usuarios, permisos y bitácora de transacciones",
                archivo: "assets/img/kardex-web-admin.png"
            },
            {
                titulo: "Generación de comprobantes en PDF",
                descripcion: "Emisión y descarga de notas de remisión estructuradas",
                archivo: "assets/img/kardex-web-reportes.png"
            }
        ],
        estado: "Publicado en línea en fase demo · En desarrollo y mejora continua",
        aprendizajes: "En construcción · Documentando aprendizajes durante la fase demo",
        enlaces: {
            demo: "https://kardex-almacen-v3-web.vercel.app",
            repo: "https://github.com/phuacanjulcar/KARDEX-ALMACEN-V3-WEB"
        }
    }
    /*
    ,
    {
        id: "analisis-inventario-r",
        titulo: "Análisis de inventario en R",
        categoria: "personales",
        categoriaTexto: "Proyecto personal",
        tipo: "Caso práctico · Análisis de datos",
        insignia: "En aprendizaje",
        resumen: "Caso práctico de análisis de inventario: importación, limpieza de datos, cálculo de saldos y gráficos",
        problema: "Explorar patrones de rotación y saldos a partir de datasets de inventario",
        solucion: "Scripts reproducibles en R para limpieza de datos, kardex automatizado y visualizaciones exploratorias",
        miRol: "Desarrollo individual como parte de mi aprendizaje autónomo en análisis de datos",
        tecnologias: ["R", "RStudio"],
        funcionalidades: [
            "Importación y estructuración de datos de inventario",
            "Limpieza de datos y cálculo automatizado de saldos",
            "Visualización estadística de rotación de stock"
        ],
        arquitectura: "Flujo de scripts de procesamiento de datos en R (ingesta, transformación y visualización)",
        interfaz: [
            {
                titulo: "Visualización exploratoria de inventarios",
                descripcion: "Gráficos de dispersión y tendencias de consumo",
                archivo: "assets/img/analisis-inventario-r-graficos.png"
            }
        ],
        estado: "En desarrollo · Fase demo",
        aprendizajes: "En construcción · Documentando aprendizajes durante la fase demo",
        enlaces: {
            repo: "[CONFIRMAR cuando esté publicado]",
            demo: null
        }
    }
    */
];

// Categorías para organizar y filtrar proyectos
const CATEGORIAS_PROYECTOS = [
    { id: "ejecutados", titulo: "Proyectos ejecutados", descripcion: "Sistemas implementados y aplicados en instituciones con usuarios y procesos reales" },
    { id: "personales", titulo: "Proyectos personales", descripcion: "Desarrollos autónomos orientados a exploración tecnológica y aplicaciones web" }
];

// Exposición global para acceso directo sin necesidad de fetch
window.PROYECTOS = PROYECTOS;
window.CATEGORIAS_PROYECTOS = CATEGORIAS_PROYECTOS;
