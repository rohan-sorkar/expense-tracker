import React from 'react';

const Balance = ({balance, income, expense}) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default Balance;