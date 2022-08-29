import { useEffect, useState } from "react";

export const useConnectionStatus = () => {
    const [status, setStatus] = useState(navigator.onLine);

    const updateStatus = () => {
        setStatus(navigator.onLine);
    };

    useEffect(() => {
        window.addEventListener("offline", updateStatus);
        window.addEventListener("online", updateStatus);
        return () => {
            window.removeEventListener("offline", updateStatus);
            window.removeEventListener("online", updateStatus);
        };
    }, []);

    return {
        status
    };
};
