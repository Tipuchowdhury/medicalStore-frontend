import { userService } from "@/app/service/user.service";
import { Header } from "@/components/header";

const SellerLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default SellerLayout;
