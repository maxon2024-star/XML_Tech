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
                    <div class="mb-3">
                        <label for="targetSum" class="form-label">Введите целевую сумму:</label>
                        <input type="text" class="form-control" id="targetSum" placeholder="350">
                    </div>
                    <button id="findCoupleButton" class="btn btn-primary">Найти пары продуктов</button>
                    <div class="couple-result mt-4"></div> <!-- Плашка для результатов -->
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

        // Проверяем наличие дубликатов при инициализации страницы
        this.checkForDuplicates();

        // Добавляем обработчик события для кнопки "Найти пары продуктов"
        const findCoupleBtn = this.pageRoot.querySelector('#findCoupleButton');
        findCoupleBtn.addEventListener('click', this.findAndDisplayProductPairs.bind(this));
    }

    addCard() {
        if (this.data.length > 0) {
            const newCardData = { ...this.data[0], id: this.data.length + 1 };
            //console.log("Добавляется новая карточка:", JSON.stringify(newCardData));
            this.data.push(newCardData);

            const gallery = this.pageRoot.querySelector('.gallery');
            const card = new PhotoCardComponent(gallery);
            card.render(newCardData, this.onClickCard.bind(this));

            // Проверяем наличие дубликатов после добавления новой карточки
            this.checkForDuplicates();
        }
    }

    removeCard() {
        if (this.data.length > 1) {
            //console.log("Удаляется последняя карточка:", JSON.stringify(this.data[this.data.length - 1]));
            this.data.pop();

            const gallery = this.pageRoot.querySelector('.gallery');
            gallery.lastElementChild.remove();

            // Проверяем наличие дубликатов после удаления карточки
            this.checkForDuplicates();
        } else {
            //console.log("Нельзя удалить последнюю карточку.");
            this.showDuplicateAlert(false);
        }
    }

    onClickCard(id) {
        const photoPage = new PhotoPage(this.parent, id);
        photoPage.render();
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

        // Проверяем наличие дубликатов в массиве
        for (let i = 0; i < this.data.length; i++) {
            for (let j = i + 1; j < this.data.length; j++) {
                if (this.isEqualObj(this.data[i], this.data[j])) {
                   // console.log(`Дубликаты найдены: ${JSON.stringify(this.data[i])} и ${JSON.stringify(this.data[j])}`);
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

        const prices = this.data.map(item => item.price);
        const pairs = this.findCouple(prices, targetSum);

        if (pairs.length > 0) {
            const productPairs = pairs.map(pair => {
                const product1 = this.data.find(item => item.price === pair[0]);
                const product2 = this.data.find(item => item.price === pair[1]);
                return `${product1.title} (${product1.price}$) и ${product2.title} (${product2.price}$)`;
            }).join('; ');

            coupleResultContainer.innerHTML = `<p class="text-success">Пары продуктов, которые вы можете купить: ${productPairs}</p>`;
        } else {
            coupleResultContainer.innerHTML = '<p class="text-warning">Пары продуктов не найдены.</p>';
        }
    }
}