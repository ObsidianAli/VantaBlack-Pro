import { useSpring } from 'react-spring';

const useCustomSpring = (opacity, height) => {
  const springProps = useSpring({
    from: { opacity: 0, height: '0px' },
    to: { opacity, height },
    config: { tension: 100, friction: 30 },
  });

  return springProps;
};

export default useCustomSpring;