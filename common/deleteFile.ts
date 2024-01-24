import fs from "fs";
import path from "path";

// Define a function to delete a file
const deleteFile = (fileName: string) => {
  const uploadsDir = path.join(__dirname, "..", "uploads"); // Adjust the directory path
  const filePath = path.join(uploadsDir, fileName);

  fs.unlink(filePath, (error) => {
    if (error) {
      console.error("Error deleting file:", error);
    } else {
      console.log("File deleted successfully:", filePath);
    }
  });
};

export default deleteFile;
