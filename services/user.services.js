const { PrismaClient } = require('@prisma/client');
const { hashPassword, verifyPassword } = require('./hashPassword.services');


class UserServices {

  constructor() { }

  async getUserByEmail(email) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  async createUser(body) {
    try {
      var { password, email } = body;
      password = await hashPassword(password);

      const prisma = new PrismaClient();
      const user = await prisma.user.create({
        data: {
          email: email,
          password: password
        }
      });
      return user;
    } catch (error) {
      console.log(error);
    }

  }

  async updateUser(body) {
    const { email, password } = body;
    password = await hashPassword(password);

    const prisma = new PrismaClient();
    const user = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        password: password
      }
    });
    return user;
  }

  async deleteUser(email) {
    const prisma = new PrismaClient();
    const user = await prisma.user.delete({
      where: {
        email: email
      }
    });
    return user;
  }
}

module.exports = UserServices;