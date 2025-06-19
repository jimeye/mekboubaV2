import Navbar from '../components/Navbar';

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-8">Notre Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Sandwich Boulettes<br/>Mekbouba SBM</h2>
            <p className="text-gray-600">Boeuf, oignons, persil, coriandre & rose</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Box Boulettes<br/>Mekbouba BBM</h2>
            <p className="text-gray-600">Poivrons, piments, tomates & zeit<br/>mekbouba</p>
          </div>
        </div>
      </div>
    </main>
  );
} 