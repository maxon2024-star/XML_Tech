export class FilterSliderComponent {
    constructor(parent, minPrice, maxPrice) {
        this.parent = parent;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.currentMinPrice = minPrice;
        this.currentMaxPrice = maxPrice;
    }

    getHTML() {
        return `
            <div class="filter-slider">
                <label for="min-price-range">От: ${this.currentMinPrice}</label>
                <input 
                    type="range" 
                    id="min-price-range" 
                    min="${this.minPrice}" 
                    max="${this.maxPrice}" 
                    value="${this.currentMinPrice}" 
                />
                <label for="max-price-range">До: ${this.currentMaxPrice}</label>
                <input 
                    type="range" 
                    id="max-price-range" 
                    min="${this.minPrice}" 
                    max="${this.maxPrice}" 
                    value="${this.currentMaxPrice}" 
                />
            </div>
        `;
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.innerHTML = html;

        const minRangeInput = this.parent.querySelector('#min-price-range');
        const maxRangeInput = this.parent.querySelector('#max-price-range');
        const minLabel = this.parent.querySelector('label[for="min-price-range"]');
        const maxLabel = this.parent.querySelector('label[for="max-price-range"]');

        minRangeInput.addEventListener('input', (e) => {
            this.currentMinPrice = parseInt(e.target.value, 10);
            if (this.currentMinPrice > this.currentMaxPrice) {
                this.currentMinPrice = this.currentMaxPrice;
                minRangeInput.value = this.currentMaxPrice;
            }
            minLabel.textContent = `От: ${this.currentMinPrice}`;
            listener(this.currentMinPrice, this.currentMaxPrice);
        });

        maxRangeInput.addEventListener('input', (e) => {
            this.currentMaxPrice = parseInt(e.target.value, 10);
            if (this.currentMaxPrice < this.currentMinPrice) {
                this.currentMaxPrice = this.currentMinPrice;
                maxRangeInput.value = this.currentMinPrice;
            }
            maxLabel.textContent = `До: ${this.currentMaxPrice}`;
            listener(this.currentMinPrice, this.currentMaxPrice);
        });
    }
}