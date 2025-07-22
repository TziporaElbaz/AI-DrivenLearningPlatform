import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsersPage from './pages/AdminUsersPage';
import ManageCategoriesPage from './pages/ManageCategoriesPage';
import UserHistoryPage from './pages/UserHistoryPage';
import MyLearningPage from './pages/MyLearningPage';
import ChatPage from './pages/ChatPage';
import SubCategoriesPage from './pages/SubCategoriesPage';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-learning" element={<MyLearningPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/categories" element={<ManageCategoriesPage />} />
          <Route path="/admin/users/:userId/history" element={<UserHistoryPage />} />
          <Route path="/categories/:id/subcategories" element={<SubCategoriesPage />} />
          <Route path="/chat/:categoryId/:subCategoryId" element={<ChatPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
