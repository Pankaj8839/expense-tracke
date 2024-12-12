import { useEffect, useState } from "react";
import styles from "./TransactionList.module.css";
import Modal from "../Model/Model";
import ExpenseForm from "../Form/ExpenseForm";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PiPizza, PiGift } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { BsSuitcase2 } from "react-icons/bs";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Pagination=({ updatePage, currentPage, totalPages })=> {

    const handlePrev = () => {
        if(currentPage > 1){
            updatePage(prev => prev - 1)
        }
    }

    const handleNext = () => {
        if(totalPages != currentPage){
            updatePage(prev => prev + 1)
        }
    }

    return (
        <div className={styles.paginationWrapper}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
                <IoIosArrowRoundBack />
            </button>

            <p>{currentPage}</p>

            <button onClick={handleNext} disabled={totalPages === currentPage}>
                <IoIosArrowRoundForward />
            </button>
        </div>
    )
}

const TransactionCard=({ details, handleDelete, handleEdit })=> {

    return (
        <div className={styles.card}>
            <div className={styles.cardInner}>
                <div className={styles.cardIcon}>
                    {details.category == 'food' && <PiPizza />}
                    {details.category == 'entertainment' && <PiGift />}
                    {details.category == 'travel' && <BsSuitcase2 />}
                </div>
                <div className={styles.cardInfo}>
                    <h5>{details.title}</h5>
                    <p>{details.date}</p>
                </div>
            </div>

            <div className={styles.cardInner}>
                <p className={styles.cardPrice}>{`₹${details.price}`}</p>
                <div className={styles.cardButtonWrapper}>
                    <button className={styles.cardDelete} onClick={handleDelete}>
                        <IoMdCloseCircleOutline />
                    </button>
                    <button className={styles.cardEdit} onClick={handleEdit}>
                        <MdOutlineModeEdit />
                    </button>
                </div>
            </div>

        </div>
    )
}



const TransactionList=({
  transactions,
  title,
  editTransactions,
  balance,
  setBalance,
})=> {
  const [editId, setEditId] = useState(0);
  const [isDisplayEditor, setIsDisplayEditor] = useState(false);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const maxRecords = 3;
  const [totalPages, setTotalPages] = useState(0);

  const handleDelete = (id) => {
    const item = transactions.find((i) => i.id == id);
    const price = Number(item.price);
    setBalance((prev) => prev + price);

    editTransactions((prev) => prev.filter((item) => item.id != id));
  };

  const handleEdit = (id) => {
    setEditId(id);
    setIsDisplayEditor(true);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * maxRecords;
    const endIndex = Math.min(currentPage * maxRecords, transactions.length);

    setCurrentTransactions([...transactions].slice(startIndex, endIndex));
    setTotalPages(Math.ceil(transactions.length / maxRecords));
  }, [currentPage, transactions]);

  useEffect(() => {
    if (totalPages < currentPage && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [totalPages]);

  return (
    <div className={styles.transactionsWrapper}>
      {title && <h2>{title}</h2>}

      {transactions.length > 0 ? (
        <div className={styles.list}>
          <div>
            {currentTransactions.map((transaction) => (
              <TransactionCard
                details={transaction}
                key={transaction.id}
                handleDelete={() => handleDelete(transaction.id)}
                handleEdit={() => handleEdit(transaction.id)}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              updatePage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className={styles.emptyTransactionsWrapper}>
          <p>No transactions!</p>
        </div>
      )}

      <Modal isOpen={isDisplayEditor} setIsOpen={setIsDisplayEditor}>
        <ExpenseForm
          editId={editId}
          expenseList={transactions}
          setExpenseList={editTransactions}
          setIsOpen={setIsDisplayEditor}
          balance={balance}
          setBalance={setBalance}
        />
      </Modal>
    </div>
  );
}
export default TransactionList;