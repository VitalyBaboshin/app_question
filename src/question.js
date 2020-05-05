export class Question {
    static create(question) {
        return fetch('https://question-re-app.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name;
                return question;
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }

    static renderList() {
        const questions = getQuestionFromLocalStorage();

        const html = questions.length
        ? questions.map(toCard).join('')
            : '<div class="mui--text-headline">Вы пока ничего не спросили</div>';

        const list = document.getElementById('list');

        list.innerHTML = html;
    }
}

function addToLocalStorage(question) {
    const all = getQuestionFromLocalStorage();
    all.push(question);
    localStorage.setItem('questions', JSON.stringify(all));
}
function getQuestionFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]');
}

function toCard(question) {
    return `
        <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>${question.text}</div>
        <br>
    `;
}
