const deleteCartButtonTemplate = document.createElement('template');
deleteCartButtonTemplate.innerHTML = `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>

<link href="/c/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
<script src="/c/js/materialize.js"></script>

<button class="waves-effect waves-light btn red" alt="remove">
    <i class="material-icons left ">remove_shopping_cart</i>
    Remove
</button>`;

class DeleteCartButton extends HTMLElement {

    get productId() {
        return this.getAttribute('product-id');
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(deleteCartButtonTemplate.content.cloneNode(true));
        const button = this.shadowRoot.querySelector("button");
        button.addEventListener("click", () => this.handleClick());
    }

    handleClick() {
        fetch(`/c/api/product/${this.productId}`, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    this.dispatchEvent(new CustomEvent('c:cart:changed', {
                        bubbles: true,
                        composed: true,
                        detail: { productId: this.productId }
                    }));
                } else {
                    console.error('Something went wrong:', response);
                }
            })
            .catch(error => {
                console.error('Something went wrong:', error);
            });
    }


    disconnectedCallback() {
        this.shadowRoot.querySelector("button").removeEventListener("click", () => this.handleClick());
    }
}

customElements.define('c-delete-cart-button', DeleteCartButton);