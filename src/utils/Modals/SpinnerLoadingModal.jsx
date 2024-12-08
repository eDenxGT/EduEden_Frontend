/* eslint-disable react/prop-types */

import { useLoading } from "../../contexts/LoadingContext";

const SpinnerLoadingModal = () => {
	const { isSpinnerLoading } = useLoading();
	if (!isSpinnerLoading) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
			<div className="p-4 flex items-center space-x-4">
				<div className="w-16 h-16 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
			</div>
		</div>
	);
};

export default SpinnerLoadingModal;
