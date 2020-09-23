const shoppingCartTemplate = document.createElement('template');
shoppingCartTemplate.innerHTML = `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>

<link href="/c/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
<script src="/c/js/materialize.js"></script>

<style>
  a:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  a {
    display: block;
    text-decoration: none;
    -webkit-transition: background-color .3s;
    transition: background-color .3s;
    font-size: 1rem;
    color: #fff;
    display: block;
    padding: 0 15px;
    cursor: pointer;
  }
  i.material-icons {
    height: 64px;
    line-height: 64px;
    display: block;
    font-size: 24px;
  }
</style>

<a href="/checkout">
    <i class="material-icons left">shopping_cart</i>
    <span>Shopping cart</span>
</a>`;

class ShoopingCart extends HTMLElement {

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(shoppingCartTemplate.content.cloneNode(true));

        this.refresh()

        this.refreshCallback = () => this.refresh()
        window.addEventListener('c:cart:changed', this.refreshCallback);
    }

    refresh() {
        fetch('/c/api/product')
            .then(response => response.json())
            .then(products => products.length)
            .then(count => this.shadowRoot.querySelector("span").innerHTML = `Shopping cart (${count})`)
            .catch(error => console.error("d'oh!:", error))
    }

    disconnectedCallback() {
        window.removeEventListener('c:cart:changed', this.refreshCallback);
    }
}
    
customElements.define('c-shopping-cart', ShoopingCart);