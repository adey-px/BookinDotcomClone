import { useEffect, useState } from 'react';
import axios from 'axios';

// Custom hook to load data for featured sections
const useFetch = (url) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);

	useEffect(
		() => {
			const getData = async () => {
				setLoading(true);
				try {
					const res = await axios.get(url);
					setData(res.data);
				} catch (err) {
					setError(err);
				}
				setLoading(false);
			};
			getData();
		},
		[url] // Empty if auto not desired in reFetch
	);

	// function to search again in searchPage
	const sortData = async () => {
		setLoading(true);
		try {
			const res = await axios.get(url);
			setData(res.data);
		} catch (err) {
			setError(err);
		}
		setLoading(false);
	};
	return { loading, data, error, sortData };
};

export default useFetch;
