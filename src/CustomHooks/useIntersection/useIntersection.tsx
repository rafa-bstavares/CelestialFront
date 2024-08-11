import { RefObject, useEffect, useState } from "react";

type Props = {
    element: React.RefObject<HTMLImageElement>,
    rootMargin: string
}

export const useIntersection = ({element, rootMargin}: Props) => {
  const [isVisible, setState] = useState(false);

  useEffect((): () => void => {
    const current = element?.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );
    current && observer?.observe(current);

    return () => current && observer.unobserve(current);
  }, []);

  return isVisible;
};