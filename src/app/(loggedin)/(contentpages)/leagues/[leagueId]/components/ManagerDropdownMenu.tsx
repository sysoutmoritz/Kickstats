"use client";

import { useState, useEffect } from "react";
import { getRequest } from "../../../../../../misc/KickbaseAPIRequester";
import useLocalStorage from "use-local-storage";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

export default function ManagerDropdownMenu({
  setLivePlayerId,
  livePlayerId,
  leagueId,
}: {
  setLivePlayerId: Function;
  livePlayerId: string;
  leagueId: string;
}) {
  const [isLoading, setLoading] = useState(true); //loading state for client-side fetching
  const [users, setUsers] = useState(null); //all users in this league
  const [token, setToken] = useLocalStorage("token", ""); //token for api requests
  useEffect(() => {
    //fetch data for this league
    async function fetchData() {
      const data = await getRequest(`/leagues/${leagueId}/stats`, token);
      setUsers(data.users);
      setLoading(false);
    }
    fetchData();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!users) {
    return <div>There was an error receiving your data</div>;
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Select Player</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection>
          {users.map((user: any) => (
            <DropdownItem
              as="button"
              key={user.id}
              className={
                user.id == livePlayerId
                  ? "border border-gray-600 bg-gray-400 py-1"
                  : "border border-gray-600 bg-gray-100 py-1"
              }
              onClick={() => {
                if (user.id != livePlayerId) {
                  setLivePlayerId(user.id);
                }
              }}
            >
              {user.name}
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
