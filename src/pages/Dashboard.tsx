import { useState, useCallback, useEffect } from 'react';
import { 
  Button, Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, CircularProgress, Snackbar, Alert,
  IconButton, Tooltip, InputAdornment 
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import CodeIcon from '@mui/icons-material/Code';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { Employee } from '../types/employee';
import { fetchEmployees, addEmployee } from '../services/api';

interface AddEmployeeFormData {
  name: string;
  department: string;
  role: string;
  email: string;
}

const initialFormData: AddEmployeeFormData = {
  name: '',
  department: '',
  role: '',
  email: '',
};

export default function Dashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [employeesData, setEmployeesData] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<AddEmployeeFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{open: boolean; message: string; severity: 'success' | 'error'}>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  // Fetch employees on component mount
  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true);
      try {
        const data = await fetchEmployees();
        setEmployeesData(data);
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to fetch employees',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  const engineeringCount = employeesData.filter(emp => emp.department === 'Engineering').length;
  const hrCount = employeesData.filter(emp => emp.department === 'HR').length;
  const othersCount = employeesData.filter(emp => emp.department !== 'Engineering' && emp.department !== 'HR').length;
  const totalEmployees = employeesData.length;

  const handleDepartmentClick = useCallback((dept: string | null) => {
    setSelectedDepartment(dept === selectedDepartment ? null : dept);
  }, [selectedDepartment]);

  const handleEdit = (employee: Employee) => {
    setFormData({
      name: employee.name,
      department: employee.department,
      role: employee.role,
      email: employee.email
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      // Simulate API call for delete
      await new Promise(resolve => setTimeout(resolve, 500));
      setEmployeesData(prev => prev.filter(emp => emp.id !== id));
      setSnackbar({
        open: true,
        message: 'Employee deleted successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to delete employee',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'sno',
      headerName: 'S.No',
      width: 80,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return params.id;
      },
    },
    { 
      field: 'name', 
      headerName: 'Employee Name', 
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <GroupsIcon className="text-gray-400" />
          {params.value}
        </div>
      )
    },
    { 
      field: 'department', 
      headerName: 'Department', 
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <div className={`px-2 py-1 rounded-full ${
          params.value === 'Engineering' ? 'bg-green-100 text-green-800' : 
          params.value === 'HR' ? 'bg-pink-100 text-pink-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {params.value}
        </div>
      )
    },
    { 
      field: 'role', 
      headerName: 'Role', 
      flex: 1,
      headerClassName: 'super-app-theme--header'
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      flex: 1,
      headerClassName: 'super-app-theme--header'
    },
    { 
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <div className="flex gap-2">
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEdit(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ];

  const filteredEmployees = selectedDepartment === 'Others'
    ? employeesData.filter(emp => emp.department !== 'Engineering' && emp.department !== 'HR')
    : selectedDepartment
    ? employeesData.filter(emp => emp.department === selectedDepartment)
    : employeesData;

  // Apply search filter
  const searchedEmployees = searchQuery
    ? filteredEmployees.filter(emp => 
        Object.values(emp).some(value => 
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : filteredEmployees;

  const handleAddEmployee = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setFormData(initialFormData);
    setFormErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.department.trim()) {
      errors.department = 'Department is required';
    }
    if (!formData.role.trim()) {
      errors.role = 'Role is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const newEmployee = await addEmployee(formData);
      setEmployeesData(prev => [...prev, newEmployee]);
      handleCloseDialog();
      setSnackbar({
        open: true,
        message: 'Employee added successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to add employee',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Employee Overview</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddEmployee}
          className="h-10 bg-blue-600 hover:bg-blue-700"
        >
          Add Employee
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          className={`card cursor-pointer transform transition-all duration-300 hover:-translate-y-1 ${
            selectedDepartment === null ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => handleDepartmentClick(null)}
        >
          <div className="flex items-center gap-3">
            <GroupsIcon className="text-blue-500 text-3xl" />
            <div>
              <h3 className="card-title">Total Employees</h3>
              <p className="card-value text-blue-500">{totalEmployees}</p>
            </div>
          </div>
        </div>
        
        <div 
          className={`card cursor-pointer transform transition-all duration-300 hover:-translate-y-1 ${
            selectedDepartment === 'HR' ? 'ring-2 ring-pink-500' : ''
          }`}
          onClick={() => handleDepartmentClick('HR')}
        >
          <div className="flex items-center gap-3">
            <BusinessIcon className="text-pink-500 text-3xl" />
            <div>
              <h3 className="card-title">HR Department</h3>
              <p className="card-value text-pink-500">{hrCount}</p>
            </div>
          </div>
        </div>
        
        <div 
          className={`card cursor-pointer transform transition-all duration-300 hover:-translate-y-1 ${
            selectedDepartment === 'Engineering' ? 'ring-2 ring-green-500' : ''
          }`}
          onClick={() => handleDepartmentClick('Engineering')}
        >
          <div className="flex items-center gap-3">
            <CodeIcon className="text-green-500 text-3xl" />
            <div>
              <h3 className="card-title">Engineering Department</h3>
              <p className="card-value text-green-500">{engineeringCount}</p>
            </div>
          </div>
        </div>

        <div 
          className={`card cursor-pointer transform transition-all duration-300 hover:-translate-y-1 ${
            selectedDepartment === 'Others' ? 'ring-2 ring-purple-500' : ''
          }`}
          onClick={() => handleDepartmentClick('Others')}
        >
          <div className="flex items-center gap-3">
            <BusinessIcon className="text-purple-500 text-3xl" />
            <div>
              <h3 className="card-title">Other Departments</h3>
              <p className="card-value text-purple-500">{othersCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search employees by name, email, department, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-gray-400" />
                </InputAdornment>
              ),
              className: "bg-gray-50",
            }}
            size="small"
          />
        </div>
        <DataGrid
          rows={searchedEmployees}
          columns={columns}
          autoHeight
          slots={{
            toolbar: GridToolbar,
          }}
          className="border-none"
          loading={loading}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
            '& .super-app-theme--header': {
              backgroundColor: '#1976d2',
              color: '#fff',
              fontWeight: 'bold',
            },
          }}
        />
      </div>

      <Dialog 
        open={isAddDialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Employee Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
            className="mt-4"
          />
          <TextField
            margin="dense"
            name="department"
            label="Department"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.department}
            onChange={handleInputChange}
            error={!!formErrors.department}
            helperText={formErrors.department}
          />
          <TextField
            margin="dense"
            name="role"
            label="Role"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.role}
            onChange={handleInputChange}
            error={!!formErrors.role}
            helperText={formErrors.role}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? <CircularProgress size={24} /> : 'Add Employee'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          className="shadow-lg"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
