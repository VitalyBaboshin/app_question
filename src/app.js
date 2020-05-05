import {Question} from './question';
import {createModal, isValid} from "./utils";
import {authWithEmailAndPassword, getAuthForm} from "./auth";
import './style.css'

const form = document.getElementById('form');
const modalBtn = document.getElementById('modal-btn');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');

window.addEventListener('load', Question.renderList);
form.addEventListener('submit', submitFormHadler);

modalBtn.addEventListener('click', openModal);
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value);
});

function submitFormHadler(event) {
    event.preventDefault();

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        };

        //Выключаем кнопку что бы пользователь не мог спамить кучу запросов на сервер
        submitBtn.disabled = true;
        //Асинхронно отправляем запрос на сервер что бы сохранить вопрос
        Question.create(question).then( () => {
            input.value = '';
            input.className ='';
            submitBtn.disabled = false;
        });
    }
}

function openModal() {
    console.log('open modal');
    createModal('Авторизация', getAuthForm());
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(event) {
    event.preventDefault();

    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;

    authWithEmailAndPassword(email, password)
        .then( token => {

        })


}
