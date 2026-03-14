import React, { useEffect, useState } from 'react'
import axios from "axios"

const Total = ({ expenses }) => {
  const [currency, setCurrency] = useState("INR")
  const [rate, setRate] = useState(1)
    const totalINR = expenses.reduce((sum,expense) =>{
        return sum + expense.amountINR;
    },0);

  const convertedTotal = totalINR * rate;

  useEffect(() => {
    if (currency === "INR") {
      setRate(1)
      return
    }

    const fetchRate = async () => {
      try {
        const res = await axios.get(
          `https://api.frankfurter.app/latest?from=INR&to=${currency}`
        )

        setRate(res.data.rates[currency])
      } catch (error) {
        console.log("Currency conversion error:", error);
      }
    }
    fetchRate()
  }, [currency]);

 
  const monthlyTotals = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!monthlyTotals[key]) {
      monthlyTotals[key] = 0;
    }

    monthlyTotals[key] += expense.amountINR;
  });


  const maxMonthlyExpense = Math.max(...Object.values(monthlyTotals), 0);

  return (
    <div className='space-y-6'>
        <div className='flex flex-col gap-2'>
            <h2 className='text-2xl font-bold font-fancyfont'>Total Expenses</h2>
            <div className='flex items-center gap-4'>
                <p className='text-green-400 font-bold text-3xl'>
                  {currency === "INR" ? "₹" : currency === "USD" ? "$" : currency === "EUR" ? "€" : "£"} {convertedTotal.toFixed(2)}
                </p>

                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-zinc-800 text-white px-2 py-1 rounded border border-gray-600"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
            </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 font-simplefont">Monthly Spending</h3>

          {Object.entries(monthlyTotals).map(([month, amount]) => (
            <div key={month} className="mb-4">

              <div className="flex justify-between text-sm mb-1">
                <span className='font-simplefont'>{month}</span>
                <span className='font-simplefont'>₹ {amount}</span>
              </div>

              <div className="w-full bg-gray-700 h-3 rounded">
                <div
                  className="bg-rose-600 h-3 rounded"
                  style={{
                    width: `${(amount / maxMonthlyExpense) * 100}%`
                  }}
                ></div>
              </div>

            </div>
          ))}

        </div>

    </div>
  )
}

export default Total
