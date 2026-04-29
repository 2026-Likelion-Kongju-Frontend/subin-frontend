import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import heartEmpty from "../assets/Heart.png";
import heartActive from "../assets/Heart_active.png";
import starIcon from "../assets/star.svg";
import { apiRequest, getImageUrl } from "../api/client";

function ProductDetail({ onToggleLike }) {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                const res = await apiRequest(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                setError("상품 정보를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    const [selectedSize, setSelectedSize] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    if (loading) return <div className="detail-page">로딩중...</div>;
    if (error) return <div className="detail-page">{error}</div>;
    if (!product) return null;

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

    const handleAddCart = async () => {
        if (!selectedItem) {
            alert("사이즈를 선택해 주세요.");
            return;
        }

        try {
            await apiRequest("/cart/items", {
                method: "POST",
                body: JSON.stringify({
                    productId: product.id,
                    size: selectedItem.size,
                    quantity: selectedItem.quantity,
                }),
            });

            alert("장바구니에 담겼습니다.");
        } catch (err) {
            console.error(err);
            alert("장바구니 담기에 실패했습니다.");
        }
    };

    return (
        <main className="detail-page">
            <div className="detail-container">
                <section className="detail-left-panel">
                    <div className="detail-main-image-wrap">
                        <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            className="detail-main-image"
                        />
                    </div>

                    <div className="detail-info-table">
                        <div className="detail-info-row">
                            <span className="detail-info-label">품번</span>
                            <span className="detail-info-value">000-000-000</span>
                        </div>
                        <div className="detail-info-row">
                            <span className="detail-info-label">성별</span>
                            <span className="detail-info-value">여</span>
                        </div>
                        <div className="detail-info-row">
                            <span className="detail-info-label">시즌</span>
                            <span className="detail-info-value">2026</span>
                        </div>
                        <div className="detail-info-row">
                            <span className="detail-info-label">누적 판매</span>
                            <span className="detail-info-value">1.3천 개 이상</span>
                        </div>
                    </div>

                    <div className="detail-tab-menu">
                        <span className="detail-tab active">정보</span>
                        <span className="detail-tab">사이즈</span>
                        <span className="detail-tab">리뷰</span>
                        <span className="detail-tab">문의</span>
                    </div>

                    <div className="detail-description-image-wrap">
                        <img
                            src={getImageUrl(product.descriptionImage)}
                            alt={`${product.name} 상세`}
                            className="detail-description-image"
                        />
                    </div>
                </section>

                <section className="detail-right-panel">
                    <p className="detail-brand">{product.brand}</p>
                    <p className="detail-category">상의 &gt; 여성상의</p>

                    <h2 className="detail-name">{product.name}</h2>

                    <div className="detail-tag-row">
                        <span className="detail-tag">여성인기</span>
                        <span className="detail-tag">무료배송</span>
                        <span className="detail-tag">LOGO단독</span>
                    </div>

                    <div className="detail-rating-row">
                        <img src={starIcon} alt="별점" className="rating-star-icon" />
                        <span className="rating-score">4.8</span>
                        <span className="rating-review">후기 73개</span>
                    </div>

                    <div className="detail-price-heart-row">
                        <div>
                            <p className="detail-original-price">
                                {product.originalPrice.toLocaleString()}
                            </p>

                            <div className="detail-sale-row">
                                {product.discountRate > 0 && (
                                    <span className="detail-discount-rate">
                                        {product.discountRate}%
                                    </span>
                                )}
                                <span className="detail-sale-price">
                                    {product.price.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="detail-heart-btn"
                            onClick={() => onToggleLike(product.id)}
                        >
                            <img
                                src={product.isLiked ? heartActive : heartEmpty}
                                alt="좋아요"
                                className="detail-heart-icon"
                            />
                        </button>
                    </div>

                    <div className="detail-size-select-wrap">
                        <select
                            className="detail-size-select"
                            value={selectedSize}
                            onChange={handleSelectSize}
                        >
                            <option value="">사이즈</option>
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
                                    <span className="selected-size">{selectedItem.size}</span>
                                    <button
                                        type="button"
                                        className="selected-remove-btn"
                                        onClick={handleRemoveSelected}
                                    >
                                        ×
                                    </button>
                                </div>

                                <p className="selected-delivery-text">03.26 (목) 도착 예정</p>

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

                                    <span className="selected-price">
                                        {totalPrice.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="total-price-box">
                                <span className="total-count">총 {selectedItem.quantity}개</span>
                                <span className="total-price-text">
                                    {totalPrice.toLocaleString()}
                                </span>
                            </div>
                        </>
                    )}

                    <div className="detail-button-row">
                        <button
                            type="button"
                            className="cart-btn"
                            onClick={handleAddCart}
                        >
                            장바구니
                        </button>
                        <button type="button" className="buy-btn">
                            구매하기
                        </button>
                    </div>

                    <div className="detail-notice-box">
                        <p className="notice-title">LOGO 회원은 전 품목 무료배송</p>
                        <p className="notice-sub">(일부 상품 및 도서 산간 지역 제외)</p>
                    </div>

                    <div className="detail-delivery-box">
                        <p>03.26 (목) 도착 예정</p>
                        <p>결제 3일 이내 배송 예정</p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default ProductDetail;