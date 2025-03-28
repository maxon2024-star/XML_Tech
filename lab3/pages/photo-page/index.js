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
                description: "Потрясающая производительность, больше конфиденциальности, продуктивности и дополнительных возможностей.",
                price: 100
            },
            {
                id: 2,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/gldn-Soft-CP-OneDriveCampaignRefresh-2?wid=297&hei=167&fit=crop",
                title: "Microsoft OneDrive",
                description: "Сохраняйте свои файлы и фотографии на OneDrive — они будут доступны с любого устройства и где угодно.",
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
                <div class="gallery"></div>
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
        
        photos.forEach(photo => {
            if (photo.price >= minPrice && photo.price <= maxPrice) {
                const card = new PhotoCardComponent(gallery);
                card.render(photo, this.onClickCard.bind(this));
            }
        });
    }

    goBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    onClickCard(id) {
        const photoPage = new PhotoPage(this.parent, id);
        photoPage.render();
    }
}