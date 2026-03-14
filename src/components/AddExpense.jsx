import React, { useEffect, useState } from "react";
import axios from "axios";

const AddExpense = ({ isOpen, onClose, onAddExpense }) => {

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [category, setCategory] = useState("Food");
  const [rate, setRate] = useState(1);

  if (!isOpen) return null;

  useEffect(() => {
    if (currency === "INR") {
      setRate(1);
      return;
    }
    const fetchRate = async () => {
      try {
        const res = await axios.get(
          `https://api.frankfurter.app/latest?from=${currency}&to=INR`
        );
        setRate(res.data.rates.INR);
      } catch (err) {
        console.log("Currency API error:", err);
      }
    };
    fetchRate();
  }, [currency]);

  const convertedINR = amount ? (amount * rate) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      name,
      originalAmount: parseFloat(amount),
      currency,
      amountINR: convertedINR,
      category,
      date: new Date()
    };

    console.log("New Expense:", newExpense);
    onAddExpense(newExpense);

    setName("");
    setAmount("");
    setCurrency("INR");
    setCategory("Food");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-zinc-900 text-white p-6 rounded-xl w-[360px]">

        <h2 className="text-xl font-simplefont font-bold mb-4 text-center">Add Expense</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Expense Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-black border border-gray-600 outline-none  focus:border-rose-500"
            required
          />

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 rounded outline-none  focus:border-rose-500 bg-black border border-gray-600"
              required
            />

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="p-2 rounded bg-black border border-gray-600 outline-none  focus:border-rose-500 "
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded  focus:border-rose-500 bg-black border border-gray-600 outline-none "
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Bill</option>
            <option>EMI</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Shopping</option>
            <option>Fuel</option>
            <option>Other</option>
          </select>

          <div className="bg-black p-3 rounded border border-gray-700">
            <p className="text-sm text-gray-400">Converted to INR</p>
            <p className="text-green-400 font-bold text-lg">
              ₹ {convertedINR.toFixed(2)}
            </p>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="w-full bg-gray-600 py-2 rounded" > Cancel </button>
            <button type="submit" className="w-full bg-rose-700 py-2 rounded"> Add Expense </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddExpense;
