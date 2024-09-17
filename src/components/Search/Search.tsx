import './Search.css';

export const Search = ({ filterRests }: { filterRests: (search: string) => void }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterRests(event.target.value); // Передаём введённое значение в функцию filterRests
  };

  return (
    <div className="search">
      <input
        className="search__input"
        onChange={handleInputChange}
        placeholder="Search for restaurants"
      />
    </div>
  );
};
