import { build, type QDraft } from './helpers'

const drafts: QDraft[] = [
  {
    id: 'bio-001',
    topic: 'Célula',
    difficulty: 'facil',
    prompt: '¿Qué organelo es responsable de producir la mayor parte del ATP de la célula?',
    options: ['Ribosoma', 'Mitocondria', 'Aparato de Golgi', 'Lisosoma'],
    answer: 1,
    explanation:
      'En la mitocondria ocurren el ciclo de Krebs y la fosforilación oxidativa, que generan la mayor parte del ATP celular. Por eso se la llama la central energética.',
  },
  {
    id: 'bio-002',
    topic: 'Célula',
    difficulty: 'facil',
    prompt: 'La principal diferencia entre una célula procariota y una eucariota es que la procariota:',
    options: [
      'No posee membrana plasmática',
      'No posee material genético',
      'No posee núcleo delimitado por membrana',
      'No posee ribosomas',
    ],
    answer: 2,
    explanation:
      'Las procariotas (bacterias y arqueas) tienen su ADN libre en el citoplasma, en una zona llamada nucleoide. Sí tienen membrana, ADN y ribosomas.',
  },
  {
    id: 'bio-003',
    topic: 'Célula',
    difficulty: 'facil',
    prompt: 'Los ribosomas se encargan de:',
    options: [
      'La síntesis de proteínas',
      'La digestión de desechos celulares',
      'El almacenamiento de agua',
      'La replicación del ADN',
    ],
    answer: 0,
    explanation:
      'El ribosoma traduce el ARN mensajero y une aminoácidos para formar proteínas. La digestión celular corresponde a los lisosomas.',
  },
  {
    id: 'bio-004',
    topic: 'Célula',
    difficulty: 'facil',
    prompt: 'La pared celular de las células vegetales está formada principalmente por:',
    options: ['Quitina', 'Celulosa', 'Peptidoglicano', 'Colesterol'],
    answer: 1,
    explanation:
      'La celulosa es el polisacárido estructural de las plantas. La quitina forma la pared de los hongos y el peptidoglicano la de las bacterias.',
  },
  {
    id: 'bio-005',
    topic: 'Célula',
    difficulty: 'medio',
    prompt: 'El retículo endoplasmático rugoso recibe ese nombre porque:',
    options: [
      'Contiene enzimas digestivas',
      'Tiene ribosomas adheridos a su membrana',
      'Almacena calcio en su interior',
      'Está formado por microtúbulos',
    ],
    answer: 1,
    explanation:
      'Los ribosomas adheridos le dan aspecto rugoso y lo especializan en sintetizar proteínas destinadas a exportarse. El retículo liso, sin ribosomas, sintetiza lípidos.',
  },
  {
    id: 'bio-006',
    topic: 'Célula',
    difficulty: 'facil',
    prompt: 'El aparato de Golgi cumple la función de:',
    options: [
      'Producir energía a partir de glucosa',
      'Sintetizar ARN ribosomal',
      'Modificar, empaquetar y distribuir proteínas',
      'Controlar la entrada de agua a la célula',
    ],
    answer: 2,
    explanation:
      'El Golgi recibe proteínas del retículo, las modifica y las envía en vesículas hacia su destino final, dentro o fuera de la célula.',
  },
  {
    id: 'bio-007',
    topic: 'Célula',
    difficulty: 'facil',
    prompt: '¿Cuál de estas estructuras está presente en la célula vegetal pero NO en la animal?',
    options: ['Mitocondria', 'Cloroplasto', 'Membrana plasmática', 'Núcleo'],
    answer: 1,
    explanation:
      'El cloroplasto, junto con la pared celular y la gran vacuola central, es exclusivo de la célula vegetal. Las otras tres estructuras están en ambas.',
  },
  {
    id: 'bio-008',
    topic: 'Célula',
    difficulty: 'facil',
    prompt: 'El modelo que describe la membrana plasmática como una bicapa de fosfolípidos con proteínas que se desplazan en ella se llama:',
    options: ['Modelo de doble hélice', 'Modelo de mosaico fluido', 'Modelo corpuscular', 'Modelo de Bohr'],
    answer: 1,
    explanation:
      'El modelo de mosaico fluido, propuesto por Singer y Nicolson en 1972, explica que lípidos y proteínas no están fijos sino que se mueven lateralmente.',
  },
  {
    id: 'bio-009',
    topic: 'Transporte celular',
    difficulty: 'medio',
    prompt: 'La ósmosis es el paso de agua a través de una membrana semipermeable desde:',
    options: [
      'La zona más concentrada en soluto hacia la menos concentrada',
      'La zona menos concentrada en soluto hacia la más concentrada',
      'Cualquier zona, siempre que haya gasto de ATP',
      'El exterior hacia el interior únicamente',
    ],
    answer: 1,
    explanation:
      'El agua se mueve desde donde hay menos soluto (más agua libre) hacia donde hay más soluto, buscando igualar concentraciones. Es transporte pasivo, sin gasto de energía.',
  },
  {
    id: 'bio-010',
    topic: 'Transporte celular',
    difficulty: 'medio',
    prompt: 'Si se coloca un glóbulo rojo en una solución hipotónica, lo esperable es que:',
    options: [
      'Se deshidrate y se arrugue',
      'Se hinche y pueda estallar',
      'No cambie de tamaño',
      'Se divida por mitosis',
    ],
    answer: 1,
    explanation:
      'En un medio hipotónico hay menos soluto afuera que adentro, así que el agua entra a la célula. Sin pared celular que la contenga, el glóbulo rojo se hincha hasta la hemólisis.',
  },
  {
    id: 'bio-011',
    topic: 'Transporte celular',
    difficulty: 'medio',
    prompt: 'El transporte activo se diferencia de la difusión simple porque el activo:',
    options: [
      'Ocurre solo en células vegetales',
      'No requiere proteínas de membrana',
      'Requiere gasto de ATP y va en contra del gradiente',
      'Transporta únicamente agua',
    ],
    answer: 2,
    explanation:
      'El transporte activo mueve sustancias desde donde hay poca concentración hacia donde hay mucha, y por eso necesita energía. El ejemplo clásico es la bomba sodio-potasio.',
  },
  {
    id: 'bio-012',
    topic: 'División celular',
    difficulty: 'medio',
    prompt: 'La fase de la mitosis en la que las cromátidas hermanas se separan y migran a polos opuestos es la:',
    options: ['Profase', 'Metafase', 'Anafase', 'Telofase'],
    answer: 2,
    explanation:
      'En la anafase el centrómero se divide y cada cromátida es arrastrada por el huso hacia un polo. En la metafase apenas se alinean en el ecuador de la célula.',
  },
  {
    id: 'bio-013',
    topic: 'División celular',
    difficulty: 'medio',
    prompt: 'A partir de una célula diploide, la meiosis produce:',
    options: [
      '2 células diploides idénticas',
      '4 células haploides genéticamente distintas',
      '2 células haploides idénticas',
      '4 células diploides distintas',
    ],
    answer: 1,
    explanation:
      'La meiosis consta de dos divisiones sucesivas y genera cuatro gametos con la mitad de cromosomas. El entrecruzamiento los hace genéticamente diferentes entre sí.',
  },
  {
    id: 'bio-014',
    topic: 'División celular',
    difficulty: 'dificil',
    prompt: 'El entrecruzamiento o crossing over ocurre durante:',
    options: ['La profase I de la meiosis', 'La anafase II de la meiosis', 'La metafase mitótica', 'La interfase'],
    answer: 0,
    explanation:
      'En la profase I los cromosomas homólogos se aparean e intercambian fragmentos, lo que aumenta enormemente la variabilidad genética de los gametos.',
  },
  {
    id: 'bio-015',
    topic: 'ADN y ARN',
    difficulty: 'facil',
    prompt: 'En la molécula de ADN, la adenina se aparea siempre con:',
    options: ['Citosina', 'Guanina', 'Timina', 'Uracilo'],
    answer: 2,
    explanation:
      'Las reglas de complementariedad son A-T y C-G en el ADN. El uracilo sustituye a la timina, pero solo en el ARN.',
  },
  {
    id: 'bio-016',
    topic: 'ADN y ARN',
    difficulty: 'facil',
    prompt: '¿Cuál es una diferencia correcta entre el ADN y el ARN?',
    options: [
      'El ARN contiene uracilo y su azúcar es la ribosa',
      'El ARN es siempre de doble hebra',
      'El ADN contiene uracilo en lugar de timina',
      'El ADN no contiene fósforo',
    ],
    answer: 0,
    explanation:
      'El ARN suele ser monocatenario, lleva ribosa y uracilo; el ADN es bicatenario, lleva desoxirribosa y timina. Ambos contienen grupos fosfato.',
  },
  {
    id: 'bio-017',
    topic: 'ADN y ARN',
    difficulty: 'dificil',
    prompt: 'Se dice que la replicación del ADN es semiconservativa porque cada molécula hija:',
    options: [
      'Conserva la mitad de sus bases nitrogenadas',
      'Está formada por una hebra original y una hebra nueva',
      'Se forma solo en la mitad del núcleo',
      'Conserva únicamente hebras recién sintetizadas',
    ],
    answer: 1,
    explanation:
      'Meselson y Stahl demostraron que las dos hebras se separan y cada una sirve de molde. Así, cada ADN hijo conserva una hebra vieja y una nueva.',
  },
  {
    id: 'bio-018',
    topic: 'ADN y ARN',
    difficulty: 'medio',
    prompt: 'El proceso por el cual la información del ARN mensajero se convierte en una cadena de aminoácidos se denomina:',
    options: ['Transcripción', 'Replicación', 'Traducción', 'Transducción'],
    answer: 2,
    explanation:
      'La transcripción pasa de ADN a ARN mensajero dentro del núcleo; la traducción ocurre en el ribosoma y convierte los codones del ARNm en aminoácidos.',
  },
  {
    id: 'bio-019',
    topic: 'Genética',
    difficulty: 'medio',
    prompt: 'Al cruzar dos individuos heterocigotos (Aa × Aa), la proporción fenotípica esperada en la descendencia es:',
    options: ['1:1', '3:1', '9:3:3:1', '2:2'],
    answer: 1,
    explanation:
      'El cuadro de Punnett da AA, Aa, Aa, aa. Como A domina, tres de cada cuatro muestran el carácter dominante: proporción fenotípica 3:1. La genotípica sí es 1:2:1.',
  },
  {
    id: 'bio-020',
    topic: 'Genética',
    difficulty: 'medio',
    prompt: 'En un cruce de prueba Aa × aa, el porcentaje de descendientes que mostrarán el carácter recesivo es:',
    options: ['0 %', '25 %', '50 %', '75 %'],
    answer: 2,
    explanation:
      'Los gametos son A y a por un lado, y solo a por el otro. Resulta 50 % Aa, que muestra el carácter dominante, y 50 % aa, que muestra el recesivo.',
  },
  {
    id: 'bio-021',
    topic: 'Genética',
    difficulty: 'medio',
    prompt: 'Un alelo recesivo se manifiesta en el fenotipo únicamente cuando el individuo es:',
    options: ['Heterocigoto', 'Homocigoto recesivo', 'Homocigoto dominante', 'Haploide'],
    answer: 1,
    explanation:
      'Si hay un alelo dominante presente, este enmascara al recesivo. Solo en homocigosis recesiva (aa) el carácter llega a expresarse.',
  },
  {
    id: 'bio-022',
    topic: 'Genética',
    difficulty: 'medio',
    prompt: 'La primera ley de Mendel, o ley de la segregación, establece que:',
    options: [
      'Los caracteres se heredan siempre juntos',
      'Los dos alelos de un gen se separan al formarse los gametos',
      'El ambiente determina el genotipo',
      'Todos los descendientes son idénticos al progenitor',
    ],
    answer: 1,
    explanation:
      'Cada gameto recibe solo uno de los dos alelos que el progenitor posee para cada carácter; por eso el descendiente hereda uno de cada padre.',
  },
  {
    id: 'bio-023',
    topic: 'Genética',
    difficulty: 'dificil',
    prompt: 'El daltonismo es recesivo y está ligado al cromosoma X. Del cruce entre una mujer portadora sana y un hombre no daltónico se espera que:',
    options: [
      'Todas las hijas sean daltónicas',
      'La mitad de los hijos varones sean daltónicos',
      'Todos los hijos varones sean daltónicos',
      'Ningún descendiente resulte afectado',
    ],
    answer: 1,
    explanation:
      'La madre aporta X sana o X portadora. Los varones reciben la Y del padre, así que la mitad heredará la X con el alelo y será daltónico. Las hijas serán sanas, la mitad portadoras.',
  },
  {
    id: 'bio-024',
    topic: 'Genética',
    difficulty: 'facil',
    prompt: 'Cada célula somática de la especie humana posee:',
    options: ['23 cromosomas', '46 cromosomas', '46 pares de cromosomas', '23 cromátidas'],
    answer: 1,
    explanation:
      'Son 46 cromosomas, es decir 23 pares. Los gametos son haploides y llevan solo 23 cromosomas, uno de cada par.',
  },
  {
    id: 'bio-025',
    topic: 'Genética',
    difficulty: 'facil',
    prompt: 'Una mutación es:',
    options: [
      'Un cambio en la secuencia del ADN',
      'La pérdida de una célula del organismo',
      'Un aumento del tamaño corporal',
      'La adaptación voluntaria de un organismo',
    ],
    answer: 0,
    explanation:
      'Las mutaciones son alteraciones del material genético. Pueden ser perjudiciales, neutras o beneficiosas, y son la materia prima de la evolución.',
  },
  {
    id: 'bio-026',
    topic: 'Metabolismo',
    difficulty: 'facil',
    prompt: 'La ecuación general de la fotosíntesis tiene como productos finales:',
    options: [
      'Dióxido de carbono y agua',
      'Glucosa y oxígeno',
      'Glucosa y dióxido de carbono',
      'Agua y nitrógeno',
    ],
    answer: 1,
    explanation:
      '6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂. La planta capta dióxido de carbono y agua, y libera oxígeno como subproducto.',
  },
  {
    id: 'bio-027',
    topic: 'Metabolismo',
    difficulty: 'medio',
    prompt: 'La fase luminosa de la fotosíntesis se realiza en:',
    options: [
      'El estroma del cloroplasto',
      'Las membranas de los tilacoides',
      'La matriz mitocondrial',
      'El citoplasma',
    ],
    answer: 1,
    explanation:
      'Los pigmentos fotosintéticos están en la membrana tilacoidal, donde se capta la luz y se produce ATP y NADPH. El ciclo de Calvin ocurre después, en el estroma.',
  },
  {
    id: 'bio-028',
    topic: 'Metabolismo',
    difficulty: 'medio',
    prompt: 'La glucólisis ocurre en el citoplasma y transforma una molécula de glucosa en:',
    options: [
      '2 moléculas de ácido pirúvico',
      '6 moléculas de CO₂',
      '1 molécula de lactato y agua',
      '2 moléculas de acetil-CoA y 6 ATP',
    ],
    answer: 0,
    explanation:
      'La glucólisis rompe la glucosa de 6 carbonos en dos piruvatos de 3 carbonos, con una ganancia neta de 2 ATP y 2 NADH. No requiere oxígeno.',
  },
  {
    id: 'bio-029',
    topic: 'Metabolismo',
    difficulty: 'dificil',
    prompt: 'El ciclo de Krebs se desarrolla en:',
    options: [
      'El citoplasma celular',
      'La matriz mitocondrial',
      'La membrana externa de la mitocondria',
      'El retículo endoplasmático',
    ],
    answer: 1,
    explanation:
      'El ciclo de Krebs ocurre en la matriz mitocondrial. La cadena transportadora de electrones, en cambio, se ubica en la membrana mitocondrial interna.',
  },
  {
    id: 'bio-030',
    topic: 'Metabolismo',
    difficulty: 'medio',
    prompt: 'Las enzimas aceleran las reacciones químicas porque:',
    options: [
      'Aumentan la temperatura del medio',
      'Disminuyen la energía de activación',
      'Se consumen durante la reacción',
      'Cambian el producto final de la reacción',
    ],
    answer: 1,
    explanation:
      'Las enzimas son catalizadores de naturaleza proteica: bajan la barrera energética necesaria, no se consumen y no alteran el producto obtenido.',
  },
  {
    id: 'bio-031',
    topic: 'Anatomía y fisiología',
    difficulty: 'facil',
    prompt: 'El transporte de oxígeno en la sangre lo realiza principalmente:',
    options: ['El plasma', 'La hemoglobina de los glóbulos rojos', 'Los leucocitos', 'Las plaquetas'],
    answer: 1,
    explanation:
      'La hemoglobina, una proteína con hierro presente en los eritrocitos, fija el oxígeno en los pulmones y lo libera en los tejidos.',
  },
  {
    id: 'bio-032',
    topic: 'Anatomía y fisiología',
    difficulty: 'medio',
    prompt: 'La insulina es una hormona producida por el páncreas cuya función es:',
    options: [
      'Aumentar la glucosa en la sangre',
      'Disminuir la glucosa en la sangre facilitando su entrada a las células',
      'Regular el calcio de los huesos',
      'Estimular la producción de glóbulos rojos',
    ],
    answer: 1,
    explanation:
      'La insulina permite que la glucosa ingrese a las células y así baja su nivel en sangre. Su antagonista es el glucagón, que la eleva.',
  },
  {
    id: 'bio-033',
    topic: 'Anatomía y fisiología',
    difficulty: 'facil',
    prompt: 'En la neurona, la prolongación larga que conduce el impulso nervioso hacia otra célula se llama:',
    options: ['Dendrita', 'Axón', 'Soma', 'Sinapsis'],
    answer: 1,
    explanation:
      'Las dendritas reciben la señal, el soma la integra y el axón la conduce hasta el botón terminal, donde ocurre la sinapsis.',
  },
  {
    id: 'bio-034',
    topic: 'Producción animal',
    difficulty: 'medio',
    prompt: 'El estómago de los rumiantes tiene cuatro compartimentos. El de mayor volumen, donde ocurre la fermentación microbiana, es:',
    options: ['El retículo', 'El omaso', 'El rumen', 'El abomaso'],
    answer: 2,
    explanation:
      'El rumen es el compartimento más grande y funciona como una cuba de fermentación. El abomaso es el estómago verdadero, con secreción de jugos gástricos.',
  },
  {
    id: 'bio-035',
    topic: 'Producción animal',
    difficulty: 'medio',
    prompt: 'Los rumiantes pueden aprovechar la celulosa del pasto porque:',
    options: [
      'Producen celulasa en el páncreas',
      'Albergan microorganismos simbióticos que la degradan',
      'La absorben directamente sin digerirla',
      'La transforman en almidón en la boca',
    ],
    answer: 1,
    explanation:
      'Ningún mamífero produce celulasa. Bacterias, protozoos y hongos del rumen fermentan la celulosa y liberan ácidos grasos volátiles que el animal usa como energía.',
  },
  {
    id: 'bio-036',
    topic: 'Ecología',
    difficulty: 'facil',
    prompt: 'En una cadena trófica, las plantas verdes ocupan el nivel de:',
    options: ['Consumidores primarios', 'Productores', 'Descomponedores', 'Consumidores secundarios'],
    answer: 1,
    explanation:
      'Los organismos autótrofos fabrican su alimento mediante fotosíntesis y son la base de la cadena. Los herbívoros que los comen son los consumidores primarios.',
  },
  {
    id: 'bio-037',
    topic: 'Ecología',
    difficulty: 'medio',
    prompt: 'Al pasar de un nivel trófico al siguiente, la energía disponible se reduce aproximadamente a:',
    options: ['El 50 %', 'El 10 %', 'El 90 %', 'El 100 %, se conserva íntegra'],
    answer: 1,
    explanation:
      'La regla del 10 % indica que solo esa fracción de la energía se incorpora al siguiente nivel; el resto se pierde como calor y en el metabolismo. Por eso las cadenas son cortas.',
  },
  {
    id: 'bio-038',
    topic: 'Ecología',
    difficulty: 'medio',
    prompt: 'Las bacterias del género Rhizobium, presentes en los nódulos de las raíces de las leguminosas, cumplen la función de:',
    options: [
      'Fijar el nitrógeno atmosférico y ponerlo a disposición de la planta',
      'Descomponer la celulosa del suelo',
      'Producir oxígeno para la raíz',
      'Absorber el fósforo del subsuelo',
    ],
    answer: 0,
    explanation:
      'Rhizobium vive en simbiosis con las leguminosas y transforma el N₂ del aire en compuestos asimilables. Por eso la alfalfa o la soya enriquecen el suelo, algo clave en pastoreo y rotación.',
  },
  {
    id: 'bio-039',
    topic: 'Evolución',
    difficulty: 'facil',
    prompt: 'Según la teoría de Darwin, el motor principal de la evolución de las especies es:',
    options: [
      'El uso y desuso de los órganos',
      'La selección natural',
      'La voluntad de adaptarse al medio',
      'La generación espontánea',
    ],
    answer: 1,
    explanation:
      'Darwin propuso que los individuos con variaciones ventajosas sobreviven y se reproducen más. El uso y desuso corresponde a la hipótesis de Lamarck.',
  },
  {
    id: 'bio-040',
    topic: 'Clasificación',
    difficulty: 'medio',
    prompt: 'El orden correcto de las categorías taxonómicas, de mayor a menor, es:',
    options: [
      'Reino, filo, clase, orden, familia, género, especie',
      'Reino, clase, filo, familia, orden, especie, género',
      'Especie, género, familia, orden, clase, filo, reino',
      'Filo, reino, orden, clase, género, familia, especie',
    ],
    answer: 0,
    explanation:
      'De lo más general a lo más específico: dominio, reino, filo, clase, orden, familia, género y especie.',
  },
  {
    id: 'bio-041',
    topic: 'Clasificación',
    difficulty: 'medio',
    prompt: 'El nombre científico del ganado bovino es Bos taurus. Los términos Bos y taurus corresponden respectivamente a:',
    options: ['Familia y orden', 'Género y especie', 'Especie y variedad', 'Clase y familia'],
    answer: 1,
    explanation:
      'Linneo estableció que el primer término, con mayúscula, es el género y el segundo, en minúscula, el epíteto específico. El conjunto se escribe en cursiva o subrayado.',
  },
  {
    id: 'bio-042',
    topic: 'Microbiología',
    difficulty: 'medio',
    prompt: 'Los virus no se consideran organismos celulares porque:',
    options: [
      'No tienen material genético',
      'Carecen de estructura celular y de metabolismo propio',
      'Son más grandes que las bacterias',
      'Solo existen en condiciones de laboratorio',
    ],
    answer: 1,
    explanation:
      'Un virus es ácido nucleico envuelto en una cápside proteica. No realiza metabolismo ni se reproduce por sí mismo: necesita obligatoriamente una célula hospedadora.',
  },
]

export const biologia = build('biologia', drafts)
