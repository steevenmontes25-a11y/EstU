import { build, type QDraft } from './helpers'

const drafts: QDraft[] = [
  {
    id: 'emp-001',
    topic: 'Emprendimiento',
    difficulty: 'facil',
    prompt: 'Un emprendedor se caracteriza principalmente por:',
    options: [
      'Evitar cualquier tipo de riesgo',
      'Identificar oportunidades y asumir riesgos para llevarlas a cabo',
      'Trabajar siempre bajo dependencia de un patrono',
      'Heredar un negocio ya constituido',
    ],
    answer: 1,
    explanation:
      'El emprendimiento combina la detección de una oportunidad con la disposición a asumir un riesgo calculado y la capacidad de organizar recursos.',
  },
  {
    id: 'emp-002',
    topic: 'Emprendimiento',
    difficulty: 'medio',
    prompt: 'La diferencia entre una idea de negocio y una oportunidad de negocio es que la oportunidad:',
    options: [
      'Siempre requiere mucho dinero',
      'Responde a una necesidad real del mercado y es viable',
      'Solo existe en empresas grandes',
      'No necesita ser evaluada',
    ],
    answer: 1,
    explanation:
      'Una idea se vuelve oportunidad cuando existe un mercado dispuesto a pagar por ella y el emprendedor puede ejecutarla con los recursos disponibles.',
  },
  {
    id: 'emp-003',
    topic: 'Emprendimiento',
    difficulty: 'medio',
    prompt: 'En el análisis FODA, las fortalezas y las debilidades corresponden a factores:',
    options: ['Externos a la empresa', 'Internos de la empresa', 'Exclusivamente financieros', 'Del gobierno'],
    answer: 1,
    explanation:
      'Fortalezas y debilidades son internas y controlables. Oportunidades y amenazas provienen del entorno y la empresa solo puede anticiparlas.',
  },
  {
    id: 'emp-004',
    topic: 'Modelo de negocio',
    difficulty: 'medio',
    prompt: 'En el modelo Canvas, la propuesta de valor responde a la pregunta:',
    options: [
      '¿Cuánto cuesta producir?',
      '¿Qué problema del cliente resolvemos y por qué nos elegiría?',
      '¿Quiénes son nuestros proveedores?',
      '¿Cuántos empleados necesitamos?',
    ],
    answer: 1,
    explanation:
      'La propuesta de valor es el corazón del modelo Canvas: explica el beneficio concreto que el cliente obtiene y qué nos diferencia de la competencia.',
  },
  {
    id: 'emp-005',
    topic: 'Modelo de negocio',
    difficulty: 'medio',
    prompt: 'El documento que describe el negocio, su mercado, su operación y sus proyecciones financieras se llama:',
    options: ['Plan de negocios', 'Balance general', 'Factura comercial', 'Rol de pagos'],
    answer: 0,
    explanation:
      'El plan de negocios organiza la información necesaria para evaluar la viabilidad del proyecto y suele exigirse al buscar financiamiento.',
  },
  {
    id: 'emp-006',
    topic: 'Modelo de negocio',
    difficulty: 'dificil',
    prompt: 'Segmentar el mercado significa:',
    options: [
      'Vender el producto a cualquier persona',
      'Dividir el mercado en grupos con características y necesidades similares',
      'Reducir el precio del producto a la mitad',
      'Eliminar a la competencia',
    ],
    answer: 1,
    explanation:
      'La segmentación permite enfocar el producto y la comunicación en un grupo concreto, lo que hace más eficiente el uso de los recursos de marketing.',
  },
  {
    id: 'emp-007',
    topic: 'Oferta y demanda',
    difficulty: 'facil',
    prompt: 'Según la ley de la demanda, si el precio de un bien aumenta y todo lo demás permanece constante, la cantidad demandada:',
    options: ['Aumenta', 'Disminuye', 'No cambia', 'Se duplica'],
    answer: 1,
    explanation:
      'Existe una relación inversa entre precio y cantidad demandada. Por eso la curva de demanda tiene pendiente negativa.',
  },
  {
    id: 'emp-008',
    topic: 'Oferta y demanda',
    difficulty: 'facil',
    prompt: 'La ley de la oferta establece que, a mayor precio de un bien, los productores están dispuestos a ofrecer:',
    options: ['Menor cantidad', 'Mayor cantidad', 'La misma cantidad', 'Nada'],
    answer: 1,
    explanation:
      'Un precio más alto vuelve más rentable producir, así que la relación entre precio y cantidad ofrecida es directa.',
  },
  {
    id: 'emp-009',
    topic: 'Oferta y demanda',
    difficulty: 'medio',
    prompt: 'El punto donde la curva de oferta y la de demanda se cruzan determina:',
    options: [
      'El precio de equilibrio del mercado',
      'El costo fijo de la empresa',
      'La utilidad neta',
      'El monto del impuesto',
    ],
    answer: 0,
    explanation:
      'En el equilibrio, la cantidad que los compradores desean adquirir coincide con la que los vendedores desean ofrecer, y no hay escasez ni excedente.',
  },
  {
    id: 'emp-010',
    topic: 'Oferta y demanda',
    difficulty: 'dificil',
    prompt: 'Si en el mercado de leche cruda el precio se fija por debajo del precio de equilibrio, lo esperable es que se produzca:',
    options: ['Un excedente', 'Escasez', 'Un aumento de la oferta', 'Un equilibrio inmediato'],
    answer: 1,
    explanation:
      'Con un precio bajo la cantidad demandada supera a la ofrecida, y aparece escasez. Un precio por encima del equilibrio genera el efecto contrario: excedente.',
  },
  {
    id: 'emp-011',
    topic: 'Costos',
    difficulty: 'facil',
    prompt: 'El arriendo mensual del local de una empresa es un ejemplo de costo:',
    options: ['Variable', 'Fijo', 'Marginal', 'De oportunidad'],
    answer: 1,
    explanation:
      'Los costos fijos no cambian con el nivel de producción. Los variables, como la materia prima, sí aumentan al producir más.',
  },
  {
    id: 'emp-012',
    topic: 'Costos',
    difficulty: 'medio',
    prompt: 'En una granja avícola, el balanceado que se consume por cada pollo producido es un costo:',
    options: ['Fijo', 'Variable', 'Financiero', 'Hundido'],
    answer: 1,
    explanation:
      'El gasto en balanceado crece en proporción directa con la cantidad de animales, así que es un costo variable.',
  },
  {
    id: 'emp-013',
    topic: 'Costos',
    difficulty: 'medio',
    prompt: 'El punto de equilibrio de un negocio es el nivel de ventas en el cual:',
    options: [
      'La utilidad es máxima',
      'Los ingresos totales igualan a los costos totales',
      'Los costos fijos son cero',
      'No se vende nada',
    ],
    answer: 1,
    explanation:
      'En el punto de equilibrio no hay ni ganancia ni pérdida. A partir de esa cantidad vendida, el negocio empieza a generar utilidad.',
  },
  {
    id: 'emp-014',
    topic: 'Costos',
    difficulty: 'dificil',
    prompt: 'Una empresa tiene costos fijos de 1000 dólares, vende cada unidad a 10 dólares y su costo variable unitario es de 6 dólares. Su punto de equilibrio es:',
    options: ['100 unidades', '167 unidades', '250 unidades', '1000 unidades'],
    answer: 2,
    explanation:
      'El margen de contribución es 10 − 6 = 4. Entonces el punto de equilibrio es 1000 ÷ 4 = 250 unidades.',
  },
  {
    id: 'emp-015',
    topic: 'Costos',
    difficulty: 'medio',
    prompt: 'Si una empresa tuvo ingresos por 5000 dólares y costos totales por 3200 dólares, su utilidad fue de:',
    options: ['1800 dólares', '2200 dólares', '8200 dólares', '3200 dólares'],
    answer: 0,
    explanation: 'La utilidad es la diferencia entre ingresos y costos: 5000 − 3200 = 1800 dólares.',
  },
  {
    id: 'emp-016',
    topic: 'Contabilidad',
    difficulty: 'medio',
    prompt: 'La ecuación contable fundamental es:',
    options: [
      'Activo = Pasivo + Patrimonio',
      'Activo = Ingresos − Gastos',
      'Pasivo = Activo + Patrimonio',
      'Patrimonio = Activo + Pasivo',
    ],
    answer: 0,
    explanation:
      'Todo lo que la empresa posee (activo) se financia con deudas (pasivo) o con aportes de los dueños y utilidades retenidas (patrimonio).',
  },
  {
    id: 'emp-017',
    topic: 'Contabilidad',
    difficulty: 'medio',
    prompt: 'Una deuda con un proveedor se registra contablemente como:',
    options: ['Activo', 'Pasivo', 'Patrimonio', 'Ingreso'],
    answer: 1,
    explanation:
      'Los pasivos son obligaciones presentes con terceros. Los activos, en cambio, son los bienes y derechos que la empresa posee.',
  },
  {
    id: 'emp-018',
    topic: 'Contabilidad',
    difficulty: 'dificil',
    prompt: 'El estado financiero que muestra la situación de la empresa en una fecha determinada, con sus activos, pasivos y patrimonio, es:',
    options: [
      'El estado de resultados',
      'El balance general o estado de situación financiera',
      'El flujo de caja proyectado',
      'El libro diario',
    ],
    answer: 1,
    explanation:
      'El balance es una fotografía en una fecha concreta. El estado de resultados, en cambio, cubre un período e informa sobre ingresos, gastos y utilidad.',
  },
  {
    id: 'emp-019',
    topic: 'Contabilidad',
    difficulty: 'medio',
    prompt: 'El flujo de caja de un negocio sirve para:',
    options: [
      'Conocer las entradas y salidas de dinero en un período',
      'Calcular el número de empleados necesarios',
      'Registrar únicamente las ventas a crédito',
      'Determinar el color del logotipo',
    ],
    answer: 0,
    explanation:
      'Un negocio puede ser rentable en el papel y aun así quebrar por falta de liquidez. Por eso el flujo de caja es una herramienta central de gestión.',
  },
  {
    id: 'emp-020',
    topic: 'Marketing',
    difficulty: 'medio',
    prompt: 'Las cuatro P del marketing mix son:',
    options: [
      'Producto, precio, plaza y promoción',
      'Producto, personal, proceso y publicidad',
      'Precio, proveedor, plaza y patrimonio',
      'Planificación, producción, personal y precio',
    ],
    answer: 0,
    explanation:
      'Es el modelo clásico de McCarthy. En servicios suele ampliarse a siete P, agregando personas, procesos y evidencia física.',
  },
  {
    id: 'emp-021',
    topic: 'Marketing',
    difficulty: 'medio',
    prompt: 'La "plaza" dentro del marketing mix se refiere a:',
    options: [
      'El precio de venta al público',
      'Los canales de distribución por los que el producto llega al cliente',
      'El nombre comercial',
      'La publicidad en redes sociales',
    ],
    answer: 1,
    explanation:
      'La plaza incluye la logística, los puntos de venta y los intermediarios: todo lo que hace que el producto esté disponible donde el cliente lo necesita.',
  },
  {
    id: 'emp-022',
    topic: 'Marketing',
    difficulty: 'facil',
    prompt: 'El público objetivo o target de un emprendimiento es:',
    options: [
      'Toda la población del país',
      'El grupo específico de consumidores al que se dirige el producto',
      'El conjunto de proveedores',
      'La competencia directa',
    ],
    answer: 1,
    explanation:
      'Definir con precisión el público objetivo permite ajustar el producto, el precio y la comunicación a quienes realmente van a comprar.',
  },
  {
    id: 'emp-023',
    topic: 'Economía',
    difficulty: 'facil',
    prompt: 'La inflación se define como:',
    options: [
      'El aumento generalizado y sostenido de los precios',
      'La caída del empleo',
      'El aumento de las exportaciones',
      'La disminución de la producción agrícola',
    ],
    answer: 0,
    explanation:
      'Cuando los precios suben de forma generalizada, cada unidad monetaria compra menos: es la pérdida del poder adquisitivo del dinero.',
  },
  {
    id: 'emp-024',
    topic: 'Economía',
    difficulty: 'medio',
    prompt: 'El Producto Interno Bruto (PIB) mide:',
    options: [
      'La cantidad de dinero circulante',
      'El valor de los bienes y servicios finales producidos en un país durante un período',
      'El total de impuestos recaudados',
      'El número de habitantes de un país',
    ],
    answer: 1,
    explanation:
      'El PIB es el principal indicador de la actividad económica de un país. Se contabilizan solo los bienes finales, para no duplicar valor.',
  },
  {
    id: 'emp-025',
    topic: 'Economía',
    difficulty: 'medio',
    prompt: 'El problema económico fundamental que enfrentan todas las sociedades es:',
    options: [
      'La escasez de recursos frente a necesidades ilimitadas',
      'El exceso de dinero en circulación',
      'La falta de tecnología',
      'La sobreproducción permanente',
    ],
    answer: 0,
    explanation:
      'Como los recursos son limitados y las necesidades no, toda sociedad debe decidir qué producir, cómo producirlo y para quién.',
  },
  {
    id: 'emp-026',
    topic: 'Economía',
    difficulty: 'dificil',
    prompt: 'El costo de oportunidad de una decisión es:',
    options: [
      'El dinero efectivamente gastado',
      'El valor de la mejor alternativa a la que se renuncia',
      'El impuesto que se paga por la operación',
      'La utilidad obtenida al final del ejercicio',
    ],
    answer: 1,
    explanation:
      'Si un terreno se usa para pastoreo en lugar de sembrar maíz, el costo de oportunidad es la ganancia que el maíz habría generado.',
  },
  {
    id: 'emp-027',
    topic: 'Economía',
    difficulty: 'medio',
    prompt: 'Los factores clásicos de la producción son:',
    options: [
      'Tierra, trabajo y capital',
      'Oferta, demanda y precio',
      'Activo, pasivo y patrimonio',
      'Producto, precio y plaza',
    ],
    answer: 0,
    explanation:
      'A los tres factores clásicos la teoría moderna suele añadir la tecnología y la capacidad empresarial u organización.',
  },
  {
    id: 'emp-028',
    topic: 'Gestión',
    difficulty: 'medio',
    prompt: 'La productividad de una empresa se define como la relación entre:',
    options: [
      'Las ventas y la publicidad',
      'La producción obtenida y los recursos empleados',
      'Los activos y los pasivos',
      'El precio y la calidad',
    ],
    answer: 1,
    explanation:
      'Ser más productivo significa obtener más resultado con los mismos recursos, o el mismo resultado usando menos. En ganadería se mide, por ejemplo, en litros de leche por vaca.',
  },
  {
    id: 'emp-029',
    topic: 'Gestión',
    difficulty: 'medio',
    prompt: 'Las funciones básicas del proceso administrativo son:',
    options: [
      'Planificar, organizar, dirigir y controlar',
      'Comprar, vender, cobrar y pagar',
      'Producir, almacenar y distribuir',
      'Contratar, capacitar y despedir',
    ],
    answer: 0,
    explanation:
      'Es el ciclo administrativo clásico. El control cierra el proceso al comparar los resultados obtenidos con lo planificado.',
  },
  {
    id: 'emp-030',
    topic: 'Tributación',
    difficulty: 'medio',
    prompt: 'En Ecuador, el organismo encargado de la administración tributaria es:',
    options: ['El SRI', 'El IESS', 'La Superintendencia de Bancos', 'El Banco Central'],
    answer: 0,
    explanation:
      'El Servicio de Rentas Internas administra los impuestos nacionales. El IESS gestiona la seguridad social, que es otra obligación distinta.',
  },
  {
    id: 'emp-031',
    topic: 'Tributación',
    difficulty: 'medio',
    prompt: 'El Registro Único de Contribuyentes (RUC) sirve para:',
    options: [
      'Identificar a quienes realizan actividades económicas ante la administración tributaria',
      'Registrar la propiedad de un terreno',
      'Obtener la licencia de conducir',
      'Afiliarse a la seguridad social',
    ],
    answer: 0,
    explanation:
      'Toda persona natural o sociedad que desarrolla una actividad económica debe inscribirse en el RUC y emitir comprobantes de venta autorizados.',
  },
  {
    id: 'emp-032',
    topic: 'Tributación',
    difficulty: 'dificil',
    prompt: 'El Impuesto al Valor Agregado (IVA) es un impuesto:',
    options: [
      'Directo, porque grava la renta de las personas',
      'Indirecto, porque grava el consumo de bienes y servicios',
      'Municipal, porque lo cobran los cabildos',
      'Voluntario, porque depende del contribuyente',
    ],
    answer: 1,
    explanation:
      'El IVA se traslada al consumidor final en el precio, por eso es indirecto. El impuesto a la renta, en cambio, es directo y grava los ingresos del contribuyente.',
  },
]

export const emprendimiento = build('emprendimiento', drafts)
