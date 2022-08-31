import React from 'react'

const AddTransaction = ({formState, handleChange, handleSubmit}) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default AddTransaction