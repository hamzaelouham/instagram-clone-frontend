import type { NextPage } from "next";
import { LockClosedIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD_MUTATION } from "../../utils/mutations";
import toast from "react-hot-toast";
import Link from "next/link";

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading_page, setLoadingPage] = useState(true);

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION);

  useEffect(() => {
    if (router.isReady) {
      if (!token) {
        toast.error("Invalid reset link");
        router.push("/auth/forgot-password");
      }
      setLoadingPage(false);
    }
  }, [router.isReady, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      await resetPassword({
        variables: {
          token: token as string,
          password,
        },
      });
      toast.success("Password updated successfully!");
      router.push("/auth/");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (loading_page) return null;

  return (
    <section className="bg-gray-50 h-screen ">
      <Head>
        <title>Reset Password • Instagram</title>
      </Head>

      <main className=" flex flex-col">
        <div className="bg-white flex items-center sticky h-[60px] top-0 z-10 shadow-sm ">
          <div className="flex items-center flex-row px-[20px] mt-[7px] w-full max-w-[975px]">
            <div className="cursor-pointer justify-start md:justify-center items-center flex flex-grow flex-shrink-0 w-full">
              <Link href="/">
                <img src="/images/logo.png" alt="logo" className="h-[29px]" />
              </Link>
            </div>
          </div>
        </div>

        <div className="contents">
          <div className="bg-white flex flex-col overflow-hidden rounded mx-auto mb-0 mt-[60px] border border-gray-200 max-w-sm p-10">
            <div className="mb-4 flex justify-center items-center">
              <LockClosedIcon className="h-16 w-16" />
            </div>

            <h4 className="font-semibold text-center text-base mb-6">
              Create a Strong Password
            </h4>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="password"
                required
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm py-[12px] px-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <input
                type="password"
                required
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-sm py-[12px] px-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-none"
              />

              <button
                className={`insta-btn w-full bg-blue-500 ${loading ? "opacity-50" : ""}`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ResetPassword;
