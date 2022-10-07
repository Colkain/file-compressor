import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function DropZone({ files, setFiles }) {
  const [error, setError] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    let f = [];
    acceptedFiles.forEach((file) => {
      if (!error) {
        if (
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/webp"
        ) {
          f.push({
            filename: file.path,
            size: file.size,
            status: "Uploaded",
            file: file,
          });
        } else {
          setFiles([]);
          alert("error");
          setError(true);
        }
      }
    });
    setFiles(f);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="w-1/3 p-20 border border-white border-dashed rounded-md cursor-pointer text-center"
    >
      <input {...getInputProps()} accept="image/*" />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default DropZone;
