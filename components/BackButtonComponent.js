export class BackButtonComponent {
    constructor(root) {
        this.root = root;
    }

    render(onClick) {
        const button = document.createElement('button');
        button.innerText = 'Back to Home';
        button.addEventListener('click', onClick);
        this.root.appendChild(button);
    }
}