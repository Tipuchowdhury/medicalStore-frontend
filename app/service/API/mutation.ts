import { createOrder } from "@/app/hooks/shop-page/query";
import { createMedicineType } from "@/types/allTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export function useCreateOrderMutation() {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: createMedicineType) => createOrder(data),
    onError: () => {
      console.log("errroooooooooooooooo");
      toast.error("Order Creation Failed");
    },
    onSuccess: () => {
      console.log("Successfully created order");
      toast.success("Successfully created order");
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("Error creating order");
      } else {
        console.log("Order created successfully");

        // await queryClient.invalidateQueries({ queryKey: ["create-order"] });
      }
    },
  });
}
