import { Link } from "react-router-dom";
import { useShopProductsDetailsQuery } from "../redux/api/shopApi";
import { Stars } from "./stars";

type ShopProps={
  _shopId: string,
  photo:string,
  name: string,
  category: string;
};

const ShopCard = ({
  _shopId,
  photo,
  name,
  category,
}:ShopProps) => {

  const {data} = useShopProductsDetailsQuery(_shopId);

  let avgRate = 0;

  if (data && data.products.length > 0) {
    const totalRating = data.products.reduce((acc, product) => acc + product.rating, 0);
    const numProducts = data.products.length;
    avgRate = Math.ceil(totalRating / numProducts);
  }

  return (
    <Link to={`/shop/${_shopId}`} className="shop-card">

      <img src={photo} alt={name} loading="lazy"/>
      <div>
      <span>{name}</span>
      <div className="rating"><Stars count={avgRate} isColor={true}/></div>
      
      </div>
      <div>{category}</div>

    </Link>
  )
}

export default ShopCard