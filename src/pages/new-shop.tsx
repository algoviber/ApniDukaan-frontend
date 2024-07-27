import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../types/reducer-types";
import { useNewShopMutation } from "../redux/api/shopApi";
import { useNavigate } from "react-router-dom";
import { responseToast } from "../utils/features";

const NewShop = () => {
    const {user} = useSelector((state:{userReducer: UserReducerInitialState})=> state.userReducer);


    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [photoPrev, setPhotoPrev] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [photo, setPhoto] = useState<File>();
  
    const [newShop] = useNewShopMutation();
    const navigate = useNavigate();
  
    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const file: File | undefined = e.target.files?.[0];
  
      const reader: FileReader = new FileReader();
  
      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setPhotoPrev(reader.result);
            setPhoto(file);
          }
        };
      }
    };
  
    const submitHandler = async (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
  
      if(!name || !photo || !category || !address) return;
  
      const formData = new FormData();
      formData.set("name",name);
      formData.set("photo",photo);
      formData.set("category",category);
      formData.set("deliveryAddress",address);
  
      const res = await newShop({id:user?._id!, formData});
  
      responseToast(res,navigate,"/admin/product");
    }
  
    return (
      <div>
        <main className="product-management">
          <article>
            <form onSubmit={submitHandler}>
              <h2>New Shop</h2>
              <div>
                <label>Name</label>
                <input
                  required
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
  
              <div>
                <label>Category</label>
                <input
                  required
                  type="text"
                  placeholder="ex. Fashion, Grocery etc"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
  
              <div>
                <label>Photo</label>
                <input required type="file" onChange={changeImageHandler} />
              </div>
  
              <div>
                <label>City</label>
                <input
                  required
                  type="text"
                  placeholder="City"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
  
              {photoPrev && <img src={photoPrev} alt="New Image" />}
              <button type="submit">Create</button>
            </form>
          </article>
        </main>
      </div>
    );
}

export default NewShop