class ShoopingCart extends HTMLElement {
    count = undefined;

    connectedCallback() {
        this.render();
        this.refresh()
        window.addEventListener('c:cart:changed', () => this.refresh());
    }

    refresh() {
        fetch('/c/api/product')
            .then(response => response.json())
            .then(products => this.count = products.length)
            .then(() => this.render())
            .catch(error => alert("d'oh!:", error))
    }

    render() {
        const counter = this.count ? `(${this.count})` : ''
        this.innerHTML = `
            <span>
                <i class="material-icons left">shopping_cart</i>
                Shopping cart ${counter}
            </span>`;
    }

    disconnectedCallback() {
        window.removeEventListener('c:cart:changed', () => this.refresh());
    }
}
    
customElements.define('c-shopping-cart', ShoopingCart);