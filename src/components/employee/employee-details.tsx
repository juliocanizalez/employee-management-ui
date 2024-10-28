import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Image } from "@nextui-org/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { Spacer } from "@nextui-org/spacer";
import { Card, CardFooter } from "@nextui-org/card";
import { ConfirmDialog } from "../common/confirm-dialog";
import { useApi } from "@/hooks/use-api";
import { IEmployee } from "@/interfaces/IEmployee";
import { IDepartment } from "@/interfaces/IDepartment";
import { formatDate } from "@/utils/dateUtils";
import { employeeEndpoint, departmentEndpoint } from "@/config/endpoints";
import { DEFAULT_NO_IMAGE_URL } from "@/config/defaults";

const columns = [
  {
    key: "createdAt",
    label: "Date",
  },
  {
    key: "department",
    label: "Department",
  },
];

export const EmployeeDetails: React.FC<{
  employeeId: number;
  onUpdate?: () => void;
}> = ({ employeeId, onUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const api = useApi<IEmployee>();
  const departmentApi = useApi<IDepartment[]>();
  const [selectedDepartment, setSelectedDepartment] = useState<Set<string>>(
    new Set([]),
  );
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);
  const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState(false);
  const [isOpenDeactivateDialog, setIsOpenDeactivateDialog] = useState(false);
  const fetchEmployee = async () => {
    try {
      await api.get(
        `${import.meta.env.VITE_API_URL}${employeeEndpoint}/${employeeId}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDepartments = async () => {
    try {
      await departmentApi.get(
        `${import.meta.env.VITE_API_URL}${departmentEndpoint}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (api.data?.departmentId) {
      setSelectedDepartment(new Set([api.data.departmentId.toString()]));
    }
  }, [api.data?.departmentId]);

  const handleOpenModal = () => {
    fetchEmployee();
    fetchDepartments();
    onOpen();
  };

  const handleSelectionChange = (keys: Selection) => {
    if (keys === "all" || keys.size > 0) {
      setSelectedDepartment(keys as Set<string>);
      setIsUpdateDisabled(false);
    }
  };

  const handleDeactivateEmployee = async (id: number) => {
    await api.patch(
      `${import.meta.env.VITE_API_URL}${employeeEndpoint}/${id}/deactivate`,
    );

    fetchEmployee();
  };

  const handleActivateEmployee = async (id: number) => {
    await api.patch(
      `${import.meta.env.VITE_API_URL}${employeeEndpoint}/${id}/activate`,
    );
    fetchEmployee();
  };

  const handleEmployeeStatusChange = (id: number, isActive: boolean) => {
    if (!isActive) {
      handleActivateEmployee(id);
    } else {
      handleDeactivateEmployee(id);
    }
  };

  const handleUpdateEmployee = async (id: number) => {
    const departmentId = Array.from(selectedDepartment)[0];

    if (departmentId) {
      await api.put(
        `${import.meta.env.VITE_API_URL}${employeeEndpoint}/${id}`,
        {
          departmentId: Number(departmentId),
        },
      );
      onUpdate?.();
    }
    onClose();
  };

  return (
    <>
      <Button color="primary" variant="flat" onClick={handleOpenModal}>
        View Details
      </Button>
      <Modal
        isDismissable={false}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="4xl"
        onClose={onClose}
      >
        <ModalContent className="flex flex-col gap-1">
          {(onClose) => (
            <>
              <ModalHeader>Employee Details</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-12 gap-5">
                  <Card
                    isFooterBlurred
                    className="h-[280px] col-span-4"
                    radius="none"
                  >
                    <Image
                      alt="Employee Image"
                      fallbackSrc={DEFAULT_NO_IMAGE_URL}
                      height={280}
                      src={api.data?.imageUrl}
                      width={280}
                    />
                    {!api.data?.isActive && (
                      <CardFooter className="absolute bg-orange-500/70 bottom-0 z-10 justify-between">
                        <p className="text-tiny text-white/80">Inactive</p>
                      </CardFooter>
                    )}
                  </Card>

                  <div className="flex flex-1 flex-col gap-3 col-span-5">
                    <h1 className="text-xl font-bold">{`${api.data?.firstName} ${api.data?.lastName}`}</h1>
                    <Spacer y={1} />
                    <p className="text-sm">Employee ID: {api.data?.id}</p>
                    <p className="text-sm">
                      Department: {api.data?.Department?.name}
                    </p>
                    <p className="text-sm">Telephone: {api.data?.phone}</p>
                    <p className="text-sm">Address: {api.data?.address}</p>
                    <Spacer y={4} />
                    <div className="flex flex-1 gap-3 items-baseline">
                      <Select
                        isRequired
                        aria-labelledby="department-label"
                        className="flex-1"
                        defaultSelectedKeys={
                          api.data?.departmentId
                            ? [api.data.departmentId.toString()]
                            : undefined
                        }
                        label="Update department"
                        labelPlacement="outside"
                        placeholder="Select a department"
                        selectedKeys={selectedDepartment}
                        onSelectionChange={handleSelectionChange as any}
                      >
                        {(departmentApi.data || []).map((department) => (
                          <SelectItem key={department.id!.toString()}>
                            {department.name}
                          </SelectItem>
                        ))}
                      </Select>
                      <Button
                        color="primary"
                        isDisabled={isUpdateDisabled}
                        variant="flat"
                        onClick={() => setIsOpenUpdateDialog(true)}
                      >
                        Update
                      </Button>
                      <ConfirmDialog
                        isOpen={isOpenUpdateDialog}
                        message="Are you sure you want to update this employee?"
                        title="Update Employee"
                        onConfirm={() => handleUpdateEmployee(api.data?.id!)}
                        onOpenChange={setIsOpenUpdateDialog}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col col-span-3 gap-3 justify-self-end ">
                    <h1 className="font-bold">Hire Date</h1>
                    <p className="text-sm">
                      {new Date(api.data?.hireDate as string).toDateString()}
                    </p>
                    <p className="text-sm">
                      {formatDate(api.data?.hireDate as string)}
                    </p>
                    <Button
                      color={!api.data?.isActive ? "success" : "warning"}
                      variant="flat"
                      onClick={() => setIsOpenDeactivateDialog(true)}
                    >
                      {!api.data?.isActive ? "Activate" : "Deactivate"}
                    </Button>
                    <ConfirmDialog
                      confirmLabel={
                        !api.data?.isActive ? "Activate" : "Deactivate"
                      }
                      isDangerous={api.data?.isActive}
                      isOpen={isOpenDeactivateDialog}
                      message={`Are you sure you want to ${!api.data?.isActive ? "activate" : "deactivate"} this employee?`}
                      title={`${!api.data?.isActive ? "Activate" : "Deactivate"} Employee`}
                      onConfirm={() =>
                        handleEmployeeStatusChange(
                          api.data?.id!,
                          api.data?.isActive!,
                        )
                      }
                      onOpenChange={setIsOpenDeactivateDialog}
                    />
                  </div>
                </div>
                <Spacer y={4} />
                <h1 className="font-bold ml-5">Department History</h1>
                <Table aria-label="department-history-details-table">
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={api.data?.EmployeeDepartmentHistory || []}>
                    {(item) => (
                      <TableRow key={item.createdAt.toLocaleString()}>
                        {columns.map(({ key }) => (
                          <TableCell key={key}>
                            {key === "createdAt"
                              ? new Date(getKeyValue(item, key)).toDateString()
                              : item.department.name}
                          </TableCell>
                        ))}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
