let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

function addToTable() {
  //Definindo as variaveis e recebendo os dados
  let descricao = document.getElementById("descricao").value;
  let detalhamento = document.getElementById("detalhamento").value;
  let table = document.getElementById("myTable");
  if (descricao == "" && detalhamento == "") {
    alert("Por favor, preencha os campos.");
    attTable();
  }
  if (!descricao == "" && detalhamento == "") {
    alert("Por favor, preencha o Detalhamento.");
  }
  if (descricao == "" && !detalhamento == "") {
    alert("Por favor, preencha a Descrição.");
  }
  if (!descricao == "" && !detalhamento == "") {
    salvaLocalStorage(descricao, detalhamento);

    //Limpando os campos de inserção de dados
    document.getElementById("descricao").value = "";
    document.getElementById("detalhamento").value = "";

    //Retornando 'false' para impedir o reload da pagina
    attTable();
  }
}

function removeToTable(id) {
  let bdata = localStorage.getItem(sessionStorage.getItem("logged"));
  let usuarioData = JSON.parse(bdata);
  let attRecados = usuarioData.transactions.filter(
    (recado) => recado.id !== id
  );
  usuarioData.transactions = attRecados;
  saveData(usuarioData);
  attTable();
}

function editToTable(id) {
  let bdata = localStorage.getItem(sessionStorage.getItem("logged"));
  let usuarioData = JSON.parse(bdata);
  let attRecados = usuarioData.transactions.filter(
    (recado) => recado.id !== id
  );
  usuarioData.transactions = attRecados;
  saveData(usuarioData);
  attTable();
}

function attTable() {
  let bdata = localStorage.getItem(sessionStorage.getItem("logged"));
  let usuarioData = JSON.parse(bdata);
  let table = document.querySelector("#myTable");
  table.innerHTML = "";

  for (recado of usuarioData.transactions) {
    let tableSize = table.rows.length;
    let row = table.insertRow(tableSize); //Inserindo uma linha abaixo da Tabela
    row.id = recado.id; //Adicionando o id no elemento a ser criado
    let cell1 = row.insertCell(0); //Inserindo as celulas da linha
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    //Criando o codigo do botão para remover a linha
    let btnCode = `<button class='remove-btn' onclick='removeToTable(${recado.id})'>Remover</button>`;
    let editCode = `<button class='edit-btn' onclick='editToTable(${recado.id})'>Editar</button>`;

    //Preenchendo as celulas da linha
    cell1.innerHTML = recado.id;
    cell2.innerHTML = recado.descricao;
    cell3.innerHTML = recado.detalhamento;
    cell4.innerHTML = btnCode;
    cell5.innerHTML = editCode;
  }
}

function salvaLocalStorage(descricao, detalhamento) {
  let bdata = localStorage.getItem(sessionStorage.getItem("logged"));
  let usuarioData = JSON.parse(bdata);
  let recados = {
    id: usuarioData.transactions.length + 1,
    descricao: descricao,
    detalhamento: detalhamento,
  };
  console.log(recados);
  usuarioData.transactions.unshift(recados);
  saveData(usuarioData);
}

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (!logged) {
    window.location.href = "index1.html";
    return;
  }

  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    data = JSON.parse(dataUser);
  }
}

function logout() {
  if (confirm("Deseja realmente sair?")) {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "logar.html";
  }
}

function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}
