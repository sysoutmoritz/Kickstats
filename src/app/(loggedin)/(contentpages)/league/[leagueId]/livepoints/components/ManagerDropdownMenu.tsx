"use client";

import { useState, useEffect } from "react";
import { getRequest } from "../../../../../../../misc/KickbaseAPIRequester";
import useLocalStorage from "use-local-storage";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import useSWR from "swr";
import { getFetcherSWR } from "../../../../../../../misc/KickbaseAPIRequester";

export default function ManagerDropdownMenu({
  setManagerId,
  managerId,
  leagueId,
}: {
  setManagerId: Function;
  managerId: string;
  leagueId: string;
}) {
  const [token, setToken] = useLocalStorage("token", ""); //token for api requests
  const { theme } = useTheme(); //get the current theme
  const { data, error, isLoading } = useSWR(
    [`/leagues/${leagueId}/stats`, token],
    getFetcherSWR
  );
  if (isLoading) {
    return <div>Loading...ManagerDropdownMenu</div>;
  }
  if (error) {
    return <div>There was an error receiving your data</div>;
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          Select Manager{" "}
          <Image
            src={theme == "dark" ? "/dropdown_white.png" : "/dropdown_dark.png"}
            width={12}
            height={12}
            alt=""
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection>
          {data.users.map((user: any) => (
            <DropdownItem
              as="button"
              key={user.id}
              className={
                user.id == managerId
                  ? "border border-gray-600 bg-gray-400 dark:bg-slate-500 dark:text-gray-50 py-1 my-0.5"
                  : "border border-gray-600 bg-gray-100 dark:bg-slate-800 dark:text-gray-50 py-1 my-0.5"
              }
              onClick={() => {
                if (user.id != managerId) {
                  setManagerId(user.id);
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
