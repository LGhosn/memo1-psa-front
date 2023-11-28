export const MainContainer = ({ title, children }: { title:string, children: any }) => {
  return (
    <div className="min-h-full flex flex-col bg-white justify-center items-center">
      <h1 className="sticky font-semibold uppercase text-5xl text-black">
        {title}
      </h1>
      {children}
    </div>
  );
}