const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('./hashPassword.services');

class Seller {
  constructor() { }

  async getSellerByEmail(email) {
    try {
      const prisma = new PrismaClient();
      const seller = await prisma.seller.findUnique({
        where: {
          email: email,
        },
      });
      return seller;
    } catch (error) {
      console.log(error);
    }
  }

  async createSeller(body) {
    let { password, email, name, phoneNumber } = body;

    const prisma = new PrismaClient();
    const seller = await prisma.seller.create({
      data: {
        email: email,
        password: password,
        name: name,
        phoneNumber: phoneNumber
      }
    });
    return seller;
  }

  async updateSeller(id, body) {
    const { email, password, name, phoneNumber } = body;
    password = await hashPassword(password)

    const prisma = new PrismaClient();
    const seller = await prisma.seller.update({
      where: {
        id: id
      },
      data: {
        email: email,
        password: password,
        name: name,
        phoneNumber: phoneNumber
      }
    });
    return seller;
  }

  async deleteSeller(email) {
    const prisma = new PrismaClient();
    const seller = await prisma.seller.delete({
      where: {
        email: email
      }
    });
    return seller;
  }
}

module.exports = Seller;