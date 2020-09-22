class AddToCartButton extends HTMLElement {
    connectedCallback() {
        const productId = this.getAttribute("id");
        this.innerHTML = `
            <a class="waves-effect waves-teal btn-flat">
                <i class="material-icons left">add_shopping_cart</i>
                Add to cart
            </a>`;
        this.querySelector("a").addEventListener("click", () => {
            fetch(`/c/api/product/${productId}`, {method: "PUT"})
            .then( response => {
                if (!response.ok) {
                    alert('Something went wrong:', response);
                }
            })
            .catch(error => {
                alert('Something went wrong:', error);
            });
        });
    }
    disconnectedCallback() {
        this.querySelector("a").removeEventListener("click");
    }
}
    
customElements.define('c-add-to-cart-button', AddToCartButton);