import "./PageContainer.css";

function PageContainer({ children, className = "" }) {
  return (
    <main className={`page-container ${className}`}>
      {children}
    </main>
  );
}

export default PageContainer;
