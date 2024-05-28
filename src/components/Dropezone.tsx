import { Image } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const maxSize = 1048576; // 1 MB in bytes

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFile = acceptedFiles[0];
    if (imageFile?.type.startsWith("image/")) {
      setFile(imageFile);
      const filePreview = URL.createObjectURL(imageFile);
      setPreview(filePreview);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpg", ".jpeg", ".png"],
      },
      maxSize,
    });

  const getErrorMessage = (rejections: string | unknown[]) => {
    if (rejections.length > 0) {
      const { errors } = rejections[0];
      for (const error of errors) {
        if (error.code === "file-too-large") {
          return "File size exceeds 1 MB.";
        }
        if (error.code === "file-invalid-type") {
          return "Invalid file type.";
        }
      }
    }
    return null;
  };

  const errorMessage = getErrorMessage(fileRejections);

  return (
    <div>
      <div
        {...getRootProps()}
        className={` h-96 border-dashed border-2  p-4 rounded-md overflow-hidden ${isDragActive ? "border-black" : "border-gray-300"} `}
      >
        <input {...getInputProps()} className="h-0" type="file" />
        {file ? (
          <div className="flex flex-col text-center gap-2 h-full">
            <div className="relative h-5/6 rounded-lg overflow-hidden">
              <img
                src={preview ?? ""}
                alt={file.name}
                className="mx-auto h-full w-full object-contain  "
              />
            </div>
            <p className="h-1/6 text-black">
              {file.name} - {file.size} bytes
            </p>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="h-5/6 flex justify-center items-center">
              <Image strokeWidth={1} size={150} />
            </div>
            <div className="h-1/6">
              {isDragActive ? (
                <p className="text-center ">Drop the image here ...</p>
              ) : (
                <p className="text-center ">
                  Drag 'n' drop you're image here, or click to select image
                </p>
              )}
              {errorMessage && (
                <p className="text-center text-red-500">{errorMessage}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropzone;
