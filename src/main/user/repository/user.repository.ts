import { Prisma, User } from "@prisma/client";
import { prisma } from "../../container";

 class UserRepository {

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({ data });
  }

  async findById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async delete(id: number): Promise<User> {
    return await prisma.user.delete({ where: { id } });
  }
  
  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return await prisma.user.update({ where: { id }, data });
  }
}

export const userRepository = new UserRepository();