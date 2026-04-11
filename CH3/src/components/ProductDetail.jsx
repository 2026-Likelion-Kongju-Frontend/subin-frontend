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

    const handleIncrease = () => {
        if (!selectedItem || selectedItem.quantity >= 9) return;

        setSelectedItem((prev) => ({
            ...prev,
            quantity: prev.quantity + 1,
        }));
    };

    const handleDecrease = () => {
        if (!selectedItem || selectedItem.quantity <= 1) return;

        setSelectedItem((prev) => ({
            ...prev,
            quantity: prev.quantity - 1,
        }));
    };

    const totalPrice = selectedItem
        ? product.price * selectedItem.quantity
        : 0;

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
                            {(product.sizes || []).map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedItem && (
                        <>
                            <div className="selected-option-box">
                                <div className="selected-option-top">
                                    <span>{selectedItem.size}</span>
                                    <button type="button" onClick={handleRemoveSelected}>
                                        ×
                                    </button>
                                </div>

                                <div className="selected-option-bottom">
                                    <div className="quantity-box">
                                        <button
                                            type="button"
                                            className="qty-btn"
                                            onClick={handleDecrease}
                                            disabled={selectedItem.quantity === 1}
                                        >
                                            -
                                        </button>

                                        <span className="qty-value">{selectedItem.quantity}</span>

                                        <button
                                            type="button"
                                            className="qty-btn"
                                            onClick={handleIncrease}
                                            disabled={selectedItem.quantity === 9}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <span>{totalPrice.toLocaleString()}원</span>
                                </div>
                            </div>

                            <div className="total-price-box">
                <span className="total-count">
                  총 {selectedItem.quantity}개
                </span>
                                <span className="total-price-text">
                  {totalPrice.toLocaleString()}원
                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}

export default ProductDetail;