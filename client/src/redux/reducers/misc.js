import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  setIsProfile: false,
  isAddMember: false,
  isNotification: false,
  isMobile: false,
  isSearch: false,
  isFileMenu: false,
  isManageGroup: false,
  
  uploadingLoader: false,
   
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setIsManageGroup: (state, action) => {
      state.isManageGroup= action.payload;
    },
    setIsProfile: (state, action) => {
      state.isProfile = action.payload;
    },
    setIsAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
     
    setUploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    
  },
});

export default miscSlice;
export const {
  setIsManageGroup,
  setIsNewGroup,
  setIsProfile,
  setIsAddMember,
  setIsNotification,
  setIsMobile,
  setIsSearch,
  setIsFileMenu,
   
  setUploadingLoader,
  
} = miscSlice.actions;