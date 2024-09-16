import { arrowRightTop } from "@/assets";
import { Link } from "react-router-dom";

const View = ({
  item,
}: {
  item: { icon: string; text: string; path: string };
}) => {
  return (
    <Link
      to={item.path}
      className="bg-[#A62823] h-[111px] w-[320px] p-[7px] flex items-center rounded-[13px] gap-[10px]"
    >
      <div className="bg-white flex flex-1 items-center rounded-[13px] h-[100px] py-[20px] px-[5px]">
        <img src={item.icon} />
        <span className="text-[#A62823] text-sm">{item.text}</span>
      </div>
      <img src={arrowRightTop} className="w-[30px] h-[30px]" />
    </Link>
  );
};

export default View;
