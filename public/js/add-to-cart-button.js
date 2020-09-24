import { LitElement, html } from 'https://unpkg.com/lit-element?module';

export class AddToCartButton extends LitElement {

    static get properties() {
        return { 
            productId: {type: String, attribute: 'product-id', },
            filled: {type: Boolean},
            inCart: {type: Boolean, attribute: false},
        };
    }

    constructor() {
        super();
        this.filled = false;
        this.productId = undefined;
        this.inCart = undefined;

        window.addEventListener('c:cart:changed', this._cartChangedEventListener);
        this._reload()
    }

    render() {
        const buttonClass = this.filled ? 'btn' : 'btn-flat'
        const color = (this.inCart !== undefined) ? (this.inCart ? 'red' : 'green') : 'grey'
        const colorClass = this.filled ? color : `${color}-text`
        const text = (this.inCart !== undefined) ? (this.inCart ? "Remove from cart" : "Add to cart") : 'Loading...'
        return html`
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
            
            <link href="/c/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
            <script src="/c/js/materialize.js"></script>
            
            <a @click="${this._toggle}" class="waves-effect waves-teal ${buttonClass} ${colorClass}">
                <i class="material-icons left">${this.inCart ? "remove_shopping_cart" : "add_shopping_cart"}</i>
                ${text}
            </a>
        `;
    }

    updated(changedProperties) {
        if (changedProperties.has('productId')) {
            this._reload()
        }
    }

    disconnectedCallback() {
        window.removeEventListener('c:cart:changed', this._cartChangedEventListener);
    }

    _reload() {
        if (this.productId === undefined || this.productId === null) {
            return
        }
        fetch(`/c/api/product/${this.productId}`, {method: "HEAD"})
            .then(response => this.inCart = response.ok)
            .catch(error => console.error("oh no:", error))
    }

    _toggle() {
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
            .catch(error => console.error('Something went wrong:', error));
    }

    _cartChangedEventListener = (e) => {
        if (e.detail.productId == this.productId) {
            this._reload()
        }
    }
}

customElements.define('c-add-to-cart-button', AddToCartButton);