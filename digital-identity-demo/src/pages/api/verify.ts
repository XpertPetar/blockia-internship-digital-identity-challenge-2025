import type { NextApiRequest, NextApiResponse } from "next";
import { getKeyPairs, signMessage, verifyMessage } from "../../utils/crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { privateKey, publicKey } = getKeyPairs();
        res.status(200).json({ privateKey, publicKey });
    } else if (req.method === "POST" && req.body.message && req.body.privateKey) {
        const { privateKey, message } = req.body;
        const signature = signMessage(privateKey, message);
        res.status(200).json({ signature });
    } else if (
        req.method === "POST" &&
        req.body.message &&
        req.body.publicKey &&
        req.body.signature
    ) {
        const { publicKey, signature, message } = req.body;
        const isVerified = verifyMessage(publicKey, signature, message);
        res.status(200).json({ isVerified });
    } else {
        res.status(405).json({ error: "Invalid Method" });
    }
}
