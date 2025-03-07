import HealthOverview from '../components/HealthOverview'
import HealthTrends from '../components/HealthTrends'

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-dark dark:text-white">Welcome, John Doe</h1>
          <p className="text-neutral-darkest dark:text-neutral-light">Here's your health summary</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn btn-primary">Download Health Report</button>
        </div>
      </div>
      
      <HealthOverview />
      
      <HealthTrends />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
      </div>
    </div>
  )
}

export default Dashboard