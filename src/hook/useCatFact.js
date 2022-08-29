import { useEffect, useState } from "react";

const API_URL = 'https://catfact.ninja/fact';

export const useCatFact = () => {
    const [catFact, setCatFact] = useState();

    useEffect(() => {
        if (catFact) return;
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setCatFact(data.fact));
    }, [catFact]);

    return {
        catFact,
    };
};
