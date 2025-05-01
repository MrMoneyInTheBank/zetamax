import { createClerkClient, User } from "@clerk/nextjs/server";
import dotenvFlow from "dotenv-flow";
import { writeFileSync } from "fs";

dotenvFlow.config();

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function getClerkUsers(): Promise<void> {
  const users: User[] = [];

  const limit = 500;
  let offset = 0;
  let totalCount = 0;

  do {
    const chunk = await clerkClient.users.getUserList({
      limit: limit,
      offset: offset,
    });

    if (totalCount === 0) {
      totalCount = chunk.totalCount;
    }

    users.push(...chunk.data);

    offset += limit;
  } while (offset < totalCount);

  const userIDs: string[] = users.map((user) => {
    return user.id;
  });

  const userIDsJson = JSON.stringify(userIDs, null, 2);
  writeFileSync("misc/users.json", userIDsJson, "utf-8");
}

getClerkUsers();
