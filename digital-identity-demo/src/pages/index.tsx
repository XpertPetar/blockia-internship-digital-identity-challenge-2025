import axios from "axios";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        axios.post("http://localhost:3001/api/verify", {});
    }, []);

    return (
        <div>
            <h1>Digital Identity Demo</h1>
        </div>
    );
}
