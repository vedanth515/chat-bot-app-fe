import { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = ({ sessionId, onFileUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.includes('pdf') && !file.type.includes('text/plain')) {
      setUploadMessage('Please upload only PDF or TXT files');
      return;
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setUploadMessage('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setUploadMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('sessionId', sessionId);

    try {
      const response = await axios.post('http://localhost:5000/api/chat/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadMessage(`File "${file.name}" uploaded successfully!`);
      if (onFileUpload) {
        onFileUpload();
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadMessage('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
      // Clear file input
      e.target.value = '';
    }
  };

  return (
    <div className="file-upload">
      <label htmlFor="file-upload" className="file-upload-label">
        {isUploading ? 'Uploading...' : 'Upload PDF/TXT File'}
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".pdf,.txt"
        onChange={handleFileUpload}
        disabled={isUploading}
        style={{ display: 'none' }}
      />
      {uploadMessage && (
        <div className={`upload-message ${uploadMessage.includes('successfully') ? 'success' : 'error'}`}>
          {uploadMessage}
        </div>
      )}
    </div>
  );
};

export default FileUpload;