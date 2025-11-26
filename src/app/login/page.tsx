import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Login</h1>
      <p>Use the password defined in your <code>.env.local</code> to log in.</p>
      <LoginForm />
    </main>
  );
}
