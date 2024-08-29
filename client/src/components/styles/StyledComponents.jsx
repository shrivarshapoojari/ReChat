 import {styled } from '@mui/material'
import {Link as LinkComponent} from 'react-router-dom'  
import { grayColor } from '../../constants/color';
 export const VisuallyHiddenInput =styled("input")({
    border:0,
    clip:"rect(0 0 0 0)",
    height:1,
    margin:-1,
    overflow:"hidden",
    padding:0,
    position:"absolute",
    whiteSpace:"nowrap",
    width:1
 })

 export const Link = styled(LinkComponent)({
   textDecoration: "none",
   color: "black",
   padding: "1rem",
   '&:hover': {
     backgroundColor: "rgba(0,0,0,0.1)", // Add quotes around the color value
   
   }
 });

 export const InputBox = styled("input")({
    
    width:"100%",
    height:"150%",
    border:"none",
    outline:"none",
    padding:"0 3rem",
    borderRadius:"1.5rem",
    backgroundColor:"rgba(0,1.200,1)",
    color:"white",
    
   
 })