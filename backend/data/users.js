import bcrypt from 'bcryptjs'

const users=[
    {
        name:'Admin',
        email:'admin@gmail.com',
        password:bcrypt.hashSync('12345',6),
        isAdmin:true
    },
    {
        name:'Yuvi',
        email:'yuvi@gmail.com',
        password:bcrypt.hashSync('12345',6)
    },
    {
        name:'Mahi',
        email:'Mahi7701@gmail.com',
        password:bcrypt.hashSync('12345',6)
    }
]

export default users