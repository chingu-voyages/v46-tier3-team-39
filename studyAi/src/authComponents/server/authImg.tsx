export const AuthImg = ({
  containerClassNames,
  style,
}: {
  style?: React.CSSProperties;
  containerClassNames?: string;
}) => {
  return (
    <div
      style={style}
      className={"bg-Black" + " " + containerClassNames}
    >
      {/* {"hello"} */}
    </div>
  );
};
