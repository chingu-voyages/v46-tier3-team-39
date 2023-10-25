const ContainerBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between bg-White border-solid border">
      {children}
    </div>
  );
};
export default ContainerBar