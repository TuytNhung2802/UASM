import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";

const View = () => {
  return (
    <div>
      <Navbar />
      <section className="w-full m-auto">
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};

export default View;
