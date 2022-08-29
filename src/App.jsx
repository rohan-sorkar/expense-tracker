import React from 'react';
import {RiDeleteBin4Line} from 'react-icons/ri';

const App = () => {
  return (
    <div className='flex justify-center px-4 my-8 xs:mt-16'>
      <div className='bg-white w-full xs:max-w-md rounded-2xl p-5 xs:p-8 shadow'>
        <h1 className='text-2xl text-center font-medium'>Expense Tracker</h1>
        <h3 className='mt-5 xs:mt-10 text-sm font-bold'>Your Balance</h3>
        <p className='text-xl'>$1,255.00</p>
        <div className='flex justify-between shadow py-4 px-8 mt-6 rounded-2xl text-center divide-x-2 divide-slate-100'>
          <div>
            <p className='text-sm font-medium text-gray-700'>INCOME</p>
            <p className='text-emerald-400 text-lg'>$1,222.00</p>
          </div>
          <div className='pl-5 xs:pl-20'>
            <p className='text-sm font-medium text-gray-700'>EXPENSE</p>
            <p className='text-red-400 text-lg'>$1,222.00</p>
          </div>
        </div>
        <h3 className='text-lg font-medium mt-6'>History</h3>
        <hr className='mt-2 border-[1px] border-purple-200' />
        <div className='mt-2 shadow p-4 rounded-xl'>
          <input type="text" className='border outline-none rounded-xl py-2 px-4 border-purple-100 caret-purple-200 text-sm mb-2 w-full' placeholder='Search...' />
          <div className='flex gap-2'>
            <button className='bg-blue-500 border-2 border-blue-500 text-white rounded-full py-1 px-2 xs:px-6'>All</button>
            <button className='border-2 border-blue-500 text-blue-600 rounded-full py-1 px-2 xs:px-6'>Income</button>
            <button className='border-2 border-blue-500 text-blue-600 rounded-full py-1 px-2 xs:px-6'>Expense</button>
          </div>
        </div>
        <div className='mt-6 space-y-5'>
          <div className='shadow rounded-2xl py-3 px-8 border-r-8 border-red-400'>
            <p className='text-center font-medium border shadow-sm mb-2'>monday, 10:32 PM</p>
            <div className='flex justify-between items-center'>
              <p>Groceries</p>
              <RiDeleteBin4Line className='cursor-pointer'></RiDeleteBin4Line>
              <p>-50.00</p>
            </div>
          </div>
          <div className='shadow rounded-2xl py-3 px-8 border-r-8 border-green-300'>
            <p className='text-center font-medium border shadow-sm mb-2'>sunday, 5:32 AM</p>
            <div className='flex justify-between items-center'>
              <p>Salary</p>
              <RiDeleteBin4Line className='cursor-pointer'></RiDeleteBin4Line>
              <p>+120.00</p>
            </div>
          </div>
          <div className='shadow rounded-2xl py-3 px-8 border-r-8 border-red-400'>
            <p className='text-center font-medium border shadow-sm mb-2'>monday, 10:32 PM</p>
            <div className='flex justify-between items-center'>
              <p>Groceries</p>
              <RiDeleteBin4Line className='cursor-pointer'></RiDeleteBin4Line>
              <p>-50.00</p>
            </div>
          </div>
        </div>
        <h3 className='text-lg font-medium mt-6'>Add new transaction</h3>
        <hr className='mt-2 border-[1px] border-purple-200' />
        <form className='shadow rounded-2xl mt-6 p-5'>
          <div className='flex flex-col'>
            <label className='font-medium text-gray-700 mb-1'>Title</label>
            <input type="text" className='border outline-none rounded-xl py-2 px-4 border-purple-100 caret-purple-200 text-sm mb-2' placeholder='Enter title...' />
          </div>
          <div className='flex flex-col'>
            <label className='font-medium text-gray-700 mb-1'>Amount</label>
            <input type="text" className='border outline-none rounded-xl py-2 px-4 border-purple-100 caret-purple-200 text-sm mb-2' placeholder='Enter title...' />
          </div>
          <div className='flex gap-4 mb-2'>
            <input type="radio" className='w-4 accent-green-400' />
            <p className='text-slate-700 text-lg font-medium'>Income</p>
          </div>
          <div className='flex gap-4 mb-2'>
            <input type="radio" className='w-4 accent-red-400' />
            <p className='text-slate-700 text-lg font-medium'>Expense</p>
          </div>
          <button type='submit' className='bg-purple-500 text-white w-full rounded-full py-1 mt-2 hover:bg-purple-600 transition'>Add transaction</button>
        </form>
      </div>
    </div>
  )
}

export default App;