const ReadOnlyInput = ({ name, value }: { name: string; value: string }) => {
  return (
    <input
      name={name}
      value={value}
      readOnly
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        visibility: "hidden",
        minWidth: "unset",
        minHeight: "unset",
        width: 0,
        height: 0,
      }}
    />
  );
};
export default ReadOnlyInput;
