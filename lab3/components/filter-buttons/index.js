export class FilterButtonsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(filters, activeFilter) {
        // Маппинг категорий на английский
        const categoryMapping = {
            "Все": "Все",
            "Пейзажи": "landscapes",
            "Портреты": "portraits",
            "Стиль": "fashion"
        };

        return filters.map(filter => `
            <button 
                class="filter-button ${categoryMapping[filter] === activeFilter ? 'active' : ''}"
                data-filter="${categoryMapping[filter]}"
            >
                ${filter}
            </button>
        `).join('');
    }

    render(filters, listener) {
        const html = this.getHTML(filters, "all"); // Начальная активная категория на английском
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