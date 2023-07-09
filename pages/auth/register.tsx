import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Head from "next/head";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../../utils/mutations";
import { useRouter } from "next/router";

interface formValues {
  fullName: string;
  userName: string;
  email: string;
  password: string;
}

const Register: NextPage = () => {
  const router = useRouter();
  const [register, { loading }] = useMutation(REGISTER_MUTATION);

  const onSubmit = (values: formValues) => {
    register({
      variables: {
        name: values.userName,
        fullname: values.fullName,
        password: values.password,
        email: values.email,
      },
      onCompleted: () => {
        router.push("/auth/");
      },
      onError: (e) => {
        alert(e.message);
      },
    });
  };

  const validation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
    fullName: yup.string().min(8).max(32).required(),
    userName: yup.string().min(8).max(32).required(),
  });

  const initialValues: formValues = {
    fullName: "",
    userName: "",
    email: "",
    password: "",
  };

  return (
    <section className="bg-gray-50 h-screen">
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-grow mb-4">
        <article className="flex justify-center  flex-row mx-auto mt-8">
          <div className="hidden iamge-phone md:inline-flex flex-shrink-0">
            <div className="mt-[27px] mr-0 mb-0 ml-[113px] relative">
              <img
                alt=""
                className="hide-image fide-in "
                src="/images/login/4.png"
              />
            </div>
          </div>
          <div className="mx-auto min-w-[350px] mt-3">
            <div className="flex flex-col items-center md:bg-white mb-[10px] py-[10px] border border-gray-200 rounded-sm">
              <div className="mt-9 mb-3 flex">
                <img
                  src="/images/logo.png"
                  className="object-cover w-44"
                  alt="logo"
                />
              </div>
              <div className="mb-[10px] w-full">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validation}
                  onSubmit={async (values, { resetForm }) => {
                    await onSubmit(values);
                    resetForm();
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col mt-3">
                      <Field
                        name="fullName"
                        type="text"
                        className="login-input"
                        placeholder="full name"
                      />
                      <Field
                        name="userName"
                        type="text"
                        className="login-input"
                        placeholder="username"
                      />
                      <Field
                        name="email"
                        type="email"
                        className="login-input"
                        placeholder="email"
                      />
                      <Field
                        name="password"
                        type="password"
                        className="login-input"
                        placeholder="password"
                      />
                      <button
                        type="submit"
                        className={`insta-btn mx-8 mt-2 mb-2  ${
                          !!errors.email ||
                          !!errors.fullName ||
                          !touched.fullName ||
                          !touched.email ||
                          !!errors.userName ||
                          !touched.userName ||
                          !touched.password ||
                          !!errors.password ||
                          loading
                            ? "cursor-not-allowed"
                            : "acive-btn"
                        }`}
                        disabled={
                          !!errors.email ||
                          !!errors.fullName ||
                          !!errors.userName ||
                          !!errors.password
                        }
                      >
                        {loading ? "loading..." : "Sign In"}
                      </button>

                      <div className="flex flex-row justify-center items-center mx-[40px] mt-[10px] mb-[18px]">
                        <div className="flex-grow flex-shrink h-[1px] relative bg-gray-300"></div>
                        <div className="text-gray-400 font-semibold mx-4">
                          OR
                        </div>
                        <div className="flex-grow flex-shrink h-[1px] relative bg-gray-300"></div>
                      </div>
                      {/* sinUp with facebook */}
                      <div className="flex  my-4 mx-[40px]">
                        <a href="/facebooks" className="flex justify-between">
                          <span className="mr-4">
                            <svg
                              className="w-6 h-6 text-blue-900 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          </span>
                          <span className="text-blue-900 text-center">
                            Continue with Facebook
                          </span>
                        </a>
                      </div>
                      <h3 className="text-center mt-3 text-sm text-blue-900">
                        <Link href="/auth/forgot-password">
                          forget password
                        </Link>
                      </h3>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="md:bg-white flex items-center justify-center border border-gray-200 rounded-sm mb-[10px] py-[10px]">
              <div>
                <p className="m-4 text-sm text-center">
                  Vous avez un compte ?
                  <Link href="/auth/">
                    <span className="text-blue-500 font-semibold cursor-pointer">
                      Connectez-vous
                    </span>
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-center mx-[10px] my-[10px]">
                Download Application{" "}
              </p>
              <div className="flex flex-row items-center justify-center my-[10px]">
                <div className="mr-2">
                  <img
                    src="/images/login/appStore.png"
                    className="h-[40px]"
                    alt="appStore"
                  />
                </div>
                <div>
                  <img
                    src="/images/login/google.png"
                    className="h-[40px]"
                    alt="goole play"
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </section>
  );
};

export default Register;
