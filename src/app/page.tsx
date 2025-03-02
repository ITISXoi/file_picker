"use client";
import { useState } from "react";
import useDriverPicker from "react-google-drive-picker";

const Home = () => {
  const [openPicker, setOpenPicker] = useDriverPicker();
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "359353537356-ipurnf6bj694qordd9m6u2544mk4rdvi.apps.googleusercontent.com",
      developerKey: "AIzaSyCWHLRgNJNN3RfnX4fOe8hIrEoekOXmXcQ",
      viewId: "DOCS",
      showUploadFolders: true,
      supportDrives: true,
      showUploadView: true,
      multiselect: true,
      callbackFunction: (data: { docs: any }) => {
        console.log(data);
        setSelectedFiles(data.docs || []);
      },
    });
  };
  return (
    <div className="flex p-5 text-center">
      <button onClick={handleOpenPicker} className="mt-5">
        Open Picker
      </button>
      <div className="flex flex-wrap gap-5 justify-center">
        {selectedFiles.map((file: any, index: number) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
              textAlign: "left",
            }}
          >
            <h4 style={{ fontSize: "14px", marginBottom: "10px" }}>
              {file.name}
            </h4>
            <p style={{ fontSize: "12px", marginBottom: "10px" }}>
              <strong>Type:</strong> {file.mimeType}
            </p>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              Open File
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
