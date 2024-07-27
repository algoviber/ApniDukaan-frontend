import { FaRegStar, FaStar } from "react-icons/fa";

type StarProp={
    count: number;
    isColor: boolean;
    onStarClick?: (star: number) => void;
}

export const Stars = ({count,isColor,onStarClick}: StarProp)=>{

    return (
      !isColor ?
      <div>
        {Array.from({ length: count }, (_, index) => (
          <FaRegStar key={index} className="regular-star" onClick={()=> onStarClick && onStarClick(index)}/>
        ))}
      </div>

      :

      <div>
        {Array.from({ length: count }, (_, index) => (
          <FaStar key={index} className="star" onClick={()=> onStarClick && onStarClick(index)}/>
        ))}
      </div>
    )
};