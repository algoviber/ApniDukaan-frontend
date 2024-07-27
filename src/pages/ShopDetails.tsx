import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { SkeletonLoader } from "../components/loader";
import ProductCard from "../components/product-card";
import { useShopProductsDetailsQuery } from "../redux/api/shopApi";
import { addToCart } from "../redux/reducer/cartReducer";
import { CustomError } from "../types/api-types";
import { CartItem } from "../types/types";

const ShopDetails = () => {

    const params = useParams();
    const id= params.id;

    const {data,isLoading,isError,error} = useShopProductsDetailsQuery(String(id));

    if(isError) toast.error((error as CustomError).data.message);

    const dispatch = useDispatch();

    const addToCartHandler=(cartItem: CartItem)=>{
      if(cartItem.stock < 1) return toast.error("Out of Stock");

      dispatch(addToCart(cartItem));

      toast.success("Added to Cart");
    }
    
  return (
    <div className="shop-info">

        <section>

            <img src={data?.shop.photo.url} alt="" />
        </section>

        <main>
        { isLoading?(<SkeletonLoader width="80vw"/>) :

            data?.products?.length?(
                data.products.map((i)=>(
                    <ProductCard 
                  key = {i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                  photo={i.photo.url}
                  />
                    )) 
            ) :  <div className="no-products">Sorry, No Product Found!!</div>
        }
        </main>
    </div>
  )
}

export default ShopDetails