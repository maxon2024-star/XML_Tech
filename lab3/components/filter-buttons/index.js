export class FilterButtonsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(filters, activeFilter) {
        return filters.map(filter => `
            <button 
                class="filter-button ${filter === activeFilter ? 'active' : ''}"
                data-filter="${filter}"
            >
                ${filter}
            </button>
        `).join('');
    }

    render(filters, listener) {
        const html = this.getHTML(filters, "Все");
        this.parent.innerHTML = html;

        this.parent.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.updateActiveButton(filter);
                listener(filter);
            });
        });
    }

    updateActiveButton(filter) {
        this.parent.querySelectorAll('.filter-button').forEach(button => {
            button.classList.remove('active');
            if (button.dataset.filter === filter) {
                button.classList.add('active');
            }
        });
    }
}