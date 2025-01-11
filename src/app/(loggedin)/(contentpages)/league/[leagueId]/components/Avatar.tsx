import { useState } from "react";
import Image from "next/image";


export const Avatar = ({userid}: {userid: string}) => {
    const [error, setError] = useState(false);
  
    return (
        <Image
            className="rounded-[50%] w-12 h-12"
            src={!error ? "https://cdn.kickbase.com/files/users/" + userid + "/0" : "/nopicture.webp"}
            width={48}
            height={48}
            alt=""
            onError={() => setError(true)}
            />
    );
  };