import React, { useEffect, useState } from "react";
import billIcon from "../assets/icons8-bill-96.png"
import ExpenseList from "../components/ExpenseList";
import AddExpense from "../components/AddExpense";
import Total from "../components/Total";
import Category from "../components/Category";
const ExpensesPage = () => {

    const [expenses, setExpenses] = useState(() => {
        const savedExpenses = localStorage.getItem("expenses");
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });

    const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);

    const handleAddExpense = (newExpense) => {
        setExpenses((prev) => [...prev, newExpense]);
    }

    const handleDeleteExpense = (id) => {
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    };

    useEffect(() => {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    const [activeTab, setActiveTab] = useState("history");

  return (
    <div className="min-h-screen bg-blend-color text-white bg-gray-100 flex justify-center">
      <div className="w-full max-w-3xl bg-zinc-900 p-6 relative ">
      
      {/* Add expense pop up */}
      {showAddExpenseForm && (
        <AddExpense
          isOpen={showAddExpenseForm}
          onClose={() => setShowAddExpenseForm(false)}
          onAddExpense={handleAddExpense}
        />
      )}     

       <div className="pb-4 border-b border-gray-700">
            <h1 className="text-3xl font-bold font-fancyfont px-5 py-10 bg-rose-700 rounded text-center mb-6">
            Expense Tracker
            </h1>
       </div>

    
        <div className="flex justify-between items-center my-6">
         <div className="flex gap-3">
            <button className="bg-black  border-rose-500 border cursor-pointer hover:scale-[1.02] transition-transform font-simplefont text-white px-4 py-2 rounded" onClick={() => setActiveTab("history")}>
              History
            </button>
            <button onClick={() => setActiveTab("total")} className="bg-black  border-rose-500 border cursor-pointer hover:scale-[1.02] transition-transform font-simplefont text-white px-4 py-2 rounded">
              Total
            </button>
            <button onClick={() => setActiveTab("category")} className="bg-black border-rose-500 border cursor-pointer hover:scale-[1.02] transition-transform font-simplefont text-white px-4 py-2 rounded">
              Category Analysis
            </button>
          </div>
        </div>

        
        <div className="border rounded p-4 border-gray-700 flex flex-col h-[65vh] overflow-hidden">
          <div className="flex-1 overflow-y-auto pb-16">
            {activeTab === "history" && (
              <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
            )}
            {activeTab === "total" && (
              <Total expenses={expenses} />
            )}
            {activeTab === "category" && (
              <Category expenses={expenses} />
            )}
          </div>
        </div>

        <div className="absolute bottom-9 right-8">
          <button onClick={() => setShowAddExpenseForm(true)} className="bg-rose-700 flex items-center justify-center text-white px-12 py-4 font-simplefont font-bold font-lg cursor-pointer hover:scale-[1.05] transition-transform rounded-full">
            <img
              src={billIcon}
              alt="Add Expense"
              className="inline-block w-5 h-5 mr-2"
            />
            Add Expense
          </button>
        </div>

      </div>

    </div>
  );
};

export default ExpensesPage;
