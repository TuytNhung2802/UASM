/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import imgB from "../../../assets/banner2.png";
import Level from "./components/level";

const View = ({ item }: { item: any }) => {
  const [showLevel, setShowLevel] = useState({
    university: false,
    after_university: false,
  });

  const changeShow = (name: "university" | "after_university") => {
    setShowLevel((state) => ({
      ...state,
      [name]: !state[name],
    }));
  };

  const university = useMemo(() => {
    return item.majors?.filter((i: any) => i.educationalLevel === "university");
  }, [item]);

  const afterUniversity = useMemo(() => {
    return item.majors?.filter(
      (i: any) => i.educationalLevel === "after_university"
    );
  }, [item]);

  return (
    <div key={item.id} className="bg-white h-fit">
      <div className="p-2 text-right">
        <h2 className="text-[#A62823]">{item.name}</h2>
        <a href={item.link} className="text-[#A62823] underline">
          {item.link}
        </a>
      </div>
      <img src={imgB} className="h-56 w-full object-cover" />
      <div className="flex flex-col bg-[#A62823] overflow-hidden">
        {item.university && (
          <Level
            name="ĐẠI HỌC"
            data={university}
            show={showLevel.university}
            setShow={() => changeShow("university")}
          />
        )}
        {item.afterUniversity && (
          <Level
            name="SAU ĐẠI HỌC"
            data={afterUniversity}
            show={showLevel.after_university}
            setShow={() => changeShow("after_university")}
          />
        )}
      </div>
    </div>
  );
};

export default View;
