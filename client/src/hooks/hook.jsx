import { useEffect } from "react";
import toast from "react-hot-toast";


const useErrors = (errors = []) => {
    useEffect(() => {
      errors.forEach(({ isError, error, fallback }) => {
        if (isError) {
          if (fallback) fallback();
          else{

            console.log(error)
            
              toast.error(error?.data?.message || "Something went wrong");
          }

        }
      });
    }, [errors]);
  };
  

export {useErrors}