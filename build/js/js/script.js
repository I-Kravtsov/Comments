'use strict'
let form = document.querySelector('.new-comment__form');
let submitButton = document.querySelector('.new-comment__submit');
let commentsList = document.querySelector('.comments__list');

class Comment {
    constructor(name, time, date, text) {
        this.name = name;
        this.time = time;
        this.date = date;
        this.text = text;

        let html = `
            <p class="comment__name">
                ${this.name}
            </p>
            <span class="comment__time">
                ${this.time}
            </span>
            <span class="comment__date">
                ${this.date} 
            </span>
            <p class="comment__text">
                ${this.text}
            </p>
        `
        this.element = document.createElement('li');
        this.element.className = 'comments__item comment';
        this.element.innerHTML = html;
        commentsList.prepend(this.element);
    }
}

function createComentsList(comments) {
    for(let comment of comments) {
        let newComment = new Comment(comment.name, comment.time, comment.date, comment.text);
    }
}

async function getCommentList() {
    let response = await fetch('./comments-list.php');
    let result = await response.json();
    if(result) {
        createComentsList(result);

    }
}

function sendComment() {
    let formData = new FormData(form);
    let nameField = document.querySelector('.new-comment__name-field');
    let textField = document.querySelector('.new-comment__text');
    fetch('./add_comment.php', {
            method: 'post',
            body: formData,
        })
        .then(response => response.text())
        .then(result => {
            if(result == 1) {
                commentsList.innerHTML = '';
                nameField.value = '';
                textField.value = '';
                getCommentList();
            }
            else {
                alert('произошла ошибка, побробуйте еще раз через какое-то время');
            }
        })
}



getCommentList();
form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendComment();

});
