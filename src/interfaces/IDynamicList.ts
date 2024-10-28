import { IEmployee } from "./IEmployee";
import { IDepartment } from "./IDepartment";

export interface IDynamicList {
  employee?: IEmployee;
  department?: IDepartment;
  buttonText?: string;
  showDeleteButton?: boolean;
  onDelete: (id: number) => void;
  onUpdate?: () => void;
}
