const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="text-sm text-gray-500">Publications</div>
          <div className="text-2xl font-semibold">0</div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-sm text-gray-500">Services</div>
          <div className="text-2xl font-semibold">0</div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-sm text-gray-500">Physicians</div>
          <div className="text-2xl font-semibold">0</div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-sm text-gray-500">Testimonials</div>
          <div className="text-2xl font-semibold">0</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


