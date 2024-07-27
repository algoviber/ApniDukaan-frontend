import { useGetUserQuery } from "../redux/api/userAPI";
import { Stars } from "./stars";

type ReviewProps={
  userId: string,
  reviewText: string,
  rating: number,
};

const ReviewCard = ({
  userId,
  reviewText,
  rating,
}: ReviewProps) => {

    const {data} =  useGetUserQuery(userId);

  return (
    <div className="review-card">
      <div className="userInfo">
        
        
        <img src={data?.user.photo} alt={userId} loading="lazy"/>
        
        
        <span>{data?.user.name}</span>
      </div>

      <Stars count={rating} isColor={true}/>
      <p>{reviewText}</p>
    </div>
  )
}

export default ReviewCard;