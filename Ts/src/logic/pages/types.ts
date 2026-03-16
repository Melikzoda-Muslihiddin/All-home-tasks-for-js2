export interface Product {
  id: number;
  name: string;
  status: boolean;
  avatar: string;
  category: string;
 
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}


export interface CartItem {
  productId: Id;
  quantity: number;
}



export type Id = string;
