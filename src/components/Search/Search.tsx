import './Search.css'
export const Search = ({ sortRests }: { sortRests: (search: string) => void }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    sortRests(event.target.value); // Передаём введённое значение в функцию sortRests
  };
    return (
        <div className="search">
        <input  className='search__input' onChange={handleInputChange}  placeholder="Search for restaurants" />
      </div>
    );
}