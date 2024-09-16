import { User } from "@/utils/types";
import { twMerge } from "tailwind-merge";

const View = ({ data, active = false }: { data: User; active?: boolean }) => {
  return (
    <button
      className={twMerge(
        "rounded-md w-full p-3 flex gap-2 items-center border border-white hover:bg-[#A62823]",
        active ? "bg-[#A62823]" : ""
      )}
    >
      <img src={""} alt="" />
      <p className="truncate">{data.fullName}</p>
    </button>
  );
};

export default View;
