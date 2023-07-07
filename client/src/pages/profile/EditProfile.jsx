import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Roomster from "../../API/config";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "../../components/profileComponent/ChangePassword";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useState } from "react";
import { setUserProfileImage } from "../../store/Slices/userSlice";

export default function EditProfile({ setOpen }) {
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const user = useSelector((state) => state.user?.user);
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
          console.log(response);
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
          dispatch(setUserProfileImage(response.data.image));
          console.log(response);
        }
        setOpen(false);
        setImageFile(null);
        setImageSrc(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2ch",
      }}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h4" sx={{ m: 1 }}>
        Edit Profile
      </Typography>
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
              {imageSrc === null ? (
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
              ) : (
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

        <ChangePassword />
      </div>
    </Box>
  );
}
