import React, { useEffect, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/Header/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import PublicIcon from "@material-ui/icons/Public";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckOutSteps from "./CheckOutSteps";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digit");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (
    <>
      <MetaData title="Shipping Details" />
      <CheckOutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}>
            <div>
              <HomeIcon />
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon></LocationCityIcon>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="text"
                name="pinCode"
                id="pinCode"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                name="Phone Number"
                id="phoneNo"
                placeholder="phoneNo"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size={"10"}
              />
            </div>
            <div>
              <PublicIcon />
              <select
                name="country"
                id="country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}>
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  name="state"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}>
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
