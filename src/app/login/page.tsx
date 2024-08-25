"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

async function doLoginCall(email: string, password: string, router: any) {
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
  const json = await response.json();
  console.log(json);
  localStorage.setItem("token", json.token);
  localStorage.setItem("tokenExp", json.tokenExp);
  localStorage.setItem("userId", json.user.id);
  localStorage.setItem("userName", json.user.name);
  localStorage.setItem("userProfile", json.user.profile);
  router.push("/dashboard");
}

const Login = () => {
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
          doLoginCall(data.email, data.password, router);
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
        <button
          className="rounded-md border-2 border-red-400 text-white"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
