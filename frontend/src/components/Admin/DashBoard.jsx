import React, { useEffect } from "react";
import "./DashBoard.css";
import SlideBar from "./SlideBar";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/Header/MetaData";
import Loader from "../Loader/Loader";
import { clearErrors, getAdminProduct } from "../../actions/productActions";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
const DashBoard = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { products, error } = useSelector((state) => state.products);
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out Of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#680084"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAdminProduct());
  }, [alert, error, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <MetaData title={`${user && user.name}'s Dashboard`} />
            <SlideBar />
            <div className="dashboardContainer">
              <Typography component={"h1"}>Dashboard</Typography>
              <div className="dashboardSummary">
                <div>
                  <p>
                    Total Amount <br /> $20000
                  </p>
                </div>
                <div className="dashboardSummaryBox2">
                  <Link to="/shopfusion/admin/products">
                    <p>Product</p>
                    <p>{products && products.length}</p>
                  </Link>
                  <Link to="/shopfusion/admin/orders">
                    <p>Orders</p>
                    <p>4</p>
                  </Link>
                  <Link to="/shopfusion/admin/users">
                    <p>Users</p>
                    <p>2</p>
                  </Link>
                </div>
              </div>
              <div className="lineChart">
                <Line data={lineState}></Line>
              </div>
              <div className="doughnutChart">
                <Doughnut data={doughnutState} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashBoard;
