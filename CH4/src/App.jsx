import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import { apiRequest } from "./api/client";

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
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await apiRequest("/products");
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchProducts();
    }, []);

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
                                <ProductDetail onToggleLike={handleToggleLike} />
                            </>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;