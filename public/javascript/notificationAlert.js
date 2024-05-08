const btn = document.querySelector("#btn-submit");
const btn2 = document.querySelector("#btn-submit2"); // Este segundo serve para o index.html que tem 2 formulários
const divMessage = document.querySelector(".alert");

const msg = "Teste de alerta!";

// Função que será chamada ao enviar o formulário
function handleSubmit(msg) {
    const message = document.createElement("div")
    message.classList.add("message");
    message.innerHTML = msg

    divMessage.appendChild(message)

    setTimeout(() =>{
        message.style.display = "none";
        divMessage.removeChild(message)
    },3000)
}

btn.addEventListener('click', () => {
    handleSubmit(msg)
})

btn2.addEventListener('click', () => {
    handleSubmit(msg)
})
