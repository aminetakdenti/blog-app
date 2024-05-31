import { useMutation } from "convex/react";
import {
  UploadDropzone,
  type UploadFileResponse,
} from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "../../convex/_generated/api";

// name
// :
// "Screenshot from 2024-05-15 08-39-27.png"
// response
// :
// {storageId: 'kg20aebgjztk3nk3nxk87mwksd6t5z3r'}
// size
// :
// 124492
// type
// :
// "image/png"

type Props = {
  setImage: (image: UploadFileResponse) => void;
};

function Dropezone({ setImage }: Props) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    setImage(uploaded[0]);
    console.log(uploaded);
  };

  return (
    <UploadDropzone
      className={() =>
        "border-2 border-dashed border-gray-300 rounded-lg p-4 w-full"
      }
      uploadUrl={generateUploadUrl}
      fileTypes={{
        "application/pdf": [".pdf"],
        "image/*": [".png", ".gif", ".jpeg", ".jpg"],
      }}
      onUploadComplete={saveAfterUpload}
      onUploadError={(error: unknown) => {
        // Do something with the error.
        alert(`ERROR! ${error}`);
      }}
    />
  );
}

export default Dropezone;
