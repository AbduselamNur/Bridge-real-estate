import { Request } from "express";
import PropertyDal from "../dals/Property.dal";
import { Property } from "../models";
import { createTransaction } from "../utilities/database/sequelize";
import { Transaction } from "sequelize";

class PropertyService {
  static async create(payload: Property, req: Request): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const transaction = await createTransaction();
      try {
        const user: any = req?.user;
        if (!user) {
          throw new Error("User not found.");
        }
        payload.user_id = user.id;
        const prop = await PropertyDal.create(payload, transaction);
        await transaction.commit();
        resolve({ success: true, data: prop });
      } catch (error) {
        await transaction.rollback();
        reject(error);
      }
    });
  }

  static async findAll(query: any): Promise<Property[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const properties = await PropertyDal.findAll(query);
        resolve(properties);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async findById(id: string): Promise<Property> {
    return new Promise(async (resolve, reject) => {
      try {
        const property = await PropertyDal.findOne(id);
        resolve(property);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async update(
    id: string,
    payload: Property,
    transaction?: Transaction
  ): Promise<Property> {
    return new Promise(async (resolve, reject) => {
      try {
        const propertyExist = await PropertyDal.findOne(id);
        if (!propertyExist) {
          throw new Error("Property not found.");
        }
        const property = await PropertyDal.update(id, payload, transaction);
        resolve(property);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getPagedWithCount(
    page: number,
    limit: number,
    filter?: any,
    search?: string
  ): Promise<{ properties: Property[]; count: number }> {
    return new Promise(async (resolve, reject) => {
      try {
        const properties = await PropertyDal.getPaged(
          page,
          limit,
          filter,
          search
        );
        const count = await PropertyDal.getCount();
        resolve({ properties, count });
      } catch (error) {
        reject(error);
      }
    });
  }

  static async delete(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const propertyExist = await PropertyDal.findOne(id);
        if (!propertyExist) {
          throw new Error("Property not found.");
        }
        await PropertyDal.delete(id);
        resolve({ success: true, id });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default PropertyService;
