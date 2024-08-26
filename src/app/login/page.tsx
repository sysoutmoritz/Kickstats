"use client";
import { useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";
import { useState } from "react";

async function doLoginCall(
  email: string,
  password: string,
  router: any,
  setLoginError: Function
) {
  const response = await fetch("https://api.kickbase.com/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      ext: false,
    }),
  });
  if (response.status === 200) {
    const json = await response.json();
    console.log(json);
    localStorage.setItem("token", json.token);
    localStorage.setItem("tokenExp", json.tokenExp);
    localStorage.setItem("userId", json.user.id);
    localStorage.setItem("userName", json.user.name);
    localStorage.setItem("userProfile", json.user.profile);
    localStorage.setItem("leagues", json.leagues);
    router.push("/dashboard");
  } else {
    console.log("Login failed");
    setLoginError(true);
  }
}

const Login = () => {
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
    <div>
      <p>Hi please login</p>
      <form
        className="text-black"
        onSubmit={handleSubmit((data) => {
          doLoginCall(data.email, data.password, router, setLoginError);
        })}
      >
        <input
          className="border-2 border-black"
          type="text"
          placeholder="E-Mail"
          {...register("email", {
            required: "Dieses Feld ist ein Pflichtfeld.",
          })}
        />
        <p>{errors.email?.message}</p>
        <input
          className="border-2 border-black"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Dieses Feld ist ein Pflichtfeld.",
          })}
        />
        <p>{errors.password?.message}</p>
        <button className="rounded-md border-2 border-red-400" type="submit">
          Login
        </button>
      </form>
      {loginError && (
        <p className="text-red-400">Login failed. Please try again.</p>
      )}
    </div>
  );
};

export default Login;
