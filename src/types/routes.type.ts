export interface Route {
  title: string;
  items: {
    title: string;
    url: string;
  }[];
}



export type Category = {
  id: string;
  name: string;
};

export type Customer = {
  id: string;
  name: string;
  image: string | null;
};

export type Review = {
  id: string;
  rating: number;
  comment: string;
  customerId: string;
  medicineId: string;
  createdAt: string; // ISO date string
  customer: Customer;
};


export type Medicine = {
  id: string;
  name: string;
  description: string | null;
  categoryId: string;
  sellerId: string;
  price: string; 
  stock: number;
  image: string | null;
  isFeatured: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  category: Category;
  reviews: Review[];
};
