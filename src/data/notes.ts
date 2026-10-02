import type { SubjectId } from '../types'

export type NoteBlock =
  | { kind: 'text'; value: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'formulas'; items: { name: string; formula: string; note?: string }[] }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'timeline'; items: { when: string; what: string }[] }

export interface NoteCard {
  id: string
  subject: SubjectId
  title: string
  summary: string
  blocks: NoteBlock[]
}

export const NOTES: NoteCard[] = [
  // ── Biología ────────────────────────────────────────────────────────────────
  {
    id: 'nota-bio-celula',
    subject: 'biologia',
    title: 'La célula y sus organelos',
    summary: 'Quién hace qué dentro de la célula, y qué distingue a vegetales de animales.',
    blocks: [
      {
        kind: 'table',
        head: ['Organelo', 'Función'],
        rows: [
          ['Núcleo', 'Guarda el ADN y dirige la actividad celular'],
          ['Mitocondria', 'Respiración celular: produce ATP'],
          ['Ribosoma', 'Síntesis de proteínas'],
          ['Retículo rugoso', 'Proteínas de exportación (tiene ribosomas)'],
          ['Retículo liso', 'Síntesis de lípidos y detoxificación'],
          ['Aparato de Golgi', 'Modifica, empaqueta y distribuye'],
          ['Lisosoma', 'Digestión celular (enzimas hidrolíticas)'],
          ['Cloroplasto', 'Fotosíntesis (solo vegetal)'],
          ['Vacuola central', 'Reserva de agua y turgencia (solo vegetal)'],
          ['Pared celular', 'Sostén, de celulosa (solo vegetal)'],
        ],
      },
      {
        kind: 'list',
        items: [
          'Procariota: sin núcleo definido, ADN circular libre, ribosomas 70S. Bacterias y arqueas.',
          'Eucariota: núcleo con membrana y organelos membranosos. Protistas, hongos, plantas y animales.',
          'Niveles de organización: célula → tejido → órgano → sistema → organismo.',
        ],
      },
    ],
  },
  {
    id: 'nota-bio-genetica',
    subject: 'biologia',
    title: 'Genética y leyes de Mendel',
    summary: 'Cuadro de Punnett, proporciones clásicas y vocabulario que siempre cae.',
    blocks: [
      {
        kind: 'list',
        items: [
          'Gen: fragmento de ADN que codifica un carácter. Alelo: cada versión del gen.',
          'Genotipo: los alelos que el individuo posee (AA, Aa, aa). Fenotipo: lo que se observa.',
          'Homocigoto: dos alelos iguales. Heterocigoto: dos alelos distintos.',
          '1.ª ley (segregación): los alelos se separan al formar los gametos.',
          '2.ª ley (distribución independiente): caracteres en cromosomas distintos se heredan por separado.',
        ],
      },
      {
        kind: 'table',
        head: ['Cruce', 'Genotipos', 'Fenotipos'],
        rows: [
          ['AA × aa', '100 % Aa', '100 % dominante'],
          ['Aa × Aa', '1 AA : 2 Aa : 1 aa', '3 dominante : 1 recesivo'],
          ['Aa × aa', '1 Aa : 1 aa', '1 dominante : 1 recesivo'],
          ['AaBb × AaBb', '—', '9 : 3 : 3 : 1'],
        ],
      },
      {
        kind: 'text',
        value:
          'Truco: en el cuadro de Punnett, escribe los gametos de un progenitor en la fila superior y los del otro en la columna izquierda; cada casilla es un descendiente posible.',
      },
    ],
  },
  {
    id: 'nota-bio-metabolismo',
    subject: 'biologia',
    title: 'Fotosíntesis y respiración celular',
    summary: 'Las dos rutas energéticas, con su lugar exacto dentro de la célula.',
    blocks: [
      {
        kind: 'formulas',
        items: [
          { name: 'Fotosíntesis', formula: '6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂', note: 'Cloroplasto' },
          { name: 'Respiración aerobia', formula: 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ATP', note: 'Mitocondria' },
        ],
      },
      {
        kind: 'table',
        head: ['Etapa', 'Dónde ocurre', 'Resultado clave'],
        rows: [
          ['Fase luminosa', 'Membrana del tilacoide', 'ATP, NADPH y O₂'],
          ['Ciclo de Calvin', 'Estroma del cloroplasto', 'Glucosa'],
          ['Glucólisis', 'Citoplasma', '2 piruvato + 2 ATP netos'],
          ['Ciclo de Krebs', 'Matriz mitocondrial', 'NADH, FADH₂, CO₂'],
          ['Cadena de electrones', 'Membrana mitocondrial interna', 'La mayor parte del ATP'],
        ],
      },
    ],
  },
  {
    id: 'nota-bio-rumiantes',
    subject: 'biologia',
    title: 'Digestión de los rumiantes',
    summary: 'Base fisiológica de Zootecnia: por qué una vaca vive del pasto.',
    blocks: [
      {
        kind: 'table',
        head: ['Compartimento', 'Función'],
        rows: [
          ['Rumen', 'Fermentación microbiana; el de mayor volumen'],
          ['Retículo', 'Retiene partículas grandes y las devuelve a la boca (rumia)'],
          ['Omaso', 'Absorbe agua y reduce el tamaño de partícula'],
          ['Abomaso', 'Estómago verdadero: jugos gástricos y digestión enzimática'],
        ],
      },
      {
        kind: 'list',
        items: [
          'Ningún mamífero produce celulasa: la celulosa la degradan bacterias, protozoos y hongos del rumen.',
          'Producto principal de la fermentación: ácidos grasos volátiles (acético, propiónico, butírico), que aportan la energía.',
          'Subproducto: metano, gas de efecto invernadero, aprovechable en biodigestores.',
        ],
      },
    ],
  },

  // ── Química ─────────────────────────────────────────────────────────────────
  {
    id: 'nota-qui-tabla',
    subject: 'quimica',
    title: 'Tabla periódica: primeros 20 elementos',
    summary: 'Símbolos, número atómico y valencia habitual, para no dudar en el examen.',
    blocks: [
      {
        kind: 'table',
        head: ['Z', 'Símbolo', 'Nombre', 'Valencia usual'],
        rows: [
          ['1', 'H', 'Hidrógeno', '+1'],
          ['2', 'He', 'Helio', '0'],
          ['3', 'Li', 'Litio', '+1'],
          ['4', 'Be', 'Berilio', '+2'],
          ['5', 'B', 'Boro', '+3'],
          ['6', 'C', 'Carbono', '±4'],
          ['7', 'N', 'Nitrógeno', '−3'],
          ['8', 'O', 'Oxígeno', '−2'],
          ['9', 'F', 'Flúor', '−1'],
          ['10', 'Ne', 'Neón', '0'],
          ['11', 'Na', 'Sodio', '+1'],
          ['12', 'Mg', 'Magnesio', '+2'],
          ['13', 'Al', 'Aluminio', '+3'],
          ['14', 'Si', 'Silicio', '+4'],
          ['15', 'P', 'Fósforo', '−3 / +5'],
          ['16', 'S', 'Azufre', '−2 / +6'],
          ['17', 'Cl', 'Cloro', '−1'],
          ['18', 'Ar', 'Argón', '0'],
          ['19', 'K', 'Potasio', '+1'],
          ['20', 'Ca', 'Calcio', '+2'],
        ],
      },
      {
        kind: 'list',
        items: [
          'Grupo 1: metales alcalinos. Grupo 2: alcalinotérreos. Grupo 17: halógenos. Grupo 18: gases nobles.',
          'De izquierda a derecha en un periodo: el radio atómico baja y la electronegatividad sube.',
          'De arriba abajo en un grupo: el radio atómico sube y la electronegatividad baja.',
          'El más electronegativo es el flúor (4,0 en la escala de Pauling).',
        ],
      },
    ],
  },
  {
    id: 'nota-qui-calculos',
    subject: 'quimica',
    title: 'Mol, masa molar y concentración',
    summary: 'Las cuatro fórmulas con las que se resuelve casi todo cálculo del examen.',
    blocks: [
      {
        kind: 'formulas',
        items: [
          { name: 'Número de moles', formula: 'n = m / M', note: 'm en gramos, M masa molar en g/mol' },
          { name: 'Número de partículas', formula: 'N = n × 6,022 × 10²³', note: 'Número de Avogadro' },
          { name: 'Molaridad', formula: 'M = n / V', note: 'V en litros de disolución' },
          { name: 'pH', formula: 'pH = −log[H⁺]', note: 'pH + pOH = 14' },
          { name: 'Gases ideales', formula: 'P · V = n · R · T', note: 'R = 0,082 atm·L/(mol·K)' },
        ],
      },
      {
        kind: 'text',
        value:
          'Escala de pH: 0 a 6 ácido · 7 neutro · 8 a 14 básico. Cada unidad de pH equivale a multiplicar por 10 la concentración de H⁺.',
      },
    ],
  },
  {
    id: 'nota-qui-enlaces',
    subject: 'quimica',
    title: 'Enlaces y tipos de reacción',
    summary: 'Cómo reconocer el enlace de un compuesto y clasificar una ecuación.',
    blocks: [
      {
        kind: 'table',
        head: ['Enlace', 'Se forma entre', 'Ejemplo'],
        rows: [
          ['Iónico', 'Metal + no metal (transferencia)', 'NaCl'],
          ['Covalente apolar', 'No metales iguales', 'O₂, H₂'],
          ['Covalente polar', 'No metales distintos', 'H₂O, HCl'],
          ['Metálico', 'Metal + metal (mar de electrones)', 'Cu, Fe'],
        ],
      },
      {
        kind: 'table',
        head: ['Tipo de reacción', 'Esquema'],
        rows: [
          ['Síntesis o combinación', 'A + B → AB'],
          ['Descomposición', 'AB → A + B'],
          ['Sustitución simple', 'A + BC → AC + B'],
          ['Doble sustitución', 'AB + CD → AD + CB'],
          ['Neutralización', 'Ácido + base → sal + agua'],
          ['Combustión', 'Hidrocarburo + O₂ → CO₂ + H₂O'],
        ],
      },
    ],
  },

  // ── Matemáticas ─────────────────────────────────────────────────────────────
  {
    id: 'nota-mat-algebra',
    subject: 'matematicas',
    title: 'Álgebra: productos notables y cuadrática',
    summary: 'Identidades que hay que reconocer de un vistazo.',
    blocks: [
      {
        kind: 'formulas',
        items: [
          { name: 'Binomio al cuadrado', formula: '(a ± b)² = a² ± 2ab + b²' },
          { name: 'Diferencia de cuadrados', formula: 'a² − b² = (a + b)(a − b)' },
          { name: 'Binomio al cubo', formula: '(a + b)³ = a³ + 3a²b + 3ab² + b³' },
          { name: 'Fórmula general', formula: 'x = [−b ± √(b² − 4ac)] / 2a' },
          { name: 'Discriminante', formula: 'Δ = b² − 4ac', note: 'Δ > 0: dos raíces · Δ = 0: una · Δ < 0: ninguna real' },
        ],
      },
      {
        kind: 'list',
        items: [
          'Leyes de exponentes: aᵐ · aⁿ = aᵐ⁺ⁿ · aᵐ / aⁿ = aᵐ⁻ⁿ · (aᵐ)ⁿ = aᵐⁿ · a⁰ = 1 · a⁻ⁿ = 1/aⁿ',
          'Pendiente entre dos puntos: m = (y₂ − y₁) / (x₂ − x₁).',
          'Recta: y = mx + b, donde b es el corte con el eje y.',
        ],
      },
    ],
  },
  {
    id: 'nota-mat-geometria',
    subject: 'matematicas',
    title: 'Geometría y trigonometría',
    summary: 'Áreas, volúmenes y valores notables listos para usar.',
    blocks: [
      {
        kind: 'table',
        head: ['Figura', 'Área', 'Perímetro / Volumen'],
        rows: [
          ['Triángulo', 'b · h / 2', 'suma de los lados'],
          ['Rectángulo', 'b · h', '2(b + h)'],
          ['Círculo', 'π r²', 'Circunferencia: 2π r'],
          ['Trapecio', '(B + b) · h / 2', '—'],
          ['Cubo', '6 a² (total)', 'V = a³'],
          ['Cilindro', '2π r (r + h)', 'V = π r² h'],
          ['Cono', '—', 'V = π r² h / 3'],
          ['Esfera', '4π r²', 'V = 4π r³ / 3'],
        ],
      },
      {
        kind: 'table',
        head: ['Ángulo', 'sen', 'cos', 'tan'],
        rows: [
          ['0°', '0', '1', '0'],
          ['30°', '1/2', '√3/2', '√3/3'],
          ['45°', '√2/2', '√2/2', '1'],
          ['60°', '√3/2', '1/2', '√3'],
          ['90°', '1', '0', 'no definida'],
        ],
      },
      {
        kind: 'formulas',
        items: [
          { name: 'Pitágoras', formula: 'h² = c₁² + c₂²' },
          { name: 'Razones', formula: 'sen = op/hip · cos = ady/hip · tan = op/ady' },
        ],
      },
    ],
  },

  // ── Física ──────────────────────────────────────────────────────────────────
  {
    id: 'nota-fis-formulas',
    subject: 'fisica',
    title: 'Formulario de física',
    summary: 'Cinemática, dinámica, energía y electricidad en una sola ficha.',
    blocks: [
      {
        kind: 'formulas',
        items: [
          { name: 'MRU', formula: 'v = d / t' },
          { name: 'Aceleración', formula: 'a = (v_f − v_0) / t' },
          { name: 'MRUV (posición)', formula: 'd = v₀t + ½ a t²' },
          { name: 'MRUV (sin tiempo)', formula: 'v_f² = v₀² + 2ad' },
          { name: 'Segunda ley de Newton', formula: 'F = m · a', note: '1 N = 1 kg·m/s²' },
          { name: 'Peso', formula: 'P = m · g', note: 'g ≈ 9,8 m/s²' },
          { name: 'Trabajo', formula: 'W = F · d · cos θ', note: 'en joules' },
          { name: 'Potencia', formula: 'P = W / t', note: 'en watts' },
          { name: 'Energía cinética', formula: 'Ec = ½ m v²' },
          { name: 'Energía potencial', formula: 'Ep = m · g · h' },
          { name: 'Presión', formula: 'p = F / A', note: '1 Pa = 1 N/m²' },
          { name: 'Densidad', formula: 'ρ = m / V' },
          { name: 'Ley de Ohm', formula: 'V = I · R' },
          { name: 'Potencia eléctrica', formula: 'P = V · I = I² R' },
          { name: 'Velocidad de onda', formula: 'v = λ · f' },
        ],
      },
      {
        kind: 'list',
        items: [
          'Escalares: masa, tiempo, temperatura, energía. Vectoriales: velocidad, aceleración, fuerza.',
          'Circuito en serie: misma corriente, R_total = R₁ + R₂.',
          'Circuito en paralelo: mismo voltaje, 1/R_total = 1/R₁ + 1/R₂.',
          'Velocidad del sonido en aire ≈ 340 m/s. Velocidad de la luz ≈ 3 × 10⁸ m/s.',
        ],
      },
    ],
  },

  // ── Lengua ──────────────────────────────────────────────────────────────────
  {
    id: 'nota-len-textos',
    subject: 'lengua',
    title: 'Tipos de texto y conectores',
    summary: 'Identificar la intención del texto es la mitad de la pregunta resuelta.',
    blocks: [
      {
        kind: 'table',
        head: ['Tipo', 'Intención', 'Ejemplo'],
        rows: [
          ['Narrativo', 'Contar hechos en el tiempo', 'Cuento, novela, crónica'],
          ['Descriptivo', 'Decir cómo es algo', 'Retrato, catálogo'],
          ['Expositivo', 'Informar de forma objetiva', 'Texto escolar, noticia'],
          ['Argumentativo', 'Convencer con razones', 'Ensayo, editorial'],
          ['Instructivo', 'Indicar cómo hacer algo', 'Receta, manual'],
        ],
      },
      {
        kind: 'table',
        head: ['Relación', 'Conectores'],
        rows: [
          ['Adición', 'además, también, asimismo'],
          ['Oposición', 'pero, sin embargo, no obstante, en cambio'],
          ['Causa', 'porque, ya que, debido a'],
          ['Consecuencia', 'por lo tanto, en consecuencia, así que'],
          ['Orden', 'en primer lugar, luego, finalmente'],
        ],
      },
    ],
  },
  {
    id: 'nota-len-figuras',
    subject: 'lengua',
    title: 'Figuras literarias y acentuación',
    summary: 'Las figuras más preguntadas y las tres reglas de tilde.',
    blocks: [
      {
        kind: 'table',
        head: ['Figura', 'En qué consiste', 'Ejemplo'],
        rows: [
          ['Metáfora', 'Identifica un término con otro', 'Sus dientes son perlas'],
          ['Símil', 'Compara con nexo', 'Fuerte como un roble'],
          ['Hipérbole', 'Exagera', 'Te lo dije un millón de veces'],
          ['Personificación', 'Da rasgos humanos', 'El viento susurraba'],
          ['Anáfora', 'Repite al inicio de versos', 'Aquí… aquí… aquí…'],
          ['Hipérbaton', 'Altera el orden lógico', 'Del salón en el ángulo oscuro'],
          ['Metonimia', 'Nombra por proximidad', 'Leí a Icaza'],
        ],
      },
      {
        kind: 'list',
        items: [
          'Agudas: acento en la última sílaba. Llevan tilde si terminan en n, s o vocal (canción, además, café).',
          'Graves: acento en la penúltima. Llevan tilde si NO terminan en n, s o vocal (árbol, lápiz).',
          'Esdrújulas y sobresdrújulas: siempre llevan tilde (médico, dígamelo).',
          'Tilde diacrítica: tú/tu · él/el · mí/mi · sí/si · más/mas · dé/de · sé/se · té/te.',
        ],
      },
    ],
  },
  {
    id: 'nota-len-literatura',
    subject: 'lengua',
    title: 'Literatura ecuatoriana y latinoamericana',
    summary: 'Obras y autores que se repiten en las pruebas de admisión.',
    blocks: [
      {
        kind: 'table',
        head: ['Obra', 'Autor', 'Clave'],
        rows: [
          ['Cumandá (1879)', 'Juan León Mera', 'Romanticismo, Amazonía'],
          ['Huasipungo (1934)', 'Jorge Icaza', 'Indigenismo ecuatoriano'],
          ['Los que se van (1930)', 'Grupo de Guayaquil', 'Realismo social'],
          ['Los Sangurimas (1934)', 'José de la Cuadra', 'Realismo mágico temprano'],
          ['Siete lunas y siete serpientes', 'Demetrio Aguilera Malta', 'Realismo mágico'],
          ['Azul (1888)', 'Rubén Darío', 'Modernismo hispanoamericano'],
          ['Cien años de soledad (1967)', 'Gabriel García Márquez', 'Realismo mágico, Macondo'],
          ['Rayuela (1963)', 'Julio Cortázar', 'Boom, novela experimental'],
          ['Veinte poemas de amor (1924)', 'Pablo Neruda', 'Nobel 1971'],
        ],
      },
      {
        kind: 'list',
        items: [
          'Generación decapitada: Medardo Ángel Silva, Arturo Borja, Ernesto Noboa y Caamaño, Humberto Fierro (modernismo).',
          'Boom latinoamericano: años sesenta; García Márquez, Vargas Llosa, Cortázar, Fuentes.',
          'Géneros: narrativo (cuenta), lírico (expresa sentimientos), dramático (se representa).',
        ],
      },
    ],
  },

  // ── Historia ────────────────────────────────────────────────────────────────
  {
    id: 'nota-his-linea',
    subject: 'historia',
    title: 'Línea de tiempo esencial',
    summary: 'De Mesopotamia a la Constitución de Montecristi, en fechas ancla.',
    blocks: [
      {
        kind: 'timeline',
        items: [
          { when: '3500 a. C.', what: 'Escritura cuneiforme en Sumeria: comienza la Historia' },
          { when: 's. XVIII a. C.', what: 'Código de Hammurabi en Babilonia' },
          { when: 's. V a. C.', what: 'Democracia ateniense, siglo de Pericles' },
          { when: '476 d. C.', what: 'Caída del Imperio Romano de Occidente: fin de la Edad Antigua' },
          { when: '1453', what: 'Caída de Constantinopla: fin de la Edad Media' },
          { when: '1492', what: 'Llegada de Colón a América' },
          { when: '1789', what: 'Revolución Francesa: toma de la Bastilla el 14 de julio' },
          { when: '1809', what: 'Primer Grito de Independencia en Quito, 10 de agosto' },
          { when: '1820', what: 'Independencia de Guayaquil, 9 de octubre' },
          { when: '1822', what: 'Batalla del Pichincha, 24 de mayo' },
          { when: '1830', what: 'Ecuador se separa de la Gran Colombia' },
          { when: '1895', what: 'Revolución Liberal de Eloy Alfaro' },
          { when: '1914-1918', what: 'Primera Guerra Mundial' },
          { when: '1939-1945', what: 'Segunda Guerra Mundial' },
          { when: '1948', what: 'Declaración Universal de los Derechos Humanos' },
          { when: '2008', what: 'Constitución de Montecristi' },
        ],
      },
    ],
  },
  {
    id: 'nota-his-ciudadania',
    subject: 'historia',
    title: 'Estado ecuatoriano y ciudadanía',
    summary: 'Las cinco funciones del Estado y los derechos que suelen preguntarse.',
    blocks: [
      {
        kind: 'table',
        head: ['Función del Estado', 'Órgano principal'],
        rows: [
          ['Ejecutiva', 'Presidencia de la República'],
          ['Legislativa', 'Asamblea Nacional'],
          ['Judicial', 'Corte Nacional de Justicia'],
          ['Electoral', 'CNE y Tribunal Contencioso Electoral'],
          ['Transparencia y Control Social', 'CPCCS, Contraloría, superintendencias'],
        ],
      },
      {
        kind: 'list',
        items: [
          'Ecuador es un Estado constitucional de derechos y justicia, intercultural y plurinacional (Const. 2008).',
          'Voto obligatorio de 18 a 65 años; facultativo a los 16 y 17, y para mayores de 65.',
          'La Constitución de 2008 reconoce derechos propios a la naturaleza (Pacha Mama).',
          'Sumak Kawsay o Buen Vivir: vida en armonía con la comunidad y la naturaleza.',
        ],
      },
    ],
  },

  // ── Emprendimiento ──────────────────────────────────────────────────────────
  {
    id: 'nota-emp-canvas',
    subject: 'emprendimiento',
    title: 'Modelo Canvas y FODA',
    summary: 'Los nueve bloques del modelo de negocio y la matriz de diagnóstico.',
    blocks: [
      {
        kind: 'list',
        items: [
          'Canvas: segmentos de clientes · propuesta de valor · canales · relación con clientes · fuentes de ingresos · recursos clave · actividades clave · socios clave · estructura de costos.',
          'FODA interno: Fortalezas y Debilidades. FODA externo: Oportunidades y Amenazas.',
          'Marketing mix (4P): Producto, Precio, Plaza, Promoción.',
          'Proceso administrativo: planificar, organizar, dirigir y controlar.',
        ],
      },
    ],
  },
  {
    id: 'nota-emp-formulas',
    subject: 'emprendimiento',
    title: 'Cálculos de costos y contabilidad',
    summary: 'Punto de equilibrio, utilidad y la ecuación contable.',
    blocks: [
      {
        kind: 'formulas',
        items: [
          { name: 'Ecuación contable', formula: 'Activo = Pasivo + Patrimonio' },
          { name: 'Utilidad', formula: 'Utilidad = Ingresos − Costos totales' },
          { name: 'Costo total', formula: 'CT = Costos fijos + Costos variables' },
          { name: 'Margen de contribución', formula: 'MC = Precio de venta − Costo variable unitario' },
          { name: 'Punto de equilibrio', formula: 'PE = Costos fijos / MC', note: 'en unidades' },
          { name: 'Margen de utilidad', formula: '(Utilidad / Ingresos) × 100', note: 'en porcentaje' },
        ],
      },
      {
        kind: 'list',
        items: [
          'Costo fijo: no cambia con la producción (arriendo, sueldos administrativos).',
          'Costo variable: cambia con la producción (materia prima, balanceado, empaques).',
          'Balance general: foto de una fecha. Estado de resultados: película de un período.',
          'En Ecuador: el SRI administra los tributos; el RUC identifica a quien hace actividad económica.',
        ],
      },
    ],
  },
]

export const notesOf = (subject: SubjectId): NoteCard[] => NOTES.filter((n) => n.subject === subject)
