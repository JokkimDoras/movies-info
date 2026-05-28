import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { ReviewText, BtnExpander } from "./ReviewText.styled";

type Props = {
  children:string
  collapsedNumWords?:number
  expandButtonText?:string
  collapseButtonText?:string
  expanded?:boolean
}

export default function ReviewsText({
  children,
  collapsedNumWords = 20,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  expanded = false,
}:Props) {
  
  const [isExpended, setIsExpended] = useState<boolean>(expanded);

  const displayText = isExpended
    ? children
    : `${children.split(" ").slice(0, collapsedNumWords).join(" ")}...`;

  return (
    <div>
      <ReviewText>
        {children.split(" ").length > collapsedNumWords
          ? displayText
          : children}
        {children.split(" ").length > collapsedNumWords && (
          <BtnExpander onClick={() => setIsExpended((exp) => !exp)}>
            {isExpended ? collapseButtonText : expandButtonText}
          </BtnExpander>
        )}
      </ReviewText>
    </div>
  );
}

