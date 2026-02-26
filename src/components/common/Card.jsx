export default function Card({ children, className = '' }) {
  return (
    <div className={\`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 \${className}\`}>
      {children}
    </div>
  );
}
