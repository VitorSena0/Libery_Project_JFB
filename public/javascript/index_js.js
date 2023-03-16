const formCadastroAluno = document.querySelector(".form-cadastro-aluno")
const cadastroLivro = document.querySelector(".form-cadastro-livro")
const CadastroAluno = document.querySelector(".cadastro-aluno");
const cadastroAlunoBackground = document.querySelector("#contain-cadastro");

const resetarFormulario = ()=>{
  formCadastroAluno.reset(); // Reseta o formulário;
  // Volta para o estado normal do select quando o formulario for submetido;
      let selects = Array.from(document.getElementsByTagName('select'));
      selects.forEach(function(el){
        if(el.id != 'Nivel_escolar')  
           el.style.display='none';
        });
}

document.addEventListener('click', function(event){
    const cardCadastrarAluno = event.target.closest('.card1');
    const cardCadastrarLivros = event.target.closest('.card2');
    const cardEmprestimo = event.target.closest('.card3');
    const Devolucoes = event.target.closest('.card4');
    const evento = event.target.className
    event.preventDefault();
    
    if(cardCadastrarAluno !== null){
      CadastroAluno.style.display = 'block';
        cadastroAlunoBackground.classList.add("contain-cadastro");   
    }

    // Submits dos formulários //

    // Evento do formulário do cadastro do aluno
    if(evento === "CadastrarAluno"){
      const camposObrigatorios = CadastroAluno.querySelectorAll('[required]');
    let preenchidos = true;

    camposObrigatorios.forEach(function(campo){
      if(!campo.value){
        preenchidos = false;
      }
    })
    
    if(!preenchidos){
      event.preventDefault();
      alert("Preencha todos os campos!")
    }else{
      CadastroAluno.style.display = 'none';
      cadastroAlunoBackground.classList.remove("contain-cadastro");
      resetarFormulario();
    } 
  }
  // Evento do formulrio do cadastro do livro
  

  if(evento === 'contain-cadastro'){
    CadastroAluno.style.display = 'none';
    cadastroAlunoBackground.classList.remove("contain-cadastro");
    resetarFormulario();
  }
})
