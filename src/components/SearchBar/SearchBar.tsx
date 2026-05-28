import React from "react";
import {
  SearchInput,
  SearchWrapper,
  SearchButton,
  Icon,
  SearchForm,
} from "./SearchBar.styled";

interface Props {
  value:string
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;}

export default function SearchBar({ onSearch, value }:Props) {
  return (
    <SearchWrapper>
      <SearchForm onSubmit={onSearch}>
        <SearchInput
          name="search"
          defaultValue={value}
          type="text"
          placeholder="Search Movie"
        />
        <SearchButton type="submit">
          <Icon /> Search
        </SearchButton>
      </SearchForm>
    </SearchWrapper>
  );
}
