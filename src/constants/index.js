// id generator
function * genId() {
    let id = 1
    while(true) {
        yield id++
    }
}
export const id = genId();


export const fakeTransactions = [
    {
        id: id.next().value,
        title: 'groceries',
        amount: 350,
        isIncome: false,
        date: new Date()
    },
    {
        id: id.next().value,
        title: 'salary',
        amount: 1050,
        isIncome: true,
        date: new Date()
    },
    {
        id: id.next().value,
        title: 'bus',
        amount: 180,
        isIncome: false,
        date: new Date()
    }
]