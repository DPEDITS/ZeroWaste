import React, { useState, useRef } from 'react';

function ProofUpload({ foodId, onSubmit, onClose }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selected);
    }
  };

  const handleSubmit = () => {
    if (preview) {
      onSubmit(foodId, preview);
    }
  };

  return (
    <div className="ff-modal-overlay" onClick={onClose}>
      <div className="ff-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ff-modal-header">
          <h3 className="ff-modal-title">Upload Distribution Proof</h3>
          <button className="ff-modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <p className="ff-modal-subtitle">
          Upload a photo showing the food being distributed to people in need. This proof will be shared with the donor.
        </p>

        {!preview ? (
          <div className="ff-upload-zone" onClick={() => fileRef.current.click()}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p className="ff-upload-text">Click to upload photo</p>
            <p className="ff-upload-hint">JPG, PNG up to 10MB</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <div className="ff-preview-container">
            <img src={preview} alt="Preview" className="ff-preview-img" />
            <button className="ff-change-photo" onClick={() => { setPreview(null); setFile(null); }}>
              Change photo
            </button>
          </div>
        )}

        <div className="ff-modal-actions">
          <button className="ff-btn ff-btn-outline" onClick={onClose}>Cancel</button>
          <button
            className="ff-btn ff-btn-success"
            onClick={handleSubmit}
            disabled={!preview}
            style={{ opacity: preview ? 1 : 0.5 }}
          >
            ✅ Submit Proof
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProofUpload;
