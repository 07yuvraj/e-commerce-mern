import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './model/userModel.js'
import Product from './model/productModel.js'
import Order from './model/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        const createUsers = await User.insertMany(users)

        const adminUser = createUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })
        await Product.insertMany(sampleProducts)

        console.log('Data Created')

        process.exit()

    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}


const deleteData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed')

        process.exit()

    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}


if (process.argv[2] === '-d') {
    deleteData()
} else {
    importData()
}