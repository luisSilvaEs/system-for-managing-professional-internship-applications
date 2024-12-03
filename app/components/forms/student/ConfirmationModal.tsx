import React from "react";
import "./confirm-modal.css";

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

const formatValue = (value: any): string => {
  if (typeof value === "string") {
    return value.trim() === "" ? "" : value; // Remove empty string values
  }
  if (Array.isArray(value) || typeof value === "object") {
    return JSON.stringify(value, null, 2); // Handle objects or arrays
  }
  return value ? String(value) : ""; // Convert to string if value exists
};

const renderJsonData = (data: { [key: string]: any }) => {
  return (
    <div className="json-data">
      {Object.entries(data).map(([key, value]) => {
        const formattedValue = formatValue(value);

        // Only render non-empty values
        if (formattedValue === "") return null;

        return (
          <div className="json-item" key={key}>
            <label className="json-key">{formatKey(key)}:</label>
            <div className="json-value">{formattedValue}</div>
          </div>
        );
      })}
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
        <h3>Confirmación de Datos</h3>

        {/* Message Above Data */}
        <div className="confirmation-message">
          <p>
            Confirma que la información que estás a punto de enviar es correcta.
            <br />
            Para hacer alguna corrección, da clic en <strong>Modificar</strong>.
            <br />
            Una vez confirmes la información, no habrá cambios ni
            modificaciones, solo podrás hacerlo directamente con el personal de
            la subdirección académica.
          </p>
        </div>

        <div className="modal-body">
          {/* Render JSON data inside the modal */}
          {renderJsonData(jsonData)}
        </div>

        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>
            Modificar
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
