import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import ReviewCard from "../components/review-card";
import { Stars } from "../components/stars";
import { useProductDetailsQuery } from "../redux/api/productAPI";
import { useAllReviewsQuery, useNewReviewMutation } from "../redux/api/reviewApi";
import { addToCart } from "../redux/reducer/cartReducer";
import { CustomError } from "../types/api-types";
import { UserReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";


const ProductDetails = () => {
    const params = useParams();
    const id= params.id;

    const {data,isError,error} = useProductDetailsQuery(String(id));

    if(isError) toast.error((error as CustomError).data.message);

    const dispatch = useDispatch();

    const addToCartHandler=(cartItem: CartItem)=>{
      if(cartItem.stock < 1) return toast.error("Out of Stock");

      dispatch(addToCart(cartItem));

      toast.success("Added to Cart");
    }

    const productId = String(data?.product._id);
    const photo = String(data?.product.photo.url);
    const name = String(data?.product.name);
    const stock = Number(data?.product.stock);
    const price = Number(data?.product.price);

    const [isOpen,setIsopen] = useState(false);

    const [review,setReview] = useState("");
    const [rating,setRating] = useState(0);
    const [count,setCount] = useState(5);
    const [form,setForm] = useState("");

    const [color,setColor] = useState(false);

    const {user} = useSelector((state:{userReducer: UserReducerInitialState})=> state.userReducer);
    const [newReview] = useNewReviewMutation();


    useEffect(() => {
        const socket = io(import.meta.env.VITE_SERVER);

        socket.on("newReview", (review) => {
          setReview(review);
        });
        return () => {
            socket.disconnect();
        };
      }, []);

    

    const handleSubmit= async(e: any)=>{
        e.preventDefault();     
        const socket = io(import.meta.env.VITE_SERVER);
        socket.emit('submitReview', form);
        
        const res = await newReview({userId: user?._id!, productId, reviewText: form, rating });

        if("data" in res && res.data.success)
        toast.success("Thanks for the Review");

        setForm("");
        setCount(0);
    }

    let avgRate = 0;
    const {data: reviewData} = useAllReviewsQuery(String(id));
    
    if (reviewData && reviewData.reviews.length > 0) {
        const totalRating = reviewData.reviews.reduce((acc, review) => acc + review.rating, 0);
        const numReviews = reviewData.reviews.length;

        if(review.length)
            avgRate = Math.ceil( (totalRating+rating) / (numReviews+1) );
        else
        avgRate = Math.ceil( (totalRating) / (numReviews) );
    }

    const handleStarClick = (star: number) => {
        setRating(star+1);
        setCount(star+1);
        setColor(true);
    };

    const handleWhiteStarClick = (star: number) => {
        setRating(rating+star+1);
        setCount(rating+star+1);
    };

  return (
    <div className="product-info">
        <aside>

            <section>
            <img src={data?.product.photo.url} alt="" loading="lazy"/>
            </section>

            <div>
                <p>{name}</p>
                <span>₹{price}</span>
                <Stars count={avgRate} isColor={true} />
            </div>

            <button onClick={()=>addToCartHandler({productId,name,stock,photo,price,quantity:1})}> Add to Cart</button>

        </aside>

        <main>
            <h1>Description</h1>
            <div>
                {data?.product.description}
            </div>

            <h1>Reviews</h1>
            <div>
                {
                    review &&

                    <ReviewCard 
                    key = {user?._id!}
                    userId={user?._id!}
                    reviewText={review}
                    rating={rating}
                    />
                }
                {
                    reviewData?.reviews.length || review ? (
                        reviewData?.reviews.map((i)=>(
                        <ReviewCard 
                        key = {i._id}
                        userId={i.userId}
                        reviewText={i.reviewText}
                        rating={i.rating}
                        />
                    )) 
                    ) : <div className="no-reviews">No Reviews Yet!!</div>
                }
            </div>

            <div className="add-review">
                <button onClick={()=>setIsopen(!isOpen)}>Write a review?</button>
                {isOpen && 

                <div>
                    <h2>Rate Out of 5</h2>

                    <div className="rate">
                    <Stars count={count} isColor={color} onStarClick={handleStarClick}/>
                    <Stars count={5-count} isColor={false} onStarClick={handleWhiteStarClick} />
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <textarea value={form} onChange={(e)=>setForm(e.target.value)} />
                        <button>Submit</button>
                    </form>
                </div>
                }
            </div>  
        </main>

        
    </div>
  )
}

export default ProductDetails