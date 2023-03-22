// Configurações da tabela jquery;
// https://api.jquery.com/ready/
// https://datatables.net/reference/option/
// https://api.jquery.com/on/
// https://datatables.net/reference/api/search()
$(document).ready(function () {
    $('#myTable').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [5, 1, 10, 25, 50],
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

const cadastroAluno = document.querySelector('.cadastro-aluno');
const formCadastroAluno = document.querySelector('.form-cadastro-aluno');
const cadastroAlunoBackground = document.querySelector('.contain-cadastro');

const resetarFormulario = () => {
    formCadastroAluno.style.display = 'none';
    formCadastroAluno.reset();
  }

 document.addEventListener('click', function(event){
     const incluirAluno = event.target.closest('.contain-adicionar-aluno');
     const evento = event.target.className
     console.log(evento)
     
     if(incluirAluno !== null){
        formCadastroAluno.style.display = 'block' 
        cadastroAlunoBackground.style.display = 'block' 
     }

     if(evento === 'contain-cadastro'){
        cadastroAlunoBackground.style.display = 'none';
        resetarFormulario()
     }

 });

 