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
let turmas = [["1º ano", "2º ano", "3º ano"],["1º período", "2º período", "3º período", "4º período"]]

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

let itens = {}

function editItem(pointer){
  // Encontra o elemento na tabela com base no ponteiro
 let element = document.querySelector(`input[value="${pointer}"]`);

 // Verifica se o elemento existe
 if (element) {
   // Obtém os valores dos campos do elemento selecionado
   let nome = element.parentNode.parentNode.querySelector('td:nth-child(1)').textContent;
   let email = element.parentNode.parentNode.querySelector('td:nth-child(2)').textContent;
   let telefone = element.parentNode.parentNode.querySelector('td:nth-child(3)').textContent;

   // Preenche os campos do formulário de edição com os valores do item selecionado
   sNome.value = nome;
   semail.value = email;
   stelefone.value = telefone;

   // Exibe o modal de edição
   modal.classList.add('active');
 }
}
modal.onclick = e => {
  // Esta condicional verificará quando houver um evento de click no formulário e se neste click a pessoa clicar em algum elemento que não contenha tal classe ele removerá o nome active;
  if (e.target.className.indexOf('contain-cadastro active') !== -1) {
    modal.classList.remove('active');
  }
};
function deleteItem(pointer) {
  // Encontra o elemento na tabela com base no ponteiro
  let element = document.querySelector(`input[value="${pointer}"]`);

  // Verifica se o elemento existe
  if (element) {
    // Obtém a linha (tr) do elemento
    let row = element.parentNode.parentNode;

    // Remove a linha da tabela
    row.parentNode.removeChild(row);
  }
}
function insertItem(item,pointer) {
  let tr = document.createElement('tr')
  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.email}</td>
    <td>${item.telefone}</td>
    <td>${item.escolaridade}</td>
    <td>${item.turma}</td>
    <input type='hidden' value='${pointer}'>
    <td class="acao">
      <button onclick="editItem(${pointer})"><img class="imagem-acao-tabela" src="images/editar.png" title="Editar"></img></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${pointer})"><img class="imagem-acao-tabela" src="images/excluir.png" title="Deletar"></img></button>
    </td>
    `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  if (sNome.value == '' || semail.value == '' || stelefone.value == '' || sescolaridade.value == '' || turmaSelect.value == '') {
    return
  }
  e.preventDefault();
  var xhr = new XMLHttpRequest();
  data = {
    nome:sNome.value,
    email:semail.value,
    telefone:stelefone.value,
    escolaridade:turmaSelect.value,
    turma:turmaSelect.value
  }
  xhr.open('POST', '/aluno/SignAluno', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response);
    }
  };
  xhr.send(JSON.stringify(data));
    itens.nome = sNome.value
    itens.email = semail.value
    itens.telefone = stelefone.value
    itens.escolaridade = sescolaridade.value;
    itens.turma = turmaSelect.value;
    insertItem(itens,response.id)
    modal.classList.remove('active')

}



const atualizarTabela = document.querySelector('.atualizar-tabela');
atualizarTabela.onclick = function () {
  window.location.reload();
}
