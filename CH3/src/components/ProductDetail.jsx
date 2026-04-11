import ProductCard from "./ProductCard";

function ProductList({ products, onToggleLike }) {
    return (
        <section className="product-section">
            <h2 className="section-title">
                LOGO <span>인기 상품</span>
            </h2>

            <div className="product-list">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onToggleLike={onToggleLike}
                    />
                ))}
            </div>
        </section>
    );
}

export default ProductList;