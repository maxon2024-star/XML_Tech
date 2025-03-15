import { PhotoCardComponent } from "../../components/photo-card/index.js";
import { PhotoPage } from "../photo-page/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
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
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="container mt-5"></div>
        `;
    }

    render() {
        this.parent.innerHTML = ''; // Очистка текущего содержимого
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        const data = this.getData();
        data.forEach(item => {
            const card = new PhotoCardComponent(this.pageRoot);
            card.render(item, this.onClickCard.bind(this));
        });
    }

    onClickCard(id) {
        const photoPage = new PhotoPage(this.parent, id);
        photoPage.render();
    }
}