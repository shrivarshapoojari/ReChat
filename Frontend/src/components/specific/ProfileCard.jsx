import { useFileHandler } from "6pp";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiCamera, FiEdit2, FiUser, FiAtSign, FiMail } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../constants/config";
import { userExists } from "../../redux/reducers/auth";
import { setIsProfile } from "../../redux/reducers/misc";

// Styled components for card and fields
const ProfileWrapper = styled(Card)(({ theme }) => ({
  maxWidth: 450,
  margin: "auto",
  padding: "2rem",
  textAlign: "center",
  borderRadius: "15px",
  background: "linear-gradient(135deg, #f0f4ff, #d4e0ff)",
  boxShadow: "0px 5px 20px rgba(0,0,0,0.3)",
}));

const AvatarWrapper = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginBottom: "1.5rem",
});

const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  cursor: "pointer",
  transition: "opacity 0.3s",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
  "&:hover": { opacity: 0.85 },
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
  "& .MuiInputLabel-root": { color: "#6b778c" },
});

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState({ name: false, username: false, bio: false, avatar: false });
  const closeHandler = () => dispatch(setIsProfile(false));
  const avatar = useFileHandler("single");

  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");

  const handleEdit = (field) => setEditMode({ ...editMode, [field]: true });

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("avatar", avatar.file);

    try {
      const data = await toast.promise(
        axios.post(`${server}/api/v1/user/update`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          loading: "Updating...",
          success: "Profile Updated Successfully",
          error: "Failed to update...",
        }
      );
      dispatch(userExists(data?.data?.user));
    } catch (error) {
      toast.error(error.response?.data.message || "An unexpected error occurred");
    } finally {
      closeHandler();
      setEditMode({ name: false, username: false, bio: false, avatar: false });
    }
  };

  const handleCancel = () => {
    setEditMode({ name: false, username: false, bio: false, avatar: false });
    setName(user?.name || "");
    setUsername(user?.username || "");
    setBio(user?.bio || "");
    avatar.clear();
    closeHandler();
  };

  return (
    <Dialog open={true} onClose={closeHandler} PaperProps={{ sx: { borderRadius: "15px", boxShadow: "2px 5px 20px rgba(0,0,0,0.5)" } }}>
      <ProfileWrapper>
        <CardContent>
          <AvatarWrapper>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload"
              onChange={avatar.changeHandler}
              onClick={() => handleEdit("avatar")}
            />
            <label htmlFor="avatar-upload">
              <StyledAvatar src={avatar.preview || user?.avatar?.url} alt="User Avatar" />
              <IconButton component="span" sx={{ position: "absolute", top: "60%", left: "60%" }}>
                <FiCamera size={20} />
              </IconButton>
            </label>
          </AvatarWrapper>

          <Stack spacing={3}>
            {/* Name Section */}
            <Box display="flex" alignItems="center">
              <FiUser size={20} style={{ marginRight: 8, color: "#3a8dff" }} />
              {editMode.name ? (
                <StyledTextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Edit name"
                />
              ) : (
                <>
                  <Typography variant="h6">{user?.name}</Typography>
                  <IconButton onClick={() => handleEdit("name")} aria-label="Edit name">
                    <FiEdit2 />
                  </IconButton>
                </>
              )}
            </Box>

            {/* Username Section */}
            <Box display="flex" alignItems="center">
              <FiAtSign size={20} style={{ marginRight: 8, color: "#3a8dff" }} />
              {editMode.username ? (
                <StyledTextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  aria-label="Edit username"
                />
              ) : (
                <>
                  <Typography variant="body1">{user?.username}</Typography>
                  <IconButton onClick={() => handleEdit("username")} aria-label="Edit username">
                    <FiEdit2 />
                  </IconButton>
                </>
              )}
            </Box>

            {/* Email Section (Non-Editable) */}
            <Box display="flex" alignItems="center">
              <FiMail size={20} style={{ marginRight: 8, color: "#3a8dff" }} />
              <Typography variant="body1">{user?.email}</Typography>
            </Box>

            {/* Action Buttons */}
            {(editMode.name || editMode.username || editMode.bio || editMode.avatar) && (
              <Box display="flex" gap={2} justifyContent="center" mt={2}>
                <Button variant="outlined" onClick={handleCancel} color="secondary">
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleUpdate} color="primary">
                  Update
                </Button>
              </Box>
            )}
          </Stack>
        </CardContent>
      </ProfileWrapper>
    </Dialog>
  );
};

export default ProfileCard;
