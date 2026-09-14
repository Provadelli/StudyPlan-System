(function(){
  var weeksData = [
    { label: "Semana 1", days: [
      {t:"cg", p:"max", title:"Pronomes I", sub:"pessoais, possessivos, demonstrativos"},
      {t:"fs", p:"max", title:"Sujeito", sub:"simples, composto, oculto, indeterminado, oração sem sujeito"},
      {t:"cg", p:"max", title:"Pronomes II", sub:"indefinidos, relativos, interrogativos, anáfora/catáfora, efeito de sentido"},
      {t:"fs", p:"max", title:"Predicado e predicativo", sub:"verbal, nominal, verbo-nominal · predicativo do sujeito e do objeto"},
      {t:"cg", p:"max", title:"Verbos I", sub:"tempos e modos · indicativo, subjuntivo, imperativo"},
      {t:"fs", p:"max", title:"Objeto direto e indireto", sub:"identificar o complemento e o verbo que ele completa"},
    ]},
    { label: "Semana 2", days: [
      {t:"cg", p:"max", title:"Verbos II", sub:"infinitivo, gerúndio, particípio · vozes · locução verbal · valor semântico"},
      {t:"fs", p:"alta", title:"Complemento nominal + agente da passiva", sub:"o que completa o nome vs. quem pratica a ação"},
      {t:"cg", p:"max", title:"Conjunções I", sub:"coordenativas, subordinativas, integrantes"},
      {t:"fs", p:"max", title:"Adjunto adnominal × complemento nominal ⭐", sub:"posse/agente × paciente · a diferença mais cobrada"},
      {t:"cg", p:"max", title:"Conjunções II", sub:"adição, oposição, causa, consequência, condição, concessão, finalidade, comparação, tempo, conclusão"},
      {t:"fs", p:"max", title:"Objeto indireto × complemento nominal ⭐", sub:"termo que completa verbo vs. termo que completa nome"},
    ]},
    { label: "Semana 3", days: [
      {t:"cg", p:"alta", title:"Advérbios", sub:"classificação, locuções adverbiais, intensificação, negação/afirmação/dúvida"},
      {t:"fs", p:"alta", title:"Adjunto adverbial", sub:"circunstâncias e efeito de sentido no período"},
      {t:"cg", p:"alta", title:"Preposições", sub:"essenciais, locuções prepositivas, relações de sentido (causa, meio, lugar, tempo...)"},
      {t:"fs", p:"média", title:"Aposto e vocativo", sub:"diferenciar explicativo de interpelativo"},
      {t:"cg", p:"alta", title:"Adjetivos", sub:"classificação, locução adjetiva, posição, substantivação"},
      {t:"fs", p:"alta", title:"Transitividade verbal", sub:"intransitivo, TD, TI, TDI, de ligação"},
    ]},
    { label: "Semana 4", days: [
      {t:"cg", p:"média", title:"Substantivos", sub:"comum/próprio, concreto/abstrato, coletivo, flexões, substantivação"},
      {t:"fs", p:"média", title:"Predicativo × adjunto adnominal", sub:"característica atribuída vs. termo que só qualifica o nome"},
      {t:"cg", p:"média", title:"Artigos e numerais", sub:"definido/indefinido, determinação · cardinal, ordinal, multiplicativo, fracionário"},
      {t:"fs", p:"média", title:"Função sintática das orações", sub:"substantiva, adjetiva, adverbial dentro do período"},
      {t:"cg", p:"média", title:"Interjeições + revisão geral", sub:"valor expressivo · repasse rápido de todas as classes"},
      {t:"fs", p:"alta", title:"Simulado misto (CG + FS)", sub:"2 questões discursivas curtas cobrindo os dois checklists"},
    ]},
  ];

  var weeksEl = document.getElementById("weeks");
  var idx = 0;
  weeksData.forEach(function(week){
    var w = document.createElement("div");
    w.className = "week";
    var h = document.createElement("div");
    h.className = "week-title";
    h.textContent = week.label;
    w.appendChild(h);
    var grid = document.createElement("div");
    grid.className = "days";
    week.days.forEach(function(d){
      idx++;
      var id = "s" + idx;
      var card = document.createElement("div");
      card.className = "day " + d.t;
      card.innerHTML =
        '<div class="day-top">' +
          '<span class="tag ' + d.t + '">' + (d.t === "cg" ? "Classes" : "Função") + '</span>' +
          '<span class="prio ' + d.p + '" title="prioridade ' + d.p + '"></span>' +
        '</div>' +
        '<label class="day-label" for="' + id + '">' +
          '<input type="checkbox" id="' + id + '">' +
          '<span class="day-text"><b>' + d.title + '</b><small>' + d.sub + '</small></span>' +
        '</label>';
      grid.appendChild(card);
      w.appendChild(grid);
    });
    weeksEl.appendChild(w);
  });

  var total = idx;
  var ring = document.getElementById("ring");
  var countEl = document.getElementById("progress-count");
  var STORAGE_KEY = "uerj-plano-v1";

  function loadState(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch(e){ return {}; }
  }
  function saveState(state){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e){}
  }

  function updateProgress(){
    var boxes = document.querySelectorAll('input[type=checkbox]');
    var done = 0;
    boxes.forEach(function(b){ if(b.checked) done++; });
    var pct = total ? Math.round(done/total*100) : 0;
    ring.style.setProperty('--pct', pct);
    ring.setAttribute('data-label', pct + '%');
    countEl.textContent = done + ' de ' + total + ' sessões concluídas';
  }

  var state = loadState();
  document.querySelectorAll('input[type=checkbox]').forEach(function(box){
    if(state[box.id]) { box.checked = true; box.closest('.day').classList.add('done'); }
    box.addEventListener('change', function(){
      var s = loadState();
      s[box.id] = box.checked;
      saveState(s);
      box.closest('.day').classList.toggle('done', box.checked);
      updateProgress();
    });
  });
  updateProgress();
})();

var questionsData = [
  { label: "Semana 1", items: [
    {topic:"Pronomes I", statement:"Ana perdeu o \u00f4nibus; ela chegou atrasada \u00e0 prova.", prompt:"Classifique morfol\u00f3gica e sintaticamente o pronome \"ela\", indicando seu referente e o efeito de sentido de seu emprego.", gabarito:"\"Ela\" \u00e9 pronome pessoal do caso reto, 3\u00aa pessoa do singular; retoma anaforicamente \"Ana\" e exerce a fun\u00e7\u00e3o de sujeito de \"chegou atrasada \u00e0 prova\". Efeito: evita a repeti\u00e7\u00e3o do nome, garantindo coes\u00e3o referencial e fluidez ao per\u00edodo."},
    {topic:"Pronomes I", statement:"Os alunos trouxeram seus materiais, mas este caderno ficou esquecido na sala.", prompt:"Classifique \"seus\" e \"este\", justificando e explicando o efeito de sentido de cada um.", gabarito:"\"Seus\" \u00e9 pronome possessivo, indicando que os materiais pertencem a \"os alunos\". \"Este\" \u00e9 pronome demonstrativo, situando o caderno na proximidade (espacial ou textual) de quem fala. Efeito: precis\u00e3o referencial, sem necessidade de repetir o substantivo."},
    {topic:"Sujeito", statement:"Choveu bastante na cidade ontem.", prompt:"Classifique o sujeito da ora\u00e7\u00e3o e justifique.", gabarito:"Ora\u00e7\u00e3o sem sujeito (sujeito inexistente): o verbo \"chover\" \u00e9 impessoal e indica fen\u00f4meno da natureza, n\u00e3o admitindo sujeito."},
    {topic:"Sujeito", statement:"Perderam-se os documentos importantes durante a mudan\u00e7a.", prompt:"Identifique e classifique o sujeito da ora\u00e7\u00e3o.", gabarito:"Sujeito simples: \"os documentos importantes\". O verbo est\u00e1 na voz passiva sint\u00e9tica (pronominal); o pronome \"se\" \u00e9 part\u00edcula apassivadora, e o verbo concorda com o sujeito paciente."},
    {topic:"Sujeito", statement:"Falaram mal do candidato durante o debate.", prompt:"Classifique o sujeito e explique o efeito de sentido dessa escolha sint\u00e1tica.", gabarito:"Sujeito indeterminado: o verbo est\u00e1 na 3\u00aa pessoa do plural sem referente expresso. Efeito: oculta o agente da cr\u00edtica, generalizando a opini\u00e3o sem atribuir autoria."},
    {topic:"Pronomes II", statement:"O professor que corrigiu minha reda\u00e7\u00e3o elogiou a coes\u00e3o do texto.", prompt:"Classifique \"que\", indique seu antecedente e sua fun\u00e7\u00e3o sint\u00e1tica na ora\u00e7\u00e3o que introduz.", gabarito:"\"Que\" \u00e9 pronome relativo; retoma \"o professor\" (antecedente) e exerce a fun\u00e7\u00e3o de sujeito da ora\u00e7\u00e3o subordinada adjetiva \"que corrigiu minha reda\u00e7\u00e3o\"."},
    {topic:"Pronomes II", statement:"Algu\u00e9m deixou algumas anota\u00e7\u00f5es na mesa; quais delas pertencem a voc\u00ea?", prompt:"Classifique \"algu\u00e9m\", \"algumas\" e \"quais\", diferenciando suas classes.", gabarito:"\"Algu\u00e9m\" \u00e9 pronome indefinido substantivo; \"algumas\" \u00e9 pronome indefinido adjetivo (acompanha \"anota\u00e7\u00f5es\"); \"quais\" \u00e9 pronome interrogativo, empregado em pergunta direta."},
    {topic:"Predicado e predicativo", statement:"O aluno tornou-se mais confiante ap\u00f3s o simulado.", prompt:"Classifique o predicado da ora\u00e7\u00e3o e identifique o predicativo, explicando a que termo ele se refere.", gabarito:"Predicado verbo-nominal: verbo de liga\u00e7\u00e3o \"tornou-se\" + predicativo \"mais confiante\". Trata-se de predicativo do sujeito, atribuindo caracter\u00edstica a \"o aluno\"."},
    {topic:"Predicado e predicativo", statement:"Os professores consideraram a prova dif\u00edcil.", prompt:"Classifique o predicado e o predicativo presentes na ora\u00e7\u00e3o.", gabarito:"Predicado verbo-nominal; \"dif\u00edcil\" \u00e9 predicativo do objeto, atribu\u00eddo a \"a prova\" pelo verbo transitivo \"consideraram\"."},
    {topic:"Predicado e predicativo", statement:"A sala ficou em sil\u00eancio.", prompt:"Classifique o predicado da ora\u00e7\u00e3o.", gabarito:"Predicado nominal: verbo de liga\u00e7\u00e3o \"ficou\" + predicativo do sujeito \"em sil\u00eancio\" (locu\u00e7\u00e3o com valor adjetivo)."},
    {topic:"Verbos I", statement:"Se eu estudasse mais, teria passado no vestibular.", prompt:"Identifique os modos e tempos verbais empregados e explique o efeito de sentido dessa escolha.", gabarito:"\"Estudasse\" est\u00e1 no pret\u00e9rito imperfeito do subjuntivo, expressando condi\u00e7\u00e3o hipot\u00e9tica; \"teria passado\" est\u00e1 no futuro do pret\u00e9rito composto, indicando consequ\u00eancia irreal. Efeito: expressa arrependimento por condi\u00e7\u00e3o n\u00e3o cumprida no passado."},
    {topic:"Verbos I", statement:"Estude todos os dias para n\u00e3o deixar a mat\u00e9ria acumular.", prompt:"Classifique o modo verbal predominante e justifique sua escolha no contexto.", gabarito:"Modo imperativo (afirmativo), no verbo \"estude\"; expressa ordem/conselho direto ao interlocutor, refor\u00e7ando o car\u00e1ter instrucional do enunciado."},
    {topic:"Objeto direto e indireto", statement:"A banca avaliou os candidatos com rigor.", prompt:"Classifique o termo \"os candidatos\".", gabarito:"Objeto direto: completa o sentido do verbo transitivo direto \"avaliou\", sem preposi\u00e7\u00e3o obrigat\u00f3ria."},
    {topic:"Objeto direto e indireto", statement:"O professor obedeceu \u00e0s diretrizes do edital.", prompt:"Classifique o termo \"\u00e0s diretrizes do edital\".", gabarito:"Objeto indireto: completa o verbo transitivo indireto \"obedeceu\", que exige a preposi\u00e7\u00e3o \"a\"."},
    {topic:"Objeto direto e indireto", statement:"Os candidatos entregaram a reda\u00e7\u00e3o ao fiscal.", prompt:"Classifique os complementos verbais presentes na ora\u00e7\u00e3o.", gabarito:"\"A reda\u00e7\u00e3o\" \u00e9 objeto direto e \"ao fiscal\" \u00e9 objeto indireto; o verbo \"entregaram\" \u00e9 transitivo direto e indireto."},
  ]},
  { label: "Semana 2", items: [
    {topic:"Verbos II", statement:"Terminada a prova, os alunos sa\u00edram em sil\u00eancio.", prompt:"Classifique a forma verbal \"terminada\" e explique sua fun\u00e7\u00e3o na ora\u00e7\u00e3o.", gabarito:"Partic\u00edpio, forma nominal do verbo \"terminar\"; funciona com valor de adjetivo, indicando a\u00e7\u00e3o conclu\u00edda anterior \u00e0 principal (ora\u00e7\u00e3o reduzida de partic\u00edpio)."},
    {topic:"Verbos II", statement:"A reda\u00e7\u00e3o foi corrigida por dois avaliadores independentes.", prompt:"Identifique a voz verbal empregada e seus elementos constituintes.", gabarito:"Voz passiva anal\u00edtica: sujeito paciente \"a reda\u00e7\u00e3o\", auxiliar \"foi\" + partic\u00edpio \"corrigida\", e agente da passiva \"por dois avaliadores independentes\"."},
    {topic:"Complemento nominal + agente da passiva", statement:"O medo do fracasso paralisava o candidato.", prompt:"Classifique o termo \"do fracasso\".", gabarito:"Complemento nominal: completa o substantivo abstrato \"medo\", que exige complementa\u00e7\u00e3o; n\u00e3o h\u00e1 rela\u00e7\u00e3o de posse, e sim de objeto do sentimento."},
    {topic:"Complemento nominal + agente da passiva", statement:"A prova foi elaborada pela banca examinadora.", prompt:"Classifique \"pela banca examinadora\" e justifique.", gabarito:"Agente da passiva: indica quem pratica a a\u00e7\u00e3o verbal na voz passiva anal\u00edtica, introduzido pela preposi\u00e7\u00e3o \"por\"."},
    {topic:"Complemento nominal + agente da passiva", statement:"Os alunos t\u00eam necessidade de orienta\u00e7\u00e3o constante.", prompt:"Classifique \"de orienta\u00e7\u00e3o constante\".", gabarito:"Complemento nominal: completa o substantivo abstrato \"necessidade\", indicando aquilo que \u00e9 necess\u00e1rio."},
    {topic:"Conjun\u00e7\u00f5es I", statement:"Estudou bastante, mas n\u00e3o conseguiu a nota m\u00ednima.", prompt:"Classifique a conjun\u00e7\u00e3o \"mas\" e a rela\u00e7\u00e3o de sentido que estabelece.", gabarito:"Conjun\u00e7\u00e3o coordenativa adversativa; estabelece rela\u00e7\u00e3o de oposi\u00e7\u00e3o/contraste entre as ora\u00e7\u00f5es."},
    {topic:"Conjun\u00e7\u00f5es I", statement:"Espero que voc\u00ea revise todo o conte\u00fado antes da prova.", prompt:"Classifique \"que\" quanto \u00e0 sua fun\u00e7\u00e3o conectiva.", gabarito:"Conjun\u00e7\u00e3o integrante; introduz ora\u00e7\u00e3o subordinada substantiva objetiva direta, sem valor sem\u00e2ntico pr\u00f3prio, apenas conectando as ora\u00e7\u00f5es."},
    {topic:"Adjunto adnominal \u00d7 complemento nominal", statement:"O medo do aluno atrapalhou seu desempenho. / O medo da prova atrapalhou seu desempenho.", prompt:"Compare \"do aluno\" e \"da prova\" nas duas frases, classificando-os e justificando a diferen\u00e7a.", gabarito:"\"Do aluno\" \u00e9 adjunto adnominal (o aluno \u00e9 o agente/sujeito l\u00f3gico do sentimento). \"Da prova\" \u00e9 complemento nominal (a prova \u00e9 o objeto/causa do medo, termo paciente que completa o substantivo abstrato)."},
    {topic:"Adjunto adnominal \u00d7 complemento nominal", statement:"A destrui\u00e7\u00e3o da cidade chocou os moradores.", prompt:"Classifique \"da cidade\" e justifique.", gabarito:"Complemento nominal: a cidade \u00e9 paciente da a\u00e7\u00e3o de destruir (sofre a a\u00e7\u00e3o), e o substantivo abstrato \"destrui\u00e7\u00e3o\" exige complementa\u00e7\u00e3o."},
    {topic:"Adjunto adnominal \u00d7 complemento nominal", statement:"A casa do professor fica perto da escola.", prompt:"Classifique \"do professor\" e diferencie de um poss\u00edvel complemento nominal.", gabarito:"Adjunto adnominal: indica posse (a casa pertence ao professor), rela\u00e7\u00e3o entre substantivos concretos, sem exig\u00eancia de complementa\u00e7\u00e3o."},
    {topic:"Conjun\u00e7\u00f5es II", statement:"Embora tenha estudado pouco, o candidato foi bem na prova.", prompt:"Classifique a conjun\u00e7\u00e3o \"embora\" e a rela\u00e7\u00e3o de sentido estabelecida.", gabarito:"Conjun\u00e7\u00e3o subordinativa concessiva; introduz um fato que poderia impedir o resultado, mas n\u00e3o impede."},
    {topic:"Conjun\u00e7\u00f5es II", statement:"Estudou tanto que decorou toda a mat\u00e9ria.", prompt:"Classifique \"que\" e a rela\u00e7\u00e3o sem\u00e2ntica presente.", gabarito:"Conjun\u00e7\u00e3o subordinativa consecutiva (correlata a \"tanto\"); indica a consequ\u00eancia do fato expresso na ora\u00e7\u00e3o principal."},
    {topic:"Objeto indireto \u00d7 complemento nominal", statement:"O candidato confiava no pr\u00f3prio preparo. / O candidato tinha confian\u00e7a no pr\u00f3prio preparo.", prompt:"Classifique \"no pr\u00f3prio preparo\" nas duas frases e justifique a diferen\u00e7a.", gabarito:"Na primeira, completa o verbo \"confiava\" (transitivo indireto) \u2192 objeto indireto. Na segunda, completa o substantivo abstrato \"confian\u00e7a\" \u2192 complemento nominal."},
    {topic:"Objeto indireto \u00d7 complemento nominal", statement:"Os alunos precisam de revis\u00e3o constante.", prompt:"Classifique \"de revis\u00e3o constante\".", gabarito:"Objeto indireto: completa o verbo transitivo indireto \"precisam\", que exige a preposi\u00e7\u00e3o \"de\"."},
    {topic:"Objeto indireto \u00d7 complemento nominal", statement:"A necessidade de revis\u00e3o constante incomodava os alunos.", prompt:"Classifique \"de revis\u00e3o constante\" nesta nova constru\u00e7\u00e3o.", gabarito:"Complemento nominal: agora completa o substantivo abstrato \"necessidade\", n\u00e3o mais um verbo."},
  ]},
  { label: "Semana 3", items: [
    {topic:"Adv\u00e9rbios", statement:"O candidato respondeu rapidamente \u00e0s quest\u00f5es.", prompt:"Classifique \"rapidamente\" e seu valor sem\u00e2ntico.", gabarito:"Adv\u00e9rbio de modo; modifica o verbo \"respondeu\", indicando a maneira como a a\u00e7\u00e3o ocorreu."},
    {topic:"Adv\u00e9rbios", statement:"Talvez ele n\u00e3o consiga terminar a prova a tempo.", prompt:"Classifique \"talvez\" e explique seu efeito de sentido.", gabarito:"Adv\u00e9rbio de d\u00favida; expressa incerteza do enunciador quanto \u00e0 realiza\u00e7\u00e3o do fato, atenuando a afirma\u00e7\u00e3o."},
    {topic:"Adjunto adverbial", statement:"Os candidatos chegaram cedo ao local da prova.", prompt:"Classifique \"cedo\" e \"ao local da prova\" quanto \u00e0 fun\u00e7\u00e3o sint\u00e1tica.", gabarito:"Ambos s\u00e3o adjuntos adverbiais: \"cedo\" indica circunst\u00e2ncia de tempo; \"ao local da prova\" indica circunst\u00e2ncia de lugar."},
    {topic:"Adjunto adverbial", statement:"Por causa do tr\u00e2nsito, muitos candidatos se atrasaram.", prompt:"Classifique a locu\u00e7\u00e3o \"por causa do tr\u00e2nsito\" e sua fun\u00e7\u00e3o sint\u00e1tica.", gabarito:"Locu\u00e7\u00e3o com fun\u00e7\u00e3o de adjunto adverbial de causa; explica o motivo do atraso mencionado na ora\u00e7\u00e3o principal."},
    {topic:"Adjunto adverbial", statement:"Com muita calma, o candidato revisou cada resposta.", prompt:"Classifique \"com muita calma\" e explique o efeito de sentido no per\u00edodo.", gabarito:"Adjunto adverbial de modo; evidencia a atitude do candidato durante a revis\u00e3o, refor\u00e7ando a ideia de cuidado e controle emocional."},
    {topic:"Preposi\u00e7\u00f5es", statement:"O texto trata de um tema pol\u00eamico.", prompt:"Classifique a preposi\u00e7\u00e3o \"de\" quanto \u00e0 rela\u00e7\u00e3o de sentido estabelecida.", gabarito:"Preposi\u00e7\u00e3o essencial que introduz o objeto indireto, indicando o assunto/tema tratado pelo texto."},
    {topic:"Preposi\u00e7\u00f5es", statement:"Apesar das dificuldades, o aluno seguiu em frente.", prompt:"Classifique a locu\u00e7\u00e3o prepositiva \"apesar de\" e o valor sem\u00e2ntico da rela\u00e7\u00e3o estabelecida.", gabarito:"Locu\u00e7\u00e3o prepositiva de valor concessivo; introduz um obst\u00e1culo que n\u00e3o impede o resultado expresso na ora\u00e7\u00e3o principal."},
    {topic:"Aposto e vocativo", statement:"Machado de Assis, um dos maiores escritores brasileiros, influenciou gera\u00e7\u00f5es.", prompt:"Classifique o termo \"um dos maiores escritores brasileiros\" e explique sua fun\u00e7\u00e3o.", gabarito:"Aposto explicativo: esclarece/amplia a informa\u00e7\u00e3o sobre \"Machado de Assis\", isolado por v\u00edrgulas."},
    {topic:"Aposto e vocativo", statement:"Aluno, revise bem sua reda\u00e7\u00e3o antes de entregar.", prompt:"Classifique \"Aluno\" quanto \u00e0 fun\u00e7\u00e3o sint\u00e1tica e ao efeito de sentido.", gabarito:"Vocativo: chama/interpela diretamente o interlocutor; \u00e9 termo independente, sem fun\u00e7\u00e3o sint\u00e1tica dentro da ora\u00e7\u00e3o."},
    {topic:"Aposto e vocativo", statement:"A UERJ, universidade p\u00fablica estadual, oferece vestibular pr\u00f3prio.", prompt:"Diferencie a fun\u00e7\u00e3o de \"universidade p\u00fablica estadual\" da de um vocativo, justificando.", gabarito:"Trata-se de aposto explicativo, pois amplia informa\u00e7\u00e3o sobre \"a UERJ\" e integra a estrutura da ora\u00e7\u00e3o; diferentemente do vocativo, n\u00e3o serve para chamar um interlocutor."},
    {topic:"Adjetivos", statement:"O candidato nervoso mal conseguiu concluir a prova dif\u00edcil.", prompt:"Classifique os adjetivos presentes e seu valor (subjetivo/objetivo).", gabarito:"\"Nervoso\" tem valor mais subjetivo (estado emocional do candidato); \"dif\u00edcil\" tem valor mais objetivo (caracter\u00edstica da prova). Ambos funcionam como adjuntos adnominais."},
    {topic:"Adjetivos", statement:"Um simples erro pode custar caro. / Um erro simples pode ser corrigido facilmente.", prompt:"Compare o sentido do adjetivo \"simples\" nas duas posi\u00e7\u00f5es.", gabarito:"Antes do substantivo, \"simples\" tem valor subjetivo (mero, qualquer erro, com \u00eanfase); depois do substantivo, valor objetivo (erro de f\u00e1cil resolu\u00e7\u00e3o). A posi\u00e7\u00e3o altera o sentido."},
    {topic:"Transitividade verbal", statement:"O aluno chegou tarde \u00e0 escola.", prompt:"Classifique o verbo \"chegou\" quanto \u00e0 transitividade.", gabarito:"Verbo intransitivo: n\u00e3o exige complemento obrigat\u00f3rio; \"tarde\" e \"\u00e0 escola\" s\u00e3o adjuntos adverbiais."},
    {topic:"Transitividade verbal", statement:"A banca corrigiu as provas com aten\u00e7\u00e3o.", prompt:"Classifique o verbo \"corrigiu\" quanto \u00e0 transitividade.", gabarito:"Verbo transitivo direto: exige complemento sem preposi\u00e7\u00e3o (\"as provas\")."},
    {topic:"Transitividade verbal", statement:"O professor informou aos alunos o resultado da prova.", prompt:"Classifique o verbo \"informou\" quanto \u00e0 transitividade.", gabarito:"Verbo transitivo direto e indireto (bitransitivo): \"o resultado da prova\" \u00e9 objeto direto; \"aos alunos\" \u00e9 objeto indireto."},
  ]},
  { label: "Semana 4", items: [
    {topic:"Substantivos", statement:"A turma comemorou a aprova\u00e7\u00e3o de todos os alunos.", prompt:"Classifique \"turma\" quanto ao tipo de substantivo.", gabarito:"Substantivo coletivo: designa um conjunto de seres da mesma esp\u00e9cie (alunos reunidos)."},
    {topic:"Substantivos", statement:"A alegria dos aprovados contagiou toda a escola.", prompt:"Classifique \"alegria\" quanto ao tipo de substantivo.", gabarito:"Substantivo abstrato: designa sentimento/estado que s\u00f3 existe em fun\u00e7\u00e3o de um ser, sem exist\u00eancia f\u00edsica pr\u00f3pria."},
    {topic:"Predicativo \u00d7 adjunto adnominal", statement:"O aluno dedicado passou no vestibular. / O aluno passou dedicado no vestibular.", prompt:"Compare a fun\u00e7\u00e3o de \"dedicado\" nas duas frases.", gabarito:"Na primeira, \"dedicado\" \u00e9 adjunto adnominal (qualifica diretamente \"aluno\", antes do verbo). Na segunda, \u00e9 predicativo do sujeito, atribu\u00eddo pelo verbo \"passou\" com valor de liga\u00e7\u00e3o, indicando caracter\u00edstica circunstancial."},
    {topic:"Predicativo \u00d7 adjunto adnominal", statement:"Os professores exigentes aprovaram poucos candidatos.", prompt:"Classifique \"exigentes\".", gabarito:"Adjunto adnominal: qualifica diretamente o substantivo \"professores\", sem depender de predica\u00e7\u00e3o verbal."},
    {topic:"Predicativo \u00d7 adjunto adnominal", statement:"Os professores consideraram os candidatos despreparados.", prompt:"Classifique \"despreparados\".", gabarito:"Predicativo do objeto: atribui caracter\u00edstica a \"os candidatos\" por meio do verbo \"consideraram\"."},
    {topic:"Artigos e numerais", statement:"O candidato revisou a mat\u00e9ria pela terceira vez.", prompt:"Classifique \"a\" (antes de \"mat\u00e9ria\") e \"terceira\".", gabarito:"\"A\" \u00e9 artigo definido, indicando mat\u00e9ria espec\u00edfica e j\u00e1 conhecida; \"terceira\" \u00e9 numeral ordinal, indicando a posi\u00e7\u00e3o da revis\u00e3o na sequ\u00eancia."},
    {topic:"Artigos e numerais", statement:"Um candidato chegou atrasado; os outros dois j\u00e1 haviam entrado.", prompt:"Classifique \"Um\" e \"dois\".", gabarito:"\"Um\" \u00e9 artigo indefinido, indicando candidato n\u00e3o especificado; \"dois\" \u00e9 numeral cardinal, indicando quantidade exata."},
    {topic:"Fun\u00e7\u00e3o sint\u00e1tica das ora\u00e7\u00f5es", statement:"\u00c9 importante que os candidatos revisem todo o conte\u00fado.", prompt:"Classifique a ora\u00e7\u00e3o destacada quanto \u00e0 fun\u00e7\u00e3o sint\u00e1tica.", gabarito:"Ora\u00e7\u00e3o subordinada substantiva subjetiva: exerce a fun\u00e7\u00e3o de sujeito da ora\u00e7\u00e3o principal (\"\u00e9 importante\" + isso)."},
    {topic:"Fun\u00e7\u00e3o sint\u00e1tica das ora\u00e7\u00f5es", statement:"O aluno que estuda todos os dias tem mais chances de aprova\u00e7\u00e3o.", prompt:"Classifique a ora\u00e7\u00e3o destacada.", gabarito:"Ora\u00e7\u00e3o subordinada adjetiva restritiva: restringe o sentido de \"o aluno\", funcionando como adjunto adnominal do antecedente."},
    {topic:"Fun\u00e7\u00e3o sint\u00e1tica das ora\u00e7\u00f5es", statement:"Quando a prova terminar, os candidatos poder\u00e3o sair.", prompt:"Classifique a ora\u00e7\u00e3o destacada.", gabarito:"Ora\u00e7\u00e3o subordinada adverbial temporal: indica a circunst\u00e2ncia de tempo em rela\u00e7\u00e3o \u00e0 ora\u00e7\u00e3o principal."},
    {topic:"Interjei\u00e7\u00f5es + revis\u00e3o geral", statement:"Ufa! Finalmente terminei a prova.", prompt:"Classifique \"Ufa!\" e explique seu valor expressivo.", gabarito:"Interjei\u00e7\u00e3o: exprime al\u00edvio/cansa\u00e7o do falante diante da conclus\u00e3o da prova, sem fun\u00e7\u00e3o sint\u00e1tica no per\u00edodo."},
    {topic:"Interjei\u00e7\u00f5es + revis\u00e3o geral", statement:"Estudando todos os dias, com muita dedica\u00e7\u00e3o, o aluno consegue superar suas dificuldades e alcan\u00e7ar bons resultados.", prompt:"Identifique um pronome, uma locu\u00e7\u00e3o adverbial e uma conjun\u00e7\u00e3o no per\u00edodo, classificando cada um.", gabarito:"\"Suas\" \u00e9 pronome possessivo; \"com muita dedica\u00e7\u00e3o\" \u00e9 locu\u00e7\u00e3o adverbial de modo; \"e\" \u00e9 conjun\u00e7\u00e3o coordenativa aditiva."},
    {topic:"Simulado misto (CG + FS)", statement:"Os candidatos, exaustos ap\u00f3s a prova, aguardavam ansiosamente o resultado que definiria seu futuro.", prompt:"Classifique \"exaustos ap\u00f3s a prova\" quanto \u00e0 fun\u00e7\u00e3o sint\u00e1tica e \"que definiria seu futuro\" quanto ao tipo de ora\u00e7\u00e3o.", gabarito:"\"Exaustos ap\u00f3s a prova\" funciona como predicativo do sujeito, deslocado e isolado por v\u00edrgulas, atribuindo estado a \"os candidatos\". \"Que definiria seu futuro\" \u00e9 ora\u00e7\u00e3o subordinada adjetiva restritiva, que restringe \"o resultado\"."},
    {topic:"Simulado misto (CG + FS)", statement:"Embora tenha errado algumas quest\u00f5es, o candidato confiava em sua prepara\u00e7\u00e3o e esperava ser aprovado.", prompt:"Classifique a conjun\u00e7\u00e3o \"embora\", o termo \"em sua prepara\u00e7\u00e3o\" e o sujeito da \u00faltima ora\u00e7\u00e3o.", gabarito:"\"Embora\" \u00e9 conjun\u00e7\u00e3o subordinativa concessiva; \"em sua prepara\u00e7\u00e3o\" \u00e9 objeto indireto do verbo \"confiava\"; o sujeito de \"esperava ser aprovado\" \u00e9 oculto/desinencial (\"ele\"), retomando \"o candidato\"."},
    {topic:"Simulado misto (CG + FS)", statement:"A banca examinadora, muito criteriosa, avaliou com rigor as reda\u00e7\u00f5es dos candidatos, atribuindo notas justas a cada um.", prompt:"Identifique um adjunto adnominal, um adjunto adverbial e um objeto direto no per\u00edodo, classificando-os.", gabarito:"\"Muito criteriosa\" \u00e9 adjunto adnominal (valor apositivo) de \"a banca examinadora\"; \"com rigor\" \u00e9 adjunto adverbial de modo; \"as reda\u00e7\u00f5es dos candidatos\" \u00e9 objeto direto do verbo \"avaliou\"."},
  ]},
];

(function(){
  var qEl = document.getElementById("questions");
  var qGlobal = 0;
  questionsData.forEach(function(week, wi){
    var det = document.createElement("details");
    det.className = "week-q";
    if (wi === 0) det.open = true;
    var summary = document.createElement("summary");
    summary.innerHTML = '<span>' + week.label + '</span><span class="count">' + week.items.length + ' questões</span>';
    det.appendChild(summary);
    var list = document.createElement("div");
    list.className = "q-list";
    week.items.forEach(function(item, i){
      qGlobal++;
      var qi = document.createElement("div");
      qi.className = "q-item";
      qi.innerHTML =
        '<div class="q-item-head"><span class="q-item-num">' + String(i+1).padStart(2,"0") + '</span><span class="q-item-topic">' + item.topic + '</span></div>' +
        '<p class="q-item-statement">&ldquo;' + item.statement + '&rdquo;</p>' +
        '<p class="q-item-prompt">' + item.prompt + '</p>' +
        '<details><summary>Ver gabarito</summary><p>' + item.gabarito + '</p></details>';
      list.appendChild(qi);
    });
    det.appendChild(list);
    qEl.appendChild(det);
  });
})();

