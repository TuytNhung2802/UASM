import {
  LogoDTU1,
  eyeIcon,
  gmailLogo,
  lockIcon,
  lockIconRed,
  logoDTU3,
  userIcon,
  userIconRed,
} from "@/assets";
import "./login.css";
import { useRef } from "react";

const Login = () => {
  const userIconRef = useRef<HTMLImageElement | null>(null);
  const lockIconRef = useRef<HTMLImageElement | null>(null);

  const handleUsernameFocus = () => {
    if (userIconRef.current) {
      userIconRef.current.src = userIconRed;
    }
  };

  const handleUsernameBlur = () => {
    if (userIconRef.current) {
      userIconRef.current.src = userIcon;
    }
  };

  const handlePasswordFocus = () => {
    if (lockIconRef.current) {
      lockIconRef.current.src = lockIconRed;
    }
  };

  const handlePasswordBlur = () => {
    if (lockIconRef.current) {
      lockIconRef.current.src = lockIcon;
    }
  };
  return (
    <div className="bg-[#2e2e2e] flex h-screen items-center justify-center">
      <div className="flex w-4/5 rounded-[20px] overflow-hidden">
        <div className="w-1/2 bg-[#bcbcbc] p-[30px] flex flex-col gap-[30px] relative">
          <img src={LogoDTU1} alt="" className="w-3/5" />
          <h1 className="text-[#A62823] text-[30px] font-semibold">
            Đăng nhập
          </h1>
          <div className="flex flex-col gap-[20px]">
            <div className="rounded-[20px] bg-white p-[18px] flex gap-[10px] items-center border-solid border-[1px] border-transparent focus-within:border-[#D75F5A] focus-within:caret-[#D75F5A]">
              <img
                src={userIcon}
                ref={userIconRef}
                className="w-[18px] h-[18px]"
              />
              <input
                type="text"
                name="username"
                placeholder="Tên tài khoản hoặc gmail"
                className="flex-1 outline-none"
                onFocus={handleUsernameFocus}
                onBlur={handleUsernameBlur}
              />
            </div>
            <div className="rounded-[20px] bg-white p-[18px] flex gap-[10px] items-center border-solid border-[1px] border-transparent focus-within:border-[#D75F5A] focus-within:caret-[#D75F5A]">
              <img
                src={lockIcon}
                ref={lockIconRef}
                className="w-[18px] h-[18px]"
              />
              <input
                type="text"
                name="username"
                placeholder="Mật khẩu"
                className="flex-1 outline-none"
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
              <img src={eyeIcon} className="w-[18px] h-[18px]" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-[10px]">
              <input type="checkbox" name="checkPassword" id="checkPassword" />
              <label htmlFor="checkPassword">Ghi nhớ đăng nhập</label>
            </div>
            <span className="cursor-pointer">Quên mật khẩu?</span>
          </div>

          <div className="flex flex-col gap-[20px]">
            <div className="bg-[#A62823D9] w-4/5 m-auto flex items-center justify-center text-white py-[15px] rounded-[12px] cursor-pointer">
              Đăng nhập
            </div>
            <span>
              Chưa có tài khoản?{" "}
              <span className="text-[#A62823] cursor-pointer">
                Đăng ký ngay
              </span>
            </span>
            <div className="flex gap-[20px]">
              <img src={logoDTU3} className="w-[100px] h-[50px]" />
              <div className="flex items-end gap-[10px]">
                <img src={gmailLogo} className="w-[50px] h-[50px]" />
                <span className="text-[#A62823]">@.DTU.EDU.VN</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-0 h-1/2 border-solid border-l-[50px] border-l-transparent border-b-[329px] border-b-[#A62823]"></div>
        </div>
        <div className="w-1/2 bg-[#A62823] flex items-center justify-center relative">
          <img src={LogoDTU1} className="w-1/2" />
          <div className="absolute top-0 left-0 w-0 h-1/2 border-solid border-r-[50px] border-r-transparent border-t-[329px] border-t-[#bcbcbc]"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
