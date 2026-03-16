import { products } from "../types.js";
import { renderCards } from "./dom.js";
const gamingLaptops = products.filter(p => p.category === "gaming");
renderCards(gamingLaptops);
