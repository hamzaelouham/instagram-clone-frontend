import type { NextPage } from "next";
import { LockClosedIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

const ForgotPassword: NextPage = () => {
  const [input, setInput] = useState<string>("");
  const [float, setFloat] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  //   @ts-ignore
  const onInputChange = (e) => {
    setInput(e.target.value);
    setFloat(true);
    setActive(true);
  };

  useEffect(() => {
    if (input === "") {
      setFloat(false);
      setActive(false);
    }
  }, [input]);

  return (
    <section className="bg-gray-50 h-screen ">
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" flex flex-col">
        {/* header */}
        <div className="bg-white flex items-center sticky  h-[60px]  top-0 z-10 shadow-sm ">
          <div className="flex  items-center flex-row  px-[20px] mt-[7px]  w-full max-w-[975px]">
            <div className="cursor-pointer justify-start md:justify-center items-center flex flex-grow flex-shrink-0  w-full">
              <img src="/images/logo.png" alt="logo" className="h-[29px]" />
            </div>
            <div className="flex-grow flex-shrink-0">
              <div className="flex pl-6 flex-row whitespace-nowrap"></div>
            </div>
          </div>
        </div>
        {/* contents */}
        <div className="contents">
          <div className="bg-white flex flex-col overflow-hidden rounded mx-auto mb-0 mt-[60px] border border-gray-200 max-w-sm">
            <div className="mt-6 mb-4 flex justify-center items-center">
              <LockClosedIcon className="h-24 w-24" />
            </div>
            <div className="mx-11 mb-4 text-center">
              <h4 className="font-semibold text-base">
                Problèmes de connexion ?
              </h4>
            </div>
            <div className="mx-11 mb-4 text-center">
              <p className="text-justify  text-xs text-gray-400 font-normal">
                Entrez votre adresse e-mail, votre numéro de téléphone ou votre
                nom d’utilisateur, et nous vous enverrons un lien pour récupérer
                votre compte.
              </p>
            </div>
            <div className="mx-11 mb-4">
              <form>
                <label
                  htmlFor="forgetpassword"
                  className="flex flex-grow items-center justify-between pr-2 relative border border-gray-200 rounded-md "
                >
                  <input
                    type="text"
                    onChange={(e) => onInputChange(e)}
                    value={input}
                    name="forgetpassword"
                    className="w-full text-sm py-[9px] px-1 border-none focus:border focus:ring-0"
                  />
                  <span
                    className={`${
                      float && "float-label"
                    }  absolute left-0 right-0 pointer-events-none text-[14px] font-normal mx-2 my-1 whitespace-nowrap overflow-hidden text-gray-400`}
                  >
                    E-mail, téléphone ou nom d’utilisateur
                  </span>
                </label>
              </form>
            </div>
            <div className="mx-11 mb-4 flex flex-col">
              <button
                className={`insta-btn w-full ${active ? "acive-btn" : ""}`}
                type="submit"
              >
                Submit
              </button>
              <p className="text-xs text-center font-light mt-3 text-blue-900">
                Vous ne parvenez pas à réinitialiser votre mot de passe ?
              </p>
            </div>

            <div className="flex flex-row justify-center items-center mx-11 my-4 ">
              <div className="flex-grow flex-shrink h-[1px] relative bg-gray-300"></div>
              <div className="text-gray-400 font-semibold mx-4">OR</div>
              <div className="flex-grow flex-shrink h-[1px] relative bg-gray-300"></div>
            </div>
            <div className="text-center font-medium text-sm text-color-black mx-11 mb-4 ">
              <Link href="/auth/register">Créer un compte</Link>
            </div>
            <div className="bg-gray-50 mt-16 h-11 border border-gray-300  font-medium text-sm text-center  text-color-black flex items-center justify-center">
              <Link href="/auth/"> Back to login</Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ForgotPassword;
