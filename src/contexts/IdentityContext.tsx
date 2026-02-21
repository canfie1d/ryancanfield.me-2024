import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import GoTrue from "gotrue-js";

const IDENTITY_URL = "https://ryancanfield.netlify.app"; // @todo dynamic identity context urls
const API_URL = `${IDENTITY_URL}/.netlify/identity`;

const auth = new GoTrue({
  APIUrl: API_URL,
  audience: "",
  setCookie: false,
});

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
    })
  );
}

function getUserFromGotrue(gotrueUser: ReturnType<typeof auth.currentUser>): IdentityUser | null {
  if (!gotrueUser) return null;
  return {
    id: gotrueUser.id,
    email: gotrueUser.email,
    user_metadata: gotrueUser.user_metadata,
    app_metadata: gotrueUser.app_metadata,
  };
}

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IdentityUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  const refreshUser = useCallback(() => {
    const gotrueUser = auth.currentUser();
    setUser(getUserFromGotrue(gotrueUser));
  }, []);

  useEffect(() => {
    const params = parseHashParams();
    if (params?.access_token) {
      const tokenResponse = {
        access_token: params.access_token,
        refresh_token: params.refresh_token || "",
        expires_in: parseInt(params.expires_in || "3600", 10),
        token_type: "bearer" as const,
      };

      auth
        .createUser(tokenResponse)
        .then(() => {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
          );
          refreshUser();
        })
        .catch(console.error)
        .finally(() => setIsReady(true));
    } else {
      refreshUser();
      setIsReady(true);
    }
  }, [refreshUser]);

  const loginProvider = useCallback(
    (provider: string) => {
      window.location.href = auth.loginExternalUrl(provider);
    },
    []
  );

  const logout = useCallback(async () => {
    const gotrueUser = auth.currentUser();
    if (gotrueUser) {
      await gotrueUser.logout();
      setUser(null);
    }
  }, []);

  const value: IdentityContextValue = {
    user,
    isLoggedIn: !!user,
    loginProvider,
    logout,
    isReady,
  };

  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  );
}

export function useIdentityContext(): IdentityContextValue {
  const context = useContext(IdentityContext);
  if (!context) {
    throw new Error(
      "useIdentityContext must be used within an IdentityProvider"
    );
  }
  return context;
}
