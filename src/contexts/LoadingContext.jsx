/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState();
	const [isSpinnerLoading, setIsSpinnerLoading] = useState();

	const startSpinnerLoading = () => setIsSpinnerLoading(true);
	const stopSpinnerLoading = () => setIsSpinnerLoading(false);

	const startLoading = () => setIsLoading(true);
	const stopLoading = () => setIsLoading(false);

	return (
		<LoadingContext.Provider
			value={{
				isLoading,
				startLoading,
				stopLoading,
				isSpinnerLoading,
				startSpinnerLoading,
				stopSpinnerLoading,
			}}>
			{children}
		</LoadingContext.Provider>
	);
};

export const useLoading = () => useContext(LoadingContext);
