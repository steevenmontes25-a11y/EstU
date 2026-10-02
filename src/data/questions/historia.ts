import { build, type QDraft } from './helpers'

const drafts: QDraft[] = [
  {
    id: 'his-001',
    topic: 'Civilizaciones antiguas',
    difficulty: 'facil',
    prompt: 'La civilización mesopotámica se desarrolló entre los ríos:',
    options: ['Nilo y Rojo', 'Tigris y Éufrates', 'Ganges e Indo', 'Danubio y Rin'],
    answer: 1,
    explanation:
      'Mesopotamia significa precisamente "tierra entre ríos". Allí surgieron sumerios, acadios, babilonios y asirios.',
  },
  {
    id: 'his-002',
    topic: 'Civilizaciones antiguas',
    difficulty: 'medio',
    prompt: 'El primer sistema de escritura conocido, desarrollado por los sumerios, se denomina:',
    options: ['Jeroglífica', 'Cuneiforme', 'Alfabética', 'Ideográfica china'],
    answer: 1,
    explanation:
      'La escritura cuneiforme se hacía con una cuña sobre tablillas de arcilla. La jeroglífica corresponde al antiguo Egipto.',
  },
  {
    id: 'his-003',
    topic: 'Civilizaciones antiguas',
    difficulty: 'medio',
    prompt: 'El Código de Hammurabi es célebre por ser:',
    options: [
      'El primer mapa del mundo conocido',
      'Uno de los conjuntos de leyes escritas más antiguos',
      'Un tratado de astronomía egipcio',
      'La primera constitución democrática',
    ],
    answer: 1,
    explanation:
      'Fue promulgado en Babilonia hacia el siglo XVIII a. C. y se basa en la ley del talión, resumida en la fórmula "ojo por ojo, diente por diente".',
  },
  {
    id: 'his-004',
    topic: 'Civilizaciones antiguas',
    difficulty: 'facil',
    prompt: 'La civilización egipcia se desarrolló a orillas del río:',
    options: ['Nilo', 'Amazonas', 'Éufrates', 'Jordán'],
    answer: 0,
    explanation:
      'Las crecidas anuales del Nilo fertilizaban las tierras de cultivo. Heródoto llamó a Egipto "el don del Nilo".',
  },
  {
    id: 'his-005',
    topic: 'Civilizaciones antiguas',
    difficulty: 'medio',
    prompt: 'La democracia como forma de gobierno nació en:',
    options: ['Roma', 'Atenas', 'Esparta', 'Alejandría'],
    answer: 1,
    explanation:
      'En la Atenas del siglo V a. C., especialmente bajo Pericles, los ciudadanos varones libres participaban directamente en la asamblea o Ecclesía.',
  },
  {
    id: 'his-006',
    topic: 'Civilizaciones antiguas',
    difficulty: 'medio',
    prompt: 'El principal legado de la civilización romana a la cultura occidental es:',
    options: [
      'El derecho y la organización jurídica',
      'La escritura cuneiforme',
      'La brújula magnética',
      'El sistema decimal',
    ],
    answer: 0,
    explanation:
      'El derecho romano es la base de los sistemas jurídicos de gran parte de Occidente, incluido el ecuatoriano. También heredamos el latín y el urbanismo.',
  },
  {
    id: 'his-007',
    topic: 'Civilizaciones antiguas',
    difficulty: 'dificil',
    prompt: 'La caída del Imperio Romano de Occidente, que marca convencionalmente el fin de la Edad Antigua, ocurrió en el año:',
    options: ['313 d. C.', '476 d. C.', '1453 d. C.', '1492 d. C.'],
    answer: 1,
    explanation:
      'En 476 el último emperador, Rómulo Augústulo, fue depuesto. En 1453 cayó Constantinopla, hecho que cierra la Edad Media.',
  },
  {
    id: 'his-008',
    topic: 'Edad Media',
    difficulty: 'medio',
    prompt: 'El sistema social y económico predominante en la Europa medieval fue:',
    options: ['El capitalismo', 'El feudalismo', 'El socialismo', 'El mercantilismo industrial'],
    answer: 1,
    explanation:
      'El feudalismo se basaba en la relación de vasallaje: el señor entregaba tierra y protección a cambio de fidelidad y trabajo de los siervos.',
  },
  {
    id: 'his-009',
    topic: 'Edad Moderna',
    difficulty: 'facil',
    prompt: 'Cristóbal Colón llegó a América en el año:',
    options: ['1453', '1492', '1519', '1532'],
    answer: 1,
    explanation:
      'El 12 de octubre de 1492 la expedición financiada por los Reyes Católicos tocó tierra en la isla Guanahaní, en el Caribe.',
  },
  {
    id: 'his-010',
    topic: 'Edad Moderna',
    difficulty: 'medio',
    prompt: 'El movimiento cultural de los siglos XV y XVI que revalorizó la cultura grecolatina y colocó al ser humano en el centro se llama:',
    options: ['Renacimiento', 'Escolástica', 'Romanticismo', 'Barroco'],
    answer: 0,
    explanation:
      'El Renacimiento trajo consigo el humanismo, el desarrollo de las artes y de la ciencia, con figuras como Leonardo da Vinci y Miguel Ángel.',
  },
  {
    id: 'his-011',
    topic: 'Ilustración',
    difficulty: 'medio',
    prompt: 'El pensador ilustrado que propuso la separación de poderes en ejecutivo, legislativo y judicial fue:',
    options: ['Rousseau', 'Montesquieu', 'Voltaire', 'Locke'],
    answer: 1,
    explanation:
      'Montesquieu lo planteó en "El espíritu de las leyes" (1748). Rousseau desarrolló la idea del contrato social y la soberanía popular.',
  },
  {
    id: 'his-012',
    topic: 'Revolución Francesa',
    difficulty: 'facil',
    prompt: 'La Revolución Francesa se inició en el año:',
    options: ['1776', '1789', '1804', '1810'],
    answer: 1,
    explanation:
      'Comenzó en 1789 con la reunión de los Estados Generales y la toma de la Bastilla. En 1776 se declaró la independencia de Estados Unidos.',
  },
  {
    id: 'his-013',
    topic: 'Revolución Francesa',
    difficulty: 'facil',
    prompt: 'La toma de la Bastilla, símbolo del inicio de la Revolución Francesa, ocurrió el:',
    options: ['4 de julio', '14 de julio', '10 de agosto', '26 de agosto'],
    answer: 1,
    explanation:
      'El 14 de julio de 1789 el pueblo de París asaltó esa prisión, símbolo del absolutismo monárquico. Hoy es la fiesta nacional de Francia.',
  },
  {
    id: 'his-014',
    topic: 'Revolución Francesa',
    difficulty: 'facil',
    prompt: 'El lema de la Revolución Francesa fue:',
    options: [
      'Orden y progreso',
      'Libertad, igualdad y fraternidad',
      'Paz, pan y tierra',
      'Dios, patria y rey',
    ],
    answer: 1,
    explanation:
      'Esos tres principios inspiraron la Declaración de los Derechos del Hombre y del Ciudadano y siguen siendo el lema de la República Francesa.',
  },
  {
    id: 'his-015',
    topic: 'Revolución Francesa',
    difficulty: 'medio',
    prompt: 'Entre las causas de la Revolución Francesa NO se encuentra:',
    options: [
      'La crisis financiera del Estado',
      'La desigualdad entre los tres estamentos',
      'La difusión de las ideas ilustradas',
      'La expansión del Imperio Napoleónico',
    ],
    answer: 3,
    explanation:
      'El Imperio de Napoleón fue una consecuencia posterior, proclamada en 1804, no una causa de la revolución de 1789.',
  },
  {
    id: 'his-016',
    topic: 'Revolución Francesa',
    difficulty: 'dificil',
    prompt: 'El rey de Francia depuesto y ejecutado durante la Revolución Francesa fue:',
    options: ['Luis XIV', 'Luis XVI', 'Carlos X', 'Felipe II'],
    answer: 1,
    explanation:
      'Luis XVI fue guillotinado en enero de 1793, junto con la reina María Antonieta meses después. Luis XIV fue el Rey Sol, del siglo anterior.',
  },
  {
    id: 'his-017',
    topic: 'Revolución Industrial',
    difficulty: 'medio',
    prompt: 'La Revolución Industrial comenzó en el siglo XVIII en:',
    options: ['Francia', 'Inglaterra', 'Alemania', 'Estados Unidos'],
    answer: 1,
    explanation:
      'Gran Bretaña contaba con carbón, capital, mano de obra y colonias. El perfeccionamiento de la máquina de vapor por James Watt fue decisivo.',
  },
  {
    id: 'his-018',
    topic: 'Independencia americana',
    difficulty: 'facil',
    prompt: 'El Primer Grito de Independencia en Quito se produjo el:',
    options: ['10 de agosto de 1809', '9 de octubre de 1820', '24 de mayo de 1822', '13 de mayo de 1830'],
    answer: 0,
    explanation:
      'Ese día un grupo de criollos quiteños formó una Junta Soberana de Gobierno. Por eso el 10 de Agosto es el Día del Primer Grito de Independencia.',
  },
  {
    id: 'his-019',
    topic: 'Independencia americana',
    difficulty: 'medio',
    prompt: 'La Batalla del Pichincha, que selló la independencia de Quito, se libró el:',
    options: ['9 de octubre de 1820', '24 de mayo de 1822', '10 de agosto de 1809', '6 de diciembre de 1534'],
    answer: 1,
    explanation:
      'El 24 de mayo de 1822 las tropas al mando de Antonio José de Sucre vencieron a las realistas en las faldas del volcán Pichincha.',
  },
  {
    id: 'his-020',
    topic: 'Independencia americana',
    difficulty: 'medio',
    prompt: 'Tras la independencia, el actual territorio ecuatoriano se integró como Distrito del Sur a:',
    options: ['El Virreinato del Perú', 'La Gran Colombia', 'Las Provincias Unidas del Río de la Plata', 'La Confederación Peruano-Boliviana'],
    answer: 1,
    explanation:
      'La Gran Colombia fue el proyecto de Simón Bolívar que reunió a Venezuela, Nueva Granada y Quito. Ecuador se separó de ella en 1830.',
  },
  {
    id: 'his-021',
    topic: 'Historia del Ecuador',
    difficulty: 'medio',
    prompt: 'Ecuador se constituyó como República independiente en el año:',
    options: ['1822', '1830', '1845', '1895'],
    answer: 1,
    explanation:
      'En mayo de 1830 Quito se separó de la Gran Colombia y en septiembre se aprobó la primera Constitución, en Riobamba, con Juan José Flores como presidente.',
  },
  {
    id: 'his-022',
    topic: 'Historia del Ecuador',
    difficulty: 'medio',
    prompt: 'La Revolución Liberal ecuatoriana de 1895 fue liderada por:',
    options: ['Gabriel García Moreno', 'Eloy Alfaro', 'Juan José Flores', 'Vicente Rocafuerte'],
    answer: 1,
    explanation:
      'Eloy Alfaro impulsó el laicismo, la educación pública, el matrimonio civil y la construcción del ferrocarril transandino.',
  },
  {
    id: 'his-023',
    topic: 'Historia del Ecuador',
    difficulty: 'dificil',
    prompt: 'La obra de infraestructura más emblemática del gobierno de Eloy Alfaro fue:',
    options: [
      'El ferrocarril transandino Guayaquil-Quito',
      'La Refinería de Esmeraldas',
      'La carretera Panamericana',
      'El puerto de Manta',
    ],
    answer: 0,
    explanation:
      'El ferrocarril, inaugurado en 1908, unió la Costa con la Sierra y fue clave para integrar económicamente al país.',
  },
  {
    id: 'his-024',
    topic: 'Historia contemporánea',
    difficulty: 'facil',
    prompt: 'La Segunda Guerra Mundial se desarrolló entre los años:',
    options: ['1914 y 1918', '1929 y 1933', '1939 y 1945', '1945 y 1950'],
    answer: 2,
    explanation:
      'Comenzó con la invasión alemana a Polonia en 1939 y terminó en 1945. La Primera Guerra Mundial fue entre 1914 y 1918.',
  },
  {
    id: 'his-025',
    topic: 'Historia contemporánea',
    difficulty: 'medio',
    prompt: 'La Organización de las Naciones Unidas (ONU) se fundó en 1945 con el objetivo principal de:',
    options: [
      'Regular el comercio del petróleo',
      'Mantener la paz y la seguridad internacionales',
      'Crear una moneda mundial única',
      'Administrar las colonias europeas',
    ],
    answer: 1,
    explanation:
      'Nació al terminar la Segunda Guerra Mundial, en reemplazo de la Sociedad de Naciones. En 1948 aprobó la Declaración Universal de los Derechos Humanos.',
  },
  {
    id: 'his-026',
    topic: 'Ciudadanía',
    difficulty: 'medio',
    prompt: 'La Declaración Universal de los Derechos Humanos fue proclamada en 1948 por:',
    options: ['La Unión Europea', 'La ONU', 'La OEA', 'La UNESCO'],
    answer: 1,
    explanation:
      'La Asamblea General de las Naciones Unidas la aprobó el 10 de diciembre de 1948, fecha en que se celebra el Día de los Derechos Humanos.',
  },
  {
    id: 'his-027',
    topic: 'Ciudadanía',
    difficulty: 'medio',
    prompt: 'La Constitución vigente del Ecuador, conocida como Constitución de Montecristi, fue aprobada en:',
    options: ['1998', '2006', '2008', '2011'],
    answer: 2,
    explanation:
      'Fue aprobada mediante referéndum en 2008. Define al Ecuador como Estado constitucional de derechos y justicia, intercultural y plurinacional.',
  },
  {
    id: 'his-028',
    topic: 'Ciudadanía',
    difficulty: 'dificil',
    prompt: 'Según la Constitución de 2008, las funciones del Estado ecuatoriano son:',
    options: ['Tres', 'Cuatro', 'Cinco', 'Seis'],
    answer: 2,
    explanation:
      'A las funciones Ejecutiva, Legislativa y Judicial se sumaron la Electoral y la de Transparencia y Control Social.',
  },
  {
    id: 'his-029',
    topic: 'Ciudadanía',
    difficulty: 'medio',
    prompt: 'En Ecuador, el voto es obligatorio para las personas:',
    options: [
      'De 16 y 17 años',
      'Mayores de 18 y hasta los 65 años',
      'Mayores de 65 años',
      'Únicamente para quienes tienen título profesional',
    ],
    answer: 1,
    explanation:
      'El sufragio es obligatorio entre los 18 y los 65 años, y facultativo para quienes tienen 16 o 17 años, para los mayores de 65 y para otros grupos definidos en la Constitución.',
  },
  {
    id: 'his-030',
    topic: 'Ciudadanía',
    difficulty: 'medio',
    prompt: 'El órgano encargado de aprobar las leyes en el Ecuador es:',
    options: ['La Corte Constitucional', 'La Asamblea Nacional', 'El Consejo Nacional Electoral', 'La Presidencia de la República'],
    answer: 1,
    explanation:
      'La Asamblea Nacional ejerce la Función Legislativa: aprueba leyes, fiscaliza y aprueba el presupuesto general del Estado.',
  },
  {
    id: 'his-031',
    topic: 'Ciudadanía',
    difficulty: 'dificil',
    prompt: 'El concepto de Sumak Kawsay o Buen Vivir, incorporado a la Constitución ecuatoriana, proviene de:',
    options: [
      'La tradición filosófica europea',
      'La cosmovisión de los pueblos indígenas andinos',
      'El derecho romano',
      'La doctrina liberal del siglo XIX',
    ],
    answer: 1,
    explanation:
      'Es un principio de origen kichwa que plantea la vida en armonía con la comunidad y con la naturaleza, frente a la idea de desarrollo puramente material.',
  },
  {
    id: 'his-032',
    topic: 'Ciudadanía',
    difficulty: 'medio',
    prompt: 'Una característica que hace novedosa a la Constitución ecuatoriana de 2008 en el mundo es que:',
    options: [
      'Elimina el derecho al voto',
      'Reconoce derechos propios a la naturaleza',
      'Establece una monarquía parlamentaria',
      'Prohíbe la educación pública',
    ],
    answer: 1,
    explanation:
      'Ecuador fue el primer país en reconocer a la naturaleza, o Pacha Mama, como sujeto de derechos, y no solamente como un objeto de propiedad.',
  },
]

export const historia = build('historia', drafts)
