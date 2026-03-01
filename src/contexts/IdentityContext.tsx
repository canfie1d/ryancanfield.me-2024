import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useSiteSettings } from "~/hooks/useSanityContent";

const DEFAULT_IDENTITY_URL = "https://ryancanfield.netlify.app";

// gotrue-js is browser-only; defer instantiation until client to avoid SSR errors
const authInstances = new Map<string, InstanceType<typeof import("gotrue-js").default>>();

async function getAuth(identityUrl?: string | null) {
  if (typeof window === "undefined") return null;
  const baseUrl = identityUrl || DEFAULT_IDENTITY_URL;
  const apiUrl = `${baseUrl}/.netlify/identity`;
  if (authInstances.has(apiUrl)) return authInstances.get(apiUrl)!;
  const { default: GoTrue } = await import("gotrue-js");
  const instance = new GoTrue({
    APIUrl: apiUrl,
    audience: "",
    setCookie: false,
  });
  authInstances.set(apiUrl, instance);
  return instance;
}

export interface IdentityUser {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
  app_metadata?: Record<string, unknown>;
}

export interface IdentityContextValue {
  user: IdentityUser | null;
  isLoggedIn: boolean;
  loginProvider: (provider: string) => void;
  logout: () => Promise<void>;
  isReady: boolean;
}

const IdentityContext = createContext<IdentityContextValue | null>(null);

function parseHashParams(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash?.slice(1);
  if (!hash) return null;
  return Object.fromEntries(
    hash.split("&").map((p) => {
      const [k, v] = p.split("=");
      return [k, decodeURIComponent(v || "")];
    }),
  );
}

function getUserFromGotrue(
  gotrueUser: {
    id: string;
    email?: string;
    user_metadata?: unknown;
    app_metadata?: unknown;
  } | null,
): IdentityUser | null {
  if (!gotrueUser) return null;
  return {
    id: gotrueUser.id,
    email: gotrueUser.email,
    user_metadata: gotrueUser.user_metadata as Record<string, unknown> | undefined,
    app_metadata: gotrueUser.app_metadata as Record<string, unknown> | undefined,
  };
}

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IdentityUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const { data: siteSettings } = useSiteSettings();
  const identityUrl = (siteSettings as { identityUrl?: string } | undefined)?.identityUrl;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const init = async () => {
      const auth = await getAuth(identityUrl);
      if (!auth) {
        setIsReady(true);
        return;
      }

      const params = parseHashParams();
      if (params?.access_token) {
        const tokenResponse = {
          access_token: params.access_token,
          refresh_token: params.refresh_token || "",
          expires_in: parseInt(params.expires_in || "3600", 10),
          token_type: "bearer" as const,
        };

        try {
          await auth.createUser(tokenResponse);
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
          const gotrueUser = auth.currentUser();
          setUser(getUserFromGotrue(gotrueUser));
        } catch (err) {
          console.error(err);
        }
      } else {
        const gotrueUser = auth.currentUser();
        setUser(getUserFromGotrue(gotrueUser));
      }
      setIsReady(true);
    };

    init();
  }, [identityUrl]);

  const loginProvider = async (provider: string) => {
    const auth = await getAuth(identityUrl);
    if (!auth) return;
    window.location.href = auth.loginExternalUrl(provider);
  };

  const logout = async () => {
    const auth = await getAuth(identityUrl);
    if (!auth) return;
    const gotrueUser = auth.currentUser();
    if (gotrueUser) {
      await gotrueUser.logout();
      setUser(null);
    }
  };

  const value: IdentityContextValue = {
    user,
    isLoggedIn: !!user,
    loginProvider,
    logout,
    isReady,
  };

  return <IdentityContext.Provider value={value}>{children}</IdentityContext.Provider>;
}

export function useIdentityContext(): IdentityContextValue {
  const context = useContext(IdentityContext);
  if (!context) {
    throw new Error("useIdentityContext must be used within an IdentityProvider");
  }
  return context;
}
