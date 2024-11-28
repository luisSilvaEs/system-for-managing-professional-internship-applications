import "./confirm-modal.css";
import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  jsonData: { [key: string]: any }; // JSON data to display in the modal
}

const formatKey = (key: string): string => {
  return key
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
    .replace(/_/g, " "); // Replace underscores with spaces
};

const renderJsonData = (data: { [key: string]: any }) => {
  return (
    <div className="json-data">
      {Object.entries(data).map(([key, value]) => (
        <div className="json-item" key={key}>
          <label className="json-key">{formatKey(key)}:</label>
          <div className="json-value">{JSON.stringify(value, null, 2)}</div>
        </div>
      ))}
    </div>
  );
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  jsonData,
}) => {
  if (!isOpen) return null; // Do not render modal if not open

  return (
    <>
      {/* Modal Background Layer */}
      <div className="modal-overlay" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="modal-content">
        <h3>Confirm Your Action</h3>

        <div className="modal-body">
          {/* Render JSON data inside the modal */}
          {renderJsonData(jsonData)}
        </div>

        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
