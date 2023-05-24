import { setUncaughtExceptionCaptureCallback } from "process";
import { SetStateAction } from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";


const useRefreshToken = () => {

    const {setAuth} = useAuth();
    const refresh = async () => {
        const response = await axios.post('/api/v1/auth/refresh-token', {
            withCredentials:true
        });
        setAuth((prev) => {
            return {...prev, accessToken:response.data.accessToken};
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;