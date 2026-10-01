import { useCallback, useRef, useState } from "react";
import { clamp } from "../utils/clamp";

const MAX_TILT = 7;

function useCardTilt() {
  const cardRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
  });

  const resetTilt = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      if (isFocused) return;

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();

      const relativeX = (event.clientX - rect.left) / rect.width;
      const relativeY = (event.clientY - rect.top) / rect.height;

      const normalizedX = relativeX * 2 - 1;
      const normalizedY = relativeY * 2 - 1;

      setTransform({
        rotateX: clamp(normalizedY * -MAX_TILT, -MAX_TILT, MAX_TILT),
        rotateY: clamp(normalizedX * MAX_TILT, -MAX_TILT, MAX_TILT),
      });
    },
    [isFocused]
  );

  const handlePointerLeave = useCallback(() => {
    if (!isFocused) resetTilt();
  }, [isFocused, resetTilt]);

  const handleFocusCapture = useCallback(() => {
    setIsFocused(true);
    resetTilt();
  }, [resetTilt]);

  const handleBlurCapture = useCallback((event) => {
    const currentTarget = event.currentTarget;
    const nextFocusedElement = event.relatedTarget;

    if (
      nextFocusedElement &&
      currentTarget.contains(nextFocusedElement)
    ) {
      return;
    }

    setIsFocused(false);
  }, []);

  return {
    cardRef,
    cardStyle: {
      "--rotate-x": `${transform.rotateX}deg`,
      "--rotate-y": `${transform.rotateY}deg`,
    },
    isFocused,
    handlePointerMove,
    handlePointerLeave,
    handleFocusCapture,
    handleBlurCapture,
  };
}

export default useCardTilt;
