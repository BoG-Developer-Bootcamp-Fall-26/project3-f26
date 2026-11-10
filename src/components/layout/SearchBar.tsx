import Image from "next/image";
import searchIcon from "../../../public/images/searchLogo.png";

interface SearchBarProps {
  onChange: (newValue: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onChange, placeholder = "Search" }: SearchBarProps) {
  return (
    <label className="flex w-full max-w-md items-center gap-3 rounded-full border border-gray-400 bg-white px-4 py-2">
      <Image src={searchIcon} alt="" width={18} height={18} />
      <input
        type="search"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
      />
    </label>
  );
}
