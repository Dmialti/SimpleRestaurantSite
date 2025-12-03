import type Dish from "./dish.type";

export default interface Category {
  id: number;
  name: string;
  dishes: Dish[];
}
