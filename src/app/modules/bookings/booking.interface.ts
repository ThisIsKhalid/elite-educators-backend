import { Types } from "mongoose"
import { IUserProfile } from "../user/user.interface"
import { IService } from "../service/service.interface";

 type IBatch = {
  amountPerWeek: number;
  daysPerWeek: number;
};
 
 export type IBooking = {
    userId: Types.ObjectId | IUserProfile;
    serviceId: Types.ObjectId | IService
    status: boolean; // true = accepted, false = rejected
    batch: IBatch;
    startDate: string;
    endDate: string;
 }
