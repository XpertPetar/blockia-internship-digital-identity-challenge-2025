import axios from "axios";
import dayjs from "dayjs";
import { useEffect } from "react";

type PayloadType = {
    message: string;
    signature: string;
    publicKey: string;
};

export default function Home() {
    const blockia = "BLOCKIA";
    const name = "PetarJosifoski";
    const github = "XpertP";
    const date = dayjs().format("YYYYMMDD");
    const message = `${blockia}-${name}-${github}-${date}`;

    //const { privateKey, publicKey } = getKeyPairs();
    //const signature = signMessage(message, privateKey);

    // const payload: PayloadType = {
    //     message: message,
    //     signature: signature,
    //     publicKey: publicKey
    // };

    function getKeyPairs() {}

    return (
        <div>
            <h1>Digital Identity Demo</h1>
            <form onSubmit={getKeyPairs}>
                <input type="text" />
                <button type="submit"></button>
            </form>
        </div>
    );
}
