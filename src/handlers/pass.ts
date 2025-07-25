import { db } from "@/drizzle/core";
import { metadata } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function passHandler(
  password: string,
  newPassword: string,
): Promise<boolean> {
  try {
    // Check if the password is correct
    const user = await db.query.metadata.findFirst({
      where: (metadata, { eq }) => eq(metadata.key, "password"),
    });

    // if no password present form before means its the first time setting a password so allow setting a new password
    if (!user) {
      await db.insert(metadata).values({ key: "password", value: password });
      return true;
    }

    // If the password is not correct, throw an error
    if (user?.value !== password) {
      console.error("Incorrect password");
      return false;
    }
    // Update the password if newPassword is provided
    if (newPassword) {
      await db
        .update(metadata)
        .set({ value: newPassword })
        .where(eq(metadata.key, "password"));
    }
    return true;
  } catch (error) {
    console.error("Error updating password:", error);
    return false;
  }
}
