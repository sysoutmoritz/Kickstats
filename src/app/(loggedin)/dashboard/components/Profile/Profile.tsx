"use client";

export default function Profile() {
  const userName = localStorage.getItem("userName");
  const userProfile = localStorage.getItem("userProfile");
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Name: {userName}</p>
      <img
        src={
          userProfile
            ? userProfile
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        alt="profile"
      />
      <button
        className="bg-white border-2 border-black text-black"
        onClick={() => {
          localStorage.clear();
        }}
      >
        Delte localStorage for research purposes
      </button>
    </div>
  );
}
