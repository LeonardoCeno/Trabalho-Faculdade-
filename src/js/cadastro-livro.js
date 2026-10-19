mostrarUsuario('../../index.html');
atualizarContadorCarrinho();

const formLivro = document.getElementById('form-livro');
const avisoLogin = document.getElementById('aviso-login');
const sucessoLivro = document.getElementById('livro-sucesso');
const campoCapa = document.getElementById('capa');
const previewCapa = document.getElementById('capa-preview');

const TAMANHO_MAXIMO_CAPA = 1024 * 1024;

let capaEscolhida = '';

if (getUsuarioLogado()) {
    formLivro.hidden = false;
} else {
    avisoLogin.hidden = false;
}

// Capa do livro
campoCapa.addEventListener('change', function () {
    const arquivo = campoCapa.files[0];

    campoCapa.removeAttribute('aria-invalid');
    document.getElementById('capa-erro').textContent = '';
    capaEscolhida = '';
    previewCapa.hidden = true;

    if (!arquivo) {
        return;
    }

    if (arquivo.size > TAMANHO_MAXIMO_CAPA) {
        mostrarErro(campoCapa, 'A imagem é muito grande. Escolha uma de até 1 MB.');
        campoCapa.value = '';
        return;
    }

    const leitor = new FileReader();

    leitor.addEventListener('load', function () {
        capaEscolhida = leitor.result;
        previewCapa.src = capaEscolhida;
        previewCapa.hidden = false;
    });

    leitor.readAsDataURL(arquivo);
});

function criarId(titulo) {
    const base = titulo
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    return `${base}-${Date.now()}`;
}

// Cria o livro
formLivro.addEventListener('submit', function (event) {
    event.preventDefault();
    limparErros(formLivro);
    sucessoLivro.textContent = '';

    const campos = {
        titulo: document.getElementById('titulo'),
        autor: document.getElementById('autor'),
        categoria: document.getElementById('categoria'),
        preco: document.getElementById('preco'),
        descricao: document.getElementById('descricao')
    };

    let primeiroErro = null;

    Object.values(campos).forEach(campo => {
        if (!campo.value.trim()) {
            mostrarErro(campo, 'Preencha este campo.');
            primeiroErro = primeiroErro || campo;
        }
    });

    const preco = Number(campos.preco.value);

    if (campos.preco.value && (isNaN(preco) || preco <= 0)) {
        mostrarErro(campos.preco, 'Digite um preço maior que zero.');
        primeiroErro = primeiroErro || campos.preco;
    }

    if (primeiroErro) {
        primeiroErro.focus();
        return;
    }

    const livro = {
        id: criarId(campos.titulo.value),
        titulo: campos.titulo.value.trim(),
        autor: campos.autor.value.trim(),
        categoria: campos.categoria.value,
        preco: preco,
        descricao: campos.descricao.value.trim(),
        formato: document.getElementById('formato').value,
        idioma: document.getElementById('idioma').value.trim() || 'Português',
        edicao: document.getElementById('edicao').value.trim() || '1ª edição',
        capa: capaEscolhida,
        cadastradoPor: getUsuarioLogado()
    };

    try {
        salvarLivro(livro);
    } catch (erro) {
        mostrarErro(campoCapa, 'Não foi possível salvar: o armazenamento do navegador está cheio. Tente uma imagem menor.');
        campoCapa.focus();
        return;
    }

    formLivro.reset();
    capaEscolhida = '';
    previewCapa.hidden = true;

    sucessoLivro.innerHTML = `
        "${escaparHTML(livro.titulo)}" foi cadastrado com sucesso!
        <a href="livro.html?id=${encodeURIComponent(livro.id)}">Ver livro</a> ·
        <a href="../home/home.html#catalogo">Ver catálogo</a>
    `;
    sucessoLivro.focus();
});
