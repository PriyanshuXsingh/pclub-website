export default function FailPage() {
  return (
    <div className="min-h-screen bg-red-50 flex flex-col justify-center items-center text-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">😞 Verification Failed</h1>
        <p className="text-gray-700 mb-6">
          The token is invalid or has expired. Please try subscribing again.
        </p>
        <a
          href="/subscribe"
          className="inline-block rounded-lg bg-red-600 px-6 py-2 font-semibold text-white transition hover:bg-red-700"
        >
          Try Again
        </a>
      </div>
    </div>
  )
}
