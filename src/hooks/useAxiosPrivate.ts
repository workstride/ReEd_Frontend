import { config } from "process";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import { demoPagesMenu } from "../menu";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {

    const refresh = useRefreshToken(); 
    const {auth} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(config.headers['Authorization'] == null)
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                return config;
            }, (error) => Promise.reject()
        );
        
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    console.log('refresh Token');
                    return axiosPrivate(prevRequest);
                }else if(error?.response?.status === 401){
                    navigate(`../${demoPagesMenu.login.path}`);
                }
                return Promise.reject(error); 
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;