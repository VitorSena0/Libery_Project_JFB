// Configurações da tabela jquery;
// https://api.jquery.com/ready/
// https://datatables.net/reference/option/
// https://api.jquery.com/on/
// https://datatables.net/reference/api/search()

$(document).ready(function () {
    $('#myTable').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [5, 2, 10, 25, 50],
        "order": [[0, "asc"]],
        "language": {
            "search": "Pesquisar:",
            "lengthMenu": "Mostrar _MENU_ elementos",
            "zeroRecords": "Nenhum resultado encontrado",
            "info": "Mostrando _START_ até _END_ de _TOTAL_ elementos",
            "infoEmpty": "Mostrando 0 até 0 de 0 elementos",
            "infoFiltered": "(filtrado de _MAX_ elementos no total)"
        }
    });

    $('#search').on('keyup', function () {
        $('#myTable').DataTable().search($(this).val()).draw();
    });
});

let date = new Date().toLocaleDateString();
console.log(date)

const form = document.querySelector('.Emprestimo')
const submit = document.querySelector('#submit');
const nomelivro = document.querySelector('#nomeLivro');
const nomeAluno = document.querySelector('#nomeAluno');
const dataEmprestimo = document.querySelector('#data');
let id = null;
let status = "add";
let itens = {};

function deleteItem(pointer) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/emprestimo/DeleteEmprestimo', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    let data = {
        id: pointer
    };
    var jsonData = JSON.stringify(data);
    console.log("work it!");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.error('Erro na requisição:', xhr.status);
            }
        }
    }
    xhr.send(jsonData);
    let table = document.getElementById("data");
    let element = document.getElementById(`${pointer}`);
    table.removeChilde(element);
}

function insertItem(item, pointer) {
    form.action = "/emprestimo/addEmprestimo"
    let tr = document.createElement('tr');
    tr.id = pointer
    tr.innerHTML = `
        <td id="${pointer}-aluno">${item.aluno}</td>
        <td id="${pointer}-livro">${item.livro}</td>
        <td id="${pointer}-data">${item.data}</td>
        <td id="${pointer}-TempoRestante">${item.tempoRestante}</td>
        <input type="hidden" value="${pointer}">
        <td class="acao">
        <button onclick="deleteItem(${pointer})"><img class="imagem-acao-tabela" src="/public/images/excluir.png" title="Deletar"></img></button>
        </td>
    `;
    tbody.appendChild(tr)
}

submit.onclick = e => {
    if (nomeAluno.value === '' || nomeAluno.value === '' || dataEmprestimo.value === '') {
        alert("Antes de confirmar, preencha todos os dados!")
        e.preventDefault();
        return;
    }
    form.reset();
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    var data = {
        aluno: nomeAluno.value,
        livro: nomelivro.value,
        data: dataEmprestimo.value,
        // tempoRestante: null
    }
    var jsonData = JSON.stringify(data);

    if (status = 'add') {
        xhr.open('POST', '/emprestimo/SignEmprestimo', true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.readyState === 200) {
                    var response = JSON.parse(xhr.responseText);
                    itens.aluno = nomeAluno.value;
                    itens.livro = nomelivro.value;
                    itens.data = dataEmprestimo.value;
                    console.log(response);
                    insertItem(itens, response.id);
                } else {
                    console.error('Erro na requisição:', xhr.status);
                }
            }
        }
        xhr.send(jsonData);

    }
}



