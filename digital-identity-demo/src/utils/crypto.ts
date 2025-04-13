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

export function signMessage(privateKey: string, message: string): string {
    const sign = crypto.createSign("SHA256");
    sign.update(message);
    sign.end();

    const signature = sign.sign(
        {
            key: privateKey,
            format: "pem",
            type: "pkcs8"
        },
        "base64"
    );

    return signature;
}

export function verifyMessage(publicKey: string, signature: string, message: string): boolean {
    const verify = crypto.createVerify("SHA256");
    verify.update(message);
    verify.end();

    const isVerified = verify.verify(
        {
            key: publicKey,
            format: "pem",
            type: "spki"
        },
        signature,
        "base64"
    );

    return isVerified;
}
