const formLogin = document.getElementById('form-login');
const formCadastro = document.getElementById('form-cadastro');

// Login
if (formLogin) {
    formLogin.addEventListener('submit', function (event) {
        event.preventDefault();
        limparErros(formLogin);

        const campoUsuario = document.getElementById('usuario');
        const campoSenha = document.getElementById('senha');

        const usuario = campoUsuario.value.trim();
        const senha = campoSenha.value;

        const conta = getUsuarios().find(u => u.usuario.toLowerCase() === usuario.toLowerCase());

        if (!conta) {
            mostrarErro(campoUsuario, 'Usuário não encontrado. Crie uma conta primeiro.');
            campoUsuario.focus();
            return;
        }

        if (conta.senha !== senha) {
            mostrarErro(campoSenha, 'Senha incorreta.');
            campoSenha.focus();
            return;
        }

        entrarComo(conta.usuario);
        window.location.href = './src/home/home.html';
    });
}

// Cadastro de usuário
if (formCadastro) {
    formCadastro.addEventListener('submit', function (event) {
        event.preventDefault();
        limparErros(formCadastro);

        const campoUsuario = document.getElementById('usuario');
        const campoSenha = document.getElementById('senha');
        const campoConfirmar = document.getElementById('confirmar');

        const usuario = campoUsuario.value.trim();
        const senha = campoSenha.value;
        const jaExiste = getUsuarios().some(u => u.usuario.toLowerCase() === usuario.toLowerCase());

        let primeiroErro = null;

        if (usuario.length < 3) {
            mostrarErro(campoUsuario, 'O nome precisa ter pelo menos 3 caracteres.');
            primeiroErro = primeiroErro || campoUsuario;
        } else if (jaExiste) {
            mostrarErro(campoUsuario, 'Esse nome de usuário já está em uso.');
            primeiroErro = primeiroErro || campoUsuario;
        }

        if (senha.length < 6) {
            mostrarErro(campoSenha, 'A senha precisa ter pelo menos 6 caracteres.');
            primeiroErro = primeiroErro || campoSenha;
        }

        if (campoConfirmar.value !== senha) {
            mostrarErro(campoConfirmar, 'As senhas não são iguais.');
            primeiroErro = primeiroErro || campoConfirmar;
        }

        if (primeiroErro) {
            primeiroErro.focus();
            return;
        }

        salvarUsuario(usuario, senha);
        entrarComo(usuario);
        window.location.href = '../home/home.html';
    });
}

// Mostrar/ocultar senha
document.querySelectorAll('.mostrar-senha').forEach(botao => {
    botao.addEventListener('click', function () {
        const campo = document.getElementById(botao.getAttribute('aria-controls'));
        const visivel = campo.type === 'text';

        campo.type = visivel ? 'password' : 'text';
        botao.setAttribute('aria-pressed', String(!visivel));
        botao.textContent = visivel ? 'Mostrar' : 'Ocultar';
    });
});
