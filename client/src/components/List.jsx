import React from "react";
import EditForm from "./EditForm";
import axios from "axios";
export default function List({
  entries,
  editEntryHandler,
  deleteEntryHandler,
}) {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      // DELETE QUERY
      axios.delete(`/api/entries/${id}`);
      // DELETE FRONT END
      deleteEntryHandler(id);
    }
  };
  return (
    <div className="list-group">
      {entries.length > 0 ? (
        entries.map((entry, i) => (
          <div className="list-group-item" key={i}>
            <div className="row">
              <div className="col-10">
                <p className="m-0">{entry.field1}</p>
                <p className="m-0">{entry.field2}</p>
              </div>
              <div className="col-2">
                <div className="row">
                  <div className="col d-grid">
                    <button
                      className="btn btn-success btn-sm mb-1"
                      data-bs-toggle="modal"
                      data-bs-target={`#modal-${entry._id}`}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col d-grid">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        deleteHandler(entry._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* MODAL */}
            <div
              className="modal fade"
              id={`modal-${entry._id}`}
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      {`Edit Entry #${i + 1}`}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <EditForm entry={entry} editEntryHandler={editEntryHandler} />
                </div>
              </div>
            </div>
            {/* END OF MODAL */}
          </div>
        ))
      ) : (
        <div className="list-group-item">No entries yet...</div>
      )}
    </div>
  );
}
