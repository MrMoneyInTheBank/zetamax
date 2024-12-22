import { createClerkClient } from "@clerk/nextjs/server";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_TEST_SECRET_KEY,
});

interface User {
  userId: string;
  email: string;
}

async function main() {
  let users: User[] = [];
  const users_response = await clerkClient.users.getUserList({
    limit: 100,
  });

  users_response.data.map((user) => {
    const new_user: User = {
      userId: user.id,
      email: user.primaryEmailAddress!.emailAddress,
    };
    users = [...users, new_user];
  });

  const jsonString = JSON.stringify(users, null, 2);

  fs.writeFileSync("misc/users.json", jsonString, "utf-8");
  console.log("Exported users to misc/users.json");
}

main();
