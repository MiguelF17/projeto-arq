document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".form-contato");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // impedir reload da página

        const nome = form.querySelector("input[type='text']").value.trim();
        const email = form.querySelector("input[type='email']").value.trim();
        const telefone = form.querySelector("input[type='tel']").value.trim();
        const mensagem = form.querySelector("textarea").value.trim();

        // Validação simples
        if (!nome || !email || !telefone || !mensagem) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Simulação de envio da mensagem
        const dados = {
            nome,
            email,
            telefone,
            mensagem,
            data: new Date().toLocaleString("pt-BR")
        };

        console.log("📨 Mensagem enviada:", dados);

        // Feedback ao usuário
        alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");

        // Limpar formulário
        form.reset();
    });

});