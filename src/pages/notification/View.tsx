import { banner2, bannerRank } from "@/assets";
import Slogan from "@/components/slogan";

const data = [
  {
    img: banner2,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    img: banner2,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    img: banner2,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    img: banner2,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    img: banner2,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const imgData = [banner2, banner2, banner2, banner2, banner2];

const Notification = () => {
  return (
    <div>
      <img src={bannerRank} alt="" />
      <div className="py-[54px] px-[111px]">
        <h2 className="text-[#A62823] text-[40px] mb-[28px]">THÔNG TIN</h2>
        <div className="flex gap-[100px]">
          <div className="flex flex-col w-3/4 bg-[#F6F6F6] py-[30px] px-[40px] gap-[30px]">
            {data.map((item, index) => (
              <div
                className="flex border-b-[1px] border-[#707070] border-solid pb-[30px] gap-[20px] cursor-pointer"
                key={index}
              >
                <img src={item.img} className="w-1/3" />
                <div className="flex flex-col gap-[10px]">
                  <h3 className="text-[24px] text-bold">{item.title}</h3>
                  <span>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-1/4 gap-[50px]">
            {imgData.map((item, index) => (
              <img src={item} key={index} className="w-full h-[120px]" />
            ))}
          </div>
        </div>
      </div>
      <Slogan />
    </div>
  );
};

export default Notification;
