// Tabela jquery
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


// Variáveis para o formulário
const modal = document.querySelector('.contain-cadastro');
const tbody = document.querySelector('tbody');
const sTitulo = document.querySelector('#titulo');
const sAutor = document.querySelector('#autor');
const sEditora = document.querySelector('#editora');
const sGenero = document.querySelector('#genero');
const sEstoque = document.querySelector('#estoque');

const submit = document.querySelector('.CadastrarLivro');

let itens;
let id;

// Esta função é chamada quando se clica no botão de adicionar livro;
function openModal(edit = false, index = 0) {
    modal.classList.add('active'); // Adiciona este nome para que o formulário mude de display para block
    modal.onclick = e => {
        // Esta condicional verificará quando houver um evento de click no formulário e se neste click a pessoa clicar em algum elemento que não contenha tal classe ele removerá o nome active;
        if (e.target.className.indexOf('contain-cadastro active') !== -1) {
            modal.classList.remove('active');

        }
    }
    // Faz com que quando for clicado para editar um item ele ponha as informações do objeto nos campos do formulário respectivamente para que se possa editá-los
    if (edit) {
        sTitulo.value = itens[index].titulo;
        sAutor.value = itens[index].autor;
        sEditora.value = itens[index].editora;
        sGenero.value = itens[index].genero;
        sEstoque.value = itens[index].estoque;
        id = index
        // A atribuição do id para o index evita que quando o formulário ao editado e depois submetido ele não crie um novo elemento/obj ao invés de alterar os dados

    } else {
        sTitulo.value = '';
        sAutor.value = '';
        sEditora.value = '';
        sGenero.value = '';
        sEstoque.value = '';

    }
}
// Ésta função é chamada quando o botão de editar é clicado
const editItem = index => openModal(true, index);

const deleteItem = index => {
    itens.splice(index, 1);
    setItensBD();
    loadItens();
}

// Esta função é chamada quando a função onclick atribuita a submit é chamada
function insertItem(item, index) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
    <td>${item.titulo}</td>
    <td>${item.autor}</td>
    <td>${item.editora}</td>
    <td>${item.genero}</td>
    <td>${item.estoque}</td>
    <td class='acao'>
        <button onclick="editItem(${index})"><img class= "imagem-acao-tabela" src="images/editar.png" title="Editar"></img></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><img class="imagem-acao-tabela" src="images/excluir.png" title="Deletar"></img></button>
    </td>
    `
    tbody.appendChild(tr);
}

// Quando o formulário é submetido esta função é ativada
submit.onclick = e => {
    // Esta condicional impede que algum campo do formulário esteja vazio 
    if (sTitulo.value === '' || sAutor.value === '' || sEditora.value === '' || sEstoque.value === '' || sGenero.value === '') {
        return;
    }

    e.preventDefault(); // Evita que quando o formulário for mandado ele abra uma nova javela

    if (id !== undefined) {
        itens[id].titulo = sTitulo.value;
        itens[id].autor = sAutor.value;
        itens[id].editora = sEditora.value;
        itens[id].genero = sGenero.value;
        itens[id].estoque = sEstoque.value;
    } else {
        itens.push({ 'titulo': sTitulo.value, 'autor': sAutor.value, 'editora': sEditora.value, 'genero': sGenero.value, 'estoque': sEstoque.value })
    }

    setItensBD();

    modal.classList.remove('active');

    loadItens() // O loadItens é sempre chamado quando se cria um novo obj.
    id = undefined;
}


const loadItens = () => {
    itens = getItensBD();
    tbody.innerHTML = '';
    itens.forEach((item, index) => {
        insertItem(item, index)
        // O index vem da quantidade de itens que tem na tabela, ou seja, quando é chamada a função forEach(), dentro dela tem o intens.
        //forEach() que pegará todos os elementos e indices(Posição do array em relação a tabela) salvos no banco de dados do browser.
        // Por isso que a cada elemento o index do 'delet' e do 'edit' estão diferentes a medida que se vai adicionando elementos. 
    })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbLivros')) ?? []
const setItensBD = () => localStorage.setItem('dbLivros', JSON.stringify(itens))

loadItens()

const atualizarTabela = document.querySelector('.atualizar-tabela');

atualizarTabela.onclick = function () {
  window.location.reload();
}

