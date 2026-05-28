import React from "react";
import { ButtonLoadMore, ButtonLoadMoreWrapper } from "./Button.styled";

type Props = {
  onClick:() => void;
}

export default function Button({ onClick }:Props) {
  return (
    <ButtonLoadMoreWrapper>
      <ButtonLoadMore onClick={onClick}>Load More</ButtonLoadMore>
    </ButtonLoadMoreWrapper>
  );
}
