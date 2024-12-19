import { axiosInstance } from "../axiosConfig";

export const getAllCourses = async (apiFor) => {
  try {
    const response = await axiosInstance.get(
      `/courses/get-all?apiFor=${apiFor}`
    );
    return response.data.courses;
  } catch (error) {
    console.error(`Error fetching courses for ${apiFor}:`, error);
    return null;
  }
};

export const getListedCourses = async ({
  search,
  sort,
  category,
  page,
  tutor,
  limit,
}) => {
  try {
    const response = await axiosInstance.get(`/courses/get-listed`, {
      params: {
        search,
        sort,
        category,
        page,
        tutor,
        limit,
      },
    });
    return response.data.courses;
  } catch (error) {
    console.error("Error fetching listed courses:", error);
    return null;
  }
};

export const getEnrolledCourses = async ({
  search,
  sort,
  category,
  tutor,
  page,
  limit,
}) => {
  try {
    const response = await axiosInstance.get(`/student/get-enrolled-courses`, {
      params: {
        search,
        sort,
        category,
        tutor,
        page,
        limit,
      },
    });
    return {
      courses: response.data.courses,
      total_enrolled_courses: response.data.total_enrolled_courses,
    };
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return null;
  }
};
// export const getAllAvailableTutors
