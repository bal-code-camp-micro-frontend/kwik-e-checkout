const checkoutPagesTemplate = document.createElement('template');
checkoutPagesTemplate.innerHTML = `
<h1>hello checkout </h1>
<a href="/">list</a>
<a href="/product/1">product 1</a>
`;

class CheckoutPages extends HTMLElement {

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(checkoutPagesTemplate.content.cloneNode(true));
    }
}
    
customElements.define('c-pages', CheckoutPages);