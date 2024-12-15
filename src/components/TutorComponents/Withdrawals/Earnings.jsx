import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  CreditCard,
  ArrowDownToLine,
  AlertCircle,
} from "lucide-react";
import AddCardModal from "./AddCardModal";
import WithdrawModal from "./WithdrawModal";
import {
  addCard,
  getCourseDetailsByTutorId,
  getTutorDetails,
  getTutorWithdrawals,
  withdrawTutorEarnings,
} from "@/api/backendCalls/tutor";
import { toast } from "sonner";
import moment from "moment";

const courseRevenueData = [
  { name: "JavaScript Basics", total: 1000 },
  { name: "React Fundamentals", total: 22000 },
  { name: "Node.js Mastery", total: 18000 },
  { name: "Python for Beginners", total: 12000 },
  { name: "Data Structures & Algorithms", total: 20000 },
  { name: "Machine Learning Intro", total: 25000 },
  { name: "Web Design Principles", total: 14000 },
];

const withdrawalHistory = [
  {
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Mastercards",
    amount: "$1,000",
    status: "Pending",
  },
  {
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Visa",
    amount: "$500",
    status: "Pending",
  },
  {
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Mastercards",
    amount: "$2,000",
    status: "Completed",
  },
  {
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Visa",
    amount: "$750",
    status: "Cancelled",
  },
];

export default function EarningsPage() {
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [tutorDetails, setTutorDetails] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [courseStats, setCourseStats] = useState([]);
  const [card, setCard] = useState(tutorDetails?.card_details);

  const handleAddCard = async (cardData) => {
    setCard({
      last4: cardData.card_number.slice(-4),
      type: cardData.type,
      expiry: cardData.expiry_date,
      name: cardData.owner_name,
    });
    await addCard(cardData);
    setIsAddCardOpen(false);
  };

  const handleWithdraw = async (withdrawData) => {
    try {
      if (withdrawData.amount > tutorDetails?.current_balance) {
        return toast.error("Invalid Balance");
      }
      const response = await withdrawTutorEarnings(withdrawData);
      if (response) {
        setIsWithdrawOpen(false);
        toast.success(response?.message);
        setTutorDetails({
          ...tutorDetails,
          current_balance: tutorDetails?.current_balance - withdrawData.amount,
          total_withdrawn_amount:
            tutorDetails?.total_withdrawn_amount + Number(withdrawData.amount),
        });
        setWithdrawals([response?.withdrawal, ...withdrawals]);
      }
      console.log("Withdrawal data:", response);
    } catch (error) {
      console.log("Withdrawal error: ", error);
    }
  };

  const fetchDetails = useCallback(async () => {
    try {
      const details = await getTutorDetails("earningsPage");
      const withdrawalData = await getTutorWithdrawals();
      const courseStats = await getCourseDetailsByTutorId("earningsPage");
      setCourseStats(courseStats);
      setCard({
        id: "1",
        last4: details?.card?.card_number?.slice(-4),
        type: details?.card?.type,
        expiry: details?.card?.expiry_date,
        name: details?.card?.owner_name,
      });
      console.log(details);
      setWithdrawals(withdrawalData);
      setTutorDetails(details);
    } catch (error) {
      console.error("Error fetching tutor details:", error);
    }
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);
  console.log(card);

  const maxTotal = Math.max(...courseStats.map((item) => item.total_revenue));
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8">Earnings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="flex flex-col p-4 sm:p-6">
            <BarChart3 className={`h-6 w-6 sm:h-8 sm:w-8 text-red-500 mb-2`} />
            <p className="text-xs sm:text-sm text-muted-foreground">
              Current Balance
            </p>
            <p className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">
              ₹{tutorDetails?.current_balance}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col p-4 sm:p-6">
            <CreditCard
              className={`h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mb-2`}
            />
            <p className="text-xs sm:text-sm text-muted-foreground">
              Total Revenue
            </p>
            <p className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">
              ₹{tutorDetails?.total_earnings}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col p-4 sm:p-6">
            <ArrowDownToLine
              className={`h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mb-2`}
            />
            <p className="text-xs sm:text-sm text-muted-foreground">
              Total Withdrawals
            </p>
            <p className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">
              ₹{tutorDetails?.total_withdrawn_amount}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Course Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseStats.map((course, index) => (
                <div key={index} className="flex items-center gap-2">
                  {/* Course Title */}
                  <div className="w-1/4 text-sm font-medium text-gray-700 truncate">
                    {course.title}
                  </div>

                  {/* Graph Bar */}
                  <div className="flex items-center w-3/4">
                    <div className="flex-1 h-6 bg-gray-200 rounded overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded"
                        style={{
                          width: `${Math.min(
                            (course.total_revenue / maxTotal) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    {/* Revenue Value */}
                    <div className="ml-2 text-sm font-semibold text-gray-800">
                      ₹{course.total_revenue.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-bold">
              Card Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            {card && card.last4 && card.type && card.expiry && card.name ? (
              <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 p-4 sm:p-6 text-white">
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <div className="text-base sm:text-lg font-medium">
                      {card.type}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">
                      **** **** **** {card.last4}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <div>Expires</div>
                      <div>{card.expiry}</div>
                    </div>
                    <div>
                      <div>Card Holder Name</div>
                      <div>{card.name}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 sm:h-48 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <CreditCard className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-3 sm:mb-4" />
                <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
                  No card added yet
                </p>
                <Button
                  className="bg-[#FF5722] hover:bg-[#F4511E] text-xs sm:text-sm"
                  onClick={() => setIsAddCardOpen(true)}
                >
                  Add new card
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-bold">
              Withdraw your money
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm font-medium">
              Current Balance: ₹{tutorDetails?.current_balance}
            </div>
            {card && card.last4 && card.type && card.expiry && card.name ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border p-3 sm:p-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="h-6 w-10 sm:h-8 sm:w-12 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                      {card.type}
                    </div>
                    <div>
                      <div className="font-medium text-sm sm:text-base">
                        **** **** **** {card.last4}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Expires {card.expiry}
                      </div>
                    </div>
                  </div>
                  <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-primary flex items-center justify-center">
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-20 sm:h-24 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-muted-foreground text-sm">
                  Add a card to enable card withdrawals
                </p>
              </div>
            )}
            <Button
              className="w-full bg-[#FF5722] hover:bg-[#F4511E] text-sm"
              onClick={() => setIsWithdrawOpen(true)}
            >
              Withdraw Money
            </Button>
            <div className="flex items-start space-x-2 rounded-md border p-3 sm:p-4 bg-blue-50 dark:bg-blue-900">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 dark:text-blue-400 mt-0.5" />
              <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                <p className="font-semibold">Important:</p>
                <p>
                  Withdrawals are typically processed within 6-7 working days.
                </p>
                <p>Ensure your account details are correct to avoid delays.</p>
                <p>
                  For faster processing, consider using our premium withdrawal
                  service.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-bold">
            Withdrawal History
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto max-h-60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawals.length > 0 ? (
                withdrawals?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {moment(item?.requested_at)?.hours() > 24
                        ? moment(item?.requested_at)?.format("MMM-DD-YYYY")
                        : moment(item?.requested_at)?.calendar()}
                    </TableCell>
                    <TableCell>
                      {item.payment_method === "card"
                        ? item.card_details.type
                        : item.payment_method === "upi" && "UPI"}
                    </TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          item.status === "approved"
                            ? "bg-green-500"
                            : item.status === "pending"
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No withdrawals found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddCardModal
        isOpen={isAddCardOpen}
        onClose={() => setIsAddCardOpen(false)}
        onSubmit={handleAddCard}
      />
      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        onSubmit={handleWithdraw}
        card={card}
      />
    </div>
  );
}
