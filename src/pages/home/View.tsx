import {
  banner,
  banner2,
  bannerCHTG,
  bannerCSVC,
  bannerTNHN,
  bannerTuyenSinh,
} from "@/assets";
import Slogan from "@/components/slogan";
import {
  chuongTrinhHocBtn,
  chuongTrinhQuocTeItems,
  logoArr,
  navigationItems,
  thongTinTuyenSinh,
} from "@/contains";
import { useState } from "react";
import Module from "./components/module";

const View = () => {
  const [studyProgram, setStudyProgram] = useState("international");

  return (
    <div className="">
      {/* Banner */}
      <img src={banner} alt="" />

      {/* Navigation */}
      <div className="bg-[#000842]">
        <div className="flex h-[194px] items-center gap-5 w-5/6 m-auto">
          {navigationItems.map((item, index) => (
            <Module key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Thong tin tuyen sinh */}
      <div className="flex gap-[10px] px-[80px] py-[26px] h-[520px]">
        <div className="flex bg-[#A62823]">
          <img src={bannerTuyenSinh} alt="" className="w-1/3" />
          <div className="flex flex-col pt-[20px] px-[20px] gap-[20px]">
            <h2 className="text-[#F9AB1D] text-[24px]">
              THÔNG TIN TUYỂN SINH 2023
            </h2>
            <div className="flex flex-col text-white pl-[5px] gap-[15px]">
              {thongTinTuyenSinh.map((item, index) => (
                <span key={index}>{item.text}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-[10px]">
          <img src={bannerCSVC} alt="" className="w-1/3" />
          <div className="flex flex-col gap-[10px]">
            <img src={bannerCHTG} alt="" className="flex-1" />
            <img src={bannerTNHN} alt="" className="flex-1" />
          </div>
        </div>
      </div>

      {/* Chuong trinh hoc */}
      <div className="bg-[#D9D9D9] pt-[12px]">
        <div className="flex items-center gap-[10px]">
          <hr className="flex-1" />
          <div className="flex items-center">
            {chuongTrinhHocBtn.map((item, index) => (
              <div
                key={index}
                className={
                  "flex cursor-pointer px-[52px] py-[20px] items-center justify-center  rounded-[11px] " +
                  (studyProgram === item.state ? "bg-[#A62823] text-white" : "")
                }
                onClick={() => setStudyProgram(item.state)}
              >
                {item.text}
              </div>
            ))}
          </div>
          <hr className="flex-1" />
        </div>
        <div className="flex py-[30px] gap-[43px] px-[95px]">
          <img src={banner2} className="w-1/2" />
          <div className="">
            <div className="flex flex-col gap-[30px]">
              {chuongTrinhQuocTeItems.map((item, index) => (
                <div className="" key={index}>
                  <span className="text-[#282828] mb-[30px] block cursor-pointer">
                    {item.text}
                  </span>
                  <hr />
                </div>
              ))}
            </div>
            <div className="flex gap-[10px] mt-[10px]">
              {logoArr.map((item, index) => (
                <img src={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Slogan />
    </div>
  );
};

export default View;
