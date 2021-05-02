import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAdminOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const orderAdminList = useSelector(state => state.orderAdminList)
    const { loading, error, orders } = orderAdminList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getAdminOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <div>
            <h1>Orders</h1>
            {loading ? (<Loader />) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>USER</td>
                            <td>DATE</td>
                            <td>TOTAL</td>
                            <td>PAID</td>
                            <td>DELIVERED</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        order.paidAt
                                    ) : (
                                        <i className="fas fa-times" style={{ color: "red" }}></i>
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        order.deliveredAt
                                    ) : (
                                        <i className="fas fa-times" style={{ color: "red" }}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default OrderListScreen
