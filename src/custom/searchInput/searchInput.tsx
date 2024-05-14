import {  InputHTMLAttributes } from "react";
import { ReactComponent as SearchIcon } from "../../assets/search-real.svg";
import styles from "./search.module.css";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  width?: string;
}
const SearchInput: React.FC<Props> = ({ placeholder, width, ...rest }) => {
 
  return (
    <form className={styles.searchContainer} >
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder ? placeholder : "Search"}
        style={{ width: width ? width : "30rem" }}
        {...rest}
      />
      
      <button className={styles.searchIcon} type="button">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchInput;
