import { useEffect, useState } from "react";
import { Typography, Box, Grid, IconButton, Button } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import "./FileUpload.css";
import Roomster from "../../../../API/config";
import { useSelector } from "react-redux";

const FileUpload = ({ setIsChoosed, addedApartment, apartment }) => {
  console.log("update:", apartment, "add:", addedApartment);

  const [files, setFiles] = useState([]);
  const [ids, setIds] = useState([]);
  const [uploadEnabled, setUploadEnabled] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (apartment) {
      console.log("images", apartment.images);
      apartment.images.forEach((image) => {
        setFiles((prevFiles) => [...prevFiles, image.url]);
        setIds((prevIds) => [...prevIds, image.publicId]);
      });
    }
  }, []);
  console.log(files);
  const handleFileRemove = async (index) => {
    console.log("file removed", index);
    try {
      let id = ids[index];
      console.log(id);
      const response = await Roomster.delete(
        `apartments/${apartment ? apartment?._id : addedApartment?._id}/image`,
        {
          headers: {},
          data: {
            imageId: id,
            userId: user._id,
          },
        }
      );
      console.log(response);
      if (files.length < 8) {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setIds((prevFiles) => prevFiles.filter((_, i) => i !== index));
      }
      console.log("files", files);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (event) => {
    console.log("file upload", event.target.files[0]);
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    formData.append("userId", user._id);
    console.log("formData", formData);
    try {
      const response = await Roomster.patch(
        `apartments/${apartment ? apartment?._id : addedApartment?._id}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newFiles = Array.from(event.target.files);
      const newFilesUrl = URL.createObjectURL(newFiles[0]);
      console.log("newFiles", URL.createObjectURL(newFiles[0]));
      if (files.length < 8) {
        setFiles((prevFiles) => [...prevFiles, newFilesUrl]);
        setIds((prevIds) => [...prevIds, response.data.imageId]);
      }
      if (files.length > 3) {
        setIsChoosed(false);
      }
      console.log("files", files[0]);
    } catch (error) {
      console.log(error);
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
    if (files.length >= 5) {
      setIsChoosed(false);
    } else {
      setIsChoosed(true);
    }
  }, [files, ids]);


  return (
    <Box sx={{border: '2px solid #ccc',borderRadius: '20px',padding: '10px',}}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Upload Images
      </Typography>

        <Grid container md={12} my={2} sx={{display:"flex", justifyContent:"center"}}>
         {files.map((file, index) => (
          <Grid sx={{position: 'relative',border:'2px dashed #ccc',borderRadius: '5px',cursor: 'pointer', height:"120px", lineHeight:"100px", textAlign:"center" }} item md= {2.7} m={0.5} sm= {5.5 } xs= {12}>
          <img  style={{width: '100px',height: '115px',objectFit: "contain",}} src={file} alt={`Image ${index + 1}`} className="file-upload-image" />
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


