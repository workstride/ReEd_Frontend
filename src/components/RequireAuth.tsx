import { FC } from 'react'
import {useLocation, Navigate, Outlet} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

interface IRequireAuth {
	allowedRoles:string[];
}
const RequireAuth:FC<IRequireAuth> = ({allowedRoles}) => {
    const {auth} = useAuth();
    const location = useLocation();
    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
        ? <Outlet/>
        : <Navigate to="/login" state={{from:location}} replace />
    )

}

export default RequireAuth;