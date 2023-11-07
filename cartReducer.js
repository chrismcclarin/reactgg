// Given the final ShoppingCart component (including all the JSX and event handlers), your job is to finish implementing both the reducer function as well as the calculateTotal function.

// calculateTotal takes in the cart and should return a single numeric value representing the total cost of all the items in the cart.

// For the reducer, look at the component to figure out which action types are being dispatched as well as the shape of the action objects.

// TASKS
// Render the appropriate UI if there are no items in the cart
// Give the user the ability to add items to the shopping cart
// Give the user the ability to remove items from the shopping cart
// Appropriately update the quantity of items in the shopping cart
// Appropriately calculate the total cost of all items in the shopping cart

import * as React from "react";

const products = [
    { id: 1, name: "Poké Ball", price: 10 },
    { id: 2, name: "Great Ball", price: 20 },
    { id: 3, name: "Ultra Ball", price: 30 }
];

function calculateTotal(cart) {
    return 0;
}

const initialState = [];

function reducer(cart, action) {
    return cart;
}

export default function ShoppingCart() {
    const [cart, dispatch] = React.useReducer(reducer, initialState);

    const handleAddToCart = (id) => dispatch({ type: "add", id });

    const handleUpdateQuantity = (id, adjustment) => {
        dispatch({
        type: "update",
        id,
        adjustment
        });
    };

    return (
        <main>
        <h1>Poké Mart</h1>
        <section>
            <div>
            <ul className="products">
                {products.map((product) => (
                <li key={product.id}>
                    {product.name} - ${product.price}
                    <button
                    className="primary"
                    onClick={() => handleAddToCart(product.id)}
                    >
                    Add to cart
                    </button>
                </li>
                ))}
            </ul>
            </div>
        </section>
        <hr />
        <aside>
            <div>
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map((item) => (
                <li key={item.id}>
                    {item.name}
                    <div>
                    <button
                        onClick={() => handleUpdateQuantity(item.id, "decrement")}
                    >
                        -
                    </button>
                    {item.quantity}
                    <button
                        onClick={() => handleUpdateQuantity(item.id, "increment")}
                    >
                        +
                    </button>
                    </div>
                </li>
                ))}
                {!cart.length && <li>Cart is empty</li>}
            </ul>
            </div>
            <hr />

            <h3>Total: ${calculateTotal(cart)}</h3>
        </aside>
        </main>
    );
}
