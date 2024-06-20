// Criar uma lista vazia de usuários
var userList = [];
var count = 1;

// Função para adicionar um novo usuário
function addUser(name, email) {
  var newUser = { id: count++, name: name, email: email };
  userList.push(newUser);
  localStorage.setItem('userList', JSON.stringify(userList));
  renderUserList();
}

// Função para excluir um usuário
function deleteUser(userId) {
  var updatedUserList = userList.filter(function (user) {
    return user.id !== userId;
  });

  if (updatedUserList.length < userList.length) {
    userList = updatedUserList;
    localStorage.setItem('userList', JSON.stringify(userList));
    renderUserList();
  } else {
    alert('Usuário não encontrado.');
  }
}

// Função para excluir todos os usuários
function deleteAllUsers() {
  userList = []; // Redefine a lista de usuários para uma lista vazia
  localStorage.setItem('userList', JSON.stringify(userList)); // Atualiza o localStorage
  renderUserList(); // Re-renderiza a lista de usuários no HTML
}

// Função para recuperar a lista de usuários do localStorage
function getUserList() {
  var storedList = JSON.parse(localStorage.getItem('userList'));
  userList = storedList || [];

  // Atualizar o valor do contador baseado no maior id encontrado na lista
  if (userList.length > 0) {
    count = Math.max(...userList.map(user => user.id)) + 1;
  }
}

// Função para renderizar a lista de usuários no HTML
function renderUserList() {
  var userListElement = document.getElementById('userList');
  userListElement.innerHTML = '';

  userList.forEach(function (user) {
    var listItem = document.createElement('li');
    listItem.innerHTML = '<span class="user-name">' + user.name + '</span> (Email: ' + user.email + ') <button class="delete-button" onclick="deleteUser(' + user.id + ')">Excluir</button>';
    userListElement.appendChild(listItem);
  });
}

// Recuperar a lista de usuários do localStorage
getUserList();

// Renderizar a lista de usuários no HTML
renderUserList();

// Event listener para o formulário de cadastro de usuários
document.getElementById('userForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var nameInput = document.getElementById('nameInput');
  var emailInput = document.getElementById('emailInput');
  addUser(nameInput.value, emailInput.value);
  nameInput.value = '';
  emailInput.value = '';
});
