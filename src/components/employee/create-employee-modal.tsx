import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Select, SelectItem } from "@nextui-org/select";
import { DatePicker } from "@nextui-org/date-picker";
import { useForm } from "react-hook-form";
import { IEmployee } from "@/interfaces/IEmployee";
import { IDepartment } from "@/interfaces/IDepartment";
import { departmentEndpoint } from "@/config/endpoints";
import { useApi } from "@/hooks/use-api";

interface ModalProps {
  onSave: (employee: IEmployee) => void;
}

export const CreateEmployeeModal: React.FC<ModalProps> = ({ onSave }) => {
  const api = useApi<IDepartment[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<IEmployee>({
    mode: "onChange",
  });

  const onSubmit = (data: IEmployee) => {
    if (isValid) {
      delete data.Department;
      onSave(data);
      onClose();
    }
  };

  const fetchDepartments = async () => {
    try {
      await api.get(`${import.meta.env.VITE_API_URL}${departmentEndpoint}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = () => {
    reset();
    onOpen();
    fetchDepartments();
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("departmentId", Number(e.target.value), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <>
      <Button color="primary" variant="flat" onClick={handleOpenModal}>
        Add Employee
      </Button>

      <Modal
        isDismissable={false}
        isOpen={isOpen}
        scrollBehavior="inside"
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Employee
              </ModalHeader>
              <ModalBody>
                <form id="employee-form" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    isClearable
                    isRequired
                    errorMessage={errors.firstName?.message}
                    isInvalid={!!errors.firstName}
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    label="First Name"
                    placeholder="Enter first name"
                  />
                  <Spacer y={4} />
                  <Input
                    isClearable
                    isRequired
                    errorMessage={errors.lastName?.message}
                    isInvalid={!!errors.lastName}
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    label="Last Name"
                    placeholder="Enter last name"
                  />
                  <Spacer y={4} />
                  <DatePicker
                    isRequired
                    errorMessage={errors.hireDate?.message}
                    isInvalid={!!errors.hireDate}
                    label="Hire Date"
                    onChange={(date) => {
                      setValue(
                        "hireDate",
                        new Date(date.toString()).toISOString(),
                        {
                          shouldValidate: true,
                          shouldDirty: true,
                        },
                      );
                    }}
                  />
                  <Spacer y={4} />
                  <Input
                    isClearable
                    isRequired
                    errorMessage={errors.phone?.message}
                    isInvalid={!!errors.phone}
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9-+()]*$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    label="Phone"
                    placeholder="Enter phone number"
                  />
                  <Spacer y={4} />
                  <Input
                    isClearable
                    isRequired
                    errorMessage={errors.address?.message}
                    isInvalid={!!errors.address}
                    {...register("address", {
                      required: "Address is required",
                    })}
                    label="Address"
                    placeholder="Enter address"
                  />
                  <Spacer y={4} />
                  <Select
                    disallowEmptySelection
                    isRequired
                    errorMessage={errors.departmentId?.message}
                    isInvalid={!!errors.departmentId}
                    label="Select Department"
                    placeholder="Select a department"
                    selectionMode="single"
                    onChange={handleDepartmentChange}
                  >
                    {(api.data || []).map((department) => (
                      <SelectItem
                        key={department.id!.toString()}
                        value={department.id!.toString()}
                      >
                        {department.name}
                      </SelectItem>
                    ))}
                  </Select>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  form="employee-form"
                  isDisabled={!isValid}
                  type="submit"
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
