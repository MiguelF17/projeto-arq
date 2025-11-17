document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const form = event.target;
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    // 1. Desabilita o botão e mostra o feedback de carregamento
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    // Remove as classes de cor customizadas do Tailwind e adiciona cinza
    submitBtn.classList.remove('bg-arq-primary', 'hover:bg-arq-hover');
    submitBtn.classList.add('bg-gray-400');
    formMessage.classList.add('hidden');

    // Simula uma requisição de rede 
    setTimeout(() => {
        // 2. Simulação de sucesso
        formMessage.textContent = 'Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.';
        formMessage.classList.remove('hidden');
        // Adiciona classes para mensagem de sucesso (verde)
        formMessage.classList.add('bg-green-100', 'text-green-800');
        formMessage.classList.remove('bg-red-100', 'text-red-800');

        // 3. Reseta o formulário
        form.reset();
        submitBtn.textContent = 'Enviar Mensagem';
        submitBtn.disabled = false;
        // Restaura as classes de cor customizadas do Tailwind
        submitBtn.classList.add('bg-arq-primary', 'hover:bg-arq-hover');
        submitBtn.classList.remove('bg-gray-400');
    }, 1500);

    
});