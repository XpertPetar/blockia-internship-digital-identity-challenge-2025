import crypto from "crypto";

export function getKeyPairs() {
    const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
        namedCurve: "prime256v1",
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem"
        },
        publicKeyEncoding: {
            type: "spki",
            format: "pem"
        }
    });

    return { privateKey, publicKey };
}

export function signMessage(message: string, privateKey: string) {
    const sign = crypto.createSign("SHA256");
    sign.update(message);
    const signature = sign.sign(privateKey, "base64");

    return signature;
}

export function verifyMessage(publicKey: string, signature: string, message: string) {
    const verify = crypto.createVerify("SHA256");
    verify.update(message);
    return verify.verify(publicKey, signature, "base64");
}
