import { useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail({ products }) {
    const { id } = useParams();
    const product = products.find((item) => item.id === Number(id));

    const [selectedSize, setSelectedSize] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    if (!product) {
        return <div className="detail-page">상품이 없습니다.</div>;
    }

    const handleSelectSize = (e) => {
        const size = e.target.value;
        setSelectedSize(size);

        if (!size) {
            setSelectedItem(null);
            return;
        }

        setSelectedItem({
            size,
            quantity: 1,
        });
    };

    const handleRemoveSelected = () => {
        setSelectedSize("");
        setSelectedItem(null);
    };

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

                    <div className="detail-size-box">
                        <select
                            className="detail-size-select"
                            value={selectedSize}
                            onChange={handleSelectSize}
                        >
                            <option value="">사이즈 선택</option>
                            {product.sizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedItem && (
                        <div className="selected-option-box">
                            <div className="selected-option-top">
                                <span>{selectedItem.size}</span>
                                <button type="button" onClick={handleRemoveSelected}>
                                    ×
                                </button>
                            </div>

                            <div className="selected-option-bottom">
                                <span>{selectedItem.quantity}</span>
                                <span>{product.price.toLocaleString()}원</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default ProductDetail;