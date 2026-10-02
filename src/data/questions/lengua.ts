import { build, type QDraft } from './helpers'

const drafts: QDraft[] = [
  {
    id: 'len-001',
    topic: 'Tipos de texto',
    difficulty: 'facil',
    prompt: 'Un texto cuyo propósito es convencer al lector de una postura mediante razones y evidencias es un texto:',
    options: ['Narrativo', 'Descriptivo', 'Argumentativo', 'Instructivo'],
    answer: 2,
    explanation:
      'El texto argumentativo presenta una tesis y la sostiene con argumentos. El expositivo, en cambio, solo informa sin intentar persuadir.',
  },
  {
    id: 'len-002',
    topic: 'Tipos de texto',
    difficulty: 'facil',
    prompt: 'El manual que explica paso a paso cómo armar un mueble corresponde a un texto:',
    options: ['Instructivo', 'Narrativo', 'Lírico', 'Argumentativo'],
    answer: 0,
    explanation:
      'Los textos instructivos organizan la información en pasos ordenados y suelen usar verbos en imperativo o en infinitivo.',
  },
  {
    id: 'len-003',
    topic: 'Tipos de texto',
    difficulty: 'medio',
    prompt: 'La función del lenguaje que predomina en una noticia periodística es la:',
    options: ['Emotiva o expresiva', 'Referencial o informativa', 'Apelativa o conativa', 'Poética'],
    answer: 1,
    explanation:
      'La función referencial se centra en el contexto y transmite información objetiva. La apelativa busca influir en el receptor, como en la publicidad.',
  },
  {
    id: 'len-004',
    topic: 'Tipos de texto',
    difficulty: 'medio',
    prompt: 'La estructura básica de un texto argumentativo es:',
    options: [
      'Inicio, nudo y desenlace',
      'Introducción, desarrollo de argumentos y conclusión',
      'Ingredientes, procedimiento y presentación',
      'Título, subtítulo y pie de foto',
    ],
    answer: 1,
    explanation:
      'Primero se plantea la tesis, luego se la respalda con argumentos y evidencias, y finalmente se cierra reafirmando la postura.',
  },
  {
    id: 'len-005',
    topic: 'Comprensión lectora',
    difficulty: 'medio',
    prompt: 'La idea principal de un párrafo es aquella que:',
    options: [
      'Aparece siempre en la última oración',
      'Contiene el mensaje esencial del que dependen las demás ideas',
      'Es la oración más larga del párrafo',
      'Incluye la mayor cantidad de datos numéricos',
    ],
    answer: 1,
    explanation:
      'Las ideas secundarias amplían, ejemplifican o matizan la principal. Su posición dentro del párrafo puede variar.',
  },
  {
    id: 'len-006',
    topic: 'Comprensión lectora',
    difficulty: 'medio',
    prompt: 'Realizar una inferencia al leer significa:',
    options: [
      'Repetir literalmente lo que dice el texto',
      'Deducir información que no está expresada de forma explícita',
      'Buscar el significado de las palabras en el diccionario',
      'Resumir el texto en una sola oración',
    ],
    answer: 1,
    explanation:
      'La inferencia combina las pistas del texto con el conocimiento previo del lector para llegar a una conclusión que el autor no escribió textualmente.',
  },
  {
    id: 'len-007',
    topic: 'Vocabulario',
    difficulty: 'medio',
    prompt: 'En la expresión "tiene un corazón de piedra", la palabra piedra se usa en sentido:',
    options: ['Denotativo', 'Connotativo', 'Literal', 'Técnico'],
    answer: 1,
    explanation:
      'El sentido connotativo es figurado y agrega valoraciones: aquí sugiere dureza o falta de sensibilidad. El denotativo sería el significado literal del diccionario.',
  },
  {
    id: 'len-008',
    topic: 'Vocabulario',
    difficulty: 'facil',
    prompt: 'El antónimo de la palabra "escaso" es:',
    options: ['Insuficiente', 'Limitado', 'Abundante', 'Reducido'],
    answer: 2,
    explanation:
      'Los antónimos expresan significados opuestos. Las otras tres opciones son sinónimos o casi sinónimos de escaso.',
  },
  {
    id: 'len-009',
    topic: 'Vocabulario',
    difficulty: 'medio',
    prompt: 'Las palabras "vaca" y "baca" son ejemplo de:',
    options: ['Sinónimos', 'Homófonas', 'Parónimos por acentuación', 'Antónimos'],
    answer: 1,
    explanation:
      'Las palabras homófonas suenan igual pero se escriben distinto y tienen significados diferentes: la vaca es el animal y la baca es el portaequipaje del auto.',
  },
  {
    id: 'len-010',
    topic: 'Gramática',
    difficulty: 'facil',
    prompt: 'En la oración "Los estudiantes de Zootecnia visitaron la hacienda", el sujeto es:',
    options: [
      'Visitaron la hacienda',
      'Los estudiantes de Zootecnia',
      'La hacienda',
      'De Zootecnia',
    ],
    answer: 1,
    explanation:
      'El sujeto es de quien se dice algo y concuerda en número con el verbo. El resto de la oración constituye el predicado.',
  },
  {
    id: 'len-011',
    topic: 'Gramática',
    difficulty: 'medio',
    prompt: 'En la oración "María compró tres terneros sanos", la palabra "sanos" funciona como:',
    options: ['Sustantivo', 'Adjetivo calificativo', 'Adverbio', 'Verbo'],
    answer: 1,
    explanation:
      'El adjetivo calificativo expresa una cualidad del sustantivo y concuerda con él en género y número. Aquí califica a terneros.',
  },
  {
    id: 'len-012',
    topic: 'Gramática',
    difficulty: 'medio',
    prompt: '¿Cuál de las siguientes palabras es un adverbio?',
    options: ['Rápido', 'Rápidamente', 'Rapidez', 'Rapidísimo'],
    answer: 1,
    explanation:
      'Los adverbios modifican al verbo, al adjetivo o a otro adverbio; muchos se forman con el sufijo -mente. Rapidez es sustantivo y rapidísimo es adjetivo superlativo.',
  },
  {
    id: 'len-013',
    topic: 'Gramática',
    difficulty: 'dificil',
    prompt: 'La oración "Estudié mucho, pero el examen fue difícil" es una oración compuesta:',
    options: ['Coordinada adversativa', 'Subordinada sustantiva', 'Yuxtapuesta', 'Simple'],
    answer: 0,
    explanation:
      'Dos proposiciones independientes unidas por el nexo "pero" forman una coordinada adversativa, que expresa contraste u oposición.',
  },
  {
    id: 'len-014',
    topic: 'Gramática',
    difficulty: 'medio',
    prompt: 'El conector "sin embargo" expresa una relación de:',
    options: ['Causa', 'Consecuencia', 'Oposición', 'Adición'],
    answer: 2,
    explanation:
      'Los conectores adversativos como sin embargo, no obstante o en cambio contraponen ideas. "Por lo tanto" indica consecuencia y "además" adición.',
  },
  {
    id: 'len-015',
    topic: 'Ortografía',
    difficulty: 'medio',
    prompt: 'Las palabras esdrújulas, como "brújula" o "médico":',
    options: [
      'Nunca llevan tilde',
      'Llevan tilde solo si terminan en vocal',
      'Llevan tilde siempre',
      'Llevan tilde solo si terminan en consonante',
    ],
    answer: 2,
    explanation:
      'Las esdrújulas, acentuadas en la antepenúltima sílaba, se tildan sin excepción. Es la regla de acentuación más simple de recordar.',
  },
  {
    id: 'len-016',
    topic: 'Ortografía',
    difficulty: 'medio',
    prompt: 'La palabra "corazón" lleva tilde porque es una palabra:',
    options: [
      'Aguda terminada en n',
      'Grave terminada en n',
      'Esdrújula',
      'Sobresdrújula',
    ],
    answer: 0,
    explanation:
      'Las agudas se acentúan en la última sílaba y llevan tilde cuando terminan en n, en s o en vocal.',
  },
  {
    id: 'len-017',
    topic: 'Ortografía',
    difficulty: 'dificil',
    prompt: 'La oración correctamente escrita es:',
    options: [
      'Tu casa está cerca de mi',
      'Tú casa esta cerca de mí',
      'Tu casa está cerca de mí',
      'Tú casa está cerca de mi',
    ],
    answer: 2,
    explanation:
      'Tu, sin tilde, es el posesivo que acompaña a casa; mí, con tilde diacrítica, es el pronombre personal. Está lleva tilde por ser aguda terminada en vocal.',
  },
  {
    id: 'len-018',
    topic: 'Ortografía',
    difficulty: 'medio',
    prompt: 'La forma correcta es: "Vamos ___ ver qué pasó".',
    options: ['a', 'ha', 'ah', 'há'],
    answer: 0,
    explanation:
      '"A ver" es la preposición a seguida del verbo ver. "Haber" es el verbo, como en "debe haber una razón".',
  },
  {
    id: 'len-019',
    topic: 'Ortografía',
    difficulty: 'medio',
    prompt: 'El uso correcto de los dos puntos aparece en:',
    options: [
      'Compré: manzanas, peras y uvas',
      'Compré tres frutas: manzanas, peras y uvas',
      'Compré tres frutas manzanas: peras y uvas',
      'Compré, tres frutas: manzanas peras y uvas',
    ],
    answer: 1,
    explanation:
      'Los dos puntos anuncian una enumeración después de una idea completa. No deben separar el verbo de su complemento directo.',
  },
  {
    id: 'len-020',
    topic: 'Figuras literarias',
    difficulty: 'facil',
    prompt: 'En el verso "sus dientes son perlas", la figura literaria empleada es:',
    options: ['Símil', 'Metáfora', 'Hipérbole', 'Anáfora'],
    answer: 1,
    explanation:
      'La metáfora identifica un término con otro sin usar nexo comparativo. Si dijera "sus dientes son como perlas", sería un símil o comparación.',
  },
  {
    id: 'len-021',
    topic: 'Figuras literarias',
    difficulty: 'medio',
    prompt: 'La expresión "te lo he dicho un millón de veces" corresponde a la figura llamada:',
    options: ['Metonimia', 'Hipérbole', 'Personificación', 'Elipsis'],
    answer: 1,
    explanation: 'La hipérbole es una exageración deliberada que busca intensificar la expresión.',
  },
  {
    id: 'len-022',
    topic: 'Figuras literarias',
    difficulty: 'medio',
    prompt: 'En "el viento susurraba entre los árboles" se emplea:',
    options: ['Personificación', 'Símil', 'Hipérbaton', 'Sinécdoque'],
    answer: 0,
    explanation:
      'La personificación o prosopopeya atribuye cualidades humanas, como susurrar, a seres inanimados.',
  },
  {
    id: 'len-023',
    topic: 'Géneros literarios',
    difficulty: 'facil',
    prompt: 'El género literario escrito principalmente en verso, que expresa sentimientos del hablante, es el:',
    options: ['Narrativo', 'Lírico', 'Dramático', 'Didáctico'],
    answer: 1,
    explanation:
      'El género lírico expresa la subjetividad del yo poético. El narrativo cuenta hechos y el dramático está pensado para representarse en escena.',
  },
  {
    id: 'len-024',
    topic: 'Géneros literarios',
    difficulty: 'medio',
    prompt: 'La diferencia esencial entre el cuento y la novela es que el cuento:',
    options: [
      'No tiene personajes',
      'Es más breve y suele centrarse en un solo conflicto',
      'Siempre está escrito en verso',
      'Carece de narrador',
    ],
    answer: 1,
    explanation:
      'El cuento es breve, con pocos personajes y una acción concentrada. La novela desarrolla tramas y personajes con mayor amplitud.',
  },
  {
    id: 'len-025',
    topic: 'Géneros literarios',
    difficulty: 'medio',
    prompt: 'Un narrador que participa en la historia y cuenta los hechos en primera persona es un narrador:',
    options: ['Omnisciente', 'Protagonista', 'Testigo objetivo en tercera persona', 'Externo'],
    answer: 1,
    explanation:
      'Si el que narra es el personaje central, se trata de un narrador protagonista. El omnisciente conoce todo y narra en tercera persona.',
  },
  {
    id: 'len-026',
    topic: 'Literatura ecuatoriana',
    difficulty: 'medio',
    prompt: 'La novela "Huasipungo", que denuncia la explotación del indígena ecuatoriano, fue escrita por:',
    options: ['Juan Montalvo', 'Jorge Icaza', 'Juan León Mera', 'Pablo Palacio'],
    answer: 1,
    explanation:
      'Jorge Icaza publicó Huasipungo en 1934. Es la obra más representativa del indigenismo ecuatoriano y tuvo enorme repercusión internacional.',
  },
  {
    id: 'len-027',
    topic: 'Literatura ecuatoriana',
    difficulty: 'dificil',
    prompt: '"Cumandá o un drama entre salvajes", novela romántica ambientada en la Amazonía, pertenece a:',
    options: ['Juan León Mera', 'José de la Cuadra', 'Medardo Ángel Silva', 'Jorge Enrique Adoum'],
    answer: 0,
    explanation:
      'Juan León Mera la publicó en 1879. Además fue el autor de la letra del Himno Nacional del Ecuador.',
  },
  {
    id: 'len-028',
    topic: 'Literatura ecuatoriana',
    difficulty: 'dificil',
    prompt: 'Se conoce como "Generación decapitada" al grupo de poetas ecuatorianos de principios del siglo XX vinculados al:',
    options: ['Realismo social', 'Modernismo', 'Barroco', 'Vanguardismo concreto'],
    answer: 1,
    explanation:
      'Medardo Ángel Silva, Arturo Borja, Ernesto Noboa y Caamaño y Humberto Fierro cultivaron el modernismo. El nombre alude a sus muertes tempranas y trágicas.',
  },
  {
    id: 'len-029',
    topic: 'Literatura latinoamericana',
    difficulty: 'medio',
    prompt: '"Cien años de soledad", obra cumbre del realismo mágico, fue escrita por:',
    options: ['Julio Cortázar', 'Gabriel García Márquez', 'Mario Vargas Llosa', 'Carlos Fuentes'],
    answer: 1,
    explanation:
      'El colombiano García Márquez la publicó en 1967 y narra la historia de la familia Buendía en el pueblo imaginario de Macondo.',
  },
  {
    id: 'len-030',
    topic: 'Literatura latinoamericana',
    difficulty: 'medio',
    prompt: 'El realismo mágico se caracteriza por:',
    options: [
      'Describir la realidad con exactitud científica',
      'Presentar hechos fantásticos como parte natural de la vida cotidiana',
      'Rechazar todo elemento narrativo',
      'Ambientar siempre las obras en Europa',
    ],
    answer: 1,
    explanation:
      'En el realismo mágico lo extraordinario se narra con total naturalidad, sin que los personajes se asombren, y convive con lo cotidiano.',
  },
  {
    id: 'len-031',
    topic: 'Literatura latinoamericana',
    difficulty: 'dificil',
    prompt: 'El poeta nicaragüense Rubén Darío, autor de "Azul", es considerado el máximo representante del:',
    options: ['Romanticismo', 'Modernismo', 'Naturalismo', 'Costumbrismo'],
    answer: 1,
    explanation:
      'Con Azul (1888) Darío inauguró el modernismo hispanoamericano, movimiento marcado por la musicalidad, el exotismo y la renovación del lenguaje poético.',
  },
  {
    id: 'len-032',
    topic: 'Literatura latinoamericana',
    difficulty: 'medio',
    prompt: 'El poeta chileno autor de "Veinte poemas de amor y una canción desesperada", Premio Nobel de Literatura en 1971, es:',
    options: ['César Vallejo', 'Pablo Neruda', 'Octavio Paz', 'Jorge Luis Borges'],
    answer: 1,
    explanation:
      'Pablo Neruda publicó esa obra en 1924. César Vallejo era peruano y Octavio Paz, mexicano, recibió el Nobel en 1990.',
  },
  {
    id: 'len-033',
    topic: 'Literatura latinoamericana',
    difficulty: 'dificil',
    prompt: 'El fenómeno editorial y literario de los años sesenta que proyectó internacionalmente a autores como Cortázar, Vargas Llosa y García Márquez se conoce como:',
    options: [
      'La Generación del 27',
      'El Boom latinoamericano',
      'El Siglo de Oro',
      'La Vanguardia europea',
    ],
    answer: 1,
    explanation:
      'El Boom latinoamericano renovó la novela con técnicas narrativas experimentales y llevó la literatura de la región a un público mundial.',
  },
]

export const lengua = build('lengua', drafts)
