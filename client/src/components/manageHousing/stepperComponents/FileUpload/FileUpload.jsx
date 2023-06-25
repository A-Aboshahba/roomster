import { useEffect, useState } from "react";
import { Typography, Box, Grid, IconButton } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import "./FileUpload.css";

const FileUpload = ({ setIsChoosed }) => {
  const [files, setFiles] = useState([]);
  const [uploadEnabled, setUploadEnabled] = useState(false);

  const handleFileRemove = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    if (files.length < 8) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleUpload = () => {
    if (files.length < 5) {
      return alert("Please upload at least 5 images.");
    } else {
      //ya gd3an, Heena, you can add the code to actually upload the files to the server
      console.log("Files uploaded:", files);
    }
  };

  useEffect(() => {
    setUploadEnabled(files.length >= 5);
  }, [files]);

  useEffect(() => {
    setIsChoosed(false);
  }, []);
  return (
    <Box className="file-upload-container">
      <Typography variant="h5" gutterBottom className="file-upload-title">
        Upload Images
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="file-upload-input-container">
            {files.map((file, index) => (
              <div key={index} className="file-upload-image-container">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Image ${index + 1}`}
                  className="file-upload-image"
                />
                <IconButton
                  aria-label="remove image"
                  size="small"
                  onClick={() => handleFileRemove(index)}
                  className="file-upload-close-button"
                >
                  <AiFillCloseCircle />
                </IconButton>
              </div>
            ))}
            {[...Array(8 - files.length)].map((_, index) => (
              <div
                key={index}
                className="file-upload-placeholder"
                onClick={() =>
                  document.getElementById(`file-upload-input-${index}`).click()
                }
              >
                <span className="file-upload-plus-sign">+</span>
              </div>
            ))}
          </div>

          {uploadEnabled && (
            <Grid item xs={12}>
              <button
                className="file-upload-upload-button"
                onClick={handleUpload}
              >
                Confirm uploading
              </button>
            </Grid>
          )}
          {[...Array(8)].map((_, index) => (
            <input
              accept="image/*,video/*"
              type="file"
              id={`file-upload-input-${index}`}
              multiple
              className="file-upload-input"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              key={index}
            />
          ))}
        </Grid>
      </Grid>
      {files.length < 5 && (
        <Typography
          variant="body2"
          gutterBottom
          className="file-upload-message"
        >
          Please upload at least 5 images.
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
