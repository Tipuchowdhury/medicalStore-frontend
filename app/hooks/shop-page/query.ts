import { createMedicineType } from "@/types/allTypes";

export const getMedicines = async (params: {
  category?: string | null;
  //   sort: string;
  maxPrice?: string | null;
  //   page?: number;
}) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/medicine`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, value);
      }
    });
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
};

export const getAllCaterogy = async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`);
  return result.json();
};

export const getMedicineByID = async (id: string) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/medicine/${id}`,
  );
  return result.json();
};

export const createOrder = async (data: createMedicineType) => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return result.json();
  } catch (error) {
    console.log("error");
    throw error;
  }
};

export const getAllMedicineBySeller = async () => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/medicine/`,
  );
  return result.json();
};

export const getSellerOrder = async () => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/seller`,
  );
  return result.json();
};
