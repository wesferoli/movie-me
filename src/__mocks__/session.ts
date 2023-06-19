import { Session } from "next-auth";

export const session: Session = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: {
    image: "https://www.github.com/wesferoli.png",
    email: "testuser@movieme.com",
    name: "Test User",
  },
};
