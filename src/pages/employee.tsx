import React, { useEffect } from "react";
import { Spacer } from "@nextui-org/spacer";
import { Spinner } from "@nextui-org/spinner";
import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/common/primitives";
import { useApi } from "@/hooks/use-api";
import { employeeEndpoint } from "@/config/endpoints";
import { IEmployee } from "@/interfaces/IEmployee";
import { EmployeeList } from "@/components/employee/employee-list";
import { CreateEmployeeModal } from "@/components/employee/create-employee-modal";

const EmployeePage: React.FC = () => {
  const api = useApi<IEmployee[]>();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      await api.get(`${import.meta.env.VITE_API_URL}${employeeEndpoint}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateEmployee = async (employee: IEmployee) => {
    try {
      await api.post(
        `${import.meta.env.VITE_API_URL}${employeeEndpoint}`,
        employee,
      );
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await api.delete(
        `${import.meta.env.VITE_API_URL}${employeeEndpoint}/${id}`,
      );
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  const renderContent = () => {
    if (api.loading) {
      return (
        <>
          <Spacer y={4} />
          <Spinner label="Loading..." size="lg" />
        </>
      );
    }

    if (api.error) {
      return (
        <>
          <Spacer y={4} />
          <p className="text-red-500">Error: {api.error.message}</p>
        </>
      );
    }

    return (
      <>
        <Spacer y={4} />
        <div className="flex justify-between">
          <h1 className={subtitle()}>Employee List</h1>
          <CreateEmployeeModal onSave={handleCreateEmployee} />
        </div>
        <Spacer y={4} />
        {!api.data?.length && (
          <>
            <Spacer y={4} />
            <p className="text-gray-500">No employee data available.</p>
          </>
        )}

        {api.data?.map((employee: IEmployee, index: number) => (
          <EmployeeList
            key={index}
            showDeleteButton
            buttonText="View Details"
            employee={employee}
            onDelete={handleDeleteEmployee}
            onUpdate={fetchEmployees}
          />
        ))}
      </>
    );
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col">
        <h1 className={title()}>Welcome to the Employee Page</h1>
        {renderContent()}
      </section>
    </DefaultLayout>
  );
};

export default EmployeePage;
