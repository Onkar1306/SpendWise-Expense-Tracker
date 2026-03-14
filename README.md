:::writing{variant=“standard” id=“84021”}

SmartSpend – Expense Tracking & Financial Analysis App

SmartSpend is a modern React-based expense tracking web application that helps users record, monitor, and analyze their spending habits efficiently. The application allows users to add expenses, categorize them, and visualize spending patterns through graphs and category analysis.

The application also supports real-time currency conversion, allowing users to view their expenses in different currencies such as USD, EUR, and GBP.

Features

• Add daily expenses with name, amount, category, and currency
• Delete expenses instantly
• Expense history grouped by month
• Total lifetime spending calculation
• Category-wise expense analysis
• Monthly expense bar graph visualization
• Real-time currency conversion
• Data persistence using LocalStorage
• Clean and responsive UI built using Tailwind CSS

Tech Stack

Frontend
React (Functional Components)
React Hooks – useState, useEffect

Styling
Tailwind CSS

Data Storage
Browser LocalStorage

API
Exchange Rate API for currency conversion

Application Components

ExpensesPage – Main page managing application state
AddExpense – Form for adding new expenses
ExpenseList – Displays expense history
Total – Shows total spending with monthly graph
Category – Displays category-wise expense analysis

Installation

Clone the repository
git clone https://github.com/yourusername/smartspend-expense-tracker.git

Navigate to project directory
cd smartspend-expense-tracker

Install dependencies
npm install

Run the development server
npm run dev

Open the browser
http://localhost:5173

Future Improvements

• Edit expense functionality
• User authentication
• Cloud database storage
• Advanced analytics and charts
:::
