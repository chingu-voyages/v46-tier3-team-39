import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
const useOptionsWithId = ({
    options
}: {
    options: string[]
}) => {
    const [currOptions, setCurrOptions] = useState(
        options.map((val) => ({ id: uuid(), value: val }))
    );
    useEffect(() => {
        let mounted = true;
        setCurrOptions((state) => {
            if (!mounted) return state;
            let newOptions: string[] = [...options];
            let newArr = state.map((val, idx) => {
                const isCurrIdxWithinBounds = options.length >= idx + 1;
                const newVal = {
                    id: val.id,
                    value: isCurrIdxWithinBounds ? options[idx] : null,
                };
                if (isCurrIdxWithinBounds) newOptions.shift();
                return newVal;
            });
            let filteredArr = newArr.filter((val) => val.value !== null) as {
                id: string;
                value: string;
            }[];
            if (options.length > state.length)
                filteredArr = [
                    ...filteredArr,
                    ...newOptions.map((val) => ({
                        id: uuid(),
                        value: val,
                    })),
                ];
            return filteredArr;
        });
        return () => {
            mounted = false;
        };
    }, [options]);
    return { currOptions };
}
export default useOptionsWithId;