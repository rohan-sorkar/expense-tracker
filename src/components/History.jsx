import React from 'react';
import {RiDeleteBin4Line} from 'react-icons/ri';

const History = (props) => {
    const {handleSearch, handleFilter, state, transformTransaction, deleteTransaction } = props;

  return (
    <React.Fragment>
        <h3 className='text-lg font-medium mt-6'>History</h3>
        <hr className='mt-2 border-[1px] border-purple-200' />
        <div className='mt-2 shadow p-4 rounded-xl'>
          <input type="text" className='border outline-none rounded-xl py-2 px-4 border-purple-100 caret-purple-200 text-sm mb-2 w-full' placeholder='Search...' value={state.search} onChange={handleSearch}  />
          <div className='flex gap-2'>
            <button onClick={() => handleFilter('all')} className={`${state.filter === 'all' ? 'bg-blue-500 text-white' : 'text-blue-700'} border-2 border-blue-500 rounded-full py-1 px-2 xs:px-6`}>All</button>
            <button onClick={() => handleFilter('income')} className={`${state.filter === 'income' ? 'bg-blue-500 text-white' : 'text-blue-700'} border-2 border-blue-500 rounded-full py-1 px-2 xs:px-6`}>Income</button>
            <button onClick={() => handleFilter('expense')} className={`${state.filter === 'expense' ? 'bg-blue-500 text-white' : 'text-blue-700'} border-2 border-blue-500 rounded-full py-1 px-2 xs:px-6`}>Expense</button>
          </div>
        </div>

        <div className='mt-6 space-y-5'>
          {transformTransaction.map((transaction) => (
            <div key={transaction.id} className={`shadow rounded-2xl py-3 px-8 border-r-8 ${transaction.isIncome ? 'border-green-300' : 'border-red-400' } `}>
              <p className='text-center font-medium border shadow-sm mb-2'>{transaction.day}, {transaction.time}</p>
              <div className='flex justify-between items-center'>
                <p className='capitalize'>{transaction.title}</p>
                <div onClick={() => deleteTransaction(transaction.id)} className='cursor-pointer bg-red-100 px-2 py-2 rounded-full hover:bg-red-300 text-red-600'>
                  <RiDeleteBin4Line/>
                </div>
                <p>{transaction.isIncome ? '+' + transaction.amount.toFixed(2) : '-' + transaction.amount.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
    </React.Fragment>
  )
}

export default History