class AddToCartButton extends HTMLElement {
    connectedCallback() {
        this.render()

        const productId = this.getAttribute("id");
        this.querySelector("a").addEventListener("click", () => this.addToCart(productId));
    }

    addToCart(productId) {
        fetch(`/c/api/product/${productId}`, {method: "PUT"})
            .then( response => {
                if (response.ok) {
                    this.dispatchEvent(new CustomEvent('c:cart:changed', {
                        bubbles: true,
                    }));
                } else {
                    alert('Something went wrong:', response);
                }
            })
            .catch(error => {
                alert('Something went wrong:', error);
            });
    }

    render() {
        this.innerHTML = `
            <a class="waves-effect waves-teal btn-flat">
                <i class="material-icons left">add_shopping_cart</i>
                Add to cart
            </a>`;
    }

    disconnectedCallback() {
        this.querySelector("a").removeEventListener("click");
    }
}
    
customElements.define('c-add-to-cart-button', AddToCartButton);