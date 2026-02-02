import { userService } from "@/app/service/user.service";
import { Header } from "@/components/header";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await userService.getSession();
  console.log(data);
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default AdminLayout;
