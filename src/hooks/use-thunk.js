import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

export function useThunk(thunk) {
    const dispatch67 = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const runThunk = useCallback((arg) => {
        setIsLoading(true);
        dispatch67(thunk(arg)).unwrap().catch((err) => setError(err)).finally(() => setIsLoading(false));
    }, [dispatch67, thunk]);

    return [runThunk, isLoading, error];
}
