import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  Snackbar,
  Alert,
  styled,
  Dialog
} from "@mui/material";
import { FiEdit2, FiCamera } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useIsPresent } from "framer-motion";
import { setIsProfile } from "../../redux/reducers/misc";

const ProfileWrapper = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: "auto",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: 16,
  "@media (max-width: 600px)": {
    margin: "16px"
  },
  padding:"2rem"
}));

const AvatarWrapper = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginBottom: 16
});

const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  cursor: "pointer",
  transition: "opacity 0.3s",
  "&:hover": {
    opacity: 0.8
  }
});

const CameraIconWrapper = styled(Box)({
  position: "absolute",
  bottom: 0,
  right: "32%",
  backgroundColor: "#fff",
  borderRadius: "50%",
  padding: 8,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
});

const EditableField = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: 16
});

const ProfileCard = () => {
  const [editMode, setEditMode] = useState({
    name: false,
    username: false,
    bio: false
  });

  const {user}=useSelector((state)=>state.auth)
  console.log(user)
  const [profile, setProfile] = useState({
    name: user?.name,
    username: user?.username,
    bio:  user?.bio,
    avatar:  user?.avatar?.url
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [errors, setErrors] = useState({});
  

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
    setTempProfile({ ...profile });
  };

  const handleChange = (field, value) => {
    setTempProfile({ ...tempProfile, [field]: value });
    validateField(field, value);
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    switch (field) {
      case "name":
        if (value.length < 2) newErrors.name = "Name must be at least 2 characters";
        else delete newErrors.name;
        break;
      case "username":
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          newErrors.username = "Username can only contain letters, numbers, and underscores";
        } else delete newErrors.username;
        break;
      case "bio":
        if (value.length > 150) newErrors.bio = "Bio cannot exceed 150 characters";
        else delete newErrors.bio;
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile({ ...tempProfile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    if (Object.keys(errors).length === 0) {
      setProfile(tempProfile);
      setEditMode({ name: false, username: false, bio: false });
     
    }
  };

  const handleCancel = () => {
    setEditMode({ name: false, username: false, bio: false });
    setTempProfile({ ...profile });
    setErrors({});
  };

  const dispatch=useDispatch();
  const {isProfile}=useSelector((state)=>state.misc)
const closeHandler=()=>{
dispatch(setIsProfile(false))
}
  return (

<Dialog open={isProfile} onClose={closeHandler}>
    <ProfileWrapper>
      <CardContent>
        <AvatarWrapper>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="avatar-upload"
            onChange={handleFileUpload}
            aria-label="Upload profile picture"
          />
          <label htmlFor="avatar-upload">
            <StyledAvatar src={tempProfile.avatar} alt={profile.name} />
            <CameraIconWrapper>
              <FiCamera size={20} />
            </CameraIconWrapper>
          </label>
        </AvatarWrapper>

        <EditableField>
          {editMode.name ? (
            <TextField
              fullWidth
              value={tempProfile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              aria-label="Edit name"
            />
          ) : (
            <>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {profile.name}
              </Typography>
              <IconButton onClick={() => handleEdit("name")} aria-label="Edit name">
                <FiEdit2 />
              </IconButton>
            </>
          )}
        </EditableField>

        <EditableField>
          {editMode.username ? (
            <TextField
              fullWidth
              value={tempProfile.username}
              onChange={(e) => handleChange("username", e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
              aria-label="Edit username"
            />
          ) : (
            <>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                @{profile.username}
              </Typography>
              <IconButton onClick={() => handleEdit("username")} aria-label="Edit username">
                <FiEdit2 />
              </IconButton>
            </>
          )}
        </EditableField>

        <EditableField>
          {editMode.bio ? (
            <TextField
              fullWidth
              multiline
              rows={3}
              value={tempProfile.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              error={!!errors.bio}
              helperText={errors.bio}
              aria-label="Edit bio"
            />
          ) : (
            <>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {profile.bio}
              </Typography>
              <IconButton onClick={() => handleEdit("bio")} aria-label="Edit bio">
                <FiEdit2 />
              </IconButton>
            </>
          )}
        </EditableField>

        {(editMode.name || editMode.username || editMode.bio) && (
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              aria-label="Cancel changes"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdate}
              disabled={Object.keys(errors).length > 0}
              aria-label="Update profile"
            >
              Update
            </Button>
          </Box>
        )}

        
      </CardContent>
    </ProfileWrapper>
    </Dialog>
  );
};

export default ProfileCard;