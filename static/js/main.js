let socket = io();

const input = document.getElementById('input-submit'); // input message

// FROM LOGIN
const inputUserLogin = $('#user-login'); // input user login
const errorLogin = $('#error-login'); // if error login go here

// CONTAINERS
const chat = $('#section-chat'); // chat messages
const login = $('#section-login');  // login
const list = document.getElementById('list');

chat.hide();

$('#form-login').submit((e) => {
  e.preventDefault();
  if (inputUserLogin.val()) {
    socket.emit('newUser', inputUserLogin.val(), (data) => {
      if (data === true) {
        inputUserLogin.val('');
        login.hide(1000);
        chat.show(1500);
      }
    });
  } else {
    console.error('mamalooo');
  }
});

$('#form-chat').submit((e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat', input.value);
    input.value = '';
  }
});

socket.on('usernames', (nicknames) => {
  let template = '';
  nicknames.forEach(key => {
    template += `<p class=''><i class='bi-at'></i>${key}</p>`;
  });
  $('#users-connected').html(template);
});

socket.on('chat', (data) => {
  let b = document.createElement('b');
  let span = document.createElement('span');
  let li = document.createElement('li');
  // b.addClass('col s3 grey lighten4');
  // li.addClass('section');
  b.textContent = data.user;
  span.textContent = data.msg;
  // li.appendChild(b);
  // li.appendChild(span);
  // console.log(li);
  let template = `<div class='row'><b class='col s3'>${data.user}:</b><span class='col s9'>${data.msg}</span></div>`;
  li.innerHTML = template;
  // let template = `<b class='col s3 grey section'>${data.user}:</b><span class='col s9'><b>${data.msg}</b></span>`;
  list.appendChild(li);

});
