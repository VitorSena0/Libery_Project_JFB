      
      let Nivel_escolar = document.getElementById("Nivel_escolar");
      Nivel_escolar.onchange = function(){
    
        const value_elem_id = { 
          'Médio':'Turma_medio',
          'Subsequente':'Turma_sub'
        };

          let valor = this.value;                     
          let selects = Array.from(                   
            document.getElementsByTagName('select')   
          );
          
          selects.forEach(function(el){
              if(el.id != 'Nivel_escolar')  
                  el.style.display='none';
              if(el.id == value_elem_id[valor] )
                  el.style.display='block';    
          });
      }
    

const cadastro = document.querySelector(".cadastro-aluno")
const formCadastroAluno = document.querySelector(".form-cadastro");
const cadastroAlunoBackground = document.querySelector("#contain-cadastro");

const resetarFormulario = ()=>{
  cadastro.reset(); // Reseta o formulário;
  // Volta para o estado normal do select quando o formulario for submetido;
      let selects = Array.from(document.getElementsByTagName('select'));
      selects.forEach(function(el){
        if(el.id != 'Nivel_escolar')  
           el.style.display='none';
        });
}

document.addEventListener('click', function(event){
    event.preventDefault();
    const evento = event.target.className
    console.log(evento)
    if(evento === "cadastrar-aluno"){
      formCadastroAluno.style.display = 'block';
        cadastroAlunoBackground.classList.add("contain-cadastro");   
    }

    if(evento === "Cadastrar"){
      const camposObrigatorios = formCadastroAluno.querySelectorAll('[required]');
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
      formCadastroAluno.style.display = 'none';
      cadastroAlunoBackground.classList.remove("contain-cadastro");
      resetarFormulario();
    } 
  }

  if(evento === 'contain-cadastro'){
    formCadastroAluno.style.display = 'none';
    cadastroAlunoBackground.classList.remove("contain-cadastro");
    resetarFormulario();
  }
})
