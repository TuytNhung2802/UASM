import { LogoDTU1, commaIcon, commaVerseIcon } from "@/assets";

const Slogan = () => {
  return (
    <div className="flex px-[115px] py-[200px] gap-[310px]">
      <img src={LogoDTU1} className="w-[470px] h-[120px]" />
      <div className="relative text-[20px]">
        Đào tạo, nghiên cứu gắn liền với khoa học và công nghệ nhằm tạo ra những
        sinh viên và học viên có lòng yêu nước, có phẩm chất nhân văn mang đậm
        bản sắc Việt Nam, có ý thức sinh hoạt động cộng đồng, có sức khỏe, có
        năng lực và kỹ năng toàn diện, tự tin, năng động, sáng tạo và trở thành
        công dân khởi nghiệp mang tính toàn cầu.
        <img src={commaIcon} className="absolute top-[-60px] left-[-90px]" />
        <img
          src={commaVerseIcon}
          className="absolute bottom-[-60px] right-[-60px]"
        />
      </div>
    </div>
  );
};

export default Slogan;
