import React from "react";
import axios from "axios";
import SelectAddress from "./SelectAddress";

const initializeValidation = () => {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
};

export default function Form({ addEntryHandler }) {
  // FORM VALIDATION
  React.useEffect(() => {
    initializeValidation();
  }, []);

  // TEMP DATA FROM FRONT END
  //   const [data, setData] = React.useState([]);
  //   FORM DATA STATE
  const [formData, setFormData] = React.useState({
    field1: "",
    field2: "",
  });
  const [selectAddress, setSelectAddress] = React.useState("");

  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const entry = {
      field1: formData.field1,
      field2: `${formData.field2}, ${selectAddress}`,
    };
    // console.log(entry);
    axios.post("/api/entries", entry);
    addEntryHandler(entry);
    setFormData({ field1: "", field2: "" });
    const forms = document.querySelectorAll(".needs-validation");
    Array.from(forms).forEach((form) => {
      form.classList.remove("was-validated");
    });
    const selectFields = document.querySelectorAll("select");
    selectFields.forEach((field) => (field.value = ""));
    initializeValidation();
  };

  const selectAddressHandler = (selectAddress) => {
    setSelectAddress(selectAddress);
  };

  return (
    <div>
      <form
        noValidate
        className="needs-validation"
        onSubmit={formSubmitHandler}
      >
        <div className="mb-3">
          <label htmlFor="field1" className="form-label">
            Unit (Brand and Model)
          </label>
          <input
            type="text"
            className="form-control"
            id="field1"
            required
            name="field1"
            value={formData.field1}
            onChange={formChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="field2" className="form-label">
            Address (Street Number & Street)
          </label>
          <input
            type="text"
            className="form-control"
            id="field2"
            required
            name="field2"
            value={formData.field2}
            onChange={formChangeHandler}
          />
        </div>
        <div className="container-fluid p-0 mb-3">
          <SelectAddress selectAddressHandler={selectAddressHandler} />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
