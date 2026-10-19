# O que o JavaScript adicionou ao projeto

Na primeira versão a livraria era quase toda HTML e CSS. Tinha um pouco de JavaScript dentro das páginas, mas só para guardar o nome digitado no login e mostrar "Olá, fulano" no topo. Dava para entrar com qualquer nome, sem senha nenhuma, e os livros do catálogo eram escritos direto no HTML (eram quatro cards iguais do Frieren).

Nessa etapa passamos o JavaScript para arquivos separados, dentro da pasta `src/js`, e usamos ele para deixar o site funcionando de verdade.

## Login e cadastro

Agora a pessoa precisa criar uma conta antes de entrar. Na tela de cadastro o nome tem que ter pelo menos 3 letras e não pode já existir, e a senha precisa ter 6 caracteres ou mais. Se a confirmação da senha estiver diferente, aparece um aviso embaixo do campo.

No login o site confere se o usuário existe e se a senha bate. Antes os erros apareciam em `alert`, agora a mensagem aparece em vermelho embaixo do campo, o que fica bem menos chato de usar.

Também colocamos um botão "Mostrar" nos campos de senha e um botão "Sair" no cabeçalho, que desloga e volta para a tela de login.

## Cadastro de livros

Criamos a página `novo-livro.html`, com um formulário para adicionar livros ao catálogo: título, autor, categoria, preço, formato, idioma, edição, descrição e uma imagem de capa (essa é opcional). Só quem está logado consegue cadastrar.

Depois de salvo, o livro já aparece na página inicial. O catálogo deixou de ser HTML fixo e passou a ser montado pelo JavaScript, juntando o livro que já vinha no site com os que foram cadastrados.

A página do livro também mudou. Antes ela mostrava sempre o Frieren, agora ela lê o `id` que vem no link (por exemplo `livro.html?id=dom-casmurro-...`) e preenche as informações do livro certo. Se o livro não existir, aparece uma mensagem dizendo isso.

## Pesquisa

O campo "Pesquisar livros" antes não fazia nada. Agora na página inicial ele filtra os livros enquanto a pessoa digita, procurando pelo título, autor ou categoria. Nas outras páginas, ao apertar Enter, ele leva para a página inicial já com a busca feita.

## Formulário de contato

Continua sem enviar para lugar nenhum (não temos servidor), mas agora ele verifica se todos os campos foram preenchidos e se o e-mail é válido antes de mostrar a mensagem de enviado.

## Acessibilidade

Essa parte foi a que mais mexeu nas páginas. Em todas elas aparece uma barrinha no canto inferior direito com quatro botões: diminuir o texto, voltar ao tamanho normal, aumentar o texto e ligar o alto contraste (fundo preto, texto branco e links em amarelo). O que a pessoa escolhe fica salvo, então continua igual quando ela troca de página.

Além disso:

- tem um link escondido "Pular para o conteúdo" que aparece quando se navega com a tecla Tab;
- os cards de livro viraram links de verdade, então dá para abrir pelo teclado (antes era um `onclick` numa `article`);
- o foco ficou bem visível, com uma borda amarela;
- as mensagens de erro são lidas por leitores de tela, porque estão ligadas aos campos com atributos `aria`;
- quem configurou o computador para ter menos animações não vê as animações do site.

## Onde os dados ficam

Tudo é salvo no `localStorage` do navegador: os usuários, os livros cadastrados e as preferências de acessibilidade. Isso quer dizer que os dados só existem no navegador de quem usou. Se abrir em outro computador ou limpar os dados do navegador, tudo some.

As senhas também ficam salvas ali sem nenhuma proteção. Para um trabalho de faculdade serve, mas num site de verdade isso teria que ficar em um servidor com banco de dados.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `storage.js` | funções usadas em várias páginas: salvar e ler usuários e livros, mostrar o nome no topo, mostrar erros |
| `login.js` | login, cadastro de usuário e o botão de mostrar senha |
| `catalogo.js` | monta os cards da página inicial, a pesquisa e o formulário de contato |
| `livro.js` | preenche a página de um livro |
| `cadastro-livro.js` | formulário de novos livros |
| `acessibilidade.js` | barra de tamanho de texto e contraste |

Junto com isso foi criado o `src/css/acessibilidade.css`, com os estilos da barra, do alto contraste e das mensagens de erro.
