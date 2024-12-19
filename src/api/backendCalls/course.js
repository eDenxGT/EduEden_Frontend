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
    console.log(response)
    return response.data.courses;
  } catch (error) {
    console.error("Error fetching listed courses:", error);
    return null;
  }
};

// export const getAllAvailableTutors