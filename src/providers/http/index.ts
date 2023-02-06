import { useSession } from "@providers/hooks";
import axios from "axios";

const axiosWithToken = axios.create()
axiosWithToken.interceptors.request.use((config: any) => {

	const { getToken } = useSession();
    
    const token = getToken()
	if (token.hasSession) {
		config.headers.authorization = `Bearer ${token.access_token}`
	}

	return config;
});

export {axiosWithToken, axios};

