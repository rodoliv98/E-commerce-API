import { createAccount } from "../controllers/registerController.js"

const mockReq = {
    email: 'test@gmail.com',
    password: '123456'
}

const mockRes = {
    status: jest.fn(),
    send: jest.fn()
}

describe('register new account', () => {
    it('Should create an new account', () => {
        createAccount(mockReq, mockRes)
        expect(mockRes.send).toHaveBeenCalled();
    })
})