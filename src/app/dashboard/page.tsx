"use client";

const Dashboard = () => {
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
    </div>
  );
};

export default Dashboard;
