/* eslint-disable @typescript-eslint/no-explicit-any */
import SelectLocation from "@/components/select-location";
import "./resultHighschoolForm.css";
import locations from "@/assets/locations";
import { useContext, useEffect, useMemo, useState, useRef } from "react";
import { GlobalContext } from "@/contexts/global-context";
import { toast } from "react-toastify";
import AdmissionService from "@/services/admission";
import { ELEVEL } from "@/utils/enums";

const ResultHighschoolForm = () => {
  const { genders, areas, priorities, subjectBlocks, majors } =
    useContext(GlobalContext);
  const [details, setDetails] = useState<Record<string, string | null>>({
    fullName: null,
    gender: null,
    birthday: null,
    cccd: null,
    phonenumber: null,
    email: null,
    addressToReceiveAdmissionNotice: null,
    area: null,
    priority: null,
    highschoolAddress: null,
    majorId: null,
    subjectOne: null,
    subjectOneScore: null,
    subjectTwo: null,
    subjectTwoScore: null,
    subjectThree: null,
    subjectThreeScore: null,
    subMajorId: null,
  });
  const [targetSubjectBlock, setTargetSubjectBlock] = useState<string | null>(
    null
  );
  const addressToReceiveAdmissionNoticeRef = useRef<{ value: () => string }>(
    null
  );
  const highschoolAddressRef = useRef<{ value: () => string }>(null);
  const [targetLevel, setTargetLevel] = useState<ELEVEL>(ELEVEL.UNIVERSITY);
  const [has, setHas] = useState(false);

  const subjectInBlock: { id: string; name: string }[] = useMemo(
    () =>
      subjectBlocks.find((item) => item.id === (targetSubjectBlock as string))
        ?.subjects || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [targetSubjectBlock]
  );

  useEffect(() => {
    if (subjectInBlock) {
      setDetails((state) => ({
        ...state,
        subjectOne: subjectInBlock[0]?.id,
        subjectTwo: subjectInBlock[1]?.id,
        subjectThree: subjectInBlock[2]?.id,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetSubjectBlock]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeHandler = (name: string, value: any) => {
    setDetails((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const submitHandler = async () => {
    try {
      await AdmissionService.applyApplicationAdmissionRegistration({
        body: {
          ...details,
          addressToReceiveAdmissionNotice: `${addressToReceiveAdmissionNoticeRef.current?.value()}${
            details.addressToReceiveAdmissionNotice
          }`,
          highschoolAddress: `${highschoolAddressRef.current?.value()}${
            details.highschoolAddress
          }`,
        },
      });
      toast.success(
        "Application code is send to your email or phone number, please check it"
      );
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col bg-[#f6f6f6] gap-2 pt-4 px-4">
      <h1 className="text-[#A62823] font-semibold text-3xl">
        ĐĂNG KÝ XÉT TUYỂN BẰNG KẾT QUẢ THI THPT
      </h1>
      <label htmlFor="" className="flex items-center gap-2">
        Bạn đã có đơn xét tuyển chưa?
        <input
          type="checkbox"
          name=""
          id=""
          checked={has}
          onChange={() => setHas((state) => !state)}
        />
      </label>
      {has && (
        <div>
          <p>
            Nếu bạn đã có đơn xét tuyển và muốn cập nhật thông tin, vui lòng
            nhập mã
          </p>
          <input type="text" />
          <button className="border rounded-md bg-[#A62823] text-white p-1 ml-2">
            Xác nhận
          </button>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h2 className="bg-[#A62823] text-white font-semibold text-lg px-4">
          THÔNG TIN HỒ SƠ
        </h2>
        <div className="flex gap-2">
          <label htmlFor="">
            Họ và tên (<span className="text-[#A9161C]">*</span>)
          </label>
          <input
            value={details.fullName || ""}
            type="text"
            onChange={(e) => changeHandler("fullName", e.target.value)}
          />
          {genders.map((item) => (
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                name="gender"
                value={item.id}
                onChange={(e) => changeHandler("gender", e.target.value)}
              />
              <label htmlFor="">{item.name}</label>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <label htmlFor="">
              Ngày sinh (<span className="text-[#A9161C]">*</span>)
            </label>
            <input
              type="date"
              value={details.birthday || ""}
              onChange={(e) => changeHandler("birthday", e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="">
              Số CMND/CCCD (<span className="text-[#A9161C]">*</span>)
            </label>
            <input
              type="text"
              value={details.cccd || ""}
              onChange={(e) => changeHandler("cccd", e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <label htmlFor="">
            Số điện thoại (<span className="text-[#A9161C]">*</span>)
          </label>
          <input
            type="text"
            value={details.phonenumber || ""}
            onChange={(e) => changeHandler("phonenumber", e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="">
            Email (<span className="text-[#A9161C]">*</span>)
          </label>
          <input
            type="email"
            value={details.email || ""}
            onChange={(e) => changeHandler("email", e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="">
            Địa chỉ nhận giấy báo (<span className="text-[#A9161C]">*</span>)
          </label>
          <div className="flex flex-col gap-2 w-full">
            <SelectLocation
              ref={addressToReceiveAdmissionNoticeRef}
              data={
                locations as {
                  code: string;
                  parent_code: string | null;
                  name: string;
                  type: string;
                }[]
              }
              values={{
                city: "",
                district: "",
                ward: "",
              }}
            />
            <div className="flex flex-col gap-2">
              <input type="text" />
              <span>(Nhập đầy đủ số nhà, tên đường, thôn/tổ)</span>
            </div>
          </div>
        </div>
        <div className="flex">
          <label htmlFor="">
            Nơi học THPT (<span className="text-[#A9161C]">*</span>)
          </label>
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-1 gap-2">
              <SelectLocation
                ref={highschoolAddressRef}
                data={
                  locations as {
                    code: string;
                    parent_code: string | null;
                    name: string;
                    type: string;
                  }[]
                }
                values={{
                  city: "",
                  district: "",
                  ward: "",
                }}
              />
            </div>
            <div className="flex flex-1 gap-2">
              <label htmlFor="">
                Trường THPT (<span className="text-[#A9161C]">*</span>)
              </label>
              <input type="text" name="" id="" className="w-full" />
            </div>
            <span>
              (Ghi chú: nếu là thí sinh tự do thì bạn chọn trường thpt đã tốt
              nghiệp trước đó.)
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1 gap-2">
            <label htmlFor="">
              Khu vực (<span className="text-[#A9161C]">*</span>)
            </label>
            <select
              value={details.area || ""}
              className="flex-1"
              onChange={(e) => changeHandler("area", e.target.value)}
            >
              <option value="">Chọn khu vực</option>
              {areas.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-1 gap-2">
            <label htmlFor="">
              Đối tượng (<span className="text-[#A9161C]">*</span>)
            </label>
            <select
              value={details.priority || ""}
              className="flex-1"
              onChange={(e) => changeHandler("priority", e.target.value)}
            >
              <option value="">Chọn đối tượng ưu tiên</option>
              {priorities.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="bg-[#A62823] text-white font-semibold text-lg px-4">
          THÔNG TIN ĐĂNG KÝ
        </h2>
        <div className="flex">
          <label htmlFor="">
            Bậc học (<span className="text-[#A9161C]">*</span>)
          </label>
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-1 gap-2">
              <select
                className="flex-1"
                onChange={(e) => setTargetLevel(e.target.value as ELEVEL)}
                value={targetLevel}
              >
                <option value="">Chọn bậc học</option>
                {Object.keys(ELEVEL).map((item, index) => (
                  <option
                    key={index}
                    value={ELEVEL[item as keyof typeof ELEVEL]}
                  >
                    {ELEVEL[item as keyof typeof ELEVEL]}
                  </option>
                ))}
              </select>
              <div className="flex flex-1 gap-2">
                <label htmlFor="">
                  Ngành (<span className="text-[#A9161C]">*</span>)
                </label>
                <select
                  className="flex-1"
                  onChange={(e) => changeHandler("majorId", e.target.value)}
                >
                  <option value="">Chọn ngành</option>
                  {majors
                    .filter((item) => item.educationalLevel === targetLevel)
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-1 gap-2">
                <label htmlFor="">
                  Chuyên ngành (<span className="text-[#A9161C]">*</span>)
                </label>
                <select
                  className="flex-1"
                  onChange={(e) => changeHandler("subMajorId", e.target.value)}
                >
                  <option value="">Chọn chuyên ngành</option>
                  {majors
                    .find((item) => item.id === details.majorId)
                    ?.subMajors?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <span>
              (Ghi chú: Thí sinh được phép chuyển đổi ngành phù hợp sau 1 Học kỳ
              đến 1 Năm học theo quy chế của Bộ giáo dục và Đào tạo..)
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <label htmlFor="">
            Khối môn học (<span className="text-[#A9161C]">*</span>)
          </label>
          <div className="flex flex-col gap-2">
            <select
              value={targetSubjectBlock || ""}
              onChange={(e) => setTargetSubjectBlock(e.target.value)}
            >
              <option value="">Chọn khối môn học</option>
              {majors
                .find((item) => item.id === details.majorId)
                ?.basedOnHighSchoolExamResults?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              {majors
                .find((item) => item.id === details.majorId)
                ?.basedOnHighSchoolTranscripts?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <span>
              Bạn vui lòng nhập kết quả học tập các môn tương ứng bên dưới:
            </span>
          </div>
        </div>
        <table>
          <tr>
            <td>Tổ hợp môn xét tuyển</td>
            <td>Điểm trung bình cả năm lớp 12</td>
          </tr>
          {subjectInBlock?.map((item, index) => (
            <tr>
              <td>
                <input type="text" value={item.name || ""} disabled />
              </td>
              <td>
                <input
                  type="number"
                  onChange={(e) => {
                    switch (index) {
                      case 0:
                        changeHandler("subjectOneScore", e.target.value);
                        break;
                      case 1:
                        changeHandler("subjectTwoScore", e.target.value);
                        break;
                      case 2:
                        changeHandler("subjectThreeScore", e.target.value);
                        break;
                    }
                  }}
                />
              </td>
            </tr>
          ))}
        </table>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Đã tốt nghiệp THPT</label>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">
            Bạn cũng có mong muốn Du học Nước ngoài hoặc Du học tại chỗ.
          </label>
        </div>
        <div className="flex gap-7">
          <span className="w-1/4">
            Tập tin đính kèm (<span className="text-[#A9161C]">*</span>) (Ảnh
            kết quả thi THPT (Chứng nhận TN tạm thời/ Phiếu điểm))
          </span>
          <div className="">
            <input type="file" name="" id="" />
          </div>
          <div className="flex gap-2">
            <span>
              Mã bảo vệ (<span className="text-[#A9161C]">*</span>)
            </span>
            <div className="flex flex-col gap-2">
              <textarea name="" id=""></textarea>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>

      <button
        className="bg-[#A9161C] px-4 py-2 text-white w-1/5 my-4 mx-auto"
        onClick={submitHandler}
      >
        ĐĂNG KÝ XÉT TUYỂN
      </button>
    </div>
  );
};

export default ResultHighschoolForm;
