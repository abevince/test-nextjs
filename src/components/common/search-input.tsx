import { Search } from 'lucide-react'

const SearchInput = ({ onSearch }: { onSearch: (search: string) => void }) => {
  return (
    <div className="lg:w-1/3 w-full grid grid-cols-1">
      <input
        name="search"
        type="text"
        placeholder="Search"
        className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-400 sm:pl-9 sm:text-sm/6"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
      />
    </div>
  )
}

export default SearchInput
