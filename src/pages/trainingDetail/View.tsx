import major from "../../utils/majors.json";
import img1 from "../../assets/banner2.png";

const TrainingDetail = () => {
  return (
    <div className="flex p-6 gap-3">
      <div>
        <h1 className="text-[#A62823] font-medium text-[30px] uppercase">
          {major.name}
        </h1>
        <h3 className="my-3">
          <span className="font-medium uppercase">{major.name}</span> có các
          chuyên ngành đào tạo:
        </h3>
        <div className="grid grid-cols-12 grid-rows-4 border-[0.5px] border-solid border-collapse">
          <div className="col-span-3 row-span-2 flex items-center justify-center border-[0.5px] border-solid">
            Tên Ngành/Chuyên ngành
          </div>
          <div className="col-span-3 row-span-2 flex items-center justify-center border-[0.5px] border-solid">
            Mã Ngành/Chuyên ngành (CN)
          </div>
          <div className="col-span-6 flex items-center justify-center border-[0.5px] border-solid">
            Tổ hợp môn Xét tuyển
          </div>
          <div className="col-span-3 flex items-center justify-center border-[0.5px] border-solid">
            Xét tuyển theo kết quả thi THPT
          </div>
          <div className="col-span-3 flex items-center justify-center border-[0.5px] border-solid">
            Xét tuyển theo HỌC BẠ THPT
          </div>
          <div className="col-span-3 row-span-2 flex items-center justify-center border-[0.5px] border-solid">
            {major.name}
          </div>
          <div className="col-span-3 row-span-2 flex items-center justify-center border-[0.5px] border-solid">
            {major.code}
          </div>
          <div className="col-span-3 row-span-2 flex flex-col items-center justify-center border-[0.5px] border-solid">
            {major.basedOnHighSchoolExamResults.map((item, index) => (
              <span key={index}>{item.name}</span>
            ))}
          </div>
          <div className="col-span-3 row-span-2 flex flex-col items-center justify-center border-[0.5px] border-solid">
            {major.basedOnHighSchoolTranscripts.map((item, index) => (
              <span key={index}>{item.name}</span>
            ))}
          </div>
        </div>
        <div className="my-4">
          <h4>Chuyên ngành đào tạo:</h4>
          <span>
            * {major.name} (Mã ngành: {major.code}; Mã chuyên ngành: 302) Điều
            dưỡng viên được xem như là một nghề nghiệp độc lập trong hệ thống y
            tế, hỗ trợ các bác sỹ, dược sỹ, kỹ thuật viên và các nhân viên khác
            trong hệ thống y tế để cung cấp dịch vụ chăm sóc sức khỏe phục vụ
            nhân dân. Tìm hiểu về đào tạo chuyên ngành Điều dưỡng Đa khoa của
            Đại học Duy Tân tại đây: {major.name}.
          </span>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center justify-center text-white bg-[#A62823] p-3 rounded-xl cursor-pointer">
            XÉT HỌC BẠ THPT
          </div>
          <div className="flex items-center justify-center text-white bg-[#A62823] p-3 rounded-xl cursor-pointer">
            XÉT TUYỂN THẲNG
          </div>
          <div className="flex items-center justify-center text-white bg-[#A62823] p-3 rounded-xl cursor-pointer">
            XÉT KẾT QUẢ THI THPT
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <img src={img1} className="h-[120px] w-[500px]" />
        <img src={img1} className="h-[120px] w-[500px]" />
        <img src={img1} className="h-[120px] w-[500px]" />
        <img src={img1} className="h-[120px] w-[500px]" />
        <img src={img1} className="h-[120px] w-[500px]" />
        <img src={img1} className="h-[120px] w-[500px]" />
      </div>
    </div>
  );
};

export default TrainingDetail;
