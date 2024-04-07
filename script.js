const socket = io();

const postForm = document.getElementById('postForm');
const postInput = document.getElementById('postInput');
const postList = document.getElementById('postList');

// Add button event listener
const Add = document.getElementById('add');
const Sub = document.getElementById('sub');
const Number = document.getElementById('number');

Add.addEventListent('click', (e) => {
    e.preventDefault();
    const postContent = Number.textContent;
    postContent += 1;
});

Sub.addEventListent('click', (e) => {
    e.preventDefault();
    const postContent = Number.textContent;
    postContent -= 1;
});



postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const postContent = postInput.value.trim();
  if (postContent) {
    socket.emit('newPost', { content: postContent });
    postInput.value = '';
  }
});

socket.on('newPost', (post) => {
  const postItem = document.createElement('div');
  postItem.classList.add('postItem');
  postItem.textContent = post.content;
  postList.appendChild(postItem);
});

console.log("Hello World");