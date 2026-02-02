import { Header } from "@/components/header";
import { userService } from "../service/user.service";

const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
  // const { data } = await userService.getSession();
  // const userInfo = data?.user;
  // const userRole = userInfo?.role;
  // const isLoggedIn = data?.session ? true : false;

  // console.log("Customer session data:", data);
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default CustomerLayout;
