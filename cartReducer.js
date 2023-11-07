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

// once the reducer is ready, we can look at the calculate tool. We can use a simple reduce function for this.
function calculateTotal(cart) {
    return cart.reduce((total, product) => {
        return total + product.quantity * product.price;
    }, 0);
}

const initialState = [];

// First things first: Add the differnt action types and the error to the reducer
function reducer(cart, action) {
// I added some code to find the item in the cart, since both the add and the decrement need that info.
    const inCart = cart.find((item) => item.id === action.id)

    if (action.type === "add") {
        if (!inCart) {
        // in the add action type, we need to add a new item with a quantity key,
            return [...cart, { ...products[action.id-1], quantity: 1 }]; // the products[action.id-1] isn't the best practice, since id's aren't usually numbered like that.
        }
        // or modify the existing items quantity
        return cart.map((item) =>
            item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
            );
    }
    if (action.type === "update") {
    // in the update action type, we need to know the action adjustment.
        if (action.adjustment === "increment") {
            //Increment is the same as add action, so we just repeat the code of the add function.
            return cart.map((item) =>
                item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        }
    // the decrement(not under an if statment since it is the only other option) needs to verify if the quantity is 1,
        if (item.quantity === 1) {
            // a quantity of 0 should remove the product from the cart. 
            return cart.filter((item) => item.id !== action.id);
        } else {
            // otherwise it should just subtract 1 from the quantity
            return cart.map((item) =>
                item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
            );
        }
    }
    throw new Error("This action type isn't supported.")

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
