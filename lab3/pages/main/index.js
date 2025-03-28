import { PhotoCardComponent } from "../../components/photo-card/index.js";
import { PhotoPage } from "../photo-page/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = this.getData();
    }

    getData() {
        return [
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
                </div>
                <div class="gallery"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = ''; // Очистка текущего содержимого
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const gallery = this.pageRoot.querySelector('.gallery');

        this.data.forEach(item => {
            const card = new PhotoCardComponent(gallery);
            card.render(item, this.onClickCard.bind(this));
        });

        const addCardBtn = this.pageRoot.querySelector('#add-card-btn');
        const removeCardBtn = this.pageRoot.querySelector('#remove-card-btn');

        addCardBtn.addEventListener('click', this.addCard.bind(this));
        removeCardBtn.addEventListener('click', this.removeCard.bind(this));
    }

    addCard() {
        if (this.data.length > 0) {
            const newCardData = { ...this.data[0], id: this.data.length + 1 };
            this.data.push(newCardData);

            const gallery = this.pageRoot.querySelector('.gallery');
            const card = new PhotoCardComponent(gallery);
            card.render(newCardData, this.onClickCard.bind(this));
        }
    }

    removeCard() {
        if (this.data.length > 1) {
            this.data.pop();

            const gallery = this.pageRoot.querySelector('.gallery');
            gallery.lastElementChild.remove();
        }
    }

    onClickCard(id) {
        const photoPage = new PhotoPage(this.parent, id);
        photoPage.render();
    }
}