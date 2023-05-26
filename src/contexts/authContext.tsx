import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserDataWithUsername, IUserProps } from '../common/data/userDummyData';

type AuthData = {
    id?: string
    pw?: string 
    roles?: string[]
    accessToken?: string
}

export interface IAuthContextProps {
	user: string;
	setUser?(...args: unknown[]): unknown;
	userData: Partial<IUserProps>;
	auth:AuthData; // 인증 추가 
	setAuth:Dispatch<SetStateAction<AuthData>>;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const [user, setUser] = useState<string>(localStorage.getItem('facit_authUsername') || '');
	const [userData, setUserData] = useState<Partial<IUserProps>>({});
	const initAuth = JSON.parse(localStorage.getItem('auth') || JSON.stringify({ id: "", pw: "", roles: [], accessToken: "" }));
	const [auth, setAuth] = useState<AuthData>(initAuth);
	
	useEffect(() => {
		localStorage.setItem('facit_authUsername', user);
	}, [user]);

	useEffect(() => {
		localStorage.setItem('auth', JSON.stringify(auth));
	}, [auth]);

	useEffect(() => {
		if (user !== '') {
			setUserData(getUserDataWithUsername(user));
		} else {
			setUserData({});
		}
	}, [user]);

	const value = useMemo(
		() => ({
			user,
			setUser,
			userData,
			auth, 
			setAuth
		}),
		[user, userData, auth, setAuth],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
