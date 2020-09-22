
class AddToCartButton extends HTMLElement {
    inCart = false
    productId = undefined

    connectedCallback() {       
        this.productId = this.getAttribute("id");

        this.render()
        this.refresh()
    }

    refresh() {
        fetch(`/c/api/product/${this.productId}`)
            .then(response => this.inCart = response.ok)
            .then(() => this.render())
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
                this.refresh()
                this.dispatchEvent(new CustomEvent('c:cart:changed', {
                    bubbles: true,
                }));
            })
            .catch(error => {
                alert('Something went wrong:', error);
            });
    }

    render() {
        const text = this.inCart ? 'Remove from cart' : 'Add to cart'
        this.innerHTML = `
            <a class="waves-effect waves-teal btn-flat">
                <i class="material-icons left">add_shopping_cart</i>
                ${text}
            </a>`;
        this.querySelector("a").addEventListener("click", () => this.toggleCart());
    }

    disconnectedCallback() {
        this.querySelector("a").removeEventListener("click");
    }
}
    
customElements.define('c-add-to-cart-button', AddToCartButton);