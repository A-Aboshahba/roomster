import { useDispatch, useSelector } from "react-redux";
import {
  Avatar, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField,
} from "@mui/material";
import "./style.css";
import { Box } from "@mui/system";
import { useState } from "react";
import Roomster from "../../API/config";
import * as Yup from "yup";
import { useFormik } from "formik";
import { setUserProfileImage } from "../../store/Slices/userSlice";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { toastMessage } from "../../utils/toasfiy";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const Profile = () => {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  console.log(user);
  const userId = user._id;
  const publicId = user?.image?.publicId;
  const imageUrl = user?.image?.url;

  async function EditData(values) {
    await Roomster.patch(`user/${user._id}`, values);
    window.location.reload();
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: `${user.firstName}`,
      lastName: `${user.lastName}`,
      address: {
        country: `${user.address?.country}`,
        city: `${user.address?.city}`,
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      EditData(values);
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };
  };

  const handleImageSubmit = async () => {
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("image", imageFile);

        if (imageUrl === "") {
          const response = await Roomster.post(
            `user/${userId}/image`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          dispatch(setUserProfileImage(response.data.image));

        } else {
          console.log(publicId);
          formData.append("imageId", `${publicId}`);
          const response = await Roomster.patch(
            `user/${userId}/image`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
            
            );
          toastMessage("success", response.data.message);
          dispatch(setUserProfileImage(response.data.image));

        }
        // setOpen(false);
        setImageFile(null);
        setImageSrc(null);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = async () => {
    try {
      const res = await Roomster.patch(`user/${user._id}/password`, {
        password,
      });
      toastMessage("success", res.data.message);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <main id="main" className="main">
        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  {user?.image?.url === "" ? (
                    <Avatar sx={{ width: "120px", height: "120px"}}></Avatar>
                  ) : (
                    <img
                      className="profile_image rounded-circle"
                      src={user?.image?.url}
                      alt="profile-pic"
                      style={{ width: "120px", height: "120px" }}
                    />
                  )}
                  <h2>{user?.fullName}</h2>
                </div>
              </div>
            </div>

            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                      >
                        Overview
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Edit Profile
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview"
                    >
                      <h5 className="card-title">Profile Details</h5>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          Full Name
                        </div>
                        <div className="col-lg-9 col-md-8">{user?.fullName}</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">{user?.email}</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Address</div>
                        <div className="col-lg-9 col-md-8">
                          {user?.address?.country},{user?.address?.city}
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade profile-edit pt-3"
                      id="profile-edit"
                    >
                          <label
                            htmlFor="profileImage"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Profile Image
                          </label>
                          <div>
              <Box sx={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="profilePhoto" style={{ cursor: "pointer" }}>
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            <Box sx={{ position: "relative", mb: 5 }}>
              {imageSrc === null  && user?.image?.url ? (
                <Box
                  component="img"
                  sx={{
                    border: "1px solid black",
                    borderRadius: "50%",
                    height: { lg: 100, md: 150, sm: 100, xs: 100 },
                    width: { lg: 100, md: 150, sm: 100, xs: 100 },
                  }}
                  alt="img"
                  src={user?.image?.url}
                />
              ) : imageSrc !== null ?(
                <Box
                  component="img"
                  sx={{
                    border: "1px solid black",
                    borderRadius: "50%",
                    height: { lg: 100, md: 150, sm: 100, xs: 100 },
                    width: { lg: 100, md: 150, sm: 100, xs: 100 },
                  }}
                  alt="img"
                  src={imageSrc}
                />
              ) : (
                <Avatar sx={{ width: "120px", height: "120px"}}> <AddPhotoAlternateIcon sx={{ fontSize: "4.5rem", width: "50%", height: "50%" }} />
                </Avatar>
                )}

              <Box
                component={AddPhotoAlternateIcon}
                alt="Add Photo Icon"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: 1,
                  height: "40px !important",
                  width: "40px !important",
                  cursor: "pointer",
                }}
              />
            </Box>
          </label>

          <Button
            onClick={() => handleImageSubmit()}
            style={{
              backgroundColor: "#4caf50",
              color: "#ffff",
              fontWeight: "bold",
              borderRadius: "5px",
              border: "2px solid",
              padding: "4px 12px",
              marginLeft: "27px",
            }}
            disabled={imageFile === null}
          >
            Update
          </Button>
        </Box>
        <TextField
          name="firstName"
          required
          fullWidth
          id="outlined-controlled"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          sx={{
            m: "1%",
            width: "48%",
            my: 1,
          }}
        />
        <TextField
          label="Last Name"
          id="outlined-controlled"
          required
          fullWidth
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          sx={{
            m: "1%",
            width: "48%",
            my: 1,
          }}
        />

        <FormControl
          sx={{
            m: "1%",
            width: "48%",
            my: 1,
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-controlled">Country</InputLabel>
          <OutlinedInput
            id="outlined-controlled"
            required
            fullWidth
            label="Country"
            name="address.country"
            value={formik.values.address?.country || ""}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl
          sx={{
            m: "1%",
            width: "48%",
            my: 1,
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-controlled">City</InputLabel>
          <OutlinedInput
            id="outlined-controlled"
            required
            fullWidth
            label="City"
            name="address.city"
            autoComplete="city"
            value={formik.values.address?.city || ""}
            onChange={formik.handleChange}
          />
        </FormControl>

        <Button type="submit" variant="contained" sx={{ m: 1, color: "white" }}>
          Save Changes
        </Button>
      </div>                                        
     </div>

                    <div
                      className="tab-pane fade pt-3"
                      id="profile-change-password"
                    >
                       <FormControl
            sx={{
              m: "1%",
              width: "98%",
              my: 1,
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-controlled">Password</InputLabel>
            <OutlinedInput
              id="outlined-controlled"
              label="Password"
              required
              fullWidth
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box
            sx={{
              mt: "2rem",
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => handleChangePassword()}
            >
              Change Password
            </Button>
          </Box>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;