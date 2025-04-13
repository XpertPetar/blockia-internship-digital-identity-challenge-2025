import type { NextApiRequest, NextApiResponse } from "next";
import { getKeyPairs, signMessage, verifyMessage } from "../../utils/crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { privateKey, publicKey } = getKeyPairs();
        return res.status(200).json({ privateKey, publicKey });
    }

    if (req.method === "POST") {
        const { mode, message, privateKey, publicKey, signature } = req.body;

        if (mode === "sign" && privateKey && message) {
            const signature = signMessage(privateKey, message);
            return res.status(200).json({ signature });
        }

        if (mode === "verify" && publicKey && signature && message) {
            const isVerified = verifyMessage(publicKey, signature, message);
            return res
                .status(200)
                .json({ verified: isVerified, message: "Identity verified successfully" });
        }

        return res.status(400).json({ error: "Invalid Data" });
    }

    return res.status(405).json({ error: "Invalid Method" });
}
