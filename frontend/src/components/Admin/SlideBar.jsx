import React from "react";
import "./SlideBar.css";
import logo from "./../../images/ecommerce.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
const SlideBar = () => {
  return (
    <div className="sidebar">
      <Link to="/shopfusion/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}>
          <TreeItem nodeId="1" label="Products">
            <Link to="/shopfusion/admin/products">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<PostAddIcon />}></TreeItem>
            </Link>
            <Link to="/shopfusion/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />}></TreeItem>
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/shopfusion/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/shopfusion/admin/users">
        <p>
          <PeopleIcon />
          Users
        </p>
      </Link>
      <Link to="/shopfusion/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default SlideBar;
