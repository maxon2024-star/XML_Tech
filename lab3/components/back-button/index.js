export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(onClick) {
        const button = document.createElement('button');
        button.className = 'btn-primary';
        button.textContent = 'Назад';
        button.addEventListener('click', onClick);
        this.parent.appendChild(button);
    }
}