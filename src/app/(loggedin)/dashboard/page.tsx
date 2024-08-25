"use server";

import Profile from "./components/Profile/Profile";

export default async function Dashboard() {
  return (
    <>
      <p>Yo geiles Dashboard</p>
      <Profile />
    </>
  );
}
