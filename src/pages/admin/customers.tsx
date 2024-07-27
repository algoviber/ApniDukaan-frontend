import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { SkeletonLoader } from "../../components/loader";
import { useAllUsersQuery } from "../../redux/api/userAPI";
import { CustomError } from "../../types/api-types";
import { UserReducerInitialState } from "../../types/reducer-types";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
];

const Customers = () => {

  const {user} = useSelector(
    (state:{userReducer:UserReducerInitialState}) => 
      state.userReducer
    );

  const {data,isError,isLoading,error} = useAllUsersQuery(user?._id!);

  //const [deleteUser] = useDeleteUserMutation();

  const [rows, setRows] = useState<DataType[]>([]);

  // const deleteHandler = async(userId: string) => {
  //   const res = await deleteUser({userId,adminUserId: user?._id!});
  //   responseToast(res,null,"");
  // }

  if(isError) toast.error((error as CustomError).data.message);

  useEffect(()=>{
    if(data) setRows(data.users.map((i)=>({
      avatar: <img style={{borderRadius: "50%",}} src={i.photo} alt={i.name}></img>,
      name: i.name,
      email: i.email,
      gender: i.gender,
      role: i.role,
    }))
    );
  }, [data])

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading? <SkeletonLoader /> : Table}</main>
    </div>
  );
};

export default Customers;
