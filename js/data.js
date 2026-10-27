/* =========================================================
   EcoGuardiões — Base de Conteúdo (data.js)
   - Modo Infantil: aprendizagem visual por cartões (pouco texto,
     máximo 1 frase simples por slide, ilustrações SVG e narração).
   - Modo Normal: guias práticos diretos, dados reais (Sabesp,
     Procel/Inmetro, CONAMA 275/2001, Lei 12.305/2010).
   - Foco prático no dia a dia: água, energia e reciclagem,
     sem jargões burocráticos ou siglas desnecessárias.
   ========================================================= */
window.ECO_DATA = {

  /* ---------------- DICIONÁRIO DO GUARDIÃO (TERMOS DESCOMPLICADOS) ---------------- */
  glossario: [
    {
      id: 'hidrometro',
      icon: 'meter',
      term: 'Hidrômetro',
      simple: 'Relógio da Água ⏱️💧',
      short: 'O contador que fica no muro da calçada.',
      explanation: 'É o reloginho que mede toda a água que entra na casa. Se você fechar todas as torneiras e o reloginho continuar girando, significa que tem algum vazamento de água escondido pelo cano!'
    },
    {
      id: 'standby',
      icon: 'plug',
      term: 'Modo Stand-by',
      simple: 'Modo Soneca / Luzinha Vermelha 🔴🔌',
      short: 'Aparelho dormindo, mas gastando luz na tomada.',
      explanation: 'Sabe quando a TV ou o videogame está desligado no controle remoto, mas com aquela luzinha vermelha acesa? Ele continua gastando eletricidade 24 horas por dia! Desconectar da tomada economiza até 10% da conta.'
    },
    {
      id: 'kwh',
      icon: 'energy',
      term: 'kWh (Quilowatt-hora)',
      simple: 'A Régua da Energia Elétrica ⚡',
      short: 'Como a companhia mede o que você gastou.',
      explanation: 'É a unidade que mede quanta energia seus aparelhos usaram. Para você ter uma ideia prática: 1 kWh é mais ou menos o que uma TV precisa para ficar ligada por cerca de 5 horas seguidas.'
    },
    {
      id: 'compostagem',
      icon: 'compost',
      term: 'Compostagem',
      simple: 'Fábrica de Terra Boa 🪴🍎',
      short: 'Transformar cascas de fruta em adubo fofo.',
      explanation: 'Em vez de jogar casca de banana, maçã e borra de café no lixo comum, você junta com folhas secas. A natureza faz a mágica e transforma tudo em uma terra preta super nutritiva para as plantas e hortas!'
    },
    {
      id: 'rejeito',
      icon: 'trash',
      term: 'Rejeito',
      simple: 'Lixo do Banheiro / Não Reciclável 🗑️',
      short: 'O que não dá para reciclar e nem vira adubo.',
      explanation: 'É o lixo que não pode ser reaproveitado: papel higiênico usado, fita adesiva, espelho quebrado ou papel de pizza muito engordurado. Vai para o aterro sanitário protegido.'
    },
    {
      id: 'procel',
      icon: 'procel',
      term: 'Selo Procel / Inmetro',
      simple: 'Nota 10 da Economia 🏅',
      short: 'A etiqueta que prova que o aparelho gasta pouca luz.',
      explanation: 'Ao comprar uma geladeira ou chuveiro, procure sempre a etiqueta com a letra A (verde). Ela garante que aquele eletrodoméstico foi testado e gasta muito menos energia que os outros.'
    },
    {
      id: 'logistica_reversa',
      icon: 'hazard',
      term: 'Logística Reversa',
      simple: 'Devolver Onde Comprou 🔄🔋',
      short: 'Pilhas, baterias e lâmpadas de volta às lojas.',
      explanation: 'Pilhas e lâmpadas têm substâncias químicas perigosas que não podem ir para a terra nem pro lixo comum. Por lei, você pode devolver de graça nas lojas e supermercados para serem recicladas com segurança.'
    }
  ],

  /* ---------------- GUIAS DE APRENDIZAGEM ---------------- */
  trilhas: [
    {
      id: 'agua', category: 'Água', mascotKey: 'water', mascot: 'Gotinha', theme: 'water',
      title: { kids: 'Missão Água', normal: 'Água e Saneamento' },
      desc: {
        kids: 'Feche a torneira e cace vazamentos com a Gotinha!',
        normal: 'Identificação de vazamentos, consumo no banho, reuso seguro e saneamento.'
      },
      lessons: [
        {
          id: 'agua1',
          title: { kids: 'Caça aos vazamentos', normal: 'Como encontrar e evitar vazamentos' },
          kidsCards: [
            { slide: 'drip', title: 'Pinga-pinga vilão', text: 'Uma torneira pingando joga fora 46 litros por dia!' },
            { slide: 'meter', title: 'Olho no relógio', text: 'Feche tudo e olhe o hidrômetro: se girar, tem vazamento.' },
            { slide: 'reuse', title: 'Avise um adulto', text: 'Se ouvir barulho de água correndo, avise logo um adulto!' }
          ],
          normal: `<p>Vazamentos pequenos parecem inofensivos, mas pesam no bolso e nos reservatórios:</p>
                 <ul>
                   <li><strong>Torneira gotejando:</strong> cerca de 46 litros por dia (≈ 1.380 L por mês).</li>
                   <li><strong>Vaso sanitário com filete de água:</strong> cerca de 144 litros por dia (≈ 4.300 L por mês).</li>
                 </ul>
                 <p><strong>Teste do hidrômetro:</strong> feche todas as torneiras e registros e não use água. Anote o número do relógio e confira após 1 hora. Se mudou, há vazamento interno.</p>
                 <p><strong>Teste do vaso:</strong> jogue borra de café no vaso sanitário. Se a borra se espalhar sem dar descarga, a válvula ou caixa acoplada está vazando.</p>`,
          q: {
            text: { kids: 'Como descobrir se a água está fugindo escondida?', normal: 'Qual é a forma mais simples de descobrir um vazamento escondido em casa?' },
            options: ['Fechar tudo e ver se o hidrômetro gira', 'Abrir todas as torneiras', 'Esperar chover', 'Ligar o chuveiro'],
            answer: 0,
            explain: 'Com tudo fechado, o hidrômetro deve ficar parado. Se gira, há água escapando.'
          }
        },
        {
          id: 'agua2',
          title: { kids: 'Banho de 5 minutos', normal: 'Banho, escovação e louça: onde mais se gasta' },
          kidsCards: [
            { slide: 'shower', title: 'Banho campeão', text: 'Banho de 5 minutos economiza 90 litros de água!' },
            { slide: 'tooth', title: 'Copinho na pia', text: 'Escove os dentes com a torneira fechada.' },
            { slide: 'drip', title: 'Ensaboou? Fechou!', text: 'Desligue o chuveiro enquanto passa sabonete.' }
          ],
          normal: `<p>Os maiores gastos de água da residência estão no banheiro e na cozinha:</p>
                 <ul>
                   <li><strong>Banho de 15 min</strong> (chuveiro elétrico): ≈ 135 L. <strong>Banho de 5 min</strong>: ≈ 45 L.</li>
                   <li><strong>Escovar os dentes</strong> com torneira aberta: ≈ 12 L. Usando um copo: ≈ 1 L.</li>
                   <li><strong>Lavar louça</strong> com torneira aberta por 15 min: ≈ 117 L. Ensaboando antes: ≈ 20 L.</li>
                 </ul>
                 <p><strong>Economia dupla:</strong> reduzir o tempo de banho diminui a conta de água e também a de energia elétrica.</p>`,
          q: {
            text: { kids: 'Quanto tempo dura um banho econômico?', normal: 'Qual é o tempo de banho recomendado para economizar água e energia?' },
            options: ['5 minutos', '20 minutos', '30 minutos', '1 hora'],
            answer: 0,
            explain: 'Um banho de 5 minutos gasta cerca de 45 L, contra 135 L de um banho de 15 minutos.'
          }
        },
        {
          id: 'agua3',
          title: { kids: 'Água duas vezes!', normal: 'Reuso da água e saneamento básico' },
          kidsCards: [
            { slide: 'reuse', title: 'Balde sempre tampado', text: 'Use a água da máquina no quintal e tampe sempre o balde!' },
            { slide: 'oil', title: 'Óleo na garrafa', text: 'Guarde o óleo usado numa garrafa para levar à reciclagem!' },
            { slide: 'drip', title: 'Vaso não é lixeira', text: 'Papel, cotonete e fio dental vão sempre no lixo.' }
          ],
          normal: `<p><strong>Reuso doméstico seguro:</strong></p>
                 <ul>
                   <li>A água do enxágue da máquina de lavar serve para lavar quintal, calçada e dar descarga.</li>
                   <li>Recipientes de reserva devem ficar sempre <strong>tampados</strong> para evitar o mosquito transmissor da dengue.</li>
                   <li>Na calçada, substitua a mangueira (280 L em 15 min) por vassoura e balde.</li>
                 </ul>
                 <p><strong>Saneamento:</strong> 1 litro de óleo de cozinha na pia pode contaminar até 25 mil litros de água. Espere esfriar, armazene em garrafa plástica e entregue em um ponto de coleta.</p>`,
          q: {
            text: { kids: 'Onde devemos guardar o óleo de cozinha usado?', normal: 'Qual é o destino correto do óleo de cozinha usado?' },
            options: ['Na pia com detergente', 'Em garrafa PET para ponto de coleta', 'No vaso sanitário', 'Na terra do quintal'],
            answer: 1,
            explain: 'Guardado em garrafa e entregue na coleta, o óleo vira sabão ou biodiesel em vez de poluir a água.'
          }
        }
      ]
    },
    {
      id: 'energia', category: 'Energia', mascotKey: 'energy', mascot: 'Centelha', theme: 'energy',
      title: { kids: 'Missão Energia', normal: 'Energia Inteligente' },
      desc: {
        kids: 'Desligue o que não usa e ilumine com a Centelha!',
        normal: 'Aparelhos de maior consumo, lâmpadas LED, selo Procel, stand-by e fontes limpas.'
      },
      lessons: [
        {
          id: 'energia1',
          title: { kids: 'Os vilões da tomada', normal: 'Os aparelhos que mais pesam na conta de luz' },
          kidsCards: [
            { slide: 'shower', title: 'Chuveiro comilão', text: 'O chuveiro elétrico é o que mais gasta energia em casa.' },
            { slide: 'fridge', title: 'Porta fechada!', text: 'Não deixe a porta da geladeira aberta pensando.' },
            { slide: 'led', title: 'Comida fria', text: 'Espere a comida esfriar antes de guardar na geladeira.' }
          ],
          normal: `<p>Três aparelhos costumam concentrar a maior fatia da conta de luz residencial:</p>
                 <ul>
                   <li><strong>Chuveiro elétrico:</strong> use a chave na posição "Verão" nos dias quentes (consome cerca de 30% menos) e encurte o banho.</li>
                   <li><strong>Geladeira:</strong> verifique as borrachas de vedação, não guarde alimentos quentes e evite abrir a porta sem necessidade.</li>
                   <li><strong>Ferro elétrico e máquina de lavar:</strong> acumule peças para usar de uma só vez.</li>
                 </ul>`,
          q: {
            text: { kids: 'Qual aparelho mais gasta energia em casa?', normal: 'Qual destes aparelhos costuma ter o maior consumo em uma casa brasileira?' },
            options: ['Carregador de celular', 'Chuveiro elétrico', 'Rádio pequeno', 'Lâmpada LED'],
            answer: 1,
            explain: 'O chuveiro elétrico tem potência elevada (4.500 a 7.500 W) e lidera o consumo doméstico.'
          }
        },
        {
          id: 'energia2',
          title: { kids: 'Super Lâmpada LED', normal: 'Lâmpadas LED e selo Procel' },
          kidsCards: [
            { slide: 'led', title: 'Brilha sem gastar', text: 'A lâmpada LED gasta até 85% menos energia!' },
            { slide: 'solar', title: 'Nota A de Economia', text: 'Procure o selo verde com a letra A nos aparelhos.' },
            { slide: 'fridge', title: 'Dura muitos anos', text: 'Uma lâmpada LED dura muito mais que as antigas.' }
          ],
          normal: `<p><strong>Lâmpadas LED</strong> consomem até 85% menos energia que as incandescentes e duram cerca de 25 mil horas.</p>
                 <ul>
                   <li>Uma LED de 9 W ilumina o equivalente a uma incandescente antiga de 60 W.</li>
                   <li>Lâmpadas fluorescentes contêm mercúrio e precisam ser descartadas em pontos de coleta.</li>
                 </ul>
                 <p><strong>Selo Procel e Etiqueta Inmetro:</strong> ao comprar eletrodomésticos, escolha modelos classificados com a letra <strong>A</strong> (mais eficiente).</p>`,
          q: {
            text: { kids: 'Qual é a lâmpada mais econômica?', normal: 'Qual tipo de lâmpada é o mais eficiente e econômico?' },
            options: ['Incandescente', 'Halógena', 'LED', 'Fluorescente antiga'],
            answer: 2,
            explain: 'A tecnologia LED reduz em até 85% o gasto com iluminação.'
          }
        },
        {
          id: 'energia3',
          title: { kids: 'Sol, vento e tomada', normal: 'Stand-by, luz natural e energia limpa' },
          kidsCards: [
            { slide: 'solar', title: 'Luz do Sol é grátis!', text: 'De dia, abra a cortina e apague a lâmpada.' },
            { slide: 'led', title: 'Luzinha vermelha gasta', text: 'TV em modo espera (stand-by) continua gastando luz.' },
            { slide: 'solar', title: 'Energia limpa', text: 'Sol e vento geram energia sem poluir o planeta!' }
          ],
          normal: `<p><strong>Consumo fantasma (stand-by):</strong> aparelhos desligados apenas pelo controle remoto continuam consumindo energia. Juntos, podem representar até 10% da conta mensal.</p>
                 <ul>
                   <li>Desconecte da tomada aparelhos pouco usados ou utilize filtro de linha com chave.</li>
                   <li>Aproveite a iluminação natural e pinte paredes com cores claras.</li>
                 </ul>
                 <p><strong>Fontes renováveis e clima:</strong> economizar eletricidade evita o acionamento de usinas termelétricas, que encarecem a tarifa (bandeira vermelha) e aumentam a emissão de poluentes.</p>`,
          q: {
            text: { kids: 'A luzinha vermelha da TV desligada gasta energia?', normal: 'O que acontece com aparelhos deixados em modo stand-by?' },
            options: ['Não gastam nada', 'Continuam consumindo energia', 'Geram eletricidade', 'Limpam a tomada'],
            answer: 1,
            explain: 'O modo espera mantém circuitos internos ligados 24 horas por dia.'
          }
        }
      ]
    },
    {
      id: 'lixo', category: 'Resíduos', mascotKey: 'leaf', mascot: 'Folha', theme: 'waste',
      title: { kids: 'Missão Lixo Zero', normal: 'Resíduos e Reciclagem' },
      desc: {
        kids: 'Separe as cores da reciclagem e faça adubo com a Folha!',
        normal: 'Coleta seletiva prática, compostagem doméstica, descarte especial e redução de lixo.'
      },
      lessons: [
        {
          id: 'lixo1',
          title: { kids: 'Cores das lixeiras', normal: 'Coleta seletiva: cores e separação prática' },
          kidsCards: [
            { slide: 'bins', title: 'Cada cor no seu lugar', text: 'Azul é papel, Vermelho é plástico, Verde é vidro, Amarelo é metal!' },
            { slide: 'compost', title: 'Marrom e Laranja', text: 'Lixeira marrom recebe restos de comida e laranja recebe pilhas!' },
            { slide: 'reuse', title: 'Limpinho e seco', text: 'Passe pouca água nos potes antes de reciclar.' }
          ],
          normal: `<p>Padrão prático de cores da coleta seletiva:</p>
                 <ul>
                   <li><strong>Azul:</strong> papel e papelão limpos e secos.</li>
                   <li><strong>Vermelho:</strong> plásticos (garrafas PET, potes, embalagens limpas).</li>
                   <li><strong>Verde:</strong> vidros inteiros (garrafas, potes, frascos).</li>
                   <li><strong>Amarelo:</strong> metais (latas de alumínio e aço, tampinhas).</li>
                   <li><strong>Marrom:</strong> resíduos orgânicos (cascas, restos de frutas e vegetais).</li>
                   <li><strong>Cinza:</strong> rejeitos não recicláveis (papel higiênico, papel engordurado, espelho).</li>
                   <li><strong>Laranja:</strong> resíduos perigosos e especiais (pilhas, baterias, lâmpadas).</li>
                 </ul>`,
          q: {
            text: { kids: 'Qual é a cor da lixeira para latinhas de metal?', normal: 'Em qual cor de lixeira deve ser descartada uma lata de alumínio?' },
            options: ['Azul', 'Verde', 'Amarela', 'Marrom'],
            answer: 2,
            explain: 'Amarelo identifica os metais. O alumínio é 100% e infinitamente reciclável.'
          }
        },
        {
          id: 'lixo2',
          title: { kids: 'Lixo que demora a sumir', normal: 'Tempo de decomposição e os 5 Rs' },
          kidsCards: [
            { slide: 'bins', title: 'Plástico dura séculos!', text: 'Uma garrafa plástica leva mais de 400 anos para sumir.' },
            { slide: 'tooth', title: 'Use de novo!', text: 'Prefira garrafinha reutilizável e sacola retornável.' },
            { slide: 'compost', title: 'Os 5 Rs do Guardião', text: 'Repensar, Recusar, Reduzir, Reutilizar e Reciclar!' }
          ],
          normal: `<p>Tempo estimado de decomposição na natureza:</p>
                 <ul>
                   <li><strong>Papel:</strong> 3 a 6 meses · <strong>Chiclete:</strong> cerca de 5 anos.</li>
                   <li><strong>Lata de alumínio:</strong> 200 a 500 anos · <strong>Plástico:</strong> mais de 400 anos.</li>
                   <li><strong>Vidro:</strong> milhares de anos (porém 100% reciclável).</li>
                 </ul>
                 <p><strong>Os 5 Rs na prática doméstica:</strong> 1. Repensar necessidades · 2. Recusar descartáveis supérfluos · 3. Reduzir compras desnecessárias · 4. Reutilizar recipientes · 5. Reciclar materiais separados.</p>`,
          q: {
            text: { kids: 'Qual destes demora MAIS tempo na natureza?', normal: 'Qual destes materiais leva mais tempo para se decompor?' },
            options: ['Folha de papel', 'Casca de banana', 'Garrafa de vidro', 'Folha seca'],
            answer: 2,
            explain: 'O vidro leva milhares de anos para se decompor, mas pode ser reciclado infinitas vezes.'
          }
        },
        {
          id: 'lixo3',
          title: { kids: 'Cascas que viram adubo', normal: 'Compostagem e resíduos perigosos' },
          kidsCards: [
            { slide: 'compost', title: 'Adubo para as plantas', text: 'Cascas de frutas e folhas viram terra rica na composteira!' },
            { slide: 'oil', title: 'Pilha não é lixo comum', text: 'Pilhas e celulares velhos vão para pontos de coleta.' },
            { slide: 'solar', title: 'Sem fumaça!', text: 'Nunca queime lixo: a fumaça faz mal e aquece o planeta.' }
          ],
          normal: `<p>Metade do lixo domiciliar brasileiro é <strong>orgânico</strong>. Quando enterrado em aterros, gera <strong>gás metano</strong>, que polui e agrava as mudanças climáticas.</p>
                 <ul>
                   <li><strong>Compostagem doméstica:</strong> misture restos de frutas, legumes e borra de café com folhas secas ou serragem para produzir adubo natural.</li>
                   <li><strong>Logística reversa e descarte especial:</strong> pilhas, baterias, lâmpadas e eletrônicos devem ser devolvidos em pontos de coleta específicos.</li>
                   <li><strong>Vidro quebrado:</strong> embale em jornal ou caixa fechada e identifique por fora para proteger os coletores.</li>
                 </ul>`,
          q: {
            text: { kids: 'O que acontece com cascas de frutas na composteira?', normal: 'Qual é o benefício da compostagem de resíduos orgânicos?' },
            options: ['Viram plástico', 'Viram adubo e evitam gases poluentes nos aterros', 'Poluem a água', 'Viram vidro'],
            answer: 1,
            explain: 'A compostagem transforma restos vegetais em adubo e reduz a emissão de metano nos aterros.'
          }
        }
      ]
    }
  ],

  /* ---------------- JOGO 1: ECOPONTO EXPRESS ---------------- */
  bins: {
    papel:    { name: 'Papel',          short: 'Papel',        color: '#2563EB', text: '#FFFFFF', symbol: 'recycle' },
    plastico: { name: 'Plástico',       short: 'Plástico',     color: '#DC2626', text: '#FFFFFF', symbol: 'recycle' },
    vidro:    { name: 'Vidro',          short: 'Vidro',        color: '#15803D', text: '#FFFFFF', symbol: 'recycle' },
    metal:    { name: 'Metal',          short: 'Metal',        color: '#FACC15', text: '#1E293B', symbol: 'recycle' },
    organico: { name: 'Orgânico',       short: 'Orgânico',     color: '#78350F', text: '#FFFFFF', symbol: 'recycle' },
    rejeito:  { name: 'Não reciclável', short: 'Rejeito',      color: '#64748B', text: '#FFFFFF', symbol: 'trash' },
    especial: { name: 'Ponto de coleta', short: 'Perigoso',    color: '#EA580C', text: '#FFFFFF', symbol: 'danger' }
  },

  /* 28 itens de coleta seletiva bem balanceados entre os níveis 1, 2 e 3 */
  sortItems: [
    /* --- NÍVEL 1: Itens Básicos e Intuitivos (Papel, Plástico, Metal, Vidro) --- */
    { svgKey: 'newspaper',    name: 'Jornal ou revista',          bin: 'papel',    level: 1, tip: 'Papel seco e limpo vira papel novo na reciclagem azul.' },
    { svgKey: 'box',          name: 'Caixa de papelão desmontada',bin: 'papel',    level: 1, tip: 'Desmonte caixas de papelão para otimizar espaço na lixeira azul.' },
    { svgKey: 'notebook',     name: 'Caderno e rascunhos',        bin: 'papel',    level: 1, tip: 'Folhas de papel limpas vão para o cesto azul.' },
    { svgKey: 'bottle',       name: 'Garrafa PET de suco',        bin: 'plastico', level: 1, tip: 'Esvazie e amasse a garrafa PET antes de jogar no cesto vermelho.' },
    { svgKey: 'bag',          name: 'Sacola plástica limpa',      bin: 'plastico', level: 1, tip: 'Plásticos limpos e secos pertencem à lixeira vermelha.' },
    { svgKey: 'cup',          name: 'Copo descartável limpo',     bin: 'plastico', level: 1, tip: 'É plástico reciclável, mas ter seu próprio copo é ainda mais sustentável!' },
    { svgKey: 'can',          name: 'Lata de alumínio',           bin: 'metal',    level: 1, tip: 'O alumínio pode ser reciclado infinitas vezes na lixeira amarela!' },
    { svgKey: 'clip',         name: 'Tampinhas e lacres de metal',bin: 'metal',    level: 1, tip: 'Tampinhas metálicas e grampos vão na lixeira amarela.' },
    { svgKey: 'glass_bottle', name: 'Garrafa de vidro',           bin: 'vidro',    level: 1, tip: 'Garrafas de vidro inteiras e limpas vão na lixeira verde.' },
    { svgKey: 'jar',          name: 'Pote de vidro de conserva',  bin: 'vidro',    level: 1, tip: 'Potes de vidro sem tampa pertencem à lixeira verde.' },

    /* --- NÍVEL 2: Orgânicos, Rejeitos Comuns e Pontos de Coleta --- */
    { svgKey: 'banana',       name: 'Casca de banana e frutas',   bin: 'organico', level: 2, tip: 'Cascas de frutas viram adubo rico na compostagem (lixeira marrom).' },
    { svgKey: 'apple',        name: 'Restos de maçã e legumes',   bin: 'organico', level: 2, tip: 'Restos de vegetais crus vão para a lixeira marrom de orgânicos.' },
    { svgKey: 'leaves',       name: 'Folhas secas do quintal',    bin: 'organico', level: 2, tip: 'Folhas secas equilibram a composteira orgânica na lixeira marrom.' },
    { svgKey: 'tissue',       name: 'Papel higiênico usado',      bin: 'rejeito',  level: 2, tip: 'Papel sanitário usado vai para o lixo comum / rejeito (cinza).' },
    { svgKey: 'cup',          name: 'Esponja de louça gasta',     bin: 'rejeito',  level: 2, tip: 'Esponjas sintéticas comuns vão no rejeito cinza não reciclável.' },
    { svgKey: 'battery',      name: 'Pilha alcalina usada',       bin: 'especial', level: 2, tip: 'Pilhas contêm metais pesados: entregue em pontos de coleta (laranja).' },
    { svgKey: 'phone',        name: 'Cabo USB quebrado',          bin: 'especial', level: 2, tip: 'Cabos e fios eletrônicos vão para pontos de coleta de lixo eletrônico.' },
    { svgKey: 'box',          name: 'Caixa de leite longa vida',  bin: 'papel',    level: 2, tip: 'Embalagens cartonadas são separadas junto com papéis na maioria dos ecopontos.' },
    { svgKey: 'jar',          name: 'Frasco de perfume de vidro', bin: 'vidro',    level: 2, tip: 'Frascos de perfume vazios vão para o cesto verde de vidro.' },

    /* --- NÍVEL 3: Pegadinhas Clássicas e Logística Reversa --- */
    { svgKey: 'mirror',       name: 'Espelho quebrado',           bin: 'rejeito',  level: 3, tip: 'Pegadinha! Espelho tem camada química e NÃO vai no vidro: é rejeito (cinza).' },
    { svgKey: 'pizza',        name: 'Caixa de pizza engordurada', bin: 'rejeito',  level: 3, tip: 'Pegadinha! Papelão com gordura não se recicla no azul: vai no rejeito (cinza).' },
    { svgKey: 'cig',          name: 'Bituca de cigarro',          bin: 'rejeito',  level: 3, tip: 'Bitucas contêm substâncias tóxicas retidas no filtro: descarte no rejeito (cinza).' },
    { svgKey: 'tissue',       name: 'Guardanapo engordurado',     bin: 'rejeito',  level: 3, tip: 'Pegadinha! Papel com gordura não dissolve na reciclagem: vai no rejeito (cinza).' },
    { svgKey: 'glass_bottle', name: 'Cerâmica e prato quebrado',  bin: 'rejeito',  level: 3, tip: 'Pegadinha! Louça e cerâmica têm fusão diferente do vidro comum: descarte no cinza bem embalado.' },
    { svgKey: 'bag',          name: 'Pacote metalizado de salgadinho', bin: 'rejeito', level: 3, tip: 'Pegadinha! Plásticos metalizados tipo BOPP não têm reciclagem comum: vão no rejeito cinza.' },
    { svgKey: 'bulb',         name: 'Lâmpada fluorescente',       bin: 'especial', level: 3, tip: 'Pegadinha! Contém vapor de mercúrio e não vai no vidro: requer ponto de coleta (laranja).' },
    { svgKey: 'phone',        name: 'Celular e bateria estufada', bin: 'especial', level: 3, tip: 'Baterias de lítio e celulares devem ser entregues na logística reversa de eletrônicos.' },
    { svgKey: 'battery',      name: 'Bateria com ácido/chumbo',   bin: 'especial', level: 3, tip: 'Baterias químicas devem ser devolvidas em revendedores e postos autorizados (laranja).' }
  ],

  /* ---------------- JOGO 2: DETETIVE DA CASA ---------------- */
  rooms: [
    {
      id: 'banheiro', name: 'Banheiro', bg: 'room-bath',
      items: [
        { code: 'tap',       label: 'Torneira da pia', waste: true,  water: 1380, kwh: 0,
          tip: 'Torneira pingando desperdiça 1.380 L por mês! Trocar o vedante resolve.' },
        { code: 'shower',    label: 'Chuveiro ligado', waste: true,  water: 900,  kwh: 14,
          tip: 'Chuveiro aberto sem ninguém! Desligue o registro enquanto se ensaboa.' },
        { code: 'toilet',    label: 'Vaso sanitário',  waste: true,  water: 4300, kwh: 0,
          tip: 'Vazamento na válvula gasta até 4.300 L por mês.' },
        { code: 'cup_brush', label: 'Copo para escovar', waste: false,
          tip: 'Hábito correto! Usar um copo ao escovar os dentes economiza 11 litros.' },
        { code: 'basket',    label: 'Cesto de roupas cheio', waste: false,
          tip: 'Hábito correto! Acumular roupa para lavar de uma vez economiza água e luz.' }
      ]
    },
    {
      id: 'cozinha', name: 'Cozinha', bg: 'room-kitchen',
      items: [
        { code: 'fridge',    label: 'Geladeira aberta', waste: true,  water: 0,    kwh: 8,
          tip: 'Porta da geladeira aberta faz o motor trabalhar dobrado e gastar mais energia!' },
        { code: 'dishes',    label: 'Torneira da pia aberta', waste: true, water: 2900, kwh: 0,
          tip: 'Feche a torneira enquanto ensaboa os pratos!' },
        { code: 'oil',       label: 'Óleo despejado na pia', waste: true, water: 0,    kwh: 0,
          tip: 'Óleo nunca vai na pia! Guarde em garrafa plástica para reciclagem.' },
        { code: 'pot',       label: 'Panela tampada',   waste: false,
          tip: 'Hábito correto! Cozinhar com a panela tampada aproveita o vapor e economiza gás.' },
        { code: 'bins_pair', label: 'Coleta separada',  waste: false,
          tip: 'Hábito correto! Separar recicláveis dos orgânicos facilita a reciclagem.' }
      ]
    },
    {
      id: 'sala', name: 'Sala', bg: 'room-living',
      items: [
        { code: 'tv',         label: 'TV ligada sozinha', waste: true,  water: 0, kwh: 12,
          tip: 'TV ligada sem ninguém assistindo! Desligue ao sair da sala.' },
        { code: 'outlet',     label: 'Filtro em stand-by', waste: true, water: 0, kwh: 4,
          tip: 'Aparelhos em stand-by consomem energia 24h por dia. Desligue a chave!' },
        { code: 'lamp',       label: 'Abajur aceso de dia', waste: true, water: 0, kwh: 7,
          tip: 'Luz acesa durante o dia! Aproveite a claridade da janela.' },
        { code: 'window_sun', label: 'Janela aberta',     waste: false,
          tip: 'Hábito correto! Luz solar e vento natural iluminam e refrescam sem gastar energia.' },
        { code: 'books',      label: 'Livros na estante', waste: false,
          tip: 'Hábito correto! Leitura não consome energia elétrica e amplia o conhecimento.' }
      ]
    },
    {
      id: 'quintal', name: 'Quintal', bg: 'room-yard',
      items: [
        { code: 'hose',        label: 'Mangueira aberta',  waste: true,  water: 1100, kwh: 0,
          tip: 'Mangueira na calçada gasta 280 L em 15 minutos! Use vassoura e balde.' },
        { code: 'bucket',      label: 'Balde destampado',  waste: true,  water: 0,    kwh: 0,
          tip: 'Água parada sem tampa atrai o mosquito transmissor da dengue! Tampe sempre.' },
        { code: 'fire',        label: 'Queima de folhas',  waste: true,  water: 0,    kwh: 0,
          tip: 'Queimar folhas e lixo polui o ar e prejudica a saúde. Faça compostagem!' },
        { code: 'solar_panel', label: 'Placa solar',       waste: false,
          tip: 'Hábito correto! Painéis solares geram energia limpa a partir da luz do Sol.' },
        { code: 'compost_bin', label: 'Composteira',       waste: false,
          tip: 'Hábito correto! A composteira transforma restos vegetais em adubo rico.' },
        { code: 'broom',       label: 'Vassoura',          waste: false,
          tip: 'Hábito correto! A vassoura limpa o quintal sem desperdiçar água.' }
      ]
    }
  ],

  /* ---------------- JOGO 4: DECISÕES CONTRA O RELÓGIO ---------------- */
  /* 22 perguntas práticas balanceadas entre os níveis 1, 2 e 3 */
  quiz: [
    /* --- NÍVEL 1: Fundamentos Práticos e Acessíveis (7 perguntas) --- */
    { scene: 'shower', level: 1, q: { kids: 'Quanto tempo deve durar um banho econômico?', normal: 'Qual é o tempo de banho recomendado para economizar água e luz?' },
      options: ['5 minutos', '20 minutos', '30 minutos', '45 minutos'], answer: 0,
      explain: 'Banho de 5 min consome cerca de 45 L, poupando até 90 L em relação a um banho de 15 minutos.' },
    { scene: 'tooth', level: 1, q: { kids: 'O que fazer com a torneira ao escovar os dentes?', normal: 'Qual atitude economiza mais água durante a escovação dos dentes?' },
      options: ['Manter fechada e usar um copo com água', 'Deixar a torneira aberta sem parar', 'Abrir a torneira no máximo', 'Encher a pia até transbordar'], answer: 0,
      explain: 'Escovar os dentes com a torneira fechada poupa cerca de 11 litros de água a cada escovação.' },
    { scene: 'led', level: 1, q: { kids: 'Qual lâmpada gasta menos energia na nossa casa?', normal: 'Qual tecnologia de iluminação doméstica consome menos eletricidade?' },
      options: ['Incandescente antiga', 'Fluorescente comum', 'Lâmpada LED', 'Halógena'], answer: 2,
      explain: 'A lâmpada LED consome até 85% menos energia que as incandescentes e dura muito mais.' },
    { scene: 'led', level: 1, q: { kids: 'O que fazer ao sair de um quarto vazio?', normal: 'Qual é a ação imediata para evitar desperdício de iluminação em cômodos vazios?' },
      options: ['Apagar as lâmpadas do local', 'Deixar acesa para voltar depois', 'Ligar a TV junto', 'Abrir as janelas à noite'], answer: 0,
      explain: 'Apagar as luzes ao desocupar o ambiente reduz o consumo na conta sem nenhum custo.' },
    { scene: 'bins', level: 1, q: { kids: 'Qual é a cor da lixeira para jogar papel limpo?', normal: 'Na coleta seletiva, qual é a cor da lixeira para papel e papelão limpos?' },
      options: ['Vermelha', 'Azul', 'Verde', 'Amarela'], answer: 1,
      explain: 'Azul = papel · Vermelho = plástico · Verde = vidro · Amarelo = metal.' },
    { scene: 'bins', level: 1, q: { kids: 'Em qual lixeira devemos jogar latinhas de suco ou refrigerante?', normal: 'Em qual cor de lixeira deve ser descartada uma lata de alumínio?' },
      options: ['Azul (papel)', 'Verde (vidro)', 'Amarela (metal)', 'Marrom (orgânico)'], answer: 2,
      explain: 'O metal vai na lixeira amarela. O alumínio é 100% e infinitamente reciclável.' },
    { scene: 'oil', level: 1, q: { kids: 'O que fazer com o óleo de cozinha usado?', normal: 'Como descartar corretamente o óleo de fritura usado?' },
      options: ['Jogar na pia com água quente', 'Guardar em garrafa plástica para reciclagem', 'Jogar na terra do jardim', 'Despejar no vaso sanitário'], answer: 1,
      explain: 'Na pia, 1 L de óleo contamina milhares de litros de água. Na coleta, vira sabão ou biodiesel.' },

    /* --- NÍVEL 2: Rotinas Domésticas e Hábitos Sustentáveis (7 perguntas) --- */
    { scene: 'plug', level: 2, q: { kids: 'A luz vermelha da TV desligada gasta energia elétrica?', normal: 'Aparelhos mantidos em modo stand-by (luz de espera) consomem eletricidade?' },
      options: ['Sim, consomem energia 24 horas por dia', 'Não consomem nada', 'Apenas durante o dia', 'Geram energia de volta para a rede'], answer: 0,
      explain: 'O modo de espera (stand-by) consome energia continuamente e pode representar até 10% da conta.' },
    { scene: 'broom', level: 2, q: { kids: 'Como limpar a calçada da casa sem gastar água limpa?', normal: 'Qual é a forma mais sustentável de limpar a calçada e o quintal?' },
      options: ['Mangueira aberta por 20 minutos', 'Vassoura e balde com água de reuso', 'Jato de água da rua', 'Deixar a torneira correndo'], answer: 1,
      explain: 'Vassoura e água da máquina de lavar evitam o gasto de quase 300 litros da mangueira aberta.' },
    { scene: 'fridge', level: 2, q: { kids: 'Por que não devemos ficar com a porta da geladeira aberta?', normal: 'Por que abrir a porta da geladeira repetidamente sem necessidade aumenta a conta de luz?' },
      options: ['O motor trabalha muito mais para resfriar de novo', 'A luz da lâmpada gasta toda a energia', 'Os alimentos esquentam e estragam na hora', 'A geladeira desliga sozinha'], answer: 0,
      explain: 'O ar quente entra na geladeira, forçando o compressor a gastar mais eletricidade para restabelecer o frio.' },
    { scene: 'procel', level: 2, q: { kids: 'Qual letra no selo mostra que o aparelho economiza mais luz?', normal: 'Na etiqueta de eficiência energética do Inmetro/Procel, qual letra indica menor consumo?' },
      options: ['Letra A', 'Letra C', 'Letra E', 'Letra G'], answer: 0,
      explain: 'A classe A (verde) e o Selo Procel indicam os aparelhos mais eficientes e econômicos do mercado.' },
    { scene: 'hazard', level: 2, q: { kids: 'Onde devemos levar pilhas e baterias velhas?', normal: 'Qual é o destino ambientalmente correto de pilhas e baterias usadas?' },
      options: ['No lixo do banheiro', 'Na lixeira amarela de metal', 'Em postos de coleta específicos e lojas', 'Enterrar na terra do quintal'], answer: 2,
      explain: 'Pilhas contêm metais pesados tóxicos e devem ser devolvidas em postos de coleta autorizados.' },
    { scene: 'compost', level: 2, q: { kids: 'Por que não devemos queimar folhas secas no quintal?', normal: 'Qual é o problema de queimar folhas secas e lixo doméstico no quintal?' },
      options: ['Gera fumaça tóxica, piora doenças respiratórias e polui o ar', 'Ajuda a adubar a terra das plantas', 'Melhora o ar da vizinhança', 'Produz vapor de água pura'], answer: 0,
      explain: 'A queima libera fumaça tóxica e partículas nocivas; o destino correto de folhas é a compostagem.' },
    { scene: 'reuse', level: 2, q: { kids: 'Para que serve a água do enxágue da máquina de lavar?', normal: 'Como aproveitar com segurança a água de enxágue da máquina de lavar roupas?' },
      options: ['Para lavar pisos, calçadas ou dar descargas', 'Para cozinhar alimentos e beber', 'Para encher a banheira de banho', 'Para lavar louça de bebê'], answer: 0,
      explain: 'A água do enxágue contém sabão diluído e é perfeita para limpeza de pisos, quintais e descargas.' },

    /* --- NÍVEL 3: Pegadinhas, Diagnósticos e Raciocínio Prático (8 perguntas) --- */
    { scene: 'bins', level: 3, q: { kids: 'A parte de baixo da caixa de pizza com gordura vai em qual lixeira?', normal: 'Onde descartar a parte engordurada de uma caixa de papelão de pizza?' },
      options: ['Papel (azul)', 'Rejeito não reciclável (cinza)', 'Plástico (vermelha)', 'Orgânico (marrom)'], answer: 1,
      explain: 'A gordura impregna as fibras de celulose e impede a reciclagem do papel, devendo ir para o rejeito.' },
    { scene: 'hazard', level: 3, q: { kids: 'Pedaços de espelho quebrado podem ir na lixeira verde de vidro?', normal: 'Qual é o descarte correto de cacos de espelho quebrado?' },
      options: ['Embalar com proteção e descartar como rejeito (cinza)', 'Jogar solto na lixeira verde de garrafas de vidro', 'Descartar no lixo orgânico marrom', 'Enterrar na terra'], answer: 0,
      explain: 'Espelhos contêm camadas químicas de prata e não se misturam ao vidro comum: são rejeitos (cinza).' },
    { scene: 'hazard', level: 3, q: { kids: 'Por que lâmpadas fluorescentes não podem ir no lixo comum nem no vidro?', normal: 'Por que lâmpadas fluorescentes requerem descarte especial em pontos de coleta?' },
      options: ['Porque contêm vapor de mercúrio tóxico', 'Porque não têm vidro na fabricação', 'Porque derretem com a água da chuva', 'Porque gastam muita eletricidade'], answer: 0,
      explain: 'O vapor de mercúrio é tóxico e contamina água e solo. Devem ser devolvidas a postos de coleta.' },
    { scene: 'compost', level: 3, q: { kids: 'O que acontece com cascas de frutas na composteira?', normal: 'Qual é o principal benefício da compostagem de resíduos orgânicos em casa?' },
      options: ['Transformam-se em adubo rico e deixam de gerar gás metano em aterros', 'Viram plástico biodegradável', 'Purificam a água da chuva', 'Viram areia estéril'], answer: 0,
      explain: 'A compostagem transforma resíduos em adubo e evita o gás metano, potente gerador do efeito estufa em aterros.' },
    { scene: 'meter', level: 3, q: { kids: 'Se todas as torneiras estão fechadas e o relógio gira, o que significa?', normal: 'Com todos os registros e torneiras fechados, o hidrômetro continua girando. O que indica?' },
      options: ['Há um vazamento oculto na tubulação ou na caixa', 'A água da rua está mais limpa', 'O relógio está economizando água', 'A pressão do ar está muito baixa'], answer: 0,
      explain: 'Se o hidrômetro gira sem consumo deliberado, há vazamento interno em canos, torneiras ou vaso sanitário.' },
    { scene: 'drip', level: 3, q: { kids: 'Por que o balde com água de reuso deve ficar sempre tampado?', normal: 'Por que recipientes com água reaproveitada da máquina devem ficar tampados?' },
      options: ['Para evitar criadouros do mosquito transmissor da dengue', 'Para a água não evaporar em 5 minutos', 'Para manter o perfume do sabão', 'Não há necessidade de tampar'], answer: 0,
      explain: 'Água parada descoberta, mesmo com sabão diluído, pode virar foco de reprodução do Aedes aegypti.' },
    { scene: 'fridge', level: 3, q: { kids: 'Por que devemos esperar a comida esfriar antes de guardar na geladeira?', normal: 'Qual é o impacto de guardar panelas e alimentos quentes dentro da geladeira?' },
      options: ['Aquece o interior e faz o compressor gastar muito mais energia', 'Não causa nenhum impacto elétrico', 'Diminui o consumo do motor', 'Conserva melhor os outros alimentos'], answer: 0,
      explain: 'Alimentos quentes elevam a temperatura interna e forçam o compressor a operar na potência máxima por horas.' },
    { scene: 'meter', level: 3, q: { kids: 'Uma torneira pingando de gota em gota joga fora quanta água no mês?', normal: 'Quantos litros de água uma única torneira gotejando desperdiça por mês?' },
      options: ['Cerca de 1.380 litros de água tratada', 'Apenas 5 litros', 'Menos de 20 litros', 'Mais de 100 mil litros'], answer: 0,
      explain: 'Uma torneira gotejando perde cerca de 46 L por dia, totalizando aproximadamente 1.380 litros por mês.' }
  ],

  /* ---------------- HÁBITOS DIÁRIOS ---------------- */
  habits: [
    { id: 'h1', kids: 'Fechei a torneira ao escovar os dentes', normal: 'Fechei a torneira ao escovar os dentes e ensaboar a louça' },
    { id: 'h2', kids: 'Tomei banho rápido de 5 minutos',       normal: 'Mantive o banho curto (até 5–8 minutos)' },
    { id: 'h3', kids: 'Apaguei a luz ao sair do quarto',       normal: 'Apaguei as luzes ao sair dos cômodos' },
    { id: 'h4', kids: 'Tirei aparelhos da tomada',             normal: 'Desconectei aparelhos em stand-by da tomada' },
    { id: 'h5', kids: 'Separei o lixo reciclável',             normal: 'Separei resíduos secos (recicláveis) dos orgânicos' },
    { id: 'h6', kids: 'Usei garrafinha ou sacola retornável',  normal: 'Recusei descartáveis usando sacola ou garrafa reutilizável' },
    { id: 'h7', kids: 'Abri a janela para usar a luz do Sol',  normal: 'Aproveitei a iluminação e ventilação naturais' },
    { id: 'h8', kids: 'Ensinei uma dica de economia em casa',  normal: 'Compartilhei uma prática de economia com a família' }
  ],

  /* ---------------- DICAS RÁPIDAS & MASCOTES ---------------- */
  tips: [
    { mascotKey: 'water',  name: 'Gotinha',  kids: 'Feche a torneira ao escovar os dentes: você salva 11 litros!', normal: 'Escovar os dentes com a torneira fechada economiza cerca de 11 litros por vez.' },
    { mascotKey: 'energy', name: 'Centelha', kids: 'Saiu do quarto? Apague a luz e dê folga para a usina!',        normal: 'Apagar luzes de ambientes desocupados reduz imediatamente o consumo mensal.' },
    { mascotKey: 'leaf',   name: 'Folha',    kids: 'Latinha amassada vai na lixeira amarela!',                      normal: 'Latas de alumínio são 100% recicláveis e geram renda para cooperativas de catadores.' },
    { mascotKey: 'water',  name: 'Gotinha',  kids: 'Água da máquina de lavar deixa o quintal limpinho!',           normal: 'Reaproveite a água do enxágue da lavadora para lavar pisos e calçadas.' },
    { mascotKey: 'energy', name: 'Centelha', kids: 'Pense no que vai pegar antes de abrir a geladeira!',           normal: 'Evitar abrir a geladeira sem necessidade reduz o trabalho do compressor.' },
    { mascotKey: 'leaf',   name: 'Folha',    kids: 'Cascas de frutas viram superadubo para as plantas!',           normal: 'A compostagem reduz pela metade o volume de lixo doméstico enviado aos aterros.' }
  ]
};

/* Aliases para compatibilidade de nomenclatura do sistema */
window.ECO_DATA.WASTE_ITEMS = window.ECO_DATA.sortItems;
window.ECO_DATA.QUIZ_QUESTIONS = window.ECO_DATA.quiz;
