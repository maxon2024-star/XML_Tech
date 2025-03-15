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
                src: "https://avatars.mds.yandex.net/i?id=2fc759ef1c5de69310332c368b54341e_l-8343733-images-thumbs&n=13",
                title: "Пейзаж",
                category: "landscapes",
                description: "Sunset over the mountains"
            },
            {
                id: 2,
                src: "https://avatars.mds.yandex.net/i?id=b8a73099237229389c4028206ab52671_l-10919913-images-thumbs&n=13",
                title: "Портрет",
                category: "portraits",
                description: "Smiling family"
            },
            {
                id: 3,
                src: "https://i.pinimg.com/originals/8a/55/d5/8a55d5454c375e5989a795b4443ba04c.jpg",
                title: "Стильная",
                category: "fashion",
                description: "Urban street style"
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
        const filters = ["Все", "Пейзажи", "Портреты", "Стиль"];
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
            if (filter === "Все" || photo.category === filter.toLowerCase()) {
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