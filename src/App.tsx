import { useRef, useState } from "react";
import "./App.css";
import InputImage from "./InputImage";
import { useGetImageUrl } from "./useGetImageUrl";
import React from "react";

const IMAGE_ID = "imageId";
const FIELD_SIZE = 210;

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files && e.currentTarget.files[0]) {
      const targetFile = e.currentTarget.files[0];
      setImageFile(targetFile);
    }
  };

  const handleClickCancelButton = () => {
    setImageFile(null);
    // <input />タグの値をリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const { imageUrl } = useGetImageUrl({ file: imageFile });

  return (
    <>
      <label
        htmlFor={IMAGE_ID}
        style={{
          border: "white 3px dotted",
          width: FIELD_SIZE,
          height: FIELD_SIZE,
          display: "flex",
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {imageUrl && imageFile ? (
          <img
            src={imageUrl}
            alt="アップロード画像"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        ) : (
          "+ 画像をアップロード"
        )}
        {/* ダミーインプット: 見えない */}
        <InputImage
          ref={fileInputRef}
          id={IMAGE_ID}
          onChange={handleFileChange}
        />
      </label>

      <div style={{ height: 20 }} />
      {/* キャンセルボタン */}
      <button onClick={handleClickCancelButton}>キャンセル</button>
    </>
  );
}

export default App;
