import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PurchaseCardProps {
	id: number
	transaction: string
	price: number
	date: string
	status: 'Completada'
	discount?: number
}

export function PurchaseCard({ id, transaction, price, date, status, discount }: PurchaseCardProps) {
	const finalPrice = discount ? Math.max(0, price - discount) : price

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>
					<div className="flex flex-col gap-2">
						<span>Transacción:</span>
						<span className="text-2xl font-normal">{transaction}</span>
					</div>
				</CardTitle>
				<CardDescription>ID de compra: {id}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-baseline justify-between">
					<p className="text-2xl font-bold">S/{finalPrice.toFixed(2)}</p>
					{discount && discount > 0 && (
						<div className="text-right">
							<p className="text-sm text-muted-foreground line-through">S/{price.toFixed(2)}</p>
							<Badge variant="secondary" className="ml-2">-S/{discount.toFixed(2)}</Badge>
						</div>
					)}
				</div>
				<p className="text-sm text-muted-foreground mt-2">Fecha: {date}</p>
			</CardContent>
			<CardFooter>
				<Badge variant={status === 'Completada' ? 'default' : status === 'Pendiente' ? 'secondary' : 'destructive'}>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</Badge>
			</CardFooter>
		</Card>
	)
}