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


let itens;
let itens2;

const resetarFormulario = () => {
  CadastroAluno.style.display = 'none';
  CadastroLivro.style.display = 'none';
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
  const evento = event.target.className
  //event.preventDefault();

  if (cardCadastrarAluno !== null) {
    CadastroAluno.style.display = 'block';
    cadastroAlunoBackground.classList.add("contain-cadastro");
    const sescolaridade = document.querySelector('#Nivel_escolar')
    
  }

  if (cardCadastrarLivros !== null) {
    CadastroLivro.style.display = 'block';
    cadastroAlunoBackground.classList.add("contain-cadastro");
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
    camposObrigatorios = CadastroAluno.querySelectorAll('[required]');
    camposObrigatorios.forEach(function (campo) {
      if (!campo.value) preenchidos = false;
    })

    if (!preenchidos) {
      event.preventDefault();
      alert("Preencha todos os campos!")
    } else {
      itens = getItensBD()
      itens.push({ 'nome': sNome.value, 'email': semail.value, 'telefone': stelefone.value, 'escolaridade': sescolaridade.value, 'turma': turmaSelect.value });
      setItensBD()
      cadastroAlunoBackground.classList.remove("contain-cadastro");
      resetarFormulario();
    }
  }

  // Evento do formulário do cadastro de livros
  if (evento === "CadastrarLivro") {
    camposObrigatorios = CadastroLivro.querySelectorAll('[required]');
    camposObrigatorios.forEach(function (campo) {
      if (!campo.value) preenchidos = false;
    });

    if (!preenchidos) {
      event.preventDefault();
      alert("Preencha todos os campos!")
    } else {
      itens2 = getItensBD2();
      itens2.push({'titulo': sTitulo.value, 'autor': sAutor.value, 'editora': sEditora.value, 'genero': sGenero.value, 'estoque': sEstoque.value })
      setItensBD2()
      cadastroAlunoBackground.classList.remove("contain-cadastro");
      resetarFormulario();
    }
  }

})

//Adicionar ao banco os alunos
const getItensBD = () => JSON.parse(localStorage.getItem('dbAlunos')) ?? [] // Se for a primeira condição null ou undefined ele atribui para a segunda alternativa
const setItensBD = () => localStorage.setItem('dbAlunos', JSON.stringify(itens))
//Adicionar ao banco os livros
const getItensBD2 = () => JSON.parse(localStorage.getItem('dbLivros')) ?? [] // item
const setItensBD2 = () => JSON.parse(localStorage.setItem('dbLivros', JSON.stringify(itens2)))

