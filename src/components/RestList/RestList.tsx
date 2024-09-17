import { Restaurant } from "../../api";
import './RestList.css';
import React from 'react';
import { Rest } from "../Rest/Rest";

interface RestListProps {
  rests: Restaurant[];
  onRatingChange: (id: string, rating: number) => void; // Добавлено для получения функции
}

export const RestList: React.FC<RestListProps> = ({ rests, onRatingChange }) => {
  return (
    <div className="rest-list">
      {rests.map((restaurant) => (
        <Rest 
          key={restaurant.id} 
          id={restaurant.id}
          name={restaurant.name}
          description={restaurant.description}
          raiting={restaurant.raiting}
          url={restaurant.url}
          onRatingChange={onRatingChange} // Передача функции
        />
      ))}
    </div>
  );
};
