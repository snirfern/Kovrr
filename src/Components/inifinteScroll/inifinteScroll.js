import {useEffect, useState} from 'react';

const useInfiniteScroll = (callback) => {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        function handleScroll() {
            const totalScreenHeight = window.innerHeight + document.documentElement.scrollTop + 10
            const offsetHeight = document.documentElement.offsetHeight
            if (totalScreenHeight < offsetHeight || isFetching) return;
            setIsFetching(true);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching]);

    useEffect(() => {
        if (!isFetching) return;
        callback().then(() => setIsFetching(false))
    }, [isFetching, callback]);


    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;