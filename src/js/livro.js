mostrarUsuario('../../index.html');

const parametros = new URLSearchParams(window.location.search);

const livro = getLivro(parametros.get('id')) || (parametros.has('id') ? null : getLivros()[0]);

if (!livro) {
    document.getElementById('produto').hidden = true;
    document.getElementById('nao-encontrado').hidden = false;
    document.getElementById('breadcrumb-titulo').textContent = 'Não encontrado';
    document.title = 'Livro não encontrado | Livraria';
} else {
    document.title = `${livro.titulo} | Livraria`;

    document.getElementById('breadcrumb-titulo').textContent = livro.titulo;
    document.getElementById('livro-categoria').textContent = livro.categoria.toUpperCase();
    document.getElementById('livro-titulo').textContent = livro.titulo;
    document.getElementById('livro-autor').textContent = livro.autor;
    document.getElementById('livro-descricao').textContent = livro.descricao;
    document.getElementById('livro-formato').textContent = livro.formato;
    document.getElementById('livro-idioma').textContent = livro.idioma;
    document.getElementById('livro-edicao').textContent = livro.edicao;
    document.getElementById('livro-preco').textContent = formatarPreco(livro.preco);

    const areaCapa = document.getElementById('livro-capa');

    if (livro.capa) {
        const imagem = document.createElement('img');
        imagem.src = livro.capa;
        imagem.alt = `Capa do livro ${livro.titulo}`;
        areaCapa.appendChild(imagem);
    } else {
        const semCapa = document.createElement('span');
        semCapa.className = 'book-sem-capa';
        semCapa.textContent = livro.titulo;
        semCapa.setAttribute('aria-hidden', 'true');
        areaCapa.appendChild(semCapa);
    }

    document.getElementById('adicionar-carrinho').addEventListener('click', function () {
        document.getElementById('carrinho-status').textContent =
            `"${livro.titulo}" foi adicionado ao carrinho.`;
    });
}
