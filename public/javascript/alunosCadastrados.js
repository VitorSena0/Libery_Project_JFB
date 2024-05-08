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
let id = null;
let status = "add"
const semail = document.querySelector('#m-email')
const stelefone = document.querySelector('#m-telefone')
const btnSalvar = document.querySelector('.CadastrarAluno')
function openmodal(){
  sNome.value = "";
  semail.value = "";
  stelefone.value = "";
  modal.classList.add('active')
}
let itens = {}
function modifyElement(pointer,data){
  document.getElementById(pointer + "-nome").innerText = data.nome
  document.getElementById(pointer + "-email").innerText = data.email;
   document.getElementById(pointer + "-telefone").innerText = data.tel;
    document.getElementById(pointer + "-escolaridade").innerText = data.escolaridade;
    document.getElementById(pointer + "-turma").innerText = data.turma;
    modal.classList.remove('active');
}
function editItem(pointer){
  // Encontra o elemento na tabela com base no ponteiro
  let element = document.getElementById(pointer);
  let form = document.querySelector(".form-cadastro-aluno")
  id = pointer
  status = "edit"
  form.action = "/aluno/UpdateAluno"
 // Verifica se o elemento existe
 if (element) {
   // Obtém os valores dos campos do elemento selecionado
   let nome = document.getElementById(pointer + "-nome").innerText
   let email = document.getElementById(pointer + "-email").innerText;
   let telefone = document.getElementById(pointer + "-telefone").innerText;
   let esc = document.getElementById(pointer + "-escolaridade").innerText
   let turma = document.getElementById(pointer + "-turma").innerText
   // Preenche os campos do formulário de edição com os valores do item selecionado
   sNome.value = nome;
   semail.value = email;
   stelefone.value = telefone;
   turmaSelect.value = turma;
   sescolaridade.value = esc;
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
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/aluno/DeleteAluno', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  let data = {
    id:pointer
  };
  var jsonData = JSON.stringify(data);
  console.log("work it")
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
          if(xhr.responseText == 'N'){
              handleSubmit("Erro: Esse Dado não pode ser deletado ")
          } else {
            console.log(xhr.responseText)
            let table = document.getElementById("data")
            let element = document.getElementById(`${pointer}`);
            table.removeChild(element);
            handleSubmit("dado deletado com sucesso ")
          }

      } else {
          handleSubmit("Erro ao deletar os dados")
      }
    }
  }
  xhr.send(jsonData);

}
function insertItem(item,pointer) {
  let form = document.querySelector(".form-cadastro-aluno")
  form.action = "/aluno/AddAluno"
  let tr = document.createElement('tr')
  tr.id = pointer
  tr.innerHTML = `
  <td id="${pointer}-nome">${item.nome}</td>
  <td id="${pointer}-email">${item.email}</td>
  <td id="${pointer}-telefone">${item.telefone}</td>
  <td id="${pointer}-escolaridade">${item.escolaridade}</td>
  <td id="${pointer}-turma">${item.turma}</td>
  <td id="${pointer}-emprestimos">0</td>
  <input type="hidden" value="${pointer}">
  <td class="acao">
    <button onclick="editItem(${pointer})"><img class="imagem-acao-tabela" src="/public/images/editar.png" title="Editar"></img></button>
  </td>
  <td class="acao">
    <button onclick="deleteItem(${pointer})"><img class="imagem-acao-tabela" src="/public/images/excluir.png" title="Deletar"></img></button>
  </td>
`;
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  if (sNome.value == '' || semail.value == '' || stelefone.value == '' || sescolaridade.value == '' || turmaSelect.value == '') {
    return;
  }
    let form = document.querySelector(".form-cadastro-aluno")
  e.preventDefault();
  var xhr = new XMLHttpRequest();
  var data = {
    nome: sNome.value,
    email: semail.value,
    telefone: stelefone.value,
    escolaridade: sescolaridade.value,
    turma: turmaSelect.value,
    id:id
  };
  var jsonData = JSON.stringify(data);
  if(status == "edit"){
    xhr.open('POST', '/aluno/UpdateAluno', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    modifyElement(id,{
        nome:sNome.value,
        tel:stelefone.value,
        email:semail.value,
        escolaridade:sescolaridade.value,
        turma:turmaSelect.value
    })
    console.log("work it")
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if(xhr.responseText == 'N'){
            handleSubmit("Erro: Esse dado não pode ser alterado")
          } else {
            itens.nome = sNome.value;
            itens.email = semail.value;
            itens.telefone = stelefone.value;
            itens.escolaridade = sescolaridade.value;
            itens.turma = turmaSelect.value;
            handleSubmit("Dados alterados com sucesso")
          }
        } else {
            handleSubmit("Erro no envio dos dados")
        }
      }
    }
    xhr.send(jsonData);
    modal.classList.remove('active')
  } else if (status = "add"){
    xhr.open('POST', '/aluno/SignAluno', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          itens.nome = sNome.value;
          itens.email = semail.value;
          itens.telefone = stelefone.value;
          itens.escolaridade = sescolaridade.value;
          itens.turma = turmaSelect.value;
          insertItem(itens, response.id);
            handleSubmit("Dados enviados com sucesso")
        } else {
            handleSubmit("Erro ao enviar os dados")
        }
      }
    };

        xhr.send(jsonData);
        modal.classList.remove('active')
    }

}



const atualizarTabela = document.querySelector('.atualizar-tabela');
atualizarTabela.onclick = function () {
  window.location.reload();
}
