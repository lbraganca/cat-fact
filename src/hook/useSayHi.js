import { useState } from "react";

const requestPermission = () => {
    return new Promise((resolve, reject) => {
        if (!('Notification' in window)) {
            return reject('Notification API not supported!');
        }
        Notification.requestPermission((result) => {
            if (result === 'granted') {
                return resolve();
            }
            reject('Notification permissions not granted!')
        });
    });
};

const sendNotification = (content) => {
    return new Promise((resolve, reject) => {
        if (!('Notification' in window)) {
            return reject('Notification API not supported!');
        }
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.showNotification(content, {
                    body: 'Cat Fact',
                    icon: './logo192.png',
                    badge: './logo96.png',
                });
                resolve();
            })
            .catch(reject);
    });
};

export const useSayHi = () => {
    const [error, setError] = useState();

    const sayHi = async (content) => {
        try {
            await requestPermission();
            await sendNotification(content);
        } catch (err) {
            setError(err);
        }
    };

    return {
        sayHi,
        error,
    };
};
