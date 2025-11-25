// =======================
// VARIÁVEIS IMPORTANTES
// =======================

// input onde digita a tarefa
let inputTarefa = document.getElementById("novaTarefa");

// botão adicionar tarefa
let botaoAdicionar = document.getElementById("botao-adicionar");

// lista UL onde as tarefas vão aparecer
let lista = document.getElementById("lista-tarefas");

// contadores
let nrTotal = document.getElementById("nrTotal");
let nrPendentes = document.getElementById("nrPendentes");
let nrConcluidas = document.getElementById("nrConcluidas");

// array com as tarefas (somente textos)
let tarefas = [];
let tarefasConcluidas = [];


// =======================
// FUNÇÃO PARA ATUALIZAR Os CONTADORES
// =======================
function atualizarContadores() {
    nrTotal.innerHTML = tarefas.length;
    nrPendentes.innerHTML = tarefas.length - tarefasConcluidas.length;
    nrConcluidas.innerHTML = tarefasConcluidas.length;
}


// =======================
// FUNÇÃO PARA CRIAR UMA NOVA TAREFA
// =======================
function adicionarTarefa() {

    let texto = inputTarefa.value.trim(); // texto do input

    // verifica se o input está vazio
    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    // verifica tarefa repetida
    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i] === texto) {
            alert("Essa tarefa já existe!");
            return;
        }
    }

    // adiciona no array
    tarefas.push(texto);

    // cria o elemento li
    let li = document.createElement("li");

    // conteúdo da tarefa
    li.innerHTML = texto +
        `<section>
            <button class="concluir">concluir</button>
            <button class="apagar">apagar</button>
        </section>`;

    // adicionar no HTML
    lista.appendChild(li);

    // evento para CONCLUIR
    li.querySelector(".concluir").addEventListener("click", function () {

        // se ainda não está concluída
        if (!tarefasConcluidas.includes(texto)) {
            tarefasConcluidas.push(texto);
            li.style.textDecoration = "line-through"; // risca texto
        }

        atualizarContadores();
    });

    // evento para APAGAR
    li.querySelector(".apagar").addEventListener("click", function () {

        // remover da lista HTML
        lista.removeChild(li);

        // remover do array tarefas
        for (let i = 0; i < tarefas.length; i++) {
            if (tarefas[i] === texto) {
                tarefas.splice(i, 1);
            }
        }

        // remover do array concluídas
        for (let i = 0; i < tarefasConcluidas.length; i++) {
            if (tarefasConcluidas[i] === texto) {
                tarefasConcluidas.splice(i, 1);
            }
        }

        atualizarContadores();
    });

    atualizarContadores();
    inputTarefa.value = ""; // limpa o input
}


// =======================
// BOTÃO ADICIONAR
// =======================
botaoAdicionar.addEventListener("click", adicionarTarefa);
