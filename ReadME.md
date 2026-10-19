# Livraria

Projeto desenvolvido para a disciplina de desenvolvimento web, utilizando HTML, CSS e JavaScript.

## Autores

- Arthur G. Decker
- Leonardo Celestino

## Tema

**Livraria Virtual**

## Apresentação

A Livraria é um projeto desenvolvido com o objetivo de criar uma experiência simples, agradável e organizada para usuários que desejam conhecer e encontrar novos livros.

O site apresenta uma seleção de livros, permitindo que o usuário navegue pelo catálogo e acesse uma página individual com informações sobre cada obra. Além disso, o projeto conta com páginas de login e cadastro, permitindo identificar o usuário durante a navegação.

A identidade visual do projeto foi desenvolvida utilizando principalmente tons de roxo, ciano pastel e cores neutras, criando uma aparência inspirada no universo das livrarias e da leitura.

O projeto também possui uma área institucional com informações sobre a livraria e um formulário de contato, permitindo que o visitante envie dúvidas, sugestões ou outras mensagens.

## Funcionalidades

- Página de login (valida usuário e senha cadastrados)
- Página de cadastro de usuário (com validação dos campos)
- Identificação do usuário após o login e botão de sair
- Página inicial da livraria
- Catálogo de livros gerado por JavaScript
- Formulário de cadastro de novos livros (com capa opcional)
- Página individual de livro (`livro.html?id=...`)
- Campo de pesquisa funcional (título, autor ou categoria)
- Seção sobre a livraria
- Formulário de contato
- Navegação entre as páginas
- Layout responsivo

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (sem bibliotecas)
- `localStorage` para guardar usuários, livros e preferências

> Como o projeto não tem servidor, os dados ficam salvos apenas no navegador.
> As senhas são guardadas sem criptografia, o que é aceitável só para fins de estudo.

## Acessibilidade

- Barra de acessibilidade em todas as páginas: aumentar/diminuir o tamanho do texto (preferência salva)
- Link "Pular para o conteúdo" para quem navega pelo teclado
- Foco visível em links, botões e campos
- Cards de livros como links, acessíveis pelo teclado
- Mensagens de erro ligadas aos campos (`aria-describedby`, `aria-invalid`, `aria-live`) em vez de `alert`
- Botão de mostrar/ocultar senha
- `aria-label` nas navegações, `aria-current` na página atual e texto alternativo nas imagens
- Respeita a preferência do sistema por menos animações (`prefers-reduced-motion`)

## Conceitos aplicados

Durante o desenvolvimento foram utilizados conceitos fundamentais de desenvolvimento web, incluindo:

- HTML semântico
- Estrutura com `header`, `main`, `section`, `footer` e `form`
- Formulários HTML
- CSS externo
- Box Model
- Flexbox
- CSS Grid
- Tipografia
- Cores e espaçamentos
- Pseudo-classes
- Responsividade
- Organização de páginas e arquivos
- Manipulação do DOM e eventos em JavaScript
- Validação de formulários
- Acessibilidade (WAI-ARIA)

## Estrutura do projeto

```text
LIVRARIA/
│
├── index.html              (login)
├── README.md
│
└── src/
    │
    ├── login/
    │   ├── login.css
    │   ├── register.html
    │   └── register.css
    │
    ├── home/
    │   ├── home.html
    │   └── style.css
    │
    ├── product/
    │   ├── livro.html
    │   ├── livro.css
    │   └── novo-livro.html     (cadastro de livros)
    │
    ├── css/
    │   └── acessibilidade.css
    │
    ├── js/
    │   ├── storage.js          (funções de dados compartilhadas)
    │   ├── login.js            (login e cadastro de usuário)
    │   ├── catalogo.js         (catálogo, pesquisa e contato)
    │   ├── livro.js            (página do livro)
    │   ├── cadastro-livro.js   (formulário de novos livros)
    │   └── acessibilidade.js   (barra de acessibilidade)
    │
    └── img/
        ├── logoauristicatrue.png
        ├── banner.jpg
        ├── capa.jpeg
        └── Userbeta.png