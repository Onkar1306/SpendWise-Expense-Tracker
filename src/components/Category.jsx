import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = ({ expenses }) => {
  const [currency, setCurrency] = useState("INR");
  const [rates, setRates] = useState({});

  // fetch exchange rates (base INR)
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get("https://open.er-api.com/v6/latest/INR");
        setRates(res.data.rates);
        console.log("Fetched rates:", res.data.rates);
      } catch (error) {
        console.log("Error fetching rates", error);
      }
    };

    fetchRates();
  }, []);

  // categoryTotals calculation for bar graph
  const categoryTotals = expenses.reduce((group, expense) => {
    const cat = expense.category;

    if (!group[cat]) {
      group[cat] = 0;
    }

    group[cat] += expense.amountINR;
    return group;
  }, {});

  // converting amount to selected currency for display
  const convertAmount = (amount) => {
    if (currency === "INR") return amount.toFixed(2);

    if (!rates || !rates[currency]) {
      return amount.toFixed(2);
    }

    const rate = rates[currency];
    return (amount * rate).toFixed(2);
  };

  const symbolMap = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-fancyfont">Category Analysis</h2>

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-gray-800 border border-gray-600 px-3 py-1 rounded"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div className="space-y-4">
        {Object.entries(categoryTotals).map(([category, amount]) => {
          const converted = convertAmount(amount);

          return (
            <div key={category} className="p-3 border border-gray-700 rounded">
              <div className="flex justify-between mb-2">
                <span className="font-medium font-simplefont">{category}</span>
                <span className="font-simplefont">
                  {symbolMap[currency]} {converted}
                </span>
              </div>

              <div className="w-full bg-gray-700 h-3 rounded">
                <div
                  className="bg-green-500 h-3 rounded"
                  style={{
                    width: `${(amount / Math.max(...Object.values(categoryTotals))) * 100}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
