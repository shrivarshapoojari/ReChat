// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   IconButton,
//   TextField,
//   Button,
//   styled,
//   Dialog,
//   Snackbar
// } from "@mui/material";
// import { FiEdit2, FiCamera } from "react-icons/fi";
// import { useSelector, useDispatch } from "react-redux";
// import { setIsProfile } from "../../redux/reducers/misc";
// import { useFileHandler, useInputValidation } from "6pp";
// import { usernameValidator } from "../../utils/validators";
// import toast from "react-hot-toast";
// import { userExists } from "../../redux/reducers/auth";
// import axios from "axios";
// import { server } from "../../constants/config";

// const ProfileWrapper = styled(Card)(({ theme }) => ({
//   maxWidth: 400,
//   margin: "auto",
//   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   borderRadius: 16,
//   "@media (max-width: 600px)": {
//     margin: "16px"
//   },
//   padding: "2rem"
// }));

// const AvatarWrapper = styled(Box)({
//   position: "relative",
//   display: "flex",
//   justifyContent: "center",
//   marginBottom: 16
// });

// const StyledAvatar = styled(Avatar)({
//   width: 120,
//   height: 120,
//   cursor: "pointer",
//   transition: "opacity 0.3s",
//   "&:hover": {
//     opacity: 0.8
//   }
// });

// const ProfileCard = () => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const [editMode, setEditMode] = useState({
//     name: false,
//     username: false,
//     bio: false,
//     avatar: false
//   });
//   const closeHandler = () => dispatch(setIsProfile(false));
//   const avatar = useFileHandler("single");
 
//   const name = useInputValidation(user?.name || "");
//   const username = useInputValidation(user?.username || "", usernameValidator);
//   const bio = useInputValidation(user?.bio || "");

//   const handleEdit = (field) => setEditMode({ ...editMode, [field]: true });

//   const handleUpdate = async () => {
   
     
  
    
//     const formData = new FormData();
//     formData.append("name", name.value);
//     formData.append("username", username.value);
//     formData.append("bio", bio.value);
//     formData.append("avatar", avatar.file);
    
//     try 
//     {
  
//       const data=await toast.promise(
//         axios.post(`${server}/api/v1/user/update`, formData, {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }),
//         {
//           loading: 'Updating..',
//           success: 'Profile Updated Successfully',
//           error: 'Failed to update...', 
//         }
//       );

        
   
//       dispatch(userExists(data?.data?.user));
      
    
//     } 
//     catch (error)
//      {
//       console.error(error);
 
      
//       if (error.response)
//          {
//         toast.error(error.response.data.message || 'Request failed with error');
//       } 
//       else if (error.request) 
//         {
//         toast.error('No response received from the server');
//       } else 
//       {
//         toast.error('An unexpected error occurred');
//       }
//     }
    
//   finally
//     {
//       closeHandler();
//       setEditMode({ name: false, username: false, bio: false, avatar: false });
//     }
     
   
   
//   };

  // const handleCancel = () => {
  //   setEditMode({ name: false, username: false, bio: false, avatar: false });
  //   name.reset(user?.name || "");
  //   username.reset(user?.username || "");
  //   bio.reset(user?.bio || "");
  //   avatar.clear();
  // };

 

//   return (
//     <Dialog open={true} onClose={closeHandler}>
//       <ProfileWrapper>
//         <CardContent>
//           <AvatarWrapper>
//             <input
//               type="file"
//               accept="image/*"
//               style={{ display: "none" }}
//               id="avatar-upload"
//               onChange={avatar.changeHandler}
//               onClick={() => handleEdit("avatar")}
//               aria-label="Upload profile picture"
//             />
//             <label htmlFor="avatar-upload">
//               <StyledAvatar src={avatar.preview || user?.avatar?.url} />
//               <IconButton component="span">
//                 <FiCamera size={20} />
//               </IconButton>
//             </label>
//           </AvatarWrapper>
//           {avatar.error && (
//             <Typography color="error" variant="caption">
//               {avatar.error}
//             </Typography>
//           )}

//           <Box display="flex" alignItems="center" mb={2}>
//             {editMode.name ? (
//               <TextField
//                 fullWidth
//                 value={name.value}
//                 onChange={name.changeHandler}
//                 error={!!name.error}
//                 helperText={name.error}
//                 aria-label="Edit name"
//               />
//             ) : (
//               <>
//                 <Typography variant="h6" sx={{ flexGrow: 1 }}>
//                   {user?.name}
//                 </Typography>
//                 <IconButton onClick={() => handleEdit("name")} aria-label="Edit name">
//                   <FiEdit2 />
//                 </IconButton>
//               </>
//             )}
//           </Box>

//           <Box display="flex" alignItems="center" mb={2}>
//             {editMode.username ? (
//               <TextField
//                 fullWidth
//                 value={username.value}
//                 onChange={username.changeHandler}
//                 error={!!username.error}
//                 helperText={username.error}
//                 aria-label="Edit username"
//               />
//             ) : (
//               <>
//                 <Typography variant="body1" sx={{ flexGrow: 1 }}>
//                   {user?.username}
//                 </Typography>
//                 <IconButton onClick={() => handleEdit("username")} aria-label="Edit username">
//                   <FiEdit2 />
//                 </IconButton>
//               </>
//             )}
//           </Box>

//           <Box display="flex" alignItems="center" mb={2}>
//             {editMode.bio ? (
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 value={bio.value}
//                 onChange={bio.changeHandler}
//                 error={!!bio.error}
//                 helperText={bio.error}
//                 aria-label="Edit bio"
//               />
//             ) : (
//               <>
//                 <Typography variant="body2" sx={{ flexGrow: 1 }}>
//                   {user?.bio}
//                 </Typography>
//                 <IconButton onClick={() => handleEdit("bio")} aria-label="Edit bio">
//                   <FiEdit2 />
//                 </IconButton>
//               </>
//             )}
//           </Box>

//           {(editMode.name || editMode.username || editMode.bio || editMode.avatar) && (
//             <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
//               <Button variant="outlined" onClick={handleCancel} aria-label="Cancel changes">
//                 Cancel
//               </Button>
//               <Button
//                 variant="contained"
//                 onClick={handleUpdate}
//                 aria-label="Update profile"
//               >
//                 Update
//               </Button>
//             </Box>
//           )}
//         </CardContent>
//       </ProfileWrapper>
//     </Dialog>
//   );
// };

// export default ProfileCard;






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
  styled,
  Dialog,
  Stack,
} from "@mui/material";
import { FiEdit2, FiCamera } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setIsProfile } from "../../redux/reducers/misc";
import { useFileHandler, useInputValidation } from "6pp";
import { usernameValidator } from "../../utils/validators";
import toast from "react-hot-toast";
import { userExists } from "../../redux/reducers/auth";
import axios from "axios";
import { server } from "../../constants/config";

// Wrapper for entire profile card
const ProfileWrapper = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: "auto",
  // boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  boxShadow: "0px 5px 20px rgba(0,0,0,0.2)",
  padding: "2rem",

  textAlign: "center",
  background: "linear-gradient(135deg, #f1f2f6, #dfe4ea)",
}));

// Wrapper for avatar section
const AvatarWrapper = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginBottom: "1.5rem",
});

// Styled avatar with hover effect
const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  cursor: "pointer",
  transition: "opacity 0.3s",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
  "&:hover": {
    opacity: 0.8,
  },
});

// Custom text field for a cleaner look
const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
});

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState({
    name: false,
    username: false,
    bio: false,
    avatar: false,
  });
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
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Updating..",
          success: "Profile Updated Successfully",
          error: "Failed to update...",
        }
      );

      dispatch(userExists(data?.data?.user));
    } catch (error) {
      console.error(error);
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
    <Dialog open={true} onClose={closeHandler}
         
    
    PaperProps={{
      sx: {
        
        borderRadius: "15px",
        boxShadow: "2px 5px 20px rgba(0,0,0,0.5)",
        
         
      }
    }}

    >
      <ProfileWrapper
         
      >
        <CardContent
          
        >
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

          <Stack spacing={2}>
            {/* Name Section */}
            <Box display="flex" alignItems="center" justifyContent="space-between">
              {editMode.name ? (
                <StyledTextField
                  fullWidth
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
            <Box display="flex" alignItems="center" justifyContent="space-between">
              {editMode.username ? (
                <StyledTextField
                  fullWidth
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

            {/* Bio Section */}
             

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

