import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import ProductList from "./Components/ProductList";
import { products as initialProducts } from "./data";

function App() {
    const [products, setProducts] = useState(initialProducts);

    const handleToggleLike = (id) => {
        setProducts((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isLiked: !item.isLiked } : item
            )
        );
    };

    return (
        <div className="app">
            <Header />
            <main className="main">
                <ProductList products={products} onToggleLike={handleToggleLike} />
            </main>
        </div>
    );
}

export default App;