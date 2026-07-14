import { useApiList } from '../hooks/useApiList';
import { CODESPACE_NAME } from '../config/api';

const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const { items: teams, loading, error } = useApiList(API_URL);

  if (loading) return <p className="container mt-4">Loading teams...</p>;
  if (error) return <p className="container mt-4 text-danger">Error loading teams: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>
                {(team.members ?? [])
                  .map((member) => member.name ?? member)
                  .join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
