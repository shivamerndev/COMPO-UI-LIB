import IUserRepository from "../contract/user.contract.js";
import User from "../../models/user.model.js";
import Token from "../../models/token.model.js"


class MongoUserRepository extends IUserRepository {

    async createUser(userData) {
        const user = new User(userData);
        const savedUser = await user.save();
        return savedUser;
    }

    async findUser(email) {
        return await User.findOne({
            $or: [
                { email: email },
                { phone: email }
            ]
        }).select("+password")
    }

    async findUserByEmail(email) {
        return await User.findOne({ email })
    }

    async findUserById(id) {
        return await User.findById(id)
    }

    async updateUser(userId, updateObj) {
        return await User.findByIdAndUpdate(userId, updateObj, { returnDocument: 'after' });
    }

    async blackListToken(token) {
        return await Token.create({ token });
    }

    async findBlackListToken(token) {
        return await Token.findOne({ token });
    }

}

export default MongoUserRepository;