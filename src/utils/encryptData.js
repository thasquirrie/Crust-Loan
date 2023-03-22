import { JSEncrypt } from "jsencrypt";

var encrypt = new JSEncrypt();

const publicKey = process.env.REACT_APP_PUBLIC_KEY;

const encryptData = (data) => {
    encrypt.setPublicKey(publicKey);
    var encrypted = encrypt.encrypt(data);
    return encrypted;
};

export default encryptData;
