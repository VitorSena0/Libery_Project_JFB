// Função que será chamada ao enviar o formulário
function handleSubmit(msg) {
    const message = document.createElement("div")
    message.classList.add("message");
    message.innerHTML = msg
    divMessage = document.getElementById("alert")
    divMessage.appendChild(message)

    setTimeout(() =>{
        message.style.display = "none";
        divMessage.removeChild(message)
    },3000)
}
