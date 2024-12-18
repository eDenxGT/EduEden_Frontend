/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import InputField from "../../../CommonComponents/InputField";
import Button from "../../../CommonComponents/Button";
import {
  BookOpenText,
  Image,
  ImageIcon,
  IndianRupee,
  LanguagesIcon,
  Layers3,
  LucideCaptions,
  NotepadText,
  Settings2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../../../../store/thunks/courseThunks";
import {
  resetFormData,
  updateFormData,
} from "../../../../store/slices/newCourse";
import { toast } from "sonner";
import { toast as hotToast } from "react-hot-toast";
import { addLecture } from "../../../../store/thunks/lectureThunks";
import LoadingUiWithText from "../../../../utils/Modals/LoadingUiWithText";
import { useNavigate } from "react-router-dom";

const PublishCoursePage = ({ isDarkMode }) => {
  const { ...formData } = useSelector((state) => state.newCourse);
  const [priceError, setPriceError] = useState("");
  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.tutor.tutorData);
  const [loadingText, setLoadingText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Formdata,", formData);
  }, [formData]);

  const setLoader = (text = "") => {
    setLoadingText(text);
    setIsLoading(!!text);
  };

  const validateCourseDetails = (courseDetails, lectures) => {
    const errors = [];
    if (!courseDetails.title) errors.push("Please provide a course title");
    if (!courseDetails.course_description)
      errors.push("Please enter a valid course description");
    if (!courseDetails.price || courseDetails.price <= 0)
      errors.push("Please enter a valid price");
    if (!courseDetails.language) errors.push("Please select a language");
    if (!courseDetails.category) errors.push("Please select a category");
    if (!courseDetails.level) errors.push("Please select a level");
    if (!courseDetails.duration) errors.push("Please enter a valid duration");
    if (
      !courseDetails.course_thumbnail ||
      !(courseDetails.course_thumbnail instanceof File) ||
      !courseDetails.course_thumbnail.size 
    ) {
      errors.push("Please upload a course thumbnail");
    }

    lectures.forEach((lecture, index) => {
      if (
        !lecture.video ||
        !(lecture.video instanceof File) ||
        !lecture.video.size
      ) {
        errors.push(`Lecture ${index + 1}: Video is missing`);
      }

      if (!lecture.title) errors.push(`Lecture ${index + 1}: Title is missing`);

      if (!lecture.description)
        errors.push(`Lecture ${index + 1}: Description is missing`);

      if (
        !lecture.pdf_notes ||
        !(lecture.pdf_notes instanceof File) ||
        !lecture.pdf_notes.size
      ) {
        errors.push(`Lecture ${index + 1}: Notes are missing`);
      }

      if (
        !lecture.video_thumbnail ||
        !(lecture.video_thumbnail instanceof File) ||
        !lecture.video_thumbnail.size
      ) {
        errors.push(`Lecture ${index + 1}: Thumbnail is missing`);
      }
    });

    return errors;
  };

  const handleCourseSubmit = async () => {
    const { lectures, ...courseDetails } = formData;
    const errors = validateCourseDetails(courseDetails, lectures);

    if (errors.length) {
      errors.forEach((err) => hotToast.error(err));
      return;
    }

    const courseData = { ...courseDetails, tutor_id: user_id };
    try {
      setLoader("Creating course...");
      await dispatch(addCourse(courseData)).unwrap();
      setLoader("Uploading lectures...");
      await dispatch(addLecture(lectures)).unwrap();
      toast.success("Course and lectures uploaded successfully!");
      dispatch(resetFormData());
      navigate("/tutor/my-courses");
    } catch (error) {
      console.error("Course Publishing Error", error);
      hotToast.error("Failed to publish course");
    } finally {
      setLoader();
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const numValue = Number(value);

    if (numValue > 49999) {
      setPriceError("Price cannot exceed ₹49,999");
      return;
    }
    if (numValue < 0) {
      setPriceError("Enter a valid price");
      return;
    }

    setPriceError("");
    dispatch(
      updateFormData({
        name: "price",
        value: numValue ? numValue : "",
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <InputField
            icon={<BookOpenText size={18} />}
            label="Title"
            value={formData?.title}
            className={`${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            readOnly
          />
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-0">
              Description
            </label>
            <NotepadText
              size={18}
              className="absolute left-2.5 top-7 text-gray-400"
            />
            <textarea
              value={formData?.course_description}
              className={`${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } w-full h-fit rounded-none p-2 pl-8 border resize-none`}
              readOnly
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              icon={<Layers3 size={18} />}
              label="Course Category"
              value={formData?.category}
              className={`${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              readOnly
            />
            <InputField
              label="Course Language"
              icon={<LanguagesIcon size={16} />}
              value={formData?.language}
              className={`${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              readOnly
            />
            <InputField
              label="Course Level"
              icon={<Settings2 size={16} />}
              value={formData?.level}
              className={`${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              readOnly
            />
            <InputField
              label="Number of Lectures"
              icon={<LucideCaptions size={18} />}
              value={formData?.lectures.length}
              className={`${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              readOnly
            />
          </div>
          <div className="space-y-2">
            <InputField
              type="text"
              label="Course Price"
              icon={<IndianRupee size={16} />}
              value={formData?.price}
              onChange={handlePriceChange}
              className={`${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="Enter Course Price in INR"
            />
            {priceError && (
              <p className="text-red-500 text-sm mt-1">{priceError}</p>
            )}
            {formData?.price && !priceError && (
              <div
                className={`text-xs ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <p>Base Price: ₹{formData?.price}</p>
                <p>GST (3%): ₹{(formData?.price * 0.03).toFixed(2)}</p>
                <p>EduEden Fee (10%): ₹{(formData?.price * 0.1).toFixed(2)}</p>
                <p className="font-medium">
                  Your Profit: ₹
                  {(formData?.price - formData?.price * 0.13).toFixed(2)}
                </p>
              </div>
            )}
            <div className="flex gap-2 mt-2">
              {[499, 999, 1999, 2999].map((suggestedPrice) => (
                <button
                  key={suggestedPrice}
                  type="button"
                  onClick={() =>
                    dispatch(
                      updateFormData({
                        name: "price",
                        value: suggestedPrice,
                      })
                    )
                  }
                  className={`text-sm px-3 py-1 rounded-md border ${
                    isDarkMode
                      ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                      : "border-gray-300 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  ₹{suggestedPrice}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center">
          <label className="block text-xs font-medium mb-1">
            Course Thumbnail
          </label>
          {formData?.course_thumbnail ? (
            <img
              src={
                typeof formData?.course_thumbnail === "string"
                  ? formData?.course_thumbnail
                  : typeof formData?.course_thumbnail_preview === "string" &&
                    formData?.course_thumbnail_preview
              }
              alt="Course Thumbnail"
              className="mx-auto mb-2"
            />
          ) : (
            <Image />
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          text="Prev Step"
          className={`${
            isDarkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } max-w-fit px-6`}
        />
        <Button
          text="Submit"
          onClick={handleCourseSubmit}
          className={`max-w-fit px-6 ${
            isDarkMode
              ? "bg-orange-600 text-white hover:bg-orange-700"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        />
      </div>
      {isLoading && <LoadingUiWithText text={loadingText} />}
    </div>
  );
};

export default PublishCoursePage;
