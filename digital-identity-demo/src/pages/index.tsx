import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Home() {
    const blockia: string = "BLOCKIA";
    const name: string = "PetarJosifoski";
    const github: string = "XpertP";
    const date: string = dayjs().format("YYYYMMDD");
    const message: string = `${blockia}-${name}-${github}-${date}`;
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopUpText] = useState<string | null>(null);

    async function getKeyPairs(): Promise<{ privateKey: string; publicKey: string }> {
        let privateKey: string;
        let publicKey: string;
        const response = await axios.get("/api/verify");
        privateKey = response.data.privateKey;
        publicKey = response.data.publicKey;

        return { privateKey, publicKey };
    }

    async function signMessage(message: string, privateKey: string | null): Promise<string> {
        let signature: string;
        const response = await axios.post("/api/verify", {
            mode: "sign",
            privateKey: privateKey,
            message: message
        });
        signature = response.data.signature;

        return signature;
    }

    async function verifyMessage(
        publicKey: string | null,
        message: string,
        signature: any
    ): Promise<boolean> {
        let verified: boolean = false;
        await axios
            .post("/api/verify", {
                mode: "verify",
                publicKey: publicKey,
                message: message,
                signature: signature
            })
            .then((response) => {
                verified = response.data.verified;
            });

        return verified;
    }

    async function handleLogin(): Promise<void> {
        try {
            const { privateKey, publicKey } = await getKeyPairs();

            setPopUpText(`Private Key: ${privateKey}`);
            console.log(`Private Key: ${privateKey}`);
            setShowPopup(true);

            setTimeout(() => {
                setPopUpText(`Public Key: ${publicKey}`);
                console.log(`Private Key: ${publicKey}`);

                setTimeout(async () => {
                    const signature = await signMessage(message, privateKey);
                    setPopUpText(`Signature: ${signature}`);
                    console.log(`Signature: ${signature}`);

                    setTimeout(async () => {
                        const isVerified: boolean = await verifyMessage(
                            publicKey,
                            message,
                            signature
                        );

                        if (isVerified) {
                            setPopUpText(`Verification Successful!`);
                            console.log(`Verification Successful!: ${isVerified}`);
                        } else {
                            setPopUpText(`Verification Failed.`);
                            console.error("Verification failed.");
                        }

                        setTimeout(() => {
                            setShowPopup(false);
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
        } catch (error) {
            console.error("Error during login", error);
            setPopUpText(`Error during login.`);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                setPopUpText(null);
            }, 1500);
        }
    }

    return (
        <>
            <div className="bg-gray-900 w-full h-screen flex flex-col gap-6 items-center justify-center">
                <div
                    className={`px-4 py-6 w-1/3 flex flex-col items-center bg-blue-200/60 py-2 px-5 rounded-md text-blue-100 font-semibold border border-blue-100 absolute top-8 translate-y-[-10px] opacity-0 transition-all duration-600 ease-out
                     ${showPopup ? "translate-y-20 opacity-100" : "translate-y-[-20px] opacity-0"}`}
                >
                    <img
                        src={
                            popupText === "Verification Successful!"
                                ? "./check.png"
                                : "./loading.gif"
                        }
                        className="w-18 h-18"
                    ></img>
                    <p className="text-center text-wrap break-words text-sm w-full">{popupText}</p>
                </div>

                <div className="bg-blue-200/60 w-1/3 rounded-md px-12 py-10 text-black flex flex-col border border-blue-100">
                    <h2 className="font-extrabold text-2xl text-center tracking-wider mb-4">
                        DIGITAL SIGNATURE<br></br>VERIFICATION
                    </h2>
                    <hr></hr>
                    <div className="mt-10 mb-6">
                        <label className="font-semibold tracking-wider text-md block mb-3">
                            Your ID:
                        </label>
                        <input
                            readOnly
                            defaultValue={message}
                            className="bg-blue-900/20 rounded-md w-full border border-gray-800 text-blue-100 py-2 px-6 font-semibold text-sm"
                        ></input>
                    </div>

                    <div>
                        <button
                            onClick={() => {
                                handleLogin();
                            }}
                            className="bg-blue-100 text-blue-900 border border-gray-800 py-2 px-6 rounded-md font-semibold w-full cursor-pointer hover:bg-blue-200 text-md"
                        >
                            Login with your ID
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
