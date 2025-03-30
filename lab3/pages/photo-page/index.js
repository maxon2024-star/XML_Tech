import { FilterSliderComponent } from "../../components/filter-slider/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { PhotoCardComponent } from "../../components/photo-card/index.js";
import { MainPage } from "../main/index.js";

export class PhotoPage {
    constructor(parent, photoId) {
        this.parent = parent;
        this.photoId = photoId;
    }

    getData() {
        const photos = [
            {
                id: 1,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/gldn-MSFT-CP-Edge?wid=297&hei=167&fit=crop",
                title: "Microsoft Edge",
                description: "Потрясающая производительность и больше возможностей.",
                price: 100
            },
            {
                id: 2,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/gldn-Soft-CP-OneDriveCampaignRefresh-2?wid=297&hei=167&fit=crop",
                title: "Microsoft OneDrive",
                description: "Сохраняйте свои файлы на OneDrive — доступность где угодно.",
                price: 200
            },
            {
                id: 3,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-SMB-OneNote?wid=297&hei=167&fit=crop",
                title: "OneNote",
                description: "Приведите свои заметки и дела в порядок.",
                price: 170
            },
            {
                id: 4,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-Bing?wid=297&hei=167&fit=crop",
                title: "Bing",
                description: "Поиск видео, картинок, карт, новостей и многого другого.",
                price: 150
            }
        ];
        return photos;
    }

    get pageRoot() {
        return document.getElementById('photo-page');
    }

    getHTML() {
        return `
            <div id="photo-page" class="container mt-5">
                <h2 class="text-center mb-4">Наши продукты</h2>
                <div class="filter-slider"></div>
                <div class="sum-of-squares mt-4"></div>
                <div class="anagram-info mt-4"></div> <!-- Плашка для группировки анаграмм -->                <div class="gallery"></div>
                <div class="back-button-container"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = ''; // Очистка текущего содержимого
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const data = this.getData();

        // Определяем минимальную и максимальную цену
        const prices = data.map(photo => photo.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        const filterContainer = this.pageRoot.querySelector('.filter-slider');
        const filterSlider = new FilterSliderComponent(filterContainer, minPrice, maxPrice);
        filterSlider.render((minPrice, maxPrice) => {
            this.onFilterChange(minPrice, maxPrice, data);
        });

        // Добавляем плашку для отображения суммы квадратов цен
        this.showSumOfSquares(prices);

        // Добавляем плашку для отображения группировки анаграмм
        this.showAnagramGroups(data);

        this.showFilteredPhotos(data, minPrice, maxPrice); // Показываем все товары по умолчанию
        
        // Добавляем кнопку "Назад"
        const backButtonContainer = this.pageRoot.querySelector('.back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.goBack.bind(this));
    }

    onFilterChange(minPrice, maxPrice, data) {
        this.showFilteredPhotos(data, minPrice, maxPrice);
    }

    showFilteredPhotos(photos, minPrice, maxPrice) {
        const gallery = this.pageRoot.querySelector('.gallery');
        gallery.innerHTML = ''; // Очистка галереи

        const filteredPrices = [];

        photos.forEach(photo => {
            if (photo.price >= minPrice && photo.price <= maxPrice) {
                const card = new PhotoCardComponent(gallery);
                card.render(photo, this.onClickCard.bind(this));
                filteredPrices.push(photo.price);
            }
        });

        // Обновляем сумму квадратов цен для отфильтрованных продуктов
        this.showSumOfSquares(filteredPrices);
    }

    goBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    onClickCard(id) {
        const photoPage = new PhotoPage(this.parent, id);
        photoPage.render();
    }

    sumOfSquares(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i] * arr[i];
        }
        return sum;
    }

    showSumOfSquares(prices) {
        const sumOfSquaresContainer = this.pageRoot.querySelector('.sum-of-squares');
        const sum = this.sumOfSquares(prices);
        sumOfSquaresContainer.innerHTML = `<div class="sum-of-squares">Завтра цена на все продукты вырастет на: ${sum}$</div>`;
    }

    anagram(words) {
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

    showAnagramGroups(data) {
        const titles = data.map(photo => photo.title);
        const anagramGroups = this.anagram(titles);

        const anagramGroupContainer = this.pageRoot.querySelector('.anagram-info');
        if (anagramGroups.length > 0) {
            anagramGroupContainer.innerHTML = `
                <p>Группы анаграмм среди продуктов: ${anagramGroups.join('; ')}</p>
            `;
        } else {
            anagramGroupContainer.innerHTML = `
                <p>Группы анаграмм среди продуктов не найдены.</p>
            `;
        }
    }
}