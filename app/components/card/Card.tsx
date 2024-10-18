interface Spec {
  label: string;
  paragraph: string;
}

interface CardProp {
  header: string;
  data: Spec[] | null; // Allow null for the loading state
}

const Card = ({ header, data }: CardProp) => {
  const isLoading = !data || data.length === 0; // Determine loading state
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
          {header}
        </h3>
        <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                </div>
              ))
            : data.map((item, index) => (
                <div key={index + 1}>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {item.label}
                  </label>
                  <p>{item.paragraph}</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
