import React from "react";
import deleteIcon from "../assets/icons8-delete-96.png"
const ExpenseList = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <p className="text-gray-500 ">
        No expenses added yet
      </p>
    );
  }

  const currencySymbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£"
  };

  const groupedExpenses = expenses.reduce((groups, expense) => {
    const date = new Date(expense.date);
    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }

   
    groups[monthYear].unshift(expense);
    return groups;
  }, {});

  return (
    <div className="space-y-6 ">
      {Object.keys(groupedExpenses).map((month) => (
        <div key={month}>
          <h3 className="text-lg font-semibold mb-2 font-fancyfont">{month}</h3>

          <div className="space-y-3">
            {groupedExpenses[month].map((expense) => {
              const date = new Date(expense.date);
              const formattedDate = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              });

              return (
                <div
                  key={expense.id}
                  className="flex justify-between items-center border-b border-gray-700 pb-2"
                >
                  <div className="flex gap-3 items-center">
                    <span className="text-gray-400 text-sm font-simplefont">
                      {formattedDate}
                    </span>

                    <div>
                      <p className="font-bold font-simplefont">{expense.name}</p>
                      <p className="font-simplefont text-sm text-gray-400">
                        {expense.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <span className="font-bold font-fancyfont text-green-400 font-lg text-lg">
                      {currencySymbols[expense.currency] || expense.currency} {expense.originalAmount}
                    </span>

                    <button
                      onClick={() => onDelete(expense.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                      title="Delete Expense">
                      <img src={deleteIcon} alt="Delete"  className="w-5 h-5 cursor-pointer" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;