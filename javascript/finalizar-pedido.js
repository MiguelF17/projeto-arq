document.addEventListener("DOMContentLoaded", () => {
    // Pega o pedido salvo no localStorage
    const pedido = JSON.parse(localStorage.getItem("pedidoARQ"));

    // Verifica se o pedido existe, caso contrário, redireciona ou mostra uma mensagem de erro
    if (!pedido) {
        alert("Pedido não encontrado.");
        window.location.href = "home.html"; // Redireciona para a página inicial
        return;
    }


    // Preenche os dados do pedido na página
    document.getElementById("pedidoNum").textContent = pedido.id;
    document.getElementById("pedidoNome").textContent = pedido.itens.map(item => item.nome).join(', ');
    document.getElementById("pedidoFrete").textContent = `R$ ${(pedido.total - pedido.itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0)).toFixed(2).replace('.', ',')}`; // Exemplo, calculando o frete
    document.getElementById("pedidoSubtotal").textContent = `R$ ${pedido.itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0).toFixed(2).replace('.', ',')}`;
    document.getElementById("pedidoTotal").textContent = `R$ ${pedido.total.toFixed(2).replace('.', ',')}`;

    // Exibe a previsão de entrega (exemplo simples, pode ser ajustado)
    const previsaoEntrega = new Date();
    previsaoEntrega.setDate(previsaoEntrega.getDate() + 7); // Define a entrega para 7 dias após o pedido
    document.getElementById("previsaoEntrega").textContent = `Data de entrega prevista: ${previsaoEntrega.toLocaleDateString('pt-BR')}`;
});
