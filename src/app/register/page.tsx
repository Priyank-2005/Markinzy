export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
          >
            Register
          </button>
          <p className="text-sm text-center mt-4">
            Already have an account? <a href="/login" className="text-indigo-600 underline">Login</a>
          </p>
        </form>
      </div>
    </main>
  );
}
