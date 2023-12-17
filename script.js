var btnAdd = document.querySelector('#btn-add');
var btnRemove = document.querySelector('#btn-remove');
var inputNomeProduto = document.querySelector("#input-nome-produto");
var inputQntProduto = document.querySelector("#input-qnt-produto");
var tbodyProdutos = document.querySelector(".produtos");
var localStorage = window.localStorage;
var contador = 0;

inputQntProduto.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    adicionar.click()
  }
})


btnAdd.addEventListener('click', () => {
  contador++;
  tbodyProdutos.innerHTML += `
    <tr>
      <td class="nomeProduto${contador}">${inputNomeProduto.value}</td>
      <td class="qntProduto${contador}">${inputQntProduto.value}</td>
      <td>
        <input type="checkbox" name="delete" class="${contador}"/>
      </td>
    </tr>
  `;
  localStorage.setItem("contador", contador)
  localStorage.setItem(`nomeProduto${contador}`, inputNomeProduto.value);
  localStorage.setItem(`qntProduto${contador}`, inputQntProduto.value);

})


btnRemove.addEventListener('click', () => {
  let text = "Pressione 'OK' para deletar o(s) item(ns) selecionado(s)";
  if (confirm(text) == true) {
    document.querySelectorAll('input[name="delete"]').forEach((e) => {
      if (e.checked) {
        localStorage.removeItem(`nomeProduto${e.className}`);
        localStorage.removeItem(`qntProduto${e.className}`);
        e.parentElement.parentElement.remove();
      }
    })
  }

})

window.addEventListener('load', () => {
  let cont = localStorage.getItem("contador");
  contador = cont;
  if (cont > 0) {
    for (i = 0; i <= cont; i++) {
      if (localStorage.getItem(`nomeProduto${i}`)) {
        tbodyProdutos.innerHTML += `
            <tr>
              <td class="nomeProduto${i}">${localStorage.getItem(`nomeProduto${i}`)}</td>
              <td class="qntProduto${i}">${localStorage.getItem(`qntProduto${i}`)}</td>
              <td>
                <input type="checkbox" name="delete" class="${i}"/>
              </td>
            </tr>
          `;
      }
    }
  }
})
/*
var newLine = document.createElement("tr");
var newCollumNome = document.createElement("td");
newCollumNome.innerText = inputNomeProduto.value;
var newCollumValue = document.createElement("td");
newCollumValue.innerText = inputQntProduto.value;
newLine.appendChild(newCollumNome);
newLine.appendChild(newCollumValue);
document.querySelector("tbody").appendChild(newLine);
*/