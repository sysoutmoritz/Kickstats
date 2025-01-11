"use client";
import { useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { List } from "postcss/lib/list";

async function doLoginCall(
  email: string,
  password: string,
  router: any,
  setLoginError: Function,
  setToken: Function,
  setTokenExp: Function,
  setUserId: Function,
  setUserName: Function,
  setUserProfile: Function,
  setLeagues: Function
) {
  const response = await fetch("https://api.kickbase.com/v4/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      em: email,
      pass: password,
    }),
  });
  if (response.status === 200) {
    const json = await response.json();
    setToken(json.tkn);
    setTokenExp(json.tknex);
    setUserId(json.u.id);
    setUserName(json.u.name);
    setUserProfile(json.u.profile);
    setLeagues(json.srvl);
    router.push("/dashboard");
  } else {
    console.log("Login failed");
    setLoginError(true);
  }
}

const Login = () => {
  const [token, setToken] = useLocalStorage("token", "");
  const [tokenExp, setTokenExp] = useLocalStorage("tokenExp", "");
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [userName, setUserName] = useLocalStorage("userName", "User");
  const [userProfile, setUserProfile] = useLocalStorage(
    "userProfile",
    "/nopicture.webp"
  );
  const [leagues, setLeagues] = useLocalStorage<any[]>("leagues", []);
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="flex flex-col items-center mt-24 gap-4">
      <h1 className="text-3xl">Welcome to Kickstats</h1>
      <p>Please log in with your Kickbase Credentials</p>
      <form
        className="flex flex-col items-center gap-1"
        onSubmit={handleSubmit((data) => {
          doLoginCall(
            data.email,
            data.password,
            router,
            setLoginError,
            setToken,
            setTokenExp,
            setUserId,
            setUserName,
            setUserProfile,
            setLeagues
          );
        })}
      >
        <input
          className="border border-bg-slate-800 rounded-md"
          type="text"
          placeholder="E-Mail"
          {...register("email", {
            required: "Dieses Feld ist ein Pflichtfeld.",
          })}
        />
        <p>{errors.email?.message}</p>
        <input
          className="border border-bg-slate-800 rounded-md"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Dieses Feld ist ein Pflichtfeld.",
          })}
        />
        <p>{errors.password?.message}</p>
        <button
          className="rounded-md bg-slate-50 border border-black text-black dark:bg-slate-900 dark:text-white dark:border-slate-50 p-2"
          type="submit"
        >
          Login
        </button>
      </form>
      {loginError && (
        <p className="text-red-400">Login failed. Please try again.</p>
      )}
      <p className="text-center max-w-96">
        Don't worry, your data is stored locally in your browser and you will be
        communicating with the Kickbase API directly. This means that the
        password is sent nowhere else except for the official Kickbase API. All
        the data fetching is being handled clientside. The source code is
        publicly available below.
      </p>
    </div>
  );
};

export default Login;
