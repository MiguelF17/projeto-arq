document.querySelectorAll('.qtd-control').forEach(control => {
    const minusBtn = control.querySelector('.minus');
    const plusBtn = control.querySelector('.plus');
    const input = control.querySelector('.qtd-input');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(input.value);
        if (value > 1) input.value = value - 1;
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(input.value);
        input.value = value + 1;
    });
});