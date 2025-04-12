// pages/main/index.js
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product-page/index.js";
import { FilterSliderComponent } from "../../components/filter-slider/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = this.getProducts();
    }

    getProducts() {
        const products = [
            {
                id: 1,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/gldn-MSFT-CP-Edge?wid=297&hei=167&fit=crop",
                title: "Microsoft Edge",
                description: "Подробная информация по кнопке",
                price: 100
            },
            {
                id: 2,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/gldn-Soft-CP-OneDriveCampaignRefresh-2?wid=297&hei=167&fit=crop",
                title: "OneDrive",
                description: "Подробная информация по кнопке",
                price: 200
            },
            {
                id: 3,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-SMB-OneNote?wid=297&hei=167&fit=crop",
                title: "OneNote",
                description: "Подробная информация по кнопке",
                price: 170
            },
            {
                id: 4,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-Bing?wid=297&hei=167&fit=crop",
                title: "Bing",
                description: "Подробная информация по кнопке",
                price: 150
            },
            {
                id: 5,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-Bing?wid=297&hei=167&fit=crop",
                title: "eat",
                description: "Подробная информация по кнопке",
                price: 69
            },
            {
                id: 6,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-Bing?wid=297&hei=167&fit=crop",
                title: "tea",
                description: "Подробная информация по кнопке",
                price: 96
            },
            {
                id: 7,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-Bing?wid=297&hei=167&fit=crop",
                title: "ace",
                description: "Подробная информация по кнопке",
                price: 69
            },
            {
                id: 8,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-Bing?wid=297&hei=167&fit=crop",
                title: "eac",
                description: "Подробная информация по кнопке",
                price: 96
            }
        ];
        return this.getDataWithMinMax(products);
    }

    getDataWithMinMax(array) {
        const min = Math.min(...array.map(item => item.price));
        const max = Math.max(...array.map(item => item.price));
        return { data: array, min, max };
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="main-page">
                <div class="controls">
                    <button id="add-card-btn" class="control-btn">Добавить карточку</button>
                    <button id="remove-card-btn" class="control-btn">Удалить карточку</button>
                    <div class="duplicate-alert mt-4"></div> <!-- Плашка для дубликатов -->
                </div>
                <div class="couple-form mt-4">
                    <div class="d-flex align-items-center">
                        <div class="mb-3 mr-2">
                            <label for="targetSum" class="form-label">Введите целевую сумму:</label>
                            <input type="text" class="form-control" id="targetSum" placeholder="350">
                        </div>
                        <button id="findCoupleButton" class="btn btn-primary">Найти пары продуктов</button>
                    </div>
                    <div class="couple-result mt-4"></div> <!-- Плашка для результатов -->
                </div>
                <div class="filter-container">
                    <div class="slider-container">
                        <label>Цена: <span id="min-price-value"></span> - <span id="max-price-value"></span></label>
                        <div class="slider-track">
                            <div class="slider-range"></div>
                            <div class="slider-thumb" id="thumb1" style="left: 0;"></div>
                            <div class="slider-thumb" id="thumb2" style="left: 100%;"></div>
                        </div>
                    </div>
                    <div class="anagram-checkbox-container">
                        <label>
                            <input type="checkbox" id="anagram-checkbox"> Анаграммы
                        </label>
                    </div>
                </div>
                <div class="gallery"></div>
                <div class="anagram-info mt-4"></div> <!-- Плашка для группировки анаграмм -->
                <div class="sum-of-squares mt-4"></div> <!-- Плашка для суммы квадратов -->
                <div class="back-button-container"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = ''; // Очистка текущего содержимого
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        const gallery = this.pageRoot.querySelector('.gallery');
        this.data.data.forEach(item => {
            const card = new ProductCardComponent(gallery, this.isAnagram.bind(this));
            card.render(item, this.onClickCard.bind(this));
        });
        const addCardBtn = this.pageRoot.querySelector('#add-card-btn');
        const removeCardBtn = this.pageRoot.querySelector('#remove-card-btn');
        addCardBtn.addEventListener('click', this.addCard.bind(this));
        removeCardBtn.addEventListener('click', this.removeCard.bind(this));
        const minPriceSlider = this.pageRoot.querySelector('#thumb1');
        const maxPriceSlider = this.pageRoot.querySelector('#thumb2');
        const minPriceValue = this.pageRoot.querySelector('#min-price-value');
        const maxPriceValue = this.pageRoot.querySelector('#max-price-value');
        minPriceValue.textContent = `${this.data.min}$`;
        maxPriceValue.textContent = `${this.data.max}$`;
        const filterContainer = this.pageRoot.querySelector('.filter-container');
        const filterSlider = new FilterSliderComponent(filterContainer, this.data.min, this.data.max);
        filterSlider.render(this.filterData.bind(this));
        this.checkForDuplicates();
        const findCoupleBtn = this.pageRoot.querySelector('#findCoupleButton');
        findCoupleBtn.addEventListener('click', this.findAndDisplayProductPairs.bind(this));
        const anagramGroupContainer = this.pageRoot.querySelector('.anagram-info');
        this.showAnagramGroups(anagramGroupContainer);
        const sumOfSquaresContainer = this.pageRoot.querySelector('.sum-of-squares');
        this.showSumOfSquares(sumOfSquaresContainer);
        const backButtonContainer = this.pageRoot.querySelector('.back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.goBack.bind(this));
    }

    addCard() {
        if (this.data.data.length > 0) {
            const newCardData = { ...this.data.data[0], id: this.data.data.length + 1 };
            this.data.data.push(newCardData);
            const gallery = this.pageRoot.querySelector('.gallery');
            const card = new ProductCardComponent(gallery, this.isAnagram.bind(this));
            card.render(newCardData, this.onClickCard.bind(this));
            this.checkForDuplicates();
        }
    }

    removeCard() {
        if (this.data.data.length > 1) {
            this.data.data.pop();
            const gallery = this.pageRoot.querySelector('.gallery');
            gallery.lastElementChild.remove();
            this.checkForDuplicates();
        } else {
            this.showDuplicateAlert(false);
        }
    }

    onClickCard(id) {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }

    isEqualObj(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (let key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
        return true;
    }

    checkForDuplicates() {
        const duplicateAlertContainer = this.pageRoot.querySelector('.duplicate-alert');
        let hasDuplicates = false;
        for (let i = 0; i < this.data.data.length; i++) {
            for (let j = i + 1; j < this.data.data.length; j++) {
                if (this.isEqualObj(this.data.data[i], this.data.data[j])) {
                    hasDuplicates = true;
                    break;
                }
            }
            if (hasDuplicates) break;
        }
        this.showDuplicateAlert(hasDuplicates);
    }

    showDuplicateAlert(hasDuplicates) {
        const duplicateAlertContainer = this.pageRoot.querySelector('.duplicate-alert');
        if (hasDuplicates) {
            duplicateAlertContainer.innerHTML = `<p style="color: red;">Внимание! В массиве обнаружены дублирующиеся товары.</p>`;
        } else {
            duplicateAlertContainer.innerHTML = `<p style="color: green;">Отлично! Дубликатов товаров нет.</p>`;
        }
    }

    findCouple(array, number) {
        const result = [];
        const seen = new Set();
        for (let num of array) {
            const complement = number - num;
            if (seen.has(complement)) {
                result.push([complement, num]);
            }
            seen.add(num);
        }
        return result;
    }

    findAndDisplayProductPairs() {
        const targetSum = parseInt(this.pageRoot.querySelector('#targetSum').value, 10);
        const coupleResultContainer = this.pageRoot.querySelector('.couple-result');
        if (isNaN(targetSum)) {
            coupleResultContainer.innerHTML = '<p class="text-danger">Введите корректное целевое число.</p>';
            return;
        }
        const prices = this.data.data.map(item => item.price);
        const pairs = this.findCouple(prices, targetSum);
        if (pairs.length > 0) {
            const productPairs = pairs.map(pair => {
                const product1 = this.data.data.find(item => item.price === pair[0]);
                const product2 = this.data.data.find(item => item.price === pair[1]);
                return `${product1.title} (${product1.price}$) и ${product2.title} (${product2.price}$)`;
            }).join('; ');
            coupleResultContainer.innerHTML = `<p class="text-success">Пары продуктов, которые вы можете купить: ${productPairs}</p>`;
        } else {
            coupleResultContainer.innerHTML = `<p class="text-warning">Пары продуктов не найдены.</p>`;
        }
    }

    filterData(minPrice, maxPrice, showAnagrams) {
        const gallery = this.pageRoot.querySelector('.gallery');
        gallery.innerHTML = '';
        this.data.data.forEach(item => {
            const isAnagram = this.isAnagram(item.title);
            if (item.price >= minPrice && item.price <= maxPrice && (!showAnagrams || isAnagram)) {
                const card = new ProductCardComponent(gallery, this.isAnagram.bind(this));
                card.render(item, this.onClickCard.bind(this));
            }
        });
    }

    goBack() {
        // На главной странице кнопка "Назад" не нужна
    }

    showAnagramGroups(container) {
        const titles = this.data.data.map(product => product.title);
        const anagramGroups = this.findAnagrams(titles);
        container.innerHTML = '';
        if (anagramGroups.length > 0) {
            container.innerHTML = `<p>Группы анаграмм среди продуктов: ${anagramGroups.join('; ')}</p>`;
        } else {
            container.innerHTML = `<p>Группы анаграмм среди продуктов не найдены.</p>`;
        }
    }

    findAnagrams(words) {
        const anagrams = {};
        for (let word of words) {
            const sortedWord = word.toLowerCase().split('').sort().join('');
            if (!anagrams[sortedWord]) {
                anagrams[sortedWord] = [];
            }
            anagrams[sortedWord].push(word);
        }
        return Object.values(anagrams)
            .filter(group => group.length >= 2)
            .map(group => group.sort().join(', '))
            .sort();
    }

    isAnagram(title) {
        const sortedTitle = title.toLowerCase().split('').sort().join('');
        const anagrams = this.findAnagrams(this.data.data.map(product => product.title));
        return anagrams.some(group => group.split(', ').includes(title));
    }

    showSumOfSquares(container) {
        const sumOfSquares = this.data.data.reduce((sum, product) => sum + product.price * product.price, 0);
        container.innerHTML = `<p class="text-thin">Сумма квадратов цен продуктов: ${sumOfSquares}$</p>`;
    }
}