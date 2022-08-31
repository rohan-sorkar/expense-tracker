import { useState } from 'react';
import {fakeTransactions, id} from '../constants';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import AddTransaction from './AddTransaction';
import Balance from './Balance';
import History from './History';

const MySwal = withReactContent(Swal)

const ExpenseTracker = () => {
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
        <h1 className='text-2xl text-center font-medium shadow-sm shadow-purple-200'>Expense Tracker</h1>
        <Balance balance={balance} income={income} expense={expense} />

        <History handleSearch={handleSearch} handleFilter={handleFilter} state={state} transformTransaction={transformTransaction} deleteTransaction={deleteTransaction}/>

        <AddTransaction formState={formState} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default ExpenseTracker;