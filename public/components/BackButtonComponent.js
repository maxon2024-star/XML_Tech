export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(clickCallback) {
        const html = `<button class="back-button" id="backButton">Назад</button>`;
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = this.parent.querySelector('#backButton');
        backButton.addEventListener('click', clickCallback);
    }
}
