import { useApiList } from '../hooks/useApiList';

function Leaderboard() {
  const { items: entries, loading, error } = useApiList('leaderboard');

  if (loading) return <p className="container mt-4">Loading leaderboard...</p>;
  if (error) return <p className="container mt-4 text-danger">Error loading leaderboard: {error}</p>;

  const sorted = [...entries].sort((a, b) => (b.points ?? 0) - (a.points ?? 0));

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.rank ?? '-'}</td>
              <td>{entry.user?.name ?? '-'}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
