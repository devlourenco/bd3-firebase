

/*
    ########## LISTAGEM DE LIVROS E AUTORES ##########
*/

/* CAPTURA O ELEMENTO HTML DE LISTA ul QUE VAI LISTAR OS LIVROS */
const livroList = document.querySelector("#book-list");

/* FUNÇÃO QUE VAI RENDERIZAR OS LIVROS DENTRO DO ELEMENTO HTML DE LISTA ul */
function renderBook(doc) {
  //CRIAÇÃO DOS ELEMENTOS HTML:
  let li = document.createElement("li");
  let titulo = document.createElement("span");
  let autor = document.createElement("span");
  let excluir = document.createElement("div");

  //CRIA UM ELEMENTO DE TEXTO "X" PARA AÇÃO DE EXCLUSÃO DE LIVROS
  excluir.textContent = "X";

  //CARREGA OS DADOS NOS ELEMENTOS HTML:
  li.setAttribute("data-id", doc.id);
  titulo.textContent = doc.data().titulo;
  autor.textContent = doc.data().autor;

  //ADICIONANDO OS DADOS DE AUTOR E TITULO NA TAG LI:
  li.appendChild(titulo);
  li.appendChild(autor);

  //INSERE O ELEMENTO DE TEXT PARA A EXCLUSÃO
  li.appendChild(excluir);

  /* TRATA A AÇÃO DE CLIQUE NO BOTÃO X PARA EXCLUSÃO DO ARQUIVO */
  excluir.addEventListener("click", (event) => {
    event.stopPropagation();

    let id = event.target.parentElement.getAttribute("data-id");
    //alert(id);
    db.collection("libri-books")
      .doc(id)
      .delete()
      .then(() => {
        window.location.reload();
      });
  });

  //ADICIONANDO O LI NA TAG UL:
  livroList.appendChild(li);
}

db.collection("libri-books")
  .get()
  .then((snapshot) => {
    // console.log(snapshot.docs)
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
      renderBook(doc);
    });
  });

/*
    ########## INSERÇÃO DE LIVROS E AUTORES ##########
*/

/* CAPTURA O ELEMENTO HTML DE FORMULÁRIO */
const form = document.querySelector("#add-book-form");

/* 
CAPTURA OS DADOS DOS CAMPOS DO FOMULÁRIO PELO EVENTO SUBMIT PARA CADASTRO NO FIRESTORE 
*/
form.addEventListener("submit", (event) => {
  event.preventDefault();

  db.collection("libri-books")
    .add({
      autor: form.autor.value,
      titulo: form.titulo.value,
    })
    .then(() => {
      form.autor.value = "";
      form.titulo.value = "";
      window.location.reload();
    });
});
