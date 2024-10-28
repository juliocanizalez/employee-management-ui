import { IDepartment } from "./IDepartment";
import { IDepartmentHistory } from "./IDepartmentHistory";

export interface IEmployee {
  id?: number;
  firstName: string;
  lastName: string;
  hireDate: string | Date;
  phone: string;
  address: string;
  isActive: boolean;
  imageUrl: string;
  Department?: IDepartment;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  departmentId?: number;
  EmployeeDepartmentHistory?: IDepartmentHistory[];
}
