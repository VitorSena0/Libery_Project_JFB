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


// Lógica do formulário//

// const cadastroAluno = document.querySelector('.cadastro-aluno');
// const formCadastroAluno = document.querySelector('.form-cadastro-aluno');
// const cadastroAlunoBackground = document.querySelector('.contain-cadastro');

// const resetarFormulario = () => {
//     formCadastroAluno.reset();
//   }

//  document.addEventListener('click', function(event){
//      const incluirAluno = event.target.closest('.contain-adicionar-aluno');
//      const evento = event.target.className
     
//      if(incluirAluno !== null){
//         cadastroAlunoBackground.style.display = 'block' 
//      }

//      if(evento === 'contain-cadastro'){
//         cadastroAlunoBackground.style.display = 'none';
//         resetarFormulario()
//      }

//  });





let Nivel_escolar = document.getElementById("Nivel_escolar");

const turma = (id) => {
  const turma = document.getElementById(id)
  return turma
}

Nivel_escolar.onchange = function () {
  const value_elem_id = { 'Médio': 'Turma_medio', 'Subsequente': 'Turma_sub' };
  let valor = this.value; // Se refere ao elemento 'select' que disparou o evento
  let selects = Array.from(document.getElementsByTagName('select'));
  selects.forEach(function (el) {
    if (el.id != 'Nivel_escolar')
    el.style.display = 'none';
    if (el.id == value_elem_id[valor]) {
      sturma = turma(el.id);
      el.style.display = 'block';
      
    }

  });
}


//////////////////////////////////////////////////////////////////



const modal = document.querySelector('.contain-cadastro')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const semail = document.querySelector('#m-email')
const stelefone = document.querySelector('#m-telefone')
const sescolaridade = document.querySelector('#Nivel_escolar')
let sturma;
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
    sturma.value = itens[index].turma
    id = index
  } else {
    sNome.value = ''
    semail.value = ''
    stelefone.value = ''
    sescolaridade.value = ''
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

  if (sNome.value == '' || semail.value == '' || stelefone.value == '' || sescolaridade.value == '' || sturma.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].email = semail.value
    itens[id].telefone = stelefone.value
    itens[id].escolaridade = sescolaridade.value;
    itens[id].turma = sturma.value;
  } else {
    itens.push({ 'nome': sNome.value, 'email': semail.value, 'telefone': stelefone.value, 'escolaridade': sescolaridade.value, 'turma' : sturma.value });
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
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

const atualizarTabela = document.querySelector('.atualizar-tabela');

atualizarTabela.onclick = function(){
    window.location.reload();
}
 