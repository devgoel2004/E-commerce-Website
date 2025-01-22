import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/Header/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SlideBar from "./SlideBar";
import Loader from "../Loader/Loader";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { products, error } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const addNewProduct = () => {
    navigate(`/shopfusion/admin/create-product`);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product Delete Successfully");
      navigate("/shopfusion/admin/dashboard");
      dispatch({
        type: DELETE_PRODUCT_RESET,
      });
    }
    if (!isAuthenticated) {
      alert.error("User not logged in");
      navigate("/shopfusion/login");
    }
    dispatch(getAdminProduct());
  }, [
    error,
    alert,
    dispatch,
    navigate,
    deleteError,
    isDeleted,
    isAuthenticated,
  ]);

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
          <Fragment>
            <Link to={`/shopfusion/admin/product/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteProductHandler(params.id, "id")}>
              <DeleteIcon />
            </Button>
          </Fragment>
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"ALL PRODUCTS -- ADMIN"} />
          <div className="dashboard">
            <SlideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL PRODUCTS</h1>
              {rows.length > 0 && (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTable"
                  autoHeight
                />
              )}
            </div>
            <div>
              <button onClick={addNewProduct}>Add New Product</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
