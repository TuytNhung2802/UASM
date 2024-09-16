/* eslint-disable @typescript-eslint/no-explicit-any */
const View = ({
  show = false,
  data,
  setShow,
  name,
}: {
  show?: boolean;
  data: any;
  setShow?: () => void;
  name: string;
}) => {
  return (
    <div className="border-b-[1px] border-solid border-black">
      <div
        className="flex justify-between items-center p-2 cursor-pointer"
        onClick={setShow}
      >
        <span className="text-white">{name}</span>
        {show ? (
          <span className="text-white cursor-pointer">-</span>
        ) : (
          <span className="text-white cursor-pointer">+</span>
        )}
      </div>
      {show && (
        <div className="flex flex-col bg-white transition ease-in duration-300">
          {data.map((item: any, index: number) => (
            <div
              key={index}
              className="border-b-[1px] border-solid border-black last:border-b-0 p-2 cursor-pointer hover:bg-[#A62823] hover:text-[white]"
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default View;
