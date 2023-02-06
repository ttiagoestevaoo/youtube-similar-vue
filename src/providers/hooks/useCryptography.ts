import {AES, enc} from 'crypto-js'


export const useCryptography = () => {

    const privateKey = import.meta.env.VITE_PRIVATE_KEY

    const encrypt = (toEncrypt: string) => {
        return AES.encrypt(toEncrypt,privateKey).toString()
    }

    const decrypt = (toDecrypt: string) => {
        return AES.decrypt(toDecrypt,privateKey).toString(enc.Utf8);
    }

    return {
        encrypt, decrypt
    }

}