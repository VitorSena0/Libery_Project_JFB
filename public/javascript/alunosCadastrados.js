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


const sescolaridade = document.querySelector('#Nivel_escolar')
let turmaSelect = document.getElementById("Turma");
let turmas = [["1º ano", "2º ano", "3º ano"],["1º período", "2º período", "3º período"]]

const carregaTurmas = () => {


  turmaSelect.innerHTML = "";

  if (sescolaridade.value === "Médio") {
    turmas = ["1º ano", "2º ano", "3º ano"];
  } else if (sescolaridade.value === "Subsequente") {
    turmas = ["1º período", "2º período", "3º período"];
  }


  for (let i = 0; i < turmas.length; i++) {
    let option = document.createElement("option");
    option.text = turmas[i];
    option.value = turmas[i];
    turmaSelect.appendChild(option);
  }
}
//////////////////////////////////////////////////////////////////



const modal = document.querySelector('.contain-cadastro')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const semail = document.querySelector('#m-email')
const stelefone = document.querySelector('#m-telefone')
const btnSalvar = document.querySelector('.CadastrarAluno')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')
  modal.onclick = e => {
    if (e.target.className.indexOf('contain-cadastro active') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    semail.value = itens[index].email
    stelefone.value = itens[index].telefone
    sescolaridade.value = itens[index].escolaridade
    carregaTurmas() // Vai carregar os valores da turma select antes de setar o valor selecionado na tabela na variável
    turmaSelect.value = itens[index].turma
    id = index
  } else {
    sNome.value = ''
    semail.value = ''
    stelefone.value = ''
    sescolaridade.value = ''
    //turmaSelect.value = ''
  }

}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.email}</td>
    <td>${item.telefone}</td>
    <td>${item.escolaridade}</td>
    <td>${item.turma}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><img class="imagem-acao-tabela" src="public/images/editar.png" title="Editar"></img></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><img class="imagem-acao-tabela" src="public/images/excluir.png" title="Deletar"></img></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

  if (sNome.value == '' || semail.value == '' || stelefone.value == '' || sescolaridade.value == '' || turmaSelect.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].email = semail.value
    itens[id].telefone = stelefone.value
    itens[id].escolaridade = sescolaridade.value;
    itens[id].turma = turmaSelect.value;
  } else {
    itens.push({ 'nome': sNome.value, 'email': semail.value, 'telefone': stelefone.value, 'escolaridade': sescolaridade.value, 'turma': turmaSelect.value });
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
    //////// Anotação ////////
    // O index vem da quantidade de itens que tem na tabela, ou seja, quando é chamada a função forEach(), dentro dela tem o intens.
    //forEach() que pegará todos os elementos e indices(Posição do array em relação a tabela) salvos no banco de dados do browser.
    // Por isso que a cada elemento o index do 'delet' e do 'edit' estão diferentes a medida que se vai adicionando elementos. 
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

const atualizarTabela = document.querySelector('.atualizar-tabela');

atualizarTabela.onclick = function () {
  window.location.reload();
}
