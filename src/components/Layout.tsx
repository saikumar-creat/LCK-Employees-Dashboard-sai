import { Outlet } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container,
  IconButton,
  Avatar,
  Tooltip,
  Box,
  Breadcrumbs,
  Link
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    if (paths.length === 0) return [{ text: 'Dashboard', href: '/' }];
    
    return [
      { text: 'Dashboard', href: '/' },
      ...paths.map((path, index) => ({
        text: path.charAt(0).toUpperCase() + path.slice(1),
        href: '/' + paths.slice(0, index + 1).join('/')
      }))
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar position="fixed" className="bg-white shadow-sm">
        <Toolbar className="justify-between">
          <div className="flex items-center gap-4">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className="text-gray-600"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="text-gray-800 font-bold">
              Employee Dashboard
            </Typography>
          </div>
          
          <div className="flex items-center gap-4">
            <Tooltip title="Notifications">
              <IconButton className="text-gray-600">
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton>
                <Avatar className="h-8 w-8 bg-blue-500">AD</Avatar>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      
      <Box component="main" className="pt-16">
        <Container maxWidth="xl" className="py-8">
          <Breadcrumbs className="mb-6">
            {getBreadcrumbs().map((crumb, index) => (
              <Link
                key={index}
                color="inherit"
                href={crumb.href}
                className={index === getBreadcrumbs().length - 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}
              >
                {crumb.text}
              </Link>
            ))}
          </Breadcrumbs>
          <Outlet />
        </Container>
      </Box>
    </div>
  );
}
