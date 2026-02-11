import React,{useContext} from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {

    const {food_list, searchQuery}=useContext(StoreContext)

    const normalizedQuery = (searchQuery || "").trim().toLowerCase();
    const filteredFoodList = food_list.filter((item) => {
      // If user is searching, show matches across all categories.
      if (normalizedQuery) {
        const name = (item?.name ?? "").toLowerCase();
        const description = (item?.description ?? "").toLowerCase();
        return name.includes(normalizedQuery) || description.includes(normalizedQuery);
      }

      const matchesCategory = category === "All" || category === item.category;
      if (!matchesCategory) return false;
      const name = (item?.name ?? "").toLowerCase();
      const description = (item?.description ?? "").toLowerCase();
      return true;
    });

  return (
    <div className='food-display' id='food-display'>
        <h2>Top Dishes Near you</h2>
        <div className="food-display-list">
          {filteredFoodList.map((item)=> (
            <FoodItem key={item._id} id={item._id} name={item.name} description={item.description} price={item.price}  image={item.image}/>
          ))}
        </div>

        {filteredFoodList.length === 0 && (
          <p className="food-display-empty">No matching menu items found.</p>
        )}
      
    </div>
  );
}

export default FoodDisplay;
