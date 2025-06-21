document.addEventListener('DOMContentLoaded', () => {
    const passwordOutput = document.getElementById('passwordOutput');
    const passwordLength = document.getElementById('passwordLength');
    const lengthValue = document.getElementById('lengthValue');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');

    // Caracteres possíveis para a senha
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    // Atualiza o valor do comprimento da senha exibido
    passwordLength.addEventListener('input', () => {
        lengthValue.textContent = passwordLength.value;
    });

    // Função para gerar a senha
    const generatePassword = () => {
        let allChars = '';
        let generatedPassword = '';
        const length = parseInt(passwordLength.value);

        if (includeUppercase.checked) {
            allChars += uppercaseChars;
        }
        if (includeLowercase.checked) {
            allChars += lowercaseChars;
        }
        if (includeNumbers.checked) {
            allChars += numberChars;
        }
        if (includeSymbols.checked) {
            allChars += symbolChars;
        }

        // Se nenhuma opção for selecionada, exibe um alerta e não gera a senha
        if (allChars === '') {
            passwordOutput.value = 'Selecione pelo menos uma opção!';
            return;
        }

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            generatedPassword += allChars.charAt(randomIndex);
        }

        passwordOutput.value = generatedPassword;
    };

    // Evento para o botão "Gerar Senha"
    generateButton.addEventListener('click', generatePassword);

    // Evento para o botão "Copiar"
    copyButton.addEventListener('click', () => {
        passwordOutput.select(); // Seleciona o texto dentro do input
        passwordOutput.setSelectionRange(0, 99999); // Para dispositivos móveis
        document.execCommand('copy'); // Copia o texto para a área de transferência

        // Feedback visual para o usuário
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copiado!';
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 1500);
    });

    // Gerar uma senha inicial ao carregar a página
    generatePassword();
});