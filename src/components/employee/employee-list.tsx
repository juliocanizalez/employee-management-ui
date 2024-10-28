import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import { ConfirmDialog } from "../common/confirm-dialog";
import { EmployeeDetails } from "./employee-details";
import { formatDate } from "@/utils/dateUtils";
import { IDynamicList } from "@/interfaces/IDynamicList";
import { DEFAULT_NO_IMAGE_URL } from "@/config/defaults";

export const EmployeeList: React.FC<IDynamicList> = ({
  employee,
  showDeleteButton,
  onDelete,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Spacer y={2} />
      <Card className="w-full">
        {employee && (
          <>
            <CardBody>
              <div className="grid grid-cols-10 gap-6 md:gap-4 items-center justify-center">
                <div className="flex col-span-1 justify-center">
                  <Avatar
                    size="lg"
                    src={employee.imageUrl || DEFAULT_NO_IMAGE_URL}
                  />
                </div>
                <div className="flex flex-col col-span-7">
                  <p className="text-lg font-bold">
                    {`${employee?.firstName} ${employee?.lastName}`}
                    &nbsp;
                    <span className="font-light">
                      ({employee.Department?.name})
                    </span>
                  </p>
                  <Spacer y={2} />
                  <p>Hire Date</p>
                  <p>{formatDate(employee?.hireDate as string)}</p>
                </div>
                <div
                  className={`flex gap-4 col-span-2 ${showDeleteButton ? "justify-center" : "text-center"}`}
                >
                  <EmployeeDetails
                    employeeId={employee.id!}
                    onUpdate={onUpdate}
                  />

                  {showDeleteButton && (
                    <>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => setIsOpen(true)}
                      >
                        Delete
                      </Button>
                      <ConfirmDialog
                        isDangerous
                        confirmLabel="Delete"
                        isOpen={isOpen}
                        message="Are you sure you want to delete this employee?"
                        title="Delete Employee"
                        onConfirm={() => onDelete(employee?.id!)}
                        onOpenChange={setIsOpen}
                      />
                    </>
                  )}
                </div>
              </div>
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
};
