import { useEffect, useState } from "react";
import { Star, Trash2, ShoppingBag } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  Button  from "@/components/CommonComponents/Button";
import { Card } from "@/components/ui/card";
import { removeFromCart } from "../../store/thunks/cartThunks";

const CourseCart = () => {
  const { cart } = useSelector((state) => state.cart);
  const [courses, setCourses] = useState([]);
  // const [couponCode, setCouponCode] = useState('');
  const dispatch = useDispatch();
  const { student_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCourses(cart);
  }, [cart?.length]);

  const subtotal = courses?.reduce((acc, course) => acc + course.price, 0) || 0;
  const total = subtotal;

  const handleRemoveFromCart = async (course_id) => {
    await dispatch(removeFromCart({ course_id, student_id })).unwrap();
  };

  const handleNavigateToCourses = () => {
    navigate("/student/courses");
  };

  if (courses?.length === 0 || !courses) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <nav className="text-sm">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link
                    to="/student/courses"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400 mx-2">/</span>
                  <span className="text-gray-900">Shopping Cart</span>
                </li>
              </ol>
            </nav>
          </div>

          <Card>
            <div className="p-12 text-center">
              <ShoppingBag className="w-24 h-24 text-orange-500 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven&apos;t added any courses to your cart yet.
              </p>
              <Button
                text="Explore Courses"
                className="bg-orange-500 max-w-fit font-semibold hover:bg-orange-600 text-white px-6 py-3 rounded-md"
                onClick={handleNavigateToCourses}
              />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  to="/student/courses"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Courses
                </Link>
              </li>
              <li>
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-900">Shopping Cart</span>
              </li>
            </ol>
          </nav>
        </div>

        <h1 className="text-2xl font-semibold mb-8">
          Shopping Cart ({courses?.length || 0})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                <div className="grid grid-cols-[1fr,auto,auto] items-center text-sm text-gray-500 pb-4">
                  <div>COURSE</div>
                  <div className="text-center px-4">PRICE</div>
                  <div className="text-right">ACTION</div>
                </div>
                <hr className="border-t border-gray-200 mb-4" />
                {courses?.map((course, index) => (
                  <div key={course.course_id}>
                    <div className="py-6 grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                      <div className="flex gap-4 items-center">
                        <img
                          src={course.course_thumbnail}
                          alt={course.title}
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-medium mb-1">{course.title}</h3>
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-medium">
                              {course.average_rating.toFixed(1)}
                            </span>
                            <span className="text-gray-500 text-sm">
                              ({course?.ratings_count} Reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center px-4">
                        <div className="text-lg font-semibold text-orange-500">
                          ₹{course.price.toFixed(2)}
                        </div>
                      </div>
                      <Button
                        text={<Trash2 className="w-5 h-5" />}
                        className="text-red-500 bg-transparent hover:text-red-600 hover:bg-red-100 p-2 rounded-md"
                        onClick={() => handleRemoveFromCart(course.course_id)}
                      />
                    </div>
                    {index < courses.length - 1 && (
                      <hr className="border-t border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <hr className="border-t border-gray-200" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <Button
                    text="Proceed To Checkout"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => navigate(`/student/checkout/${student_id}`)}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
