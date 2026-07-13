import LoginForm from "./LoginForm";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-crema-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-carbon/10 bg-white p-8 shadow-sm">
        <h1 className="font-display text-xl font-bold text-carbon">
          Percheros — Admin
        </h1>
        <p className="mt-1 text-sm text-carbon/60">Ingresa la contraseña para continuar.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
