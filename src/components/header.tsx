import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType{
    user: User | null;
}

const Header = ({user}:PropsType) => {

const [isOpen,setIsOpen] = useState<boolean>(false);
const logoutHandler = async()=>{
    try {
        await signOut(auth);
        toast.success("Sign Out Successfully!!");
        setIsOpen(false);
    } catch (error) {
        toast.error("Sign Out Failed!!");
    }
};

  return (
    <nav className="header">
        <Link onClick={()=>setIsOpen(false)} to={"/"}>HOME</Link>
        <Link onClick={()=>setIsOpen(false)} to={"/search"}>
            <FaSearch />
        </Link>
        <Link onClick={()=>setIsOpen(false)} to={"/cart"}>
            <FaShoppingBag />
        </Link>

    {
        user?._id?(
            <>
            <button onClick={()=>setIsOpen((prev)=> !prev)}>
            <img src={user.photo} alt="" />
            </button>
            <dialog open={isOpen}>
                <div>
                    {
                        user.role==="admin" ? (
                            <Link onClick={()=>setIsOpen(false)} to={"/admin/dashboard"}>Admin</Link>
                        ) :

                        (
                            <Link onClick={()=>setIsOpen(false)} to={"/shop/new"}>Add Shop</Link>
                        )
                    }

                    <Link onClick={()=>setIsOpen(false)} to={"/orders"}>Orders</Link>
                    <Link onClick={()=>setIsOpen(false)} to={"/chat"}>Chat</Link>
                    <button onClick={logoutHandler}>
                        <FaSignOutAlt />
                    </button>
                </div>
            </dialog>
            </>
        ): <Link onClick={()=>setIsOpen(false)} to={"/login"}>
        <FaSignInAlt />
    </Link>
    }
    </nav>
  )
}

export default Header;