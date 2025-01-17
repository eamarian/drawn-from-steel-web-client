import {
  Adapter,
  AdapterUser,
  AdapterAccount,
  AdapterSession,
  VerificationToken,
} from "next-auth/adapters";

// TODO: Look into updating these api calls to include credentials in the header.
// TODO: Look into caching mechanisms

export default function CustomerAdapter(): Adapter {
  const baseUrl: string = process.env.API_BASE_URL ?? "";
  return {
    async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      const url: URL = new URL("api/User", baseUrl);
      const response: Response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return format<AdapterUser>(data);
    },
    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      const url: URL = new URL("api/User", baseUrl);
      const params = new URLSearchParams({ email: email });
      const response: Response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) return null;
      const data = await response.json();
      return data ? format<AdapterUser>(data) : null;
    },
    async getUserByAccount({
      providerAccountId,
      provider,
    }): Promise<AdapterUser | null> {
      const url: URL = new URL(
        `api/User/${provider}/${providerAccountId}`,
        baseUrl
      );
      const response: Response = await fetch(url);
      if (!response.ok) return null;
      const data = await response.json();
      return data ? format<AdapterUser>(data) : null;
    },
    async getUser(id: string): Promise<AdapterUser | null> {
      const url: URL = new URL(`api/User/${id}`, baseUrl);
      const response: Response = await fetch(url);
      const data = await response.json();
      return data ? format<AdapterUser>(data) : null;
    },
    async updateUser(
      user: Partial<AdapterUser> & Pick<AdapterUser, "id">
    ): Promise<AdapterUser> {
      const url: URL = new URL(`api/User/${user.id}`, baseUrl);
      const response: Response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return format<AdapterUser>(data);
    },
    // eslint-disable-next-line
    async deleteUser(userId: string): Promise<AdapterUser> {
      // const url: URL = new URL(`api/User/${userId}`, baseUrl);
      // const response: Response = await fetch(url, {
      //   method: "DELETE",
      // });
      // const data = await response.json();
      // return format<AdapterUser>(data);
      throw Error("Function deleteUser has not been implemented.");
    },
    async linkAccount(account: AdapterAccount): Promise<AdapterAccount> {
      const url: URL = new URL("api/Account", baseUrl);
      const response: Response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(account),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return format<AdapterAccount>(data);
    },
    async unlinkAccount(
      providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId"> // eslint-disable-line
    ): Promise<AdapterAccount> {
      throw Error("Function unlinkAccount has not been implemented.");
    },
    async createSession(session: AdapterSession): Promise<AdapterSession> {
      const url: URL = new URL("api/Session", baseUrl);
      const response: Response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(session),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return format<AdapterSession>(data);
    },
    async getSessionAndUser(
      sessionToken: string
    ): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
      try {
        const url: URL = new URL(`api/Session/${sessionToken}`, baseUrl);
        const response: Response = await fetch(url);
        if (!response.ok) return null;

        const data = await response.json();
        if (data == null) {
          return null;
        } else {
          const { session: sessionData, user: userData } = format<{
            session: Record<string, unknown>;
            user: Record<string, unknown>;
          }>(data);
          if (sessionData == null || userData == null) return null;
          const session: AdapterSession = format<AdapterSession>(sessionData);
          const user: AdapterUser = format<AdapterUser>(userData);
          return { session, user };
        }
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<AdapterSession> {
      const url: URL = new URL(`api/Session/${session.sessionToken}`, baseUrl);
      const response: Response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(session),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return format<AdapterSession>(data);
    },
    async deleteSession(sessionToken: string): Promise<AdapterSession> {
      const url: URL = new URL(`api/Session/${sessionToken}`, baseUrl);
      const response: Response = await fetch(url, {
        method: "DELETE",
      });
      const data = await response.json();
      return format<AdapterSession>(data);
    },
    // TODO: Create API
    // TODO: Consider implementing
    async createVerificationToken(
      verificationToken: VerificationToken // eslint-disable-line
    ): Promise<VerificationToken> {
      throw Error("Function createVerificationToken has not been implemented.");
    },
    // TODO: Create API
    // TODO: Consider implementing
    async useVerificationToken({
      identifier, // eslint-disable-line
      token, // eslint-disable-line
    }: {
      identifier: string;
      token: string;
    }): Promise<VerificationToken> {
      throw Error("Function useVerificationToken has not been implemented.");
    },
  };
}

function format<T>(obj: Record<string, unknown>): T {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const newResult = result;

    if (value === null) {
      return newResult;
    }

    if (isDate(value)) {
      newResult[key] = new Date(value);
    } else {
      newResult[key] = value;
    }

    return newResult;
  }, {} as Record<string, unknown>) as T;
}

const isDate = (value: unknown): value is string =>
  typeof value === "string"
    ? new Date(value).toString() !== "Invalid Date" &&
      !Number.isNaN(Date.parse(value))
    : false;
