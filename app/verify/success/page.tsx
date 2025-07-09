export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center text-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Verified!</h1>
        <p className="text-gray-700 mb-6">
          Your email has been successfully verified.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
