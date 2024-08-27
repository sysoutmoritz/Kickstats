export default function Switcher({
  leftSide,
  rightSide,
  switchState,
  setSwitchState,
}: {
  leftSide: string;
  rightSide: string;
  switchState: string;
  setSwitchState: Function;
}) {
  return (
    <div className="flex justify-center bg-gray-300 dark:bg-gray-700 py-1 px-2 rounded-md w-56">
      <button
        className={
          switchState == "left"
            ? "border-2 border-gray-50 rounded-md py-0.5 px-2 grow basis-0"
            : "border-2 border-gray-300 dark:border-gray-700 rounded-md py-0.5 px-2 grow basis-0"
        }
        onClick={() => setSwitchState("left")}
      >
        {leftSide}
      </button>
      <button
        className={
          switchState == "right"
            ? "border-2 border-gray-50 rounded-md py-0.5 px-2 grow basis-0"
            : "border-2 border-gray-300 dark:border-gray-700 rounded-md py-0.5 px-2 grow basis-0"
        }
        onClick={() => setSwitchState("right")}
      >
        {rightSide}
      </button>
    </div>
  );
}
