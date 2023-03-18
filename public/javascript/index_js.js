const formCadastroAluno = document.querySelector(".form-cadastro-aluno")
const formCadastroLivro = document.querySelector(".form-cadastro-livro")
const CadastroAluno = document.querySelector(".cadastro-aluno");
const CadastroLivro = document.querySelector(".cadastrar-livro");
const cadastroAlunoBackground = document.querySelector("#contain-cadastro");

const inputFoto = document.querySelector('#foto');
const previewFoto = document.querySelector('#foto-preview');

const resetarFormulario = () => {
  CadastroAluno.style.display = 'none';
  CadastroLivro.style.display = 'none';
  // Reseta o formulário;
  formCadastroLivro.reset();
  previewFoto.setAttribute('src', '#') // Reseta a foto selecionada


  formCadastroAluno.reset();
  // Volta para o estado normal do select quando o formulario for submetido;
  let selects = Array.from(document.getElementsByTagName('select'));
  selects.forEach(function (el) {
    if (el.id != 'Nivel_escolar')
      el.style.display = 'none';
  });
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
  }

  if (cardCadastrarLivros !== null) {
    CadastroLivro.style.display = 'block';
    cadastroAlunoBackground.classList.add("contain-cadastro");
  }

  if (evento === 'contain-cadastro') {
    cadastroAlunoBackground.classList.remove("contain-cadastro");
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
      cadastroAlunoBackground.classList.remove("contain-cadastro");
      resetarFormulario();
    }
  }

})
// Pega a foto selecionada e põe uma pequena demostração no forumulário
inputFoto.addEventListener('change', function () {
  const arquivo = this.files[0];
  if (arquivo) {
    const url = URL.createObjectURL(arquivo);
    previewFoto.setAttribute('src', url);
  }
});


