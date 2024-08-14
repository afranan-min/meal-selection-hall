import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import StudentLogin from './pages/StudentLogin';
import AdminDashboard from './components/AdminDashboard';
import AddStudentPage from './pages/AddStudentPage';
import MealTickOff from './pages/MealTickOff';
import ShowMealsPage from './pages/ShowMealsPage';
import MealSelection from './components/MealSelection';
import ShowMealsByDate from './pages/ShowMealsByDate';
import DeleteStudentPage from './pages/DeleteStudentPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import MealRoutinePage from './pages/MealRoutinePage';
import UpdateMealRoutinePage from './pages/UpdateMealRoutinePage';
import TeaAvailabilityPage from './pages/TeaAvailabilityPage';
import AdminNotification from './pages/AdminNotification';
import AdminNotificationList from './pages/AdminNotificationList';
import StudentComplaint from './pages/StudentComplaint';
import AdminComplaints from './pages/AdminComplaints';
import RozaMealSelection from './components/RozaMealSelection';
import AdminRoza from './pages/AdminRoza';
import DeleteMeals from './pages/DeleteMeals';
import ChangeRoomPage from './pages/ChangeRoomPage';
import AdminStudentsPage from './pages/AdminStudentsPage';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateRozaMealRoutinePage from './pages/UpdateRozaMealRoutinePage';
import RozaMealRoutinePage from './pages/RozaMealRoutinePage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-login/add-complaint" element={<ProtectedRoute requiredRole="student"><StudentComplaint /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin-dashboard/add-student" element={<ProtectedRoute requiredRole="admin"><AddStudentPage /></ProtectedRoute>} />
        <Route path="/admin-dashboard/show-meals" element={<ProtectedRoute requiredRole="admin"><ShowMealsPage /></ProtectedRoute>} />
        <Route path="/admin-dashboard/show-meals-by-date" element={<ProtectedRoute requiredRole="admin"><ShowMealsByDate /></ProtectedRoute>} />
        <Route path="/meal-tick-off" element={<ProtectedRoute requiredRole="student"><MealTickOff /></ProtectedRoute>} />
        <Route path="/meal-selection" element={<ProtectedRoute requiredRole="student"><MealSelection /></ProtectedRoute>} />
        <Route path="/roza-meal-selection" element={<ProtectedRoute requiredRole="student"><RozaMealSelection /></ProtectedRoute>} />
        <Route path="/admin-dashboard/delete-student" element={<ProtectedRoute requiredRole="admin"><DeleteStudentPage /></ProtectedRoute>} />
        <Route path="/admin-dashboard/show-complaint" element={<ProtectedRoute requiredRole="admin"><AdminComplaints /></ProtectedRoute>} />
        <Route path="/admin-dashboard/change-password" element={<ProtectedRoute requiredRole="admin"><ChangePasswordPage /></ProtectedRoute>} />
        <Route path="/admin-dashboard/meal-routine" element={<ProtectedRoute requiredRole="admin"><MealRoutinePage /></ProtectedRoute>} />
        <Route path="/admin-dashboard/roza-meal-routine" element={<ProtectedRoute requiredRole="admin"><RozaMealRoutinePage /></ProtectedRoute>} />
        <Route path="/admin-dashboard/update-roza-meal-routine" element={<ProtectedRoute requiredRole="admin"><UpdateRozaMealRoutinePage /></ProtectedRoute>} />
        <Route path="/admin-dashboard/update-meal-routine" element={<ProtectedRoute requiredRole="admin"><UpdateMealRoutinePage /></ProtectedRoute>} />
        <Route path="/admin-dashboard/tea-availability" element={<ProtectedRoute requiredRole="admin"><TeaAvailabilityPage /></ProtectedRoute>} />
        <Route path="/admin-dashboard/notifications" element={<ProtectedRoute requiredRole="admin"><AdminNotification /></ProtectedRoute>} />
        <Route path="/admin-dashboard/show-notifications" element={<ProtectedRoute requiredRole="admin"><AdminNotificationList /></ProtectedRoute>} />
        <Route path="/admin-dashboard/roza-menu" element={<ProtectedRoute requiredRole="admin"><AdminRoza /></ProtectedRoute>} />
        <Route path="/admin-dashboard/delete-meal" element={<ProtectedRoute requiredRole="admin"><DeleteMeals /></ProtectedRoute>} />
        <Route path="/admin-dashboard/show-student-info" element={<ProtectedRoute requiredRole="admin"><AdminStudentsPage /></ProtectedRoute>} />
        <Route path="/admin-dashboard/change-room" element={<ProtectedRoute requiredRole="admin"><ChangeRoomPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
