import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import useFarmers from "../../Hooks/useFarmers";
import { Link } from "react-router-dom";
import useTransportPermit from "../../Hooks/useTransportPermit";
//import getTransportPermit from "../../Hooks/useTransportPermit";

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;
  const [farmers, setFarmers] = useFarmers();
  const [transportPermits, setTransportPermit] = useTransportPermit();

  switch (type) {
    case "stock":
      data = {
        title: "STOCK",
        isMoney: false,
        link: "View all products",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
      case "users":
        data = {
          title: "USERS",
          isMoney: false,
          link: <Link to="all-user">See all users</Link>, // Add an anchor tag with the link
          icon: (
            <PersonOutlinedIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
          counterValue: farmers.length,
        };
        break;
      
    default:
      data = {
        title: "WIDGET",
        isMoney: false,
        link: "",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 255, 0, 0.2)",
            }}
          />
        ),
      };
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {/* Use the counterValue property when available */}
          {data.isMoney && "$"} {data.counterValue || amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
