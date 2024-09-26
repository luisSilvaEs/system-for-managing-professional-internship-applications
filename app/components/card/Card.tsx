interface Spec {
  label: string;
  paragraph: string;
}

interface CardProp {
  header: string;
  data: Spec[];
}

const Card = ({ header, data }: CardProp) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
          {header}
        </h3>
        <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
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
