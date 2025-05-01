import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { getClerkUsers } from "./getAllUsers";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

type FailedUserUpload = {
  userId: string;
  queryResponse: string;
  mutationResponse: string;
};

async function updateConvex(): Promise<void> {
  const userIds: string[] = await getClerkUsers();
  const failedUsers: FailedUserUpload[] = [];
  let iteration = 0;

  for (const userId of userIds) {
    console.log(`Iteration ${iteration}`);
    iteration++;

    const { success: querySuccess, message: queryMessage } = await fetchQuery(
      api.getUserDocument.getUserDocument,
      {
        clerkUserId: userId,
      },
    );

    if (querySuccess) {
      continue;
    } else {
      const { success: mutationSuccess, message: mutationMessage } =
        await fetchMutation(api.createUser.createUser, { clerkUserId: userId });

      if (!mutationSuccess) {
        failedUsers.push({
          userId: userId,
          queryResponse: queryMessage,
          mutationResponse: mutationMessage,
        });
      }
    }
  }

  const totalUsers = userIds.length;
  const uploadedUsers = totalUsers - failedUsers.length;

  console.log(`Uploaded ${uploadedUsers} out of ${totalUsers}`);
  console.table(failedUsers.slice(0, 10));

  return;
}

updateConvex();
