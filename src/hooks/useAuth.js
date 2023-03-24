import { useEffect, useState } from "react";
import localstorageService from "../services/localstorage-service";

const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);


    useEffect(() => {
        setIsAuth(localstorageService.hasToken("token"));
    },[loading]);


    return {loading , isAuth, setLoading}

}


export default useAuth;