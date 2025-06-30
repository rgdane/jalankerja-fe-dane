"use client";
import "@ant-design/v5-patch-for-react-19";
import ThemeSwitch from "@/components/fragments/ThemeSwitch";
import { LoginForm } from "@/features/auth/components/LoginForm";

const Login = () => {
  return (
    <>
      <div className="App bg-gray-100 dark:bg-[#262626]  min-h-screen transition-colors duration-200">
        <div className="flex flex-col bg-[url('/bg.png')] w-full bg-cover h-screen">
          <div className="fixed px-12 py-4 flex w-full justify-end">
            <ThemeSwitch />
          </div>
          <div className="justify-center items-center flex flex-col gap-y-16 h-screen">
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="text-4xl text-gray-900 dark:text-white transition-colors duration-200">
                Jalan Kerja
              </h1>
              <p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
                Ant Design is the most influential web design specification in
                Xihu district
              </p>
            </div>
            <div className="w-[30em]">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
