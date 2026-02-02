import { useNProgress } from "@tanem/react-nprogress";

interface BarProps {
  duration: number | string;
  progress: number;
  isFinished: boolean;
}

interface ProgressBarProps {
  isAnimating: boolean;
}

function Bar({ duration, progress, isFinished }: BarProps) {
  return (
    <div
      className="pointer-events-none"
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${duration}ms linear`,
      }}
    >
      {/* Bar */}
      <div
        className="h-1 top-0 left-0  z-20 fixed w-full  bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500"
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${duration}ms linear `,
        }}
      ></div>
    </div>
  );
}

export const ProgressBar = ({ isAnimating }: ProgressBarProps) => {
  const { animationDuration, progress, isFinished } = useNProgress({
    isAnimating,
  });

  return (
    <Bar
      duration={animationDuration}
      isFinished={isFinished}
      progress={progress}
    />
  );
};
