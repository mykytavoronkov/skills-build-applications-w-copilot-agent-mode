import { useApiList } from '../hooks/useApiList';

function Workouts() {
  const { items: workouts, loading, error } = useApiList('workouts');

  if (loading) return <p className="container mt-4">Loading workouts...</p>;
  if (error) return <p className="container mt-4 text-danger">Error loading workouts: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <div className="row">
        {workouts.map((workout) => (
          <div className="col-md-4 mb-3" key={workout._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted text-capitalize">
                  {workout.difficulty} &middot; {workout.durationMinutes} min
                </h6>
                <p className="card-text">{workout.description}</p>
                <ul className="mb-0">
                  {(workout.exercises ?? []).map((exercise) => (
                    <li key={exercise}>{exercise}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
