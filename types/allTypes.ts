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

export interface createMedicineType {
  items: [
    {
      medicineId: string;
      quantity: number;
    },
  ];
}
