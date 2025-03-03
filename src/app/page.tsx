"use client";
import { useEffect, useState } from "react";
import useDriverPicker from "react-google-drive-picker";
import {
  OneDriveOpenOptions,
  OneDrivePicker,
  OneDriveResult,
} from "react-onedrive-filepicker/lib/onedrive-picker";
import { appendScript, removeScript } from "./utils";

declare var OneDrive: OneDrivePicker;

const Home = () => {
  const [openPicker, setOpenPicker] = useDriverPicker();
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [selectedFilesOndrive, setSelectedFilesOneDrive] = useState<any>([]);

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

  const KEY = "13d096d5-2af1-46a5-b21b-f2273141c1cc";
  const launchOneDrivePicker = ({
    oneDriveApplicationId,
    action,
    multiSelect,
    advancedOptions,
  }: {
    oneDriveApplicationId: string;
    action: "download" | "share" | "query";
    multiSelect?: boolean;
    advancedOptions?: any;
  }) => {
    return new Promise<OneDriveResult>(function (resolve, reject) {
      const odOptions: OneDriveOpenOptions = {
        clientId: oneDriveApplicationId,
        action: action || "download",
        multiSelect: multiSelect || true,
        openInNewWindow: true,
        advanced: advancedOptions || {},
        success: (files: any) => {
          console.log("files", files);

          setSelectedFilesOneDrive(files?.value);
        },
        cancel: () => {
          console.log("cancel");
        },
        error: (e: any) => {
          console.log("error", e);
        },
      };
      OneDrive.open(odOptions);
    });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      appendScript("https://js.live.net/v7.2/OneDrive.js");
    }
    return () => {
      mounted = false;
      removeScript("https://js.live.net/v7.2/OneDrive.js");
    };
  }, [KEY]);

  return (
    <div>
      <div className="flex p-5 text-center">
        <button onClick={handleOpenPicker} className="mt-5">
          Open GG File Picker
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
      <div className="flex p-5 text-center">
        <button
          onClick={() =>
            launchOneDrivePicker({
              oneDriveApplicationId: KEY,
              action: "share",
            })
          }
          className="mt-5"
        >
          Open OneDrive File Picker
        </button>

        <div className="flex flex-wrap gap-5 justify-center">
          {selectedFilesOndrive.map((item: any, index: number) => (
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
                {item.name}
              </h4>
              <p style={{ fontSize: "12px", marginBottom: "10px" }}>
                <strong>Type:</strong> {item?.file.mimeType}
              </p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Open File
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
