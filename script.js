// object
const atividade = {
    nome: "Almoço",
    data: new Date(2024, 7, 8, 10, 0),
    finalizada: true
}

// lista, arrray, vetor
const atividades = [
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

// Arrow function
const criarItemAtividade = (atividade) => {
    
    let input = '<input type="checkbox" '

    if(atividade.finalizada) {
        input += 'checked'
    }

    input += '>'

    return `
    <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>${atividade.data}</time>
    </div>
    `;
};

const section = document.querySelector('section')

for(let atividade of atividades) {
    section.innerHTML += criarItemAtividade(atividade)
}

