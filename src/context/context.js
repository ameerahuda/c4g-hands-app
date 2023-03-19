import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Context = createContext();

const Provider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    const getAuthToken = async (email, password) => {
        setEmail(email);
        
        let config = {
            method: 'post',
			url: `${process.env.NEXT_PUBLIC_API_URL}/user/sign-in`,
			headers: { 
				'Content-Type': 'application/json', 
				'accept': 'application/json'
			},
			data : {
				"email": email,    
				"password": password
			}
		};

		await axios(config)
			.then((response) => {
				if (response.data.token) {
                    setToken(response.data.token);
                    sessionStorage.setItem('token', JSON.stringify(response.data.token))
                }
			})
			.catch((error) => {
				console.log(error);
			});
    }

    const getUser = async (email, token) => {
        const config = {
            method: 'get',
			url: `${process.env.NEXT_PUBLIC_API_URL}/user/${email}`,
			headers: { Authorization: `Bearer ${token}` }
		};

		await axios(config)
			.then((response) => {
				setUser(response.data)
                sessionStorage.setItem('user', JSON.stringify(response.data))
                setIsAuthenticated(true);
			})
			.catch((error) => {
				console.log(error);
			});
    }

    const login = async (email, password) => {
        getAuthToken(email, password);
    };

    useEffect(() => {
        if (token && !user) {
            getUser(email, token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        let token = JSON.parse(sessionStorage.getItem('token'));
        let user = JSON.parse(sessionStorage.getItem('user'));

        if (token) {
            setToken(token)
            if (user) {
                setUser(user);
                setIsAuthenticated(true);
            }
        }
    }, [])

    const logout = async () => {
        setIsAuthenticated(false);
        setToken('');
        setUser(null);
        sessionStorage.removeItem('user');
        router.push("/");
    };

    const exposed = {
        user,
        isAuthenticated,
        token,
        login,
        logout,
    };

    return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useStateContext = () => useContext(Context);

export default Provider;