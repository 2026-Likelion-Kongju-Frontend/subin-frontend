import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import ProductList from "./Components/ProductList";
import ProductDetail from "./Components/ProductDetail";
import { products as initialProducts } from "./data";

function HomePage({ products, onToggleLike }) {
    return (
        <>
            <Header />
            <main className="main">
                <ProductList products={products} onToggleLike={onToggleLike} />
            </main>
        </>
    );
}

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
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomePage
                                products={products}
                                onToggleLike={handleToggleLike}
                            />
                        }
                    />
                    <Route
                        path="/detail/:id"
                        element={
                            <>
                                <Header />
                                <ProductDetail products={products} />
                            </>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;