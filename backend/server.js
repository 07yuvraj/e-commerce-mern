import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoute.js'
import orderRoutes from './routes/orderRoute.js'
import uploadRoutes from './routes/uploadRoute.js'

dotenv.config()
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploads', uploadRoutes)
app.use('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//for creating production ready react app
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is running !!!!!!')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))