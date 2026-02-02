import { userService } from "@/app/service/user.service";
import { Header } from "@/components/header";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  //   const { data } = await userService.getSession();
  //   const userInfo = data?.user;
  //   const userRole = userInfo?.role;
  //   const isLoggedIn = data?.session ? true : false;

  //   console.log("admin session data:", data);
  return (
    <div>
      {/* <Header role={userRole} isLoggedIn={isLoggedIn} /> */}
      <Header />
      {children}
    </div>
  );
};

export default AdminLayout;
