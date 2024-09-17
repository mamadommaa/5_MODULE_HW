import { useMutation, useQuery } from "@tanstack/react-query";
import { getRestaurants, updateRestaurantRating } from "../../api";
import { RestList } from "../RestList/RestList";
import { Search } from "../Search/Search";
import { useState, useEffect } from "react";

// Определение типа ресторана
interface Restaurant {
  id: string;
  name: string;
  description: string;
  raiting: number;
  url: string;
}

export const Main = () => {
  const { data, status } = useQuery<Restaurant[]>({
    queryFn: () => getRestaurants(),
    queryKey: ["rest"]
  });

  const starMutation = useMutation({
    mutationFn: ({ id, raiting }: { id: string; raiting: number }) => updateRestaurantRating({ id, raiting })
  });

  const onRatingChange = (id: string, raiting: number) => {
    starMutation.mutate({ id, raiting });
  };

  const [temporaryRests, setTemporaryRests] = useState<Restaurant[]>(data || []);

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

  if (status === "pending") return  <span>Загрузка</span>;
  if (status === "error") return <span>Ошибка</span>;
  if (status === "success") {
    return (
      <div>
        <Search sortRests={sortRests} />
        <RestList rests={temporaryRests} onRatingChange={onRatingChange} />
      </div>
    );
  }
};
