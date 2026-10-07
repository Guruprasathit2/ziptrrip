import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TodoList from './pages/TodoList/TodoList';
import TodoDetails from './pages/TodoDetails/TodoDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/todos" replace />} />

        <Route path="/todos" element={<TodoList />} />

        <Route path="/todos/add" element={<TodoDetails />} />

        <Route path="/todo" element={<TodoDetails />} />

        <Route path="/todos/edit" element={<TodoDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;