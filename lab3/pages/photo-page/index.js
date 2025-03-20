import { FilterButtonsComponent } from "../../components/filter-buttons/index.js";
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
                category: "Браузер",
                description: "Потрясающая производительность, больше конфиденциальности, продуктивности и дополнительных возможностей."
            },
            {
                id: 2,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/gldn-Soft-CP-OneDriveCampaignRefresh-2?wid=297&hei=167&fit=crop",
                title: "Microsoft OneDrive",
                category: "Облако",
                description: "Сохраняйте свои файлы и фотографии на OneDrive — они будут доступны с любого устройства и где угодно."
            },
            {
                id: 3,
                src: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Content-Card-PC-SMB-OneNote?wid=297&hei=167&fit=crop",
                title: "OneNote",
                category: "Заметки",
                description: "Приведите свои заметки и дела в порядок."
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
                <h2 class="text-center mb-4">Фотогалерея</h2>
                <div class="filter-buttons"></div>
                <div class="gallery"></div>
                <div class="back-button-container"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = ''; // Очистка текущего содержимого
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const data = this.getData();
        const filters = ["Все", "Браузер", "Облако", "Заметки"];
        const filterButtons = new FilterButtonsComponent(this.pageRoot.querySelector('.filter-buttons'));
        filterButtons.render(filters, this.onFilterChange.bind(this));

        this.showFilteredPhotos(data, "Все");
        
        // Добавляем кнопку "Назад"
        const backButtonContainer = this.pageRoot.querySelector('.back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.goBack.bind(this));
    }

    onFilterChange(filter) {
        const data = this.getData();
        this.showFilteredPhotos(data, filter);
    }

    showFilteredPhotos(photos, filter) {
        const gallery = this.pageRoot.querySelector('.gallery');
        gallery.innerHTML = ''; // Очистка галереи
        
        photos.forEach(photo => {
            if (filter === "Все" || photo.category === filter) {
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