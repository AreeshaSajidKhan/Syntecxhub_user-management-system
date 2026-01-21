import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const Icons = {
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  ),
  Trash: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
  ),
  Edit: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  ),
  Save: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
  ),
  X: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  )
};

export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [editingId, setEditingId] = useState(null); 

  const auth = {
    username: "your user_name",
    password: "your password",
  };

  const API_URL = "url to your backend API/api/users";

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL, { auth });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update User
  const submit = async () => {
    if (!form.name || !form.email) return alert("Please fill in fields");

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form, { auth });
        setEditingId(null);
      } else {
        // Create new user
        await axios.post(API_URL, form, { auth });
      }
      setForm({ name: "", email: "", role: "" }); // Reset form
      fetchUsers();
    } catch (err) {
      console.error("Error submitting user:", err);
      
      if(editingId) alert("Check if backend supports PUT method for editing.");
    }
  };

  // Prepare Edit
  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, role: user.role });
    setEditingId(user._id);
    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel Edit
  const handleCancel = () => {
    setForm({ name: "", email: "", role: "" });
    setEditingId(null);
  };

  // Delete user
  const del = async (id) => {
    if(!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, { auth });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>User Management</h1>
        <p>Manage your team with style and efficiency</p>
      </header>

      {/* Input Section */}
      <div className="form-card">
        <div className="form-title">
          <Icons.User />
          <span>{editingId ? "Edit User Details" : "Add New User"}</span>
        </div>
        
        <div className="input-group">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="role"
            placeholder="Role (e.g. Developer)"
            value={form.role}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button className="btn-primary" onClick={submit}>
            {editingId ? <Icons.Save /> : <Icons.Plus />}
            {editingId ? "Update User" : "Add User"}
          </button>
          
          {editingId && (
            <button className="btn-secondary" onClick={handleCancel}>
              <Icons.X /> Cancel
            </button>
          )}
        </div>
      </div>

      {/* Grid Display */}
      <div className="grid">
        {users.length === 0 ? (
          <div className="empty-state">No users found. Start by adding one!</div>
        ) : (
          users.map((u) => (
            <div className="userCard user-card" key={u._id}>
              <div className="user-avatar">
                {u.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <h3>{u.name}</h3>
                <p>{u.email}</p>
                <span className="badge">{u.role || "User"}</span>
              </div>
              
              <div className="card-actions">
                <button className="icon-btn" onClick={() => handleEdit(u)} title="Edit">
                  <Icons.Edit />
                </button>
                <button className="icon-btn delete" onClick={() => del(u._id)} title="Delete">
                  <Icons.Trash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}