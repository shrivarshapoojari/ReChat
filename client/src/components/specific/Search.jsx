import { Dialog, DialogTitle,InputAdornment,Stack,TextField,List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { useInputValidation } from '6pp'
import SearchIcon from '@mui/icons-material/Search';
const Search = () => {
  const users=[];
  const search=useInputValidation("")
  return (
    <Dialog open>
        <Stack p={"2rem"} direction={"column"} width={"25rem"}>
                <DialogTitle  textAlign={"center"}>Find Friends</DialogTitle>
                <TextField   label="" value={search.value} onChange={search.changeHandler}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment:(
                      <InputAdornment position="start">
                        <SearchIcon/>
                      </InputAdornment>
                    )
                  }}
                
                
                /> 

                <List>

                        {
                          users?.map((user) =>
                            <ListItem>
                                 <ListItemText />
                            </ListItem>
                        
                        )
                        }

                </List>
        </Stack>
    </Dialog>
  )
}

export default Search
