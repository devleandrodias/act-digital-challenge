export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold">Erro</p>
        <p>{message}</p>
      </div>
    </div>
  );
}
