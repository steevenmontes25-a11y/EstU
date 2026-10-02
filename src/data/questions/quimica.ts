import { build, type QDraft } from './helpers'

const drafts: QDraft[] = [
  {
    id: 'qui-001',
    topic: 'Estructura atómica',
    difficulty: 'facil',
    prompt: 'El número atómico (Z) de un elemento indica la cantidad de:',
    options: ['Neutrones del núcleo', 'Protones del núcleo', 'Electrones de valencia', 'Nucleones totales'],
    answer: 1,
    explanation:
      'El número atómico es el número de protones y define la identidad del elemento. En un átomo neutro coincide además con el número de electrones.',
  },
  {
    id: 'qui-002',
    topic: 'Estructura atómica',
    difficulty: 'facil',
    prompt: 'El número másico (A) de un átomo corresponde a la suma de:',
    options: [
      'Protones y electrones',
      'Protones y neutrones',
      'Neutrones y electrones',
      'Electrones de la última capa',
    ],
    answer: 1,
    explanation:
      'A = Z + N. Los electrones tienen una masa despreciable frente a la de los nucleones, por eso no se cuentan en el número másico.',
  },
  {
    id: 'qui-003',
    topic: 'Estructura atómica',
    difficulty: 'medio',
    prompt: 'Dos isótopos del mismo elemento se diferencian en:',
    options: [
      'El número de protones',
      'El número de neutrones',
      'El número de electrones de valencia',
      'Su símbolo químico',
    ],
    answer: 1,
    explanation:
      'Los isótopos comparten el número atómico pero tienen distinto número de neutrones, y por tanto distinta masa. El carbono-12 y el carbono-14 son un ejemplo clásico.',
  },
  {
    id: 'qui-004',
    topic: 'Estructura atómica',
    difficulty: 'medio',
    prompt: 'La configuración electrónica del oxígeno (Z = 8) es:',
    options: ['1s² 2s² 2p⁴', '1s² 2s² 2p⁶', '1s² 2s⁴ 2p²', '1s² 2p⁶'],
    answer: 0,
    explanation:
      'Se llenan los orbitales por orden de energía: 1s² (2 e⁻), 2s² (2 e⁻) y 2p⁴ (4 e⁻), lo que suma los 8 electrones del oxígeno.',
  },
  {
    id: 'qui-005',
    topic: 'Estructura atómica',
    difficulty: 'medio',
    prompt: 'Un átomo que pierde un electrón se convierte en:',
    options: ['Un anión con carga negativa', 'Un catión con carga positiva', 'Un isótopo', 'Un elemento distinto'],
    answer: 1,
    explanation:
      'Al perder carga negativa queda un exceso de protones, es decir un ion positivo o catión. Ganar electrones produce aniones. El elemento no cambia porque Z se mantiene.',
  },
  {
    id: 'qui-006',
    topic: 'Tabla periódica',
    difficulty: 'facil',
    prompt: 'Los elementos del grupo 1 de la tabla periódica se conocen como:',
    options: ['Halógenos', 'Gases nobles', 'Metales alcalinos', 'Metales alcalinotérreos'],
    answer: 2,
    explanation:
      'Litio, sodio y potasio, entre otros, forman los metales alcalinos: tienen un electrón de valencia y son muy reactivos. Los alcalinotérreos son el grupo 2.',
  },
  {
    id: 'qui-007',
    topic: 'Tabla periódica',
    difficulty: 'facil',
    prompt: 'Los elementos del grupo 17 (F, Cl, Br, I) reciben el nombre de:',
    options: ['Halógenos', 'Calcógenos', 'Gases nobles', 'Lantánidos'],
    answer: 0,
    explanation:
      'Los halógenos tienen 7 electrones de valencia, por eso ganan uno con facilidad para completar el octeto y son muy reactivos.',
  },
  {
    id: 'qui-008',
    topic: 'Tabla periódica',
    difficulty: 'facil',
    prompt: 'Los gases nobles son poco reactivos porque:',
    options: [
      'Tienen un solo electrón de valencia',
      'Su último nivel de energía está completo',
      'Son metales pesados',
      'No poseen electrones',
    ],
    answer: 1,
    explanation:
      'Con el octeto completo (o dos electrones en el caso del helio) no necesitan ganar ni ceder electrones, y por eso casi no forman compuestos.',
  },
  {
    id: 'qui-009',
    topic: 'Tabla periódica',
    difficulty: 'facil',
    prompt: 'El símbolo químico del sodio es:',
    options: ['So', 'Sd', 'Na', 'S'],
    answer: 2,
    explanation:
      'El símbolo Na viene del latín natrium. Cuidado con confundirlo con S (azufre) o con K, que es el potasio (kalium).',
  },
  {
    id: 'qui-010',
    topic: 'Tabla periódica',
    difficulty: 'dificil',
    prompt: 'Al recorrer un periodo de izquierda a derecha en la tabla periódica, el radio atómico:',
    options: [
      'Aumenta, porque se agregan electrones',
      'Disminuye, porque aumenta la carga nuclear efectiva',
      'Permanece constante',
      'Aumenta solo en los metales',
    ],
    answer: 1,
    explanation:
      'Se agregan electrones al mismo nivel, pero también protones al núcleo. La mayor atracción nuclear contrae la nube electrónica, así que el radio disminuye hacia la derecha.',
  },
  {
    id: 'qui-011',
    topic: 'Tabla periódica',
    difficulty: 'medio',
    prompt: 'El elemento con mayor electronegatividad de la tabla periódica es:',
    options: ['El oxígeno', 'El flúor', 'El cloro', 'El cesio'],
    answer: 1,
    explanation:
      'El flúor tiene una electronegatividad de 4,0 en la escala de Pauling. La electronegatividad crece hacia la derecha y hacia arriba en la tabla.',
  },
  {
    id: 'qui-012',
    topic: 'Enlace químico',
    difficulty: 'facil',
    prompt: 'El enlace iónico se forma característicamente entre:',
    options: [
      'Dos no metales que comparten electrones',
      'Un metal y un no metal, con transferencia de electrones',
      'Dos metales que ceden electrones a la vez',
      'Dos gases nobles',
    ],
    answer: 1,
    explanation:
      'El metal cede electrones y forma un catión, el no metal los capta y forma un anión. La atracción electrostática entre ambos es el enlace iónico.',
  },
  {
    id: 'qui-013',
    topic: 'Enlace químico',
    difficulty: 'facil',
    prompt: 'En el enlace covalente los átomos:',
    options: [
      'Transfieren electrones definitivamente',
      'Comparten uno o más pares de electrones',
      'Intercambian protones',
      'Se unen por atracción magnética',
    ],
    answer: 1,
    explanation:
      'Ocurre típicamente entre no metales de electronegatividad parecida. Si la diferencia de electronegatividad es apreciable, el enlace covalente es polar.',
  },
  {
    id: 'qui-014',
    topic: 'Enlace químico',
    difficulty: 'medio',
    prompt: '¿Cuál de las siguientes sustancias presenta enlace iónico?',
    options: ['H₂O', 'NaCl', 'CH₄', 'O₂'],
    answer: 1,
    explanation:
      'El cloruro de sodio une un metal (Na) con un no metal (Cl). El agua y el metano son covalentes polares y apolar respectivamente, y el O₂ es covalente puro.',
  },
  {
    id: 'qui-015',
    topic: 'Enlace químico',
    difficulty: 'medio',
    prompt: 'Los metales conducen bien la electricidad porque:',
    options: [
      'Sus electrones de valencia están deslocalizados y pueden moverse',
      'Sus protones se desplazan por la red',
      'Poseen enlaces covalentes muy fuertes',
      'Están formados por iones libres en disolución',
    ],
    answer: 0,
    explanation:
      'El modelo del mar de electrones describe cationes metálicos fijos rodeados de electrones libres, lo que explica la conductividad, el brillo y la maleabilidad.',
  },
  {
    id: 'qui-016',
    topic: 'Enlace químico',
    difficulty: 'dificil',
    prompt: 'El agua tiene un punto de ebullición anormalmente alto para su masa molecular debido a:',
    options: [
      'Sus enlaces iónicos',
      'Los puentes de hidrógeno entre sus moléculas',
      'Su geometría lineal',
      'La ausencia de polaridad',
    ],
    answer: 1,
    explanation:
      'La molécula es angular y polar; el hidrógeno de una molécula atrae al oxígeno de otra formando puentes de hidrógeno, que exigen mucha energía para romperse.',
  },
  {
    id: 'qui-017',
    topic: 'Nomenclatura',
    difficulty: 'medio',
    prompt: 'La fórmula del ácido sulfúrico es:',
    options: ['H₂SO₃', 'H₂SO₄', 'HSO₄', 'H₂S'],
    answer: 1,
    explanation:
      'El ácido sulfúrico es H₂SO₄; con un oxígeno menos, H₂SO₃, se trata del ácido sulfuroso. El H₂S es el ácido sulfhídrico.',
  },
  {
    id: 'qui-018',
    topic: 'Nomenclatura',
    difficulty: 'medio',
    prompt: 'El compuesto CaO se nombra como:',
    options: ['Peróxido de calcio', 'Óxido de calcio', 'Hidróxido de calcio', 'Carbonato de calcio'],
    answer: 1,
    explanation:
      'Metal más oxígeno da un óxido básico: óxido de calcio, conocido como cal viva. El hidróxido de calcio es Ca(OH)₂ y el carbonato es CaCO₃.',
  },
  {
    id: 'qui-019',
    topic: 'Nomenclatura',
    difficulty: 'medio',
    prompt: 'En la mayoría de sus compuestos, el número de oxidación del oxígeno es:',
    options: ['+2', '−2', '−1', '0'],
    answer: 1,
    explanation:
      'El oxígeno actúa con −2 salvo en los peróxidos, donde vale −1, y frente al flúor, donde es positivo. El hidrógeno normalmente actúa con +1.',
  },
  {
    id: 'qui-020',
    topic: 'Nomenclatura',
    difficulty: 'dificil',
    prompt: 'El número de oxidación del azufre en el H₂SO₄ es:',
    options: ['+2', '+4', '+6', '−2'],
    answer: 2,
    explanation:
      'Se plantea 2(+1) + x + 4(−2) = 0. Entonces 2 + x − 8 = 0 y x = +6.',
  },
  {
    id: 'qui-021',
    topic: 'Reacciones químicas',
    difficulty: 'facil',
    prompt: 'La ley de conservación de la masa, enunciada por Lavoisier, indica que en una reacción química:',
    options: [
      'La masa de los productos es mayor que la de los reactivos',
      'La masa total se conserva',
      'La masa se transforma en energía siempre',
      'La masa depende del recipiente',
    ],
    answer: 1,
    explanation:
      'Los átomos solo se reordenan: la masa de los reactivos es igual a la de los productos. De ahí la necesidad de balancear las ecuaciones químicas.',
  },
  {
    id: 'qui-022',
    topic: 'Reacciones químicas',
    difficulty: 'medio',
    prompt: 'Al balancear la ecuación C₃H₈ + O₂ → CO₂ + H₂O, el coeficiente que corresponde al O₂ es:',
    options: ['3', '4', '5', '7'],
    answer: 2,
    explanation:
      'La ecuación balanceada es C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O. Del lado derecho hay 6 O del CO₂ más 4 O del agua, es decir 10 átomos, o sea 5 moléculas de O₂.',
  },
  {
    id: 'qui-023',
    topic: 'Reacciones químicas',
    difficulty: 'medio',
    prompt: 'La reacción AB + CD → AD + CB corresponde a una reacción de:',
    options: ['Síntesis', 'Descomposición', 'Sustitución simple', 'Doble sustitución'],
    answer: 3,
    explanation:
      'En la doble sustitución o metátesis los dos compuestos intercambian sus iones. La sustitución simple sigue el patrón A + BC → AC + B.',
  },
  {
    id: 'qui-024',
    topic: 'Reacciones químicas',
    difficulty: 'facil',
    prompt: 'Una reacción exotérmica se caracteriza por:',
    options: [
      'Absorber calor del entorno',
      'Liberar calor al entorno',
      'No implicar cambios de energía',
      'Ocurrir solo a baja presión',
    ],
    answer: 1,
    explanation:
      'En una reacción exotérmica los productos tienen menos energía que los reactivos y la diferencia se libera como calor. La combustión es el ejemplo más común.',
  },
  {
    id: 'qui-025',
    topic: 'Reacciones químicas',
    difficulty: 'facil',
    prompt: 'Un catalizador es una sustancia que:',
    options: [
      'Aumenta la velocidad de la reacción sin consumirse',
      'Se consume totalmente en la reacción',
      'Cambia los productos obtenidos',
      'Detiene cualquier reacción química',
    ],
    answer: 0,
    explanation:
      'El catalizador ofrece un camino alternativo con menor energía de activación y se recupera intacto al final. Las enzimas son catalizadores biológicos.',
  },
  {
    id: 'qui-026',
    topic: 'Estequiometría',
    difficulty: 'facil',
    prompt: 'El número de Avogadro, que indica cuántas partículas hay en un mol, es aproximadamente:',
    options: ['6,022 × 10²³', '3,14 × 10⁸', '1,6 × 10⁻¹⁹', '9,8 × 10²³'],
    answer: 0,
    explanation:
      'Un mol contiene 6,022 × 10²³ entidades elementales, sean átomos, moléculas o iones. Es la constante que conecta el mundo atómico con la balanza del laboratorio.',
  },
  {
    id: 'qui-027',
    topic: 'Estequiometría',
    difficulty: 'medio',
    prompt: 'La masa molar del CO₂ es, aproximadamente (C = 12, O = 16):',
    options: ['28 g/mol', '44 g/mol', '32 g/mol', '48 g/mol'],
    answer: 1,
    explanation:
      'Se suma 12 del carbono más 2 × 16 de los oxígenos, lo que da 44 g/mol.',
  },
  {
    id: 'qui-028',
    topic: 'Estequiometría',
    difficulty: 'medio',
    prompt: '¿Cuántos gramos pesa un mol de agua (H = 1, O = 16)?',
    options: ['16 g', '17 g', '18 g', '20 g'],
    answer: 2,
    explanation:
      'H₂O suma 2 × 1 más 16, es decir 18 g/mol.',
  },
  {
    id: 'qui-029',
    topic: 'Estequiometría',
    difficulty: 'dificil',
    prompt: '¿Cuántos gramos hay en 2 moles de NaCl (Na = 23, Cl = 35,5)?',
    options: ['58,5 g', '117 g', '76 g', '29,25 g'],
    answer: 1,
    explanation:
      'La masa molar del NaCl es 23 + 35,5 = 58,5 g/mol. Multiplicada por 2 moles se obtienen 117 g.',
  },
  {
    id: 'qui-030',
    topic: 'Disoluciones',
    difficulty: 'facil',
    prompt: 'En una disolución de azúcar en agua, el agua cumple el papel de:',
    options: ['Soluto', 'Solvente', 'Precipitado', 'Catalizador'],
    answer: 1,
    explanation:
      'El solvente es el componente que se encuentra en mayor proporción y disuelve al soluto. Al agua se la llama solvente universal por su polaridad.',
  },
  {
    id: 'qui-031',
    topic: 'Disoluciones',
    difficulty: 'medio',
    prompt: 'La molaridad (M) de una disolución se define como:',
    options: [
      'Gramos de soluto por litro de disolución',
      'Moles de soluto por litro de disolución',
      'Moles de soluto por kilogramo de solvente',
      'Gramos de soluto por gramo de solvente',
    ],
    answer: 1,
    explanation:
      'M = n / V, con el volumen en litros. Los moles por kilogramo de solvente corresponden a la molalidad, que es otra unidad distinta.',
  },
  {
    id: 'qui-032',
    topic: 'Disoluciones',
    difficulty: 'dificil',
    prompt: 'Si se disuelven 0,5 moles de soluto en agua hasta completar 250 mL de disolución, la molaridad resultante es:',
    options: ['0,125 M', '0,5 M', '2 M', '5 M'],
    answer: 2,
    explanation:
      '250 mL equivalen a 0,25 L. Entonces M = 0,5 mol ÷ 0,25 L = 2 mol/L.',
  },
  {
    id: 'qui-033',
    topic: 'Ácidos y bases',
    difficulty: 'facil',
    prompt: 'Una disolución con pH igual a 4 es:',
    options: ['Ácida', 'Neutra', 'Básica', 'Imposible de medir'],
    answer: 0,
    explanation:
      'La escala va de 0 a 14: por debajo de 7 es ácida, en 7 es neutra y por encima de 7 es básica o alcalina.',
  },
  {
    id: 'qui-034',
    topic: 'Ácidos y bases',
    difficulty: 'medio',
    prompt: 'Si la concentración de iones H⁺ de una disolución es 1 × 10⁻³ M, su pH vale:',
    options: ['3', '−3', '11', '10'],
    answer: 0,
    explanation:
      'pH = −log[H⁺] = −log(10⁻³) = 3. Se trata de una disolución ácida.',
  },
  {
    id: 'qui-035',
    topic: 'Ácidos y bases',
    difficulty: 'facil',
    prompt: 'La reacción entre un ácido y una base produce:',
    options: ['Sal y agua', 'Óxido e hidrógeno', 'Dos ácidos', 'Un gas noble'],
    answer: 0,
    explanation:
      'Es la reacción de neutralización: HCl + NaOH → NaCl + H₂O. El ion H⁺ del ácido se une al OH⁻ de la base formando agua.',
  },
  {
    id: 'qui-036',
    topic: 'Ácidos y bases',
    difficulty: 'medio',
    prompt: 'Según la teoría de Arrhenius, una base es una sustancia que en disolución acuosa libera iones:',
    options: ['H⁺', 'OH⁻', 'Na⁺', 'Cl⁻'],
    answer: 1,
    explanation:
      'Arrhenius definió los ácidos como donadores de H⁺ y las bases como liberadoras de OH⁻. El NaOH es el ejemplo típico de base fuerte.',
  },
  {
    id: 'qui-037',
    topic: 'Materia y mezclas',
    difficulty: 'facil',
    prompt: 'El paso directo del estado sólido al gaseoso, sin pasar por líquido, se denomina:',
    options: ['Fusión', 'Evaporación', 'Sublimación', 'Condensación'],
    answer: 2,
    explanation:
      'La sublimación se observa en el hielo seco y en la naftalina. El proceso inverso, de gas a sólido, se llama sublimación inversa o deposición.',
  },
  {
    id: 'qui-038',
    topic: 'Materia y mezclas',
    difficulty: 'facil',
    prompt: '¿Cuál de las siguientes es una mezcla homogénea?',
    options: ['Agua con aceite', 'Arena con agua', 'Agua con sal disuelta', 'Ensalada de frutas'],
    answer: 2,
    explanation:
      'En una mezcla homogénea o disolución no se distinguen los componentes a simple vista y su composición es uniforme en toda la muestra.',
  },
  {
    id: 'qui-039',
    topic: 'Materia y mezclas',
    difficulty: 'medio',
    prompt: 'Para separar dos líquidos miscibles con diferente punto de ebullición, como el agua y el alcohol, se emplea:',
    options: ['Filtración', 'Destilación', 'Decantación', 'Tamizado'],
    answer: 1,
    explanation:
      'La destilación calienta la mezcla hasta evaporar el componente más volátil, que luego se condensa aparte. La filtración separa sólidos de líquidos.',
  },
  {
    id: 'qui-040',
    topic: 'Gases',
    difficulty: 'medio',
    prompt: 'La ley de Boyle establece que, a temperatura constante, el volumen de un gas:',
    options: [
      'Es directamente proporcional a la presión',
      'Es inversamente proporcional a la presión',
      'No depende de la presión',
      'Es proporcional al número de moles solamente',
    ],
    answer: 1,
    explanation:
      'P × V = constante. Si la presión se duplica, el volumen se reduce a la mitad. La relación directa entre volumen y temperatura corresponde a la ley de Charles.',
  },
  {
    id: 'qui-041',
    topic: 'Química orgánica',
    difficulty: 'medio',
    prompt: 'La fórmula general de los alcanos es:',
    options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'],
    answer: 1,
    explanation:
      'Los alcanos son hidrocarburos saturados, con enlaces simples. Los alquenos responden a CₙH₂ₙ y los alquinos a CₙH₂ₙ₋₂.',
  },
  {
    id: 'qui-042',
    topic: 'Química orgánica',
    difficulty: 'medio',
    prompt: 'El grupo funcional −OH unido a una cadena carbonada caracteriza a los:',
    options: ['Ácidos carboxílicos', 'Alcoholes', 'Aldehídos', 'Ésteres'],
    answer: 1,
    explanation:
      'El hidroxilo define a los alcoholes, como el etanol (CH₃−CH₂−OH). El grupo carboxilo −COOH corresponde a los ácidos carboxílicos.',
  },
  {
    id: 'qui-043',
    topic: 'Química orgánica',
    difficulty: 'facil',
    prompt: 'El metano, principal componente del gas natural y del biogás, tiene la fórmula:',
    options: ['CH₄', 'C₂H₆', 'CO₂', 'CH₃OH'],
    answer: 0,
    explanation:
      'El metano es el alcano más simple: un carbono con cuatro hidrógenos. En ganadería se produce en el rumen y en los biodigestores de estiércol.',
  },
]

export const quimica = build('quimica', drafts)
