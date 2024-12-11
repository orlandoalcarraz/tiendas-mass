const BASE_URL = `https://api.polygon.io/v2/aggs/ticker/TICKER/range/1/day/FROM_DATE/TO_DATE?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_API_KEY}`;

export const getAugmentedFetchUrl = (
    ticker: string,
    from: string,
    to: string
) =>
    BASE_URL.replace("TICKER", ticker)
        .replace("FROM_DATE", from)
        .replace("TO_DATE", to);

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const getEndpoint = (ticker: string) => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const from = formatDate(startOfYear);
    const to = formatDate(today);

    return getAugmentedFetchUrl(ticker, from, to);
};

export interface StockData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}


export async function getStockData(ticker = "NVDA"): Promise<StockData[]> {
    const res = await fetch(getEndpoint(ticker), {
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 60,
        },
    });

    const data = await res.json();


    if (!data.results || !Array.isArray(data.results)) {
        throw new Error("Failed to fetch stock data");
    }

    return data.results.map((item: any) => ({
        date: new Date(item.t).toISOString().split("T")[0],
        ventas: item.h,
    }));
}
