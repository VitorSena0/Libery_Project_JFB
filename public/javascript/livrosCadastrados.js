// Configurações da tabela jquery;
// https://api.jquery.com/ready/
// https://datatables.net/reference/option/
// https://api.jquery.com/on/
// https://datatables.net/reference/api/search()

$(document).ready(function () {
    $('#myTable').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [25, 2, 10, 15, 50],
        "order": [[0, "asc"]],
        "language": {
            "search": "Pesquisar",
            "lengthMenu": "Nenhum _MENU_ elementos",
            "zeroRecords": "Nenhum resultado encontrardo",
            "info": "Mostrando _START_ até _END_ de _TOTAL_ elementos",
            "inforEmpty": "Mostrando 0 até 0 de 0 elementos",
            "infoFiltred": "(filtrado de _MAX_ elementos no total)",
        }
    });

    $('#search').on('keyup', function () {
        $('#myTable').DataTable().search($(this).val()).draw();
    });
});



const modal = document.querySelector('.contain-cadastro');
const tbody = document.querySelector('tbody');
const sTitulo = document.querySelector('#titulo');
const sAutor = document.querySelector('#autor');
const sEditora = document.querySelector('#editora');
const sGenero = document.querySelector('#genero');
const sEstoque = document.querySelector('#estoque');
const btnSalvar = document.querySelector('.CadastrarLivro')
let oldtitle = ""
function openmodal(){
  sTitulo.value = ""
  sAutor.value = ""
  sEditora.value = ""
  sGenero.value = ""
  sEstoque.value = ""
  modal.classList.add('active')

}
let itens = {}
function modifyElement(pointer,data){
    console.log(data)
    console.log(pointer)
   document.getElementById(pointer + "-titulo").innerText = data.oldtitle;
   document.getElementById(pointer + "-autor").innerText = data.autor;
   document.getElementById(pointer + "-editora").innerText = data.editora;
    document.getElementById(pointer + "-genero").innerText = data.genero;
    document.getElementById(pointer + "-estoque").innerText = data.estoque;
    modal.classList.remove('active');
}
function editItem(pointer){
  // Encontra o elemento na tabela com base no ponteiro
  let element = document.getElementById(pointer);
  let form = document.querySelector(".form-cadastro-livro")
  id = pointer
  status = "edit"
  form.action = "/book/UpdateBook"
 // Verifica se o elemento existe
 if (element) {
   // Obtém os valores dos campos do elemento selecionado
   let titulo = document.getElementById(pointer + "-titulo").innerText
   let autor = document.getElementById(pointer + "-autor").innerText;
   let editora = document.getElementById(pointer + "-editora").innerText;
   let genero = document.getElementById(pointer + "-genero").innerText
   let estoque = document.getElementById(pointer + "-estoque").innerText
   // Preenche os campos do formulário de edição com os valores do item selecionado
   oldtitle = titulo
   sTitulo.value = titulo
   sAutor.value = autor
   sEditora.value = editora
   sGenero.value = genero
   sEstoque.value = estoque
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
  xhr.open('POST', '/book/DeleteBook', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  let data = {
    titulo:pointer
  };
  var jsonData = JSON.stringify(data);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        if(xhr.responseText == 'N'){
            handleSubmit("Erro: Esses dados não podem ser deletados")
        } else {
            handleSubmit('Dados deletados com sucesso')
            let table = document.getElementById("data")
            let element = document.getElementById(`(${pointer})`);
            table.removeChild(element);
        }

      } else {
        handleSubmit('Erro na requisição:');
      }
    }
  }
  xhr.send(jsonData);

}
function insertItem(item,pointer) {
  let form = document.querySelector(".form-cadastro-livro")
  form.action = "/book/SignBook"
  let tr = document.createElement('tr')
  tr.id = "("+pointer+")"
  tr.innerHTML = `
  <td id="(${pointer})-titulo">${item.titulo}</td>
  <td id="(${pointer})-autor">${item.autor}</td>
  <td id="(${pointer})-editora">${item.editora}</td>
  <td id="(${pointer})-genero">${item.genero}</td>
  <td id="(${pointer})-estoque">${item.estoque}</td>
  <input type="hidden" value="${pointer}">
  <td class="acao">
    <button onclick="editItem('(${pointer})')"><img class="imagem-acao-tabela" src="/public/images/editar.png" title="Editar"></img></button>
  </td>
  <td class="acao">
    <button onclick="deleteItem('${pointer}')"><img class="imagem-acao-tabela" src="/public/images/excluir.png" title="Deletar"></img></button>
  </td>
`;
  tbody.appendChild(tr)
}
btnSalvar.onclick = e => {
  if (sTitulo.value == '' || sAutor.value == '' || sEditora.value == '' || sGenero.value == '' || sEstoque.value == '') {
    return;
  }
  let form = document.querySelector(".form-cadastro-livro")
  e.preventDefault();
  var xhr = new XMLHttpRequest();
  let data = {
    oldTitle:oldtitle,
    titulo:sTitulo.value,
    autor: sAutor.value,
    genero: sGenero.value,
    editora: sEditora.value,
    estoque: sEstoque.value
  };
  console.log(data)
  var jsonData = JSON.stringify(data);
  if(status == "edit"){
    xhr.open('POST', '/book/UpdateBook', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if(xhr.responseText == 'N'){
            handleSubmit('Os dados selecionados não podem ser alterados');
          } else {
            itens.oldTitle = sTitulo.value
            itens.titulo = sTitulo.value
            itens.autor =  sAutor.value
            itens.genero =  sGenero.value
            itens.editora =  sEditora.value
            itens.estoque =  sEstoque.value
            modifyElement(id,data)
            handleSubmit("Dados Alterados com sucesso")
          }
        } else {
          handleSubmit('Erro na alteração dos dados');
        }
      }
    }
    xhr.send(jsonData);
    modal.classList.remove('active')
    sTitulo.value = ""
    sAutor.value = ""
    sEditora.value = ""
    sGenero.value = ""
    sEstoque.value = ""
  } else if (status = "add"){
    xhr.open('POST', '/book/SignBook', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if(response.err){
              handleSubmit(response.err)
          } else {
              itens.titulo = sTitulo.value
              itens.autor =  sAutor.value
              itens.genero =  sGenero.value
              itens.editora =  sEditora.value
              itens.estoque =  sEstoque.value
              insertItem(data, response.titulo);
              handleSubmit("Dados Adicionados com sucesso")
          }
        } else {
          handleSubmit('Erro no  envio  dos dados');
        }
      }
    };
        xhr.send(jsonData);
        modal.classList.remove('active')
        sTitulo.value = ""
        sAutor.value = ""
        sEditora.value = ""
        sGenero.value = ""
        sEstoque.value = ""
    }
}
const atualizarTabela = document.querySelector('.atualizar-tabela');
atualizarTabela.onclick = function () {
  window.location.reload();
}
