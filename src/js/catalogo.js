mostrarUsuario('../../index.html');

// Catálogo de livros
const listaLivros = document.getElementById('lista-livros');
const statusCatalogo = document.getElementById('catalogo-status');
const campoBusca = document.getElementById('busca');

function criarCardLivro(livro, indice) {
    const numero = String(indice + 1).padStart(2, '0');

    const capa = livro.capa
        ? `<img src="${livro.capa}" alt="">`
        : `<span class="book-sem-capa" aria-hidden="true">${escaparHTML(livro.titulo)}</span>`;

    return `
        <article class="book">
            <a class="book-link" href="../product/livro.html?id=${encodeURIComponent(livro.id)}">

                <div class="book-image">
                    <span class="book-number" aria-hidden="true">${numero}</span>
                    ${capa}
                </div>

                <div class="book-info">
                    <span class="book-category">${escaparHTML(livro.categoria)}</span>
                    <h3>${escaparHTML(livro.titulo)}</h3>
                    <p class="author">${escaparHTML(livro.autor)}</p>

                    <div class="book-bottom">
                        <strong>${formatarPreco(livro.preco)}</strong>
                        <span class="book-arrow" aria-hidden="true">→</span>
                    </div>
                </div>

            </a>
        </article>
    `;
}

function mostrarLivros(termo = '') {
    const busca = termo.trim().toLowerCase();

    const livros = getLivros().filter(livro =>
        `${livro.titulo} ${livro.autor} ${livro.categoria}`.toLowerCase().includes(busca)
    );

    listaLivros.innerHTML = livros.map(criarCardLivro).join('');

    if (!busca) {
        statusCatalogo.textContent = '';
    } else if (livros.length === 0) {
        statusCatalogo.textContent = `Nenhum livro encontrado para "${termo.trim()}".`;
    } else {
        statusCatalogo.textContent = `${livros.length} livro(s) encontrado(s) para "${termo.trim()}".`;
    }
}

campoBusca.addEventListener('input', function () {
    mostrarLivros(campoBusca.value);
});

const buscaInicial = new URLSearchParams(window.location.search).get('busca') || '';
campoBusca.value = buscaInicial;
mostrarLivros(buscaInicial);

if (buscaInicial) {
    document.getElementById('catalogo').scrollIntoView();
}


// Formulário de contato

const formContato = document.getElementById('form-contato');
const sucessoContato = document.getElementById('contato-sucesso');

formContato.addEventListener('submit', function (event) {
    event.preventDefault();
    limparErros(formContato);
    sucessoContato.textContent = '';

    let primeiroErro = null;

    formContato.querySelectorAll('input, textarea').forEach(campo => {
        if (!campo.value.trim()) {
            mostrarErro(campo, 'Preencha este campo.');
            primeiroErro = primeiroErro || campo;
        } else if (campo.type === 'email' && !campo.checkValidity()) {
            mostrarErro(campo, 'Digite um e-mail válido.');
            primeiroErro = primeiroErro || campo;
        }
    });

    if (primeiroErro) {
        primeiroErro.focus();
        return;
    }

    formContato.reset();
    sucessoContato.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
});
