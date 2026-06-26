import UserModel from "../../models/user.model.js";
import IUserRepository from "../contract/user.contract.js";

class MongoUserRepository extends IUserRepository {
  async createUser(userData) {
    return UserModel.create(userData);
  }

  async findUserByEmail(email) {
    return UserModel.findOne({ email, isActive: true });
  }

  async findUserByEmailWithPassword(email) {
    return UserModel.findOne({ email, isActive: true }).select("+password +refreshToken");
  }

  async findUserById(id) {
    return UserModel.findOne({ _id: id, isActive: true }).select("-password -refreshToken");
  }

  async findUserByIdWithRefreshToken(id) {
    return UserModel.findOne({ _id: id, isActive: true }).select("+refreshToken");
  }

  async updateUser(id, userData) {
    return UserModel.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    }).select("-password -refreshToken");
  }

  async updateRefreshToken(id, refreshToken) {
    return UserModel.findByIdAndUpdate(
      id,
      { refreshToken },
      { new: true, runValidators: true }
    ).select("-password -refreshToken");
  }

  async removeRefreshToken(id) {
    return UserModel.findByIdAndUpdate(
      id,
      { refreshToken: null },
      { new: true }
    ).select("-password -refreshToken");
  }
}

export default MongoUserRepository;
