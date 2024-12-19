import { axiosInstance } from "../axiosConfig";

//* ================= Courses Section ================= *//
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

export const getCourseDetailsByCourseId = async (course_id, apiFor, role) => {
  try {
    const response = await axiosInstance.get(
      `/courses/get/${course_id}?apiFor=${apiFor}&role=${role}`
    );
    return response.data.course;
  } catch (error) {
    console.log("Error fetching course details:", error);
    return null;
  }
};

export const fetchCourseProgressByStudentId = async ({
  student_id,
  course_id,
}) => {
  try {
    const response = await axiosInstance.get(
      `/courses/get-progress/${student_id}/${course_id}`
    );
    return response?.data?.courseProgress;
  } catch (error) {
    console.log(error?.response?.data?.message || "Failed to fetch course.");
    return null;
  }
};

export const updateCourseProgressByStudentId = async ({
  course_id,
  student_id,
  lecture_id,
  status,
}) => {
  console.log(lecture_id);
  try {
    const response = await axiosInstance.put(
      "/courses/update-course-progress",
      {
        course_id,
        student_id,
        lecture_id,
        status,
      }
    );
    console.log("RESPOSNE:", response);
    // if (response?.data?.quiz) return response?.data;
    // return response?.data?.progress;
    return response;
  } catch (error) {
    console.log(
      error?.response?.data?.message || "Failed to UpdateCourse Progress"
    );
    return null;
  }
};

//* ================= Lectures Section ================= *//
export const fetchLecturesByCourseId = async ({ course_id, role }) => {
  // console.log(course_id, student_id)
  try {
    const response = await axiosInstance.get(
      `/lectures/get-by-course_id/${course_id}?role=${role}`
    );
    // console.log("LECTURE FETCHING:",response)
    return response?.data?.lectures;
  } catch (error) {
    console.log(error?.response?.data?.message || "Failed to fetch lectures.");
    return null;
  }
};

//* ================= Quizzes Section ================= *//
export const fetchQuizByQuizId = async (quiz_id) => {
  try {
    console.log(quiz_id);
    const response = await axiosInstance.get(`/quizzes/get/${quiz_id}`);
    console.log(response);
    return response?.data;
  } catch (error) {
    console.log(error?.response?.data?.message || "Failed to fetch course.");
    return null;
  }
};

export const submitQuiz = async (quiz_id, answers) => {
  try {
    const response = await axiosInstance.post(`/quizzes/submit/${quiz_id}`, {
      answers,
    });
    return response;
  } catch (error) {
    console.log(error?.response?.data?.message || "Failed to fetch course.");
    return null;
  }
};