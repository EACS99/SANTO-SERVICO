// =======================================================
// SORTEADOR LITÚRGICO
// Código completo, limpo e corrigido
// =======================================================

// -------------------------------
// ELEMENTOS DA INTERFACE
// -------------------------------

const botaoIniciar = document.getElementById("btnIniciar")
const botaoVoltarParaConfiguracao = document.getElementById("btnVoltarConfig")
const botaoSelecionarCerimoniarios = document.getElementById("btnCerimoniarios")
const botaoSelecionarCoroinhas = document.getElementById("btnCoroinhas")
const botaoSortear = document.getElementById("btnSortear")
const botaoInserirNoMes = document.getElementById("btnInserirNoMes")
const botaoGerarEscalaMensal = document.getElementById("btnGerarEscalaMensal")
const campoModoEscalaMensal = document.getElementById("modoEscalaMensal")
const menuExportacao = document.getElementById("menuExportacao")
const botaoExportarPdf = document.getElementById("btnExportarPdf")
const botaoExportarImagem = document.getElementById("btnExportarImagem")

const telaInicial = document.getElementById("telaInicial")
const telaConfiguracao = document.getElementById("telaConfiguracao")
const telaSorteio = document.getElementById("telaSorteio")

const campoDataCelebracao = document.getElementById("dataCelebracao")
const campoMesCelebracao = document.getElementById("mesCelebracao")
const campoMissaComBispo = document.getElementById("missaComBispo")
const textoResumoBispo = document.getElementById("resumoBispo")
const campoLocalCelebracao = document.getElementById("localCelebracao")
const campoHoraCelebracao = document.getElementById("horaCelebracao")
const campoNomesParticipantes = document.getElementById("nomes")

const textoInfoLiturgia = document.getElementById("infoLiturgia")
const textoInfoCorLiturgica = document.getElementById("infoCor")
const textoInfoSignificadoCor = document.getElementById("infoSignificado")
const textoResumoData = document.getElementById("resumoData")
const textoResumoPastoral = document.getElementById("resumoClasse")
const textoResumoLocal = document.getElementById("resumoLocal")
const textoResumoHora = document.getElementById("resumoHora")
const textoResumoTipoMissa = document.getElementById("resumoTipoMissa")

const listaFuncoes = document.getElementById("funcoes")
const areaResultadoSorteio = document.getElementById("resultado")
const areaEscalaMensal = document.getElementById("escalaMensal")
const resumoCelebracao = document.getElementById("resumoCelebracao")
const painelEscalaMensal = document.getElementById("painelEscalaMensal")
// -------------------------------
// CONFIGURAÇÕES
// -------------------------------

const PASTORAL = {
  CERIMONIARIOS: "cerimoniarios",
  COROINHAS: "coroinhas",
}

let pastoralSelecionada = PASTORAL.CERIMONIARIOS
const escalaMensal = []
let ultimoResultadoSorteado = null
let ultimasFuncoesSorteadas = []

const diasDaSemana = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
]

const LOCAL = {
  MATRIZ: "matriz",
  CAPELA: "capela",
}

const nomePorLocal = {
  [LOCAL.MATRIZ]: "Matriz",
  [LOCAL.CAPELA]: "Capela",
}

const pastoralPorNome = {
  [PASTORAL.CERIMONIARIOS]: "Cerimoniário",
  [PASTORAL.COROINHAS]: "Coroinha",
}

const funcoesExtrasCerimoniariosComBispo = ["Missal Bispo", "Móvel Bispo"]
const funcoesExtrasCoroinhasComBispo = ["Mitra", "Báculo"]

const funcoesSempreExclusivasCerimoniarios = ["Missal", "Turíbulo"]

const funcoesExclusivasComBispoCerimoniarios = ["Missal Bispo", "Móvel Bispo"]

const funcoesExclusivasCoroinhas = ["Naveta", "Báculo", "Mitra"]

const funcoesPorPastoral = {
  [PASTORAL.CERIMONIARIOS]: ["Missal", "Móvel", "Ofertório", "Turíbulo"],

  [PASTORAL.COROINHAS]: [
    "Aspersório",
    "Carrilhão",
    "Cruz",
    "Naveta",
    "Ofertório",
    "Patena",
    "Purificatório",
    "Vela",
  ],
}

const quantidadeDeCoroinhasPorFuncao = {
  Aspersório: 1,
  Carrilhão: 1,
  Cruz: 1,
  Matraca: 1,
  Naveta: 1,
  Ofertório: 2,
  Patena: 4,
  Purificatório: 1,
  Vela: 2,
}

const significadoPorCorLiturgica = {
  branco: {
    nome: "Branco",
    significado: "Natal, festas do Senhor, solenidades e alegria litúrgica.",
  },

  verde: {
    nome: "Verde",
    significado: "Tempo Comum, esperança e caminhada da fé.",
  },

  roxo: {
    nome: "Roxo",
    significado: "Advento, Quaresma, penitência, preparação e conversão.",
  },

  vermelho: {
    nome: "Vermelho",
    significado:
      "Paixão, Domingo de Ramos, Pentecostes, mártires e Espírito Santo.",
  },

  rosa: {
    nome: "Rosa",
    significado: "Alegria nos domingos especiais do Advento e da Quaresma.",
  },

  preto: {
    nome: "Preto",
    significado: "Luto e celebrações de defuntos.",
  },

  dourado: {
    nome: "Dourado",
    significado:
      "Tempo Pascal, solenidade, luz do Cristo ressuscitado e alegria pascal.",
  },

  "sem-cor": {
    nome: "Sem cor",
    significado: "Sábado Santo, silêncio litúrgico e espera da Ressurreição.",
  },
}

const classesDeTemaLiturgico = [
  "tema-branco",
  "tema-verde",
  "tema-roxo",
  "tema-vermelho",
  "tema-rosa",
  "tema-preto",
  "tema-dourado",
  "tema-sem-cor",
]

function obterFuncoesExclusivasCerimoniarios() {
  if (missaComBispoFoiSelecionada()) {
    return [
      ...funcoesSempreExclusivasCerimoniarios,
      ...funcoesExclusivasComBispoCerimoniarios,
    ]
  }

  return funcoesSempreExclusivasCerimoniarios
}

// -------------------------------
// CONTROLE DE TELAS
// -------------------------------

const rotasDasTelas = {
  inicio: telaInicial,
  configuracao: telaConfiguracao,
  sorteio: telaSorteio,
}

const rotaPorIdDaTela = {
  [telaInicial.id]: "inicio",
  [telaConfiguracao.id]: "configuracao",
  [telaSorteio.id]: "sorteio",
}

function exibirTela(telaParaExibir, adicionarAoHistorico = true) {
  telaInicial.classList.remove("ativa")
  telaConfiguracao.classList.remove("ativa")
  telaSorteio.classList.remove("ativa")

  telaParaExibir.classList.add("ativa")

  const rotaDaTela = rotaPorIdDaTela[telaParaExibir.id]

  if (adicionarAoHistorico && rotaDaTela) {
    const hashAtual = location.hash.replace("#", "")

    if (hashAtual !== rotaDaTela) {
      history.pushState({ tela: rotaDaTela }, "", `#${rotaDaTela}`)
    }
  }

  rolarTelaParaTopo(telaParaExibir)
}

function rolarTelaParaTopo(tela) {
  const elementoFocado = document.activeElement

  if (elementoFocado) {
    elementoFocado.blur()
  }

  requestAnimationFrame(() => {
    tela.scrollTop = 0
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    })
  })
}

function iniciarNavegacaoPeloNavegador() {
  history.replaceState({ tela: "inicio" }, "", "#inicio")

  exibirTela(telaInicial, false)
}

window.addEventListener("popstate", (event) => {
  const rota = event.state?.tela || location.hash.replace("#", "") || "inicio"

  const telaParaExibir = rotasDasTelas[rota] || telaInicial

  exibirTela(telaParaExibir, false)
})

// -------------------------------
// FUNÇÕES DE DATA
// -------------------------------

function criarData(ano, mes, dia) {
  return new Date(ano, mes - 1, dia, 12, 0, 0)
}

function criarDataPorIso(dataIso) {
  const [ano, mes, dia] = dataIso.split("-").map(Number)
  return criarData(ano, mes, dia)
}

function somarDias(data, dias) {
  const novaData = new Date(data)
  novaData.setDate(novaData.getDate() + dias)
  return novaData
}

function formatarDataParaIso(data) {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, "0")
  const dia = String(data.getDate()).padStart(2, "0")

  return `${ano}-${mes}-${dia}`
}

function formatarDataParaExibicao(dataIso) {
  if (!dataIso) return "--"

  const [ano, mes, dia] = dataIso.split("-")
  return `${dia}/${mes}/${ano}`
}

function formatarHoraParaEscala(hora) {
  if (!hora) return "--"

  const [horas, minutos] = hora.split(":")
  return minutos === "00" ? `${horas}H` : `${horas}H${minutos}`
}

function obterDiaDaSemana(dataIso) {
  return diasDaSemana[criarDataPorIso(dataIso).getDay()]
}

function calcularDiferencaEmDias(dataFinal, dataInicial) {
  const milissegundosPorDia = 1000 * 60 * 60 * 24
  return Math.round((dataFinal - dataInicial) / milissegundosPorDia)
}

function encontrarProximoDomingo(data) {
  const novaData = new Date(data)

  while (novaData.getDay() !== 0) {
    novaData.setDate(novaData.getDate() + 1)
  }

  return novaData
}

function calcularDataDaPascoa(ano) {
  const a = ano % 19
  const b = Math.floor(ano / 100)
  const c = ano % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const mes = Math.floor((h + l - 7 * m + 114) / 31)
  const dia = ((h + l - 7 * m + 114) % 31) + 1

  return criarData(ano, mes, dia)
}

function calcularDataDoBatismoDoSenhor(ano) {
  return encontrarProximoDomingo(criarData(ano, 1, 7))
}

function calcularDataDoPrimeiroDomingoDoAdvento(ano) {
  const dataAtual = criarData(ano, 11, 27)

  while (dataAtual.getDay() !== 0) {
    dataAtual.setDate(dataAtual.getDate() + 1)
  }

  return dataAtual
}

// -------------------------------
// CELEBRAÇÕES E TEMPO LITÚRGICO
// -------------------------------

function criarCelebracao(tempo, cor, grau) {
  return { tempo, cor, grau }
}

function criarPeriodoLiturgico(inicio, fim, tempo, cor) {
  return { inicio, fim, tempo, cor }
}

const celebracoesFixasBrasil = {
  "01-01": criarCelebracao("Santa Maria, Mãe de Deus", "branco", "solenidade"),
  "02-02": criarCelebracao("Apresentação do Senhor", "branco", "festa"),

  "03-19": criarCelebracao(
    "São José, esposo da Virgem Maria",
    "branco",
    "solenidade",
  ),
  "03-25": criarCelebracao("Anunciação do Senhor", "branco", "solenidade"),

  "04-25": criarCelebracao("São Marcos, evangelista", "vermelho", "festa"),

  "05-01": criarCelebracao("São José Operário", "branco", "memoria"),
  "05-03": criarCelebracao(
    "São Filipe e São Tiago, apóstolos",
    "vermelho",
    "festa",
  ),
  "05-14": criarCelebracao("São Matias, apóstolo", "vermelho", "festa"),

  "06-24": criarCelebracao(
    "Nascimento de São João Batista",
    "branco",
    "solenidade",
  ),
  "06-29": criarCelebracao(
    "São Pedro e São Paulo, apóstolos",
    "vermelho",
    "solenidade",
  ),

  "07-03": criarCelebracao("São Tomé, apóstolo", "vermelho", "festa"),

  "08-06": criarCelebracao("Transfiguração do Senhor", "branco", "festa"),
  "08-10": criarCelebracao(
    "São Lourenço, diácono e mártir",
    "vermelho",
    "festa",
  ),
  "08-15": criarCelebracao("Assunção de Nossa Senhora", "branco", "solenidade"),

  "09-14": criarCelebracao("Exaltação da Santa Cruz", "vermelho", "festa"),
  "09-29": criarCelebracao(
    "Santos Arcanjos Miguel, Gabriel e Rafael",
    "branco",
    "festa",
  ),

  "10-12": criarCelebracao("Nossa Senhora Aparecida", "branco", "solenidade"),

  "11-01": criarCelebracao("Todos os Santos", "branco", "solenidade"),
  "11-02": criarCelebracao("Fiéis Defuntos", "preto", "comemoracao"),

  "12-08": criarCelebracao("Imaculada Conceição", "branco", "solenidade"),
  "12-25": criarCelebracao("Natal do Senhor", "branco", "solenidade"),
}

const memoriasFixasVermelhas = {
  "01-20": "São Fabião e São Sebastião, mártires",
  "01-21": "Santa Inês, virgem e mártir",
  "02-05": "Santa Águeda, virgem e mártir",
  "02-06": "Santos Paulo Miki e companheiros, mártires",
  "02-23": "São Policarpo, bispo e mártir",
  "03-07": "Santas Perpétua e Felicidade, mártires",
  "04-23": "São Jorge, mártir",
  "06-01": "São Justino, mártir",
  "06-03": "São Carlos Lwanga e companheiros, mártires",
  "06-22": "São João Fisher e São Tomás More, mártires",
  "06-28": "Santo Irineu, bispo e mártir",
  "07-11": "São Bento, abade",
  "07-22": "Santa Maria Madalena",
  "07-25": "São Tiago, apóstolo",
  "08-24": "São Bartolomeu, apóstolo",
  "08-29": "Martírio de São João Batista",
  "09-21": "São Mateus, apóstolo e evangelista",
  "09-26": "São Cosme e São Damião, mártires",
  "09-28": "São Venceslau e São Lourenço Ruiz, mártires",
  "10-18": "São Lucas, evangelista",
  "10-28": "São Simão e São Judas, apóstolos",
  "11-30": "Santo André, apóstolo",
  "12-26": "Santo Estêvão, primeiro mártir",
  "12-28": "Santos Inocentes, mártires",
}

function obterCelebracoesTransferidasDoBrasil(ano) {
  const celebracoes = {}

  const epifania = encontrarProximoDomingo(criarData(ano, 1, 2))
  const ascensao = somarDias(calcularDataDaPascoa(ano), 42)
  const saoPedroESaoPaulo = encontrarProximoDomingo(criarData(ano, 6, 29))
  const assuncao = encontrarProximoDomingo(criarData(ano, 8, 15))
  const todosOsSantos = encontrarProximoDomingo(criarData(ano, 11, 1))

  celebracoes[formatarDataParaIso(epifania)] = criarCelebracao(
    "Epifania do Senhor",
    "branco",
    "solenidade",
  )

  celebracoes[formatarDataParaIso(ascensao)] = criarCelebracao(
    "Ascensão do Senhor",
    "branco",
    "solenidade",
  )

  celebracoes[formatarDataParaIso(saoPedroESaoPaulo)] = criarCelebracao(
    "São Pedro e São Paulo, apóstolos",
    "vermelho",
    "solenidade",
  )

  celebracoes[formatarDataParaIso(assuncao)] = criarCelebracao(
    "Assunção de Nossa Senhora",
    "branco",
    "solenidade",
  )

  celebracoes[formatarDataParaIso(todosOsSantos)] = criarCelebracao(
    "Todos os Santos",
    "branco",
    "solenidade",
  )

  return celebracoes
}

function obterCelebracoesMoveisDoAno(ano) {
  const pascoa = calcularDataDaPascoa(ano)

  const quartaFeiraDeCinzas = somarDias(pascoa, -46)
  const domingoDeRamos = somarDias(pascoa, -7)
  const quintaFeiraSanta = somarDias(pascoa, -3)
  const sextaFeiraSanta = somarDias(pascoa, -2)
  const sabadoSanto = somarDias(pascoa, -1)
  const pentecostes = somarDias(pascoa, 49)
  const santissimaTrindade = somarDias(pascoa, 56)
  const corpusChristi = somarDias(pascoa, 60)
  const sagradoCoracao = somarDias(pascoa, 68)

  const primeiroDomingoDoAdvento = calcularDataDoPrimeiroDomingoDoAdvento(ano)
  const cristoRei = somarDias(primeiroDomingoDoAdvento, -7)

  return {
    [formatarDataParaIso(quartaFeiraDeCinzas)]: criarCelebracao(
      "Quarta-feira de Cinzas",
      "roxo",
      "dia litúrgico",
    ),

    [formatarDataParaIso(domingoDeRamos)]: criarCelebracao(
      "Domingo de Ramos e da Paixão do Senhor",
      "vermelho",
      "domingo",
    ),

    [formatarDataParaIso(quintaFeiraSanta)]: criarCelebracao(
      "Quinta-feira da Ceia do Senhor",
      "branco",
      "tríduo",
    ),

    [formatarDataParaIso(sextaFeiraSanta)]: criarCelebracao(
      "Sexta-feira da Paixão do Senhor",
      "vermelho",
      "tríduo",
    ),

    [formatarDataParaIso(sabadoSanto)]: criarCelebracao(
      "Sábado Santo",
      "sem-cor",
      "tríduo",
    ),

    [formatarDataParaIso(pascoa)]: criarCelebracao(
      "Domingo de Páscoa da Ressurreição do Senhor",
      "branco",
      "solenidade",
    ),

    [formatarDataParaIso(pentecostes)]: criarCelebracao(
      "Pentecostes",
      "vermelho",
      "solenidade",
    ),

    [formatarDataParaIso(santissimaTrindade)]: criarCelebracao(
      "Santíssima Trindade",
      "branco",
      "solenidade",
    ),

    [formatarDataParaIso(corpusChristi)]: criarCelebracao(
      "Santíssimo Corpo e Sangue de Cristo",
      "branco",
      "solenidade",
    ),

    [formatarDataParaIso(sagradoCoracao)]: criarCelebracao(
      "Sagrado Coração de Jesus",
      "branco",
      "solenidade",
    ),

    [formatarDataParaIso(cristoRei)]: criarCelebracao(
      "Nosso Senhor Jesus Cristo, Rei do Universo",
      "branco",
      "solenidade",
    ),
  }
}

function identificarCelebracaoEspecial(dataIso) {
  const ano = Number(dataIso.split("-")[0])
  const mesDia = dataIso.slice(5)

  const celebracoesMoveis = obterCelebracoesMoveisDoAno(ano)
  const celebracoesTransferidas = obterCelebracoesTransferidasDoBrasil(ano)

  if (celebracoesMoveis[dataIso]) {
    return celebracoesMoveis[dataIso]
  }

  if (celebracoesTransferidas[dataIso]) {
    return celebracoesTransferidas[dataIso]
  }

  if (celebracoesFixasBrasil[mesDia]) {
    return celebracoesFixasBrasil[mesDia]
  }

  if (memoriasFixasVermelhas[mesDia]) {
    return criarCelebracao(
      memoriasFixasVermelhas[mesDia],
      "vermelho",
      "memoria",
    )
  }

  return null
}

function gerarPeriodosDoAnoLiturgico(ano) {
  const pascoa = calcularDataDaPascoa(ano)

  const quartaFeiraDeCinzas = somarDias(pascoa, -46)
  const domingoDeRamos = somarDias(pascoa, -7)
  const quintaFeiraSanta = somarDias(pascoa, -3)
  const pentecostes = somarDias(pascoa, 49)

  const batismoDoSenhor = calcularDataDoBatismoDoSenhor(ano)
  const primeiroDomingoDoAdvento = calcularDataDoPrimeiroDomingoDoAdvento(ano)

  return [
    criarPeriodoLiturgico(
      `${ano}-01-01`,
      formatarDataParaIso(batismoDoSenhor),
      "Tempo do Natal",
      "branco",
    ),

    criarPeriodoLiturgico(
      formatarDataParaIso(somarDias(batismoDoSenhor, 1)),
      formatarDataParaIso(somarDias(quartaFeiraDeCinzas, -1)),
      "Tempo Comum",
      "verde",
    ),

    criarPeriodoLiturgico(
      formatarDataParaIso(quartaFeiraDeCinzas),
      formatarDataParaIso(somarDias(domingoDeRamos, -1)),
      "Quaresma",
      "roxo",
    ),

    criarPeriodoLiturgico(
      formatarDataParaIso(domingoDeRamos),
      formatarDataParaIso(somarDias(quintaFeiraSanta, -1)),
      "Semana Santa",
      "roxo",
    ),

    criarPeriodoLiturgico(
      formatarDataParaIso(pascoa),
      formatarDataParaIso(somarDias(pentecostes, -1)),
      "Tempo Pascal",
      "branco",
    ),

    criarPeriodoLiturgico(
      formatarDataParaIso(somarDias(pentecostes, 1)),
      formatarDataParaIso(somarDias(primeiroDomingoDoAdvento, -1)),
      "Tempo Comum",
      "verde",
    ),

    criarPeriodoLiturgico(
      formatarDataParaIso(primeiroDomingoDoAdvento),
      `${ano}-12-24`,
      "Advento",
      "roxo",
    ),

    criarPeriodoLiturgico(
      `${ano}-12-25`,
      `${ano}-12-31`,
      "Tempo do Natal",
      "branco",
    ),
  ]
}

function obterTempoLiturgico(dataIso) {
  const ano = Number(dataIso.split("-")[0])
  const periodos = gerarPeriodosDoAnoLiturgico(ano)

  const periodoEncontrado = periodos.find((periodo) => {
    return dataIso >= periodo.inicio && dataIso <= periodo.fim
  })

  if (periodoEncontrado) {
    return {
      tempo: periodoEncontrado.tempo,
      cor: periodoEncontrado.cor,
      grau: "tempo",
    }
  }

  return criarCelebracao("Tempo Comum", "verde", "tempo")
}

function celebracaoPodeSobrescreverTempo(
  liturgiaAtual,
  celebracaoEspecial,
  dataIso,
) {
  if (!celebracaoEspecial) return false

  const data = criarDataPorIso(dataIso)
  const ehDomingo = data.getDay() === 0

  const diasMaisFortes = [
    "Semana Santa",
    "Quinta-feira da Ceia do Senhor",
    "Sexta-feira da Paixão do Senhor",
    "Sábado Santo",
    "Domingo de Páscoa da Ressurreição do Senhor",
    "Pentecostes",
  ]

  if (diasMaisFortes.includes(liturgiaAtual.tempo)) {
    return false
  }

  if (ehDomingo && celebracaoEspecial.grau === "memoria") {
    return false
  }

  if (
    liturgiaAtual.tempo === "Quaresma" &&
    celebracaoEspecial.grau === "memoria"
  ) {
    return false
  }

  return true
}

function ehDomingoGaudete(liturgiaAtual, data, ehDomingo) {
  if (liturgiaAtual.tempo !== "Advento" || !ehDomingo) {
    return false
  }

  const primeiroDomingoDoAdvento = calcularDataDoPrimeiroDomingoDoAdvento(
    data.getFullYear(),
  )

  const diasDesdeInicioDoAdvento = calcularDiferencaEmDias(
    data,
    primeiroDomingoDoAdvento,
  )

  return diasDesdeInicioDoAdvento >= 14 && diasDesdeInicioDoAdvento <= 20
}

function ehDomingoLaetare(liturgiaAtual, data, ehDomingo) {
  if (liturgiaAtual.tempo !== "Quaresma" || !ehDomingo) {
    return false
  }

  const pascoa = calcularDataDaPascoa(data.getFullYear())
  const quartaFeiraDeCinzas = somarDias(pascoa, -46)

  const diasDesdeQuartaFeiraDeCinzas = calcularDiferencaEmDias(
    data,
    quartaFeiraDeCinzas,
  )

  return (
    diasDesdeQuartaFeiraDeCinzas >= 25 && diasDesdeQuartaFeiraDeCinzas <= 31
  )
}

function aplicarExcecoesLiturgicas(dataIso, liturgiaAtual) {
  const data = criarDataPorIso(dataIso)
  const ehDomingo = data.getDay() === 0
  const celebracaoEspecial = identificarCelebracaoEspecial(dataIso)

  if (
    celebracaoEspecial &&
    celebracaoPodeSobrescreverTempo(liturgiaAtual, celebracaoEspecial, dataIso)
  ) {
    return celebracaoEspecial
  }

  if (ehDomingoGaudete(liturgiaAtual, data, ehDomingo)) {
    return criarCelebracao("3º Domingo do Advento - Gaudete", "rosa", "domingo")
  }

  if (ehDomingoLaetare(liturgiaAtual, data, ehDomingo)) {
    return criarCelebracao(
      "4º Domingo da Quaresma - Laetare",
      "rosa",
      "domingo",
    )
  }

  return liturgiaAtual
}

function identificarLiturgiaPorData(dataIso) {
  if (!dataIso) {
    return criarCelebracao("Data não selecionada", "verde", "")
  }

  const tempoLiturgico = obterTempoLiturgico(dataIso)
  return aplicarExcecoesLiturgicas(dataIso, tempoLiturgico)
}

function identificarLiturgiaPredominanteDoMes(dataIso) {
  const datasDoMes = obterDatasDoMes(dataIso)
  const contagemPorCor = {}

  datasDoMes.forEach((dataDoMes) => {
    const liturgia = obterTempoLiturgico(dataDoMes)

    contagemPorCor[liturgia.cor] = (contagemPorCor[liturgia.cor] || 0) + 1
  })

  const corPredominante = Object.entries(contagemPorCor).sort((a, b) => {
    return b[1] - a[1]
  })[0][0]

  const primeiroDiaComCorPredominante = datasDoMes.find((dataDoMes) => {
    return obterTempoLiturgico(dataDoMes).cor === corPredominante
  })

  return obterTempoLiturgico(primeiroDiaComCorPredominante)
}

function identificarLiturgiaVisualDoMes(dataIso) {
  if (!dataIso) {
    return criarCelebracao("Mês não selecionado", "verde", "")
  }

  return obterTempoLiturgico(dataIso)
}

// -------------------------------
// REGRAS DAS FUNÇÕES
// -------------------------------

function ehQuartaFeiraDeCinzas(dataIso) {
  if (!dataIso) return false

  const celebracaoEspecial = identificarCelebracaoEspecial(dataIso)
  return celebracaoEspecial?.tempo === "Quarta-feira de Cinzas"
}

function ehPeriodoRestritoDaQuaresma(dataIso) {
  if (!dataIso) return false

  const tempoBase = obterTempoLiturgico(dataIso).tempo

  return tempoBase === "Quaresma" && !ehQuartaFeiraDeCinzas(dataIso)
}

function missaPermiteTuribuloENaveta(dataIso) {
  if (missaComBispoFoiSelecionada()) return true

  if (ehQuartaFeiraDeCinzas(dataIso)) return true

  const liturgia = identificarLiturgiaPorData(dataIso)

  if (liturgia.tempo === "Quarta-feira de Cinzas") return true

  if (liturgia.tempo === "Quaresma") return false

  if (liturgia.tempo === "Semana Santa") return true

  if (!missaSemanalFoiDetectada(dataIso)) return true

  return liturgiaPermiteTuribuloENaveta(dataIso)
}

function dataEhDomingo(dataIso) {
  if (!dataIso) return false
  return criarDataPorIso(dataIso).getDay() === 0
}

function obterTipoMissaPelaData(dataIso) {
  return dataEhDomingo(dataIso) ? "dominical" : "semanal"
}

function missaSemanalFoiDetectada(dataIso) {
  return obterTipoMissaPelaData(dataIso) === "semanal"
}

function cerimoniarioSemanalUsaSomenteMissal(pastoral, dataIso) {
  return (
    pastoral === PASTORAL.CERIMONIARIOS && missaSemanalFoiDetectada(dataIso)
  )
}

function missaComBispoFoiSelecionada() {
  if (modoEscalaMensalEstaAtivo()) {
    return false
  }

  return campoMissaComBispo.value === "sim"
}

function removerTuribuloENaveta(funcoes, pastoral) {
  if (pastoral === PASTORAL.CERIMONIARIOS) {
    return funcoes.filter((funcao) => funcao !== "Turíbulo")
  }

  if (pastoral === PASTORAL.COROINHAS) {
    return funcoes.filter((funcao) => funcao !== "Naveta")
  }

  return funcoes
}

function adicionarFuncoesExtrasComBispo(funcoes, pastoral) {
  if (pastoral === PASTORAL.CERIMONIARIOS) {
    return [...funcoes, ...funcoesExtrasCerimoniariosComBispo]
  }

  if (pastoral === PASTORAL.COROINHAS) {
    return [...funcoes, ...funcoesExtrasCoroinhasComBispo]
  }

  return funcoes
}

function liturgiaPermiteTuribuloENaveta(dataIso) {
  const celebracao = identificarCelebracaoEspecial(dataIso)

  return ["festa", "solenidade", "memoria"].includes(celebracao?.grau)
}

function obterFuncoesDaPastoralParaData(pastoral, dataIso) {
  let funcoes = [...funcoesPorPastoral[pastoral]]

  // REGRA: Cerimoniários em missa semanal usam somente Missal
  if (cerimoniarioSemanalUsaSomenteMissal(pastoral, dataIso)) {
    return ["Missal"]
  }

  // REGRA: Turíbulo/Naveta
  if (!missaPermiteTuribuloENaveta(dataIso)) {
    funcoes = removerTuribuloENaveta(funcoes, pastoral)
  }

  // REGRA: Quaresma para coroinhas
  if (pastoral === PASTORAL.COROINHAS && ehPeriodoRestritoDaQuaresma(dataIso)) {
    funcoes = funcoes
      .filter((funcao) => funcao !== "Naveta")
      .map((funcao) => {
        if (funcao === "Carrilhão") return "Matraca"
        return funcao
      })
  }

  // REGRA: Missa com bispo
  if (missaComBispoFoiSelecionada()) {
    funcoes = adicionarFuncoesExtrasComBispo(funcoes, pastoral)
  }

  return funcoes.sort((a, b) => a.localeCompare(b, "pt-BR"))
}

// -------------------------------
// INTERFACE LITÚRGICA
// -------------------------------

function obterDescricaoDaCorLiturgica(corLiturgica) {
  return (
    significadoPorCorLiturgica[corLiturgica] || significadoPorCorLiturgica.verde
  )
}

function aplicarTemaLiturgico(corLiturgica) {
  document.body.classList.remove(...classesDeTemaLiturgico)
  document.body.classList.add(`tema-${corLiturgica}`)
}

function limparInformacoesLiturgicas() {
  textoInfoLiturgia.textContent =
    "Selecione uma data para identificar a liturgia."
  textoInfoCorLiturgica.textContent = "Cor litúrgica: --"
  textoInfoSignificadoCor.textContent = "Significado: --"
  listaFuncoes.innerHTML = ""

  aplicarTemaLiturgico("verde")
}

function exibirInformacoesLiturgicas(liturgia, descricaoCor) {
  const grau = liturgia.grau ? ` (${liturgia.grau})` : ""

  textoInfoLiturgia.textContent = `Liturgia detectada: ${liturgia.tempo}${grau}`
  textoInfoCorLiturgica.textContent = `Cor litúrgica: ${descricaoCor.nome}`
  textoInfoSignificadoCor.textContent = `Significado: ${descricaoCor.significado}`
}

function exibirFuncoesNaTela(funcoes) {
  listaFuncoes.innerHTML = ""

  funcoes.forEach((funcao) => {
    const item = document.createElement("li")
    item.textContent = funcao
    listaFuncoes.appendChild(item)
  })
}

function atualizarInformacoesDaLiturgiaNaTela() {
  const dataIso = obterDataBaseDaInterface()

  if (!dataIso) {
    limparInformacoesLiturgicas()
    return
  }

  const liturgia = modoEscalaMensalEstaAtivo()
    ? identificarLiturgiaPredominanteDoMes(dataIso)
    : identificarLiturgiaPorData(dataIso)

  const descricaoCor = obterDescricaoDaCorLiturgica(liturgia.cor)
  const funcoes = obterFuncoesDaPastoralParaData(pastoralSelecionada, dataIso)

  exibirInformacoesLiturgicas(liturgia, descricaoCor)
  exibirFuncoesNaTela(funcoes)
  aplicarTemaLiturgico(liturgia.cor)
  atualizarResumoDoSorteio()
}

function atualizarResumoDoSorteio() {
  const dataIso = obterDataBaseDaInterface()
  const tipoMissa = obterTipoMissaPelaData(dataIso)

  const tipoMissaPorNome = {
    dominical: "Missa dominical",
    semanal: "Missa semanal",
  }

  textoResumoData.textContent = `Data: ${formatarDataParaExibicao(dataIso)}`

  textoResumoLocal.textContent = campoLocalCelebracao.value
    ? `Local: ${nomePorLocal[campoLocalCelebracao.value]}`
    : ""

  textoResumoHora.textContent = campoHoraCelebracao.value
    ? `Hora: ${formatarHoraParaEscala(campoHoraCelebracao.value)}`
    : ""

  textoResumoTipoMissa.textContent = `Tipo de missa: ${
    dataIso ? tipoMissaPorNome[tipoMissa] : "--"
  }`

  textoResumoBispo.textContent = `Com bispo: ${
    missaComBispoFoiSelecionada() ? "Sim" : "Não"
  }`

  textoResumoPastoral.textContent = `Pastoral: ${
    pastoralPorNome[pastoralSelecionada]
  }`
}

// -------------------------------
// NOMES
// -------------------------------

function normalizarTexto(texto) {
  return texto.toLowerCase().trim()
}

function extrairNomesDoTexto(texto) {
  return texto
    .split(/[\n,]+/)
    .map((nome) => nome.replace(/\s+/g, " ").trim())
    .filter((nome) => nome.length > 0)
}

function removerNomesDuplicados(nomes) {
  const nomesSemDuplicidade = []
  const nomesJaAdicionados = new Set()

  nomes.forEach((nome) => {
    const nomeNormalizado = normalizarTexto(nome)

    if (!nomesJaAdicionados.has(nomeNormalizado)) {
      nomesJaAdicionados.add(nomeNormalizado)
      nomesSemDuplicidade.push(nome)
    }
  })

  return nomesSemDuplicidade
}

function removerNomesDaLista(nomes, nomesParaRemover) {
  const nomesNormalizadosParaRemover = nomesParaRemover.map((nome) =>
    normalizarTexto(nome),
  )

  return nomes.filter((nome) => {
    return !nomesNormalizadosParaRemover.includes(normalizarTexto(nome))
  })
}

// -------------------------------
// SORTEIO
// -------------------------------

function embaralharLista(lista) {
  const listaEmbaralhada = [...lista]

  for (let indice = listaEmbaralhada.length - 1; indice > 0; indice--) {
    const indiceAleatorio = Math.floor(Math.random() * (indice + 1))

    const itemAtual = listaEmbaralhada[indice]
    listaEmbaralhada[indice] = listaEmbaralhada[indiceAleatorio]
    listaEmbaralhada[indiceAleatorio] = itemAtual
  }

  return listaEmbaralhada
}

function validarDadosParaSorteio(dataCelebracao, nomesParticipantes) {
  if (!dataCelebracao) {
    const mensagem = modoEscalaMensalEstaAtivo()
      ? "Selecione o mês da celebração."
      : "Selecione a data da celebração."

    alert(mensagem)
    return false
  }

  if (nomesParticipantes.length === 0) {
    alert("Digite ao menos um nome.")
    return false
  }

  return true
}

function executarSorteio() {
  const dataCelebracao = campoDataCelebracao.value
  const nomesInformados = extrairNomesDoTexto(campoNomesParticipantes.value)
  const nomesParticipantes = removerNomesDuplicados(nomesInformados)

  if (!validarDadosParaSorteio(dataCelebracao, nomesParticipantes)) {
    return
  }

  const funcoes = obterFuncoesDaPastoralParaData(
    pastoralSelecionada,
    dataCelebracao,
  )

  if (pastoralSelecionada === PASTORAL.CERIMONIARIOS) {
    sortearCerimoniarios(nomesParticipantes, funcoes)
    return
  }

  sortearCoroinhas(nomesParticipantes, funcoes)
}

function obterProximoNomeDaLista(nomes, indice) {
  if (nomes.length === 0) {
    return ""
  }

  return nomes[indice % nomes.length]
}

function sortearCerimoniarios(nomesParticipantes, funcoes) {
  const funcoesExclusivasCerimoniarios = obterFuncoesExclusivasCerimoniarios()

  const funcoesExclusivas = funcoes.filter((funcao) =>
    funcoesExclusivasCerimoniarios.includes(funcao),
  )

  if (nomesParticipantes.length < funcoesExclusivas.length) {
    alert(
      `Você precisa de pelo menos ${funcoesExclusivas.length} nomes para não repetir as funções exclusivas.`,
    )
    return
  }

  const resultado = {}
  const nomesEmbaralhados = embaralharLista(nomesParticipantes)

  let nomesDisponiveisParaExclusivas = [...nomesEmbaralhados]
  let nomesBloqueados = []

  funcoes.forEach((funcao) => {
    if (!funcoesExclusivasCerimoniarios.includes(funcao)) {
      return
    }

    const nomeSorteado = nomesDisponiveisParaExclusivas[0]

    resultado[funcao] = nomeSorteado
    nomesBloqueados.push(nomeSorteado)

    nomesDisponiveisParaExclusivas = removerNomesDaLista(
      nomesDisponiveisParaExclusivas,
      [nomeSorteado],
    )
  })

  const nomesDisponiveisParaDemaisFuncoes = removerNomesDaLista(
    nomesEmbaralhados,
    nomesBloqueados,
  )

  let indiceParaDemaisFuncoes = 0

  funcoes.forEach((funcao) => {
    if (resultado[funcao]) return

    resultado[funcao] = obterProximoNomeDaLista(
      nomesDisponiveisParaDemaisFuncoes.length > 0
        ? nomesDisponiveisParaDemaisFuncoes
        : nomesEmbaralhados,
      indiceParaDemaisFuncoes,
    )

    indiceParaDemaisFuncoes++
  })

  exibirResultado(resultado, funcoes)
}

function sortearCoroinhas(nomesParticipantes, funcoes) {
  if (nomesParticipantes.length < 2) {
    alert("Para coroinhas, você precisa de pelo menos 2 nomes.")
    return
  }

  const resultado = {}
  const funcoesOrdenadas = ordenarFuncoesDeCoroinhasPorPrioridade(funcoes)

  funcoesOrdenadas.forEach((funcao) => {
    const quantidadeNecessaria = quantidadeDeCoroinhasPorFuncao[funcao] || 1

    const nomesDisponiveis = obterNomesDisponiveisParaFuncaoDeCoroinha(
      nomesParticipantes,
      resultado,
      funcao,
    )

    resultado[funcao] = sortearQuantidadeDeNomes(
      nomesDisponiveis,
      quantidadeNecessaria,
    )
  })

  exibirResultado(resultado, funcoes)
}

function ordenarFuncoesDeCoroinhasPorPrioridade(funcoes) {
  return [...funcoes].sort((funcaoAtual, proximaFuncao) => {
    if (funcaoAtual === "Naveta") return -1
    if (proximaFuncao === "Naveta") return 1

    if (funcaoAtual === "Cruz") return -1
    if (proximaFuncao === "Cruz") return 1

    return 0
  })
}

function obterNomesDisponiveisParaFuncaoDeCoroinha(
  nomesParticipantes,
  resultadoAtual,
  funcao,
) {
  let nomesDisponiveis = [...nomesParticipantes]

  if (funcoesExclusivasCoroinhas.includes(funcao)) {
    return removerNomesUsadosEmFuncoesExclusivasDeCoroinhas(
      nomesDisponiveis,
      resultadoAtual,
    )
  }

  nomesDisponiveis = removerNomesUsadosEmFuncoesExclusivasDeCoroinhas(
    nomesDisponiveis,
    resultadoAtual,
  )

  if (funcao === "Vela") {
    nomesDisponiveis = tentarRemoverResponsavelPelaCruz(
      nomesDisponiveis,
      resultadoAtual,
    )
  }

  return nomesDisponiveis
}

function removerNomesUsadosEmFuncoesExclusivasDeCoroinhas(
  nomesDisponiveis,
  resultadoAtual,
) {
  const nomesJaUsados = funcoesExclusivasCoroinhas.flatMap((funcao) => {
    const valor = resultadoAtual[funcao]
    return valor ? (Array.isArray(valor) ? valor : [valor]) : []
  })

  return removerNomesDaLista(nomesDisponiveis, nomesJaUsados)
}

function tentarRemoverResponsavelPelaCruz(nomesDisponiveis, resultadoAtual) {
  if (!resultadoAtual["Cruz"]) {
    return nomesDisponiveis
  }

  const nomesSemResponsavelPelaCruz = removerNomesDaLista(
    nomesDisponiveis,
    resultadoAtual["Cruz"],
  )

  if (nomesSemResponsavelPelaCruz.length === 0) {
    return nomesDisponiveis
  }

  return nomesSemResponsavelPelaCruz
}

function sortearQuantidadeDeNomes(nomesDisponiveis, quantidade) {
  const nomesEmbaralhados = embaralharLista(nomesDisponiveis)

  if (nomesEmbaralhados.length === 0) {
    return []
  }

  const nomesSorteados = []

  for (let indice = 0; indice < quantidade; indice++) {
    nomesSorteados.push(nomesEmbaralhados[indice % nomesEmbaralhados.length])
  }

  return nomesSorteados
}

// -------------------------------
// ESCALA MENSAL AUTOMÁTICA
// -------------------------------

function obterDatasDoMes(dataIso) {
  const dataBase = criarDataPorIso(dataIso)
  const ano = dataBase.getFullYear()
  const mes = dataBase.getMonth()
  const datas = []

  const dataAtual = new Date(ano, mes, 1, 12, 0, 0)

  while (dataAtual.getMonth() === mes) {
    datas.push(formatarDataParaIso(dataAtual))
    dataAtual.setDate(dataAtual.getDate() + 1)
  }

  return datas
}

function ehSegundaFeira(dataIso) {
  return criarDataPorIso(dataIso).getDay() === 1
}

function ehSextaFeira(dataIso) {
  return criarDataPorIso(dataIso).getDay() === 5
}

function ehCelebracaoDaEscalaMensal(dataIso) {
  const celebracao = identificarCelebracaoEspecial(dataIso)

  return [
    "festa",
    "solenidade",
    "tríduo",
    "domingo",
    "dia litúrgico",
    "comemoracao",
  ].includes(celebracao?.grau)
}

const HORARIOS_MISSA_DOMINICAL = ["07:00", "10:00", "18:00"]
const HORARIOS_MISSA_SEGUNDA_FEIRA = ["19:00"]
const HORARIOS_MISSA_SEXTA_FEIRA = ["19:00"]

function criarCelebracoesMensaisPorData(dataIso) {
  // Domingo tem prioridade sobre festa, solenidade ou dia de santo
  if (dataEhDomingo(dataIso)) {
    return HORARIOS_MISSA_DOMINICAL.map((hora) => ({
      dataIso,
      hora,
    }))
  }

  // Celebração especial durante a semana
  if (ehCelebracaoDaEscalaMensal(dataIso)) {
    return [
      {
        dataIso,
        hora: campoHoraCelebracao.value || "19:00",
      },
    ]
  }

  // Segunda-feira
  if (ehSegundaFeira(dataIso)) {
    return HORARIOS_MISSA_SEGUNDA_FEIRA.map((hora) => ({
      dataIso,
      hora,
    }))
  }

  // Sexta-feira
  if (ehSextaFeira(dataIso)) {
    return HORARIOS_MISSA_SEXTA_FEIRA.map((hora) => ({
      dataIso,
      hora,
    }))
  }

  return []
}

function obterCelebracoesParaEscalaMensal(dataIso) {
  const modo = campoModoEscalaMensal.value

  if (modo === "livre") {
    return [
      {
        dataIso,
        hora: campoHoraCelebracao.value || "19:00",
      },
    ]
  }

  return obterDatasDoMes(dataIso).flatMap((dataDoMes) => {
    return criarCelebracoesMensaisPorData(dataDoMes)
  })
}

function criarControleMensalDeFuncoes(nomesParticipantes) {
  const controle = {}

  nomesParticipantes.forEach((nome) => {
    controle[normalizarTexto(nome)] = new Set()
  })

  return controle
}

function nomeJaFezFuncaoNoMes(nome, funcao, controleMensal) {
  return controleMensal[normalizarTexto(nome)]?.has(funcao)
}

function registrarFuncaoDoNomeNoMes(nome, funcao, controleMensal) {
  const chave = normalizarTexto(nome)

  if (!controleMensal[chave]) {
    controleMensal[chave] = new Set()
  }

  controleMensal[chave].add(funcao)
}

function nomeEstaBloqueadoNoDia(nome, nomesBloqueadosNoDia) {
  return nomesBloqueadosNoDia.has(normalizarTexto(nome))
}

function escolherNomesParaFuncaoMensal({
  nomesParticipantes,
  funcao,
  quantidade,
  controleMensal,
  nomesBloqueadosNoDia = new Set(),
  nomesProibidos = [],
}) {
  const nomesProibidosNormalizados = nomesProibidos.map(normalizarTexto)

  const nomesValidosNoDia = nomesParticipantes.filter((nome) => {
    const nomeNormalizado = normalizarTexto(nome)

    return (
      !nomeEstaBloqueadoNoDia(nome, nomesBloqueadosNoDia) &&
      !nomesProibidosNormalizados.includes(nomeNormalizado)
    )
  })

  if (nomesValidosNoDia.length === 0) {
    return []
  }

  const nomesQueAindaNaoFizeramAFuncao = nomesValidosNoDia.filter((nome) => {
    return !nomeJaFezFuncaoNoMes(nome, funcao, controleMensal)
  })

  const nomesPreferenciais =
    nomesQueAindaNaoFizeramAFuncao.length > 0
      ? nomesQueAindaNaoFizeramAFuncao
      : nomesValidosNoDia

  const nomesSorteados = sortearQuantidadeDeNomesSemRepetirSePossivel(
    nomesPreferenciais,
    quantidade,
  )

  nomesSorteados.forEach((nome) => {
    registrarFuncaoDoNomeNoMes(nome, funcao, controleMensal)
  })

  return nomesSorteados
}

function sortearQuantidadeDeNomesSemRepetirSePossivel(
  nomesDisponiveis,
  quantidade,
) {
  const nomesEmbaralhados = embaralharLista(nomesDisponiveis)

  return nomesEmbaralhados.slice(0, quantidade)
}

function bloquearNomesNoDia(nomes, nomesBloqueadosNoDia) {
  nomes.forEach((nome) => {
    nomesBloqueadosNoDia.add(normalizarTexto(nome))
  })
}

function ordenarFuncoesDeCerimoniariosPorPrioridade(funcoes) {
  const funcoesExclusivas = obterFuncoesExclusivasCerimoniarios()

  return [...funcoes].sort((funcaoAtual, proximaFuncao) => {
    const atualEhExclusiva = funcoesExclusivas.includes(funcaoAtual)
    const proximaEhExclusiva = funcoesExclusivas.includes(proximaFuncao)

    if (atualEhExclusiva && !proximaEhExclusiva) return -1
    if (!atualEhExclusiva && proximaEhExclusiva) return 1

    return 0
  })
}

function sortearCerimoniariosMensal(
  nomesParticipantes,
  funcoes,
  controleMensal,
) {
  const resultado = {}
  const nomesBloqueadosNoDia = new Set()
  const funcoesOrdenadas = ordenarFuncoesDeCerimoniariosPorPrioridade(funcoes)

  funcoesOrdenadas.forEach((funcao) => {
    const ehFuncaoExclusiva =
      obterFuncoesExclusivasCerimoniarios().includes(funcao)

    const nomesSorteados = escolherNomesParaFuncaoMensal({
      nomesParticipantes,
      funcao,
      quantidade: 1,
      controleMensal,
      nomesBloqueadosNoDia,
    })

    resultado[funcao] = nomesSorteados[0]

    if (ehFuncaoExclusiva) {
      bloquearNomesNoDia(nomesSorteados, nomesBloqueadosNoDia)
    }
  })

  return resultado
}

function sortearCoroinhasMensal(nomesParticipantes, funcoes, controleMensal) {
  const resultado = {}
  const nomesBloqueadosNoDia = new Set()
  const funcoesOrdenadas = ordenarFuncoesDeCoroinhasPorPrioridade(funcoes)

  funcoesOrdenadas.forEach((funcao) => {
    const quantidade = quantidadeDeCoroinhasPorFuncao[funcao] || 1
    const ehFuncaoExclusiva = funcoesExclusivasCoroinhas.includes(funcao)

    const nomesProibidos =
      funcao === "Vela" && resultado["Cruz"] ? resultado["Cruz"] : []

    const nomesSorteados = escolherNomesParaFuncaoMensal({
      nomesParticipantes,
      funcao,
      quantidade,
      controleMensal,
      nomesBloqueadosNoDia,
      nomesProibidos,
    })

    resultado[funcao] = nomesSorteados

    if (ehFuncaoExclusiva) {
      bloquearNomesNoDia(nomesSorteados, nomesBloqueadosNoDia)
    }
  })

  return resultado
}

function sortearDiaMensal(nomesParticipantes, funcoes, controleMensal) {
  if (pastoralSelecionada === PASTORAL.CERIMONIARIOS) {
    return sortearCerimoniariosMensal(
      nomesParticipantes,
      funcoes,
      controleMensal,
    )
  }

  return sortearCoroinhasMensal(nomesParticipantes, funcoes, controleMensal)
}

function identificarNomesForaDaEscala(nomesParticipantes, escalaGerada) {
  const nomesUsados = new Set()

  escalaGerada.forEach((item) => {
    Object.values(item.resultado).forEach((valor) => {
      const nomes = Array.isArray(valor) ? valor : [valor]

      nomes.forEach((nome) => {
        if (nome) {
          nomesUsados.add(normalizarTexto(nome))
        }
      })
    })
  })

  return nomesParticipantes.filter((nome) => {
    return !nomesUsados.has(normalizarTexto(nome))
  })
}

function gerarEscalaMensalAutomatica() {
  const dataBase = modoEscalaMensalEstaAtivo()
    ? `${campoMesCelebracao.value}-01`
    : campoDataCelebracao.value

  const nomesInformados = extrairNomesDoTexto(campoNomesParticipantes.value)
  const nomesParticipantes = removerNomesDuplicados(nomesInformados)

  if (!validarDadosParaSorteio(dataBase, nomesParticipantes)) {
    return
  }

  const missasPersonalizadas = escalaMensal.filter((item) => item.personalizada)

  escalaMensal.length = 0
  escalaMensal.push(...missasPersonalizadas)

  const celebracoesDaEscala = obterCelebracoesParaEscalaMensal(dataBase)
  const controleMensal = criarControleMensalDeFuncoes(nomesParticipantes)
  const escalaGerada = []

  celebracoesDaEscala.forEach((celebracaoDaEscala) => {
    const { dataIso, hora } = celebracaoDaEscala
    const liturgia = identificarLiturgiaPorData(dataIso)
    const funcoes = obterFuncoesDaPastoralParaData(pastoralSelecionada, dataIso)
    const resultado = sortearDiaMensal(
      nomesParticipantes,
      funcoes,
      controleMensal,
    )

    const item = {
      dataIso,
      data: formatarDataParaExibicao(dataIso),
      diaSemana: obterDiaDaSemana(dataIso),
      hora: formatarHoraParaEscala(hora),
      local: nomePorLocal[campoLocalCelebracao.value] || "--",
      pastoral: pastoralPorNome[pastoralSelecionada],
      cor: liturgia.cor,
      liturgia: liturgia.tempo,
      resultado,
    }

    escalaMensal.push(item)
    escalaGerada.push(item)
  })

  gerarEscalaMensalNaTela()
  exibirNomesForaDaEscala(nomesParticipantes, escalaGerada)
}

function exibirNomesForaDaEscala(nomesParticipantes, escalaGerada) {
  const nomesFora = identificarNomesForaDaEscala(
    nomesParticipantes,
    escalaGerada,
  )

  if (nomesFora.length === 0) {
    areaResultadoSorteio.innerHTML =
      "<strong>Escala mensal gerada.</strong><br>Todos os nomes foram utilizados."
    return
  }

  areaResultadoSorteio.innerHTML = `
    <strong>Escala mensal gerada.</strong>
    <p><strong>Nomes que ficaram de fora:</strong></p>
    <ul>
      ${nomesFora.map((nome) => `<li>${nome}</li>`).join("")}
    </ul>
  `
}

// -------------------------------
// RESULTADO
// -------------------------------

function exibirResultado(resultado, funcoes) {
  ultimoResultadoSorteado = resultado
  ultimasFuncoesSorteadas = funcoes

  resumoCelebracao.innerHTML = criarHtmlResumoCelebracao()
  areaResultadoSorteio.innerHTML = criarHtmlDoResultado(resultado, funcoes)
}

function criarHtmlResumoCelebracao() {
  const dataIso = campoDataCelebracao.value

  const tipoMissaPorNome = {
    dominical: "Missa dominical",
    semanal: "Missa semanal",
  }

  return `
    <div class="linha-resumo">
      <strong>Local:</strong> ${nomePorLocal[campoLocalCelebracao.value] || "--"}
    </div>

    <div class="linha-resumo">
      <strong>Hora:</strong> ${formatarHoraParaEscala(campoHoraCelebracao.value)}
    </div>

    <div class="linha-resumo">
      <strong>Tipo de missa:</strong> ${
        dataIso ? tipoMissaPorNome[obterTipoMissaPelaData(dataIso)] : "--"
      }
    </div>

    <div class="linha-resumo">
      <strong>Com bispo:</strong> ${
        missaComBispoFoiSelecionada() ? "Sim" : "Não"
      }
    </div>
  `
}

function registrarSorteioNaEscalaMensal(resultado) {
  const dataIso = campoDataCelebracao.value
  const liturgia = identificarLiturgiaPorData(dataIso)

  escalaMensal.push({
    dataIso,
    data: formatarDataParaExibicao(dataIso),
    diaSemana: obterDiaDaSemana(dataIso),
    hora: campoHoraCelebracao.value
      ? formatarHoraParaEscala(campoHoraCelebracao.value)
      : "--",

    local: nomePorLocal[campoLocalCelebracao.value] || "--",
    pastoral: pastoralPorNome[pastoralSelecionada],
    cor: liturgia.cor,
    liturgia: liturgia.tempo,
    resultado,
  })

  gerarEscalaMensalNaTela()
}

function inserirMissaEspecificaNoMes() {
  if (modoEscalaMensalEstaAtivo()) {
    alert("Essa opção só funciona em Missa específica.")
    return
  }

  const dataIso = campoDataCelebracao.value

  if (!dataIso) {
    alert("Selecione a data da celebração.")
    return
  }

  if (!campoHoraCelebracao.value) {
    alert("Selecione a hora da celebração.")
    return
  }

  if (!ultimoResultadoSorteado) {
    alert("Faça o sorteio antes de inserir no mês.")
    return
  }

  const liturgia = identificarLiturgiaPorData(dataIso)

  const item = {
    dataIso,
    data: formatarDataParaExibicao(dataIso),
    diaSemana: obterDiaDaSemana(dataIso),
    hora: formatarHoraParaEscala(campoHoraCelebracao.value),
    local: nomePorLocal[campoLocalCelebracao.value] || "--",
    pastoral: pastoralPorNome[pastoralSelecionada],
    cor: liturgia.cor,
    liturgia: liturgia.tempo,
    resultado: { ...ultimoResultadoSorteado },
    personalizada: true,
  }

  escalaMensal.push(item)
  gerarEscalaMensalNaTela()

  alert("Missa personalizada inserida na escala mensal.")
}

function gerarEscalaMensalNaTela() {
  if (escalaMensal.length === 0) {
    areaEscalaMensal.textContent = "Nenhuma escala mensal gerada ainda."
    return
  }

  const diasAgrupados = agruparEscalaPorDia(escalaMensal)

  areaEscalaMensal.innerHTML = diasAgrupados
    .map(criarHtmlDoDiaDaEscala)
    .join("")
}

function agruparEscalaPorDia(escala) {
  const escalaOrdenada = [...escala].sort((a, b) => {
    if (a.dataIso !== b.dataIso) return a.dataIso.localeCompare(b.dataIso)
    if (a.hora !== b.hora) return a.hora.localeCompare(b.hora)
    return a.pastoral.localeCompare(b.pastoral, "pt-BR")
  })

  return escalaOrdenada.reduce((dias, item) => {
    const chaveDoDia = `${item.dataIso}-${item.local}`

    let dia = dias.find((diaAtual) => diaAtual.chave === chaveDoDia)

    if (!dia) {
      dia = {
        chave: chaveDoDia,
        data: item.data,
        diaSemana: item.diaSemana,
        hora: item.hora,
        local: item.local,
        liturgia: item.liturgia,
        cor: item.cor,
        escalas: [],
      }

      dias.push(dia)
    }

    dia.escalas.push(item)
    return dias
  }, [])
}

function criarHtmlDoDiaDaEscala(dia) {
  return `
    <article class="dia-escala cor-escala-${dia.cor}">
      <header class="cabecalho-dia-escala">
        <div>
          <strong>${dia.data}</strong>
          <span>${dia.diaSemana}</span>
        </div>

        <div>
          <strong>${dia.hora}</strong>
          <span>${dia.local}</span>
        </div>
      </header>

      <p class="liturgia-dia-escala">${dia.liturgia}</p>

      ${dia.escalas.map(criarHtmlDaPastoralNoDia).join("")}
    </article>
  `
}

function criarHtmlDaPastoralNoDia(item) {
  return `
    <section class="pastoral-escala">
      <h3>${item.hora} - ${item.pastoral}</h3>

      <table class="tabela-escala">
        <thead>
          <tr>
            <th>Função</th>
            <th>Nome</th>
          </tr>
        </thead>

        <tbody>
          ${Object.entries(item.resultado).map(criarLinhaDaFuncao).join("")}
        </tbody>
      </table>
    </section>
  `
}

function criarCampoNomeEditavel(nomes) {
  const nomesFormatados = Array.isArray(nomes)
    ? nomes.length > 0
      ? nomes.join(", ")
      : ""
    : nomes || ""

  return `
    <input
      type="text"
      class="campo-nome-editavel"
      value="${nomesFormatados}"
    />
  `
}

function criarLinhaDaFuncao([funcao, nomes]) {
  return `
    <tr>
      <td>${funcao}</td>
      <td>${criarCampoNomeEditavel(nomes)}</td>
    </tr>
  `
}

function criarHtmlDoResultado(resultado, funcoes) {
  let html = "<ol>"

  funcoes.forEach((funcao) => {
    const valor = resultado[funcao] || "—"
    const nomes = Array.isArray(valor) ? valor.join(", ") : valor

    html += `
  <li>
    <strong>${funcao}:</strong>
    ${criarCampoNomeEditavel(nomes)}
  </li>
`
  })

  html += "</ol>"

  return html
}

function limparResultadoDoSorteio() {
  areaResultadoSorteio.innerHTML = "Nenhum sorteio realizado ainda."
  resumoCelebracao.innerHTML = ""
}

// -------------------------------
// AÇÕES DA TELA
// -------------------------------

function selecionarPastoral(pastoral) {
  const escalaMensalAtiva = modoEscalaMensalEstaAtivo()

  if (escalaMensalAtiva && !campoMesCelebracao.value) {
    alert("Selecione o mês da celebração.")
    return
  }

  if (!escalaMensalAtiva && !campoDataCelebracao.value) {
    alert("Selecione a data da celebração.")
    return
  }

  pastoralSelecionada = pastoral

  atualizarBotoesDePastoralSelecionada()
  atualizarResumoDoSorteio()
  atualizarInformacoesDaLiturgiaNaTela()
  atualizarInterfaceDoModoDeEscala()
  exibirTela(telaSorteio)
}

function atualizarBotoesDePastoralSelecionada() {
  const cerimoniariosFoiSelecionado =
    pastoralSelecionada === PASTORAL.CERIMONIARIOS

  botaoSelecionarCerimoniarios.classList.toggle(
    "ativo",
    cerimoniariosFoiSelecionado,
  )

  botaoSelecionarCoroinhas.classList.toggle(
    "ativo",
    !cerimoniariosFoiSelecionado,
  )
}

function modoEscalaMensalEstaAtivo() {
  return campoModoEscalaMensal.value === "automatico"
}

function obterDataBaseDaInterface() {
  if (modoEscalaMensalEstaAtivo()) {
    return campoMesCelebracao.value ? `${campoMesCelebracao.value}-01` : ""
  }

  return campoDataCelebracao.value
}

function atualizarInterfaceDoModoDeEscala() {
  const escalaMensalAtiva = modoEscalaMensalEstaAtivo()

  painelEscalaMensal.classList.toggle("oculto", !escalaMensalAtiva)

  botaoSortear.classList.toggle("oculto", escalaMensalAtiva)
  botaoGerarEscalaMensal.classList.toggle("oculto", !escalaMensalAtiva)
  botaoInserirNoMes.classList.toggle("oculto", escalaMensalAtiva)

  campoHoraCelebracao
    .closest(".grupo-campo")
    .classList.toggle("oculto", escalaMensalAtiva)

  campoMissaComBispo
    .closest(".grupo-campo")
    .classList.toggle("oculto", escalaMensalAtiva)

  campoHoraCelebracao.disabled = escalaMensalAtiva
  campoMissaComBispo.disabled = escalaMensalAtiva

  atualizarCampoDeDataPorModo()

  if (escalaMensalAtiva) {
    textoResumoHora.textContent = "Hora: automática"
    textoResumoBispo.textContent = "Com bispo: não se aplica à escala mensal"
    return
  }

  atualizarResumoDoSorteio()
}

function atualizarCampoDeDataPorModo() {
  const escalaMensalAtiva = modoEscalaMensalEstaAtivo()

  campoDataCelebracao.classList.toggle("oculto", escalaMensalAtiva)
  campoMesCelebracao.classList.toggle("oculto", !escalaMensalAtiva)
}

function abrirSeletorDoCampo(campo) {
  if (typeof campo.showPicker === "function") {
    campo.showPicker()
  }
}

function obterNomeDoArquivoEscala(extensao) {
  const dataIso = campoDataCelebracao.value || "escala"
  return `escala-mensal-${dataIso}.${extensao}`
}

function validarEscalaParaExportacao() {
  if (escalaMensal.length === 0) {
    alert("Gere a escala mensal antes de exportar.")
    return false
  }

  return true
}

async function capturarEscalaMensalComoCanvas() {
  return await html2canvas(areaEscalaMensal, {
    scale: 2,
    backgroundColor: "#000",
  })
}

async function exportarEscalaMensalComoImagem() {
  if (!validarEscalaParaExportacao()) return

  const canvas = await capturarEscalaMensalComoCanvas()
  const link = document.createElement("a")

  link.download = obterNomeDoArquivoEscala("png")
  link.href = canvas.toDataURL("image/png")
  link.click()

  menuExportacao.classList.remove("ativo")
}

async function exportarEscalaMensalComoPdf() {
  if (!validarEscalaParaExportacao()) return

  const canvas = await capturarEscalaMensalComoCanvas()
  const imagem = canvas.toDataURL("image/png")

  const { jsPDF } = window.jspdf
  const pdf = new jsPDF("p", "mm", "a4")

  const larguraPagina = pdf.internal.pageSize.getWidth()
  const alturaPagina = pdf.internal.pageSize.getHeight()

  const larguraImagem = larguraPagina - 20
  const alturaImagem = (canvas.height * larguraImagem) / canvas.width

  pdf.addImage(imagem, "PNG", 10, 10, larguraImagem, alturaImagem)

  if (alturaImagem > alturaPagina - 20) {
    alert(
      "A escala ficou muito grande para uma página. A imagem PNG pode ficar melhor.",
    )
  }

  pdf.save(obterNomeDoArquivoEscala("pdf"))

  menuExportacao.classList.remove("ativo")
}

// -------------------------------
// EVENTOS
// -------------------------------

campoModoEscalaMensal.addEventListener("change", () => {
  atualizarInterfaceDoModoDeEscala()
  atualizarInformacoesDaLiturgiaNaTela()
  limparResultadoDoSorteio()
})

campoDataCelebracao.addEventListener("click", () => {
  abrirSeletorDoCampo(campoDataCelebracao)
})

campoMesCelebracao.addEventListener("click", () => {
  abrirSeletorDoCampo(campoMesCelebracao)
})

campoDataCelebracao.addEventListener("change", () => {
  atualizarInformacoesDaLiturgiaNaTela()
  limparResultadoDoSorteio()
})

campoMesCelebracao.addEventListener("change", () => {
  atualizarInformacoesDaLiturgiaNaTela()
  limparResultadoDoSorteio()
})

campoHoraCelebracao.addEventListener("change", () => {
  atualizarResumoDoSorteio()
  limparResultadoDoSorteio()
})

campoLocalCelebracao.addEventListener("change", () => {
  atualizarResumoDoSorteio()
  limparResultadoDoSorteio()
})

campoMissaComBispo.addEventListener("change", () => {
  atualizarInformacoesDaLiturgiaNaTela()
  atualizarResumoDoSorteio()
  limparResultadoDoSorteio()
})

botaoIniciar.addEventListener("click", () => {
  exibirTela(telaConfiguracao)
})

botaoVoltarParaConfiguracao.addEventListener("click", () => {
  exibirTela(telaConfiguracao)
  limparResultadoDoSorteio()
})

botaoSelecionarCerimoniarios.addEventListener("click", () => {
  selecionarPastoral(PASTORAL.CERIMONIARIOS)
})

botaoSelecionarCoroinhas.addEventListener("click", () => {
  selecionarPastoral(PASTORAL.COROINHAS)
})

botaoSortear.addEventListener("click", executarSorteio)
botaoGerarEscalaMensal.addEventListener("click", () => {
  gerarEscalaMensalAutomatica()

  if (escalaMensal.length === 0) return

  menuExportacao.classList.toggle("ativo")
})
botaoInserirNoMes.addEventListener("click", inserirMissaEspecificaNoMes)
botaoExportarImagem.addEventListener("click", exportarEscalaMensalComoImagem)
botaoExportarPdf.addEventListener("click", exportarEscalaMensalComoPdf)

document.addEventListener("click", (event) => {
  const clicouDentroDoMenu = menuExportacao.contains(event.target)
  const clicouNoBotaoGerar = botaoGerarEscalaMensal.contains(event.target)
  const clicouEmCampoEditavel = event.target.classList.contains(
    "campo-nome-editavel",
  )

  if (clicouDentroDoMenu || clicouNoBotaoGerar || clicouEmCampoEditavel) {
    return
  }

  menuExportacao.classList.remove("ativo")
})

function gerarOpcoesDeHora() {
  campoHoraCelebracao.innerHTML = `<option value="" disabled selected>--:--</option>`

  for (let hora = 7; hora <= 22; hora++) {
    ;["00", "30"].forEach((minuto) => {
      if (hora === 22 && minuto === "30") return

      const valor = `${String(hora).padStart(2, "0")}:${minuto}`

      const option = document.createElement("option")
      option.value = valor
      option.textContent = valor

      campoHoraCelebracao.appendChild(option)
    })
  }
}

// -------------------------------
// INICIALIZAÇÃO
// -------------------------------

gerarOpcoesDeHora()
iniciarPlaceholdersVisuais()
atualizarBotoesDePastoralSelecionada()
atualizarInterfaceDoModoDeEscala()
atualizarInformacoesDaLiturgiaNaTela()
iniciarNavegacaoPeloNavegador()

function aplicarPlaceholderVisual(campo) {
  if (!campo.value) {
    campo.classList.add("vazio")
    return
  }

  campo.classList.remove("vazio")
}

function iniciarPlaceholdersVisuais() {
  const camposComPlaceholderVisual = [
    campoDataCelebracao,
    campoHoraCelebracao,
    campoMesCelebracao,
  ]

  camposComPlaceholderVisual.forEach((campo) => {
    aplicarPlaceholderVisual(campo)

    campo.addEventListener("input", () => {
      aplicarPlaceholderVisual(campo)
    })

    campo.addEventListener("change", () => {
      aplicarPlaceholderVisual(campo)
    })
  })
}
