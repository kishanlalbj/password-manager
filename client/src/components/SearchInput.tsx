interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <>
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search"
        className="p-2 rounded-sm"
      ></input>
    </>
  );
};

export default SearchInput;
