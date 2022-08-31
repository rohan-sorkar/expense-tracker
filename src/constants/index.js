// id generator
function * genId() {
    let id = 1
    while(true) {
        yield id++
    }
}
export const id = genId();


export const fakeTransactions = [
    // {
    //     id: id.next().value,
    //     title: 'groceries',
    //     amount: 350,
    //     isIncome: false,
    //     date: new Date('Tue Aug 30 2022 14:21:29 GMT+0600')
    // },
    // {
    //     id: id.next().value,
    //     title: 'salary',
    //     amount: 1050,
    //     isIncome: true,
    //     date: new Date('Mon Aug 29 2022 16:45:01 GMT+0600')
    // },
    // {
    //     id: id.next().value,
    //     title: 'bus',
    //     amount: 180,
    //     isIncome: false,
    //     date: new Date('Sun Aug 28 2022 10:33:59 GMT+0600')
    // }
]