import { useMutation, useQuery } from "@tanstack/react-query";
import { getRestaurants, RestaurantList, updateRestaurantRating } from "../../api";
import { RestList } from "../RestList/RestList";
import { Search } from "../Search/Search";
import { useState, useEffect } from "react";

export const Main = () => {

  const RestaurantQuery = useQuery<RestaurantList>({
    queryFn: () => getRestaurants(),
    queryKey: ["rest"]
  });

  const starMutation = useMutation({
    mutationFn: ({ id, raiting }: { id: string; raiting: number }) => updateRestaurantRating({ id, raiting })
  });

  const onRatingChange = (id: string, raiting: number) => {
    starMutation.mutate({ id, raiting });
  };

  const [temporaryRests, setTemporaryRests] = useState<RestaurantList>(RestaurantQuery.data || []);

  useEffect(() => {
    if (RestaurantQuery.data) {
      setTemporaryRests(RestaurantQuery.data);
    }
  }, [RestaurantQuery.data]);

  const filterRests = (search: string) => {
    if (!temporaryRests) return;
    const searchLower = search.toLowerCase();

    // Фильтрация списка ресторанов по имени
    const filteredRests = RestaurantQuery.data?.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchLower)
    );

    setTemporaryRests(filteredRests || []);
  };

  switch(RestaurantQuery.status) {
    case "pending": 
      return <span>Загрузка</span>;
    case "error":
      return <span>Ошибка</span>;
    case "success":
      return (
        <div>
          <Search filterRests={filterRests} />
          <RestList rests={temporaryRests} onRatingChange={onRatingChange} />
        </div>
      );
  }
};
