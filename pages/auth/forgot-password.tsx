import type { NextPage } from 'next';
import { LockClosedIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useMutation } from '@apollo/client';
import { REQUEST_PASSWORD_RESET } from '../../utils/mutations';
import toast from 'react-hot-toast';

const ForgotPassword: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [float, setFloat] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [requestReset, { loading }] = useMutation(REQUEST_PASSWORD_RESET);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };

  useEffect(() => {
    if (email === '') {
      setFloat(false);
      setActive(false);
    } else {
      setFloat(true);
      setActive(true);
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await requestReset({ variables: { email } });
      setSubmitted(true);
      toast.success('Reset link sent!');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <section className="bg-gray-50 h-screen ">
      <Head>
        <title>Forgot Password • Instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" flex flex-col">
        {/* header */}
        <div className="bg-white flex items-center sticky  h-[60px]  top-0 z-10 shadow-sm ">
          <div className="flex  items-center flex-row  px-[20px] mt-[7px]  w-full max-w-[975px]">
            <div className="cursor-pointer justify-start md:justify-center items-center flex flex-grow flex-shrink-0  w-full">
              <Link href="/">
                <img src="/images/logo.png" alt="logo" className="h-[29px]" />
              </Link>
            </div>
          </div>
        </div>
        {/* contents */}
        <div className="contents">
          <div className="bg-white flex flex-col overflow-hidden rounded mx-auto mb-0 mt-[60px] border border-gray-200 max-w-sm">
            <div className="mt-6 mb-4 flex justify-center items-center">
              <LockClosedIcon className="h-20 w-20" />
            </div>

            {submitted ? (
              <div className="mx-11 mb-10 text-center">
                <h4 className="font-semibold text-base mb-4">
                  Check your email
                </h4>
                <p className="text-sm text-gray-500">
                  We've sent a link to <b>{email}</b>. If an account exists,
                  you'll receive a password reset link shortly.
                </p>
                <p className="mt-6 text-xs text-gray-400">
                  (Development: Check the backend logs for the reset link)
                </p>
              </div>
            ) : (
              <>
                <div className="mx-11 mb-4 text-center">
                  <h4 className="font-semibold text-base">
                    Trouble logging in?
                  </h4>
                </div>
                <div className="mx-11 mb-4 text-center">
                  <p className="text-center text-xs text-gray-400 font-normal">
                    Enter your email and we'll send you a link to get back into
                    your account.
                  </p>
                </div>
                <div className="mx-11 mb-4">
                  <form onSubmit={handleSubmit}>
                    <label
                      htmlFor="forgetpassword"
                      className="flex flex-grow items-center justify-between pr-2 relative border border-gray-200 rounded-md bg-gray-50"
                    >
                      <input
                        type="email"
                        required
                        onChange={onInputChange}
                        value={email}
                        name="forgetpassword"
                        className="w-full text-sm py-[12px] px-2 border-none focus:ring-0 bg-transparent z-10"
                      />
                      <span
                        className={`${
                          float
                            ? 'text-[10px] -top-0 translate-y-1'
                            : 'text-[14px] top-1/2 -translate-y-1/2'
                        } absolute transition-all left-2 pointer-events-none font-normal whitespace-nowrap overflow-hidden text-gray-400`}
                      >
                        Email
                      </span>
                    </label>
                    <button
                      className={`insta-btn w-full mt-4 ${active ? 'acive-btn' : 'opacity-50 cursor-not-allowed'}`}
                      type="submit"
                      disabled={!active || loading}
                    >
                      {loading ? 'Sending...' : 'Send Login Link'}
                    </button>
                  </form>
                </div>

                <div className="flex flex-row justify-center items-center mx-11 my-4 ">
                  <div className="flex-grow flex-shrink h-[1px] relative bg-gray-300"></div>
                  <div className="text-gray-400 font-semibold mx-4 text-xs">
                    OR
                  </div>
                  <div className="flex-grow flex-shrink h-[1px] relative bg-gray-300"></div>
                </div>
                <div className="text-center font-bold text-sm text-black mx-11 mb-4 ">
                  <Link href="/auth/register">Create New Account</Link>
                </div>
              </>
            )}

            <div className="bg-gray-50 mt-auto h-11 border-t border-gray-300 font-bold text-sm text-center text-black flex items-center justify-center cursor-pointer">
              <Link href="/auth/">Back to Login</Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ForgotPassword;
