import { Header } from "@/components/header";
import { userService } from "../service/user.service";

const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await userService.getSession();
  console.log(data);
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default CustomerLayout;
