import type { Token } from "@modules/google";
import { useCryptography } from "@providers/hooks";

export const useSession = () => {
	const { decrypt, encrypt } = useCryptography()

	const tokenKey = "__token"

	const getToken = (): Token & { hasSession: boolean } => {
		let tokenStorage = {
			access_token: "",
			hasSession: false,
		}
	
		try {
	
			const session: any = decrypt(localStorage.getItem(tokenKey) as string);

			if (session) {
				tokenStorage =  {
					access_token: session,
					hasSession: true,
				};
			}

	
		} catch (error) {}
		return tokenStorage;
	}

	const setToken = (token: Token | null): void => {
		if (!token) {
			localStorage.removeItem(tokenKey)
		} else {
			localStorage.setItem(tokenKey,  encrypt(token.access_token))
		}
	}

	return { getToken, setToken }
};