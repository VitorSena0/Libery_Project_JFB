// Configurações da tabela jquery;
// https://api.jquery.com/ready/
// https://datatables.net/reference/option/
// https://api.jquery.com/on/
// https://datatables.net/reference/api/search()
<<<<<<< HEAD

=======
function adiantarData() {
  // Criar uma nova instância de Date com a data atual
  let date = new Date();

  // Adicionar sete dias à data
  date.setDate(date.getDate() + 7);

  // Retornar a nova data adiantada em sete dias
  return date.toISOString().slice(0, 10);
}
function calcularDiferencaTempo(dataAtual, dataDesejada) {
  // Calcular a diferença em milissegundos entre as datas
  let diferenca = Math.abs(dataDesejada - dataAtual);

  // Calcular os valores de horas, dias e minutos
  let horas = Math.floor(diferenca / (1000 * 60 * 60));
  let dias = Math.floor(horas / 24);
  let minutos = Math.floor(diferenca / (1000 * 60));

  // Retornar o objeto com as informações de tempo
  return { horas, dias, minutos };
}
function formatarData(data) {
  const partes = data.split('-');
  const dia = partes[2];
  const mes = partes[1];
  const ano = partes[0];

  return `${dia}/${mes}/${ano}`;
}
// Função que será chamada ao enviar o formulário
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00
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

<<<<<<< HEAD
let date = new Date().toLocaleDateString();
console.log(date)

const form = document.querySelector('.Emprestimo')
const submit = document.querySelector('.submit');
const nomelivro = document.querySelector('#nomeLivro');
const nomeAluno = document.querySelector('#nomeAluno');
const dataEmprestimo = document.querySelector('#data');
=======
let dateNow = new Date();

const form = document.querySelector('.Emprestimo')
const submit = document.getElementById('submit');
const nomelivro = document.getElementById('nomeLivro');
const nomeAluno = document.getElementById('nomeAluno');
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00
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
<<<<<<< HEAD
            } else {
                console.error('Erro na requisição:', xhr.status);
=======
                let table = document.getElementById("data");
                let element = document.getElementById(`${pointer}`);
                table.removeChild(element);
                handleSubmit("Dados deletados com sucesso")
            } else {
                handleSubmit('Erro na requisição');
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00
            }
        }
    }
    xhr.send(jsonData);
<<<<<<< HEAD
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
=======

}

function insertItem(item, pointer) {
    form.action = "/emprestimo/SignEmprestimo"
    let tbody = document.getElementById("data")
    let tr = document.createElement('tr');
    tr.id = pointer
    //
    tr.innerHTML = `
        <td id="${pointer}-aluno">${item.aluno}</td>
        <td id="${pointer}-livro">${item.livro}</td>
        <td id="${pointer}-data">${formatarData(item.data)}</td>
        <td id="${pointer}-TempoRestante">${item.TempoRestante.dias} dias</td>
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00
        <input type="hidden" value="${pointer}">
        <td class="acao">
        <button onclick="deleteItem(${pointer})"><img class="imagem-acao-tabela" src="/public/images/excluir.png" title="Deletar"></img></button>
        </td>
    `;
    tbody.appendChild(tr)
}

submit.onclick = e => {
<<<<<<< HEAD
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



=======
  e.preventDefault();
  console.log(nomeAluno.value)
  let aluno = nomeAluno.value
  let livro = nomeLivro.value
  var data = {
      aluno: aluno,
      livro: livro,
      data:adiantarData(),
  }
  let jsonData = JSON.stringify(data);
  console.log(jsonData)
  let xhr = new XMLHttpRequest();
  xhr.open('POST','/emprestimo/SignEmprestimo',true)
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              console.log(xhr.responseText)
              var response = JSON.parse(xhr.responseText);
              if(response.err && !response.id){
                  handleSubmit(response.err)
              } else {
                itens.aluno = aluno
                itens.livro = livro
                itens.data = data.data
                itens.TempoRestante = calcularDiferencaTempo(dateNow,new Date(data.data))
                insertItem(itens,response.id)
                handleSubmit('Dados enviados com sucesso');
              }

              console.log(response)
          } else {
              handleSubmit('Erro na requisição');
          }
      }
  }

  xhr.send(jsonData);


}
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00
