import axios from "axios";
import React from "react";
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

export default function EditForm({ entry, editEntryHandler }) {
  // FORM VALIDATION
  React.useEffect(() => {
    initializeValidation();
  }, []);

  const [editFormData, setEditFormData] = React.useState({
    field1: entry.field1,
    field2: entry.field2,
  });
  const [selectAddress, setSelectAddress] = React.useState("");

  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevEditFormData) => ({
      ...prevEditFormData,
      [name]: value,
    }));
  };

  const formSubmitHandler = (id) => {
    const entry = {
      field1: editFormData.field1,
      field2: `${editFormData.field2}, ${selectAddress}`,
    };
    // PATCH
    axios.put(`/api/entries/${id}/edit`, entry);
    // SET STATE IN APP
    // CLEANUP
    editEntryHandler(id, entry);
    const forms = document.querySelectorAll(".needs-validation");
    Array.from(forms).forEach((form) => {
      form.classList.remove("was-validated");
    });
    const selectFields = document.querySelectorAll("select");
    // selectFields.forEach((field) => (field.value = ""));
    initializeValidation();
    console.log(id);
    const modal = document.getElementById(`modal-${id}`);
    modal.classList.remove("show");
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.classList.remove("modal-backdrop"));
  };

  const selectAddressHandler = (selectAddress) => {
    setSelectAddress(selectAddress);
  };
  return (
    <>
      <div className="modal-body">
        <form
          noValidate
          className="needs-validation"
          onSubmit={(e) => {
            e.preventDefault();
            formSubmitHandler(entry._id);
          }}
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
              value={editFormData.field1}
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
              value={editFormData.field2.split(", ")[0]}
              onChange={formChangeHandler}
            />
          </div>
          <div className="container-fluid p-0 mb-3">
            <SelectAddress selectAddressHandler={selectAddressHandler} />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
