export default function AnimatedBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-50 overflow-hidden bg-[#090909]">

        {/* Большое свечение */}
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[220px]" />

        {/* Верхнее свечение */}
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[180px]" />

        {/* Нижнее свечение */}
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[180px]" />

        {/* Сетка */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>
    </>
  );
}