import 'flag-icons/css/flag-icons.min.css';

interface FlagProps {
  countryCode: string;
  className?: string;
}

const Flag = ({ countryCode, className = '' }: FlagProps) => {
  return (
    <span
      className={`fi fi-${countryCode.toLowerCase()} ${className}`}
      style={{
        fontSize: '1.25em',
        lineHeight: '1',
        display: 'inline-block',
        borderRadius: '2px'
      }}
    />
  );
};

export default Flag;