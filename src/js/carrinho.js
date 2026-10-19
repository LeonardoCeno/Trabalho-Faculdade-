mostrarUsuario('../../index.html');
atualizarContadorCarrinho();

const listaCarrinho = document.getElementById('carrinho-lista');
const conteudoCarrinho = document.getElementById('carrinho-conteudo');
const carrinhoVazio = document.getElementById('carrinho-vazio');
const statusCarrinho = document.getElementById('carrinho-status');
const erroCarrinho = document.getElementById('carrinho-erro');

// Junta cada item do carrinho com os dados do livro.
// Itens de livros que não existem mais são ignorados.
function getItensComLivro() {
    return getCarrinho()
        .map(item => ({ ...item, livro: getLivro(item.id) }))
        .filter(item => item.livro);
}

function criarItemCarrinho(item) {
    const livro = item.livro;
    const titulo = escaparHTML(livro.titulo);
    const link = `livro.html?id=${encodeURIComponent(livro.id)}`;

    const capa = livro.capa
        ? `<img src="${livro.capa}" alt="">`
        : `<span class="book-sem-capa">${titulo}</span>`;

    return `
        <li class="cart-item">

            <a class="cart-cover" href="${link}" tabindex="-1" aria-hidden="true">
                ${capa}
            </a>

            <div class="cart-info">
                <h2><a href="${link}">${titulo}</a></h2>
                <p>${escaparHTML(livro.autor)}</p>
                <p>${formatarPreco(livro.preco)} cada</p>
            </div>

            <div class="cart-quantity">
                <button type="button" data-acao="diminuir" data-id="${livro.id}"
                    aria-label="Diminuir quantidade de ${titulo}" ${item.quantidade <= 1 ? 'disabled' : ''}>−</button>
                <span>${item.quantidade}</span>
                <button type="button" data-acao="aumentar" data-id="${livro.id}"
                    aria-label="Aumentar quantidade de ${titulo}">+</button>
            </div>

            <strong class="cart-subtotal">${formatarPreco(livro.preco * item.quantidade)}</strong>

            <button type="button" class="cart-remove" data-acao="remover" data-id="${livro.id}"
                aria-label="Remover ${titulo} do carrinho">Remover</button>

        </li>
    `;
}

function mostrarCarrinho() {
    const itens = getItensComLivro();
    const total = itens.reduce((soma, item) => soma + item.livro.preco * item.quantidade, 0);

    conteudoCarrinho.hidden = itens.length === 0;
    carrinhoVazio.hidden = itens.length > 0;

    listaCarrinho.innerHTML = itens.map(criarItemCarrinho).join('');
    document.getElementById('carrinho-total').textContent = formatarPreco(total);
}

// Botões de cada item (+, − e Remover)
listaCarrinho.addEventListener('click', function (event) {
    const botao = event.target.closest('button[data-acao]');

    if (!botao) {
        return;
    }

    const id = botao.dataset.id;
    const acao = botao.dataset.acao;
    const item = getCarrinho().find(i => i.id === id);
    const titulo = getLivro(id).titulo;

    erroCarrinho.textContent = '';

    if (acao === 'aumentar') {
        mudarQuantidade(id, item.quantidade + 1);
        statusCarrinho.textContent = `Quantidade de "${titulo}": ${item.quantidade + 1}.`;
    } else if (acao === 'diminuir') {
        mudarQuantidade(id, item.quantidade - 1);
        statusCarrinho.textContent = `Quantidade de "${titulo}": ${item.quantidade - 1}.`;
    } else {
        removerDoCarrinho(id);
        statusCarrinho.textContent = `"${titulo}" foi removido do carrinho.`;
    }

    mostrarCarrinho();

    // A lista é recriada, então o foco volta para o mesmo botão (ou para a mensagem, se o item sumiu)
    const mesmoBotao = listaCarrinho.querySelector(`button[data-acao="${acao}"][data-id="${id}"]:not(:disabled)`);
    (mesmoBotao || statusCarrinho).focus();
});

document.getElementById('limpar-carrinho').addEventListener('click', function () {
    limparCarrinho();
    mostrarCarrinho();

    erroCarrinho.textContent = '';
    statusCarrinho.textContent = 'O carrinho foi esvaziado.';
    statusCarrinho.focus();
});

document.getElementById('finalizar-compra').addEventListener('click', function () {
    statusCarrinho.textContent = '';

    if (!getUsuarioLogado()) {
        erroCarrinho.innerHTML = 'Entre na sua conta para finalizar a compra. <a href="../../index.html">Entrar</a>';
        return;
    }

    const total = document.getElementById('carrinho-total').textContent;

    limparCarrinho();
    mostrarCarrinho();

    erroCarrinho.textContent = '';
    statusCarrinho.textContent = `Compra finalizada! Total pago: ${total}. Obrigado pela preferência.`;
    statusCarrinho.focus();
});

mostrarCarrinho();
