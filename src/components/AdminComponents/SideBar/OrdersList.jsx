import { useState, useEffect } from "react"
import { Edit, Trash } from "lucide-react"
import Card from "../../../components/CommonComponents/Card"
import { useSelector } from "react-redux"
import { axiosInstance } from "../../../api/axiosConfig"
import { toast } from "sonner"
import { debounce } from "lodash"

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [ordersPerPage] = useState(10)
  const [state, setState] = useState({
    orders: [],
    filteredOrders: [],
  })

  const isDarkMode = useSelector((state) => state.admin.toggleTheme)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance("/admin/get-orders")
        if (response.status === 200) {
          setState({
            orders: response.data.orders,
            filteredOrders: response.data.orders,
          })
        }
      } catch (error) {
        console.log("Orders fetching error:", error)
      }
    }

    fetchOrders()
  }, [])

  const handleSearch = debounce(async (query) => {
    try {
      if (!query) {
        setState((prevState) => ({
          ...prevState,
          filteredOrders: prevState.orders,
        }))
        return
      }
      const response = await axiosInstance.get(
        `/admin/search-orders?query=${query}`
      )
      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          filteredOrders: response.data.orders,
        }))
      }
    } catch (error) {
      console.log("Search Orders Error: ", error)
      toast.error(error?.response?.data?.message)
    }
  }, 1000)

  const handleSearchInputChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    handleSearch(value)
  }

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders =
    Array.isArray(state.filteredOrders) && state.filteredOrders.length > 0
      ? state.filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
      : []

  const totalPages = Math.ceil(state.filteredOrders.length / ordersPerPage)

  const generatePaginationButtons = () => {
    const buttons = []
    const maxButtons = 5

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-4 py-2 mx-1 rounded-full ${
              currentPage === i
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i}
          </button>
        )
      }
    } else {
      const createPageButton = (pageNum) => (
        <button
          key={pageNum}
          onClick={() => setCurrentPage(pageNum)}
          className={`px-4 py-2 mx-1 rounded-full ${
            currentPage === pageNum
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {pageNum}
        </button>
      )

      if (currentPage <= 3) {
        buttons.push(
          createPageButton(1),
          createPageButton(2),
          createPageButton(3),
          <span key="separator1" className="mx-2">
            ...
          </span>,
          createPageButton(totalPages)
        )
      } else if (currentPage > totalPages - 3) {
        buttons.push(
          createPageButton(1),
          <span key="separator2" className="mx-2">
            ...
          </span>,
          createPageButton(totalPages - 2),
          createPageButton(totalPages - 1),
          createPageButton(totalPages)
        )
      } else {
        buttons.push(
          createPageButton(1),
          <span key="separator3" className="mx-2">
            ...
          </span>,
          createPageButton(currentPage - 1),
          createPageButton(currentPage),
          createPageButton(currentPage + 1),
          <span key="separator4" className="mx-2">
            ...
          </span>,
          createPageButton(totalPages)
        )
      }
    }

    return buttons
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Management</h1>
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Order ID</th>
                    <th className="py-3 px-6 text-left">Student ID</th>
                    <th className="py-3 px-6 text-left">Courses</th>
                    <th className="py-3 px-6 text-left">Total Price</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Payment Method</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {currentOrders.map((order) => (
                    <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6">{order._id}</td>
                      <td className="py-3 px-6">{order.student_id}</td>
                      <td className="py-3 px-6">{order.courses.join(", ")}</td>
                      <td className="py-3 px-6">${order.total_price.toFixed(2)}</td>
                      <td className="py-3 px-6">{order.status}</td>
                      <td className="py-3 px-6">{order.payment_method}</td>
                      <td className="py-3 px-6">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="py-3 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit size={18} />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {state.filteredOrders.length > 0 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>

                <div className="flex space-x-2">{generatePaginationButtons()}</div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Orders