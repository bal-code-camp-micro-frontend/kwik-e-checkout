class AddToCartButton extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<h1>Hello from WebComponent1</h1>`;
    }
}
    
customElements.define('c-add-to-cart-button', AddToCartButton);