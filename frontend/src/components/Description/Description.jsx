import React, { useRef, useState } from "react";
import {
  FaImages,
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaListUl,
  FaListOl,
  FaUndo,
  FaRedo,
} from "react-icons/fa";
import "./Description.css";

const Description = () => {
  const contentRef = useRef(null);
  const [fontFamily, setFontFamily] = useState("Arial");

  // Function to handle image file input change
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const contentEditableDiv = contentRef.current;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = `<img src="${e.target.result}" alt="Uploaded" class="embedded-image" />`;
        const range = window.getSelection().getRangeAt(0);

        if (range && contentEditableDiv) {
          range.deleteContents(); // Remove any selected content

          // Insert image into contentEditable div
          contentEditableDiv.insertAdjacentHTML("beforeend", img);

          // Move cursor after the image
          const newRange = document.createRange();
          newRange.setStartAfter(contentEditableDiv.lastChild);
          newRange.collapse(true);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(newRange);

          // Ensure the editor remains focused
          contentEditableDiv.focus();
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Function to format text
  const formatText = (command, value) => {
    document.execCommand(command, false, value);
  };

  // Function to handle undo and redo
  const handleUndo = () => {
    document.execCommand("undo");
  };

  const handleRedo = () => {
    document.execCommand("redo");
  };

  // Function to handle font-family change
  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
    document.execCommand("fontName", false, event.target.value);
  };

  return (
    <div className="description-container">
      <div className="toolbar">
        <button onClick={handleUndo} title="Undo">
          <FaUndo />
        </button>
        <button onClick={handleRedo} title="Redo">
          <FaRedo />
        </button>
        <button onClick={() => formatText("bold")} title="Bold">
          <FaBold />
        </button>
        <button onClick={() => formatText("italic")} title="Italic">
          <FaItalic />
        </button>
        <button onClick={() => formatText("underline")} title="Underline">
          <FaUnderline />
        </button>
        <button
          onClick={() => formatText("insertOrderedList")}
          title="Numbered List"
        >
          <FaListOl />
        </button>
        <button
          onClick={() => formatText("insertUnorderedList")}
          title="Bulleted List"
        >
          <FaListUl />
        </button>
        <button onClick={() => formatText("justifyLeft")} title="Align Left">
          <FaAlignLeft />
        </button>
        <button
          onClick={() => formatText("justifyCenter")}
          title="Align Center"
        >
          <FaAlignCenter />
        </button>
        <button onClick={() => formatText("justifyRight")} title="Align Right">
          <FaAlignRight />
        </button>
        <select
          value={fontFamily}
          onChange={handleFontFamilyChange}
          className="font-family-selector"
        >
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
          <option value="Tahoma">Tahoma</option>
        </select>
      </div>
      <div
        className="description-area"
        contentEditable
        ref={contentRef}
        placeholder="Type your description here..."
        style={{ fontFamily: fontFamily }}
      ></div>
      <div className="image-upload-container">
        <label htmlFor="image-upload" className="image-upload-label">
          <FaImages style={{ fontSize: "24px", marginRight: "20px" }} /> Add
          Image
          <input
            type="file"
            id="image-upload"
            className="image-upload-input"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Description;
