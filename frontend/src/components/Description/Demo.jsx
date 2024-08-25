import React, { useState } from 'react';
import { LuUndo2 } from "react-icons/lu";
import { LuRedo2 } from "react-icons/lu";
import { IoLinkSharp } from "react-icons/io5";
import { FaImage, FaListUl, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify } from "react-icons/fa";
import { AiOutlineBold, AiOutlineUnderline, AiOutlineItalic } from "react-icons/ai";
import './Demo.css'; // Import CSS

const TextEditor = () => {
  const [content, setContent] = useState("");
  const [fontSize, setFontSize] = useState("16px");
  const [alignment, setAlignment] = useState("left");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);

  const handleBold = () => setIsBold(!isBold);
  const handleItalic = () => setIsItalic(!isItalic);
  const handleUnderline = () => setIsUnderlined(!isUnderlined);

  const handleFontSizeChange = (e) => setFontSize(e.target.value);
  const handleAlignmentChange = (e) => setAlignment(e.target.value);

  const getStyle = () => ({
    fontSize: fontSize,
    textAlign: alignment,
    fontWeight: isBold ? 'bold' : 'normal',
    fontStyle: isItalic ? 'italic' : 'normal',
    textDecoration: isUnderlined ? 'underline' : 'none'
  });

  return (
    <div>
      <div className="text-editor">
        <div className="editor-controls">
          <LuUndo2 />
          <LuRedo2 />
          <IoLinkSharp />
          <FaImage />
          <FaListUl /> {/* Bullet points */}
          <FaAlignLeft onClick={() => setAlignment('left')} />
          <FaAlignCenter onClick={() => setAlignment('center')} />
          <FaAlignRight onClick={() => setAlignment('right')} />
          <FaAlignJustify onClick={() => setAlignment('justify')} />
          <AiOutlineBold onClick={handleBold} />
          <AiOutlineItalic onClick={handleItalic} />
          <AiOutlineUnderline onClick={handleUnderline} />
          <div className="font-size">
            <label htmlFor="font-size">Font Size:</label>
            <select id="font-size" name="font-size" onChange={handleFontSizeChange} value={fontSize}>
              {Array.from({ length: 22 }, (_, i) => 11 + i).map(size => (
                <option key={size} value={`${size}px`}>{size}px</option>
              ))}
            </select>
          </div>
        </div>
        <textarea
          className="editor-textarea"
          style={getStyle()}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing..."
        />
      </div>
    </div>
  );
};

export default TextEditor;
