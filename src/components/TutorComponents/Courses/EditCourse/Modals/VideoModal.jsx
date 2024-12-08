/* eslint-disable react/prop-types */
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateLecture } from "../../../../../store/slices/updateCourse";

const LectureVideoModal = ({ isOpen, onClose, lectureId }) => {
	const dispatch = useDispatch();
	const selectedLecture = useSelector((state) =>
		state.updateCourse.lectures.find((lecture) => lecture._id === lectureId)
	);

	const [linkUrl, setLinkUrl] = useState(selectedLecture?.video || "");
	const [selectedFile, setSelectedFile] = useState(null);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef(null);
	const dragCounterRef = useRef(0);

	const getYouTubeVideoId = (url) => {
		const regExp =
			/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
	};

	const formatDuration = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	const handleLinkChange = (e) => {
		const url = e.target.value;
		setLinkUrl(url);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setSelectedFile(file);
			const objectUrl = URL.createObjectURL(file);
			const video = document.createElement("video");
			video.src = objectUrl;
			video.onloadedmetadata = () => {
				const duration = formatDuration(video.duration);
				const updatedData = {
					video: file,
					video_preview: objectUrl,
					video_title: file.name,
					duration,
				};
				dispatch(updateLecture({ lectureId, updatedData }));
			};
		}
	};

	const handleValidate = () => {
		if (!linkUrl) {
			toast.info("Please enter a video URL");
			return;
		}
		const videoId = getYouTubeVideoId(linkUrl);
		if (!videoId) {
			toast.info("Invalid YouTube URL");
			return;
		}
		if (videoId) {
			const updatedData = {
				video: linkUrl,
				video_thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
				video_title: "YouTube Video",
				duration: "",
			};
			dispatch(updateLecture({ lectureId, updatedData }));
		}

		toast.success("Valid YouTube URL");
	};

	const handleDragEnter = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		dragCounterRef.current++;
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
			setIsDragging(true);
		}
	}, []);

	const handleDragLeave = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		dragCounterRef.current--;
		if (dragCounterRef.current === 0) {
			setIsDragging(false);
		}
	}, []);

	const handleDragOver = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		dragCounterRef.current = 0;
		const file = e.dataTransfer.files[0];
		if (file) {
			handleFileChange({ target: { files: [file] } });
		}
	};

	const clearPreview = () => {
		dispatch(
			updateLecture({
				lectureId,
				updatedData: {
					video: "",
					video_thumbnail: "",
					video_preview: "",
					duration: "",
					video_title: "",
				},
			})
		);
		setLinkUrl("");
		setSelectedFile(null);
	};
	const onRemove = () => {
		dispatch(
			updateLecture({
				lectureId,
				updatedData: {
					video: "",
					video_thumbnail: "",
					video_title: "",
					video_preview: "",
					duration: "",
				},
			})
		);
	};
	const { video, video_title, duration } = selectedLecture || {};

	return isOpen ? (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}>
			{isDragging && (
				<div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
					<div className="text-white flex flex-col items-center">
						<Upload size={48} className="mb-4" />
						<p className="text-xl font-semibold">
							Drop your file here
						</p>
					</div>
				</div>
			)}
			<div className="bg-white w-full max-w-md">
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-xl">Lecture Video</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700">
						✕
					</button>
				</div>

				{video ? (
					<div className="p-4">
						<div className="flex space-x-4">
							<div className="w-32 h-20 bg-gray-100">
								<video
									src={video}
									autoPlay
									controls
									className="w-full h-full object-cover"
								/>
								{/* <img
                  src={video_thumbnail}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                /> */}
							</div>
							<div className="flex-1">
								<div className="flex items-center space-x-2 text-xs text-green-600 mb-1">
									<span>FILE UPLOADED</span>
									{duration && <span>• {duration}</span>}
								</div>
								<p className="text-sm text-gray-700 mb-2">
									{video_title}
								</p>
								<button
									onClick={clearPreview}
									className="text-blue-500 text-sm hover:text-blue-600">
									Replace Video
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className="p-4 space-y-4">
						<div>
							<div className="flex">
								<input
									type="text"
									className="flex-grow px-3 py-2 border border-r-0"
									placeholder="Upload Links"
									value={linkUrl}
									onChange={handleLinkChange}
								/>
								<button
									onClick={handleValidate}
									className="px-4 py-2 bg-gray-100 border border-l-0 hover:bg-gray-200">
									Validate
								</button>
							</div>
							<p className="text-xs text-gray-500 mt-1">
								Note: All links should be valid.
							</p>
						</div>

						<div className="flex items-center">
							<div className="flex-grow border-t border-gray-300"></div>
							<span className="px-4 text-gray-500 text-sm">
								OR
							</span>
							<div className="flex-grow border-t border-gray-300"></div>
						</div>

						<div>
							<div className="flex">
								<input
									type="text"
									className="flex-grow px-3 py-2 border border-r-0 bg-gray-50"
									placeholder="Upload Files"
									value={
										selectedFile ? selectedFile.name : ""
									}
									readOnly
								/>
								<button
									onClick={() => fileInputRef.current.click()}
									className="px-4 py-2 bg-gray-100 border border-l-0 hover:bg-gray-200">
									Upload File
								</button>
								<input
									ref={fileInputRef}
									type="file"
									accept="video/*"
									className="hidden"
									onChange={handleFileChange}
								/>
							</div>
							<p className="text-xs text-gray-500 mt-1">
								Note: All files should be at least 720p and less
								than 4.0 GB.
							</p>
						</div>
					</div>
				)}

				<div className="flex justify-between p-4 border-t">
					<button
						onClick={onRemove}
						className="px-4 py-2 bg-red-200 hover:bg-red-300 text-red-700">
						Remove
					</button>
					<button
						onClick={() => {
							if (selectedFile || linkUrl) {
								onClose();
							} else {
								toast.error(
									"Please select a file or enter a valid URL"
								);
							}
						}}
						className="px-4 py-2 bg-orange-200 text-orange-700 hover:bg-orange-300">
						Add Video
					</button>
				</div>
			</div>
		</div>
	) : null;
};

export default LectureVideoModal;
