import React from 'react';
import { useState } from 'react';
import {RiDeleteBin4Line} from 'react-icons/ri';
import {fakeTransactions, id} from './constants';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const App = () => {
  const [transactions, setTransaction] = useState([...fakeTransactions]);
  //! calculation the income and expense
  const {income, expense, balance} = transactions.reduce((acc, cur) => {
    if(cur.isIncome) {
      acc.income += cur.amount
    } else {
      acc.expense += cur.amount
    }
    acc.balance = acc.income - acc.expense;

    return acc;
  }, {income: 0, expense: 0, balance: 0});
  //! delete transaction
  const deleteTransaction = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const filterTransaction = transactions.filter(item => id !== item.id )
        setTransaction(filterTransaction);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }
  //! form functionalities
  const [formState, setFormState] = useState({title: '', amount: '', isIncome: true});
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.name === 'isIncome' ? (e.target.value === 'true') : e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formState.title === '' || formState.amount === '') {
      MySwal.fire({
        text: 'Fill up the form completely',
        icon: 'info'
      })
    } else {
      setTransaction([
        {
          id: id.next().value,
          ...formState,
          amount: parseInt(formState.amount),
          date: new Date()
        },
        ...transactions
      ]);
      setFormState({title: '', amount: '', isIncome: true})  
    }
  }
  //! search and filter
  const [state, setState] = useState({search: '', filter: 'all'});
  const handleSearch = (e) => {
    setState({...state, search: e.target.value})
  }
  const performSearch = () => {
    const searchItems = transactions.filter(item => item.title.toLowerCase().includes(state.search.toLowerCase()))
    return searchItems;
  }
  
  const handleFilter = (text) => {
    setState({...state, filter: text})
  }
  const performFilter = (trans) => {
    if(state.filter === 'income') {
      return trans.filter(item => item.isIncome);
    } else if (state.filter === 'expense') {
      return trans.filter(item => !item.isIncome)
    } else {
      return trans;
    }
  }
  let searchedTransactions = performSearch();
  searchedTransactions = performFilter(searchedTransactions);
  //! transform the transactions
  const dateTOtime = (date) => {
    return date.toLocaleTimeString();
  }
  const dateTOday = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = date.getDay();
    const day = days[d];
    return day;
  }
  const transformTransaction = searchedTransactions.map((item) => ({...item, time: dateTOtime(item.date), day: dateTOday(item.date)}))

  return (
    <div className='flex justify-center px-4 my-8 xs:mt-16'>
      <div className='bg-white w-full xs:max-w-md rounded-2xl p-5 xs:p-8 shadow'>
        <h1 className='text-2xl text-center font-medium'>Expense Tracker</h1>
        <h3 className='mt-5 xs:mt-10 text-sm font-bold'>Your Balance</h3>
        <p className='text-xl'>${balance.toFixed(2)}</p>

        <div className='flex justify-between shadow py-4 px-8 mt-6 rounded-2xl text-center divide-x-2 divide-slate-100'>
          <div>
            <p className='text-sm font-medium text-gray-700'>INCOME</p>
            <p className='text-emerald-400 text-lg'>${income.toFixed(2)}</p>
          </div>
          <div className='pl-5 xs:pl-20'>
            <p className='text-sm font-medium text-gray-700'>EXPENSE</p>
            <p className='text-red-400 text-lg'>${expense.toFixed(2)}</p>
          </div>
        </div>

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

        <h3 className='text-lg font-medium mt-6'>Add new transaction</h3>
        <hr className='mt-2 border-[1px] border-purple-200' />
        <form onSubmit={handleSubmit} className='shadow rounded-2xl mt-6 p-5'>
          <div className='flex flex-col'>
            <label className='font-medium text-gray-700 mb-1'>Title</label>
            <input type="text" className='border outline-none rounded-xl py-2 px-4 border-purple-100 caret-purple-200 text-sm mb-2' placeholder='Enter title...' name='title' value={formState.title} onChange={handleChange} />
          </div>
          <div className='flex flex-col'>
            <label className='font-medium text-gray-700 mb-1'>Amount</label>
            <input type="number" className='border outline-none rounded-xl py-2 px-4 border-purple-100 caret-purple-200 text-sm mb-2' placeholder='Amount...' name='amount' value={formState.amount} onChange={handleChange}  />
          </div>
          <div className='flex gap-4 mb-2'>
            <input type="radio" className='w-4 accent-green-400' name='isIncome' value={true} onChange={handleChange}  checked={formState.isIncome}/>
            <p className='text-slate-700 text-lg font-medium'>Income</p>
          </div>
          <div className='flex gap-4 mb-2'>
            <input type="radio" className='w-4 accent-red-400' name='isIncome' value={false} onChange={handleChange} checked={!formState.isIncome} />
            <p className='text-slate-700 text-lg font-medium'>Expense</p>
          </div>
          <button type='submit' className='bg-purple-500 text-white w-full rounded-full py-1 mt-2 hover:bg-purple-600 transition'>Add transaction</button>
        </form>
      </div>
    </div>
  )
}

export default App;