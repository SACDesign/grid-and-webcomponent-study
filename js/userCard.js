const template = document.createElement('template');
template.innerHTML = `
    <style>
        .user-card {
            font-family: 'Helvetica', sans-serif;
            background: #f4f4f4;
            width: 500px;
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: 10px;
            margin-bottom: 15px;
            border-bottom: #222F61 5px solid;
        }

        .user-card img {
            width: 100%;
        }

        .user-card button {
            cursor: pointer;
            background: #DB5326;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 25px;
            padding: 5px 10px;
        }
        </style>
        <div class="user-card">
            <img />
            <div>
                <h3></h3>
            <div class="info">
                <p>Total Cook Time:<slot name="cooktime" /></p
                <p>Difficulty:<slot name="difflevel" /></p
                <p>Description:<slot name="description" /></p
            </div>
            <button id="toggle-info">Save Recipe</button>
            <sl-rating></sl-rating>
            </div>
        </div>
`;    


class UserCard extends HTMLElement {
    constructor() {
        super();

        this.showInfo = true;

        this.attachShadow({ mode: 'open' }); 
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');       
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;

        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

        if(this.showInfo) {
            info.style.display = 'block';
            toggleBtn.innerText = 'Save Recipe';
        } else {
            info.style.display = 'none';
            toggleBtn.innerText = 'Recipe Saved!';
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
    }
}

window.customElements.define('user-card', UserCard);