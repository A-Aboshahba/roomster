import { useEffect, useState } from 'react';
import { Typography, Box, Grid, IconButton } from '@mui/material';
import { AiFillCloseCircle } from 'react-icons/ai';


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
    <Box sx={{border: '2px solid #ccc',borderRadius: '20px',padding: '10px',}}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Upload Images
      </Typography>
        <Grid container md={12} my={2} sx={{display:"flex", justifyContent:"center"}}>
         {files.map((file, index) => (
          <Grid sx={{position: 'relative',border:'2px dashed #ccc',borderRadius: '5px',cursor: 'pointer', height:"120px", lineHeight:"100px", textAlign:"center" }} item md= {2.7} m={0.5} sm= {5.5 } xs= {12}>
          <img  style={{width: '100px',height: '115px',objectFit: "contain",}} src={URL.createObjectURL(file)} alt={`Image ${index + 1}`} className="file-upload-image" />
                 <IconButton aria-label="remove image" size="small" onClick={() => handleFileRemove(index)} sx={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#fff',
                  color: '#f44336',
                  borderRadius: '50%',
                }}>
                   <AiFillCloseCircle />
               </IconButton>
          </Grid>
         ))}
         {[...Array(8 - files.length)].map((_, index) => (
          <Grid sx={{border:'2px dashed #ccc',borderRadius: '5px',cursor: 'pointer', height:"100px", lineHeight:"100px", fontSize:"30px", textAlign:"center" }} onClick={() => document.getElementById(`file-upload-input-${index}`).click()}  item md= {2.7} m={0.5} sm= {5.5 } xs= {12}>
            +
          </Grid>

          ))}
          <Grid>
            {uploadEnabled && (
                <Grid item xs={12}>
                  <button className="file-upload-upload-button" onClick={handleUpload}>
                    Confirm uploading
                  </button>
                </Grid>
              )}
              <Grid>
              {[...Array(8)].map((_, index) => (
                <input accept="image/*,video/*" type="file" id={`file-upload-input-${index}`} multiple className="file-upload-input" onChange={handleFileUpload} style={{ display: 'none' }} key={index} />
              ))}
              </Grid>
              </Grid>
              {files.length < 5 && (
              <Typography variant="body2" gutterBottom mt={3}>
              Please upload at least 5 images.
              </Typography>
              )}
        </Grid>
     </Box>
    

  );
};

export default FileUpload;

