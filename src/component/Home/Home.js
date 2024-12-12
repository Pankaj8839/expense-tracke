import React, { useState, useEffect} from 'react';
import styles from "./Home.module.css";
import Card from "../Card/Card";
import  Modal from '../Model/Model';
import AddBalancForm from '../Form/AddBalanceForm';
import PieChart from '../PieChart/PieChart';
import ExpenseForm from '../Form/ExpenseForm';
import TransactionList from '../TransactionList/TransactionList';
import BarChartComponent from '../BarChart/BarChart';
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    console.log("storedValue in use")
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
const calculateCategoryStats = (expenseList) => {
  return expenseList.reduce(
    (acc, item) => {
      acc.spends[item.category] =
        (acc.spends[item.category] || 0) + Number(item.price);
      acc.counts[item.category] = (acc.counts[item.category] || 0) + 1;
      return acc;
    },
    {
      spends: { food: 0, entertainment: 0, travel: 0 },
      counts: { food: 0, entertainment: 0, travel: 0 },
    }
  );
};
const Home=()=>{
  const [balance, setBalance] = useLocalStorage("balance",5000 );
  const [expenseList, setExpenseList] = useLocalStorage("expenseList", []);
  const [isOpenBalance, setIsOpenBalance] = useState(false);
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const { spends: categorySpends, counts: categoryCounts } =
  calculateCategoryStats(expenseList);

  
  const expense = expenseList.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const openBalanceModal = () => {
    setIsOpenBalance(true);
  };
  const openExpenseModal = () => {
    setIsOpenExpense(true);
  };


    return (
        <div className={styles.conainerMain}>
          <h1 className={styles.heading}>Expense Tracker</h1>  
          <div className={styles.container}>
       <div className={styles.containerRectangle}>
    <Card cardTitle="Wallet Balance" money={balance} color="green" buttonTitle="Add Income" handleClick={openBalanceModal}/>
    <Card cardTitle="Expense" money={expense} color="red" buttonTitle="Add Expense" handleClick={openExpenseModal} />
 
    
       </div>
       <div className={styles.containerPieChart}>
       <PieChart
          data={[
            { name: "Food", value: categorySpends.food },
            { name: "Entertainment", value: categorySpends.entertainment },
            { name: "Travel", value: categorySpends.travel },
          ].filter((item) => item.value)}
        />
       </div>
        </div>
        <div className={styles.secondContainer}>
        <div className={styles.transactionsContainer}>
        <TransactionList
          transactions={expenseList}
          editTransactions={setExpenseList}
          title="Recent Transactions"
          balance={balance}
          setBalance={setBalance}
        />
         </div>
         <div className={styles.barchartContainer} >
        <BarChartComponent
          data={[
            { name: "Food", value: categoryCounts.food },
            { name: "Entertainment", value: categoryCounts.entertainment },
            { name: "Travel", value: categoryCounts.travel },
          ].filter((item) => item.value)}
        />
        </div>
     
      </div>
        
          <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
        <ExpenseForm
          setIsOpen={setIsOpenExpense}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          setBalance={setBalance}
          balance={balance}
        />
      </Modal>
          <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance} >
               <AddBalancForm setIsOpen={setIsOpenBalance} setBalance={setBalance}  />
          </Modal>
        </div>
    )
}

export default Home