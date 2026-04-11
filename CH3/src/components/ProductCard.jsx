import { useNavigate } from "react-router-dom";
import heartEmpty from "../assets/Heart.png";
import heartActive from "../assets/Heart_active.png";

function ProductCard({ product, onToggleLike }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/detail/${product.id}`);
    };

    const handleLikeClick = (e) => {
        e.stopPropagation();
        onToggleLike(product.id);
    };

    return (
        <div className="product-card" onClick={handleCardClick}>
            <div className="product-image-wrap">
                <img src={product.image} alt={product.name} className="product-image" />
            </div>

            <div className="product-info">
                <div className="product-top-row">
                    <div>
                        <div className="product-brand">{product.brand}</div>
                        <div className="product-name">{product.name}</div>
                    </div>

                    <button
                        type="button"
                        className="like-btn"
                        onClick={handleLikeClick}
                    >
                        <img
                            src={product.isLiked ? heartActive : heartEmpty}
                            alt="하트"
                            className="heart-icon"
                        />
                    </button>
                </div>

                <div className="product-price-row">
                    {product.discountRate ? (
                        <>
              <span className="product-discount">
                {product.discountRate}%
              </span>
                            <span className="product-price">
                {product.price.toLocaleString()}
              </span>
                        </>
                    ) : (
                        <span className="product-price">
              {product.price.toLocaleString()}
            </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;