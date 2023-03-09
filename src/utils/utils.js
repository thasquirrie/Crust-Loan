import { JSEncrypt } from "jsencrypt";

var encrypt = new JSEncrypt();

const publicKey =
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhoKxsay8ZuNHZxJHtkO6JTjbWvuAP/fqgqnATg3CS+ZK1JzQ2KtLKqHQqK7FBKC+FuaIUxuNINUh9xlXLN9STustRT36NAJopBDIX1V1en8DEAe1H5QtOehwqYPRH58fOuSOpWLxUwPbO8c3ZjrH2kthATsfy87SC2vLhjzUecFtTtyqW4AP3C90o8+U8mc/rqOJuPUWZ/DKrnJc/7nXP2ey2sN91UxOQlz0goCjgGyEh9MbVsoIhL9kw129gUC+DAt6NGrkrE80l5O1r8iRn4i25U8aal5Cmt2yPj7kCb+fU3ArwAfsJYVShAGdirEyC3zPugyRUZOYFYERdN/TywIDAQAB";

const encryptData = (data) => {
    encrypt.setPublicKey(publicKey);
    var encrypted = encrypt.encrypt(data);
    return encrypted;
};

export default encryptData;
