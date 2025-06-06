import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    username: null,
    login: () => {},
    logout: () => {},
});

const fetchStoredValue = (keyName) => {
    try {
        const storedValue = localStorage.getItem(keyName);
        return storedValue !== null ? JSON.parse(storedValue) : null;
    } catch (error) {
        try {
            const storedValue = localStorage.getItem(keyName);
            return storedValue;
        } catch(error) {
            console.error(`Failed to read ${keyName} from localStorage:`, error);
        }
    }
}

const storeValue = (keyName, value) => {
    try {
        localStorage.setItem(keyName, JSON.stringify(value));
    } catch (error) {
        console.error(`Failed to write ${keyName} to localStorage:`, error);
    }
};

export function UserProvider({ children }) {
    const [username, setUsername] = useState(() => fetchStoredValue('username'));
    const [editor, setEditor] = useState(() => fetchStoredValue('editor'));
    const [token, setToken] = useState(() => fetchStoredValue('token'));

    useEffect(() => {
        storeValue('username', username);
        storeValue('editor', editor);
        storeValue('token', token);
    }, [username, editor, token]);

    const login = ({username, editor, token}) => {
        setUsername(username);
        setEditor(editor);
        setToken(token);
    };

    const logout = () => {
        setUsername(null);
        setEditor(false);
        setToken(null);
    }

    const contextValue = {username, editor, token, login, logout};

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
