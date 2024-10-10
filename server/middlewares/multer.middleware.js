import multer from 'multer';


export const multerUpload=multer({
    limits:{
        fileSize:1024*1024*10,
        
    }
})


export const attachmentsMulter=multerUpload.array("file", 10);




