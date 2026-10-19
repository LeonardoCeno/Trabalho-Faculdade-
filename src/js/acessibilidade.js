const ZOOM_MINIMO = 1;
const ZOOM_MAXIMO = 1.5;

function aplicarPreferencias() {
    const zoom = Number(localStorage.getItem('zoom')) || 1;
    const contraste = localStorage.getItem('contraste') === 'sim';

    document.body.style.zoom = zoom;
    document.documentElement.classList.toggle('alto-contraste', contraste);

    const botaoContraste = document.getElementById('a11y-contraste');

    if (botaoContraste) {
        botaoContraste.setAttribute('aria-pressed', String(contraste));
    }
}

function mudarZoom(passo) {
    const atual = Number(localStorage.getItem('zoom')) || 1;
    const novo = Math.min(ZOOM_MAXIMO, Math.max(ZOOM_MINIMO, atual + passo));

    localStorage.setItem('zoom', novo.toFixed(1));
    aplicarPreferencias();
}

// Cria a barra de acessibilidade
function criarBarraAcessibilidade() {
    const barra = document.createElement('div');

    barra.className = 'a11y-barra';
    barra.setAttribute('role', 'group');
    barra.setAttribute('aria-label', 'Opções de acessibilidade');

    barra.innerHTML = `
        <button type="button" id="a11y-diminuir" aria-label="Diminuir tamanho do texto">A-</button>
        <button type="button" id="a11y-normal" aria-label="Tamanho de texto padrão">A</button>
        <button type="button" id="a11y-aumentar" aria-label="Aumentar tamanho do texto">A+</button>
        <button type="button" id="a11y-contraste" aria-pressed="false">Contraste</button>
    `;

    document.body.appendChild(barra);

    document.getElementById('a11y-diminuir').addEventListener('click', () => mudarZoom(-0.1));
    document.getElementById('a11y-aumentar').addEventListener('click', () => mudarZoom(0.1));

    document.getElementById('a11y-normal').addEventListener('click', () => {
        localStorage.setItem('zoom', '1');
        aplicarPreferencias();
    });

    document.getElementById('a11y-contraste').addEventListener('click', () => {
        const ativo = localStorage.getItem('contraste') === 'sim';
        localStorage.setItem('contraste', ativo ? 'nao' : 'sim');
        aplicarPreferencias();
    });
}

criarBarraAcessibilidade();
aplicarPreferencias();
