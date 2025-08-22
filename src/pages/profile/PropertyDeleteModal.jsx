function PropertyDeleteModal({ property, onConfirm }) {
  return (
    <div>
      {/* single modal */}
      <div className="modal fade" id="deleteModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete listing?</h5>
              <button className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              Are you sure you want to delete
              <strong> {property?.title}</strong>?
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={onConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDeleteModal;
