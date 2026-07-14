import { useApiList } from '../hooks/useApiList';

function Activities() {
  const { items: activities, loading, error } = useApiList('activities');

  if (loading) return <p className="container mt-4">Loading activities...</p>;
  if (error) return <p className="container mt-4 text-danger">Error loading activities: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Distance (km)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.user?.name ?? '-'}</td>
              <td>{activity.type}</td>
              <td>{activity.durationMinutes}</td>
              <td>{activity.distanceKm ?? '-'}</td>
              <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
