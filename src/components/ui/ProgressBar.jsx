import PropTypes from 'prop-types';

const ProgressBar = ({ percentage, label, showLabel = true, size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-500',
    red: 'bg-red-600',
    gray: 'bg-gray-400'
  };

  const normalizedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          <span className="text-sm font-medium text-gray-600">{normalizedPercentage}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${normalizedPercentage}%` }}
          role="progressbar"
          aria-valuenow={normalizedPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={label || `Progress: ${normalizedPercentage}%`}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['blue', 'green', 'yellow', 'red', 'gray'])
};

export default ProgressBar;
