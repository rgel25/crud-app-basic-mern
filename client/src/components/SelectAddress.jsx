import React from "react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

export default function SelectAddress({ selectAddressHandler }) {
  const [regionData, setRegion] = React.useState([]);
  const [provinceData, setProvince] = React.useState([]);
  const [cityData, setCity] = React.useState([]);
  const [barangayData, setBarangay] = React.useState([]);

  const [regionAddr, setRegionAddr] = React.useState("");
  const [provinceAddr, setProvinceAddr] = React.useState("");
  const [cityAddr, setCityAddr] = React.useState("");
  const [barangayAddr, setBarangayAddr] = React.useState("");

  const region = () => {
    regions().then((response) => {
      setRegion(response);
    });
  };

  const province = (e) => {
    setRegionAddr(e.target.selectedOptions[0].text);
    provinces(e.target.value).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const city = (e) => {
    setProvinceAddr(e.target.selectedOptions[0].text);
    cities(e.target.value).then((response) => {
      setCity(response);
    });
  };

  const barangay = (e) => {
    setCityAddr(e.target.selectedOptions[0].text);
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
  };

  const brgy = (e) => {
    setBarangayAddr(e.target.selectedOptions[0].text);
    selectAddressHandler(
      `${e.target.selectedOptions[0].text}, ${cityAddr}, ${provinceAddr}, ${regionAddr}`
    );
  };

  React.useEffect(() => {
    region();
  }, []);

  return (
    <>
      <select
        required
        className="form-select"
        onChange={province}
        onSelect={region}
        defaultValue={""}
      >
        <option disabled value="">
          Select Region
        </option>
        {regionData &&
          regionData.length > 0 &&
          regionData.map((item, i) => (
            <option key={i} value={item.region_code}>
              {item.region_name}
            </option>
          ))}
      </select>
      <br />
      <select
        required
        className="form-select"
        onChange={city}
        defaultValue={""}
      >
        <option disabled value="">
          Select Province
        </option>
        {provinceData &&
          provinceData.length > 0 &&
          provinceData.map((item, i) => (
            <option key={i} value={item.province_code}>
              {item.province_name}
            </option>
          ))}
      </select>
      <br />
      <select
        required
        className="form-select"
        onChange={barangay}
        defaultValue={""}
      >
        <option disabled value="">
          Select City
        </option>
        {cityData &&
          cityData.length > 0 &&
          cityData.map((item, i) => (
            <option key={i} value={item.city_code}>
              {item.city_name}
            </option>
          ))}
      </select>
      <br />
      <select
        required
        className="form-select"
        onChange={brgy}
        defaultValue={""}
      >
        <option disabled value="">
          Select Barangay
        </option>
        {barangayData &&
          barangayData.length > 0 &&
          barangayData.map((item, i) => (
            <option key={i} value={item.brgy_code}>
              {item.brgy_name}
            </option>
          ))}
      </select>
    </>
  );
}
