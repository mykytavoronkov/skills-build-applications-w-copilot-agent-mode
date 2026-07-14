import { useApiList } from '../hooks/useApiList';
import { CODESPACE_NAME } from '../config/api';

const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  const { items: users, loading, error } = useApiList(API_URL);

  if (loading) return <p className="container mt-4">Loading users...</p>;
  if (error) return <p className="container mt-4 text-danger">Error loading users: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.team?.name ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
