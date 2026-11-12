import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type CurrentUser = {
    id: string;
    fullName: string;
    admin: boolean;
};

type UserContextType = {
    user: CurrentUser | null;
    loaded: boolean;
    login: (user: CurrentUser) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("user");
        if (saved) {
            setUser(JSON.parse(saved));
        }
        setLoaded(true);
    }, []);

    function login(newUser: CurrentUser) {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    }
    function logout() {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (<UserContext.Provider value={{ user, loaded, login, logout }}>
        {children}
    </UserContext.Provider>);
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser has to be used inside UserProvider");
    }
    return context;
}