import { getRestaurants } from "../../api";
import { RestList } from "../RestList/RestList";
import { Search } from "../Search/Search";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export const Main = () => {
  const { data, status } = useQuery({
    queryFn: () => getRestaurants(),
    queryKey: ["rest"]
  });

  const [temporaryRests, setTemporaryRests] = useState(data || []); 


  useEffect(() => {
    if (data) {
      setTemporaryRests(data);
    }
  }, [data]);

  const sortRests = (search: string) => {
    if (!temporaryRests) return;
    const searchLower = search.toLowerCase();

    const sortedRests = [...temporaryRests].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      const searchTerm = searchLower;

      const matchesA = nameA.includes(searchTerm);
      const matchesB = nameB.includes(searchTerm);

      if (matchesA && !matchesB) return -1;
      if (!matchesA && matchesB) return 1;
      return 0;
    });

    setTemporaryRests(sortedRests);
  };

  console.log(temporaryRests);      

  if (status === "pending") return <span>Загрузка</span>;
  if (status === "error") return <span>Ошибка</span>;

  return (
    <div>
      <Search sortRests={sortRests} />
      <RestList  /> {/* Передаем временные рестораны */}
    </div>
  );
};
