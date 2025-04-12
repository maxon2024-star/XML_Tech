// pages/product-page/index.js
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, productId) {
        this.parent = parent;
        this.productId = productId;
        this.mainPage = new MainPage(this.parent);
    }

    getProducts() {
        const products = [
            {
                id: 1,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/gldn-MSFT-CP-Edge?wid=297&hei=167&fit=crop",
                title: "Microsoft Edge",
                description: "Потрясающая производительность и больше возможностей. Microsoft Edge — это современный браузер, который обеспечивает быструю загрузку сайтов, интуитивно понятный интерфейс и множество полезных функций, таких как защита от вредоносного ПО, чтение PDF-файлов прямо в браузере и интеграция с другими продуктами Microsoft.",
                price: 100
            },
            {
                id: 2,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/gldn-Soft-CP-OneDriveCampaignRefresh-2?wid=297&hei=167&fit=crop",
                title: "Microsoft OneDrive",
                description: "Сохраняйте свои файлы на OneDrive — доступность где угодно. OneDrive — облачное хранилище от Microsoft, которое позволяет вам хранить и синхронизировать ваши файлы, документы, фотографии и видео. Доступ к вашим файлам возможен с любых устройств и платформ, обеспечивая максимальную удобство и безопасность ваших данных.",
                price: 200
            },
            {
                id: 3,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-SMB-OneNote?wid=297&hei=167&fit=crop",
                title: "OneNote",
                description: "Приведите свои заметки и дела в порядок. OneNote — мощное средство для организации информации. Вы можете создавать заметки, списки дел, диаграммы и многое другое. OneNote идеально подходит для студентов, работников и любых людей, которым нужно эффективно управлять своими данными и идеями.",
                price: 170
            },
            {
                id: 4,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-Bing?wid=297&hei=167&fit=crop",
                title: "Bing",
                description: "Поиск видео, картинок, карт, новостей и многого другого. Bing — поисковая система от Microsoft, которая предлагает широкий спектр услуг, включая поиск в Интернете, поиск изображений, карты, новости и многое другое. Bing известен своей точностью и удобством использования.",
                price: 150
            },
            {
                id: 5,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-Bing?wid=297&hei=167&fit=crop",
                title: "eat",
                description: "Продукт eat — это демонстрационный товар для тестирования функциональности анаграмм. Этот продукт может быть использован для проверки алгоритмов группировки анаграмм и отображения соответствующих меток на карточках продуктов.",
                price: 69
            },
            {
                id: 6,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-Bing?wid=297&hei=167&fit=crop",
                title: "tea",
                description: "Продукт tea — это демонстрационный товар для тестирования функциональности анаграмм. Этот продукт может быть использован для проверки алгоритмов группировки анаграмм и отображения соответствующих меток на карточках продуктов.",
                price: 96
            },
            {
                id: 7,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-Bing?wid=297&hei=167&fit=crop",
                title: "ace",
                description: "Продукт ace — это демонстрационный товар для тестирования функциональности анаграмм. Этот продукт может быть использован для проверки алгоритмов группировки анаграмм и отображения соответствующих меток на карточках продуктов.",
                price: 69
            },
            {
                id: 8,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-Bing?wid=297&hei=167&fit=crop",
                title: "eac",
                description: "Продукт eac — это демонстрационный товар для тестирования функциональности анаграмм. Этот продукт может быть использован для проверки алгоритмов группировки анаграмм и отображения соответствующих меток на карточках продуктов.",
                price: 96
            }
        ];
        return products;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" class="container mt-5">
                <h2 class="text-center mb-4">Продукт</h2>
                <div class="product-details"></div>
                <div class="back-button-container"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = ''; // Очистка текущего содержимого
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const product = this.getProducts().find(item => item.id === this.productId);
        if (product) {
            const productDetailsContainer = this.pageRoot.querySelector('.product-details');
            const isAnagram = this.mainPage.isAnagram(product.title);
            productDetailsContainer.innerHTML = `
                <img src="${product.src}" alt="${product.title}" style="max-width: 100%; height: auto;">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Цена: ${product.price}$</p>
                <p>${isAnagram ? 'Анаграмма' : ''}</p>
            `;
        } else {
            this.pageRoot.querySelector('.product-details').innerHTML = '<p>Продукт не найден.</p>';
        }

        const backButtonContainer = this.pageRoot.querySelector('.back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.goBack.bind(this));
    }

    goBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }
}