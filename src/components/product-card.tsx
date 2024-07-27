import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAllReviewsQuery } from "../redux/api/reviewApi";
import { CartItem } from "../types/types";

type ProductProps={
  productId: string,
  photo:string,
  name: string,
  price: number,
  stock: number,
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}:ProductProps) => {

  const {data} = useAllReviewsQuery(String(productId));

  let avgRate = 0;

  if (data && data.reviews.length > 0) {
    const totalRating = data.reviews.reduce((acc, review) => acc + review.rating, 0);
    const numReviews = data.reviews.length;
    avgRate = totalRating / numReviews;
  }

  return (
    <Link to={`/product/${productId}`} className="product-card">

      <img src={photo} alt={name} loading="lazy"/>
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
      <Link to={"/cart"} className="add-to-cart">
        <button onClick={()=>handler({productId,photo,name,price,stock,quantity:1})}>
          <FaPlus />
        </button>
      </Link>
      </div>


    </Link>
  )
}

export default ProductCard