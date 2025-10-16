import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    })();

const uploadCloudinaryImage = async (localFilePath) => {
    // Upload an image
  try{
        if(!localFilePath) throw new Error("No file path provided");
        const response= await cloudinary.uploader.upload(localFilePath,{
                
                resource_type:"auto"
            });
        console.log("File is uploaded:",response.url);
        return response;
      }catch(error){
        fs.unlinkSync(localFilePath);
        return null // remove file from local uploads folder
          console.log("Error uploading file:", error);
      }
    };
   
    


export {uploadCloudinaryImage}