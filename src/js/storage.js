const LIVROS_PADRAO = [
    {
        id: 'sousou-no-frieren',
        titulo: 'Sousou no Frieren',
        autor: 'Kanehito Yamada',
        categoria: 'Fantasia',
        preco: 45.9,
        descricao: 'Uma história sobre o que permanece depois que uma grande aventura chega ao fim. Frieren, uma elfa maga que possui uma vida muito longa, começa a compreender melhor as pessoas e os momentos que compartilhou durante sua jornada.',
        formato: 'Físico',
        idioma: 'Português',
        edicao: '1ª edição',
        capa: '../img/capa.jpeg'
    }
];

function lerLista(chave) {
    try {
        return JSON.parse(localStorage.getItem(chave)) || [];
    } catch (erro) {
        return [];
    }
}

// Usuários

function getUsuarios() {
    return lerLista('usuarios');
}

function salvarUsuario(usuario, senha) {
    const usuarios = getUsuarios();
    usuarios.push({ usuario, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function getUsuarioLogado() {
    return localStorage.getItem('usuario');
}

function entrarComo(usuario) {
    localStorage.setItem('usuario', usuario);
}

function sair() {
    localStorage.removeItem('usuario');
}

// Livros

function getLivros() {
    return LIVROS_PADRAO.concat(lerLista('livros'));
}

function getLivro(id) {
    return getLivros().find(livro => livro.id === id);
}

function salvarLivro(livro) {
    const livros = lerLista('livros');
    livros.push(livro);
    localStorage.setItem('livros', JSON.stringify(livros));
}

// Funções auxiliares

function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

function mostrarUsuario(caminhoLogin) {
    const usuario = getUsuarioLogado();
    const username = document.getElementById('username');
    const botaoSair = document.getElementById('sair');

    if (usuario && username) {
        username.textContent = `Olá, ${usuario}`;
    }

    if (botaoSair) {
        botaoSair.hidden = !usuario;

        botaoSair.addEventListener('click', function () {
            sair();
            window.location.href = caminhoLogin;
        });
    }
}

// Mensagens de erro dos formulários

function mostrarErro(campo, mensagem) {
    const erro = document.getElementById(`${campo.id}-erro`);

    campo.setAttribute('aria-invalid', 'true');

    if (erro) {
        erro.textContent = mensagem;
    }
}

function limparErros(formulario) {
    formulario.querySelectorAll('[aria-invalid]').forEach(campo => {
        campo.removeAttribute('aria-invalid');
    });

    formulario.querySelectorAll('.erro').forEach(erro => {
        erro.textContent = '';
    });
}
