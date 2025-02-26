import { Employee } from '../types/employee';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    const data = await response.json();
    return data.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      department: user.company?.name || 'Unassigned',
      role: user.company?.bs || 'Employee'
    }));
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const addEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: employee.name,
        email: employee.email,
        company: {
          name: employee.department,
          bs: employee.role
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add employee');
    }

    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      department: data.company?.name || employee.department,
      role: data.company?.bs || employee.role
    };
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};
