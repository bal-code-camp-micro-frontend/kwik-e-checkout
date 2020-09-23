
import './shopping-cart.js'
import './delete-cart-button.js'
import './add-to-cart-button.js'
import {html, render} from 'https://unpkg.com/lit-html?module';


const checkoutNavHtml = html`
    <nav class="light-blue lighten-1" role="navigation">
        <div class="nav-wrapper container">
            <a id="logo-container" href="/" class="brand-logo">
                <img src="/c/images/banner.svg" alt="logo" style="height: 65px" />
            </a>
            <ul class="right hide-on-med-and-down">
                <li>
                    <c-shopping-cart></c-shopping-cart>
                </li>
            </ul>

            <ul id="nav-mobile" class="sidenav">
                <li><a href="#">Navbar Link</a></li>
            </ul>
            <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
    </nav>`

const checkoutFooterHtml = html`
    <footer class="page-footer orange">
        <div class="container">
            <div class="row">
                <div class="col l9 s12">
                    <h5 class="white-text">
                        <img src="/c/images/banner.svg" alt="logo" style="height: 120px" />
                    </h5>
                    <p class="grey-text text-lighten-4">
                        See our GitHub orga
                        <a class="orange-text text-lighten-3"
                            href="https://github.com/bal-code-camp-micro-frontend">bal-code-camp-micro-frontend</a>
                    </p>
                </div>
                <div class="col l3 s12">
                    <h5 class="white-text">Team Repositories</h5>
                    <ul>
                        <li>
                            <a class="white-text"
                                href="https://github.com/bal-code-camp-micro-frontend/kwik-e-proxy">kwik-e-proxy</a>
                        </li>
                        <li>
                            <a class="white-text"
                                href="https://github.com/bal-code-camp-micro-frontend/kwik-e-list">kwik-e-list</a>
                        </li>
                        <li>
                            <a class="white-text"
                                href="https://github.com/bal-code-camp-micro-frontend/kwik-e-detail">kwik-e-detail</a>
                        </li>
                        <li>
                            <a class="white-text"
                                href="https://github.com/bal-code-camp-micro-frontend/kwik-e-checkout">kwik-e-checkout</a>
                        </li>
                        <li>
                            <a class="white-text"
                                href="https://github.com/bal-code-camp-micro-frontend/okd4-deployment">okd4-deployment</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
                Made by
                <a class="orange-text text-lighten-3" href="https://github.com/kullmanp">Peter</a>,
                <a class="orange-text text-lighten-3" href="https://github.com/hirsch88">Gery</a>,
                <a class="orange-text text-lighten-3" href="https://github.com/mateuszbaloise">Mateusz</a>
                &amp;
                <a class="orange-text text-lighten-3" href="https://github.com/christiansiegel">Christian</a>
                with ❤️
                <br />
                Product images from
                <a class="orange-text text-lighten-3" href="https://simpsonswiki.com/">simpsonswiki.com</a>
            </div>
        </div>
    </footer>
`

const checkoutPageHtml = (products) => html`
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="/c/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />

    ${checkoutNavHtml}

    <div class="container">
        <h1>Shopping Cart (${products.length})</h1>
        <ul class="collection" style="margin-bottom: 60px;">
            ${products.length > 0 ? products.map((product) => html`
                <li class="collection-item avatar">
                    <img src="${product.imageUrl}" alt="" class="circle">
                    <span class="title"><b>${product.name}</b></span>
                    <p>CHF ${product.price}</p>
                    <c-delete-cart-button class="secondary-content" product-id="${product.id}"></c-delete-cart-button>
                </li>
            `) : html`
                <h3>No Results</h3>
                <img src="https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F05f43d38-e7c1-11e5-b34f-8cb8b003b8aa.jpg?crop=1429%2C804%2C45%2C12&resize=400"
                    alt="no-data" style="width: 400px;">
            `}
        </ul>
    </div>

    ${checkoutFooterHtml}
`;

class CheckoutPages extends HTMLElement {

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render([])
        this.refresh()

        window.addEventListener('c:cart:changed', () => this.refresh());
    }

    refresh() {
        fetch('/c/api/product')
            .then(response => response.json())
            .then(products => this.render(products))
    }

    render(products) {
        render(checkoutPageHtml(products), this.shadowRoot);
    }
}
    
customElements.define('c-pages', CheckoutPages);