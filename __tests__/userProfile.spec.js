import { createProfile, patchProfile, showHistoric, showProfile, showUser } from '../controllers/usersProfileController.js';
import { matchedData } from 'express-validator';
import { User } from '../mongooseSchemas/mongooseCreateUser.js';
import { Profile } from '../mongooseSchemas/mongooseCreateUserProfile.js';
import { Purchase } from '../mongooseSchemas/mongooseCreatePurchase.js';

jest.mock('../mongooseSchemas/mongooseCreateUser.js');
jest.mock('../mongooseSchemas/mongooseCreateUserProfile.js');
jest.mock('../mongooseSchemas/mongooseCreatePurchase.js');
jest.mock('express-validator', () => ({
    matchedData: jest.fn()
}))

describe('showUser controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: {
                id: '12345'
            }
        }

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        }
    });

    it('Should return 200 and the user data', async () => {
        const fakeData = { firstName: 'Jhon', email: 'jhon@email.com' };

        User.findOne.mockResolvedValue(fakeData);

        await showUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ _id: '12345' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: fakeData.firstName, email: fakeData.email });
    });

    it('Should return 404 if no user found', async () => {
        User.findOne.mockResolvedValue(null);

        await showUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('No user found');
    });

    it('Should throw an error', async () => {
        const error = new Error('Database error');
        User.findOne.mockRejectedValue(error);

        await showUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error', details: error.message });
    })
});

describe('showProfile controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: {
                id: '1234'
            }
        }

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        }
    });

    it('Should return 200 and show the user profile', async () => {
        const fakeProfile = { userID: '1234',
                              _id: '12321312',
                              fullName: 'Jogn Doe' };

        Profile.findOne.mockResolvedValue(fakeProfile);

        await showProfile(req, res);

        expect(Profile.findOne).toHaveBeenCalledWith({ userID: '1234' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ findProfile: fakeProfile });
    })

    it('Should return 404 if no profile', async () => {
        Profile.findOne.mockResolvedValue(null);

        await showProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Not found');
    });

    it('Should return 500 and error', async () => {
        const error = new Error('database error');
        Profile.findOne.mockRejectedValue(error);

        await showProfile(req, res);

        expect(Profile.findOne).toHaveBeenCalledWith({ userID: '1234' });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error', details: error.message })
    });
});

describe('createProfile controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: {
                id: '1234',
            },
            body: {
                fullName: 'Joao silva',
                birthDate: '05/05/1995',
                cpf: '123.123.123.11'
            } 
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        jest.clearAllMocks();
    });

    it('Should create account and return 200', async () => {
        matchedData.mockReturnValue(req.body);
        
        const fakeData = { _id: 'profileid', ...req.body, userID: req.user.id };
        Profile.create.mockResolvedValue(fakeData);

        await createProfile(req, res);

        expect(Profile.create).toHaveBeenCalledWith({ ...req.body, userID: req.user.id });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Profile created', 
                                                details: fakeData })
    });

    it('Should throw an error 500', async () => {
        const error = new Error('Database error');
        Profile.create.mockRejectedValue(error);

        await createProfile(req, res);

        expect(Profile.create).toHaveBeenCalledWith({ ...req.body, userID: req.user.id });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error', details: error.message });
    })
});

describe('patchProfile Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: {
                id: '1234'
            },
            body: {
                name: 'rodrigo',
                cpf: '1234'
            }
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        jest.clearAllMocks();
    });

    it('Should patch the profile and return 200', async () => {
        matchedData.mockReturnValue(req.body);

        const fakeData = { _id: 'profileid', ...req.body, userID: req.user.id };

        Profile.findOneAndUpdate.mockResolvedValue(fakeData);

        await patchProfile(req, res);

        expect(Profile.findOneAndUpdate).toHaveBeenCalledWith({ userID: req.user.id }, 
                                                                req.body,
                                                              { new: true });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Profile updated', details: fakeData })
    });

    it('Should throw an error 500', async () => {
        const error = new Error('Error');
        Profile.findOneAndUpdate.mockRejectedValue(error);

        await patchProfile(req, res);

        expect(Profile.findOneAndUpdate).toHaveBeenCalledWith({ userID: req.user.id }, 
                                                                req.body,
                                                              { new: true });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error', 
                                                details: error.message })
    });
})

describe('showHistoric Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: {
                id: '1234'
            }
        },
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should find and show the historic', async () => {
        const fakePurchase = [{
            _id: '1234',
            fullName: 'rodrigo',
            total: 100,
            state: 'SP',
            city: 'rio',
            street: 'alguma rua',
            houseNumber: 123,
            cep: '12345-678',
            cart: [],
            createdAt: new Date(),
            currency: 'BRL'
        }];

        Purchase.find.mockResolvedValue(fakePurchase);

        await showHistoric(req, res);

        expect(Purchase.find).toHaveBeenCalledWith({ userID: req.user.id });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            historic: [{
                id: '1234',
                fullName: 'rodrigo',
                total: 100,
                state: 'SP',
                city: 'rio',
                street: 'alguma rua',
                houseNumber: 123,
                cep: '12345-678',
                cart: [],
                date: fakePurchase[0].createdAt,
                currency: 'BRL'
            }]
        });
    });

    it('Not found 404', async () => {
        Purchase.find.mockResolvedValue([])

        await showHistoric(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('No historic');
    });

    it('Error 500', async () => {
        const error = new Error('Erro');
        Purchase.find.mockRejectedValue(error);

        await showHistoric(req, res);

        expect(Purchase.find).toHaveBeenCalledWith({ userID: req.user.id });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error',
                                                details: error.message });
    });
})