import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Search, Edit, Trash } from 'lucide-react';
import {
  fetchCategories,
  deleteCategory,
  searchCategories,
} from "../../../store/slices/categoriesSlice";
import { toast } from "sonner";
import { useLoading } from "../../../contexts/LoadingContext";
import { debounce } from "lodash";
import AddCategoryModal from "./AddCategoriesModal";
import ConfirmationModal from "../../../utils/Modals/ConfirmtionModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const Categories = () => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const { startSpinnerLoading, stopSpinnerLoading } = useLoading();

  const { categories, loading } = useSelector((state) => state.categories);
  const isDarkMode = useSelector((state) => state.admin.toggleTheme);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearch = debounce((value) => {
    if (value.trim()) {
      dispatch(searchCategories(value));
    } else {
      dispatch(fetchCategories());
    }
  }, 1000);

  const onSearchChange = (value) => {
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleDelete = async () => {
    try {
      if (!selectedCategory) return;
      startSpinnerLoading();
      await dispatch(deleteCategory(selectedCategory)).unwrap();
      setSelectedCategory(null);
      stopSpinnerLoading();
      setIsConfirmationModalOpen(false);
      toast.success("Category deleted successfully");
    } catch (err) {
      toast.error(err.message || "Failed to delete category");
      stopSpinnerLoading();
    }
  };

  const handleDeleteCategoryModal = (id) => {
    setSelectedCategory(id);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmModalClose = () => {
    setIsConfirmationModalOpen(false);
    setSelectedCategory(null);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Categories</h1>
        <Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6`}>
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-grow mr-4">
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-10 ${isDarkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-200 text-gray-800 placeholder-gray-500"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <Button
              onClick={() => {
                setSelectedCategory(null);
                setIsModalOpen(true);
              }}
              className={`${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-orange-500 hover:bg-orange-600"} text-white transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Category
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Name</TableHead>
                  <TableHead className="font-bold">Description</TableHead>
                  <TableHead className="font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      <div className="w-6 h-6 border-2 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                    </TableCell>
                  </TableRow>
                ) : categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      No categories found
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow key={category._id} className="transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700">
                      <TableCell>{category.title}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(category)}
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                          >
                            <Edit size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCategoryModal(category._id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors duration-200"
                          >
                            <Trash size={18} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <AddCategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={selectedCategory}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleConfirmModalClose}
        onConfirm={handleDelete}
        title="Delete Category"
        description="Are you sure you want to delete this category?"
        confirmText="Delete"
        cancelText="Cancel"
        icon="danger"
      />
    </div>
  );
};

export default Categories;

