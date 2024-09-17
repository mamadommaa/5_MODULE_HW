export const Search = ({ sortRests }: { sortRests: (search: string) => void }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    sortRests(event.target.value); // Передаём введённое значение в функцию sortRests
  };
    return (
        <div>
        <input onChange={handleInputChange}  placeholder="Search for restaurants" />
      </div>
    );
}