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

export interface userType {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
  status: "Active" | "Inactive";
}
