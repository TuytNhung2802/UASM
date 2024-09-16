import { LogoDTU1, clockIcon, locationIcon, dotEmpty, dotRed } from "@/assets";
import { navbarItems, socialIcons } from "@/contains";
import { Link, useLocation, useNavigate } from "react-router-dom";

const View = () => {
  const pathName = useLocation().pathname;
  const navigation = useNavigate();

  return (
    <div className="">
      <div className="h-[58px] flex place-content-around items-center bg-[#181818]">
        <div className="flex items-center text-white gap-2 text-sm">
          <img src={clockIcon} />
          Thứ hai - Thứ sáu 8h - 21h
        </div>
        <div className="flex items-center text-white gap-2 text-sm">
          <img src={locationIcon} />
          254 Nguyễn Văn Linh - TP Đà Nẵng
        </div>
        <div className="flex items-center gap-2">
          {socialIcons.map((item, index) => (
            <img src={item.icon} key={index} className="cursor-pointer" />
          ))}
        </div>
      </div>
      <div className="bg-[#303030] h-28 flex items-center">
        <div className=" text-white flex items-center gap-10 w-3/4 m-auto justify-between">
          <img src={LogoDTU1} className="cursor-pointer" />
          <div className="flex gap-[30px]">
            {navbarItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 cursor-pointer"
              >
                {item.path === pathName ? (
                  <img src={dotRed} />
                ) : (
                  <img src={dotEmpty} />
                )}
                <Link
                  to={item.path}
                  className={`text-sm ${
                    item.path === pathName ? "text-[#A62823]" : ""
                  }`}
                >
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-0 text-sm">
          <button
            type="button"
            className="rounded-l-[16px] bg-[#A62823] h-[42px] flex items-center px-[10px] cursor-pointer text-white"
            onClick={() => navigation("/login")}
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
