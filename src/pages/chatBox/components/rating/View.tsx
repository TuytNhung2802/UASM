/* eslint-disable @typescript-eslint/no-unused-vars */
import { bad, fine, good, great, verybad, verygood } from "@/assets";
import UserService from "@/services/users";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const scores = [
  {
    key: "very_bad",
    name: "Rất tệ",
    value: 0,
    icon: verybad,
  },
  {
    key: "bad",
    name: "Tệ",
    value: 1,
    icon: bad,
  },
  {
    key: "fine",
    name: "Ổn",
    value: 2,
    icon: fine,
  },
  {
    key: "good",
    name: "Tốt",
    value: 3,
    icon: good,
  },
  {
    key: "very_good",
    name: "Rất tốt",
    value: 4,
    icon: verygood,
  },
  {
    key: "great",
    name: "Tuyệt",
    value: 5,
    icon: great,
  },
];

const View = ({
  id,
  close,
}: {
  id: string | null;
  close: (e?: "reset") => void;
}) => {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const ratingHandler = async () => {
    if (!loading) {
      try {
        setLoading(true);
        if (score !== null && id) {
          await UserService.giveScore({
            params: { id },
            query: {
              score,
            },
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        close("reset");
      }
    }
  };

  return (
    <div className="absolute w-3/5 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg py-10 px-14 shadow-2xl shadow-[#A62823]">
      <button className="absolute top-2 right-2" onClick={() => close()}>
        X
      </button>
      <div className="text-center mb-5">
        <h1 className="font-bold text-[#A62823] text-lg">
          Bạn vui lòng đánh giá cuộc trò chuyện
        </h1>
        <p>
          Sự đánh giá của bạn là cơ sở để chúng tôi cải thiện trong tương lai
        </p>
      </div>
      <div className="grid grid-cols-6 gap-2 mb-10">
        {scores.map((item) => (
          <button
            key={item.key}
            className={twMerge(
              "rounded-lg hover:scale-150 transition-all duration-300",
              score === item.value &&
                "border border-[#A62823] scale-150 bg-white"
            )}
            onClick={() => {
              setScore(item.value === score ? null : item.value);
            }}
          >
            <img src={item.icon} alt={item.key} />
            <p className="text-center">{item.name}</p>
          </button>
        ))}
      </div>
      <div className="flex justify-center mb-2">
        <button
          className="rounded-md bg-[#A62823] w-20 py-2 text-white"
          onClick={ratingHandler}
          disabled={loading}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default View;
