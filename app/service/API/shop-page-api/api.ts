import {
  getAllCaterogy,
  getMedicineByID,
  getMedicines,
} from "@/app/hooks/shop-page/query";
import { useQuery } from "@tanstack/react-query";

export const useGetMedicines = (params: {
  category?: string | null;
  // sort?: string;
  maxPrice: string | null;
  //   page?: number;
}) => {
  console.log(params);
  return useQuery({
    queryKey: ["medicines", params],
    queryFn: () => getMedicines(params),
    // keepPreviousData: true,
  });
};

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ["all-category"],
    queryFn: () => getAllCaterogy(),
  });
};

export const useGetMedicineById = (id: string) => {
  return useQuery({
    queryKey: ["medicine-by-id", id],
    queryFn: () => getMedicineByID(id),
  });
};
