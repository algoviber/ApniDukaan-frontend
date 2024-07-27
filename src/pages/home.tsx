import axios from "axios";
import { useState } from "react";
import useGeolocation from "react-hook-geolocation";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";
import { SkeletonLoader } from "../components/loader";
import ShopCard from "../components/shop-card";
import { useLatestShopsQuery, useSearchShopsQuery } from "../redux/api/shopApi";


// const Home = () => {

//   const {data: latestProductsData} = useLatestProductsQuery("");

//   const [location,setLocation] = useState<string>('');

//   const {data,isLoading,isError} = useSearchByAddressQuery(location);


//   //const geolocation = useGeolocation();

//   // const locationGetter=async ()=>{
//   //   if(!geolocation.error){
//   //   const lat = geolocation.latitude;
//   //   const long = geolocation.longitude;

//   //   console.log(lat);
//   //   console.log(long);

//   //   // const API_KEY = "AIzaSyC_Q-suEffJXdyiFVdftbUiTBmjYf1sgG8";

//   //   // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`;
//   //   // const res = await axios.get(url);
//   //   // if (res.data.status === 'OK') {
//   //   //   const address = res.data.results[0].formatted_address;
//   //   //   setLocation(address);
//   //   // } else {
//   //   //   console.error('Geocoder failed due to:', res.data.status);
//   //   // }

//   //   }
//   //   else{
//   //     toast.error(geolocation.error.message);
//   //   }

    
//   // }

  

//   const dispatch = useDispatch();

//     const addToCartHandler=(cartItem: CartItem)=>{
//       if(cartItem.stock < 1) return toast.error("Out of Stock");

//       dispatch(addToCart(cartItem));

//       toast.success("Added to Cart");
//     }

//   return (
//     <div className="home">

//         <section>

//         <div className="searching">
//           <FaLocationDot className="loc-icon"/>
//           <input type="text" className="locate" placeholder="Locate yourself" value={location}  onChange={(e)=>setLocation(e.target.value)}/>
//           <input type="text" className="search-shops" placeholder="Search for Shops near you."/>
          
//         </div>

//         </section>

//         <h1>Latest Products

//             <Link to={"/search"} className="findmore">More</Link>
//         </h1>

        
//         <main>
//             { isLoading?(<SkeletonLoader width="80vw"/>) :

//               isError?(
//                 latestProductsData?.products.map((i)=>(
//                   <ProductCard 
//                 key = {i._id}
//                 productId={i._id}
//                 name={i.name}
//                 price={i.price}
//                 stock={i.stock}
//                 handler={addToCartHandler}
//                 photo={i.photo.url}
//                 />
//                   ))
//               ) : 

//               data?.products.length?(
//                 data.products.map((i)=>(
//                 <ProductCard 
//               key = {i._id}
//               productId={i._id}
//               name={i.name}
//               price={i.price}
//               stock={i.stock}
//               handler={addToCartHandler}
//               photo={i.photo.url}
//               />
//                 )) 
//               ) :  <div className="no-shops">Sorry, No Shop Found!!</div>
            
              
//             }
            
//         </main>

//     </div>
//   )
// }



const Home = () => {

  const [location,setLocation] = useState<string>('');

    const [search,setSearch] = useState<string>('');

    const {data: latestShopsData} = useLatestShopsQuery("");
    const [page,setPage] = useState(1);

    const isNextPage = page < 4;
    const isPrevPage = page > 1;

  const geolocation = useGeolocation();

  const locationGetter=async ()=>{
    if(!geolocation.error){
    const lat = geolocation.latitude;
    const long = geolocation.longitude;

    console.log(lat);
    console.log(long);

    const API_KEY = import.meta.env.VITE_GEOCODER_API_KEY;

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${long}&key=${API_KEY}`;
    const res = await axios.get(url);
    
    if (res.status === 200) {
       const address = res.data.results[0].components.city;
       setLocation(address);
    } else {
      console.error('Geocoder failed due to:', res.data.status);
    }

  }
    else{
      toast.error(geolocation.error.message);
    }

    
  }

    

  const {data,isLoading,isError} = useSearchShopsQuery({deliveryAddress:location,search,page});


  return (
        <div className="home" >
    
            <section>
    
            <div className="searching">
              <FaLocationDot className="loc-icon" onClick={locationGetter}/>
              <input type="text" className="locate" placeholder="Locate yourself" value={location} onClick={locationGetter} onChange={(e)=>setLocation(e.target.value)}/>
              <input type="text" className="search-shops" placeholder="Search for Shops near you." value={search} onChange={(e)=>setSearch(e.target.value)}/>
              
            </div>
    
            </section>

            <main>
              { isLoading?(<SkeletonLoader width="80vw"/>) :

                isError?(
                  latestShopsData?.shops.map((i)=>(
                    <ShopCard 
                  key = {i._id}
                  _shopId={i._id}
                  name={i.name}
                  photo={i.photo.url}
                  category={i.category}
                  />
                    ))
                ) : 
                    
                data?.shops.length?(
                  
                  data.shops.map((i)=>(
                  <ShopCard 
                  key = {i._id}
                  _shopId={i._id}
                  name={i.name}
                  photo={i.photo.url}
                  category={i.category}
                />
                  ))
                  
                
                ) :  <div className="no-shops">Sorry, No Shop Found!!</div>  
              }

              

            </main>

            {
              data && data.totalPage > 1 && (
                <article>
              <button disabled={!isPrevPage} onClick={()=>setPage(prev=>prev-1)}>Prev</button>
              <span>
                {page} of {data.totalPage}
              </span>
              <button disabled={!isNextPage} onClick={()=>setPage(prev=>prev+1)}>Next</button>
            </article>
              )
            }

            </div>
          )
}

export default Home;