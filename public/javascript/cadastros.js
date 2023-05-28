// Formulários
const formCadastroAluno = document.querySelector(".form-cadastro-aluno")
const formCadastroLivro = document.querySelector(".form-cadastro-livro")
const CadastroAluno = document.querySelector(".cadastro-aluno");
const CadastroLivro = document.querySelector(".cadastrar-livro");
const cadastroAlunoBackground = document.querySelector("#contain-cadastro");

// Atributos do formulário de cadastro de aluno
const sNome = document.querySelector('#m-nome')
const semail = document.querySelector('#m-email')
const stelefone = document.querySelector('#m-telefone')
const sescolaridade = document.querySelector('#Nivel_escolar')
let turmaSelect = document.getElementById("Turma");

// Atributos do formulário de cadastro de Livros
const sTitulo = document.querySelector('#titulo');
const sAutor = document.querySelector('#autor');
const sEditora = document.querySelector('#editora');
const sGenero = document.querySelector('#genero');
const sEstoque = document.querySelector('#estoque');

const cards = document.querySelector('.home')


let itens;
let itens2;

const resetarFormulario = () => {
  CadastroAluno.style.display = 'none';
  CadastroLivro.style.display = 'none';
  cadastroAlunoBackground.style.display = 'none'
  formCadastroLivro.reset();
  formCadastroAluno.reset();
  // Volta para o estado normal do select quando o formulario for submetido;
}

// Click dos cards
document.addEventListener('click', function (event) {
  const cardCadastrarAluno = event.target.closest('.card1');
  const cardCadastrarLivros = event.target.closest('.card2');
  const cardEmprestimo = event.target.closest('.card3');
  const Devolucoes = event.target.closest('.card4');
  const Link1 = event.target.closest('.inicio');
  const Link2 = event.target.closest('.aluno-cadastrado');
  const Link3 = event.target.closest('.livro-cadastrado');
  const Link4 = event.target.closest('.emprestimo-efetuado');
  const evento = event.target.className
  event.preventDefault();

  if (cardCadastrarAluno !== null) {
    CadastroAluno.style.display = 'block';
    cadastroAlunoBackground.style.display = 'block'
    cadastroAlunoBackground.classList.add("contain-cadastro");
    const sescolaridade = document.querySelector('#Nivel_escolar')
  }

  if (cardCadastrarLivros !== null) {
    CadastroLivro.style.display = 'block';
    cadastroAlunoBackground.style.display = 'block'
    cadastroAlunoBackground.classList.add("contain-cadastro");
  }

  if(Link1 !== null){
    window.location.replace('/')
  }
  if(Link2 !== null){
    window.location.replace('/aluno')
  }
  if(Link3 !== null){
    window.location.replace('/book')
  }
  if(Link4 !== null){
    window.location.replace('/emprestimo')
  }
  if (evento === 'contain-cadastro') {
    cadastroAlunoBackground.classList.remove("contain-cadastro");
    carregaTurmas()
    resetarFormulario();
  }




  // Submits dos formulários //
  // Evento do formulário do cadastro do aluno
  let camposObrigatorios;
  let preenchidos = true;
  if (evento === "CadastrarAluno") {
    event.preventDefault();
    var data = {
      nome: sNome.value,
      email: semail.value,
      telefone: stelefone.value,
      escolaridade: sescolaridade.value,
      turma: turmaSelect.value,
    };
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/aluno/SignAluno', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var jsonData = JSON.stringify(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          handleSubmit("Dados enviados com sucesso")
        } else {
          handleSubmit('Erro no envio de dados');
        }
      }
    };
    xhr.send(jsonData);

     sNome.value = ""
     semail.value = ""
     stelefone.value = ""
     sescolaridade.value = ""
     turmaSelect.value = ""
     CadastroAluno.style.display = 'none';
     cadastroAlunoBackground.style.display = 'none'
     resetarFormulario();
  }

  // Evento do formulário do cadastro de livros
  if (evento === "CadastrarLivro") {
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    let data = {
      titulo:sTitulo.value,
      autor: sAutor.value,
      genero: sGenero.value,
      editora: sEditora.value,
      estoque: sEstoque.value
    };
    console.log(data)
    var jsonData = JSON.stringify(data);
    xhr.open('POST', '/book/SignBook', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log("work it")
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            handleSubmit("Dados enviados com sucesso")
        } else {
          handleSubmit('Erro no envio de dados');
        }
      }
    }
    xhr.send(jsonData);

    sTitulo.value = ""
    sAutor.value = ""
    sEditora.value = ""
    sGenero.value = ""
    sEstoque.value = ""
    CadastroLivro.style.display = 'none';
    cadastroAlunoBackground.style.display = 'none'
    resetarFormulario();
  }

})
