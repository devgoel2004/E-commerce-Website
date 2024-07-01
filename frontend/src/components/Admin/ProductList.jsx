import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAdminProduct } from "../../actions/productActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SlideBar from "./SlideBar";
import Loader from "../Loader/Loader";
const ProductList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const { error, products } = useSelector((state) => state.products);
  if (isAuthenticated === false) {
    navigate("/login");
  }
  if (user.role !== "admin") {
    navigate("/login");
    alert.error("Not allowed to access this resource");
  }
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/products/${params.getValue(id, "id")}`}></Link>
          </>
        );
      },
    },
  ];
  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    if (user.role !== "admin") {
      navigate("/login");
      alert.error("Not allowed to access this resource");
    }
  }, [isAuthenticated, user, alert]);
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <MetaData title={"ALL PRODUCTS -- ADMIN"} />
          <div className="dashboard">
            <SlideBar></SlideBar>
            <div className="productListContainer">
              <h1 id="productListHeading">ALL PRODUCTS</h1>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
