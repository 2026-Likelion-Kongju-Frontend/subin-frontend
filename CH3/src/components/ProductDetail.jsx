import { useParams } from "react-router-dom";

function ProductDetail({ products }) {
    const { id } = useParams();
    const product = products.find((item) => item.id === Number(id));

    if (!product) {
        return <div className="detail-page">상품이 없습니다.</div>;
    }

    return (
        <main className="detail-page">
            <div className="detail-inner">
                <div className="detail-left">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="detail-main-image"
                    />
                </div>

                <div className="detail-right">
                    <p className="detail-brand">{product.brand}</p>
                    <h2 className="detail-name">{product.name}</h2>
                    <p className="detail-price">{product.price.toLocaleString()}원</p>
                </div>
            </div>
        </main>
    );
}

export default ProductDetail;