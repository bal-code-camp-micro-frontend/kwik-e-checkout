const shoppingCartTemplate = document.createElement('template');
shoppingCartTemplate.innerHTML = `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>

<link href="/c/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
<script src="/c/js/materialize.js"></script>

<span>
    <i class="material-icons left">shopping_cart</i>
    <span>Shopping cart</span>
</span>`;

class ShoopingCart extends HTMLElement {

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(shoppingCartTemplate.content.cloneNode(true));

        this.refresh()
        window.addEventListener('c:cart:changed', () => this.refresh());
    }

    refresh() {
        fetch('/c/api/product')
            .then(response => response.json())
            .then(products => products.length)
            .then(count => this.shadowRoot.querySelector("span").innerHTML = `Shopping cart (${count})`)
            .catch(error => alert("d'oh!:", error))
    }

    disconnectedCallback() {
        window.removeEventListener('c:cart:changed', () => this.refresh());
    }
}
    
customElements.define('c-shopping-cart', ShoopingCart);