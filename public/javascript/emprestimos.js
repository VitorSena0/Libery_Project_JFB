const submit = document.querySelector('#submit');
const nomelivro =  document.querySelector('#nomeLivro');
const nomeAluno =  document.querySelector('#nomeAluno');

submit.onclick = e =>{
    console.log(nomeAluno.value) // Retornará vazio se não selecionar nada
    console.log(nomelivro.value) // Retornará vazio se não selecionar nada

   e.preventDefault();
}