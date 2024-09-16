// import data from "../../utils/data-member.json";
import imgB from "../../assets/banner2.png";
import { useEffect, useState } from "react";
import MemberSchoolService from "@/services/member-schools";
import type { MemberSchool as MemberSchoolType } from "@/utils/types";
import MemberSchool from "./member-school";

const Training = () => {
  const [memberschools, setMemberSchools] = useState<Array<MemberSchoolType>>(
    []
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await MemberSchoolService.getMemberSchools();
    if (res) {
      setMemberSchools(res);
    }
  };

  return (
    <div className="px-20 py-4 bg-[#f6f6f6] grid grid-cols-12 gap-4">
      <div className="col-span-8">
        <h1 className="font-medium text-[#A62823]">NGÀNH NGHỀ ĐÀO TẠO</h1>
        <div className="gap-3 grid grid-cols-2 mt-2">
          {memberschools.map((item) => (
            <MemberSchool key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 col-span-4">
        <img className="w-full object-cover" src={imgB} alt="" />
        <img className="w-full object-cover" src={imgB} alt="" />
        <img className="w-full object-cover" src={imgB} alt="" />
        <img className="w-full object-cover" src={imgB} alt="" />
        <img className="w-full object-cover" src={imgB} alt="" />
        <img className="w-full object-cover" src={imgB} alt="" />
        <img className="w-full object-cover" src={imgB} alt="" />
        <img className="w-full object-cover" src={imgB} alt="" />
        <img className="w-full object-cover" src={imgB} alt="" />
        <img className="w-full object-cover" src={imgB} alt="" />
        <img className="w-full object-cover" src={imgB} alt="" />
      </div>
    </div>
  );
};

export default Training;
