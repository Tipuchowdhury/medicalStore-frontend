export interface medicineTypes {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: {
    name: string;
  };
  seller: {
    name: string;
  };
}
