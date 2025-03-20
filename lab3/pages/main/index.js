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
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="main-page"></div>
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