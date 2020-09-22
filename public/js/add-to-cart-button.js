
const addToCartButtonTemplate = document.createElement('template');
addToCartButtonTemplate.innerHTML = `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>

<link href="/c/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
<script src="/c/js/materialize.js"></script>

<a class="waves-effect waves-teal btn-flat">
    <i class="material-icons left">add_shopping_cart</i>
    <span>Add to cart</span>
</a>`;

class AddToCartButton extends HTMLElement {
    inCart = false

    get productId() {
        return this.getAttribute('product-id');
    }

    get filled() {
        return this.getAttribute('filled') || false;
    }

    get button() {
        return this.shadowRoot.querySelector("a");
    }

    connectedCallback() {       
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(addToCartButtonTemplate.content.cloneNode(true));
        this.button.addEventListener("click", () => this.toggleCart());
        if (this.filled) {
            this.button.classList.remove("btn-flat")
            this.button.classList.add("btn")
        }

        window.addEventListener('c:cart:changed', e => {
            if (e.detail.productId == this.productId) {
                this.refresh()
            }
        });

        this.refresh()
    }

    refresh() {
        fetch(`/c/api/product/${this.productId}`)
            .then(response => this.inCart = response.ok)
            .then(() => this.shadowRoot.querySelector("span").innerHTML = this.inCart ? "Remove from cart" : "Add to cart")
            .catch(error => {
                alert("oh no:", error)
            })
    }

    toggleCart() {
        fetch(`/c/api/product/${this.productId}`, {method: this.inCart ? "DELETE" : "PUT"})
            .then( response => {
                if (!response.ok) {
                    throw new Error('Not 2xx response')
                }
                this.dispatchEvent(new CustomEvent('c:cart:changed', {
                    bubbles: true,
                    composed: true,
                    detail: { productId: this.productId }
                }));
            })
            .catch(error => {
                alert('Something went wrong:', error);
            });
    }

    disconnectedCallback() {
        this.button.removeEventListener("click");
    }
}
    
customElements.define('c-add-to-cart-button', AddToCartButton);