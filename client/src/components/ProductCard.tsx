// client/src/components/ProductCard.tsx
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import Button from "./Button";

type Props = {
  product: {
    id: number;
    name: string;
    price: number;
    unit: string;
    hsn_code?: string;
  };
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>{product.name}</CardHeader>

      <CardBody>
        <p><span className="font-medium">Price:</span> ₹{Number(product.price).toFixed(2)}</p>
        <p><span className="font-medium">Unit:</span> {product.unit}</p>
        {product.hsn_code && (
          <p><span className="font-medium">HSN/SAC:</span> {product.hsn_code}</p>
        )}
      </CardBody>

      <CardFooter>
        <Button size="sm" className="bg-blue-600 px-3 py-1 text-sm" onClick={onEdit}>Edit</Button>
        <Button
          size="sm"
          className="bg-red-600 px-3 py-1 text-sm"
          onClick={onDelete}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}