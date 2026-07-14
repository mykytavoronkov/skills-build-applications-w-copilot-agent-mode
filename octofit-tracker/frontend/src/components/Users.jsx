import { useApiList } from '../hooks/useApiList';

function Users() {
  const { items: users, loading, error } = useApiList('users');

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
