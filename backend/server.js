import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// HTTP server + Socket.IO (same port, existing REST unchanged)
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: { origin: '*' }
})

// Make io accessible in route controllers via req.app.get('io')
app.set('io', io)

io.on('connection', (socket) => {
    console.log('Admin connected via Socket.IO:', socket.id)
    socket.on('disconnect', () => {
        console.log('Admin disconnected:', socket.id)
    })
})

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

httpServer.listen(port, () => console.log('Server started on PORT : ' + port))