// console.log(window.api.user.create({
//     name: 'Test User',
//     father_name: 'Test Father',
//     phone_no: '1234567890',
//     aadhaar_number: '1234-5678-9012',
//     status: 'Active'
// }))

console.log(
  window.api.user.create({
    name: 'Test User',
    father_name: 'Test Father',
    phone_no: '9876543217',
    aadhaar_number: '123456789013',
    reference: null
  })
)

console.log(window.api.user.findAll())

console.log(window.api.user.findById(1))

console.log(window.api.user.delete(2))
