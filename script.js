// bibliotecas e codigos de terceiros
const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd')
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
}

// object
const atividade = {
    nome: "Almoço",
    data: new Date(2024, 7, 8, 10, 0),
    finalizada: true
}

// lista, arrray, vetor
let atividades = [
    atividade,
    {
        nome: 'Academia em grupo',
        data: new Date(2024, 7, 9, 12, 0),
        finalizada: false
    },
    {
        nome: 'Gaming session',
        data: new Date(2024, 7, 9, 16, 0),
        finalizada: true
    },
]

// atividades = []

// Arrow function
const criarItemAtividade = (atividade) => {
    
    let input = `
    <input
    onchange="concluirAtividade(event)"
    value="${atividade.data}"
    type="checkbox"
    `

    if(atividade.finalizada) {
        input += 'checked'
    }

    input += '>'

    const formatar = formatador(atividade.data);

    return `
    <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>
            ${formatar.dia.semana.longo},
            dia ${formatar.dia.numerico}
            de ${formatar.mes}
            às ${formatar.hora}h
        </time>
    </div>
    `;
};

const atualizarListaAtividade = () => {
    const section = document.querySelector('section')
    section.innerHTML = ''

    // verificar se a lista está vazia

    if(atividades.length == 0) {
        section.innerHTML = '<p>Nenhuma atividade cadastrada.</p>'
        return
    }

    for(let atividade of atividades) {
    section.innerHTML += criarItemAtividade(atividade)
    }
}

atualizarListaAtividade()

const salvarAtividade = (event) => {
    event.preventDefault()
    const dadosFormulario = new FormData(event.target)

    const nome = dadosFormulario.get('activity')
    const dia = dadosFormulario.get('dia')
    const hora = dadosFormulario.get('hora')

    const data = `${dia} ${hora}`

    const novaAtividade = {
        nome,
        data,
        finalizada: false
    }

    const atividadeExiste = atividades.find((atividade) => {
        return atividade.data == novaAtividade.data
    })

    if(atividadeExiste) {
        return alert('Dia/Hora não disponivel')
    }

    atividades = [novaAtividade, ...atividades]
    atualizarListaAtividade()
}

const criarDiasSelecao = () => {
    const dias = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03",
    ]

    let diasSelecao = ''

    for(let dia of dias) {
        const formatar = formatador(dia)
        const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}`
        diasSelecao += `<option value="${dia}">${diaFormatado}</option>`
    }

    document
    .querySelector('select[name="dia"]')
    .innerHTML = diasSelecao
}

criarDiasSelecao()

const criarHorasSelecao = () => {
    let horasDisponiveis = ''

    for(let i = 6; i < 23; i++) {
        const hora = String(i).padStart(2, '0')
        horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    }

    document
    .querySelector('select[name="hora"]')
    .innerHTML = horasDisponiveis
}

criarHorasSelecao()

const concluirAtividade = (event) => {
    const input = event.target
    const dataInput = input.value

    const atividade = atividade.find((atividade) => {
        return atividade.data == dataInput
    })

    if(!atividade) {
        return
    }

    atividade.finalizada = !atividade.finalizada
}