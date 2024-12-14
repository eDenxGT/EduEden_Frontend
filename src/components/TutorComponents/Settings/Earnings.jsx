import { useState } from "react";
import { Line } from "recharts";
import { Bell, Search, ChevronRight, ChevronLeft, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const data = [
  { date: "Aug 01", value: 1000 },
  { date: "Aug 10", value: 1749 },
  { date: "Aug 20", value: 1500 },
  { date: "Aug 31", value: 1600 },
];

const withdrawalHistory = [
  {
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Mastercards",
    amount: "American Express",
    status: "Pending",
  },
  {
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Visa",
    amount: "American Express",
    status: "Pending",
  },
  {
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Mastercards",
    amount: "American Express",
    status: "Completed",
  },
  {
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Visa",
    amount: "American Express",
    status: "Cancelled",
  },
];

export default function Earnings() {
  const [selectedCard, setSelectedCard] = useState(0);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-sm text-muted-foreground">Good Morning</div>
          <h1 className="text-2xl font-bold">Earning</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-10 w-[250px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-primary" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$13,804.00</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$16,593.00</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$13,184.00</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$162.00</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Statistic</CardTitle>
              <Select defaultValue="revenue">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="withdrawals">Withdrawals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]">
              <Line
                data={data}
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                fill="url(#gradient)"
              />
              <ChartTooltip />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Cards</CardTitle>
              <Select defaultValue="revenue">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative h-48 w-full overflow-hidden rounded-xl bg-[#4F46E5] p-6">
                <div className="absolute right-4 top-4">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 12.3C0 5.50659 5.50659 0 12.3 0H19.7C26.4934 0 32 5.50659 32 12.3V19.7C32 26.4934 26.4934 32 19.7 32H12.3C5.50659 32 0 26.4934 0 19.7V12.3Z"
                      fill="white"
                      fillOpacity="0.1"
                    />
                  </svg>
                </div>
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-lg font-medium text-white">VISA</div>
                    <div className="text-2xl font-bold text-white">4855 **** **** ****</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/80">
                      <div>Expires</div>
                      <div>04/24</div>
                    </div>
                    <div className="text-sm text-white/80">
                      <div>Card Name</div>
                      <div>Vako Shvili</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add new card
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Withdraw your money</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Payment method:</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-8 w-12 bg-[#1434CB] rounded flex items-center justify-center text-white font-bold">VISA</div>
                      <div>
                        <div className="font-medium">4855 **** **** ****</div>
                        <div className="text-sm text-muted-foreground">Expires 04/24</div>
                      </div>
                    </div>
                    <div className="h-4 w-4 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
              <Button className="w-full">Withdraw Money</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Withdraw History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawalHistory.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.method}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

