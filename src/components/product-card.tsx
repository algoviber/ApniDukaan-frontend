import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
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
